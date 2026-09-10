import "server-only";
import postgres from "postgres";

// Chaîne de connexion Postgres standard (protocole TCP, port 5432/6543) :
// compatible avec n'importe quel fournisseur (Vercel Postgres/Neon, Supabase,
// RDS, etc.) — voir .env.example. On accepte plusieurs noms de variable car
// certaines intégrations en injectent plusieurs.
function getConnectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_UNPOOLED;

  if (!url) {
    throw new Error(
      "Aucune base de données configurée : ajoutez DATABASE_URL (ou POSTGRES_URL) dans les variables d'environnement. Voir .env.example."
    );
  }

  return url;
}

type Sql = ReturnType<typeof postgres>;

let cachedSql: Sql | null = null;

// Le client n'est créé qu'au premier appel réel (jamais au chargement du
// module), pour que `next build` ne casse pas tant qu'aucune base n'est
// encore connectée.
export function getSql(): Sql {
  if (!cachedSql) {
    cachedSql = postgres(getConnectionString(), {
      // Une connexion par instance serverless : évite d'épuiser les
      // connexions disponibles côté base quand plusieurs fonctions Vercel
      // tournent en parallèle.
      max: 1,
      ssl: "require",
    });
  }
  return cachedSql;
}

// ── Migration de schéma : neutralisée depuis le 10/09/2026 ──────────────
//
// AVANT : cette fonction créait/mettait à jour le schéma (CREATE TABLE/INDEX
// IF NOT EXISTS) à la première requête réelle de chaque cold start, et donc
// aussi à chaque `next build` local (les pages qui l'appellent sont prérendues
// au build). Sans danger en soi (tout était idempotent, rien de destructif),
// mais cela signifiait qu'un simple build pouvait modifier le schéma d'une
// base sans étape de validation explicite — voir docs/SECURITE_FORMULAIRES.md
// §2 et docs/MIGRATIONS_DB.md.
//
// MAINTENANT : la création/mise à jour de schéma est un geste explicite et
// séparé, exécuté UNIQUEMENT via `npm run db:migrate` → scripts/migrate.mjs.
// Cette fonction ne touche plus la base — elle est conservée telle quelle
// (nom, signature, tous les appels existants dans le code restent valides)
// pour ne pas devoir modifier les ~19 fichiers qui l'appellent avant chaque
// requête. Si le schéma n'existe pas encore sur la base ciblée, les requêtes
// échoueront avec une erreur Postgres explicite (« relation ... does not
// exist ») plutôt que de créer silencieusement des tables — c'est voulu.
export async function ensureSchema(): Promise<void> {
  return;
}
