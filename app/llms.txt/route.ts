import { getLlmsTxtContent } from "@/lib/admin/geo";

// Convention llms.txt (https://llmstxt.org) : résumé texte du site à
// destination des moteurs de réponse IA (ChatGPT, Perplexity, Gemini...).
// Contenu éditable depuis /admin/geo, avec repli automatique sinon.
export const dynamic = "force-dynamic";

export async function GET() {
  let content: string;
  try {
    content = await getLlmsTxtContent();
  } catch (err) {
    console.error("Impossible de charger /llms.txt :", err);
    content = "# 2F Publicité\n\nContenu momentanément indisponible.";
  }

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
