#!/usr/bin/env node
// Migration de schéma EXPLICITE — remplace l'ancien comportement où
// `ensureSchema()` (lib/db/index.ts) créait/modifiait le schéma
// silencieusement à chaque cold start ou `next build`. Depuis le
// 10/09/2026, plus aucun code applicatif ne modifie le schéma : c'est
// UNIQUEMENT ce script, lancé volontairement via `npm run db:migrate`,
// qui le fait. Voir docs/MIGRATIONS_DB.md pour la procédure complète.
//
// Script en JavaScript simple (pas de dépendance de build, pas de
// résolution d'alias TypeScript) pour rester exécutable indépendamment de
// Next.js : `node --env-file=.env.local scripts/migrate.mjs`.
//
// Sans danger à réexécuter : toutes les instructions sont idempotentes
// (CREATE TABLE/INDEX IF NOT EXISTS, INSERT ... ON CONFLICT DO NOTHING).
// Aucune instruction destructive (pas de DROP, pas de DELETE, pas de
// TRUNCATE, pas d'ALTER qui perdrait des données).
//
// Par sécurité, le script REFUSE de s'exécuter sans le drapeau --yes :
// il affiche d'abord l'hôte ciblé (jamais les identifiants) pour que vous
// puissiez vérifier qu'il s'agit bien de la base voulue avant de confirmer.

import postgres from "postgres";
import { fileURLToPath } from "node:url";

const APPLY = process.argv.includes("--yes");

function getConnectionString() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    console.error("Aucune base configurée : DATABASE_URL (ou POSTGRES_URL) est requis dans l'environnement.");
    console.error("Exemple : node --env-file=.env.local scripts/migrate.mjs --yes");
    process.exit(1);
  }
  return url;
}

function describeTarget(connectionString) {
  try {
    const u = new URL(connectionString);
    return `${u.hostname}${u.port ? ":" + u.port : ""}${u.pathname}`;
  } catch {
    return "(URL illisible)";
  }
}

const LEGACY_REALISATIONS = [
  { category: "covering", seoTitle: "Covering total — Flotte utilitaires BTP", description: "Covering total de 8 utilitaires pour une entreprise de BTP du 93. Pose en atelier à Aubervilliers, film vinyle haute résistance, délai 5 jours.", image: "/photos-realisations/vehicule-semi-covering-1.jpg" },
  { category: "covering", seoTitle: "Semi covering — Utilitaire entreprise", description: "Semi covering véhicule utilitaire — film vinyle haute résistance, pose en atelier à Aubervilliers.", image: "/photos-realisations/vehicule-semi-covering-3.jpg" },
  { category: "covering", seoTitle: "Lettrage camion — Société de livraison express", description: "Lettrage vinyle sur camion 20m³ pour une société de livraison express. Pose en moins de 48h, résistant aux lavages haute pression.", image: "/photos-realisations/vehicule-semi-covering-2.jpg" },
  { category: "enseignes", seoTitle: "Enseigne LED — Restaurant Paris 11e", description: "Enseigne LED caisson lumineux sur mesure pour un restaurant parisien. Rétroéclairage LED basse consommation, pose et câblage inclus.", image: "/photos-realisations/enseigne-boitier-plexi-1.jpg" },
  { category: "covering", seoTitle: "Panneaux adhésifs — Marquage véhicule pro", description: "Panneaux adhésifs sur véhicule — marquage professionnel, pose en atelier Aubervilliers.", image: "/photos-realisations/vehicule-panneaux-1.jpg" },
  { category: "enseignes", seoTitle: "Caisson lumineux double face — Centre commercial Île-de-France", description: "Caisson lumineux double face de 2×1,2m pour l'entrée d'un centre commercial. Structure aluminium, modules LED IP65, garantie 2 ans pièces et main d'œuvre.", image: "/photos-realisations/enseigne-pvc-retroeclaire-1.jpg" },
  { category: "stickers", seoTitle: "Vitrophanie opaque — Boutique mode Paris", description: "Vitrophanie opaque dépoli sur vitrine de 4m². Application intérieure, finition givré, découpe sur mesure au logo de la boutique.", image: "/photos-realisations/sticker-vitrophanie-1.jpg" },
  { category: "enseignes", seoTitle: "Lettres boîtier rétroéclairées — Façade commerce", description: "Enseigne lettre boîtier — lettres en relief rétroéclairées, structure aluminium, installation en façade.", image: "/photos-realisations/enseigne-lettre-boitier-1.png" },
  { category: "covering", seoTitle: "Magnétiques repositionnables — Flotte partagée 12 véhicules", description: "12 plaques magnétiques repositionnables pour une flotte partagée. Fixation/dépose en 30 secondes, résistants à 130 km/h, réutilisables.", image: "/photos-realisations/vehicule-adhesif-decoupe-1.jpg" },
  { category: "covering", seoTitle: "Adhésif découpe — Utilitaire entreprise", description: "Adhésif découpe sur véhicule utilitaire. Pose en atelier à Aubervilliers, film vinyle haute résistance.", image: "/photos-realisations/vehicule-adhesif-decoupe-2.jpeg" },
  { category: "stickers", seoTitle: "Décoration de façade — Agence immobilière Aubervilliers", description: "Décoration complète de façade sur 12m linéaires pour une agence immobilière. Vinyle backlit, découpe numérique, pose en une journée sans fermeture.", image: "/photos-realisations/sticker-adhesif-mural-1.jpg" },
  { category: "enseignes", seoTitle: "Relief PMMA — Lettres acrylique façade", description: "Enseigne relief PMMA — lettres découpées en acrylique, finition chromée, fixation murale.", image: "/photos-realisations/enseigne-relief-pmma-1.jpg" },
  { category: "covering", seoTitle: "Adhésif découpe — Marquage entreprise locale", description: "Adhésif découpe sur véhicule — marquage professionnel pour entreprise locale.", image: "/photos-realisations/vehicule-adhesif-decoupe-3.jpeg" },
  { category: "enseignes", seoTitle: "Totem extérieur 3m — Hôtel 4 étoiles Seine-Saint-Denis", description: "Totem extérieur 3m en aluminium laqué avec caisson LED et socle béton scellé. Résistant aux intempéries IP65, entretien annuel inclus la première année.", image: "/photos-realisations/enseigne-drapeau-lumineux-1.jpg" },
];

// Copie exacte de lib/slug.ts (éviter de dépendre de l'alias TypeScript
// "@/" depuis ce script autonome — même comportement, même sortie).
function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // accents (formes combinées après normalize("NFD"))
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

async function migrateSchema(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      is_owner BOOLEAN NOT NULL DEFAULT FALSE,
      permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image_url TEXT,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      author_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      published_at TIMESTAMPTZ
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id SERIAL PRIMARY KEY,
      actor_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
      actor_email TEXT,
      action TEXT NOT NULL,
      target_type TEXT,
      target_id TEXT,
      target_label TEXT,
      metadata JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS realisations (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      seo_title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      author_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS realisation_images (
      id SERIAL PRIMARY KEY,
      realisation_id INTEGER NOT NULL REFERENCES realisations(id) ON DELETE CASCADE,
      image_url TEXT NOT NULL,
      alt TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id SERIAL PRIMARY KEY,
      form_type TEXT NOT NULL CHECK (form_type IN ('devis', 'rgpd', 'catalogue')),
      payload JSONB NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_realisations_status ON realisations(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_realisations_category ON realisations(category)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_realisation_images_realisation_id ON realisation_images(realisation_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC)`;
}

async function seedRealisationsIfEmpty(sql) {
  const existing = await sql`SELECT id FROM realisations LIMIT 1`;
  if (existing.length > 0) {
    console.log("Seed réalisations : table déjà peuplée, rien à faire.");
    return;
  }
  console.log(`Seed réalisations : insertion de ${LEGACY_REALISATIONS.length} projets historiques...`);
  for (const item of LEGACY_REALISATIONS) {
    const rows = await sql`
      INSERT INTO realisations (slug, category, seo_title, description, status)
      VALUES (${slugify(item.seoTitle)}, ${item.category}, ${item.seoTitle}, ${item.description}, 'published')
      ON CONFLICT (slug) DO NOTHING
      RETURNING id
    `;
    const realisationId = rows[0]?.id;
    if (!realisationId) continue;
    await sql`
      INSERT INTO realisation_images (realisation_id, image_url, alt, sort_order)
      VALUES (${realisationId}, ${item.image}, ${item.seoTitle}, 0)
    `;
  }
}

async function main() {
  const connectionString = getConnectionString();
  const target = describeTarget(connectionString);

  console.log("═══════════════════════════════════════════════════════════");
  console.log(" Migration de schéma — 2fpub-next-app");
  console.log(" Cible :", target);
  console.log(" Actions : CREATE TABLE/INDEX IF NOT EXISTS (idempotent, non destructif)");
  console.log("           + seed des réalisations UNIQUEMENT si la table est vide");
  console.log("═══════════════════════════════════════════════════════════");

  if (!APPLY) {
    console.log("\nMode aperçu (--yes absent) : rien n'a été exécuté.");
    console.log("Vérifiez que la cible ci-dessus est bien la bonne base, puis relancez avec :");
    console.log("  node --env-file=.env.local scripts/migrate.mjs --yes\n");
    return;
  }

  const sql = postgres(connectionString, { max: 1, ssl: "require" });
  try {
    await migrateSchema(sql);
    console.log("Schéma : OK (tables/index créés si besoin, rien supprimé).");
    await seedRealisationsIfEmpty(sql);
    console.log("\nMigration terminée avec succès.");
  } finally {
    await sql.end();
  }
}

// N'exécute `main()` que si ce fichier est lancé directement (pas importé).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error("Échec de la migration :", err);
    process.exitCode = 1;
  });
}
