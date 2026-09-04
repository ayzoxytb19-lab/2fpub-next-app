import Link from "next/link";
import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { deletePost } from "@/lib/admin/actions/posts";
import DeletePostButton from "./DeletePostButton";

type PostRow = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  cover_image_url: string | null;
  updated_at: string;
  author_display_name: string | null;
};

export default async function AdminPostsPage() {
  const user = await getCurrentUser();

  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT p.id, p.title, p.slug, p.status, p.cover_image_url, p.updated_at, u.display_name AS author_display_name
    FROM posts p
    LEFT JOIN admin_users u ON u.id = p.author_id
    ORDER BY p.updated_at DESC
  `) as unknown as PostRow[];

  const canCreate = hasPermission(user, "posts.create");
  const canEdit = hasPermission(user, "posts.edit");
  const canDelete = hasPermission(user, "posts.delete");

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-sub">{rows.length} article{rows.length > 1 ? "s" : ""} au total.</p>
        </div>
        {canCreate && (
          <Link href="/admin/posts/new" className="btn-submit admin-inline-btn">
            + Nouvel article
          </Link>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="admin-empty-state">Aucun article pour l&apos;instant.</p>
      ) : (
        <div className="admin-posts-table">
          {rows.map((post) => (
            <div key={post.id} className="admin-post-row">
              <div className="admin-post-row-thumb">
                {post.cover_image_url ? (
                  <img src={post.cover_image_url} alt="" loading="lazy" />
                ) : (
                  <div className="admin-post-row-thumb-empty" />
                )}
              </div>
              <div className="admin-post-row-main">
                <span className={`admin-status-badge admin-status-${post.status}`}>
                  {post.status === "published" ? "Publié" : "Brouillon"}
                </span>
                <h3>{post.title}</h3>
                <p className="admin-post-row-meta">
                  {post.author_display_name ?? "—"} · Modifié le{" "}
                  {new Date(post.updated_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="admin-post-row-actions">
                {post.status === "published" && (
                  <Link href={`/blog/${post.slug}`} target="_blank" className="btn-text-link">
                    Voir
                  </Link>
                )}
                {canEdit && (
                  <Link href={`/admin/posts/${post.id}/edit`} className="btn-text-link">
                    Modifier
                  </Link>
                )}
                {canDelete && <DeletePostButton postId={post.id} title={post.title} action={deletePost} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
