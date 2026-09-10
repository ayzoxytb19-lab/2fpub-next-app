import type { Metadata } from "next";
import Link from "next/link";
import { getSql, ensureSchema } from "@/lib/db";

// Requête DB directe (pas de cookies()) : sans ce marqueur, Next tenterait de
// pré-rendre cette page au build, ce qui échouerait tant qu'aucune base
// n'est connectée.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Blog — 2F Publicité" },
  description:
    "Conseils, actualités et réalisations de 2F Publicité : covering véhicules, enseignes lumineuses, textile pro et impression grand format.",
  alternates: { canonical: "/blog" },
};

const PAGE_SIZE = 9;

type PostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  published_at: string;
};

async function getPublishedPosts(page: number) {
  await ensureSchema();
  const sql = getSql();
  const offset = (page - 1) * PAGE_SIZE;

  const [rows, countRows] = await Promise.all([
    sql`
      SELECT id, slug, title, excerpt, cover_image_url, published_at
      FROM posts
      WHERE status = 'published'
      ORDER BY published_at DESC
      LIMIT ${PAGE_SIZE} OFFSET ${offset}
    `,
    sql`SELECT count(*) AS total FROM posts WHERE status = 'published'`,
  ]);

  const posts = rows as unknown as PostSummary[];
  const total = Number((countRows[0] as { total: string } | undefined)?.total ?? 0);
  return { posts, total };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let posts: PostSummary[] = [];
  let total = 0;
  let dbUnavailable = false;

  try {
    const result = await getPublishedPosts(page);
    posts = result.posts;
    total = result.total;
  } catch (err) {
    console.error("Impossible de charger les articles du blog :", err);
    dbUnavailable = true;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="page active" id="page-blog">
      <section className="rea-hero">
        <div className="container">
          <h1>
            Le <span className="gradient-text">blog</span>
          </h1>
          <p>Actualités, conseils et coulisses de l&apos;atelier 2F Publicité.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 96px", background: "white" }}>
        <div className="container">
          {dbUnavailable ? (
            <p className="admin-empty-state">Le blog est momentanément indisponible.</p>
          ) : posts.length === 0 ? (
            <p className="admin-empty-state">Aucun article publié pour l&apos;instant. Revenez bientôt !</p>
          ) : (
            <>
              <div className="blog-grid">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                    <div className="blog-card-image">
                      {post.cover_image_url ? (
                        <img loading="lazy" src={post.cover_image_url} alt={post.title} />
                      ) : (
                        <div className="blog-card-image-fallback" aria-hidden="true">
                          2F
                        </div>
                      )}
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-card-date">
                        {new Date(post.published_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <h2 className="blog-card-title">{post.title}</h2>
                      {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                      <span className="blog-card-cta">Lire l&apos;article →</span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="admin-pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={`/blog?page=${p}`} className={p === page ? "active" : ""}>
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
