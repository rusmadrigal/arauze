// app/raccomandata/cmp/[page]/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopNav from "@/components/ui/TopNav";

// ------------------------------------
// 🔹 Datos estáticos de ejemplo (mock)
//    Luego esto se reemplaza por Sanity
// ------------------------------------
const CMP_PAGES = {
    "milano-roserio": {
        slug: "milano-roserio",
        name: "CMP Milano Roserio",
        subtitle: "Informazioni, tempi di consegna e significato",
        typeLabel: "Centro di Meccanizzazione Postale (CMP)",
        addressTitle: "Indirizzo",
        address: "Via Cristina Belgioioso, 165\n20157 Milano MI",
        mapAlt: "Mappa del CMP Milano Roserio",
        // Cuando tengas el asset real, solo apuntas aquí
        mapImage: "/images/cmp/milano-roserio.webp",
        meaningTitle: "Significato del CMP",
        meaningBody: [
            "Il CMP (Centro di Meccanizzazione Postale) è un centro logistico dove raccomandate, lettere e altri invii vengono smistati e processati prima di essere inoltrati al centro di recapito locale.",
            "Vedere la dicitura “In lavorazione presso CMP Milano Roserio” nel tracciamento è del tutto normale e indica che l’invio è in fase di smistamento."
        ],
        deliveryTitle: "Tempi di consegna dopo il CMP",
        deliveryBody: [
            "In condizioni normali, dopo l’uscita dal CMP la consegna avviene di solito entro 24–48 ore.",
            "In periodi di picco (festività, saldi, scioperi) i tempi possono allungarsi fino a 72–96 ore."
        ],
        whatHappensTitle: "Cosa succede nel CMP",
        whatHappensList: [
            "Smistamento automatico tramite macchinari di lettura ottica.",
            "Controllo dei codici a barre e dei dati di tracciamento.",
            "Instradamento verso il centro di recapito competente.",
            "Eventuale gestione manuale per invii con anomalie."
        ],
        commonIssuesTitle: "Problemi comuni",
        commonIssuesList: [
            "Ritardi dovuti a picchi di volume o festività.",
            "Scansione mancante: il tracciamento può non aggiornarsi in tempo reale.",
            "Errori di instradamento (l’invio viene rimandato al CMP).",
            "Condizioni meteo o scioperi che rallentano il flusso."
        ],
        statusTableTitle: "Stato tipico nel tracciamento",
        statusRows: [
            {
                status: "In lavorazione presso CMP",
                meaning: "L’invio è in fase di smistamento, situazione normale."
            },
            {
                status: "Uscito dal CMP",
                meaning: "L’invio è stato instradato verso il centro di recapito."
            },
            {
                status: "Non recapitato / Riconsegna",
                meaning: "È stato rilevato un problema, l’invio potrebbe tornare indietro."
            }
        ],
        faqTitle: "Domande frequenti sul CMP",
        faqItems: [
            {
                q: "Perché la mia raccomandata è al CMP?",
                a: "Perché tutti gli invii passano da un centro di smistamento prima di essere inoltrati al centro di recapito della tua zona."
            },
            {
                q: "Quanto rimane la raccomandata al CMP?",
                a: "In genere da poche ore a 1–2 giorni lavorativi, salvo picchi di volume o problemi specifici."
            },
            {
                q: "È normale vedere più scansioni dallo stesso CMP?",
                a: "Sì, perché l’invio può essere lavorato in più fasi o sottoposto a controlli aggiuntivi."
            },
            {
                q: "Il CMP può causare un ritardo nella consegna?",
                a: "Può incidere sui tempi se ci sono sovraccarichi, festività o anomalie, ma il passaggio dal CMP è una fase standard del processo."
            }
        ]
    }
} as const;

type CmpSlug = keyof typeof CMP_PAGES;

// ------------------------------------
// 🔹 Metadata
// ------------------------------------
type PageParams = {
    page?: string;
};

export async function generateMetadata(
    props: { params: Promise<PageParams> }
): Promise<Metadata> {
    const { page } = await props.params;
    const slug = (page ?? "").toLowerCase() as CmpSlug;

    const cmp = CMP_PAGES[slug];

    if (!cmp) {
        return {
            title: "CMP – Informazioni centro di smistamento",
            description: "Scheda informativa del centro di meccanizzazione postale."
        };
    }

    return {
        title: `${cmp.name} – ${cmp.subtitle}`,
        description:
            "Scheda informativa del centro di meccanizzazione postale: significato, tempi di consegna e stato nel tracciamento.",
        alternates: {
            canonical: `/raccomandata/cmp/${cmp.slug}`
        }
    };
}

// ------------------------------------
// 🔹 Pagina CMP statica
// ------------------------------------
export default async function CmpPage({
    params
}: {
    params: Promise<PageParams>;
}) {
    const { page } = await params;
    const slug = (page ?? "").toLowerCase() as CmpSlug;

    const cmp = CMP_PAGES[slug];

    if (!cmp) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <div className="space-y-8 md:space-y-10">
                    {/* Top navigation, igual que en Raccomandata */}
                    <TopNav />

                    {/* Hero */}
                    <section className="space-y-3 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                            {cmp.name}
                        </h1>
                        <p className="text-lg text-gray-600">{cmp.subtitle}</p>
                        <p className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 mt-2">
                            {cmp.typeLabel}
                        </p>
                    </section>

                    {/* Mappa + Significato */}
                    <section className="grid gap-6 md:grid-cols-2">
                        {/* Mappa / Indirizzo */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                            <div className="border-b border-gray-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                {cmp.typeLabel}
                            </div>
                            <div className="aspect-[4/3] w-full bg-gray-200">
                                {/* Imagen estática del mapa */}
                                <img
                                    src={cmp.mapImage}
                                    alt={cmp.mapAlt}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="px-4 py-3">
                                <h2 className="text-sm font-semibold text-gray-800">
                                    {cmp.addressTitle}
                                </h2>
                                <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
                                    {cmp.address}
                                </p>
                            </div>
                        </div>

                        {/* Significato */}
                        <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                            <h2 className="text-base font-semibold text-gray-900">
                                {cmp.meaningTitle}
                            </h2>
                            <div className="mt-3 space-y-3 text-sm text-gray-700 leading-relaxed">
                                {cmp.meaningBody.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Tempi di consegna */}
                    <section className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-900">
                            {cmp.deliveryTitle}
                        </h2>
                        <div className="mt-2 space-y-2 text-sm text-gray-700 leading-relaxed">
                            {cmp.deliveryBody.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </section>

                    {/* Cosa succede / Problemi comuni */}
                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                            <h2 className="text-base font-semibold text-gray-900">
                                {cmp.whatHappensTitle}
                            </h2>
                            <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                {cmp.whatHappensList.map((item, idx) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                            <h2 className="text-base font-semibold text-gray-900">
                                {cmp.commonIssuesTitle}
                            </h2>
                            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
                                {cmp.commonIssuesList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Tabella stati tipici */}
                    <section className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-900">
                            {cmp.statusTableTitle}
                        </h2>
                        <div className="mt-3 overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2 pr-4 font-semibold">Stato</th>
                                        <th className="py-2 font-semibold">Significato</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cmp.statusRows.map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 last:border-0">
                                            <td className="py-2 pr-4 align-top">{row.status}</td>
                                            <td className="py-2 align-top">{row.meaning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ simple (sin acordeón de momento) */}
                    <section className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-900">
                            {cmp.faqTitle}
                        </h2>
                        <div className="mt-3 space-y-4">
                            {cmp.faqItems.map((item, idx) => (
                                <div key={idx}>
                                    <p className="text-sm font-medium text-gray-800">{item.q}</p>
                                    <p className="mt-1 text-sm text-gray-700">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
