import { getLlmsFullTxtContent, getDefaultLlmsTxt } from "@/lib/admin/geo";

// Version enrichie de /llms.txt : toujours générée automatiquement (jamais
// éditable), avec en plus les réalisations et articles réellement publiés.
export const dynamic = "force-dynamic";

export async function GET() {
  let content: string;
  try {
    content = await getLlmsFullTxtContent();
  } catch (err) {
    console.error("Impossible de charger /llms-full.txt :", err);
    content = getDefaultLlmsTxt();
  }

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
