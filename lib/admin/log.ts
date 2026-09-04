import "server-only";
import { getSql } from "@/lib/db";

export type ActivityAction =
  | "auth.login"
  | "auth.login_failed"
  | "auth.logout"
  | "auth.owner_setup"
  | "post.create"
  | "post.update"
  | "post.publish"
  | "post.unpublish"
  | "post.delete"
  | "post.ai_generate"
  | "realisation.create"
  | "realisation.update"
  | "realisation.publish"
  | "realisation.unpublish"
  | "realisation.delete"
  | "realisation.ai_generate"
  | "user.create"
  | "user.permissions_update"
  | "user.activate"
  | "user.deactivate"
  | "media.upload"
  | "settings.geo_update";

type LogInput = {
  actorId: number | null;
  actorEmail: string | null;
  action: ActivityAction;
  targetType?: string;
  targetId?: string;
  targetLabel?: string;
  metadata?: Record<string, unknown>;
};

// Best-effort : une erreur de journalisation ne doit jamais faire échouer
// l'action métier qu'elle accompagne.
export async function logActivity(input: LogInput): Promise<void> {
  try {
    const sql = getSql();
    await sql`
      INSERT INTO activity_logs (actor_id, actor_email, action, target_type, target_id, target_label, metadata)
      VALUES (
        ${input.actorId},
        ${input.actorEmail},
        ${input.action},
        ${input.targetType ?? null},
        ${input.targetId ?? null},
        ${input.targetLabel ?? null},
        ${input.metadata ? JSON.stringify(input.metadata) : null}
      )
    `;
  } catch (err) {
    console.error("Échec de journalisation d'activité admin:", err);
  }
}

export const ACTIVITY_LABELS: Record<ActivityAction, string> = {
  "auth.login": "Connexion",
  "auth.login_failed": "Tentative de connexion échouée",
  "auth.logout": "Déconnexion",
  "auth.owner_setup": "Création du compte propriétaire",
  "post.create": "Création d'un article",
  "post.update": "Modification d'un article",
  "post.publish": "Publication d'un article",
  "post.unpublish": "Dépublication d'un article",
  "post.delete": "Suppression d'un article",
  "post.ai_generate": "Génération IA d'un article",
  "realisation.create": "Création d'une réalisation",
  "realisation.update": "Modification d'une réalisation",
  "realisation.publish": "Publication d'une réalisation",
  "realisation.unpublish": "Dépublication d'une réalisation",
  "realisation.delete": "Suppression d'une réalisation",
  "realisation.ai_generate": "Génération IA d'une réalisation",
  "user.create": "Création d'un compte",
  "user.permissions_update": "Modification des permissions",
  "user.activate": "Réactivation d'un compte",
  "user.deactivate": "Désactivation d'un compte",
  "media.upload": "Ajout d'une photo",
  "settings.geo_update": "Modification de la configuration IA (GEO)",
};
