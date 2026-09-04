"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSql, ensureSchema } from "@/lib/db";
import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { logActivity } from "@/lib/admin/log";
import { slugify } from "@/lib/slug";
import { isRealisationCategoryKey } from "@/lib/realisations/categories";

export type RealisationFormState = { error: string } | null;

type RealisationStatus = "draft" | "published";

type RealisationImageInput = { url: string; alt: string };

type RealisationInput = {
  seoTitle: string;
  slug: string;
  category: string;
  description: string;
  status: RealisationStatus;
  images: RealisationImageInput[];
};

function readImages(formData: FormData): RealisationImageInput[] {
  const raw = String(formData.get("images") ?? "[]");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const images: RealisationImageInput[] = [];
  for (const item of parsed) {
    if (item && typeof item === "object" && typeof (item as { url?: unknown }).url === "string") {
      const url = (item as { url: string }).url.trim();
      if (!url) continue;
      const alt = typeof (item as { alt?: unknown }).alt === "string" ? (item as { alt: string }).alt : "";
      images.push({ url, alt });
    }
  }
  return images;
}

function readRealisationInput(formData: FormData): RealisationInput {
  const seoTitle = String(formData.get("seoTitle") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const status: RealisationStatus =
    String(formData.get("status") ?? "draft") === "published" ? "published" : "draft";
  const slug = slugify(slugRaw || seoTitle);
  const images = readImages(formData);
  return { seoTitle, slug, category, description, status, images };
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
  const sql = getSql();
  const base = baseSlug || "realisation";
  let candidate = base;

  for (let attempt = 2; attempt < 50; attempt++) {
    const rows = excludeId
      ? await sql`SELECT id FROM realisations WHERE slug = ${candidate} AND id != ${excludeId} LIMIT 1`
      : await sql`SELECT id FROM realisations WHERE slug = ${candidate} LIMIT 1`;
    if (rows.length === 0) return candidate;
    candidate = `${base}-${attempt}`;
  }
  return `${base}-${Date.now()}`;
}

async function insertImages(
  sql: ReturnType<typeof getSql>,
  realisationId: number,
  images: RealisationImageInput[]
): Promise<void> {
  let order = 0;
  for (const image of images) {
    await sql`
      INSERT INTO realisation_images (realisation_id, image_url, alt, sort_order)
      VALUES (${realisationId}, ${image.url}, ${image.alt}, ${order})
    `;
    order++;
  }
}

export async function createRealisation(
  _prevState: RealisationFormState,
  formData: FormData
): Promise<RealisationFormState> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "realisations.create")) {
    return { error: "Vous n'avez pas la permission de créer des réalisations." };
  }

  const input = readRealisationInput(formData);
  if (!input.seoTitle) return { error: "Le titre est obligatoire." };
  if (!isRealisationCategoryKey(input.category)) return { error: "Choisissez une catégorie valide." };
  if (input.images.length === 0) return { error: "Ajoutez au moins une photo." };
  if (input.status === "published" && !hasPermission(user, "realisations.publish")) {
    return { error: "Vous pouvez enregistrer un brouillon, mais pas publier directement." };
  }

  await ensureSchema();
  const slug = await ensureUniqueSlug(input.slug || slugify(input.seoTitle));
  const sql = getSql();

  const rows = await sql`
    INSERT INTO realisations (slug, category, seo_title, description, status, author_id)
    VALUES (${slug}, ${input.category}, ${input.seoTitle}, ${input.description}, ${input.status}, ${user.id})
    RETURNING id
  `;
  const realisationId = rows[0]?.id as number;
  await insertImages(sql, realisationId, input.images);

  await logActivity({
    actorId: user.id,
    actorEmail: user.email,
    action: "realisation.create",
    targetType: "realisation",
    targetId: String(realisationId),
    targetLabel: input.seoTitle,
  });

  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}

export async function updateRealisation(
  realisationId: number,
  _prevState: RealisationFormState,
  formData: FormData
): Promise<RealisationFormState> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "realisations.edit")) {
    return { error: "Vous n'avez pas la permission de modifier des réalisations." };
  }

  const input = readRealisationInput(formData);
  if (!input.seoTitle) return { error: "Le titre est obligatoire." };
  if (!isRealisationCategoryKey(input.category)) return { error: "Choisissez une catégorie valide." };
  if (input.images.length === 0) return { error: "Ajoutez au moins une photo." };

  await ensureSchema();
  const sql = getSql();

  const existingRows = await sql`SELECT slug, status FROM realisations WHERE id = ${realisationId} LIMIT 1`;
  const existing = existingRows[0] as { slug: string; status: RealisationStatus } | undefined;
  if (!existing) return { error: "Cette réalisation n'existe plus." };

  const statusChanged = existing.status !== input.status;
  if (statusChanged && !hasPermission(user, "realisations.publish")) {
    return { error: "Vous n'avez pas la permission de publier ou dépublier une réalisation." };
  }

  const slug =
    input.slug && input.slug !== existing.slug ? await ensureUniqueSlug(input.slug, realisationId) : existing.slug;

  await sql`
    UPDATE realisations
    SET seo_title = ${input.seoTitle},
        slug = ${slug},
        category = ${input.category},
        description = ${input.description},
        status = ${input.status},
        updated_at = now()
    WHERE id = ${realisationId}
  `;

  await sql`DELETE FROM realisation_images WHERE realisation_id = ${realisationId}`;
  await insertImages(sql, realisationId, input.images);

  await logActivity({
    actorId: user.id,
    actorEmail: user.email,
    action: statusChanged
      ? input.status === "published"
        ? "realisation.publish"
        : "realisation.unpublish"
      : "realisation.update",
    targetType: "realisation",
    targetId: String(realisationId),
    targetLabel: input.seoTitle,
  });

  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}

export async function deleteRealisation(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "realisations.delete")) {
    throw new Error("Vous n'avez pas la permission de supprimer des réalisations.");
  }

  const realisationId = Number(formData.get("realisationId"));
  if (!Number.isFinite(realisationId)) {
    throw new Error("Réalisation invalide.");
  }

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`DELETE FROM realisations WHERE id = ${realisationId} RETURNING seo_title`;
  const deleted = rows[0] as { seo_title: string } | undefined;

  if (deleted) {
    await logActivity({
      actorId: user.id,
      actorEmail: user.email,
      action: "realisation.delete",
      targetType: "realisation",
      targetId: String(realisationId),
      targetLabel: deleted.seo_title,
    });
    revalidatePath("/");
    revalidatePath("/realisations");
  }

  revalidatePath("/admin/realisations");
}
