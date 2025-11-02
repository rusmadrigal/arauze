// src/app/api/check-codice/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import {
  CODE_BY_NUMBER,
  REPORTS_BY_CODE,
} from "sanity/lib/queries/raccomandata";

type OfficialDoc = {
  code: string;
  mittente?: string;
  tipologia?: string;
  stato?: string;
  confidence?: number;
  reportsCount?: number;
  updatedAt?: string;
  sources?: string[];
} | null;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = (searchParams.get("code") || "").trim();

    if (!code || !/^\d{3,6}$/.test(code)) {
      return NextResponse.json(
        { ok: false, error: "Codice non valido o mancante." },
        { status: 400 }
      );
    }

    const [official, crowdCount] = await Promise.all([
      sanityClient.fetch<OfficialDoc>(CODE_BY_NUMBER, { code }),
      sanityClient.fetch<number>(REPORTS_BY_CODE, { code }),
    ]);

    const finalReports =
      (typeof official?.reportsCount === "number"
        ? official.reportsCount
        : undefined) ??
      (typeof crowdCount === "number" ? crowdCount : undefined) ??
      0;

    if (!official) {
      return NextResponse.json(
        {
          ok: true,
          found: false,
          code,
          suggestion:
            "Nessun dato ufficiale trovato. Invia una segnalazione per aiutarci ad aggiornare il database.",
          reportsCount: finalReports,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        found: true,
        ...official,
        reportsCount: finalReports,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Errore in /api/check-codice:", error.message);
    } else {
      console.error("❌ Errore in /api/check-codice: errore sconosciuto");
    }
    return NextResponse.json(
      { ok: false, error: "Errore interno del server." },
      { status: 500 }
    );
  }
}
