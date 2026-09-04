"use server";

import { getCurrentUser, hasPermission } from "@/lib/admin/dal";
import {
  generateBlogArticle,
  generateRealisationCopy,
  type GeneratedArticle,
  type GeneratedRealisationCopy,
} from "@/lib/admin/ai";
import { logActivity } from "@/lib/admin/log";
import { realisationCategoryLabel } from "@/lib/realisations/categories";

export type GenerateArticleResult = { data: GeneratedArticle } | { error: string };
export type GenerateRealisationResult = { data: GeneratedRealisationCopy } | { error: string };

// Server Action (et non Route Handler) : appelée directement depuis le
// composant client du formulaire d'article, comme un appel de fonction.
export async function generateArticleFromTopic(topic: string): Promise<GenerateArticleResult> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "posts.create") && !hasPermission(user, "posts.edit")) {
    return { error: "Vous n'avez pas la permission de créer ou modifier des articles." };
  }

  const trimmed = topic.trim();
  if (!trimmed) {
    return { error: "Décrivez le sujet de l'article." };
  }
  if (trimmed.length > 300) {
    return { error: "Sujet trop long (300 caractères maximum)." };
  }

  try {
    const data = await generateBlogArticle(trimmed);

    await logActivity({
      actorId: user.id,
      actorEmail: user.email,
      action: "post.ai_generate",
      targetType: "post",
      targetLabel: data.title,
      metadata: { topic: trimmed },
    });

    return { data };
  } catch (err) {
    console.error("Échec de génération IA d'article :", err);
    const message = err instanceof Error ? err.message : "Échec de la génération.";
    return { error: `Échec de la génération IA. ${message}` };
  }
}

export async function generateRealisationFromTopic(
  topic: string,
  category: string
): Promise<GenerateRealisationResult> {
  const user = await getCurrentUser();
  if (!hasPermission(user, "realisations.create") && !hasPermission(user, "realisations.edit")) {
    return { error: "Vous n'avez pas la permission de créer ou modifier des réalisations." };
  }

  const trimmed = topic.trim();
  if (!trimmed) {
    return { error: "Décrivez le chantier." };
  }
  if (trimmed.length > 300) {
    return { error: "Description trop longue (300 caractères maximum)." };
  }

  try {
    const categoryLabel = category ? realisationCategoryLabel(category) : undefined;
    const data = await generateRealisationCopy(trimmed, categoryLabel);

    await logActivity({
      actorId: user.id,
      actorEmail: user.email,
      action: "realisation.ai_generate",
      targetType: "realisation",
      targetLabel: data.title,
      metadata: { topic: trimmed, category },
    });

    return { data };
  } catch (err) {
    console.error("Échec de génération IA de réalisation :", err);
    const message = err instanceof Error ? err.message : "Échec de la génération.";
    return { error: `Échec de la génération IA. ${message}` };
  }
}
