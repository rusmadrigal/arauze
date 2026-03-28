import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { EXISTS_BY_CODE, SEARCH_RACCOMANDATA } from "@/lib/queries/search";
import { extractCode, normalizeQuery, toGroqPattern } from "@/lib/search/parseQuery";

export const runtime = "nodejs"; // o "edge" si tu cliente Sanity lo permite en edge

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const raw = (searchParams.get("q") || "").trim();
        if (!raw) {
            return NextResponse.json({ ok: false, error: "Parametro 'q' requerido" }, { status: 400 });
        }

        // 1) Intento por código presente en el texto
        const codeFromText = extractCode(raw);
        if (codeFromText) {
            const found = await sanityClient.fetch(EXISTS_BY_CODE, { code: codeFromText });
            if (found?.code) {
                return NextResponse.json({
                    ok: true,
                    action: "redirect",
                    href: `/raccomandata/${found.code}`,
                    match: { code: found.code, mittente: found.mittente, title: found.heroTitleSuffix }
                });
            }
            // si no existe ese código, caemos a búsqueda por texto
        }

        // 2) Búsqueda textual flexible
        const nq = normalizeQuery(raw);
        if (!nq) {
            // si al limpiar quedó vacío, informamos sin resultados
            return NextResponse.json({ ok: true, action: "none", results: [] });
        }

        const pattern = toGroqPattern(nq);
        const results = await sanityClient.fetch(SEARCH_RACCOMANDATA, { p: pattern });

        if (!results?.length) {
            return NextResponse.json({ ok: true, action: "none", results: [] });
        }

        if (results.length === 1) {
            return NextResponse.json({
                ok: true,
                action: "redirect",
                href: `/raccomandata/${results[0].code}`,
                results
            });
        }

        // múltiples resultados → el caller decide (normalmente /ricerca?q=...)
        return NextResponse.json({ ok: true, action: "multiple", results });
    } catch (err) {
        console.error("[/api/search] error:", err);
        return NextResponse.json({ ok: false, error: "Search failed" }, { status: 500 });
    }
}
