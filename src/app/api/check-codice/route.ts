import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE as CODE_BY_NUMBER } from "sanity/lib/queries/raccomandata";

type OfficialDoc = {
  code: string;
  mittente?: string;
  tipologia?: string;
  stato?: string;
  priority?: "ALTA" | "MEDIA" | "BASSA" | "RITIRATA";
  confidence?: number;
  reportsCount?: number;
  updatedAt?: string;
  sources?: string[];
} | null;

type ReportDoc = {
  _id: string;
  count?: number;
};

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

    // 1️⃣ Traemos el documento oficial y todos los reportes asociados
    const [official, reports] = await Promise.all([
      sanityClient.fetch<OfficialDoc>(CODE_BY_NUMBER, { code }, { cache: "no-store" }),
      sanityClient.fetch<ReportDoc[]>(
        `*[_type == "raccomandataReport" && code == $code]{_id, count}`,
        { code },
        { cache: "no-store" }
      ),
    ]);

    // 2️⃣ Calculamos el total de reportes (sumando 'count' si existe)
    const totalReports = Array.isArray(reports)
      ? reports.reduce((acc, r) => acc + (r.count ?? 1), 0)
      : 0;

    const finalReports =
      (typeof official?.reportsCount === "number" ? official.reportsCount : undefined) ??
      totalReports;

    // 3️⃣ Si no hay datos oficiales, devolvemos fallback
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

    // 4️⃣ Respuesta final
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
    console.error("❌ Errore in /api/check-codice:", error);
    return NextResponse.json(
      { ok: false, error: "Errore interno del server." },
      { status: 500 }
    );
  }
}
