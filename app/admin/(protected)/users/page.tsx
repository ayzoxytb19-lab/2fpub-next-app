import { requirePermissionForPage } from "@/lib/admin/dal";
import { getSql, ensureSchema } from "@/lib/db";
import { sanitizePermissions } from "@/lib/admin/permissions";
import UserCreateForm from "@/components/admin/UserCreateForm";
import UserRow from "@/components/admin/UserRow";

type UserRowData = {
  id: number;
  email: string;
  display_name: string;
  is_owner: boolean;
  is_active: boolean;
  permissions: unknown;
};

export default async function AdminUsersPage() {
  const currentUser = await requirePermissionForPage("users.manage", "/admin");

  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, display_name, is_owner, is_active, permissions
    FROM admin_users
    ORDER BY is_owner DESC, created_at ASC
  `) as unknown as UserRowData[];

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Comptes admin</h1>
      <p className="admin-page-sub">
        Créez des comptes pour votre équipe et choisissez précisément ce que chacun peut faire.
      </p>

      <UserCreateForm />

      <div className="admin-users-list">
        {rows.map((u) => (
          <UserRow
            key={u.id}
            id={u.id}
            email={u.email}
            displayName={u.display_name}
            isOwner={u.is_owner}
            isActive={u.is_active}
            permissions={sanitizePermissions(u.permissions)}
            isSelf={u.id === currentUser.id}
          />
        ))}
      </div>
    </div>
  );
}
