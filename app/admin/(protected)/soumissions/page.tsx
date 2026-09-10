import { requirePermissionForPage } from "@/lib/admin/dal";
import { listSubmissions } from "@/lib/forms/data";
import { markRead } from "@/lib/admin/actions/submissions";

const PAGE_SIZE = 20;

const FORM_TYPE_LABELS: Record<string, string> = {
  devis: "Demande de devis",
  rgpd: "Demande RGPD",
  catalogue: "Téléchargement catalogue",
};

// Champs qu'on préfère afficher en premier, dans cet ordre, quand présents
// dans le payload (les autres champs éventuels suivent, sans être perdus).
const FIELD_ORDER = ["prenom", "nom", "email", "telephone", "entreprise", "type_demande", "message"];

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requirePermissionForPage("submissions.view", "/admin");
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { rows, total } = await listSubmissions(page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Soumissions de formulaires</h1>
      <p className="admin-page-sub">
        {total} soumission{total > 1 ? "s" : ""} reçue{total > 1 ? "s" : ""} — devis, RGPD et téléchargement catalogue. Ces
        données sont personnelles : ne les partagez qu&apos;avec les personnes qui doivent les traiter.
      </p>

      {rows.length === 0 ? (
        <p className="admin-empty-state">Aucune soumission pour l&apos;instant.</p>
      ) : (
        <div className="admin-logs-table">
          {rows.map((row) => {
            const entries = Object.entries(row.payload).filter(([, v]) => v);
            entries.sort((a, b) => {
              const ia = FIELD_ORDER.indexOf(a[0]);
              const ib = FIELD_ORDER.indexOf(b[0]);
              if (ia === -1 && ib === -1) return 0;
              if (ia === -1) return 1;
              if (ib === -1) return -1;
              return ia - ib;
            });
            return (
              <div key={row.id} className="admin-log-row" style={{ flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span className="admin-log-date">
                    {new Date(row.created_at).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                  <span className="admin-log-action">{FORM_TYPE_LABELS[row.form_type] ?? row.form_type}</span>
                  {row.status === "new" ? (
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", background: "var(--blue)", padding: "3px 9px", borderRadius: "999px", textTransform: "uppercase" }}>
                      Nouveau
                    </span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Lu</span>
                  )}
                  {row.status === "new" && (
                    <form action={markRead} style={{ marginLeft: "auto" }}>
                      <input type="hidden" name="id" value={row.id} />
                      <button type="submit" className="btn-text-link">
                        Marquer comme lu
                      </button>
                    </form>
                  )}
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {entries.map(([key, value]) => (
                    <div key={key}>
                      <strong style={{ color: "var(--text-main)" }}>{key} : </strong>
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="admin-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a key={p} href={`/admin/soumissions?page=${p}`} className={p === page ? "active" : ""}>
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
