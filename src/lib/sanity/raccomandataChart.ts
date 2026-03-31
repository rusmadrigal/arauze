// src/lib/sanity/raccomandataChart.ts
import { unstable_cache } from "next/cache";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_CHART_BY_CODE } from "sanity/lib/queries/raccomandata";
import { RACCOMANDATA_PAGE_REVALIDATE_SEC } from "@/lib/sanity/revalidate";

export type RaccomandataChartSlice = {
  categoria: string;
  valore: number;
  color?: string;
};

export type RaccomandataChart = {
  code: string;
  titolo?: string;
  slices: RaccomandataChartSlice[];
};

const fetchChart = unstable_cache(
  async (code: string) =>
    sanityClient.fetch<RaccomandataChart | null>(RACCOMANDATA_CHART_BY_CODE, { code }),
  ["raccomandata-chart-by-code"],
  { revalidate: RACCOMANDATA_PAGE_REVALIDATE_SEC, tags: ["raccomandata"] }
);

export async function getRaccomandataChart(code: string): Promise<RaccomandataChart | null> {
  return fetchChart(code);
}
