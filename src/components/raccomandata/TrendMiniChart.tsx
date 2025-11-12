"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface Props {
  code: string;
}

type ApiResponse = {
  ok: boolean;
  code: string;
  series: { date: string; count: number }[];
};

export default function TrendMiniChart({ code }: Props) {
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch(`/api/code-trend?code=${code}`, { cache: "no-store" });
        const json: ApiResponse = await res.json();
        if (!active) return;
        if (json.ok && json.series?.length) {
          setData(json.series.map((p) => p.count));
        }
      } catch (e) {
        console.error("TrendMiniChart error:", e);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [code]);

  if (loading) {
    return <div className="h-6 w-16 animate-pulse bg-gray-200 rounded" />;
  }

  const chartData = {
    labels: data.map((_, i) => i), // índices
    datasets: [
      {
        data,
        borderColor: "#2F66D5",
        borderWidth: 1.8,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { line: { fill: false } },
  };

  return (
    <div className="h-8 w-20">
      <Line data={chartData} options={options} />
    </div>
  );
}
