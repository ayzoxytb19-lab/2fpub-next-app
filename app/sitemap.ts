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
  "/suppression-donnees",
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
  // Pas de `lastModified` sur les routes statiques : on ne connaît pas de
  // date de dernière modification de contenu fiable pour ces pages (le
  // système de fichiers ne l'enregistre pas), et `new Date()` produirait une
  // fausse date de fraîcheur à chaque régénération du sitemap. Voir
  // docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md. Les articles de blog, eux, ont une
  // vraie date (`updated_at` en base) — voir plus bas.
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
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
