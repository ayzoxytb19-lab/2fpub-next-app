# Migrations de base de données — procédure

Document produit le 10/09/2026, suite à la demande explicite du propriétaire de séparer la création/modification de schéma du cycle de build/déploiement normal. Remplace le comportement précédent (`ensureSchema()` exécuté implicitement à chaque cold start et à chaque `next build`).

---

## Ce qui a changé

- **Avant** : `lib/db/index.ts` → `ensureSchema()` exécutait `CREATE TABLE/INDEX IF NOT EXISTS` (et un seed conditionnel des réalisations historiques) à la première requête DB de chaque process — donc aussi pendant `next build` (plusieurs pages/le sitemap appellent des fonctions qui en dépendaient).
- **Maintenant** : `ensureSchema()` ne fait plus rien (conservée uniquement pour ne pas modifier les ~19 fichiers qui l'appellent — voir le commentaire dans `lib/db/index.ts`). La création/mise à jour de schéma est **un geste explicite**, exécuté uniquement via :

```bash
npm run db:migrate
```

qui lance `scripts/migrate.mjs`.

---

## Utilisation

Le script a un **mode aperçu par défaut** (n'exécute rien) et n'applique les changements qu'avec `--yes` :

```bash
# 1. Aperçu — affiche la base ciblée (hôte + nom de base, jamais les identifiants), n'exécute rien
npm run db:migrate

# 2. Une fois la cible vérifiée comme correcte, applique réellement
node --env-file=.env.local scripts/migrate.mjs --yes
```

`npm run db:migrate` (sans `--yes`) est donc **sans danger à exécuter en tout temps** — il ne fait qu'afficher la cible et s'arrêter.

**Avant de lancer avec `--yes`** : vérifiez que l'hôte affiché correspond bien à l'environnement voulu (développement ou production — voir `docs/SECURITE_FORMULAIRES.md` §1 pour le point non résolu sur Neon vs Supabase). Le script lit `.env.local` par défaut (`--env-file=.env.local`) ; pour cibler une autre base (ex. production), utilisez un autre fichier ou exportez `DATABASE_URL` manuellement avant d'exécuter le script — **ne mettez jamais l'URL de production dans `.env.local`**, gardez ce fichier pour le développement uniquement.

---

## Garanties du script

- **Idempotent** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT ... ON CONFLICT DO NOTHING` — relancer le script plusieurs fois de suite ne fait rien de plus après la première exécution réussie.
- **Non destructif** : aucune instruction `DROP`, `DELETE`, `TRUNCATE`, ni `ALTER` qui perdrait des données. Le script ne supprime et ne modifie jamais une ligne existante.
- **Seed conditionnel** : les 14 réalisations historiques ne sont insérées que si la table `realisations` est entièrement vide — sans risque de doublon si déjà peuplée (ce qui est déjà le cas sur la base utilisée en développement, confirmé le 09/09/2026).

## Ce qui n'a PAS été fait

- Le script **n'a pas été exécuté** (ni en aperçu avec effet, ni avec `--yes`) pendant cette mission — conformément à la consigne de ne plus effectuer aucune écriture DB tant que l'environnement (Neon/Supabase, dev/production) n'est pas confirmé.
- Aucune migration future (ajout de colonne, changement de contrainte) n'est anticipée ici — à ajouter dans `scripts/migrate.mjs` au fur et à mesure, toujours de façon additive/idempotente.

## Vérification que `next build` ne modifie plus le schéma

Testé le 10/09/2026 : `next build` a été exécuté après ce changement et **n'a produit aucune instruction `CREATE TABLE`/`CREATE INDEX`** (avant ce changement, la sortie contenait systématiquement des messages `NOTICE: relation "..." already exists, skipping` — ces messages ont disparu, confirmant qu'aucune instruction de schéma n'est plus émise). Le build continue de faire des lectures normales (ex. `SELECT` pour générer le sitemap et la page d'accueil), ce qui est attendu et nécessaire au fonctionnement du site — seule la partie « modification de schéma » a été retirée du chemin de build.
