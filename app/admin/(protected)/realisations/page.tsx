import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { createRealisation, deleteRealisation } from "@/lib/admin/actions/realisations";
import { realisationCategoryLabel } from "@/lib/realisations/categories";
import RealisationForm from "@/components/admin/RealisationForm";
import DeleteRealisationButton from "./DeleteRealisationButton";
import EditRealisationLink from "./EditRealisationLink";

type RealisationRow = {
  id: number;
  seo_title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  updated_at: string;
  author_display_name: string | null;
  thumbnail_url: string | null;
};

export default async function AdminRealisationsPage() {
  const user = await getCurrentUser();

  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT
      r.id, r.seo_title, r.slug, r.category, r.status, r.updated_at,
      u.display_name AS author_display_name,
      (
        SELECT ri.image_url FROM realisation_images ri
        WHERE ri.realisation_id = r.id
        ORDER BY ri.sort_order ASC LIMIT 1
      ) AS thumbnail_url
    FROM realisations r
    LEFT JOIN admin_users u ON u.id = r.author_id
    ORDER BY r.updated_at DESC
  `) as unknown as RealisationRow[];

  const canCreate = hasPermission(user, "realisations.create");
  const canEdit = hasPermission(user, "realisations.edit");
  const canDelete = hasPermission(user, "realisations.delete");
  const canPublish = hasPermission(user, "realisations.publish");

  return (
    <div className="admin-page admin-page-wide">
      <h1 className="admin-page-title">Réalisations</h1>
      <p className="admin-page-sub">
        {rows.length} projet{rows.length > 1 ? "s" : ""}. Alimentent la galerie « Réalisations » du site.
      </p>

      <div className="admin-split">
        {canCreate && (
          <div className="admin-split-form">
            <div className="admin-panel">
              <h2 className="admin-panel-title">Ajouter un projet</h2>
              <RealisationForm action={createRealisation} canPublish={canPublish} submitLabel="Ajouter" />
            </div>
          </div>
        )}

        <div className="admin-split-list">
          {rows.length === 0 ? (
            <p className="admin-empty-state">Aucune réalisation pour l&apos;instant.</p>
          ) : (
            <div className="admin-realisation-grid">
              {rows.map((r) => (
                <div key={r.id} className="admin-realisation-card">
                  <div className="admin-realisation-card-img">
                    {r.thumbnail_url ? (
                      <img src={r.thumbnail_url} alt="" loading="lazy" />
                    ) : (
                      <div className="admin-post-row-thumb-empty" />
                    )}
                  </div>
                  <div className="admin-realisation-card-body">
                    <div className="admin-realisation-card-meta">
                      <span className={`admin-status-badge admin-status-${r.status}`}>
                        {r.status === "published" ? "Publié" : "Brouillon"}
                      </span>
                      <span className="admin-realisation-card-cat">{realisationCategoryLabel(r.category)}</span>
                    </div>
                    <h3 className="admin-realisation-card-title">{r.seo_title}</h3>
                    <div className="admin-realisation-card-footer">
                      <span className="admin-post-row-meta">
                        {new Date(r.updated_at).toLocaleDateString("fr-FR")}
                      </span>
                      <div className="admin-realisation-card-actions">
                        {canEdit && <EditRealisationLink realisationId={r.id} />}
                        {canDelete && (
                          <DeleteRealisationButton realisationId={r.id} title={r.seo_title} action={deleteRealisation} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
