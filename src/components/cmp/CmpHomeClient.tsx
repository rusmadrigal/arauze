"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/ui/TopNav";
import type { CmpItem } from "./types";
import { MapPin, ArrowRightCircle, Mail } from "lucide-react";

type Props = {
    initialList: CmpItem[];
};

export default function CmpHomeClient({ initialList }: Props) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] =
        useState<"Tutte" | "Nord" | "Centro" | "Sud">("Tutte");

    const safeList = Array.isArray(initialList) ? initialList : [];

    const filteredList = safeList.filter((cmp) => {
        const q = query.toLowerCase();

        const matchesSearch =
            (cmp.name && cmp.name.toLowerCase().includes(q)) ||
            (cmp.city && cmp.city.toLowerCase().includes(q)) ||
            (cmp.region && cmp.region.toLowerCase().includes(q)) ||
            (cmp.province && cmp.province.toLowerCase().includes(q));

        const matchesFilter =
            filter === "Tutte" ||
            (cmp.macroArea && cmp.macroArea.toLowerCase() === filter.toLowerCase());

        return matchesSearch && matchesFilter;
    });

    return (
        <main className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <div className="space-y-10">

                    <TopNav />

                    {/* HERO */}
                    <section className="text-center space-y-4 mt-10 md:mt-12">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                            Centri di Meccanizzazione Postale (CMP) in Italia
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Consulta e trova tutti i centri postali italiani con dettaglio completo.
                        </p>
                    </section>

                    {/* SEARCH + FILTER */}
                    <section className="flex flex-col md:flex-row gap-4 justify-center">
                        <input
                            type="text"
                            placeholder="Cerca per città, provincia o CMP..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
                        />

                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value as "Tutte" | "Nord" | "Centro" | "Sud")
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                            <option value="Tutte">Tutte</option>
                            <option value="Nord">Nord</option>
                            <option value="Centro">Centro</option>
                            <option value="Sud">Sud</option>
                        </select>
                    </section>

                    {/* GRID */}
                    <section className="grid gap-7 md:grid-cols-2">
                        {filteredList.map((cmp) => {
                            const locParts = [
                                cmp.city ? `${cmp.city}${cmp.province ? ` (${cmp.province})` : ""}` : null,
                                cmp.region,
                                cmp.macroArea
                            ].filter(Boolean);

                            const location = locParts.join(" • ");

                            return (
                                <Link
                                    key={cmp.slug}
                                    href={`/raccomandata/cmp/${cmp.slug}`}
                                    className="block p-6 rounded-xl border border-gray-200 shadow-sm bg-white 
                             hover:shadow-xl hover:-translate-y-1 transition-all duration-200 
                             hover:border-blue-400 bg-gradient-to-br from-white to-blue-50/30"
                                >
                                    {/* TÍTULO + ÍCONO MAIL A LA DERECHA */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {cmp.name}
                                        </h2>

                                        <Mail size={20} className="text-blue-600 opacity-90" />
                                    </div>

                                    {/* UBICACIÓN DEBAJO */}
                                    <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-3">
                                        <MapPin size={16} strokeWidth={2} />
                                        <span>{location || "Località non definita"}</span>
                                    </div>

                                    {/* DESCRIPCIÓN */}
                                    {cmp.description && (
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {cmp.description}
                                        </p>
                                    )}

                                    {/* TAGS */}
                                    {Array.isArray(cmp.services) && cmp.services.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {cmp.services.map((srv) => (
                                                <span
                                                    key={srv}
                                                    className="bg-amber-300/70 text-gray-900 text-xs font-medium px-2 py-1 rounded-md"
                                                >
                                                    {srv}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* FOOTER PREMIUM CTA */}
                                    <div className="flex items-center gap-1 text-blue-600 font-medium text-sm mt-5">
                                        <span>Vedi dettagli</span>
                                        <ArrowRightCircle size={18} strokeWidth={2} />
                                    </div>
                                </Link>
                            );
                        })}
                    </section>
                </div>
            </div>
        </main>
    );
}
