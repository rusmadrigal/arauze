"use client";

import dynamic from "next/dynamic";

const TrendMiniChart = dynamic(() => import("./TrendMiniChart"), {
  ssr: false,
  loading: () => (
    <div
      className="h-8 w-20 max-w-full animate-pulse rounded bg-gray-200"
      aria-hidden
    />
  ),
});

export default function TrendMiniChartLazy(props: { code: string }) {
  return <TrendMiniChart {...props} />;
}
