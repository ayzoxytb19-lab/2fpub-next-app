import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSql, ensureSchema } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/admin/session";
import { PermissionKey, sanitizePermissions } from "@/lib/admin/permissions";

export type AdminUser = {
  id: number;
  email: string;
  displayName: string;
  isOwner: boolean;
  permissions: PermissionKey[];
  isActive: boolean;
};

// Couche d'accès aux données : centralise les vérifications de session et de
// permissions. Mémoïsée par requête via React `cache()` pour éviter des
// allers-retours DB en double quand plusieurs composants la sollicitent
// pendant le même rendu (pattern recommandé par la doc Next.js).
export const verifySession = cache(async (): Promise<{ userId: number }> => {
  const session = await getSessionFromCookies();
  if (!session?.userId) {
    redirect("/admin/login");
  }
  return { userId: session.userId };
});

export const getCurrentUser = cache(async (): Promise<AdminUser> => {
  const { userId } = await verifySession();

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, email, display_name, is_owner, permissions, is_active
    FROM admin_users WHERE id = ${userId} LIMIT 1
  `;
  const row = rows[0] as
    | {
        id: number;
        email: string;
        display_name: string;
        is_owner: boolean;
        permissions: unknown;
        is_active: boolean;
      }
    | undefined;

  if (!row || !row.is_active) {
    redirect("/admin/login");
  }

  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    isOwner: row.is_owner,
    permissions: sanitizePermissions(row.permissions),
    isActive: row.is_active,
  };
});

// Variante sans redirection, pour les Route Handlers (app/admin/media/...) où
// `redirect()` de next/navigation ne s'applique pas de la même façon que
// dans une Server Action / un Server Component : on préfère y répondre
// nous-mêmes avec un statut HTTP explicite.
export const getCurrentUserOrNull = cache(async (): Promise<AdminUser | null> => {
  const session = await getSessionFromCookies();
  if (!session?.userId) return null;

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, email, display_name, is_owner, permissions, is_active
    FROM admin_users WHERE id = ${session.userId} LIMIT 1
  `;
  const row = rows[0] as
    | {
        id: number;
        email: string;
        display_name: string;
        is_owner: boolean;
        permissions: unknown;
        is_active: boolean;
      }
    | undefined;

  if (!row || !row.is_active) return null;

  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    isOwner: row.is_owner,
    permissions: sanitizePermissions(row.permissions),
    isActive: row.is_active,
  };
});

export function hasPermission(user: AdminUser, key: PermissionKey): boolean {
  return user.isOwner || user.permissions.includes(key);
}

// Pour les Server Actions : lève une erreur explicite plutôt que de rediriger.
export async function requirePermission(key: PermissionKey): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!hasPermission(user, key)) {
    throw new Error("Vous n'avez pas la permission nécessaire pour effectuer cette action.");
  }
  return user;
}

// Pour les pages entières (ex: /admin/users) : redirige si la permission manque.
export async function requirePermissionForPage(
  key: PermissionKey,
  redirectTo = "/admin"
): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!hasPermission(user, key)) {
    redirect(redirectTo);
  }
  return user;
}
