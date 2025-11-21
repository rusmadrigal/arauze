"use client";

import React, { useState, useEffect, useRef } from "react";
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
    fornitore_servizi: "Fornitore di servizi",
    condominio: "Condominio",
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

export default function RaccomandataPieChart({ slices, title }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(90); // valor desktop

    useEffect(() => {
        function updateRadius() {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;

            // Ajuste dinámico responsivo
            if (width < 360) setRadius(65);
            else if (width < 480) setRadius(80);
            else setRadius(95);
        }

        updateRadius();
        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

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
        <section className="mt-6 rounded-xl bg-white p-4 shadow-sm border border-slate-200">
            {title && (
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                    {title}
                </h3>
            )}

            {/* contenedor responsivo */}
            <div
                ref={containerRef}
                className="w-full h-[280px] sm:h-[300px] flex items-center justify-center"
            >
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={radius * 0.45}
                            outerRadius={radius}
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
                                return [`${v} (${pct.toFixed(0)}%)`, String(name)];
                            }}
                            contentStyle={{
                                borderRadius: 10,
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            }}
                        />

                        <Legend wrapperStyle={{ paddingTop: 10 }} iconType="square" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
