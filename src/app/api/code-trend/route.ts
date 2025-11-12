import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { REPORTS_SERIES_BY_CODE } from "sanity/lib/queries/reports";

type TrendPoint = { date: string; count: number };
type ApiOk = { ok: true; code: string; rangeDays: number; series: TrendPoint[] };
type ApiErr = { ok: false; error: string };

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = (searchParams.get("code") || "").trim();

    if (!code || !/^\d{3,6}$/.test(code)) {
      return NextResponse.json<ApiErr>({ ok: false, error: "Codice non valido" }, { status: 400 });
    }

    const res = await sanityClient.fetch<{ points: { date: string; count?: number }[] }>(
      REPORTS_SERIES_BY_CODE,
      { code },
      { cache: "no-store" }
    );

    const perDay = new Map<string, number>();
    for (const p of res.points ?? []) {
      if (!p?.date) continue;
      const inc = p.count != null && !isNaN(Number(p.count)) ? Number(p.count) : 1;
      perDay.set(p.date, (perDay.get(p.date) ?? 0) + inc);
    }

    const rangeDays = 30;
    const today = new Date();
    const series: TrendPoint[] = [];
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      series.push({ date: key, count: perDay.get(key) ?? 0 });
    }

    return NextResponse.json<ApiOk>({ ok: true, code, rangeDays, series }, { status: 200 });
  } catch (e) {
    console.error("❌ Errore in /api/code-trend:", e);
    return NextResponse.json<ApiErr>({ ok: false, error: "Errore interno" }, { status: 500 });
  }
}
