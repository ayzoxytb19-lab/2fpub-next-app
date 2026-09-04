"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import { setLlmsTxtOverride } from "@/lib/admin/geo";
import { logActivity } from "@/lib/admin/log";

export type GeoFormState = { error: string } | { success: true } | null;

export async function updateLlmsTxt(_prevState: GeoFormState, formData: FormData): Promise<GeoFormState> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "settings.manage")) {
    return { error: "Vous n'avez pas la permission de gérer la configuration IA." };
  }

  const raw = String(formData.get("content") ?? "");
  // Chaîne vide (ou uniquement des espaces) = revenir à la version générée
  // automatiquement, pas la stocker telle quelle.
  const value = raw.trim() ? raw : null;

  await setLlmsTxtOverride(value);

  await logActivity({
    actorId: user.id,
    actorEmail: user.email,
    action: "settings.geo_update",
    targetType: "settings",
    targetId: "llms_txt",
    targetLabel: value ? "Contenu personnalisé" : "Retour au contenu généré automatiquement",
  });

  revalidatePath("/llms.txt");
  revalidatePath("/llms-full.txt");
  revalidatePath("/admin/geo");

  return { success: true };
}
