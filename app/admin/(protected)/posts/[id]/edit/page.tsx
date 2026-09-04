import { notFound } from "next/navigation";
import { requirePermissionForPage, hasPermission } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { updatePost } from "@/lib/admin/actions/posts";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) notFound();

  const user = await requirePermissionForPage("posts.edit", "/admin/posts");

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT title, slug, excerpt, content, cover_image_url, status
    FROM posts WHERE id = ${postId} LIMIT 1
  `;
  const post = rows[0] as
    | {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        cover_image_url: string | null;
        status: "draft" | "published";
      }
    | undefined;

  if (!post) notFound();

  const boundUpdatePost = updatePost.bind(null, postId);

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Modifier l&apos;article</h1>
      <PostForm
        action={boundUpdatePost}
        canPublish={hasPermission(user, "posts.publish")}
        submitLabel="Enregistrer les modifications"
        defaultValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImageUrl: post.cover_image_url,
          status: post.status,
        }}
      />
    </div>
  );
}
