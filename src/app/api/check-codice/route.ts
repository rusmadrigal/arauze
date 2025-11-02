import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/client";
import { CODE_BY_NUMBER, REPORTS_BY_CODE } from "sanity/lib/queries/raccomandata";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = (searchParams.get("code") || "").trim();

    // ✅ Validación rápida
    if (!code || !/^\d{3,6}$/.test(code)) {
      return NextResponse.json(
        { ok: false, error: "Codice non valido o mancante." },
        { status: 400 }
      );
    }

    // ✅ Fetch paralelo (oficial + reportes)
    const [official, reportsCount] = await Promise.all([
      sanityClient.fetch(CODE_BY_NUMBER(code)),
      sanityClient.fetch(REPORTS_BY_CODE(code)),
    ]);

    // ⚠️ Si no existe el código en la base oficial
    if (!official) {
      return NextResponse.json(
        {
          ok: true,
          found: false,
          code,
          suggestion:
            "Nessun dato ufficiale trovato. Invia una segnalazione per aiutarci ad aggiornare il database.",
          reportsCount: reportsCount || 0,
        },
        { status: 200 }
      );
    }

    // ✅ Si existe, devolvemos el documento completo
    return NextResponse.json(
      {
        ok: true,
        found: true,
        ...official,
        reportsCount: reportsCount || 0,
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
