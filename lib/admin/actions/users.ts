"use server";

import { revalidatePath } from "next/cache";
import { getSql, ensureSchema } from "@/lib/db";
import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { logActivity } from "@/lib/admin/log";
import { hashPassword, isPasswordStrongEnough } from "@/lib/admin/password";
import { sanitizePermissions, PermissionKey } from "@/lib/admin/permissions";

export type UserFormState = { error: string } | { success: true } | null;

function readPermissionsFromForm(formData: FormData): PermissionKey[] {
  const values = formData.getAll("permissions").map(String);
  return sanitizePermissions(values);
}

export async function createUser(_prevState: UserFormState, formData: FormData): Promise<UserFormState> {
  const actor = await getCurrentUser();
  if (!hasPermission(actor, "users.manage")) {
    return { error: "Vous n'avez pas la permission de gérer les comptes." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const permissions = readPermissionsFromForm(formData);

  if (!email || !email.includes("@")) return { error: "Adresse email invalide." };
  if (!displayName) return { error: "Merci d'indiquer un nom à afficher." };
  if (!isPasswordStrongEnough(password)) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  await ensureSchema();
  const sql = getSql();

  const existing = await sql`SELECT id FROM admin_users WHERE email = ${email} LIMIT 1`;
  if (existing.length > 0) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const passwordHash = await hashPassword(password);
  const rows = await sql`
    INSERT INTO admin_users (email, password_hash, display_name, is_owner, permissions, is_active, created_by)
    VALUES (${email}, ${passwordHash}, ${displayName}, FALSE, ${JSON.stringify(permissions)}::jsonb, TRUE, ${actor.id})
    RETURNING id
  `;
  const newUserId = rows[0]?.id as number;

  await logActivity({
    actorId: actor.id,
    actorEmail: actor.email,
    action: "user.create",
    targetType: "user",
    targetId: String(newUserId),
    targetLabel: email,
    metadata: { permissions },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUserPermissions(
  userId: number,
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const actor = await getCurrentUser();
  if (!hasPermission(actor, "users.manage")) {
    return { error: "Vous n'avez pas la permission de gérer les comptes." };
  }

  await ensureSchema();
  const sql = getSql();

  const targetRows = await sql`SELECT email, is_owner FROM admin_users WHERE id = ${userId} LIMIT 1`;
  const target = targetRows[0] as { email: string; is_owner: boolean } | undefined;
  if (!target) return { error: "Ce compte n'existe plus." };
  if (target.is_owner) return { error: "Le compte propriétaire ne peut pas être modifié." };

  const permissions = readPermissionsFromForm(formData);

  await sql`UPDATE admin_users SET permissions = ${JSON.stringify(permissions)}::jsonb WHERE id = ${userId}`;

  await logActivity({
    actorId: actor.id,
    actorEmail: actor.email,
    action: "user.permissions_update",
    targetType: "user",
    targetId: String(userId),
    targetLabel: target.email,
    metadata: { permissions },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function setUserActive(formData: FormData): Promise<void> {
  const actor = await getCurrentUser();
  if (!hasPermission(actor, "users.manage")) {
    throw new Error("Vous n'avez pas la permission de gérer les comptes.");
  }

  const userId = Number(formData.get("userId"));
  const active = formData.get("active") === "true";
  if (!Number.isFinite(userId)) throw new Error("Compte invalide.");
  if (!active && userId === actor.id) {
    throw new Error("Vous ne pouvez pas désactiver votre propre compte.");
  }

  await ensureSchema();
  const sql = getSql();

  const targetRows = await sql`SELECT email, is_owner FROM admin_users WHERE id = ${userId} LIMIT 1`;
  const target = targetRows[0] as { email: string; is_owner: boolean } | undefined;
  if (!target) throw new Error("Ce compte n'existe plus.");
  if (target.is_owner) throw new Error("Le compte propriétaire ne peut pas être désactivé.");

  await sql`UPDATE admin_users SET is_active = ${active} WHERE id = ${userId}`;

  await logActivity({
    actorId: actor.id,
    actorEmail: actor.email,
    action: active ? "user.activate" : "user.deactivate",
    targetType: "user",
    targetId: String(userId),
    targetLabel: target.email,
  });

  revalidatePath("/admin/users");
}
