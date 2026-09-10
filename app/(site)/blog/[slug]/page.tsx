import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSql, ensureSchema } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr";

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
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.published_at,
      authors: post.author_display_name ? [post.author_display_name] : undefined,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at,
    author: {
      "@type": "Person",
      name: post.author_display_name ?? "2F Publicité",
    },
    publisher: {
      "@type": "Organization",
      name: "2F Publicité",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-2f-3d.png` },
    },
  };

  return (
    <div className="page active" id="page-blog-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <img src={post.cover_image_url} alt={post.title} className="blog-post-cover" />
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
                <p className="cta-card-sub">Envoyez-nous un plan ou une photo — on revient vers vous avec un devis chiffré sous 24h.</p>
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
