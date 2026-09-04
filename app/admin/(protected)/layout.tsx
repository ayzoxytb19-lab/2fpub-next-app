import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import AdminSidebar from "@/components/admin/AdminSidebar";

// Enveloppe tout /admin sauf /admin/login et /admin/setup (route groups).
// getCurrentUser() redirige déjà vers /admin/login si la session est
// absente/invalide/désactivée — mais chaque page protégée revérifie aussi
// elle-même (voir lib/admin/dal.ts), la vérification en layout seule
// n'étant pas suffisante pour les Server Actions et Route Handlers.
export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="admin-shell">
      <AdminSidebar
        displayName={user.displayName}
        isOwner={user.isOwner}
        canManageUsers={hasPermission(user, "users.manage")}
        canViewLogs={hasPermission(user, "logs.view")}
        canManageSettings={hasPermission(user, "settings.manage")}
      />
      <main className="admin-content">{children}</main>
    </div>
  );
}
