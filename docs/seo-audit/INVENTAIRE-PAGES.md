# Inventaire des pages — 2fpub.fr

Audit en lecture seule. Toutes les métadonnées ci-dessous sont lues directement dans le code, à la date de l'audit (08/09/2026).

Rappel de contexte commun à toutes les pages du groupe `app/(site)/` :
- Layout englobant : `app/(site)/layout.tsx` → `<Header/>`, `<ViewTransition>`, `<Footer/>`, `<FloatingWidgets/>`. Aucune metadata définie à ce niveau.
- Layout racine : `app/layout.tsx` → définit le seul title/description globaux du site (voir plus bas), pas de `metadataBase`.
- `app/robots.ts` : `allow: "/"`, `disallow: "/admin"`, sitemap déclaré.
- `app/sitemap.ts` : routes statiques listées + posts publiés (table `posts`, `status='published'`).

---

## / (Accueil)

- **Fichier source** : `app/(site)/page.tsx` (Server Component, `export const dynamic = "force-dynamic"`) + `app/(site)/HomeClient.tsx` (`"use client"`, contient tout le JSX).
- **Composants utilisés** : `HomeClient`, `RealisationsGallery` (`@/components/RealisationsGallery`), `Link` (next/link).
- **Title / description** : aucun `export const metadata` ni `generateMetadata` dans `page.tsx`. La page hérite donc du title/description racine défini dans `app/layout.tsx` :
  - title : `"2F Publicité — Communication visuelle B2B"`
  - description : `"2F Publicité : vêtements professionnels, covering véhicules, enseignes lumineuses, impression. Devis gratuit sous 24h."`
- **Canonical** : absent (aucune occurrence de `canonical` dans le repo).
- **H1** : `<h1 className="hcar-title">` — dynamique selon le slide du carrousel hero (3 slides) : `Votre véhicule,<br/>votre pub` / `Votre enseigne,<br/>votre vitrine` / `Votre équipe,<br/>vos couleurs`. Un seul `<h1>` visible à la fois (les autres slides sont dans le DOM mais masqués visuellement par le carrousel — à vérifier côté accessibilité/SEO : plusieurs `<h1>` textuellement différents coexistent dans le même document).
- **H2** : "Commandez en ligne, en toute simplicité" · "Pourquoi 2F Publicité ?" · "Nos dernières réalisations" · "Ils nous font confiance,<br/>des retours concrets." (dans `.avis-fg`) · "Obtenez votre devis gratuit<br/>en 3 minutes" · "Simple, rapide, efficace" · "Un projet ?<br/>Parlons-en autour d'un café." · "Venez nous voir à l'atelier." (h2 en style inline, pas classe `section-title`).
- **Sections** (résumé) : hero carrousel (3 slides) → bandeau logos clients (social proof) → bloc "boutique en ligne" (CTA "bientôt", lien `#` non fonctionnel) → stats "Pourquoi 2F Publicité" (+500 clients / 25 ans / 24h) → galerie réalisations (dynamique DB, `showAllTab={false}`) → section avis (bandeau défilant + note 4,9/5 Google, 80+ avis) → CTA devis → processus en 4 étapes → CTA "café" → bloc "Nous trouver" (carte Google Maps embed, adresse, horaires, accès, itinéraire).
- **Liens internes entrants** : Header (logo → `/`), Footer (logo, "Accueil"), lien "Accueil" dans le plan du site.
- **Liens internes sortants** : `/fiches/covering`, `/fiches/enseignes`, `/fiches/textile` (hero slides), `/realisations`, `/devis` (plusieurs CTA), lien externe Google Maps.
- **CTA** : "Voir nos coverings →" / "Découvrir nos enseignes →" / "Voir le catalogue textile →" (selon slide) → `/fiches/*` ; "Découvrir la boutique →" → `#` (placeholder, TODO en commentaire) ; "Voir toutes nos réalisations →" → `/realisations` ; "Démarrer mon devis gratuit →" → `/devis` ; "Demander un devis →" → `/devis` ; "Obtenir l'itinéraire" → Google Maps (externe).
- **Indexation prévue** : indexable (route dans `STATIC_ROUTES` du sitemap avec chemin `""`, pas de noindex, non concernée par `disallow: /admin`).
- **JSON-LD** : absent (aucune occurrence `application/ld+json` dans tout le repo — vérifié par grep global).
- **Particularités techniques** : `export const dynamic = "force-dynamic"` (les réalisations viennent de la DB, jamais de pré-rendu figé) ; `HomeClient` est un composant client (`"use client"`) avec `// @ts-nocheck` en tête ; utilise `<ViewTransition>` (React expérimental) au niveau du layout ; carrousel hero en `setInterval` (3.5s) ; toutes les images sont des `<img>` natifs (pas de `next/image`).

---

## /services

- **Fichier source** : `app/(site)/services/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `Link`, fonctions `closeModal`, `initGlobalKeydown`, `initRevealAndCountUps`, `initSvcTabs` importées de `lib/interactions`.
- **Title / description** : aucun `export const metadata`. Composant client, donc de toute façon `generateMetadata` serait impossible sans passer par un wrapper serveur — il n'y en a pas. Hérite du title/description racine de `app/layout.tsx` (identiques à l'accueil).
- **Canonical** : absent.
- **H1** : `<h1 className="page-title">Une offre complète pour<br/><span className="gradient-text">votre visibilité</span></h1>`.
- **H2** : un par section service — "Marquage <span>véhicule</span>", "Vêtements <span>personnalisés</span>", "Enseignes <span>lumineuses</span>", "Adhésifs / <span>vitrophanies</span>", "Plaques /<br/><span>panneaux</span>", "Logo <span>lumineux</span>", "Impressions<br/><span>tous formats</span>", "Petite <span>papeterie</span>".
- **Sections** : hero → barre de filtres/onglets (8 tabs, JS `initSvcTabs`) → 8 sections service (marquage véhicule, vêtements, enseignes, vitrophanies, plaques & panneaux, logo lumineux, impressions, petite papeterie), chacune avec image, 4 points-clés (icônes), 2 CTA → CTA café → 4 modales produit cachées (covering, textile, enseignes, impression) déclenchées ailleurs (probablement depuis les cards, système `closeModal`/ouverture via `id`).
- **Liens internes entrants** : Header (lien nav "Nos services" + méga-menu), Footer ("Covering véhicule", "Textile pro", "Enseignes", "Impression" → tous vers `/services`), HomeClient (implicite via ancre `#boutique-home`, pas de lien direct vers `/services` repéré), plan du site.
- **Liens internes sortants** : `/devis` (chaque section), `/fiches/covering`, `/fiches/textile`, `/fiches/enseignes`, `/fiches/vitrophanies`, `/fiches/plaques-panneaux`, `/fiches/logo-lumineux`, `/fiches/impression`, `/fiches/flyers`.
- **CTA** : "Demander un devis →" (×8, un par section) → `/devis` ; "Voir la fiche complète" (×8) → `/fiches/*` ; "Boutique en ligne" (Header) → `#` (placeholder) ; dans les modales : "Demander un devis gratuit →" → `/devis`, lien tel `01 43 52 24 24`.
- **Indexation prévue** : indexable (présente dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : entièrement client-side (`"use client"`), tarifs indicatifs codés en dur dans les modales (voir POINTS-A-VALIDER.md et CONTENUS-FICHES.md), contenu textuel très proche des fiches produit dédiées (`/fiches/*`) → voir risque de duplication dans AUDIT-TECHNIQUE.md.

---

## /realisations

- **Fichier source** : `app/(site)/realisations/page.tsx` (Server Component, `export const dynamic = "force-dynamic"`) + `app/(site)/realisations/RealisationsPageEffects.tsx` (`"use client"`, ne fait que brancher des effets DOM, retourne `null`).
- **Composants utilisés** : `Link`, `RealisationsGallery` (`@/components/RealisationsGallery`), `RealisationsPageEffects`, données via `getPublishedRealisations()` (`@/lib/realisations/data`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1>Nos <span className="gradient-text">réalisations</span></h1>`.
- **H2** : "Ce qu'ils disent" (section-tag, pas un h2) — en fait le vrai H2 est "Ils nous ont fait confiance,<br/>ils en parlent mieux que nous" ; "Un projet ?<br/>Parlons-en autour d'un café."
- **Sections** : hero (texte "Plus de 500 projets réalisés…", CTA devis + tel) → galerie de réalisations filtrable (`RealisationsGallery`, alimentée par la DB) → bandeau stats (+500 projets, 25 ans, 5 expertises, 48h) → carrousel de 7 témoignages clients avec prénom + initiale de nom + secteur + ville (voir POINTS-A-VALIDER.md) → CTA café final.
- **Liens internes entrants** : Header ("Réalisations"), Footer ("Nos réalisations"), HomeClient ("Voir toutes nos réalisations →"), fiches produit ("Voir toutes les réalisations →" sur chaque fiche), plan du site.
- **Liens internes sortants** : `/devis` (×2), tel `01 43 52 24 24`.
- **CTA** : "Demander un devis gratuit →" → `/devis` ; bouton tel ; "Demander un devis →" (footer CTA).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent (les avis clients affichés ne sont pas balisés en `Review`/`AggregateRating` schema.org).
- **Particularités techniques** : `force-dynamic` (données DB) ; les images de réalisations viennent de la table `realisations`/`realisation_images` avec un champ `alt` en base (donc alt géré côté admin, pas en dur dans le code) ; filtrage géré côté React dans `RealisationsGallery` (composant non lu en détail dans cet audit, hors périmètre des fichiers listés) ; carrousel piloté par `initCarousel()`.

---

## /a-propos

- **Fichier source** : `app/(site)/a-propos/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `Link`, `initGlobalKeydown`, `initRevealAndCountUps`, `initTimeline` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1 className="about-hero-title">L'agence qui donne<br/>de la voix à <span className="ah-accent">votre marque</span></h1>`.
- **H2** : "Nés à Aubervilliers,<br/>présents partout<br/>en France" · "Trois piliers, une promesse" · "Des experts à votre service" · "100% production interne" · "Un projet ?<br/>Parlons-en autour d'un café."
- **Sections** : hero vidéo (poster statique, `<source>` vidéo commentée avec TODO) → historique/chiffres (25+ ans, 300m², 10k+ projets, 100% fabrication France) + frise chronologique 1999→2024 → citation du fondateur → 3 piliers ("Réactivité sans égale", "Maîtrise de bout en bout", "Partenariat durable") → équipe (3 cartes : Direction, Création, Atelier Production — pas de noms individuels) → carrousel photos atelier → CTA café.
- **Liens internes entrants** : Header ("À propos"), Footer ("Qui sommes-nous"), plan du site.
- **Liens internes sortants** : `/devis` (×2), tel `01 43 52 24 24`.
- **CTA** : "Demander un devis →" (×2 via `/devis`), bouton tel.
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent (aucun balisage `Organization`/`AboutPage`).
- **Particularités techniques** : vidéo hero prévue mais non branchée (`{/* <source src="/videos/about-hero.mp4" .../> */}` commentée, poster statique `/2Fdevanture.png` utilisé à la place) ; nombreuses affirmations chiffrées/historiques à valider (voir POINTS-A-VALIDER.md).

---

## /devis

- **Fichier source** : `app/(site)/devis/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `handleDevisSubmit`, `initGlobalKeydown`, `initRevealAndCountUps` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1 className="devis-title">Parlons de votre <span style={{color:'var(--brand)'}}>projet</span></h1>`.
- **H2** : aucun `<h2>` réel dans le JSX de cette page (les titres visuels "Votre demande de devis" sont des `<div className="form-title">`, pas des balises h2).
- **Sections** : hero band → formulaire de devis (prénom, nom, email obligatoire, téléphone, entreprise, cases à cocher services, message) → message de succès caché → bloc coordonnées directes (tel, email, adresse, horaires) → CTA "Préférez nous appeler directement ?".
- **Liens internes entrants** : Header (CTA "Devis gratuit →", lien nav "Contact"), Footer ("Devis gratuit", "Contact"), HomeClient (CTA multiples), toutes les fiches produit et `/services` (CTA "Demander un devis"), plan du site.
- **Liens internes sortants** : aucun lien vers d'autres pages internes du site (page "cul-de-sac" volontaire, uniquement des liens `tel:` et `mailto:`).
- **CTA** : "Envoyer ma demande →" (submit formulaire) ; tel `01 43 52 24 24` ; email `contact@2fpub.fr`.
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : **le formulaire pointe vers `action="https://formspree.io/f/VOTRE_FORM_ID_ICI"`** — placeholder non remplacé, avec un commentaire explicite dans le code demandant de créer un compte Formspree et de remplacer l'ID. En l'état, la soumission du formulaire de devis échouera en production. Le comportement de succès (`handleDevisSubmit`) n'a pas été vérifié dans ce fichier (fonction externe, hors périmètre strict de l'audit SEO mais impact direct sur la conversion).

---

## /blog

- **Fichier source** : `app/(site)/blog/page.tsx` (Server Component, `export const dynamic = "force-dynamic"`).
- **Composants utilisés** : `Link`, requêtes directes via `getSql`/`ensureSchema` (`@/lib/db`).
- **Title / description** : **présents**, seule page statique du groupe `(site)` avec un `export const metadata` explicite :
  ```
  export const metadata: Metadata = {
    title: "Blog — 2F Publicité",
    description: "Conseils, actualités et réalisations de 2F Publicité : covering véhicules, enseignes lumineuses, textile pro et impression grand format.",
  };
  ```
- **Canonical** : absent.
- **H1** : `<h1>Le <span className="gradient-text">blog</span></h1>`.
- **H2** : aucun (les titres d'articles dans la grille sont des `<h2 className="blog-card-title">{post.title}</h2>` — dynamiques, un par article).
- **Sections** : hero → grille d'articles publiés (paginée, `PAGE_SIZE = 9`) avec image de couverture (ou fallback "2F"), date, titre, extrait, CTA "Lire l'article →" ; états alternatifs : "Le blog est momentanément indisponible" (DB injoignable) ou "Aucun article publié pour l'instant. Revenez bientôt !" (liste vide) ; pagination numérotée si `totalPages > 1`.
- **Liens internes entrants** : Footer ("Blog"), plan du site. **Pas de lien vers `/blog` dans le Header** (absent de `NAV_LINKS`).
- **Liens internes sortants** : `/blog/[slug]` pour chaque article publié ; `/blog?page=N` pour la pagination.
- **CTA** : "Lire l'article →" par carte article.
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`). La pagination (`/blog?page=2`, etc.) n'est **pas** listée dans le sitemap — seule `/blog` (page 1 implicite) y figure.
- **JSON-LD** : absent (pas de `Blog`/`ItemList` schema.org).
- **Particularités techniques** : `force-dynamic` (accès DB direct côté page, sans passer par `cache()`/ISR) ; requête SQL directe avec jointure de comptage (`count(*)`) ; état actuel du contenu (articles en base) : dépend entièrement de la table `posts` — le code ne permet pas de savoir depuis ce fichier seul combien d'articles sont publiés (donnée en base, non lisible sans connexion réelle, hors périmètre de cet audit lecture-seule).

---

## /blog/[slug]

- **Fichier source** : `app/(site)/blog/[slug]/page.tsx` (Server Component, `export const dynamic = "force-dynamic"`).
- **Composants utilisés** : `Link`, `notFound` (`next/navigation`), `getSql`/`ensureSchema` (`@/lib/db`), `renderMarkdown` (`@/lib/markdown`).
- **Title / description** : **`generateMetadata` dynamique présent** :
  ```
  export async function generateMetadata({ params }): Promise<Metadata> {
    ...
    if (!post) return { title: "Article — 2F Publicité" };
    return {
      title: `${post.title} — Blog 2F Publicité`,
      description: post.excerpt || undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt || undefined,
        images: post.cover_image_url ? [post.cover_image_url] : undefined,
      },
    };
  }
  ```
  C'est la **seule page du site** avec un bloc `openGraph` explicite dans ses métadonnées.
- **Canonical** : absent (même le `generateMetadata` dynamique n'ajoute pas de `alternates.canonical`).
- **H1** : `<h1>{post.title}</h1>` (dynamique).
- **H2** : aucun dans le squelette de la page — le contenu de l'article (`post.content`) est injecté via `dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}` et peut contenir ses propres `<h2>` générés depuis le Markdown, non auditable statiquement ici.
- **Sections** : hero (lien retour "← Retour au blog", titre, méta auteur + date) → image de couverture optionnelle (`alt=""` vide en dur, voir AUDIT-TECHNIQUE.md) → contenu Markdown rendu → CTA café/devis.
- **Liens internes entrants** : `/blog` (chaque carte article), et potentiellement des liens internes créés par les rédacteurs dans le contenu Markdown (non auditables ici).
- **Liens internes sortants** : `/blog` (lien retour), `/devis` (CTA final).
- **CTA** : "Demander un devis →" → `/devis`.
- **Indexation prévue** : indexable pour les articles `status='published'` (inclus dynamiquement dans `sitemap.ts` via `getPublishedSlugsWithDates()`). Si `post` est `null` (slug inconnu ou article non publié), la page appelle `notFound()` → 404 Next.js standard (pas de fichier `not-found.tsx` custom trouvé dans `app/(site)/`, voir AUDIT-TECHNIQUE.md).
- **JSON-LD** : absent (pas de balisage `Article`/`BlogPosting` schema.org malgré la présence de `published_at`, `author_display_name`, titre, image — toutes les données nécessaires à un `BlogPosting` JSON-LD sont déjà disponibles côté serveur mais non exploitées).
- **Particularités techniques** : route dynamique `[slug]`, pas de `generateStaticParams` (donc aucun pré-rendu statique au build, tout est calculé à la requête via `force-dynamic`) ; `alt=""` vide sur l'image de couverture (perte de valeur SEO/accessibilité) ; le contenu injecté via `dangerouslySetInnerHTML` dépend de la qualité du Markdown saisi côté admin (hors périmètre de cet audit).

---

## /mentions-legales

- **Fichier source** : `app/(site)/mentions-legales/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `initGlobalKeydown`, `initRevealAndCountUps` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1>Mentions <span>légales</span></h1>`.
- **H2** : `<h2>Hébergement</h2>` (un seul h2).
- **Sections** : bouton retour (`history.back()`) → identité du site (nom, email) → directeur de publication → adresse/tel → crédits photo ("Adobe Stock") → bloc hébergement (GANDI SAS, adresse, SIREN, TVA, tel, fax, email) → clauses de propriété intellectuelle.
- **Liens internes entrants** : Footer ("Mentions légales"), plan du site.
- **Liens internes sortants** : aucun lien interne (uniquement liens externes/mailto : `https://www.2fpub.fr`, `mailto:contact@2fpub.fr`, `tel:0143522424`, `mailto:direction@gandi.net`).
- **CTA** : aucun CTA commercial, uniquement le bouton "Retour" (navigation historique JS, pas un lien SEO).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : bouton "Retour" utilise `history.back()` en JS plutôt qu'un lien `<Link>` — fonctionnel pour l'utilisateur mais sans valeur de maillage interne pour les moteurs.

---

## /confidentialite

- **Fichier source** : `app/(site)/confidentialite/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `Link`, `initGlobalKeydown`, `initRevealAndCountUps` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1>Politique de <span>confidentialité</span></h1>`.
- **H2** : "Traitement de vos données personnelles" · "POLITIQUE LIÉE AU DÉMARCHAGE TÉLÉPHONIQUE" · "Qu'est-ce qu'un « cookie » ?"
- **Sections** : droit d'accès/modification (art. 34 loi Informatique et Libertés) → tableau responsable/finalités/durée de rétention (6 mois) → lien vers `/suppression-donnees` → lien CNIL → section Bloctel (démarchage téléphonique) → section cookies.
- **Liens internes entrants** : Footer ("Confidentialité"), plan du site.
- **Liens internes sortants** : `/suppression-donnees` (lien interne réel, via `<Link>`), liens externes CNIL et Bloctel.
- **CTA** : aucun CTA commercial ; bouton "Retour" (`history.back()`).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : RAS.

---

## /suppression-donnees

- **Fichier source** : `app/(site)/suppression-donnees/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `handleRgpdSubmit`, `initGlobalKeydown`, `initRevealAndCountUps` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1>Vos droits sur vos données</h1>`.
- **H2** : "Ce que vous pouvez demander" · "Soumettre une demande".
- **Sections** : bouton retour → badge "RGPD" + intro → liste des 6 droits RGPD (accès, rectification, effacement, limitation, portabilité, opposition) → formulaire de demande (nom, email, type de demande en liste déroulante, message) → message de succès caché → bloc contact direct (email) → mention CNIL.
- **Liens internes entrants** : `/confidentialite` (lien direct vers cette page). **Absente du Footer et du Header.**
- **Liens internes sortants** : `mailto:contact@2fpub.fr`, lien externe CNIL.
- **CTA** : "Envoyer ma demande →" (submit formulaire).
- **Indexation prévue** : **incohérence détectée** — cette route existe bien dans le code (`app/(site)/suppression-donnees/page.tsx`) et est indexable par défaut (pas de noindex, hors `/admin`), mais **elle est absente de `STATIC_ROUTES` dans `app/sitemap.ts`**. Elle ne sera donc jamais soumise aux moteurs via le sitemap, alors qu'elle est bien accessible et liée depuis `/confidentialite`. Voir AUDIT-TECHNIQUE.md.
- **JSON-LD** : absent.
- **Particularités techniques** : **même défaut que `/devis`** : le formulaire pointe vers `action="https://formspree.io/f/VOTRE_RGPD_FORM_ID_ICI"` — placeholder non remplacé, commentaire de code explicite le confirmant. Les demandes RGPD via ce formulaire échoueront tant que l'ID Formspree n'est pas configuré.

---

## /plan-du-site

- **Fichier source** : `app/(site)/plan-du-site/page.tsx` (`"use client"`, `// @ts-nocheck`).
- **Composants utilisés** : `Link`, `initGlobalKeydown`, `initRevealAndCountUps` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `<h1>Plan <span>du site</span></h1>`.
- **H2** : "Pages principales" · "Fiches produit" · "Légal" (trois colonnes de liens).
- **Sections** : bouton retour → 3 colonnes de liens : Pages principales (`/`, `/services`, `/realisations`, `/a-propos`, `/devis`, `/blog`), Fiches produit (`/fiches/textile`, `/fiches/enseignes`, `/fiches/vitrophanies`, `/fiches/plaques-panneaux`, `/fiches/logo-lumineux`), Légal (`/mentions-legales`, `/confidentialite`).
- **Liens internes entrants** : Footer ("Plan du site"), plan du site n'a pas de lien vers lui-même bien sûr.
- **Liens internes sortants** : les 13 liens listés ci-dessus.
- **CTA** : aucun.
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques / incohérences de maillage** :
  - **La colonne "Fiches produit" ne liste que 5 des 7 fiches existantes** : `/fiches/covering`, `/fiches/impression` et `/fiches/flyers` sont absentes de cette page alors que les fichiers existent bien (`app/(site)/fiches/covering/page.tsx`, `app/(site)/fiches/impression/page.tsx`, `app/(site)/fiches/flyers/page.tsx`) et sont dans `STATIC_ROUTES` du sitemap.
  - **`/suppression-donnees` n'est listée dans aucune des 3 colonnes**, alors qu'elle existe et est linkée depuis `/confidentialite`.
  - Le plan du site ne reflète donc pas fidèlement l'arborescence réelle du site.

---

## /fiches/covering

- **Fichier source** : `app/(site)/fiches/covering/page.tsx` (`"use client"`, `// @ts-nocheck`, 505 lignes — la fiche la plus longue).
- **Composants utilisés** : `Link`, `initGlobalKeydown`, `initRevealAndCountUps`, `setCovTab`, `toggleFaq` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : `Vos véhicules,<br/><span className="gradient-text">votre pub en mouvement</span>`.
- **H2** : "La bonne technique<br/>pour chaque budget" · "Prix par type de véhicule" · "Nos réalisations<br/>covering" · "De la conception à la pose" (process) · "Vos questions<br/>sur le covering" (FAQ) · "Complétez votre image".
- **Sections/contenu** : voir extraction complète dans CONTENUS-FICHES.md (techniques, tarifs par véhicule détaillés, FAQ, maillage vers autres fiches).
- **Liens internes entrants** : Header (méga-menu "Marquage véhicule"), `/services` (CTA "Voir la fiche complète"), HomeClient (slide hero "Voir nos coverings →"), plan du site (absent, voir incohérence ci-dessus).
- **Liens internes sortants** : `/devis` (multiples), `/realisations`, `/fiches/textile`, `/fiches/enseignes`, `/fiches/impression` (bloc "Autres prestations").
- **CTA** : "Demander un devis" (hero), "Voir les tarifs →" (ancre `#cov-tarifs`), "Demander un devis →" (×5 dans les panels tarifs), "Voir toutes les réalisations →" → `/realisations`, "Poser une question" (probablement lien `/devis` ou mailto, non confirmé dans cet extrait), tel `01 43 52 24 24`, "Demander un devis →" (CTA final).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent (aucun `Product`/`Offer`/`FAQPage` alors que la page contient une FAQ structurée en JSX et des tarifs — candidate naturelle à un balisage `FAQPage` et `Product`/`Offer`).
- **Particularités techniques** : onglets véhicules gérés en JS (`setCovTab`, panels avec `style={{display:'none'}}` par défaut sauf le premier) — contenu présent dans le DOM mais masqué en CSS, donc théoriquement crawlable par Google (texte présent au chargement initial, pas de lazy-render JS) mais à confirmer avec un test de rendu réel (hors périmètre lecture-seule).

---

## /fiches/enseignes

- **Fichier source** : `app/(site)/fiches/enseignes/page.tsx` (`"use client"`, `// @ts-nocheck`, 369 lignes).
- **Composants utilisés** : `Link`, `initGlobalKeydown`, `initRevealAndCountUps` (`lib/interactions`).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1** : "Des enseignes qui<br/>marquent les esprits" (déduit du contenu extrait, à confirmer visuellement dans le fichier complet).
- **H2** : "Toutes exposées dans<br/>notre showroom" · "De votre concept à l'installation" · "Nos réalisations<br/>enseignes" · "Vos questions<br/>sur les enseignes" · "Complétez votre communication".
- **Contenu** : 7 techniques d'enseignes lumineuses détaillées (Ajouré, PVC rétroéclairé, Alu rétroéclairé, Relief PMMA, Relief PMMA + Alu, Boîtier Plexi, Boîtier Plexi côtés opaques) — voir texte intégral dans CONTENUS-FICHES.md. FAQ (3 questions) incluant une mention de démarches administratives ("En dessous de 1 m², une déclaration en mairie suffit souvent").
- **Liens internes entrants** : Header (méga-menu "Enseignes"), `/services` (CTA fiche), plan du site (présente, contrairement à covering/impression/flyers).
- **Liens internes sortants** : `/devis`, `/realisations`, `/fiches/textile`, `/fiches/covering`, `/fiches/flyers` (via bloc "Autres prestations").
- **CTA** : "Voir les 7 techniques →", "Visiter le showroom", "Voir toutes les réalisations →", "Poser une question", "Demander un devis →", tel.
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent (encore une FAQ non balisée en `FAQPage`).
- **Particularités techniques** : mention d'un "showroom" physique comme argument fort de la page (à corréler avec l'adresse 217 av. Jean Jaurès, Aubervilliers).

---

## /fiches/flyers

- **Fichier source** : `app/(site)/fiches/flyers/page.tsx` (`"use client"`, `// @ts-nocheck`, 300 lignes).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **H1/H2** : voir CONTENUS-FICHES.md pour le texte intégral (grilles tarifaires flyers/cartes de visite/dépliants détaillées).
- **Liens internes entrants** : Header (méga-menu "Petite papeterie"), `/services` (CTA fiche). **Absente du plan du site.**
- **Liens internes sortants** : `/devis`, `/fiches/impression`, `/fiches/covering`, `/fiches/enseignes`.
- **CTA** : "Voir les tarifs →", "Demander un devis →" (×3).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`), mais absente du maillage `/plan-du-site`.
- **JSON-LD** : absent (grille tarifaire structurée en JSX, candidate à `Product`/`Offer` schema.org).
- **Particularités techniques** : grille de prix la plus détaillée du site (quantités × types de finition), tous tarifs affichés "hors taxes".

---

## /fiches/impression

- **Fichier source** : `app/(site)/fiches/impression/page.tsx` (`"use client"`, `// @ts-nocheck`, 370 lignes).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **Contenu** : petit format / grand format (jusqu'à 1m58 de large) / stickers & étiquettes (avec 4 finitions : Classique, Classique + protection, Transparente, Holographique) — voir CONTENUS-FICHES.md.
- **Liens internes entrants** : Header (méga-menu "Impressions"), `/services` (CTA fiche). **Absente du plan du site.**
- **Liens internes sortants** : `/devis`, `/realisations`, `/fiches/covering`, `/fiches/textile`, `/fiches/enseignes`.
- **CTA** : "Voir les formats →", "Demander un devis →" (×4), "Voir toutes les réalisations →", "Poser une question".
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`), absente du maillage `/plan-du-site`.
- **JSON-LD** : absent (FAQ non balisée, tarifs stickers structurés non balisés).
- **Particularités techniques** : mention explicite d'une contrainte technique ("norme M1" pour bâches/affiches/roll-ups) et de fichiers acceptés (AI, PDF vectoriel, PNG 300dpi min) dans la FAQ.

---

## /fiches/logo-lumineux

- **Fichier source** : `app/(site)/fiches/logo-lumineux/page.tsx` (`"use client"`, `// @ts-nocheck`, 156 lignes — la plus courte des fiches).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **Contenu** : 2 versions (comptoir / murale), rétroéclairage LED, fabrication sur mesure — voir CONTENUS-FICHES.md. Aucun tarif chiffré (uniquement "Tarifs sur devis selon taille, forme et version").
- **Liens internes entrants** : Header (méga-menu "Logo lumineux"), `/services` (CTA fiche), plan du site (présente).
- **Liens internes sortants** : `/devis`, `/fiches/enseignes`, `/fiches/plaques-panneaux`, `/fiches/textile`.
- **CTA** : "Demander un devis →" (×2).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : pas de FAQ sur cette fiche, contenu le plus léger du site — potentiellement sous-optimisé pour le SEO (peu de texte unique par rapport aux autres fiches).

---

## /fiches/plaques-panneaux

- **Fichier source** : `app/(site)/fiches/plaques-panneaux/page.tsx` (`"use client"`, `// @ts-nocheck`, 156 lignes).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **Contenu** : 4 types de supports (panneaux grand format, panneaux de chantier, plaques transparentes, plaques professionnelles) — voir CONTENUS-FICHES.md. Aucun tarif chiffré.
- **Liens internes entrants** : Header (méga-menu "Plaques & Panneaux"), `/services` (CTA fiche), plan du site (présente).
- **Liens internes sortants** : `/devis`, `/fiches/enseignes`, `/fiches/logo-lumineux`, `/fiches/impression`.
- **CTA** : "Demander un devis →" (×2).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : contenu léger comme logo-lumineux, pas de FAQ ni de galerie de réalisations dédiée.

---

## /fiches/textile

- **Fichier source** : `app/(site)/fiches/textile/page.tsx` (`"use client"`, `// @ts-nocheck`, 365 lignes).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **Contenu** : 2 techniques (broderie 12 pièces min., flocage 10 pièces min.), longue liste de supports compatibles, mention "40 ans d'expérience" et partenariat qualité avec "Aqua Pressing" (à valider, voir POINTS-A-VALIDER.md — incohérence avec "25 ans" / fondée en 1999 affichés ailleurs), catalogue PDF téléchargeable, FAQ (4 questions dont tarifs dégressifs dès 50 pièces) — voir CONTENUS-FICHES.md.
- **Liens internes entrants** : Header (méga-menu "Vêtements personnalisés"), `/services` (CTA fiche), HomeClient (slide hero "Voir le catalogue textile →"), plan du site (présente).
- **Liens internes sortants** : `/devis`, `/realisations`, `/fiches/enseignes`, `/fiches/covering`, `/fiches/impression`.
- **CTA** : "Voir les techniques →", "Parler à un conseiller", "Voir toutes les réalisations →", "Poser une question", "Demander un devis →" (×2), lien téléchargement catalogue PDF (destination non confirmée dans l'extrait texte).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : mention "40 ans d'expérience" à corréler avec la fondation en 1999 affichée sur `/a-propos` (25+ ans en 2026) — écart de ~15 ans, voir POINTS-A-VALIDER.md.

---

## /fiches/vitrophanies

- **Fichier source** : `app/(site)/fiches/vitrophanies/page.tsx` (`"use client"`, `// @ts-nocheck`, 156 lignes).
- **Title / description** : aucun `export const metadata`. Hérite du title/description racine.
- **Canonical** : absent.
- **Contenu** : 4 types de films adhésifs (autocollant classique, film confidentiel, film décoratif, découpe adhésive) — voir CONTENUS-FICHES.md. Aucun tarif chiffré.
- **Liens internes entrants** : Header (méga-menu "Vitrophanies"), `/services` (CTA fiche), plan du site (présente).
- **Liens internes sortants** : `/devis`, `/fiches/enseignes`, `/fiches/impression`, `/fiches/covering`.
- **CTA** : "Demander un devis →" (×2).
- **Indexation prévue** : indexable (dans `STATIC_ROUTES`).
- **JSON-LD** : absent.
- **Particularités techniques** : contenu léger comme logo-lumineux/plaques-panneaux, pas de FAQ ni de galerie.

---

## Synthèse rapide title/description par page

| Page | `export const metadata` propre ? | Title effectif |
|---|---|---|
| `/` | Non | Hérité racine : "2F Publicité — Communication visuelle B2B" |
| `/services` | Non | Idem racine |
| `/realisations` | Non | Idem racine |
| `/a-propos` | Non | Idem racine |
| `/devis` | Non | Idem racine |
| `/blog` | **Oui** | "Blog — 2F Publicité" |
| `/blog/[slug]` | **Oui (dynamique)** | `${post.title} — Blog 2F Publicité` |
| `/mentions-legales` | Non | Idem racine |
| `/confidentialite` | Non | Idem racine |
| `/suppression-donnees` | Non | Idem racine |
| `/plan-du-site` | Non | Idem racine |
| `/fiches/covering` | Non | Idem racine |
| `/fiches/enseignes` | Non | Idem racine |
| `/fiches/flyers` | Non | Idem racine |
| `/fiches/impression` | Non | Idem racine |
| `/fiches/logo-lumineux` | Non | Idem racine |
| `/fiches/plaques-panneaux` | Non | Idem racine |
| `/fiches/textile` | Non | Idem racine |
| `/fiches/vitrophanies` | Non | Idem racine |

**16 des 18 pages statiques du site partagent exactement le même `<title>` et la même meta description** (celle définie dans `app/layout.tsx`), y compris des pages au contenu très différent (accueil, mentions légales, fiche produit covering, page RGPD…). Voir détail et impact dans AUDIT-TECHNIQUE.md.
