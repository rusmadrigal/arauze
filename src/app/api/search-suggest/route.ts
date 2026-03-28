import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import {
  SUGGEST_RACCOMANDATA_BY_CODE,
  SUGGEST_RACCOMANDATA_TEXT,
} from "@/lib/queries/search";
import { isCodeSlug, normalizeQuery, toGroqPattern } from "@/lib/search/parseQuery";

export const runtime = "nodejs";

export type SuggestItem = {
  code: string;
  mittente?: string | null;
  heroTitleSuffix?: string | null;
  tipologia?: string | null;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("q") || "").trim();
    if (raw.length < 1) {
      return NextResponse.json({ ok: true, results: [] satisfies SuggestItem[] });
    }

    let results: SuggestItem[];

    if (/^\d{1,6}$/.test(raw)) {
      const codePattern = `*${raw.toLowerCase()}*`;
      results =
        (await sanityClient.fetch<SuggestItem[]>(SUGGEST_RACCOMANDATA_BY_CODE, {
          codePattern,
        })) ?? [];
    } else if (isCodeSlug(raw)) {
      const codePattern = `*${raw.trim().toLowerCase()}*`;
      results =
        (await sanityClient.fetch<SuggestItem[]>(SUGGEST_RACCOMANDATA_BY_CODE, {
          codePattern,
        })) ?? [];
    } else if (raw.length < 2) {
      results = [];
    } else {
      const nq = normalizeQuery(raw);
      if (!nq) {
        results = [];
      } else {
        const p = toGroqPattern(nq);
        results =
          (await sanityClient.fetch<SuggestItem[]>(SUGGEST_RACCOMANDATA_TEXT, {
            p,
          })) ?? [];
      }
    }

    return NextResponse.json(
      { ok: true, results },
      {
        headers: {
          // Cache breve in CDN (stessa query = risposta più veloce); dati editoriali cambiano raramente.
          "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120",
        },
      }
    );
  } catch (err) {
    console.error("[/api/search-suggest]", err);
    return NextResponse.json(
      { ok: false, results: [], error: "Suggest failed" },
      { status: 500 }
    );
  }
}
