import "server-only";
import { getSql, ensureSchema } from "@/lib/db";
import type { RealisationSummary } from "@/components/RealisationsGallery";

type Row = {
  id: number;
  slug: string;
  category: string;
  seo_title: string;
  description: string;
  image_url: string;
  alt: string;
};

// Réutilisé par app/(site)/realisations/page.tsx et app/(site)/page.tsx —
// une seule requête (jointure), regroupée ici en projets + leurs photos
// triées, pour ne pas dupliquer cette logique entre les deux pages.
export async function getPublishedRealisations(): Promise<RealisationSummary[]> {
  await ensureSchema();
  const sql = getSql();

  const rows = (await sql`
    SELECT r.id, r.slug, r.category, r.seo_title, r.description, ri.image_url, ri.alt
    FROM realisations r
    JOIN realisation_images ri ON ri.realisation_id = r.id
    WHERE r.status = 'published'
    ORDER BY r.created_at ASC, ri.sort_order ASC
  `) as unknown as Row[];

  const byId = new Map<number, RealisationSummary>();
  for (const row of rows) {
    let project = byId.get(row.id);
    if (!project) {
      project = {
        id: row.id,
        slug: row.slug,
        category: row.category,
        seoTitle: row.seo_title,
        description: row.description,
        images: [],
      };
      byId.set(row.id, project);
    }
    project.images.push({ url: row.image_url, alt: row.alt });
  }

  return Array.from(byId.values());
}
