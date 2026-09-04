import Link from "next/link";
import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { ArticlesIcon, GeoIcon, LogsIcon, RealisationsIcon, UsersIcon } from "@/components/admin/AdminIcons";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  const canManageUsers = hasPermission(user, "users.manage");
  const canViewLogs = hasPermission(user, "logs.view");
  const canManageSettings = hasPermission(user, "settings.manage");

  await ensureSchema();
  const sql = getSql();
  const queries = [
    sql`SELECT count(*) AS total FROM posts`,
    sql`SELECT count(*) AS total FROM realisations`,
    canManageUsers ? sql`SELECT count(*) AS total FROM admin_users` : Promise.resolve([{ total: "0" }]),
    canViewLogs ? sql`SELECT count(*) AS total FROM activity_logs` : Promise.resolve([{ total: "0" }]),
  ];
  const [postRows, realisationRows, userRows, logRows] = await Promise.all(queries);
  const count = (rows: unknown) => Number((rows as { total: string }[])[0]?.total ?? 0);

  const cards = [
    {
      icon: <ArticlesIcon />,
      value: count(postRows),
      label: "Articles",
      href: "/admin/posts",
      cta: "Gérer le blog →",
    },
    {
      icon: <RealisationsIcon />,
      value: count(realisationRows),
      label: "Réalisations",
      href: "/admin/realisations",
      cta: "Gérer les réalisations →",
    },
    canManageUsers && {
      icon: <UsersIcon />,
      value: count(userRows),
      label: "Comptes admin",
      href: "/admin/users",
      cta: "Gérer les comptes →",
    },
    canViewLogs && {
      icon: <LogsIcon />,
      value: count(logRows),
      label: "Évènements du journal",
      href: "/admin/logs",
      cta: "Voir le journal →",
    },
    canManageSettings && {
      icon: <GeoIcon />,
      value: null,
      label: "Config IA",
      href: "/admin/geo",
      cta: "Éditer /llms.txt →",
    },
  ].filter(Boolean) as { icon: React.ReactNode; value: number | null; label: string; href: string; cta: string }[];

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Tableau de bord</h1>
      <p className="admin-page-sub">Vue d&apos;ensemble et accès rapides.</p>

      <div className="admin-dashboard-grid">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="admin-dashboard-card">
            <div className="admin-dashboard-card-top">
              <span className="admin-dashboard-card-icon">{card.icon}</span>
              {card.value !== null && <span className="admin-dashboard-card-value">{card.value}</span>}
            </div>
            <div className="admin-dashboard-card-label">{card.label}</div>
            <span className="admin-dashboard-card-cta">{card.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
