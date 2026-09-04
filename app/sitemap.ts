import type { MetadataRoute } from "next";
import { getSql, ensureSchema } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr";

const STATIC_ROUTES = [
  "",
  "/services",
  "/realisations",
  "/a-propos",
  "/devis",
  "/blog",
  "/mentions-legales",
  "/confidentialite",
  "/plan-du-site",
  "/fiches/covering",
  "/fiches/enseignes",
  "/fiches/flyers",
  "/fiches/impression",
  "/fiches/logo-lumineux",
  "/fiches/plaques-panneaux",
  "/fiches/textile",
  "/fiches/vitrophanies",
];

async function getPublishedSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT slug, updated_at FROM posts WHERE status = 'published'`;
  return (rows as unknown as { slug: string; updated_at: string }[]).map((r) => ({
    slug: r.slug,
    updatedAt: new Date(r.updated_at),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  // /admin n'apparaît jamais ici (voir aussi app/robots.ts et proxy.ts).
  try {
    const posts = await getPublishedSlugsWithDates();
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }));
    return [...staticEntries, ...postEntries];
  } catch (err) {
    // Base non connectée (ex: build local sans DATABASE_URL) : on publie au
    // moins les pages statiques plutôt que de faire échouer le sitemap.
    console.error("Sitemap : impossible de charger les articles publiés :", err);
    return staticEntries;
  }
}
