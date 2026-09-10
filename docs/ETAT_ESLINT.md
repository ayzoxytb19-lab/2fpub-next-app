# État ESLint — 2fpub-next-app

Document produit le 09/09/2026. `npx eslint .` remonte **315 problèmes** (182 erreurs, 133 avertissements), répartis sur **4 règles seulement**, présentes dans le dépôt avant toute intervention de cette mission (confirmé : ce total de 315 est identique à celui mesuré lors de l'audit initial du 09/09/2026 et à chaque vérification depuis — aucune régression, aucun masquage, aucune correction en masse effectuée). Ce document les documente sans les corriger en bloc, conformément à la consigne du propriétaire.

**Aucune de ces 315 alertes ne fait échouer `next build`** — ESLint n'est pas configuré en bloquant sur ce projet (`npm run lint` est un script séparé de `npm run build`).

---

## Répartition par règle

| Règle | Sévérité ESLint | Occurrences | Fichiers concernés | Nature |
|---|---|---:|---:|---|
| `react/no-unescaped-entities` | **erreur** | 166 | 16 | Apostrophes/guillemets non échappés dans du texte JSX (ex. `l'atelier` au lieu de `l&apos;atelier`) |
| `@typescript-eslint/ban-ts-comment` | **erreur** | 16 | 16 | `// @ts-nocheck` en tête des pages historiquement client (`"use client"`) |
| `@next/next/no-img-element` | avertissement | 100 | 19 | Balises `<img>` natives plutôt que `next/image` |
| `@typescript-eslint/no-unused-vars` | avertissement | 33 | 10 | Principalement des paramètres d'évènement (`e`) non utilisés dans des handlers |

**Total : 182 erreurs (`react/no-unescaped-entities` + `@typescript-eslint/ban-ts-comment`) et 133 avertissements (`@next/next/no-img-element` + `@typescript-eslint/no-unused-vars`).**

---

## Détail et position par rapport à une correction

### 1. `react/no-unescaped-entities` — 166 erreurs, 16 fichiers

**Constat** : des apostrophes typographiques françaises normales (`l'atelier`, `d'expérience`, etc.) dans du texte JSX, sans échappement HTML (`&apos;`). Purement cosmétique — n'affecte ni le rendu, ni le build, ni le SEO, ni l'accessibilité. La règle existe pour prévenir une ambiguïté théorique de parsing JSX qui ne se manifeste jamais en pratique ici (le texte s'affiche correctement dans le navigateur).

**Position** : correction possible en masse (recherche/remplacement automatisé de `'` → `&apos;` dans le texte JSX), mais représente une modification de **166 lignes réparties sur 16 fichiers** pour un gain cosmétique nul en pratique. Conformément à la consigne (« ne pas réaliser de refonte générale du code uniquement pour faire baisser ce chiffre »), **non corrigé en masse**. Les quelques occurrences que j'ai moi-même introduites lors de mes modifications ont été corrigées au fil de l'eau (voir historique de cette mission) — c'est la bonne pratique retenue : ne pas ajouter de nouvelles occurrences, sans pour autant purger rétroactivement les 166 déjà présentes.

### 2. `@typescript-eslint/ban-ts-comment` — 16 erreurs, 16 fichiers

**Constat** : les 16 fichiers `*PageClient.tsx` créés lors de la conversion en Server Components (Phase D) ont hérité du `// @ts-nocheck` déjà présent dans les pages `"use client"` d'origine (voir `docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md`). Ce commentaire désactive la vérification TypeScript sur ces fichiers spécifiquement.

**Position** : retirer `// @ts-nocheck` de ces 16 fichiers sans les auditer un par un risquerait de révéler des erreurs de type jusqu'ici masquées et de casser silencieusement des pages fonctionnelles — un chantier à part entière, fichier par fichier, avec tests visuels à chaque fois (même logique que pour `next/image`, ci-dessous). **Non traité dans cette mission**, signalé comme chantier futur possible si vous le souhaitez.

### 3. `@next/next/no-img-element` — 100 avertissements, 19 fichiers

**Constat** : aucune balise du site n'utilise `next/image`. Déjà documenté dans `docs/seo-audit/AUDIT-TECHNIQUE.md` (point 10) et `docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md`.

**Position** : préparation technique déjà faite (`next.config.ts` — `images.remotePatterns` pour Vercel Blob, Phase D). Migration effective **volontairement non lancée en masse** : conformément à votre consigne, elle se fera par petits lots avec vérification visuelle, pas d'un coup sur 100 balises. Deux images cassées de `/fiches/covering` corrigées séparément ce jour (non liées à `next/image` — voir compte rendu de la conversation).

### 4. `@typescript-eslint/no-unused-vars` — 33 avertissements, 10 fichiers

**Constat** : très majoritairement des paramètres d'évènement (`e`) déclarés dans un handler mais jamais utilisés dans son corps (ex. `onClick={(e) => { ... }}` où `e` ne sert à rien). Style hérité du code d'origine, sans impact fonctionnel.

**Position** : correction triviale (renommer en `_e` ou retirer le paramètre) mais dispersée sur 10 fichiers pour un gain purement cosmétique. **Non corrigé en masse**, même logique que le point 1.

---

## Ce qui a été corrigé (hors de ce compte global, car ce sont des corrections déjà appliquées et vérifiées)

Pour mémoire, ces problèmes ESLint **réels** (pas des avertissements de style) ont été corrigés pendant cette mission, avant l'établissement du compte de 315 ci-dessus qui reflète l'état stable actuel :
- `components/Header.tsx` : `setState` synchrone dans un effet (`react-hooks/set-state-in-effect`) et type `any` explicite — corrigés et vérifiés (voir compte rendu Phase D).

## Méthode de vérification

`npx eslint .` exécuté à l'identique avant/après chaque lot de modifications de cette mission ; le total (315) et sa répartition par règle sont restés strictement identiques à chaque contrôle, à l'exception des variations transitoires immédiatement corrigées (ex. une ligne que j'ai moi-même ajoutée avec une apostrophe non échappée, corrigée dans la foulée). `npx tsc --noEmit` et `npx next build` vérifiés en parallèle, systématiquement propres.
