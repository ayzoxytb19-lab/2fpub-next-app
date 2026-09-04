import "server-only";
import { getSql, ensureSchema } from "@/lib/db";
import { REALISATION_CATEGORIES } from "@/lib/realisations/categories";

const SETTINGS_KEY_LLMS_TXT = "llms_txt_override";

// Version par défaut de /llms.txt — utilisée tant que personne n'a
// enregistré de contenu personnalisé depuis /admin/geo. Rédigée à la main à
// partir des informations réelles du site (services, coordonnées).
export function getDefaultLlmsTxt(): string {
  return `# 2F Publicité

> Agence de communication visuelle B2B basée à Aubervilliers (Seine-Saint-Denis), en Île-de-France. Votre partenaire en communication visuelle depuis 1999.

## Activité

2F Publicité conçoit, fabrique et pose des supports de communication visuelle pour les entreprises, avec un atelier de production intégré à Aubervilliers (devis gratuit sous 24-48h sur l'ensemble des prestations).

## Produits & solutions

### Covering & marquage de véhicules (/fiches/covering)
- Adhésif découpe (vinyle monochrome sans fond) à partir de 150€ HT (lettrage simple) ou 280€ HT (véhicule).
- Adhésif + impression HD multicolore, pub 3 panneaux, covering partiel (400-900€ HT) ou total (900-2 800€ HT selon le véhicule, jusqu'à 2 100€ HT pour une caisse 20m³).
- Pose en atelier à Aubervilliers en 3-7 jours ouvrés, garantie 5 ans matériaux et pose, tarif dégressif à partir de 3 véhicules (flotte).

### Enseignes lumineuses & signalétique (/fiches/enseignes)
- 7 techniques : ajouré, PVC rétroéclairé, alu rétroéclairé (finition miroir/or), relief PMMA (10/15/20mm), relief PMMA + alu, boîtier plexi (60mm).
- Enseigne simple dès 300€ HT, caisson lumineux 800-3 500€ HT, lettres LED relief 1 200-6 000€ HT.
- LED basse consommation (jusqu'à -70%), garantie 2 ans pièces et main d'œuvre, délai de pose 2-4 semaines (7-15 jours après validation du BAT), aide aux démarches de déclaration préalable de travaux. Showroom sur place à l'atelier.

### Textile professionnel — broderie & flocage (/fiches/textile)
- Flocage (pose à chaud, dès 10 pièces) dès 12€ HT/pièce ; broderie (relief 3D, dès 12 pièces) dès 18€ HT/pièce ; sérigraphie à partir de 20 pièces.
- Vectorisation du logo offerte, BAT numérique, marques B&C / Stanley-Stella / Gildan, contrôle qualité par Aqua Pressing (40 ans d'expérience).
- T-shirts, polos, sweats, softshells, vestes, casquettes, vêtements haute visibilité... Livraison 5-10 jours ouvrés, tarifs dégressifs dès 10-50 pièces.

### Impression grand format & petite papeterie (/fiches/impression, /fiches/flyers)
- Petit et grand format jusqu'à 1m58 de large : affiches, bâches de chantier, roll-up/kakémonos, flyers, cartes de visite, dépliants/brochures, stickers et étiquettes (dont finition holographique).
- 500 flyers A5 dès 29€ HT, cartes de visite dès 39€ HT, bâche grand format dès 25€/m² HT.
- Finitions premium (pelliculage soft-touch, vernis sélectif, dorure à chaud), livraison express possible en 24-48h, sinon 3-7 jours selon le support.

### Plaques, panneaux, logo lumineux & vitrophanie (/fiches/plaques-panneaux, /fiches/logo-lumineux, /fiches/vitrophanies)
- Plaques professionnelles (Dibond/aluminium) et transparentes (Plexiglas/PVC), panneaux de chantier et grand format résistants aux intempéries — devis sur mesure selon format, matière et quantité.
- Logo lumineux rétroéclairé fabriqué sur mesure, en version comptoir (présentoir) ou murale (intérieur/extérieur).
- Vitrophanie et films adhésifs : autocollant classique, film confidentiel dépoli/givré, film décoratif, découpe adhésive numérique — pour vitrines, baies vitrées et cloisons.

## Zone de couverture

Aubervilliers (siège) et toute l'Île-de-France (Paris et petite/grande couronne).

## Coordonnées

- Adresse : 217 avenue Jean Jaurès, 93300 Aubervilliers
- Téléphone : 01 43 52 24 24
- Email : contact@2fpub.fr
- Horaires : lundi-vendredi, 9h-18h

## Chiffres clés

- Plus de 500 clients B2B accompagnés
- 25 ans d'expertise en communication visuelle
- Devis personnalisé sous 24h

## Pages utiles

- Services : /services
- Réalisations : /realisations
- Blog : /blog
- Devis gratuit : /devis
- Fiches produit : /fiches/covering, /fiches/enseignes, /fiches/textile, /fiches/impression, /fiches/flyers, /fiches/logo-lumineux, /fiches/plaques-panneaux, /fiches/vitrophanies`;
}

async function getSetting(key: string): Promise<string | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT value FROM site_settings WHERE key = ${key} LIMIT 1`;
  return (rows[0] as { value: string | null } | undefined)?.value ?? null;
}

async function setSetting(key: string, value: string | null): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (${key}, ${value}, now())
    ON CONFLICT (key) DO UPDATE SET value = ${value}, updated_at = now()
  `;
}

export async function getLlmsTxtOverride(): Promise<string | null> {
  return getSetting(SETTINGS_KEY_LLMS_TXT);
}

export async function setLlmsTxtOverride(value: string | null): Promise<void> {
  return setSetting(SETTINGS_KEY_LLMS_TXT, value);
}

// Contenu servi sur /llms.txt : la version personnalisée si elle existe,
// sinon la version par défaut.
export async function getLlmsTxtContent(): Promise<string> {
  const override = await getLlmsTxtOverride();
  return override && override.trim() ? override : getDefaultLlmsTxt();
}

// /llms-full.txt : toujours généré automatiquement (jamais personnalisable),
// enrichi avec le contenu réellement publié (réalisations, articles) au
// moment de la requête.
export async function getLlmsFullTxtContent(): Promise<string> {
  const base = await getLlmsTxtContent();

  await ensureSchema();
  const sql = getSql();

  const [categoryCounts, latestPosts] = await Promise.all([
    sql`SELECT category, count(*) AS total FROM realisations WHERE status = 'published' GROUP BY category`,
    sql`SELECT title, slug, excerpt FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT 20`,
  ]);

  const countByCategory = new Map<string, number>();
  for (const row of categoryCounts as unknown as { category: string; total: string }[]) {
    countByCategory.set(row.category, Number(row.total));
  }

  const realisationsSection = REALISATION_CATEGORIES.map((c) => {
    const count = countByCategory.get(c.key) ?? 0;
    return `- ${c.label} : ${count} projet${count > 1 ? "s" : ""} publié${count > 1 ? "s" : ""}`;
  }).join("\n");

  const posts = latestPosts as unknown as { title: string; slug: string; excerpt: string }[];
  const blogSection =
    posts.length > 0
      ? posts.map((p) => `- [${p.title}](/blog/${p.slug})${p.excerpt ? ` — ${p.excerpt}` : ""}`).join("\n")
      : "Aucun article publié pour l'instant.";

  return `${base}

## Réalisations publiées par catégorie

${realisationsSection}

## Derniers articles du blog

${blogSection}
`;
}
