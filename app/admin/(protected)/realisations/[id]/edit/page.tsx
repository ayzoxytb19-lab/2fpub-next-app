import { notFound } from "next/navigation";
import { requirePermissionForPage, hasPermission } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { updateRealisation } from "@/lib/admin/actions/realisations";
import RealisationForm from "@/components/admin/RealisationForm";

export default async function EditRealisationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const realisationId = Number(id);
  if (!Number.isFinite(realisationId)) notFound();

  const user = await requirePermissionForPage("realisations.edit", "/admin/realisations");

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT seo_title, slug, category, description, status
    FROM realisations WHERE id = ${realisationId} LIMIT 1
  `;
  const realisation = rows[0] as
    | {
        seo_title: string;
        slug: string;
        category: string;
        description: string;
        status: "draft" | "published";
      }
    | undefined;

  if (!realisation) notFound();

  const imageRows = (await sql`
    SELECT image_url, alt FROM realisation_images
    WHERE realisation_id = ${realisationId}
    ORDER BY sort_order ASC
  `) as unknown as { image_url: string; alt: string }[];

  // La colonne s'appelle image_url en base mais RealisationForm /
  // RealisationImagesUpload attendent { url, alt } — on mappe explicitement.
  const normalizedImages = imageRows.map((img) => ({ url: img.image_url, alt: img.alt }));

  const boundUpdateRealisation = updateRealisation.bind(null, realisationId);

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Modifier la réalisation</h1>
      <RealisationForm
        action={boundUpdateRealisation}
        canPublish={hasPermission(user, "realisations.publish")}
        submitLabel="Enregistrer les modifications"
        defaultValues={{
          seoTitle: realisation.seo_title,
          slug: realisation.slug,
          category: realisation.category,
          description: realisation.description,
          status: realisation.status,
          images: normalizedImages,
        }}
      />
    </div>
  );
}
