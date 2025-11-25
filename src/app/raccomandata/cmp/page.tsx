// app/raccomandata/cmp/page.tsx
"use client";

import React, { useState } from "react";
import TopNav from "@/components/ui/TopNav";

// -----------------------------------------
// 🔹 Mock de CMPs — luego se conecta a Sanity
// -----------------------------------------
const CMP_LIST = [
    {
        slug: "milano-roserio",
        name: "CMP Milano Roserio",
        city: "Milano",
        province: "MI",
        region: "Lombardia",
        macroArea: "Nord",
        description:
            "Centro di smistamento per raccomandate, lettere e pacchi dell’area di Milano e dintorni.",
        services: ["Raccomandate", "Pacchi", "Notifiche"],
    },
    {
        slug: "fiumicino",
        name: "CMP Fiumicino",
        city: "Fiumicino",
        province: "RM",
        region: "Lazio",
        macroArea: "Centro",
        description:
            "Centro di smistamento postale che serve Roma, provincia e zone limitrofe.",
        services: ["Raccomandate", "Pacchi"],
    },
    {
        slug: "bologna",
        name: "CMP Bologna",
        city: "Bologna",
        province: "BO",
        region: "Emilia-Romagna",
        macroArea: "Nord",
        description:
            "Centro dedicato allo smistamento di invii postali del nord-est.",
        services: ["Raccomandate", "Pacchi", "Notifiche"],
    },
    {
        slug: "bari",
        name: "CMP Bari",
        city: "Bari",
        province: "BA",
        region: "Puglia",
        macroArea: "Sud",
        description:
            "Centro di smistamento per invii diretti al sud Italia e isole.",
        services: ["Raccomandate", "Pacchi"],
    },
];

// -----------------------------------------
// 🔹 Página estática CMP Home
// -----------------------------------------
export default function CmpHomePage() {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Tutte");

    const filteredList = CMP_LIST.filter((cmp) => {
        const matchesSearch =
            cmp.name.toLowerCase().includes(query.toLowerCase()) ||
            cmp.city.toLowerCase().includes(query.toLowerCase()) ||
            cmp.region.toLowerCase().includes(query.toLowerCase());

        const matchesFilter =
            filter === "Tutte" || cmp.macroArea.toLowerCase() === filter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    return (
        <main className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <div className="space-y-10">

                    <TopNav />

                    {/* HERO */}
                    <section className="text-center space-y-3">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                            Centri di Meccanizzazione Postale (CMP) in Italia
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Consulta l’elenco dei principali CMP, scopri dove si trovano e
                            come influiscono sui tempi di consegna delle raccomandate.
                        </p>
                        <p className="inline-flex text-xs font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                            Raccomandate · Pacchi · Notifiche ufficiali
                        </p>
                    </section>

                    {/* SEARCH + FILTERS */}
                    <section className="flex flex-col md:flex-row gap-4 justify-center">
                        <input
                            type="text"
                            placeholder="Cerca per città, provincia o CMP (es. Milano, Roserio, Bologna...)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
                        />

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                            <option value="Tutte">Tutte</option>
                            <option value="Nord">Nord</option>
                            <option value="Centro">Centro</option>
                            <option value="Sud">Sud</option>
                        </select>
                    </section>

                    {/* GRID DE CMPs */}
                    <section className="grid gap-6 md:grid-cols-2">
                        {filteredList.map((cmp) => (
                            <a
                                key={cmp.slug}
                                href={`/raccomandata/cmp/${cmp.slug}`}
                                className="block rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {cmp.name}
                                </h2>

                                <p className="text-sm text-gray-600 mt-1">
                                    {cmp.city} ({cmp.province}) — {cmp.region} · {cmp.macroArea}
                                </p>

                                <p className="text-sm text-gray-700 mt-3">{cmp.description}</p>

                                <div className="flex gap-2 mt-4">
                                    {cmp.services.map((srv) => (
                                        <span
                                            key={srv}
                                            className="bg-yellow-300/70 text-gray-900 text-xs font-medium px-2 py-1 rounded-md"
                                        >
                                            {srv}
                                        </span>
                                    ))}
                                </div>

                                <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                    Vedi dettagli
                                </button>
                            </a>
                        ))}
                    </section>

                    {/* INFO: Come funziona un CMP */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Come funziona un CMP?
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>
                                Smistamento automatico tramite macchinari di lettura ottica.
                            </li>
                            <li>
                                Controllo dei codici a barre e instradamento verso il centro di
                                recapito.
                            </li>
                            <li>
                                Gestione manuale in caso di anomalie o invii non leggibili.
                            </li>
                            <li>
                                Transito obbligatorio per raccomandate, pacchi e notifiche
                                ufficiali.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
