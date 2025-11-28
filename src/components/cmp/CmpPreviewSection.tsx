import Link from "next/link";
import type { CmpItem } from "@/components/cmp/types";

interface CmpPreviewSectionProps {
    items: CmpItem[];
    title?: string;
    subtitle?: string;
    maxItems?: number;
    viewAllHref?: string;
}

// Helper para obtener el slug sin romper el tipo
function getCmpSlug(item: CmpItem): string | null {
    const data = item as unknown as {
        slug?: { current?: string } | string;
    };

    if (typeof data.slug === "string") return data.slug;
    if (data.slug?.current) return data.slug.current;

    return null;
}

export default function CmpPreviewSection({
    items,
    title = "Centri CMP principali",
    subtitle = "Consulta rapidamente i CMP più ricercati, poi esplora l'elenco completo.",
    maxItems = 6,
    viewAllHref = "/raccomandata/cmp",
}: CmpPreviewSectionProps) {
    const visibleItems = items.slice(0, maxItems);

    if (!visibleItems.length) return null;

    return (
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-600 md:text-base">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Botón "ver todos" también arriba (opcional) */}
                <div className="hidden md:block">
                    <Link
                        href={viewAllHref}
                        className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-900 hover:text-white"
                    >
                        Vedi tutti i CMP
                    </Link>
                </div>
            </div>

            {/* Grid de tarjetas */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((item, index) => {
                    const slug = getCmpSlug(item);
                    const name = (item as unknown as { name?: string }).name ?? "CMP";

                    const region =
                        (item as unknown as { region?: string }).region ?? "";
                    const province =
                        (item as unknown as { province?: string }).province ?? "";

                    const hasLocation = region || province;

                    // ✅ Key sin usar _id
                    const baseKey = slug || name || String(index);

                    const cardContent = (
                        <article
                            className="
                                group flex h-full flex-col justify-between rounded-2xl
                                border border-slate-100 bg-white/80 p-5
                                shadow-[0_12px_30px_rgba(15,23,42,0.10)]
                                transition hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]
                            "
                        >
                            <div>
                                <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 md:text-lg">
                                    {name}
                                </h3>

                                {hasLocation && (
                                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                                        {[province, region].filter(Boolean).join(" • ")}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                    Raccomandate, atti giudiziari e avvisi
                                </span>
                                <span
                                    className="
                                        inline-flex items-center text-sm font-medium
                                        text-sky-700 group-hover:text-sky-800
                                    "
                                >
                                    Dettagli
                                    <span className="ml-1 transition group-hover:translate-x-0.5">
                                        →
                                    </span>
                                </span>
                            </div>
                        </article>
                    );

                    if (slug) {
                        return (
                            <Link
                                key={baseKey}
                                href={`/raccomandata/cmp/${slug}`}
                                className="block h-full"
                            >
                                {cardContent}
                            </Link>
                        );
                    }

                    return (
                        <div key={baseKey} className="h-full">
                            {cardContent}
                        </div>
                    );
                })}
            </div>

            {/* Botón "ver todos" abajo (visible en mobile) */}
            <div className="mt-8 flex justify-center md:hidden">
                <Link
                    href={viewAllHref}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-808"
                >
                    Vedi tutti i CMP
                </Link>
            </div>
        </section>
    );
}
