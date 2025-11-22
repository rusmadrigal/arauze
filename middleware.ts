import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Solo afecta rutas que tengan mayúsculas
    if (pathname !== pathname.toLowerCase()) {
        const url = req.nextUrl.clone();
        url.pathname = pathname.toLowerCase();

        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

// Rutas donde queremos aplicar esta lógica
export const config = {
    matcher: [
        "/raccomandata/:path*",
    ],
};
