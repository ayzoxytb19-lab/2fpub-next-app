import { requirePermissionForPage } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { ACTIVITY_LABELS, type ActivityAction } from "@/lib/admin/log";

const PAGE_SIZE = 30;

type LogRow = {
  id: number;
  actor_email: string | null;
  action: ActivityAction;
  target_label: string | null;
  created_at: string;
};

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requirePermissionForPage("logs.view", "/admin");
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  await ensureSchema();
  const sql = getSql();
  const [rows, countRows] = await Promise.all([
    sql`
      SELECT id, actor_email, action, target_label, created_at
      FROM activity_logs
      ORDER BY created_at DESC
      LIMIT ${PAGE_SIZE} OFFSET ${offset}
    `,
    sql`SELECT count(*) AS total FROM activity_logs`,
  ]);

  const logs = rows as unknown as LogRow[];
  const total = Number((countRows[0] as { total: string } | undefined)?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Journal d&apos;activité</h1>
      <p className="admin-page-sub">{total} évènement{total > 1 ? "s" : ""} enregistré{total > 1 ? "s" : ""}.</p>

      {logs.length === 0 ? (
        <p className="admin-empty-state">Aucune activité pour l&apos;instant.</p>
      ) : (
        <div className="admin-logs-table">
          {logs.map((log) => (
            <div key={log.id} className="admin-log-row">
              <span className="admin-log-date">
                {new Date(log.created_at).toLocaleString("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
              <span className="admin-log-action">{ACTIVITY_LABELS[log.action] ?? log.action}</span>
              <span className="admin-log-actor">{log.actor_email ?? "—"}</span>
              {log.target_label && <span className="admin-log-target">{log.target_label}</span>}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="admin-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a key={p} href={`/admin/logs?page=${p}`} className={p === page ? "active" : ""}>
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
