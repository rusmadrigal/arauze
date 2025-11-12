import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_LIST } from "sanity/lib/queries/raccomandataList";
import TopNav from "@/components/ui/TopNav";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import TrendMiniChart from "@/components/raccomandata/TrendMiniChart";


// -------------------
// 🔹 Tipos
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

export const revalidate = 60;

// -------------------
// 🔹 Metadata SEO
// -------------------
export const metadata: Metadata = {
    title: "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
    description:
        "Consulta l’elenco aggiornato delle raccomandate analizzate da Arauze. Scopri mittente, urgenza e stato di ciascuna comunicazione.",
    alternates: { canonical: "https://arauze.com/raccomandata-market" },
    openGraph: {
        type: "website",
        title: "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
        description:
            "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
        url: "https://arauze.com/raccomandata-market",
        siteName: "Arauze",
    },
    twitter: {
        card: "summary",
        title: "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
        description:
            "Consulta l’elenco aggiornato delle raccomandate analizzate da Arauze.",
    },
    robots: { index: true, follow: true },
};

// -------------------
// 🔹 Página principal
// -------------------
export default async function RaccomandataMarketPage() {
    const items: RaccomandataItem[] = await sanityClient.fetch(RACCOMANDATA_LIST);

    return (
        <main className="mx-auto max-w-5xl px-4" role="main">
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <TopNav />

                <h1 className="text-2xl font-semibold mb-6">
                    Raccomandata Market — Ultime Analizzate
                </h1>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
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
                            {items.map((it) => (
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
            </div>

            {/* JSON-LD tipo ItemList para SEO */}
            <Script
                id="raccomandata-market-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        name: "Raccomandata Market",
                        description:
                            "Elenco completo delle raccomandate analizzate da Arauze.",
                        itemListElement: items.map((it: RaccomandataItem, i: number) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `https://arauze.com${it.href}`,
                            name: `Raccomandata ${it.code}`,
                        })),
                    }),
                }}
            />
        </main>
    );
}

// -------------------
// 🔹 Indicador visual de Urgenza
// -------------------
function PriorityIndicator({ level }: { level: Exclude<Urgency, undefined> }) {
    const PRIORITY_STYLES: Record<
        Exclude<Urgency, undefined>,
        { ping: string; dot: string; label: string }
    > = {
        ALTA: { ping: "bg-rose-500", dot: "bg-rose-600", label: "Urgenza Alta" },
        MEDIA: { ping: "bg-orange-500", dot: "bg-orange-600", label: "Urgenza Media" },
        BASSA: { ping: "bg-emerald-500", dot: "bg-emerald-600", label: "Urgenza Bassa" },
        RITIRATA: { ping: "bg-gray-400", dot: "bg-gray-500", label: "Ritirata" },
    };

    const styles = PRIORITY_STYLES[level];
    return (
        <div className="flex items-center gap-2">
            <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
                <span
                    className={`absolute inline-flex h-3.5 w-3.5 rounded-full opacity-60 animate-ping ${styles.ping}`}
                />
                <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${styles.dot}`} />
            </span>
            <span className="text-sm font-medium">{styles.label}</span>
        </div>
    );
}

/* 
💡 Nota: el efecto “latente” (animación ping) ya está incluido en Tailwind por defecto.
Si no ves el pulso, asegurate de que en tu Tailwind config no se haya eliminado la clase "animate-ping".
*/
