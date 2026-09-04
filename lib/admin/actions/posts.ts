"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSql, ensureSchema } from "@/lib/db";
import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { logActivity } from "@/lib/admin/log";
import { slugify } from "@/lib/slug";

export type PostFormState = { error: string } | null;

type PostStatus = "draft" | "published";

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  status: PostStatus;
};

function readPostInput(formData: FormData): PostInput {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim() || null;
  const status: PostStatus = String(formData.get("status") ?? "draft") === "published" ? "published" : "draft";
  const slug = slugify(slugRaw || title);
  return { title, slug, excerpt, content, coverImageUrl, status };
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
  const sql = getSql();
  const base = baseSlug || "article";
  let candidate = base;

  for (let attempt = 2; attempt < 50; attempt++) {
    const rows = excludeId
      ? await sql`SELECT id FROM posts WHERE slug = ${candidate} AND id != ${excludeId} LIMIT 1`
      : await sql`SELECT id FROM posts WHERE slug = ${candidate} LIMIT 1`;
    if (rows.length === 0) return candidate;
    candidate = `${base}-${attempt}`;
  }
  return `${base}-${Date.now()}`;
}

export async function createPost(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "posts.create")) {
    return { error: "Vous n'avez pas la permission de créer des articles." };
  }

  const input = readPostInput(formData);
  if (!input.title) {
    return { error: "Le titre est obligatoire." };
  }
  if (input.status === "published" && !hasPermission(user, "posts.publish")) {
    return { error: "Vous pouvez enregistrer un brouillon, mais pas publier directement." };
  }

  await ensureSchema();
  const slug = await ensureUniqueSlug(input.slug || slugify(input.title));
  const sql = getSql();
  const publishedAt = input.status === "published" ? new Date().toISOString() : null;

  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, content, cover_image_url, status, author_id, published_at)
    VALUES (${slug}, ${input.title}, ${input.excerpt}, ${input.content}, ${input.coverImageUrl}, ${input.status}, ${user.id}, ${publishedAt})
    RETURNING id
  `;
  const postId = rows[0]?.id as number;

  await logActivity({
    actorId: user.id,
    actorEmail: user.email,
    action: "post.create",
    targetType: "post",
    targetId: String(postId),
    targetLabel: input.title,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(
  postId: number,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "posts.edit")) {
    return { error: "Vous n'avez pas la permission de modifier des articles." };
  }

  const input = readPostInput(formData);
  if (!input.title) {
    return { error: "Le titre est obligatoire." };
  }

  await ensureSchema();
  const sql = getSql();

  const existingRows = await sql`SELECT slug, status, published_at FROM posts WHERE id = ${postId} LIMIT 1`;
  const existing = existingRows[0] as { slug: string; status: PostStatus; published_at: string | null } | undefined;
  if (!existing) {
    return { error: "Cet article n'existe plus." };
  }

  const statusChanged = existing.status !== input.status;
  if (statusChanged && !hasPermission(user, "posts.publish")) {
    return { error: "Vous n'avez pas la permission de publier ou dépublier un article." };
  }

  const slug =
    input.slug && input.slug !== existing.slug ? await ensureUniqueSlug(input.slug, postId) : existing.slug;

  const publishedAt =
    input.status === "published" ? existing.published_at ?? new Date().toISOString() : existing.published_at;

  await sql`
    UPDATE posts
    SET title = ${input.title},
        slug = ${slug},
        excerpt = ${input.excerpt},
        content = ${input.content},
        cover_image_url = ${input.coverImageUrl},
        status = ${input.status},
        published_at = ${publishedAt},
        updated_at = now()
    WHERE id = ${postId}
  `;

  await logActivity({
    actorId: user.id,
    actorEmail: user.email,
    action: statusChanged ? (input.status === "published" ? "post.publish" : "post.unpublish") : "post.update",
    targetType: "post",
    targetId: String(postId),
    targetLabel: input.title,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  if (existing.slug !== slug) revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "posts.delete")) {
    throw new Error("Vous n'avez pas la permission de supprimer des articles.");
  }

  const postId = Number(formData.get("postId"));
  if (!Number.isFinite(postId)) {
    throw new Error("Article invalide.");
  }

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`DELETE FROM posts WHERE id = ${postId} RETURNING title, slug`;
  const deleted = rows[0] as { title: string; slug: string } | undefined;

  if (deleted) {
    await logActivity({
      actorId: user.id,
      actorEmail: user.email,
      action: "post.delete",
      targetType: "post",
      targetId: String(postId),
      targetLabel: deleted.title,
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${deleted.slug}`);
  }

  revalidatePath("/admin/posts");
}
