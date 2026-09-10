# Synthèse de l'audit SEO — 2fpub.fr

Audit en lecture seule réalisé le 08/09/2026 sur la branche `feature/blog-realisations-admin-ia`. Ce document synthétise les 4 rapports détaillés (`INVENTAIRE-PAGES.md`, `CONTENUS-FICHES.md`, `AUDIT-TECHNIQUE.md`, `INVENTAIRE-URL.md`, `POINTS-A-VALIDER.md`). Aucune correction n'a été appliquée, aucune reconstruction n'est recommandée : l'objectif de ce chantier est de finaliser l'existant.

---

## A. Problèmes SEO CONFIRMÉS (constats techniques/factuels dans le code)

1. **16 des 18 pages statiques partagent le même title/description**, hérités de `app/layout.tsx` ("2F Publicité — Communication visuelle B2B"). Seules `/blog` et `/blog/[slug]` ont des métadonnées propres. Cause : la quasi-totalité des pages sont des composants `"use client"`, structurellement incompatibles avec `export const metadata`.
2. **Aucun `metadataBase`** défini nulle part dans le repo — risque sur la résolution des URLs Open Graph relatives (notamment `openGraph.images` sur `/blog/[slug]`).
3. **Aucune balise `canonical`** nulle part dans le site (recherche exhaustive, zéro occurrence).
4. **Aucun JSON-LD / schema.org** nulle part dans le repo (zéro occurrence de `application/ld+json`) — absence de `LocalBusiness`, `Organization`, `Product`/`Offer`, `FAQPage` (alors que plusieurs fiches ont une FAQ en JSX prête à baliser), `BlogPosting`, `BreadcrumbList`, `Review`/`AggregateRating` (alors que la note "4,9/5 sur 80+ avis" est affichée en clair sur l'accueil).
5. **`/suppression-donnees` est absente de `STATIC_ROUTES` dans `app/sitemap.ts`**, alors que la route existe, est publique, indexable et linkée depuis `/confidentialite`. C'est la seule route statique du système de fichiers non couverte par le sitemap.
6. **`/plan-du-site` est incomplet** : 3 des 8 fiches produit (`/fiches/covering`, `/fiches/impression`, `/fiches/flyers`) et `/suppression-donnees` n'y sont listées dans aucune colonne, alors que ces pages existent et sont accessibles.
7. **Le formulaire de devis (`/devis`) et le formulaire RGPD (`/suppression-donnees`) sont tous deux non fonctionnels en l'état** : `action="https://formspree.io/f/VOTRE_FORM_ID_ICI"` et `action="https://formspree.io/f/VOTRE_RGPD_FORM_ID_ICI"` sont des placeholders explicitement signalés comme tels par des commentaires dans le code, jamais remplacés par un vrai ID Formspree.
8. **Aucune image du site n'utilise `next/image`** — 94 balises `<img>` natives recensées dans `app/(site)/`, sans optimisation automatique de format/poids/responsive.
9. **11 `alt=""` vides recensés**, dont certains non justifiés : notamment les images de couverture d'articles de blog (`app/(site)/blog/page.tsx` et `app/(site)/blog/[slug]/page.tsx`), qui portent pourtant une information (visuel principal de l'article) et méritent un `alt` descriptif.
10. **Aucune page `not-found.tsx` personnalisée** — un article de blog inexistant/non publié déclenche la 404 générique de Next.js, sans header/footer ni branding du site.
11. **Aucune redirection (301/302) n'est configurée** dans `next.config.ts` (pas de `redirects()`) ni dans `proxy.ts` (qui ne gère que l'authentification `/admin`). Aucun mécanisme de redirection SEO n'existe dans le code, pour d'éventuelles anciennes URLs ou une consolidation www/non-www.
12. **Chevauchement de contenu entre `/services` (modales produit) et les fiches `/fiches/*` dédiées**, avec des tarifs et délais parfois différents entre les deux sources pour les mêmes prestations (covering, textile, enseignes, impression) — voir `POINTS-A-VALIDER.md` §6 pour le détail chiffré.
13. **`lastModified` du sitemap pour les routes statiques est calculé à `new Date()`** (date de génération de la requête), pas une vraie date de dernière modification de contenu — réduit la valeur informative de ce champ pour les moteurs.

---

## B. Points INCERTAINS nécessitant validation humaine (dirigeants)

Le détail complet, avec citations exactes et fichiers, est dans `POINTS-A-VALIDER.md`. Résumé des points les plus sensibles :

1. **Incohérence "1999" (fondation) vs "40 ans d'expérience"** affiché sur la fiche textile — écart d'environ 15 ans à clarifier ou expliquer.
2. **Incohérence "24h" (devis, réponse) vs "48h" (devis chiffré)** répétée sur presque toutes les pages sans que la nuance entre les deux délais ne soit jamais explicitée dans le texte.
3. **Affirmation "pas de sous-traitance / 100% production interne"** (page à-propos) potentiellement en tension avec la mention explicite d'un partenaire externe nommé, **Aqua Pressing**, présenté comme contrôlant/testant les vêtements sur la fiche textile.
4. **Tarifs différents entre les modales `/services` et les grilles tarifaires des fiches `/fiches/*`** pour covering, textile, enseignes et impression (fourchettes, seuils de quantité et délais non alignés).
5. **Authenticité et consentement des avis clients** affichés avec initiale/prénom + secteur + ville (19 témoignages au total entre l'accueil et `/realisations`) — à confirmer comme réels et publiés avec l'accord des personnes citées, notamment au regard de la politique de confidentialité qui annonce une "durée de rétention des données" de 6 mois.
6. **Chiffres clés à réactualiser ou clarifier** : "+500 clients" vs "+500 projets" (deux métriques différentes, même chiffre), "10 000 projets" daté de 2018 dans la timeline (8 ans d'écart avec aujourd'hui), note Google "4,9/5 sur 80+ avis" à vérifier comme à jour.
7. **Crédits photographiques "Adobe Stock"** dans les mentions légales, alors que le site présente par ailleurs des photos comme celles de l'atelier et de l'équipe réels — cohérence à vérifier.
8. **Boutique en ligne annoncée comme utilisable** ("Commandez en ligne, en toute simplicité") sur l'accueil et dans le Header, alors que le lien pointe vers `#` (placeholder) — à ne pas publier tel quel tant que la future boutique Shopify (mentionnée hors scope dans le contexte de mission) n'existe pas.
9. **Affirmation réglementaire non sourcée** sur la fiche enseignes ("En dessous de 1 m², une déclaration en mairie suffit souvent") — à faire valider juridiquement avant publication, le seuil réel dépendant aussi du PLU local.
10. **Garanties chiffrées** ("Garantie 5 ans" covering, "Garantie 2 ans" enseignes, "économies jusqu'à 70%" LED, "50 000h de durée de vie" LED) à confirmer comme des engagements réels et formalisés.

---

## C. Fichiers à examiner en priorité pour la suite du chantier SEO

Par ordre d'impact SEO estimé (technique d'abord, puis contenu) :

1. **`app/sitemap.ts`** — ajouter `/suppression-donnees` à `STATIC_ROUTES` ; revoir le calcul de `lastModified`.
2. **`app/layout.tsx`** — ajouter `metadataBase` ; envisager un bloc `openGraph`/`twitter` par défaut.
3. **Les 16 pages `"use client"` sans `metadata` propre** (`app/(site)/page.tsx` + `HomeClient.tsx`, `app/(site)/services/page.tsx`, `app/(site)/a-propos/page.tsx`, `app/(site)/realisations/page.tsx`, les 8 `app/(site)/fiches/*/page.tsx`, `app/(site)/devis/page.tsx`, `app/(site)/mentions-legales/page.tsx`, `app/(site)/confidentialite/page.tsx`, `app/(site)/suppression-donnees/page.tsx`, `app/(site)/plan-du-site/page.tsx`) — candidates à un passage en Server Component + wrapper `metadata` par page, sur le modèle déjà en place pour `/realisations` (`page.tsx` serveur + `RealisationsPageEffects.tsx` client) et `/blog/[slug]`.
4. **`app/(site)/devis/page.tsx`** et **`app/(site)/suppression-donnees/page.tsx`** — formulaires Formspree non configurés (`VOTRE_FORM_ID_ICI` / `VOTRE_RGPD_FORM_ID_ICI`), bloquant pour la conversion et la conformité RGPD.
5. **`app/(site)/plan-du-site/page.tsx`** — compléter la liste des fiches produit et ajouter `/suppression-donnees`.
6. **`app/(site)/blog/page.tsx`** et **`app/(site)/blog/[slug]/page.tsx`** — corriger les `alt=""` vides sur les images de couverture ; candidat naturel pour un premier JSON-LD `BlogPosting` (toutes les données nécessaires sont déjà présentes côté serveur).
7. **`components/Footer.tsx`** — les 4 liens de la colonne "Nos services" pointent tous vers `/services` plutôt que vers les fiches produit dédiées ; année de copyright codée en dur ("© 2026").
8. **`app/(site)/services/page.tsx`** (modales produit) vs **`app/(site)/fiches/*/page.tsx`** — à faire arbitrer par les dirigeants pour aligner tarifs/délais entre les deux sources (voir `POINTS-A-VALIDER.md` §6) avant toute publication de contenu optimisé.
9. **`next.config.ts`** — pas d'action urgente identifiée, mais à revisiter si `next/image` ou des redirections sont introduites ultérieurement.
10. **Aucun fichier de contenu ne doit être publié sans passage par `POINTS-A-VALIDER.md`** en amont — plusieurs chiffres et affirmations commerciales actuellement en ligne (ou prêts à l'être) contiennent des incohérences internes au site.

---

## Rappel de méthode

Cet audit est strictement basé sur la lecture du code source de la branche `feature/blog-realisations-admin-ia` à la date du 08/09/2026. Aucun fichier n'a été modifié, créé (hors `docs/seo-audit/`), supprimé, migré ou déployé dans le cadre de cette mission. Les informations dépendant de l'état réel de la base de données (nombre d'articles publiés, contenu exact des réalisations en base) n'ont pas pu être vérifiées sans connexion réelle à la DB, ce qui est hors périmètre de cet audit en lecture seule.
