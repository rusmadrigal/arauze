import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { REPORTS_SERIES_BY_CODE } from "sanity/lib/queries/reports";

type TrendPoint = { date: string; count: number };

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const rawCode = (searchParams.get("code") || "").trim();
    // normalizamos a minúsculas para evitar problemas de RKE vs rke
    const code = rawCode.toLowerCase();

    const debug = searchParams.get("debug") === "1";

    // 👉 ahora permitimos letras y números, por ejemplo: 697, rke, rke123
    // ajustá el rango {2,10} si querés ser más o menos estricto
    if (!/^[a-z0-9]{2,10}$/.test(code)) {
      return NextResponse.json(
        { ok: false, error: "Codice non valido", code },
        { status: 400 }
      );
    }

    const res = await sanityClient.fetch<{
      points: {
        date?: string | null;
        count?: number | null;
        _createdAt?: string | null;
        createdAt?: string | null;
      }[];
    }>(
      REPORTS_SERIES_BY_CODE,
      { code }, // ahora le pasamos el code normalizado
      { cache: "no-store" }
    );

    // Normalización + agregación por día
    const perDay = new Map<string, number>();
    for (const p of res.points ?? []) {
      const rawDate =
        p?.date ??
        p?.createdAt ??
        p?._createdAt ??
        new Date().toISOString();

      // yyyy-mm-dd seguro
      const formattedDate =
        typeof rawDate === "string"
          ? rawDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10);

      const inc =
        p?.count != null && !Number.isNaN(Number(p.count))
          ? Number(p.count)
          : 1;

      perDay.set(formattedDate, (perDay.get(formattedDate) ?? 0) + inc);
    }

    // Serie continua (últimos 30 días)
    const rangeDays = 30;
    const today = new Date();
    const series: TrendPoint[] = [];
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      series.push({ date: key, count: perDay.get(key) ?? 0 });
    }

    if (debug) {
      const perDayObject = Array.from(perDay.entries()).reduce<
        Record<string, number>
      >((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});

      return NextResponse.json(
        {
          ok: true,
          code,
          rangeDays,
          series,
          debug: {
            rawPoints: res.points,
            perDay: perDayObject,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { ok: true, code, rangeDays, series },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ /api/code-trend error:", err);
    return NextResponse.json(
      { ok: false, error: "Errore interno" },
      { status: 500 }
    );
  }
}
