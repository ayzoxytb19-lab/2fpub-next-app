import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSql, ensureSchema } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

type Post = {
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published_at: string;
  author_display_name: string | null;
};

async function getPublishedPost(slug: string): Promise<Post | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT p.title, p.excerpt, p.content, p.cover_image_url, p.published_at, u.display_name AS author_display_name
    FROM posts p
    LEFT JOIN admin_users u ON u.id = p.author_id
    WHERE p.slug = ${slug} AND p.status = 'published'
    LIMIT 1
  `;
  return (rows[0] as Post | undefined) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post: Post | null = null;
  try {
    post = await getPublishedPost(slug);
  } catch {
    // Base indisponible : on retombe sur des métadonnées génériques.
  }
  if (!post) return { title: "Article — 2F Publicité" };

  return {
    title: `${post.title} — Blog 2F Publicité`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: Post | null;
  try {
    post = await getPublishedPost(slug);
  } catch (err) {
    console.error("Impossible de charger l'article :", err);
    notFound();
  }

  if (!post) notFound();

  return (
    <div className="page active" id="page-blog-post">
      <section className="blog-post-hero">
        <div className="container">
          <Link href="/blog" className="btn-text-link">
            ← Retour au blog
          </Link>
          <h1>{post.title}</h1>
          <p className="blog-post-meta">
            {post.author_display_name ?? "2F Publicité"} ·{" "}
            {new Date(post.published_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {post.cover_image_url && (
        <div className="container">
          <img src={post.cover_image_url} alt="" className="blog-post-cover" />
        </div>
      )}

      <section style={{ padding: "48px 0 96px" }}>
        <div className="container">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

          <div className="cta-card-wrap" style={{ marginTop: "64px" }}>
            <div className="cta-card">
              <div className="cta-card-content">
                <h2 className="cta-card-title">
                  Un projet ?
                  <br />
                  Parlons-en autour d&apos;un café.
                </h2>
                <p className="cta-card-sub">Envoyez-nous un plan ou une photo — on revient vers vous avec un devis chiffré sous 48h.</p>
              </div>
              <div className="cta-card-btns">
                <Link className="btn-cta-devis" href="/devis">
                  Demander un devis →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
