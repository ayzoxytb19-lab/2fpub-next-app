import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession, SESSION_COOKIE_NAME } from "@/lib/admin/session";

// Espace non protégé même sous /admin : la page de connexion, l'écran de
// création du compte propriétaire (accessible une seule fois), et l'API
// d'upload d'image (qui fait sa propre vérification de session + permission
// dans app/admin/media/upload/route.ts).
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/setup"];

function isPublicAdminPath(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

// Vérification optimiste uniquement (cookie présent + signature valide) :
// la vérification "sûre" (permissions, compte actif) se refait en base à
// chaque page/action via lib/admin/dal.ts. Voir la doc Next.js sur
// l'authentification pour cette répartition des rôles entre Proxy et DAL.
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
