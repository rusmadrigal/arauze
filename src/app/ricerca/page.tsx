import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Search, MailSearch, Info, FolderSearch } from "lucide-react";

/** Resultado que devuelve /api/search */
type RaccomandataResult = {
    code: string;
    mittente?: string;
    heroTitleSuffix?: string;
    tipologia?: string;
    stato?: string;
};

type ApiRedirect = {
    ok: true;
    action: "redirect";
    href: string;
    match?: RaccomandataResult;
};

type ApiMultiple = {
    ok: true;
    action: "multiple";
    results: RaccomandataResult[];
};

type ApiNone = {
    ok: true;
    action: "none";
    results: RaccomandataResult[];
};

type ApiError = {
    ok: false;
    error: string;
};

type ApiResponse = ApiRedirect | ApiMultiple | ApiNone | ApiError;

export default function RicercaPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const q = (searchParams.q || "").trim();

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {q
                        ? <>Risultati per “{q}”</>
                        : <>Cerca una <span className="text-[#2552AD]">Raccomandata</span></>}
                </h1>
                <p className="mt-1 text-slate-600">
                    Cerca per codice (es. <span className="font-medium">697</span>) o per mittente /
                    descrizione (es. <span className="font-medium">Agenzia delle Entrate</span>).
                </p>
                <form method="GET" className="mt-4 relative">
                    <input
                        aria-label="Termine di ricerca"
                        defaultValue={q}
                        name="q"
                        placeholder="Inserisci il codice o testo…"
                        className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-10 pr-28 text-slate-700 placeholder-slate-400 outline-none shadow-sm transition focus:shadow-[0_0_0_5px_rgba(63,123,250,0.12)] focus:border-brand-300"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-lg bg-gradient-to-r from-[#2F66D5] to-[#2552AD] text-white font-semibold shadow hover:opacity-95 active:scale-95"
                    >
                        Cerca
                    </button>
                </form>
            </header>

            <Suspense fallback={<SkeletonList />}>
                <Results q={q} />
            </Suspense>
        </main>
    );
}

/** Lista de resultados — Server Component */
async function Results({ q }: { q: string }) {
    if (!q) return <EmptyState label="Inserisci un termine di ricerca." />;

    // 🔹 Atajo: si es un código 3–6 dígitos, redirigimos directo como en el home
    if (/^\d{3,6}$/.test(q)) {
        redirect(`/raccomandata/${q}`);
    }

    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
    let data: ApiResponse | null = null;

    try {
        const res = await fetch(`${base}/api/search?q=${encodeURIComponent(q)}`, {
            cache: "no-store",
        });
        data = (await res.json()) as ApiResponse;
    } catch {
        return <ErrorState message="Errore di rete." />;
    }

    if (!data?.ok) {
        return (
            <ErrorState
                message={
                    "Si è verificato un errore. " +
                    (data && "error" in data ? data.error : "")
                }
            />
        );
    }

    // 🔹 Coincidencia única → redirección inmediata del lado del servidor
    if (data.action === "redirect" && "href" in data && data.href) {
        redirect(data.href);
    }

    const results =
        data.action === "multiple" || data.action === "none"
            ? (data as ApiMultiple | ApiNone).results
            : [];

    if (!results.length) {
        return (
            <EmptyState
                label="Nessun risultato."
                hint='Prova con un codice a 3–6 cifre (es. "697") o il mittente (es. "Agenzia delle Entrate").'
            />
        );
    }

    return (
        <section>
            <div className="mb-3 text-sm text-slate-600">
                {results.length} risultato{results.length > 1 ? "i" : ""} trovati
            </div>
            <ul className="grid gap-3">
                {results.map((r) => (
                    <ResultCard key={r.code} r={r} q={q} />
                ))}
            </ul>
        </section>
    );
}

/** Tarjeta de resultado */
function ResultCard({ r, q }: { r: RaccomandataResult; q: string }) {
    const secondary =
        r.mittente ?? r.tipologia ?? r.stato ?? r.heroTitleSuffix ?? "";

    return (
        <li className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow transition">
            <div className="flex items-start gap-3">
                <FolderSearch className="size-6 shrink-0 text-[#2552AD]" />
                <div className="min-w-0 flex-1">
                    <a
                        href={`/raccomandata/${r.code}`}
                        className="block text-lg font-semibold text-[#2552AD] hover:underline truncate"
                    >
                        Raccomandata {highlight(` ${r.code} `, q)}
                    </a>
                    {secondary && (
                        <div className="mt-1 text-sm text-slate-600 line-clamp-2">
                            {highlight(secondary, q)}
                        </div>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {r.mittente && <Badge label={r.mittente} />}
                        {r.tipologia && <Badge label={r.tipologia} />}
                        {r.stato && <Badge label={r.stato} />}
                    </div>
                </div>
            </div>
        </li>
    );
}

/** Badge simple */
function Badge({ label }: { label: string }) {
    return (
        <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
            {label}
        </span>
    );
}

/** Skeleton mientras carga */
function SkeletonList() {
    return (
        <ul className="grid gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
                <li
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                    <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-md bg-slate-200" />
                        <div className="flex-1 space-y-2">
                            <div className="h-5 w-2/3 rounded bg-slate-200" />
                            <div className="h-4 w-5/6 rounded bg-slate-200" />
                            <div className="mt-3 flex gap-2">
                                <div className="h-6 w-20 rounded-full bg-slate-200" />
                                <div className="h-6 w-24 rounded-full bg-slate-200" />
                                <div className="h-6 w-16 rounded-full bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

/** Estado vacío con hint */
function EmptyState({ label, hint }: { label: string; hint?: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Info className="mx-auto size-8 text-slate-400" />
            <p className="mt-2 text-slate-700">{label}</p>
            {hint && <p className="mt-1 text-slate-500 text-sm">{hint}</p>}
        </div>
    );
}

/** Estado de error */
function ErrorState({ message }: { message: string }) {
    return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
            <p className="font-medium text-rose-700">Errore</p>
            <p className="text-rose-700/80 mt-1">{message}</p>
        </div>
    );
}

/** Highlight de términos (case-insensitive, multi-palabra) */
function highlight(text: string, q: string) {
    if (!q || !text) return text;

    const tokens = tokenize(q);
    if (!tokens.length) return text;

    const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
    const parts = text.split(pattern);

    return parts.map((part, i) => {
        if (pattern.test(part)) {
            return (
                <mark
                    key={i}
                    className="rounded bg-yellow-100 px-0.5 py-0.5 text-slate-900"
                >
                    {part}
                </mark>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

function tokenize(s: string): string[] {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .split(/\s+/)
        .filter((t) => t && t.length >= 2);
}

function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
