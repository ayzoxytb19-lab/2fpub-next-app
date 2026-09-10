"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/admin/actions/auth";
import {
  ArticlesIcon,
  DashboardIcon,
  ExternalLinkIcon,
  GeoIcon,
  LogoutIcon,
  LogsIcon,
  RealisationsIcon,
  SubmissionsIcon,
  UsersIcon,
} from "@/components/admin/AdminIcons";

type NavItem = { href: string; label: string; icon: React.ReactNode; exact?: boolean };

export default function AdminSidebar({
  displayName,
  isOwner,
  canManageUsers,
  canViewLogs,
  canManageSettings,
  canViewSubmissions,
  newSubmissionsCount,
}: {
  displayName: string;
  isOwner: boolean;
  canManageUsers: boolean;
  canViewLogs: boolean;
  canManageSettings: boolean;
  canViewSubmissions: boolean;
  newSubmissionsCount: number;
}) {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: "/admin", label: "Tableau de bord", icon: <DashboardIcon />, exact: true },
    { href: "/admin/posts", label: "Articles", icon: <ArticlesIcon /> },
    { href: "/admin/realisations", label: "Réalisations", icon: <RealisationsIcon /> },
  ];
  if (canViewSubmissions) {
    items.push({
      href: "/admin/soumissions",
      label: newSubmissionsCount > 0 ? `Soumissions (${newSubmissionsCount})` : "Soumissions",
      icon: <SubmissionsIcon />,
    });
  }
  if (canManageUsers) items.push({ href: "/admin/users", label: "Comptes", icon: <UsersIcon /> });
  if (canViewLogs) items.push({ href: "/admin/logs", label: "Journal", icon: <LogsIcon /> });
  if (canManageSettings) items.push({ href: "/admin/geo", label: "Config IA", icon: <GeoIcon /> });

  function isActive(item: NavItem) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-sidebar-logo">
        2F <span>Publicité</span>
      </Link>

      <nav className="admin-sidebar-nav">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-sidebar-link${isActive(item) ? " active" : ""}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-user">
          {displayName}
          {isOwner && <span className="admin-owner-badge">Propriétaire</span>}
        </div>
        <Link href="/" target="_blank" className="admin-sidebar-footlink">
          <ExternalLinkIcon />
          Voir le site
        </Link>
        <form action={logout}>
          <button type="submit" className="admin-sidebar-footlink admin-sidebar-footlink-btn">
            <LogoutIcon />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
