// src/components/raccomandata/RaccomandataPieChart.tsx
"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { RaccomandataChartSlice } from "@/lib/sanity/raccomandataChart";

type Props = {
    slices: RaccomandataChartSlice[];
    title?: string;
};

const DEFAULT_COLORS = [
    "#2563eb",
    "#22c55e",
    "#eab308",
    "#ef4444",
    "#a855f7",
    "#06b6d4",
    "#f97316",
];

const RaccomandataPieChart: React.FC<Props> = ({ slices, title }) => {
    if (!slices || slices.length === 0) return null;

    const data = slices.map((slice) => ({
        name: slice.categoria,
        value: slice.valore,
        color: slice.color,
    }));

    return (
        <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
            {title && (
                <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>
            )}

            <div className="h-64 w-full">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.color ||
                                        DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default RaccomandataPieChart;
