import "server-only";

const CONTEXT = `2F Publicité, une agence de communication visuelle B2B (covering de véhicules, enseignes lumineuses, textile brodé/floqué, impression grand format) basée à Aubervilliers, en Île-de-France.`;

const ARTICLE_SYSTEM_PROMPT = `Tu es un copywriter expert en rédaction web et en référencement SEO, spécialisé dans les articles de blog pour ${CONTEXT}

Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte autour, au format exact :
{"title": "...", "excerpt": "...", "content": "..."}

Règles :
- "title" : titre accrocheur et optimisé SEO, entre 40 et 65 caractères, sans guillemets ni ponctuation superflue.
- "excerpt" : résumé de 140 à 160 caractères maximum, qui donne envie de cliquer, utilisable comme méta-description.
- "content" : le corps de l'article, 500 à 800 mots, en français, structuré avec une introduction, 2 à 4 sections et une conclusion avec un léger appel à l'action vers une demande de devis. N'utilise QUE cette syntaxe limitée : "## " pour un titre de section, "### " pour un sous-titre, **texte** pour le gras, *texte* pour l'italique, "- " en début de ligne pour une liste à puces. Jamais de code HTML brut, jamais d'image.
- Ton professionnel, concret, orienté PME et entreprises d'Île-de-France. Pas de superlatifs exagérés, pas de remplissage.`;

const REALISATION_SYSTEM_PROMPT = `Tu es un copywriter expert en référencement SEO, spécialisé dans les fiches projet ("réalisations"/portfolio chantier) pour ${CONTEXT}

Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte autour, au format exact :
{"title": "...", "description": "..."}

Règles :
- "title" : titre court affiché sur la vignette de la galerie, optimisé SEO, entre 30 et 60 caractères. Structure type "Nom du procédé — Contexte client" (ex: "Covering total — Flotte utilitaires BTP"), sans guillemets.
- "description" : 2 à 4 phrases (300 à 500 caractères), factuelle et concrète, décrivant le chantier (technique utilisée, matériaux, délai, contexte client). Visible uniquement quand on ouvre la fiche projet. Pas de superlatifs exagérés, pas de remplissage, pas de markdown.
- Ton professionnel et concret, orienté PME et entreprises d'Île-de-France.`;

async function callOpenAiJson(systemPrompt: string, userMessage: string): Promise<Record<string, unknown>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY manquant dans les variables d'environnement. Voir .env.example.");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI a répondu ${res.status} : ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Réponse vide de l'IA.");

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error("Réponse de l'IA illisible (JSON invalide).");
  }
}

export type GeneratedArticle = { title: string; excerpt: string; content: string };

export async function generateBlogArticle(topic: string): Promise<GeneratedArticle> {
  const obj = await callOpenAiJson(ARTICLE_SYSTEM_PROMPT, `Sujet de l'article à rédiger : ${topic}`);

  const title = typeof obj.title === "string" ? obj.title.trim() : "";
  const excerpt = typeof obj.excerpt === "string" ? obj.excerpt.trim() : "";
  const content = typeof obj.content === "string" ? obj.content.trim() : "";

  if (!title || !content) throw new Error("Réponse de l'IA incomplète.");

  return { title, excerpt, content };
}

export type GeneratedRealisationCopy = { title: string; description: string };

export async function generateRealisationCopy(
  topic: string,
  categoryLabel?: string
): Promise<GeneratedRealisationCopy> {
  const userMessage = categoryLabel
    ? `Catégorie : ${categoryLabel}. Description brute du chantier : ${topic}`
    : `Description brute du chantier : ${topic}`;

  const obj = await callOpenAiJson(REALISATION_SYSTEM_PROMPT, userMessage);

  const title = typeof obj.title === "string" ? obj.title.trim() : "";
  const description = typeof obj.description === "string" ? obj.description.trim() : "";

  if (!title || !description) throw new Error("Réponse de l'IA incomplète.");

  return { title, description };
}
