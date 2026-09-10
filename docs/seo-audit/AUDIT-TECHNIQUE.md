# Audit technique SEO — 2fpub-next-app

Audit en lecture seule, basé sur l'état du code au 08/09/2026 (branche `feature/blog-realisations-admin-ia`). Chaque point indique : fichier(s) concerné(s), comportement constaté, correction technique envisageable (non appliquée).

---

## 1. Metadata / generateMetadata

**Fichiers concernés** : `app/layout.tsx`, `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`, toutes les autres pages de `app/(site)/`.

**Constat** :
- `app/layout.tsx` définit un unique `export const metadata` global (title + description), appliqué par défaut à toutes les pages qui n'en définissent pas.
- Seules 2 pages sur 18 définissent leurs propres métadonnées :
  - `app/(site)/blog/page.tsx` : `export const metadata` statique (title + description).
  - `app/(site)/blog/[slug]/page.tsx` : `generateMetadata` dynamique (title, description, openGraph).
- Les 16 autres pages (`/`, `/services`, `/realisations`, `/a-propos`, `/devis`, `/mentions-legales`, `/confidentialite`, `/suppression-donnees`, `/plan-du-site`, les 8 `/fiches/*`) sont toutes des composants **`"use client"`** (voir `// @ts-nocheck` + `"use client"` en tête de chaque fichier) et n'exportent donc aucun `metadata`/`generateMetadata` — c'est structurellement impossible d'exporter `metadata` depuis un composant client dans Next.js. Elles héritent toutes du même title "2F Publicité — Communication visuelle B2B" et de la même meta description.

**Impact** : dans les résultats de recherche, l'accueil, les 8 fiches produit, la page services, à-propos, devis, etc. afficheraient toutes potentiellement le même title/snippet si Google ne réécrit pas lui-même le titre — ce qui nuit à la différenciation des pages et au CTR par mot-clé (ex. la fiche "Enseignes lumineuses" ne peut pas cibler "enseigne lumineuse Aubervilliers" dans son title).

**Correction envisageable** : convertir chaque page en Server Component avec un petit wrapper exportant `metadata`/`generateMetadata` propre (title, description uniques par page), et déplacer la logique interactive (`"use client"`) dans un sous-composant enfant — schéma déjà utilisé avec succès sur `/realisations` (`page.tsx` serveur + `RealisationsPageEffects.tsx` client) et sur `/blog/[slug]`.

---

## 2. `metadataBase`

**Fichiers concernés** : `app/layout.tsx` (et absence confirmée partout ailleurs par grep global).

**Constat** : `metadataBase` n'est défini nulle part dans le repo (`grep -rn "metadataBase" app/` → aucun résultat). Or `app/(site)/blog/[slug]/page.tsx` utilise `openGraph.images: [post.cover_image_url]` — si `cover_image_url` est un chemin relatif (stocké en base), Next.js résoudra l'URL Open Graph par défaut relativement à l'origine de la requête au lieu d'une URL absolue fiable, ou générera un avertissement de build ("metadataBase not set, defaulting to localhost...").

**Impact** : risque que les images Open Graph des articles de blog partagés sur les réseaux sociaux (LinkedIn, etc.) ne se résolvent pas correctement, ou pointent vers `localhost` en environnement de build sans variable d'environnement.

**Correction envisageable** : ajouter `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr")` dans `app/layout.tsx`, cohérent avec la constante déjà utilisée dans `app/robots.ts` et `app/sitemap.ts`.

---

## 3. Canonical

**Fichiers concernés** : ensemble du repo.

**Constat** : recherche exhaustive (`grep -rn "canonical"`) → **zéro occurrence** dans tout le code source. Aucune page, y compris `/blog/[slug]` avec son `generateMetadata` dynamique, ne définit `alternates.canonical`.

**Impact** : en l'absence de `metadataBase` et de canonical explicite, le risque de contenu dupliqué (www vs non-www, avec/sans trailing slash, paramètres de pagination `?page=2`) n'est couvert par aucune balise canonique — voir aussi point 11 (contenu dupliqué).

**Correction envisageable** : ajouter `alternates: { canonical: ... }` dans les objets `metadata`/`generateMetadata`, une fois `metadataBase` en place (permet des canonicals relatifs simples).

---

## 4. Open Graph / Twitter Card

**Fichiers concernés** : `app/(site)/blog/[slug]/page.tsx` (seul fichier avec `openGraph`), reste du repo.

**Constat** :
- Un seul bloc `openGraph` dans tout le site : celui de `generateMetadata` sur `/blog/[slug]` (title, description, images conditionnelles).
- Aucune balise Twitter Card (`twitter:card`, `twitter:title`, etc.) nulle part.
- Aucun Open Graph sur l'accueil, les fiches produit, `/services`, `/a-propos` — pages pourtant les plus susceptibles d'être partagées (devis, portfolio de réalisations).

**Impact** : partage sur réseaux sociaux (Facebook, LinkedIn, WhatsApp — pertinent vu le widget WhatsApp du site) sans image/preview personnalisée pour la quasi-totalité des pages du site.

**Correction envisageable** : ajouter un bloc `openGraph` (title, description, images, type) par défaut dans `app/layout.tsx`, complété par des surcharges page par page une fois le passage en Server Component effectué (point 1).

---

## 5. `app/robots.ts`

**Fichier** : `app/robots.ts`. Contenu exact (déjà lu) :
```ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```
**Constat** : configuration simple et cohérente — tout le site public est autorisé, `/admin` est exclu, le sitemap est bien référencé. Le fallback `https://www.2fpub.fr` suppose que le domaine final avec **www** est la version canonique retenue (à confirmer, voir INVENTAIRE-URL.md).

**Complément** : `proxy.ts` ajoute par ailleurs un header `X-Robots-Tag: noindex, nofollow, noarchive` sur toutes les routes `/admin/*` (voir point 9), en doublon défensif avec le `disallow` de `robots.ts` — bonne pratique (ceinture + bretelles), rien à corriger.

**Correction envisageable** : aucune, configuration correcte en l'état.

---

## 6. `app/sitemap.ts`

**Fichier** : `app/sitemap.ts` (contenu déjà lu intégralement en amont de la mission).

**Constat** :
- `STATIC_ROUTES` liste 17 chemins statiques (accueil + 8 sections + 8 fiches).
- Les posts publiés (`status = 'published'`) sont ajoutés dynamiquement via une requête SQL directe (`SELECT slug, updated_at FROM posts WHERE status = 'published'`), avec gestion d'erreur (`try/catch`) qui retombe sur les routes statiques seules si la DB est injoignable.
- `lastModified` : pour les routes statiques, `new Date()` est utilisé — **c'est-à-dire la date/heure de génération du sitemap à chaque requête**, pas une vraie date de dernière modification du contenu. Cela signifie que `lastModified` change à chaque re-génération du sitemap même si aucune page statique n'a changé, ce qui réduit la valeur informative de ce champ pour les moteurs de recherche (censé indiquer une fraîcheur réelle du contenu).
- **Incohérence confirmée** : `/suppression-donnees` (route existante, fichier `app/(site)/suppression-donnees/page.tsx` présent, page accessible et linkée depuis `/confidentialite`) **n'est pas dans `STATIC_ROUTES`**. Elle est donc absente du sitemap XML généré, alors qu'elle est indexable par défaut (pas de noindex, hors `/admin`).
- Toutes les autres routes statiques existantes dans le système de fichiers (`app/(site)/*/page.tsx`) sont bien couvertes par `STATIC_ROUTES`, à l'exception de `/suppression-donnees`.
- La pagination du blog (`/blog?page=2`, etc.) n'est jamais générée dans le sitemap — seule `/blog` (implicitement page 1) y figure. C'est un choix raisonnable (éviter d'indexer des pages de listing paginées à faible valeur), mais non documenté comme un choix délibéré dans le code.

**Correction envisageable** :
- Ajouter `"/suppression-donnees"` à `STATIC_ROUTES`.
- Remplacer `lastModified: new Date()` par une date fixe/réelle par route (ex. date de dernier déploiement, ou date de dernière modification effective du contenu si trackée), ou au minimum accepter que ce comportement est un choix technique à assumer plutôt qu'un oubli.

---

## 7. JSON-LD / schema.org

**Fichiers concernés** : ensemble du repo.

**Constat** : recherche exhaustive (`grep -rln "application/ld+json"`) → **zéro résultat dans tout le repo**. Aucun balisage structuré nulle part :
- Pas de `LocalBusiness`/`Organization` (alors que l'entreprise a une adresse physique, un showroom, des horaires, un téléphone — toutes ces données existent déjà en dur dans le code : `217 avenue Jean Jaurès, 93300 Aubervilliers`, `01 43 52 24 24`, horaires Lun-Ven 9h-18h).
- Pas de `Product`/`Offer` sur les fiches produit qui affichent pourtant des grilles tarifaires précises (covering, flyers, cartes de visite, stickers).
- Pas de `FAQPage` sur les fiches qui contiennent des blocs FAQ structurés en JSX (covering, enseignes, impression, textile).
- Pas de `BlogPosting`/`Article` sur `/blog/[slug]`, alors que toutes les données nécessaires (titre, date de publication, auteur, image de couverture) sont déjà disponibles côté serveur dans `generateMetadata`.
- Pas de `BreadcrumbList` nulle part (le site n'a d'ailleurs pas de fil d'Ariane visible dans le JSX audité).
- Pas de `Review`/`AggregateRating` alors que la note "4,9/5 sur 80+ avis Google" et de nombreux témoignages textuels sont affichés sur l'accueil et `/realisations`.

**Impact** : absence totale de rich snippets potentiels (étoiles d'avis, FAQ dépliable, informations d'entreprise) dans les résultats de recherche — un manque à gagner significatif pour une entreprise locale avec adresse physique et avis clients.

**Correction envisageable** : ajouter a minima un JSON-LD `LocalBusiness` global (dans le layout ou la page d'accueil), puis des `FAQPage` sur les fiches qui ont déjà une FAQ en JSX, et un `BlogPosting` sur `/blog/[slug]`.

---

## 8. Gestion des URLs — `next.config.ts`, `proxy.ts`

**Fichiers** : `next.config.ts`, `proxy.ts`.

**Constat `next.config.ts`** :
```ts
const nextConfig: NextConfig = {
  experimental: { viewTransition: true },
};
```
- Aucune fonction `redirects()` ni `rewrites()` définie.
- Aucune option `images` (domaines autorisés) — cohérent avec le fait qu'aucune image du site n'utilise `next/image` (voir point 10).
- Aucune option `trailingSlash` définie — comportement par défaut de Next.js (pas de slash final, redirection automatique si un slash final est demandé). Pas de configuration explicite pour forcer www vs non-www non plus (ceci se gère normalement au niveau DNS/hébergeur, hors périmètre du code).

**Constat `proxy.ts`** (équivalent middleware Next.js) :
- Le fichier s'appelle `proxy.ts` à la racine (et non `middleware.ts` — particularité de cette version de Next.js, cf. AGENTS.md qui prévient de changements par rapport aux conventions connues).
- `matcher: ["/admin/:path*"]` — ne s'applique **qu'aux routes `/admin/*`**, aucun impact sur les routes publiques `(site)`.
- Ajoute le header `X-Robots-Tag: noindex, nofollow, noarchive` sur toutes les réponses admin (y compris `/admin/login`, `/admin/setup`, non protégées par auth mais bien no-index).
- Gère la redirection vers `/admin/login` si la session est absente/invalide, sans impact SEO public.

**Impact** : aucune redirection (301/302) n'est configurée nulle part dans le code pour d'éventuelles anciennes URLs — voir INVENTAIRE-URL.md pour la recherche de traces d'anciennes URLs Axomedia.

**Correction envisageable** : si d'anciennes URLs de l'ancien site (Axomedia) doivent être redirigées vers les nouvelles pages, cela devrait être ajouté via `redirects()` dans `next.config.ts` — actuellement totalement absent.

---

## 9. Pages 404

**Fichiers concernés** : recherche `find app -iname "not-found*"` → **aucun résultat**.

**Constat** : il n'existe **aucun fichier `not-found.tsx` personnalisé** dans `app/(site)/` ni à la racine de `app/`. Le seul appel explicite à `notFound()` dans le code se trouve dans `app/(site)/blog/[slug]/page.tsx` (slug inconnu ou article non publié) — il déclenchera la page 404 par défaut de Next.js, non stylée aux couleurs du site (pas de header/footer/branding 2F Publicité).

**Impact** : une 404 sur un article de blog supprimé/inconnu, ou sur toute route inexistante du site, affiche l'écran 404 générique de Next.js plutôt qu'une page cohérente avec la charte graphique et proposant des liens de rebond (accueil, services, devis).

**Correction envisageable** : créer `app/(site)/not-found.tsx` avec le header/footer du site et des liens vers les pages principales.

---

## 10. Images et attributs `alt`

**Fichiers concernés** : toutes les pages de `app/(site)/`, `components/Header.tsx`, `components/Footer.tsx`, `components/FloatingWidgets.tsx`.

**Constat** :
- **Aucune balise `<Image>` de `next/image` n'est utilisée nulle part dans `app/(site)/`** (`grep -rn "next/image\|<Image"` → zéro résultat). Toutes les images sont des `<img>` HTML natifs (94 occurrences comptées dans `app/(site)/`) — donc aucune optimisation automatique (lazy-loading natif partiel via l'attribut `loading="lazy"` posé manuellement sur certaines images, pas de redimensionnement/format WebP/AVIF automatique, pas de `sizes`/`srcset` généré par Next.js).
- 11 occurrences de `alt=""` (vide) recensées dans `app/(site)/`, notamment :
  - `HomeClient.tsx` : `<img className="hcar-wm" ... alt="" aria-hidden="true">` (logo watermark décoratif — `alt=""` justifié ici, c'est un usage correct pour une image purement décorative).
  - `app/(site)/blog/page.tsx` : `<img loading="lazy" src={post.cover_image_url} alt="" />` (image de couverture d'article — **`alt` vide non justifié**, l'image porte une information (visuel de l'article) et devrait reprendre le titre de l'article ou une description).
  - `app/(site)/blog/[slug]/page.tsx` : `<img src={post.cover_image_url} alt="" className="blog-post-cover" />` — même problème, `alt` vide sur l'image de couverture principale de l'article.
  - `app/(site)/a-propos/page.tsx` : plusieurs `<img>` du carrousel "atelier défilant" ont un `alt=""` explicite sur leur second jeu dupliqué (doublons pour la boucle infinie) — usage correct puisqu'il s'agit de doublons purement visuels des mêmes images déjà décrites une première fois avec un `alt` renseigné juste au-dessus.
- La majorité des `<img>` (services, fiches produit, équipe, atelier) ont un `alt` renseigné et descriptif (ex. `alt="Marquage véhicule"`, `alt="Enseignes"`, `alt="Vêtements personnalisés"`).
- Les images de réalisations (`RealisationsGallery`) utilisent un champ `alt` stocké en base de données (`realisation_images.alt`), donc géré côté admin — non auditable statiquement mais structure correcte (le champ existe).

**Impact** : absence de `next/image` = opportunité manquée d'optimisation automatique des poids d'image et du LCP (Largest Contentful Paint, facteur Core Web Vitals). Les `alt` vides sur les images de couverture d'articles de blog réduisent la valeur SEO/accessibilité de ces pages précisément là où le contenu est le plus susceptible d'être indexé (Google Images, lecteurs d'écran).

**Correction envisageable** :
- Migrer les `<img>` vers `next/image` (nécessitera de configurer `images.domains`/`remotePatterns` dans `next.config.ts` si `cover_image_url` pointe vers un hébergeur externe).
- Renseigner un `alt` descriptif par défaut sur les images de couverture d'articles (ex. `alt={post.title}`).

---

## 11. Maillage interne (`Header.tsx`, `Footer.tsx`, `/plan-du-site`)

**Fichiers concernés** : `components/Header.tsx`, `components/Footer.tsx`, `app/(site)/plan-du-site/page.tsx`.

**Constat** :
- **Header** (`NAV_LINKS`) : Nos services (`/services`), Réalisations (`/realisations`), À propos (`/a-propos`), Contact (`/devis`). **`/blog` n'est pas dans la navigation principale du Header.** Le méga-menu Services (`SERVICES_MENU`) liste bien les 8 fiches produit (`/fiches/covering`, `/fiches/textile`, `/fiches/enseignes`, `/fiches/vitrophanies`, `/fiches/plaques-panneaux`, `/fiches/logo-lumineux`, `/fiches/impression`, `/fiches/flyers`) — cohérent avec `STATIC_ROUTES` du sitemap.
- **Footer** : colonne "Nos services" pointe **4 fois vers `/services`** avec des libellés différents ("Covering véhicule", "Textile pro", "Enseignes", "Impression") plutôt que vers les fiches produit dédiées (`/fiches/covering`, etc.) — maillage interne sous-optimal : ces 4 liens auraient pu pointer vers les fiches produit correspondantes pour renforcer leur autorité interne au lieu de dupliquer 4 liens identiques vers `/services`. Colonne "L'agence" : Qui sommes-nous (`/a-propos`), Nos réalisations (`/realisations`), Blog (`/blog`), Accueil (`/`), Contact (`/devis`) — c'est **le seul endroit du Header/Footer où `/blog` est linké**.
- **`/plan-du-site`** (voir aussi INVENTAIRE-PAGES.md) :
  - Colonne "Fiches produit" incomplète : ne liste que 5 des 8 fiches existantes (`textile`, `enseignes`, `vitrophanies`, `plaques-panneaux`, `logo-lumineux`) — **`covering`, `impression` et `flyers` en sont absentes**, alors que ce sont des pages centrales du site (covering a même son propre slide hero sur l'accueil).
  - `/suppression-donnees` absente des 3 colonnes (Pages principales / Fiches produit / Légal), alors qu'elle existe et est linkée depuis `/confidentialite`.
- **`/devis`** est un cul-de-sac volontaire (aucun lien sortant vers d'autres pages internes, seulement tel/mailto) — cohérent avec son rôle de page de conversion finale, pas une anomalie.

**Impact** : le plan du site, censé donner une vue exhaustive et servir de filet de sécurité pour le maillage interne et le crawl, ne reflète pas fidèlement l'arborescence réelle — 3 fiches produit sur 8 et une page RGPD n'y sont pas listées.

**Correction envisageable** : compléter la colonne "Fiches produit" de `/plan-du-site` avec les 3 fiches manquantes et ajouter `/suppression-donnees` à la colonne "Légal" ; envisager de faire pointer les 4 liens de la colonne Footer "Nos services" vers les fiches produit dédiées plutôt que vers `/services` en boucle.

---

## 12. Blog et pages dynamiques

**Fichiers concernés** : `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`, `app/sitemap.ts`.

**Constat** :
- `/blog` : `export const dynamic = "force-dynamic"`, requête SQL directe (`posts` WHERE `status='published'`), pagination par 9 (`PAGE_SIZE = 9`), gestion explicite de 2 cas limites : DB injoignable (`dbUnavailable = true` → message "Le blog est momentanément indisponible") et liste vide (`posts.length === 0` → "Aucun article publié pour l'instant. Revenez bientôt !").
- `/blog/[slug]` : même pattern `force-dynamic`, requête avec jointure sur `admin_users` pour le nom d'auteur, `generateMetadata` dynamique correct (title, description, openGraph), `notFound()` appelé si l'article n'existe pas OU si son `status` n'est pas `'published'` — **bon réflexe de sécurité** : un article en brouillon ne peut pas être consulté via son URL publique même en la devinant.
- **Aucune `generateStaticParams`** sur `/blog/[slug]` : aucun article n'est pré-rendu statiquement au build, tout est calculé à la requête (SSR complet). Ceci a un impact sur les performances (TTFB) mais pas directement sur l'indexabilité (le contenu HTML est bien présent côté serveur au premier rendu, donc crawlable).
- État actuel du contenu : le code seul ne permet pas de savoir depuis ce fichier combien d'articles sont effectivement publiés dans la table `posts` — c'est une donnée en base, non vérifiable sans connexion réelle à la DB (hors périmètre de cet audit en lecture seule du code).
- Le sitemap (`app/sitemap.ts`) inclut dynamiquement les articles publiés avec leur `updated_at` réel comme `lastModified` — cohérent et correct, contrairement aux routes statiques (voir point 6).

**Impact** : performance (pas de mise en cache statique des articles), mais logique d'indexation cohérente et sécurisée.

**Correction envisageable** : envisager `generateStaticParams` + `revalidate` (ISR) sur `/blog/[slug]` pour combiner fraîcheur du contenu et performance, une fois le volume d'articles connu.

---

## 13. Risques de contenu dupliqué

**Fichiers concernés** : `app/(site)/services/page.tsx` (modales), `app/(site)/fiches/*/page.tsx`, `app/robots.ts`, `app/sitemap.ts`.

**Constat** :
- **`/services` contient 4 modales produit** (covering, textile, enseignes, impression) avec un texte de description et une liste "Ce qui est inclus" qui **recoupent fortement** le contenu des fiches dédiées `/fiches/covering`, `/fiches/textile`, `/fiches/enseignes`, `/fiches/impression` — sans être identiques mot pour mot (les tarifs affichés diffèrent même entre les deux, voir POINTS-A-VALIDER.md), mais le sujet, l'angle et une partie du vocabulaire se recoupent nettement. Ce n'est pas un cas de duplication de contenu strict (texte non identique), mais un chevauchement thématique fort entre deux pages qui pourraient se cannibaliser sur les mêmes requêtes de recherche (ex. "prix covering véhicule Aubervilliers").
- **www vs non-www / http vs https** : `app/robots.ts` et `app/sitemap.ts` utilisent tous deux la même constante `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr"` — cohérent entre les deux fichiers, mais **aucune redirection technique n'est visible dans le code** (`next.config.ts` n'a pas de `redirects()`) pour garantir que la version non-www (`https://2fpub.fr`) redirige bien vers la version www canonique, ou l'inverse. Cette redirection, si elle existe, est probablement gérée au niveau DNS/hébergeur (hors périmètre du code source).
- **Trailing slash / pagination blog** : pas de canonical (voir point 3) pour désambiguïser `/blog` vs `/blog?page=1` (qui affichent le même contenu).

**Impact** : risque modéré de cannibalisation entre `/services` et les fiches produit sur les mêmes mots-clés commerciaux ; risque de duplication technique www/non-www non couvert par une balise canonical (absente partout, voir point 3) en filet de sécurité si la redirection DNS venait à manquer.

**Correction envisageable** : différencier plus nettement l'angle de `/services` (vue d'ensemble, comparatif) de celui des fiches produit (détail technique + tarifs), ou alléger le contenu textuel des modales `/services` pour renvoyer plus tôt vers la fiche complète ; ajouter des canonicals une fois `metadataBase` en place (point 2 et 3).

---

## 14. `next.config.ts` — options pertinentes pour le SEO

**Fichier** : `next.config.ts` (contenu intégral, déjà cité au point 8).

**Constat** : le fichier ne contient que `experimental.viewTransition: true`. Aucune configuration `images` (donc pas de domaines distants autorisés pour `next/image`, cohérent avec l'absence totale d'usage de `next/image`), aucun `trailingSlash`, aucun `basePath`, aucun `i18n` (site mono-langue FR).

**Correction envisageable** : si `next/image` est adopté (point 10), ajouter la config `images.remotePatterns` correspondant à l'origine de stockage des médias (uploads admin, cover_image_url, etc. — non identifiée précisément dans le périmètre lu de cet audit).
