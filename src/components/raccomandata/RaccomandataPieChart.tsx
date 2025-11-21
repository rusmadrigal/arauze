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

// Mapa: slug de Sanity -> etiqueta legible
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
    fornitore_servizi: "Fornitore di servizi (luce, gas, acqua, internet)",
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

    // Normalizamos datos: nombre legible + valor
    const data = slices.map((slice) => ({
        key: slice.categoria,
        name: CATEGORY_LABELS[slice.categoria] ?? slice.categoria,
        value: slice.valore,
        color: slice.color,
    }));

    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);

    // Etiqueta en el gráfico: porcentaje redondeado
    const renderLabel = (entry: { value: number }) => {
        if (!total) return "";
        const pct = (entry.value / total) * 100;
        return `${pct.toFixed(0)}%`;
    };


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
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: string | number, name: string | number) => {
                                const v = typeof value === "number" ? value : Number(value);
                                const pct = total ? (v / total) * 100 : 0;

                                return [`${v} (${pct.toFixed(0)}%)`, String(name)];
                            }}
                        />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default RaccomandataPieChart;
