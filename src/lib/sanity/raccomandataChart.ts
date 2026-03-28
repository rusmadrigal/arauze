// src/lib/sanity/raccomandataChart.ts
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_CHART_BY_CODE } from "sanity/lib/queries/raccomandata";

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

export async function getRaccomandataChart(
  code: string
): Promise<RaccomandataChart | null> {
  return sanityClient.fetch<RaccomandataChart | null>(
    RACCOMANDATA_CHART_BY_CODE,
    { code }
  );
}
