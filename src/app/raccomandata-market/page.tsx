// app/raccomandata-market/page.tsx
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_LIST } from "sanity/lib/queries/raccomandataList";
import { RACCOMANDATA_MARKET_PAGE } from "sanity/lib/queries/raccomandataMarketPage";
import TopNav from "@/components/ui/TopNav";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import TrendMiniChart from "@/components/raccomandata/TrendMiniChart";
import RaccomandataMarketInfoCard from "@/components/home/RaccomandataMarketInfoCard";
import PortableTextRenderer from "@/components/shared/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";
import RaccomandataVsAttiTable from "@/components/raccomandata/RaccomandataVsAttiTable";

// -------------------
// 🔹 Tipi
// -------------------
type Urgency = "ALTA" | "MEDIA" | "BASSA" | "RITIRATA" | undefined;

interface RaccomandataItem {
    _id: string;
    code: string;
    mittente?: string;
    priority?: Urgency;
    stato?: string;
    href: string;
}

type RaccomandataMarketFaq = {
    question: string;
    answer: PortableTextBlock[];
};

type ComparisonRow = {
    feature: string;
    raccomandataMarket: string;
    attiGiudiziari: string;
};

type RaccomandataMarketPageData = {
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    slug?: { current: string };
    mainContent?: PortableTextBlock[];
    alertBox?: string;
    comparison?: PortableTextBlock[];
    faqs?: RaccomandataMarketFaq[];
    comparisonRows?: ComparisonRow[]; // 👈 nuevo
};

export const revalidate = 60;

// -------------------
// 🔹 Metadata SEO dinamic
// -------------------
export async function generateMetadata(): Promise<Metadata> {
    const data = await sanityClient.fetch<RaccomandataMarketPageData>(
        RACCOMANDATA_MARKET_PAGE
    );

    const baseUrl = "https://arauze.com";
    const path = data?.slug?.current ?? "raccomandata-market";
    const canonical = `${baseUrl}/${path}`;

    return {
        title:
            data?.metaTitle ??
            "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
        description:
            data?.metaDescription ??
            "Consulta l’elenco aggiornato delle raccomandate analizzate da Arauze.",
        alternates: {
            canonical,
        },
        openGraph: {
            type: "website",
            title:
                data?.metaTitle ??
                "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
            description:
                data?.metaDescription ??
                "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
            url: canonical,
            siteName: "Arauze",
        },
        twitter: {
            card: "summary",
            title:
                data?.metaTitle ??
                "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
            description:
                data?.metaDescription ??
                "Consulta l’elenco aggiornato delle raccomandate analizzate da Arauze.",
        },
        robots: { index: true, follow: true },
    };
}

// -------------------
// 🔹 Pagina principale
// -------------------
export default async function RaccomandataMarketPage() {
    const [items, pageData] = await Promise.all([
        sanityClient.fetch<RaccomandataItem[]>(RACCOMANDATA_LIST),
        sanityClient.fetch<RaccomandataMarketPageData>(RACCOMANDATA_MARKET_PAGE),
    ]);

    const ORDER: Record<Exclude<Urgency, undefined>, number> = {
        ALTA: 1,
        MEDIA: 2,
        BASSA: 3,
        RITIRATA: 4,
    };

    const sorted = [...items].sort((a, b) => {
        const pa = a.priority ?? "RITIRATA";
        const pb = b.priority ?? "RITIRATA";
        return ORDER[pa] - ORDER[pb];
    });

    return (
        <div className="mx-auto max-w-5xl px-4" role="main" aria-label="Elenco Raccomandata Market">
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <TopNav />
                <h1 className="text-2xl font-semibold mb-6 mt-10">
                    Raccomandata Market 2026
                </h1>

                {/* ⭐ FIX SCROLL MOBILE */}
                <div className="overflow-x-auto overflow-y-hidden rounded-xl border border-gray-200">
                    <table className="min-w-[720px] w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Codice
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Mittente
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Urgenza
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Tendenza
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide">
                                    Dettaglio
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {sorted.map((it) => (
                                <tr key={it._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-semibold text-base leading-tight">
                                        #{it.code}
                                    </td>

                                    <td className="px-4 py-3">{it.mittente || "—"}</td>

                                    <td className="px-4 py-3">
                                        {it.priority ? (
                                            <PriorityIndicator level={it.priority} />
                                        ) : (
                                            <span className="text-gray-500">—</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        <TrendMiniChart code={it.code} />
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={it.href}
                                            className="inline-flex items-center gap-1.5 text-[#2F66D5] hover:text-[#2552AD] transition group"
                                        >
                                            <span className="text-sm font-medium">Dettaglio</span>
                                            <ArrowRight
                                                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                                strokeWidth={2.2}
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tablle */}
                {pageData?.comparisonRows && pageData.comparisonRows.length > 0 && (
                    <RaccomandataVsAttiTable rows={pageData.comparisonRows} />
                )}
                {/* Card informativa */}
                <RaccomandataMarketInfoCard />

                {/* 🔹 Contenuto da Sanity */}
                {pageData?.mainContent && (
                    <section className="mt-10 space-y-4">
                        <PortableTextRenderer value={pageData.mainContent} />
                    </section>
                )}

                {/* 🔹 Alertbox */}
                {pageData?.alertBox && (
                    <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm md:text-base">
                        <p className="font-medium text-amber-800">⚠️ Attenzione</p>
                        <p className="mt-1 text-amber-900">{pageData.alertBox}</p>
                    </section>
                )}

                {/* 🔹 Comparazione */}
                {pageData?.comparison && (
                    <section className="mt-8">
                        <PortableTextRenderer value={pageData.comparison} />
                    </section>
                )}

                {/* 🔹 FAQ */}
                {pageData?.faqs && pageData.faqs.length > 0 && (
                    <section className="mt-10">
                        <h2 className="mb-4 text-xl font-semibold text-slate-900 md:text-2xl">
                            Domande frequenti sulla Raccomandata Market
                        </h2>
                        <div className="space-y-4">
                            {pageData.faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-slate-100 pb-4 last:border-b-0">
                                    <h3 className="text-sm font-semibold text-slate-900 md:text-base">
                                        {faq.question}
                                    </h3>
                                    <div className="mt-1 text-sm text-slate-700 md:text-base">
                                        <PortableTextRenderer value={faq.answer} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* JSON-LD */}
            <Script
                id="raccomandata-market-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: sorted.map((it, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `https://arauze.com${it.href}`,
                            name: `Raccomandata ${it.code}`,
                        })),
                    }),
                }}
            />
        </div>
    );
}

// -------------------
// 🔹 Indicatore Urgenza
// -------------------
function PriorityIndicator({ level }: { level: Exclude<Urgency, undefined> }) {
    const PRIORITY_STYLES: Record<
        Exclude<Urgency, undefined>,
        { ping: string; dot: string; label: string }
    > = {
        ALTA: {
            ping: "bg-rose-500",
            dot: "bg-rose-600",
            label: "Urgenza Alta",
        },
        MEDIA: {
            ping: "bg-orange-500",
            dot: "bg-orange-600",
            label: "Urgenza Media",
        },
        BASSA: {
            ping: "bg-emerald-500",
            dot: "bg-emerald-600",
            label: "Urgenza Bassa",
        },
        RITIRATA: {
            ping: "bg-gray-400",
            dot: "bg-gray-500",
            label: "Ritirata",
        },
    };

    const styles = PRIORITY_STYLES[level];

    return (
        <div className="flex items-center gap-2">
            <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
                <span
                    className={`absolute inline-flex h-3.5 w-3.5 rounded-full opacity-60 animate-ping ${styles.ping}`}
                />
                <span
                    className={`relative inline-flex h-3.5 w-3.5 rounded-full ${styles.dot}`}
                />
            </span>
            <span className="text-sm font-medium">{styles.label}</span>
        </div>
    );
}
