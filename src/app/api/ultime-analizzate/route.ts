import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { ULTIME_ANALIZZATE_PAGES } from "sanity/lib/queries/raccomandata";

type Urgency = "ALTA" | "BASSA" | "RITIRATA";

type Row = {
    code: string;
    sender?: string;
    urgency?: Urgency;
    state?: string;
};

export const revalidate = 300; // ISR 5 min (Next 15/16 App Router)

export async function GET() {
    try {
        const rows = await sanityClient.fetch<Row[]>(ULTIME_ANALIZZATE_PAGES);

        // Normalizamos y agregamos href para la UI
        const items = (rows ?? []).map((r) => ({
            code: r.code,
            sender: r.sender ?? "—",
            urgency: (r.urgency as Urgency) ?? "BASSA",
            state: r.state ?? "Dettaglio →",
            href: `/raccomandata/${r.code}`,
        }));

        // Cachea en proxy/CDN por 5 min
        return NextResponse.json(items, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
            },
        });
    } catch (err) {
        console.error("[ultime-analizzate] error:", err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
