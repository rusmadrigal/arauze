import { sanityClient } from "sanity/lib/client";
import { ULTIME_ANALIZZATE_PAGES } from "sanity/lib/queries/raccomandata";
import type { RaccomandataItem, Urgency } from "@/components/home/UltimeAnalizzate";

type Row = {
  code: string;
  sender?: string;
  urgency?: Urgency;
  state?: string;
};

export async function getUltimeAnalizzateForHome(): Promise<RaccomandataItem[]> {
  try {
    const rows = await sanityClient.fetch<Row[]>(ULTIME_ANALIZZATE_PAGES);
    return (rows ?? []).map((r) => ({
      code: r.code,
      sender: r.sender ?? "—",
      urgency: (r.urgency as Urgency) ?? "BASSA",
      state: r.state ?? "Dettaglio →",
      href: `/raccomandata/${r.code}`,
    }));
  } catch {
    return [
      {
        code: "—",
        sender: "Errore",
        urgency: "BASSA",
        state: "Riprova",
        href: undefined,
      },
    ];
  }
}
