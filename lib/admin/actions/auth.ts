"use server";

import { redirect } from "next/navigation";
import { getSql, ensureSchema } from "@/lib/db";
import { createSession, deleteSession, getSessionFromCookies } from "@/lib/admin/session";
import { hashPassword, verifyPassword, isPasswordStrongEnough } from "@/lib/admin/password";
import { logActivity } from "@/lib/admin/log";

export type AuthFormState = { error: string } | null;

// Le formulaire de setup n'est accessible (voir app/admin/setup/page.tsx) que
// tant qu'aucun compte propriétaire n'existe. On revérifie ici pour ne
// jamais pouvoir créer un second propriétaire via un appel direct.
export async function setupOwner(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  await ensureSchema();
  const sql = getSql();

  const existing = await sql`SELECT id FROM admin_users WHERE is_owner = TRUE LIMIT 1`;
  if (existing.length > 0) {
    redirect("/admin/login");
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  if (!email || !email.includes("@")) {
    return { error: "Adresse email invalide." };
  }
  if (!displayName) {
    return { error: "Merci d'indiquer un nom à afficher." };
  }
  if (!isPasswordStrongEnough(password)) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }
  if (password !== passwordConfirm) {
    return { error: "Les deux mots de passe ne correspondent pas." };
  }

  const passwordHash = await hashPassword(password);

  const rows = await sql`
    INSERT INTO admin_users (email, password_hash, display_name, is_owner, permissions, is_active)
    VALUES (${email}, ${passwordHash}, ${displayName}, TRUE, '[]'::jsonb, TRUE)
    RETURNING id
  `;
  const newUserId = rows[0]?.id as number;

  await logActivity({
    actorId: newUserId,
    actorEmail: email,
    action: "auth.owner_setup",
    targetType: "user",
    targetId: String(newUserId),
    targetLabel: email,
  });

  await createSession(newUserId);
  redirect("/admin");
}

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  await ensureSchema();
  const sql = getSql();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const genericError = "Email ou mot de passe incorrect.";
  if (!email || !password) {
    return { error: genericError };
  }

  const rows = await sql`
    SELECT id, email, password_hash, is_active FROM admin_users WHERE email = ${email} LIMIT 1
  `;
  const row = rows[0] as
    | { id: number; email: string; password_hash: string; is_active: boolean }
    | undefined;

  if (!row || !row.is_active) {
    await logActivity({
      actorId: null,
      actorEmail: email,
      action: "auth.login_failed",
      targetType: "user",
      targetLabel: email,
    });
    return { error: genericError };
  }

  const validPassword = await verifyPassword(password, row.password_hash);
  if (!validPassword) {
    await logActivity({
      actorId: row.id,
      actorEmail: row.email,
      action: "auth.login_failed",
      targetType: "user",
      targetId: String(row.id),
      targetLabel: row.email,
    });
    return { error: genericError };
  }

  await createSession(row.id);
  await logActivity({
    actorId: row.id,
    actorEmail: row.email,
    action: "auth.login",
    targetType: "user",
    targetId: String(row.id),
    targetLabel: row.email,
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  // Lecture directe de la session (sans passer par la DAL, qui redirige
  // elle-même si la session est absente/invalide — on ne veut pas de ça ici).
  const session = await getSessionFromCookies();
  if (session?.userId) {
    try {
      const sql = getSql();
      const rows = await sql`SELECT email FROM admin_users WHERE id = ${session.userId} LIMIT 1`;
      const email = (rows[0] as { email: string } | undefined)?.email ?? null;
      await logActivity({
        actorId: session.userId,
        actorEmail: email,
        action: "auth.logout",
        targetType: "user",
        targetId: String(session.userId),
        targetLabel: email ?? undefined,
      });
    } catch {
      // Best-effort : on déconnecte quoi qu'il arrive.
    }
  }

  await deleteSession();
  redirect("/admin/login");
}
