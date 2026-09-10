# Inventaire des URLs — 2fpub.fr

Audit en lecture seule, déduit du système de fichiers `app/(site)/` et du code source. Aucune suppression ni redirection n'est recommandée ici — ce document constate l'existant.

---

## 1. Routes publiques statiques (déduites de `app/(site)/*/page.tsx`)

| Route | Fichier source |
|---|---|
| `/` | `app/(site)/page.tsx` |
| `/services` | `app/(site)/services/page.tsx` |
| `/realisations` | `app/(site)/realisations/page.tsx` |
| `/a-propos` | `app/(site)/a-propos/page.tsx` |
| `/devis` | `app/(site)/devis/page.tsx` |
| `/blog` | `app/(site)/blog/page.tsx` |
| `/mentions-legales` | `app/(site)/mentions-legales/page.tsx` |
| `/confidentialite` | `app/(site)/confidentialite/page.tsx` |
| `/suppression-donnees` | `app/(site)/suppression-donnees/page.tsx` |
| `/plan-du-site` | `app/(site)/plan-du-site/page.tsx` |
| `/fiches/covering` | `app/(site)/fiches/covering/page.tsx` |
| `/fiches/enseignes` | `app/(site)/fiches/enseignes/page.tsx` |
| `/fiches/flyers` | `app/(site)/fiches/flyers/page.tsx` |
| `/fiches/impression` | `app/(site)/fiches/impression/page.tsx` |
| `/fiches/logo-lumineux` | `app/(site)/fiches/logo-lumineux/page.tsx` |
| `/fiches/plaques-panneaux` | `app/(site)/fiches/plaques-panneaux/page.tsx` |
| `/fiches/textile` | `app/(site)/fiches/textile/page.tsx` |
| `/fiches/vitrophanies` | `app/(site)/fiches/vitrophanies/page.tsx` |

Soit **18 routes statiques** publiques au total.

## 2. Route publique dynamique

| Route | Fichier source | Détail |
|---|---|---|
| `/blog/[slug]` | `app/(site)/blog/[slug]/page.tsx` | Une URL par article de la table `posts` avec `status = 'published'`. Pas de `generateStaticParams` (tout est en SSR à la requête, `force-dynamic`). Le nombre d'URLs réelles dépend du contenu en base, non vérifiable sans connexion DB (hors périmètre lecture-seule). |

## 3. Comparaison avec `app/sitemap.ts` (STATIC_ROUTES)

`STATIC_ROUTES` dans `app/sitemap.ts` contient exactement 17 chemins :
```
"", "/services", "/realisations", "/a-propos", "/devis", "/blog",
"/mentions-legales", "/confidentialite", "/plan-du-site",
"/fiches/covering", "/fiches/enseignes", "/fiches/flyers",
"/fiches/impression", "/fiches/logo-lumineux", "/fiches/plaques-panneaux",
"/fiches/textile", "/fiches/vitrophanies"
```

**Écart constaté** : la route `/suppression-donnees` existe dans le système de fichiers (`app/(site)/suppression-donnees/page.tsx`) et est accessible publiquement (pas de `noindex`, hors `/admin`), mais **n'apparaît pas dans `STATIC_ROUTES`**. C'est la seule route statique du site absente du sitemap XML généré. Toutes les 17 autres routes statiques du système de fichiers sont bien couvertes.

## 4. Routes non publiques (hors périmètre commercial, mentionnées pour mémoire)

- `app/admin/*` : interface d'administration, exclue par `app/robots.ts` (`disallow: "/admin"`) et par `proxy.ts` (header `X-Robots-Tag: noindex, nofollow, noarchive` sur `matcher: ["/admin/:path*"]`, y compris `/admin/login` et `/admin/setup`). Non auditée en détail (hors scope commercial de cette mission).
- `/sitemap.xml`, `/robots.txt` : routes techniques générées par `app/sitemap.ts` et `app/robots.ts`.

## 5. Redirections déjà configurées dans le projet

**Recherche effectuée** : `redirects()`/`rewrites()` dans `next.config.ts`, et présence d'un fichier `middleware.ts`/`proxy.ts`.

**`next.config.ts`** — contenu intégral :
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
```
Aucune fonction `redirects()` ni `rewrites()` définie. **Aucune redirection HTTP (301/302) n'est configurée dans `next.config.ts`.**

**`proxy.ts`** (équivalent middleware de cette version de Next.js — voir AGENTS.md sur les changements de conventions) — contenu intégral :
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession, SESSION_COOKIE_NAME } from "@/lib/admin/session";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/setup"];

function isPublicAdminPath(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = pathname.startsWith("/admin/media/")
    ? NextResponse.next()
    : isPublicAdminPath(pathname)
      ? NextResponse.next()
      : await guardAdminRoute(request);

  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

async function guardAdminRoute(request: NextRequest): Promise<NextResponse> {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSession(cookie);

  if (!session?.userId) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```
**La seule redirection présente dans tout le code est une redirection d'authentification** : un visiteur non connecté accédant à une route `/admin/*` protégée est redirigé (`NextResponse.redirect`) vers `/admin/login`. **Cette redirection ne concerne que l'espace d'administration** (`matcher: ["/admin/:path*"]`) et n'a aucun effet sur les routes publiques du groupe `(site)`.

**Conclusion** : **aucune redirection SEO (ancienne URL → nouvelle URL) n'existe dans le code du projet**, que ce soit via `next.config.ts` ou `proxy.ts`.

## 6. Recherche de références à l'ancien site (Axomedia) et anciennes URLs

**Méthode** : `grep -rin "axomedia" .` sur l'intégralité du repo (hors `node_modules` et `.git`), sans restriction de type de fichier.

**Résultat** : **aucune occurrence trouvée.**

> Aucune référence aux anciennes URLs Axomedia trouvée dans le code source.

Aucun commentaire, aucun fichier de migration, aucune trace de nom de domaine, de structure d'URL héritée, ou de mention explicite de l'ancien prestataire n'a été identifiée dans le code source actuel (composants, pages, configuration, scripts, documentation du repo).

**Constat additionnel** : en l'absence de toute trace du contenu ou de la structure de l'ancien site dans ce repo, il n'est pas possible, à partir du code seul, de savoir si les URLs de l'ancien site Axomedia diffèrent de celles du nouveau site, ni si des redirections seraient nécessaires. Cette information devra être obtenue par un autre moyen (accès à l'ancien site en ligne s'il existe encore, export d'Axomedia, ou Google Search Console historique) — hors périmètre de cet audit en lecture seule du code.

**Rappel du garde-fou de la mission** : ce constat ne doit pas être interprété comme une autorisation à créer, supprimer ou rediriger quelque route que ce soit — il s'agit uniquement d'un état des lieux du code source actuel.
