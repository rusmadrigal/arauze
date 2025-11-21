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
import type {
    ValueType,
    NameType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
    slices: RaccomandataChartSlice[];
    title?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
    avviso_giacenza: "Avviso di giacenza",
    agenzia_entrate: "Agenzia delle Entrate / Fisco",
    inps: "INPS / Ente previdenziale",
    comune: "Comune / Municipio",
    forze_ordine: "Prefettura / Questura / Forze dell’ordine",
    tribunale: "Tribunale / Ufficio giudiziario",
    banca: "Banca / Finanziaria",
    assicurazione: "Assicurazione",
    recupero_crediti: "Recupero crediti / Sollecito di pagamento",
    multa: "Multa / Verbale di contestazione",
    fornitore_servizi:
        "Fornitore di servizi (luce, gas, acqua, internet)",
    condominio: "Condominio / Amministratore di condominio",
    altro: "Altro",
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
        key: slice.categoria,
        name: CATEGORY_LABELS[slice.categoria] ?? slice.categoria,
        value: slice.valore,
        color: slice.color,
    }));

    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);

    const renderLabel = (entry: { value: number }) => {
        if (!total) return "";
        const pct = (entry.value / total) * 100;
        return `${pct.toFixed(0)}%`;
    };

    return (
        <section className="mt-8 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 shadow-sm">
            {title && (
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                    {title}
                </h3>
            )}

            <div className="rounded-xl bg-white p-4 shadow-inner">
                <div className="h-64 w-full">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={90}
                                label={renderLabel}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.key ?? index}
                                        fill={
                                            entry.color ||
                                            DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                                        }
                                        className="cursor-pointer transition-transform duration-150 hover:scale-105"
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value: ValueType, name: NameType) => {
                                    const v =
                                        typeof value === "number" ? value : Number(value);
                                    const pct = total ? (v / total) * 100 : 0;
                                    return [
                                        `${v} (${pct.toFixed(0)}%)`,
                                        String(name),
                                    ];
                                }}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 10px 25px rgba(15,23,42,0.10)",
                                    backgroundColor: "#ffffff",
                                    padding: "8px 12px",
                                }}
                                itemStyle={{
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                }}
                            />

                            <Legend
                                wrapperStyle={{
                                    paddingTop: 12,
                                }}
                                iconType="square"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default RaccomandataPieChart;
