# Environnement et déploiement — 2fpub-next-app

Document produit le 09/09/2026, en lecture seule sur le dépôt réel (branche `feature/blog-realisations-admin-ia`). Aucune modification de production, aucun changement DNS, aucune suppression de page n'a été effectué pour produire ce document. Conformément au cahier des charges (`DOSSIER_2FPUB_CLAUDE_CODE/REFONTE_2FPUB_CLAUDE_CODE.md`, §2.2), chaque ligne indique soit un fait constaté dans le dépôt/les fichiers de configuration accessibles, soit « non confirmé » lorsqu'aucune preuve locale n'existe. Les valeurs de secrets ne sont jamais reproduites ici — seuls les noms de variables et leur fonction le sont.

---

## 1. État du dépôt au moment de l'audit

- **Dépôt** : `github.com/forpubidf-dotcom/2fpub-next-app` (remote `origin`, HTTPS).
- **Branches locales** : `feature/blog-realisations-admin-ia` (courante) et `main`. Les deux existent aussi côté `origin`.
- **Branche courante** : à jour avec `origin/feature/blog-realisations-admin-ia` (`git status` : « up to date »).
- **Modifications non commitées au moment de l'audit** (préexistantes, non produites par ce travail — laissées intactes) :
  - `app/(site)/HomeClient.tsx`, `app/(site)/devis/page.tsx`, `app/globals.css`, `components/Header.tsx`, `components/admin/RealisationForm.tsx`, `components/admin/RealisationImagesUpload.tsx`.
  - Non trackés : `DOSSIER_2FPUB_CLAUDE_CODE/` (dossier de cahier des charges fourni le 09/09/2026) et `docs/` (audits SEO du 08/09/2026 + ce document).
- **7 commits** sur la branche courante, du commit initial (`Create Next App`) à `eef799f` (« Corrige le chevauchement des cartes du méga-menu Services »). Historique cohérent : migration d'une SPA statique vers l'App Router (`0b9e64a`), puis ajout progressif de fonctionnalités (méga-menu, hero, CMS admin, IA, GEO/llms.txt, avis Google, animations).
- **Aucune branche/tag explicitement documenté comme « production »** dans le dépôt lui-même (pas de `CONTRIBUTING.md` ni de règle de branche visible depuis le code). Le contenu de `.vercel/repo.json` associe le dépôt à un projet Vercel unique sans préciser de branche de production — **non confirmé** depuis le dépôt seul (à vérifier dans les réglages du projet Vercel : Settings → Git).

## 2. Stack technique

| Élément | Valeur constatée | Source |
|---|---|---|
| Next.js | `16.2.12` (App Router) | `package.json`, confirmé par `node_modules/next/package.json` |
| React / React DOM | `19.2.4` | `package.json` |
| TypeScript | `^5` (compilateur) | `package.json`, `tsconfig.json` |
| Node.js (local) | `v22.23.2` constaté sur la machine d'audit | `node -v` — **aucun `.nvmrc`/`engines` dans le repo**, donc aucune version n'est figée pour la CI/Vercel : non confirmé côté hébergeur |
| npm | `10.9.8` constaté localement | `npm -v` |
| Gestionnaire de paquets | npm (seul `package-lock.json` présent ; pas de `yarn.lock` ni `pnpm-lock.yaml`) | racine du dépôt |
| Scripts `package.json` | `dev` → `next dev`, `build` → `next build`, `start` → `next start`, `lint` → `eslint` | `package.json` — **aucun script `test`** |
| Dépendances de production | `@vercel/blob`, `jose`, `next`, `postgres`, `react`, `react-dom`, `server-only` | `package.json` |
| Dépendances de dev | `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `typescript` | `package.json` |

**Particularité de version notée dans `AGENTS.md`** : ce projet utilise `proxy.ts` à la racine comme équivalent du middleware Next.js habituel (`middleware.ts`), et embarque une documentation locale dans `node_modules/next/dist/docs/` (confirmé présent : dossiers `01-app`, `02-pages`, `03-architecture`, `04-community`). Cette documentation sera consultée avant toute modification de code touchant des conventions Next.js afin de respecter les éventuels changements de comportement de cette version.

## 3. Structure App Router

- Racine : `app/layout.tsx` (layout global, `metadata` unique — voir `docs/seo-audit/AUDIT-TECHNIQUE.md` §1-2 pour le détail).
- Groupe public : `app/(site)/` — 18 routes statiques + 1 route dynamique `/blog/[slug]`. Layout dédié `app/(site)/layout.tsx` (Header, ViewTransition, Footer, FloatingWidgets).
- Groupe admin : `app/admin/` — sous-groupes `(public)` (`/admin/login`, `/admin/setup`) et `(protected)` (`/admin/posts`, `/admin/realisations`, `/admin/users`, `/admin/logs`, `/admin/geo`), plus `app/admin/media/upload` (route API d'upload).
- Fichiers de convention Next.js présents : `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt` (route custom, convention `llmstxt.org`), `app/llms-full.txt`. **Aucun `not-found.tsx` personnalisé** (confirmé, voir `docs/seo-audit/AUDIT-TECHNIQUE.md` §9).
- `proxy.ts` (racine) : équivalent middleware, ne protège que `/admin/*` (authentification par cookie de session JWT) et ajoute `X-Robots-Tag: noindex` sur ces routes. Aucun impact sur les routes publiques.
- Composants partagés : `components/` (Header, Footer, FloatingWidgets, RealisationsGallery, RealisationModal, composants `admin/*`).
- Bibliothèque interne : `lib/` — `db/` (connexion Postgres + schéma + migration idempotente), `admin/` (session JWT, permissions, mots de passe, logs, IA, GEO), `interactions.ts` (logique JS des pages `"use client"`), `markdown.ts`, `slug.ts`, `realisations/`.
- Styles : un unique `app/globals.css` global (pas de CSS Modules ni de Tailwind détecté dans les dépendances).
- Polices et assets : dossier `public/` (~83 Mo) contenant logos, photos d'atelier/équipe/réalisations/services, mockups et polices (`public/fonts`) — pas de `next/font` détecté dans le code audité (à confirmer par une recherche dédiée si besoin lors de la phase SEO/performance).

Pour le détail page par page (metadata, H1/H2, maillage interne, CTA), voir `docs/seo-audit/INVENTAIRE-PAGES.md` et `docs/seo-audit/INVENTAIRE-URL.md`, produits le 08/09/2026 sur le même code et revérifiés cohérents avec l'état actuel (aucune régression détectée lors de cet audit du 09/09/2026 sur les points techniques republiés ci-dessous).

## 4. Mode de rendu et données

- Pages statiques « contenu » (`/a-propos`, `/services`, fiches produit, `/mentions-legales`, `/confidentialite`, `/suppression-donnees`, `/plan-du-site`) : composants **client** (`"use client"`, avec `// @ts-nocheck`), rendues au build en pages statiques (confirmé par `next build`, marquées `○ (Static)`).
- Pages connectées à la base de données : `/` (accueil, réalisations dynamiques), `/realisations`, `/blog`, `/blog/[slug]`, tout `app/admin/*` — toutes en `export const dynamic = "force-dynamic"`, confirmées `ƒ (Dynamic)` dans la sortie de build.
- `/sitemap.xml` et `/robots.txt` : générés dynamiquement par `app/sitemap.ts`/`app/robots.ts`, mais rendus `○ (Static)` au build (pas de dépendance à la requête entrante, seulement à la base au moment du build/du premier appel).
- **CMS** : pas de CMS externe (Contentful, Sanity, etc.). Un CMS interne « fait main » existe dans `app/admin/` (articles de blog + réalisations), stocké en base Postgres, avec upload d'images vers Vercel Blob. Génération de contenu assistée par IA (OpenAI) optionnelle depuis l'admin (`lib/admin/ai.ts`), désactivée proprement si `OPENAI_API_KEY` est absente.
- **Base de données** : Postgres (bibliothèque `postgres`), connexion via `DATABASE_URL`/`POSTGRES_URL`/`DATABASE_URL_UNPOOLED` (`lib/db/index.ts`). Le `.env.example` indique explicitement un provisioning **Vercel Postgres propulsé par Neon**. Le schéma (`admin_users`, `posts`, `activity_logs`, `realisations`, `realisation_images`, `site_settings`) est créé via `CREATE TABLE IF NOT EXISTS` à chaque cold start (migration idempotente, sans risque de duplication).
- **Constat opérationnel important** : la commande `next build` exécutée pendant cet audit (en local, avec le `.env.local` du dépôt) **s'est bien connectée à une base Postgres réelle** — toutes les tables et index existaient déjà (« relation … already exists, skipping »). Cela signifie qu'une base de données fonctionnelle est déjà provisionnée et que `.env.local` pointe dessus. **Il n'a pas été déterminé si cette base est la base de développement ou la base de production** — à confirmer avant toute opération d'écriture depuis un environnement local, par prudence aucune commande d'écriture n'a été exécutée pendant cet audit.
- **Stockage médias** : `@vercel/blob` (upload depuis l'admin), variable `BLOB_READ_WRITE_TOKEN`. Les images « historiques » (avant CMS) sont servies statiquement depuis `public/`.
- **Cache/revalidation** : aucun usage de `revalidate`/`unstable_cache`/ISR détecté sur les pages dynamiques (tout est `force-dynamic`, donc sans cache Next.js applicatif). Impact performance à évaluer en Phase D, pas de correction proposée ici.

## 5. Formulaire de devis et formulaire RGPD — état constaté (vérification non destructive)

> **Mise à jour du 09/09/2026 (suite de la mission) : le constat ci-dessous (Formspree jamais configuré) reste exact pour ce qu'il décrit — l'état du code AVANT correction — et est conservé tel quel pour l'historique. Depuis, les 3 formulaires du site (devis, RGPD, catalogue) ont été reconstruits pour écrire directement dans la base Postgres existante (`form_submissions`, voir `lib/forms/data.ts` et `app/forms/submit/route.ts`) plutôt que de dépendre de Formspree. Aucun compte tiers, aucune clé, aucun service payant.** Testé de bout en bout (voir compte rendu de conversation) : les 3 formulaires écrivent réellement en base, consultable dans `/admin/soumissions` (nouvelle page, permission `submissions.view`). Le formulaire catalogue (`lib/interactions.ts`, fiche textile) avait en réalité un défaut plus grave que Formspree non configuré : **sa fenêtre modale n'existait tout simplement pas dans le JSX** — le bouton ne faisait rien du tout. Elle a été créée. Le fichier `/2F_CATALOGUE.pdf` promis par le bouton de téléchargement **n'existe toujours pas** dans `public/` — le texte a été corrigé pour ne plus promettre un téléchargement instantané (« envoyé par email » à la place, une fois le PDF disponible et envoyé manuellement depuis les soumissions reçues). Détail des sections 5 et 10 (variables d'environnement) à relire à la lumière de cette mise à jour.

- **`/devis`** (`app/(site)/devis/page.tsx`) : formulaire HTML natif, `action="https://formspree.io/f/VOTRE_FORM_ID_ICI"` — **placeholder non remplacé**, avec un bloc de commentaire dans le code demandant explicitement de créer un compte Formspree et de renseigner l'ID. **En l'état, la soumission échouera** (le endpoint `VOTRE_FORM_ID_ICI` n'existe pas chez Formspree). Confirmé encore présent au 09/09/2026 malgré des modifications locales récentes et non commitées sur ce même fichier (ajout de 4 cases à cocher services) — ces modifications n'ont pas touché à l'`action` du formulaire.
- **`/suppression-donnees`** (`app/(site)/suppression-donnees/page.tsx`) : même défaut, `action="https://formspree.io/f/VOTRE_RGPD_FORM_ID_ICI"`.
- **Aucune correction n'a été appliquée à ces formulaires par cet audit**, conformément à la consigne du cahier des charges (« formulaire de devis fonctionnel réglé par l'utilisateur, ne pas le refaire inutilement ») et à l'annexe A qui précise que le formulaire a « depuis été réglé par l'utilisateur » — **contradiction à signaler au propriétaire** : le code actuel montre toujours le placeholder Formspree non configuré. Il est possible que le réglage évoqué en annexe A porte sur un autre aspect du formulaire (comportement JS, validation) et non sur la création du compte Formspree lui-même — **à confirmer avant toute intervention**, pour ne pas dupliquer un travail déjà fait ailleurs (ex. variable d'environnement injectée côté Vercel, compte Formspree existant dont l'ID n'a pas encore été reporté dans le code).
- Anti-spam : aucun mécanisme visible dans le JSX audité (pas de honeypot, pas de captcha) — le traitement anti-spam, s'il existe, serait côté Formspree une fois l'ID configuré (fonctionnalité native de Formspree), non vérifiable sans compte actif.
- Destinataire(s) des soumissions : dépend de la configuration du compte Formspree (externe au dépôt) — non confirmé.
- Stockage éventuel des soumissions en base : aucun code de persistance des soumissions de devis en base Postgres détecté (`grep` sur `devis`/`quote` dans `lib/db` : aucune table dédiée) — les soumissions, une fois Formspree configuré, transiteraient uniquement par Formspree (email et/ou dashboard Formspree), pas par la base du site.

## 6. Metadata, structured data, canonical, analytics — état confirmé

Repris et revérifié depuis `docs/seo-audit/AUDIT-TECHNIQUE.md` (08/09/2026), cohérent avec l'état du code au 09/09/2026 :

- **Aucun `metadataBase`**, **aucun `canonical`**, **aucun JSON-LD** nulle part dans le repo (recherches exhaustives confirmées).
- **16 des 18 pages statiques** partagent le même title/description hérités de `app/layout.tsx` (seules `/blog` et `/blog/[slug]` ont une metadata propre).
- **`/suppression-donnees` absente de `STATIC_ROUTES`** dans `app/sitemap.ts` → absente du sitemap XML généré.
- `lastModified` du sitemap : `new Date()` pour toutes les routes statiques (date de génération, pas une vraie date de contenu).
- `app/robots.ts` : configuration simple et correcte (`allow: /`, `disallow: /admin`, sitemap déclaré).
- **Analytics / consentement — constat nouveau de cet audit** : recherche exhaustive (`grep -rniE "gtag|google-analytics|googletagmanager|gtm|consent"` sur `app/`, `components/`, `lib/`) → **aucune occurrence**. Aucun package `@vercel/analytics`, `@next/third-parties` ou équivalent dans `package.json`. **Aucun code Google Analytics 4, Google Tag Manager ou bandeau de consentement cookies n'est présent dans le code actuel du site**, alors que le cahier des charges (§6.5) évoque un export GA4 existant avec « zéro événement clé ». Cela suggère que GA4 est peut-être configuré uniquement côté Google (propriété créée, mais aucun tag de mesure jamais posé sur ce site Next.js), ou que le tag a été retiré du code à un moment donné, ou qu'il est injecté par un mécanisme hors du dépôt (extension navigateur de test, Google Tag Manager configuré ailleurs, domaine différent). **Point bloquant à clarifier avec le propriétaire/Axomedia avant toute implémentation de mesure** (voir §8).

## 7. Vérifications exécutées (Phase 1, non destructives)

Commandes réellement présentes dans `package.json`, exécutées sans modification de fichier :

| Commande | Résultat | Détail |
|---|---|---|
| `npx tsc --noEmit` | ✅ Succès, aucune erreur | Aucune sortie |
| `npx eslint .` | ⚠️ 315 problèmes (182 erreurs, 133 avertissements) | Détail ci-dessous |
| `npx next build` | ✅ Succès (exit code 0) | 30 routes générées, aucune erreur de build ; connexion réelle à la base Postgres confirmée (voir §4) |

**Détail des 315 problèmes ESLint**, par règle :

| Règle | Occurrences | Nature |
|---|---|---|
| `react/no-unescaped-entities` | 164 | Apostrophes non échappées (`'` → `&apos;`) dans du texte JSX — cosmétique, aucun risque fonctionnel |
| `@next/next/no-img-element` | 100 | Usage de `<img>` natif plutôt que `next/image` — déjà documenté dans `docs/seo-audit/AUDIT-TECHNIQUE.md` §10, correction à arbitrer en Phase D |
| `@typescript-eslint/no-unused-vars` | 33 | Essentiellement des paramètres d'événement (`e`) non utilisés dans des handlers — cosmétique |
| `@typescript-eslint/ban-ts-comment` | 16 | `// @ts-nocheck` en tête des pages `"use client"` — désactive la vérification TypeScript sur ces fichiers ; cohérent avec le constat `docs/seo-audit/AUDIT-TECHNIQUE.md` sur la nature client de ces pages, mais masque des erreurs de type potentielles tant que ces fichiers ne sont pas convertis |
| `react-hooks/set-state-in-effect` | 1 | **`components/Header.tsx:140`** — `setState` appelé de façon synchrone dans un `useEffect` (fermeture du menu mobile au changement de route), ce que la règle signale comme pouvant déclencher des rendus en cascade. Fonctionnel en l'état (pas un bug bloquant observé), mais à corriger proprement en Phase D plutôt qu'ignoré. |
| `@typescript-eslint/no-explicit-any` | 1 | `components/Header.tsx:211` — un type `any` explicite |

**Aucune de ces alertes ESLint ne fait échouer le build** (`next build` réussit malgré elles — ESLint n'est pas configuré en bloquant sur ce projet). Aucune correction n'a été appliquée à ce stade : conformément au cahier des charges, les corrections « sûres » seront proposées et appliquées progressivement en Phase D, après validation du plan de travail.

**Non exécuté** : aucun script `test` n'existe dans `package.json` — pas de suite de tests automatisés dans ce projet à ce jour.

## 8. Environnement de mise en ligne (tableau demandé §2.2 du cahier des charges)

| Élément | Résultat |
|---|---|
| **Dépôt et branche de production** | Dépôt GitHub `forpubidf-dotcom/2fpub-next-app`. Branches `main` et `feature/blog-realisations-admin-ia` existent côté `origin`. **Branche réellement déployée en production : non confirmée** depuis le dépôt (aucun fichier de config Vercel dans le repo ne le précise) — à vérifier dans Vercel → Project Settings → Git → Production Branch. |
| **Hébergement Next.js** | **Vercel**, confirmé par la présence de `.vercel/` (non commité, présent localement) référençant un projet nommé `2fpub-next-app`, et par `.env.example` qui documente explicitement le provisioning Vercel Postgres/Neon et Vercel Blob. Type de déploiement (Hobby/Pro/Enterprise), région de déploiement, runtime exact (Node.js serverless vs Edge) : **non confirmés** depuis le dépôt — nécessite un accès au dashboard Vercel. Variables d'environnement nécessaires identifiées (noms uniquement, voir §9). |
| **Domaine et DNS** | Domaine cible `2fpub.fr` / `www.2fpub.fr` (constaté dans `app/sitemap.ts`, `app/robots.ts`, `.env.example`, mentions-légales). Gestionnaire DNS actuel, propriétaire du domaine, statut exact de la connexion Vercel↔domaine : **non confirmés** depuis le dépôt. Le choix canonique www vs non-www est présumé « www » par le code (`SITE_URL` par défaut = `https://www.2fpub.fr`) mais **aucune redirection technique www/non-www n'est visible dans le code** (ni `next.config.ts`, ni `proxy.ts`) — si elle existe, elle serait gérée au niveau DNS/Vercel, hors périmètre du dépôt. |
| **Site Axomedia (ancien site)** | Aucune référence trouvée dans le code actuel (`grep -rin "axomedia"` → zéro résultat, confirmé dans `docs/seo-audit/INVENTAIRE-URL.md` §6). Hébergement, accès disponibles, responsabilités, date de bascule : **non confirmés**, informations explicitement attendues d'Axomedia selon le cahier des charges. Les seules données disponibles sur l'ancien site sont les exports fournis dans `DOSSIER_2FPUB_CLAUDE_CODE/sources/` (sitemap 2024, GSC, GA4, Semrush) — analysés séparément dans le futur `docs/AUDIT_SEO_HISTORIQUE.md` (Phase 2). |
| **SSL / HTTPS** | Non vérifiable depuis le dépôt (dépend de l'hébergeur/domaine). Vercel fournit un certificat automatique pour les domaines qu'il gère — **à confirmer que le domaine `2fpub.fr` est bien pointé et géré par Vercel actuellement**, ce que le dépôt seul ne permet pas d'établir. |
| **CI/CD** | **Aucun fichier `.github/workflows/`** ni autre configuration CI trouvée dans le dépôt. Aucun `vercel.json` non plus (donc pas de configuration de build/rewrites custom côté Vercel au niveau du dépôt — les réglages de build, s'ils diffèrent des valeurs par défaut Next.js, seraient uniquement dans le dashboard Vercel). Le déploiement est donc **probablement automatique via l'intégration Git native de Vercel** (build + déploiement sur push), sans étape de test/lint bloquante visible dans le dépôt — **non confirmé à 100 %** sans accès au dashboard. |
| **Préproduction** | Vercel génère par défaut une URL de prévisualisation par déploiement/branche non-production (comportement standard de la plateforme). Existence d'un environnement de préprod dédié et stable, sa protection contre l'indexation (les URLs de preview Vercel sont `noindex` par défaut via header HTTP, pas de configuration additionnelle requise côté code), mode d'accès : **non confirmés** au-delà de ce comportement par défaut de Vercel — à vérifier dans le dashboard. |
| **Formulaire (devis/RGPD/catalogue)** | **Mise à jour 09/09/2026** : ne dépend plus de Formspree. Les 3 formulaires écrivent dans la base Postgres existante via `app/forms/submit/route.ts` (consultable dans `/admin/soumissions`). Aucune variable d'environnement ni service supplémentaire requis — réutilise `DATABASE_URL` déjà en place. Une notification email des nouvelles soumissions n'existe pas encore (à ajouter seulement sur votre confirmation, voir §5) — pour l'instant, il faut consulter `/admin/soumissions` régulièrement. |
| **Médias et données** | Photos historiques : `public/` (statique, ~83 Mo, commité dans le dépôt). Médias uploadés depuis l'admin (CMS interne) : **Vercel Blob** (`@vercel/blob`, variable `BLOB_READ_WRITE_TOKEN`). Données structurées (articles, réalisations, comptes admin, logs) : **Postgres** (Vercel Postgres/Neon selon `.env.example`), connexion confirmée fonctionnelle en local au moment de l'audit (voir §4). Sauvegarde de cette base : **non confirmée** — dépend du plan Neon/Vercel Postgres souscrit (à vérifier dans le dashboard). |
| **Analytics** | **Aucun code GA4/GTM/consentement dans le repo actuel** (voir §6, constat nouveau de cet audit). Aucun identifiant de mesure public trouvé dans le code. État réel d'une propriété GA4 externe, d'un conteneur GTM, ou d'un export Search Console connecté à ce domaine : **non confirmé** depuis le dépôt — cohérent avec le point 6.5 du cahier des charges qui indique cette information comme « en attente Axomedia ». |
| **Sécurité** | Variables d'environnement nécessaires identifiées par nom (voir §9), aucune valeur consultée ni reproduite. Authentification admin : session JWT signée (bibliothèque `jose`, HS256) stockée en cookie, secret via `SESSION_SECRET` (à générer avec `openssl rand -base64 32`, jamais commité — absent de `.gitignore` par nom explicite mais couvert par la règle générale `.env*`). Accès et journaux d'accès Vercel : **non confirmés** depuis le dépôt. Un système de logs applicatifs interne existe (`activity_logs` en base, visible depuis `/admin/logs`), distinct des logs d'infrastructure Vercel. |
| **Sauvegarde / retour arrière** | Procédure de rollback réellement possible : **non confirmée** — dépend des fonctionnalités du plan Vercel (rollback de déploiement) et du plan Neon/Vercel Postgres (sauvegardes automatiques, point-in-time recovery) souscrits, non vérifiables depuis le dépôt. Aucune dépendance Axomedia identifiée pour un rollback du site Next.js actuel (l'ancien site semble être une infrastructure séparée) — **à confirmer** une fois les accès Axomedia disponibles. |
| **Supervision** | Logs d'erreurs applicatifs : `console.error` utilisés ponctuellement dans le code (ex. `app/sitemap.ts`, `app/llms.txt`) — remontent probablement vers les logs de fonctions Vercel par défaut, sans outil de monitoring/alerting dédié détecté dans les dépendances (pas de Sentry, LogRocket, etc. dans `package.json`). Alertes uptime : **non confirmées**. |

## 9. Variables d'environnement — noms et fonctions (aucune valeur reproduite)

Source : `.env.example` (commité, sert de référence) et présence confirmée (noms de clé uniquement) dans `.env.local` (non commité, ignoré par `.gitignore`) :

| Variable | Fonction | Statut constaté |
|---|---|---|
| `DATABASE_URL` | Connexion Postgres (articles, comptes admin, réalisations, logs) | Présente en local (valeur non consultée en détail ; connexion confirmée fonctionnelle via `next build`, voir §4) |
| `BLOB_READ_WRITE_TOKEN` | Jeton d'upload/lecture Vercel Blob (photos uploadées depuis l'admin) | Présente en local |
| `SESSION_SECRET` | Clé de signature des sessions admin (JWT HS256) | Présente en local |
| `OPENAI_API_KEY` | Génération de contenu assistée par IA dans l'admin (optionnelle — le bouton IA échoue proprement si absente, reste de l'admin non affecté) | Présente en local |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site, utilisée pour `robots.txt`/`sitemap.xml` (variable publique, pas un secret) | Présente en local, valeur `http://localhost:3000` (attendu en développement) |
| `POSTGRES_URL`, `DATABASE_URL_UNPOOLED` | Variantes alternatives acceptées par `lib/db/index.ts` pour compatibilité avec certaines intégrations (ex. Vercel Postgres injecte parfois plusieurs noms) | Non présentes en local (`DATABASE_URL` suffit) |

**Aucune valeur de ces variables n'a été affichée, copiée ou transmise dans ce document ou ailleurs.**

## 10. Inconnues bloquantes identifiées à l'issue de cette phase

1. Branche de production réelle sur Vercel, région de déploiement, plan souscrit (Hobby/Pro), runtime exact.
2. Gestionnaire DNS et propriétaire effectif du domaine `2fpub.fr` / `www.2fpub.fr` ; statut exact du pointage vers Vercel.
3. Existence, hébergeur et accès réels à l'ancien site Axomedia — attendu du propriétaire/Axomedia selon le cahier des charges.
4. ~~Statut réel du compte Formspree~~ — **résolu 09/09/2026** : les formulaires ne dépendent plus de Formspree (voir §5, mise à jour). Inconnue restante : souhaitez-vous une notification par email en plus de la consultation dans `/admin/soumissions` ? Si oui, il faudra choisir un service d'envoi (ex. Resend, ou SMTP via une adresse existante) — voir compte rendu de conversation pour les options proposées, aucune n'a été installée sans votre accord.
5. Existence réelle d'une propriété GA4/conteneur GTM lié à ce domaine, et pourquoi aucun tag n'apparaît dans le code actuel du site Next.js (voir §6).
6. Plan de sauvegarde/rollback réellement disponible sur la base Postgres et sur les déploiements Vercel (dépend des plans souscrits, non vérifiable depuis le dépôt).
7. Confirmation que la base Postgres jointe pendant `next build` local est bien un environnement de développement et non la base de production (aucune écriture n'a été effectuée par précaution, mais la distinction n'a pas pu être établie depuis le dépôt seul).

Ces points sont repris dans le plan de travail transmis en conversation ; ils nécessitent soit un accès dashboard (Vercel/DNS/Formspree/GA4), soit une réponse du propriétaire, soit les informations Axomedia encore attendues.

---

*Document vivant : à mettre à jour si de nouvelles informations sont confirmées (accès dashboard, réponses du propriétaire, données Axomedia).*
