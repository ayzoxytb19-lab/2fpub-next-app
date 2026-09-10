// Liste fixe des permissions attribuables à un compte admin (hors
// propriétaire, qui les a toutes implicitement). Utilisée à la fois pour
// vérifier les droits côté serveur et pour générer les cases à cocher dans
// l'écran de gestion des comptes.

export const PERMISSION_KEYS = [
  "posts.create",
  "posts.edit",
  "posts.delete",
  "posts.publish",
  "realisations.create",
  "realisations.edit",
  "realisations.delete",
  "realisations.publish",
  "media.upload",
  "users.manage",
  "logs.view",
  "settings.manage",
  "submissions.view",
] as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  "posts.create": "Créer des articles",
  "posts.edit": "Modifier des articles",
  "posts.delete": "Supprimer des articles",
  "posts.publish": "Publier / dépublier des articles",
  "realisations.create": "Créer des réalisations",
  "realisations.edit": "Modifier des réalisations",
  "realisations.delete": "Supprimer des réalisations",
  "realisations.publish": "Publier / dépublier des réalisations",
  "media.upload": "Ajouter des photos",
  "users.manage": "Gérer les comptes et leurs permissions",
  "logs.view": "Voir le journal d'activité",
  "settings.manage": "Gérer la configuration IA (GEO / llms.txt)",
  "submissions.view": "Voir les demandes de devis, RGPD et catalogue reçues",
};

export function isPermissionKey(value: string): value is PermissionKey {
  return (PERMISSION_KEYS as readonly string[]).includes(value);
}

export function sanitizePermissions(input: unknown): PermissionKey[] {
  if (!Array.isArray(input)) return [];
  const result: PermissionKey[] = [];
  for (const item of input) {
    if (typeof item === "string" && isPermissionKey(item) && !result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}
