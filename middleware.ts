// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  const lowerPathname = pathname.toLowerCase();

  // Si ya está en minúsculas, dejamos pasar
  if (pathname === lowerPathname) {
    return NextResponse.next();
  }

  // Si hay mayúsculas, redirigimos a la versión en minúsculas
  const redirectUrl = url.clone();
  redirectUrl.pathname = lowerPathname;

  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: ["/raccomandata/:path*"],
};
