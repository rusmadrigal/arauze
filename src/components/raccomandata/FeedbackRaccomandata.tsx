"use client";

import React, { useState } from "react";
import { MessageCircle, MapPin } from "lucide-react";

type FeedbackItem = {
    _id: string;
    nome: string;
    citta: string;
    codice: string;
    categoria: string;
    commento: string;
    createdAt?: string;
};

interface FeedbackRaccomandataProps {
    feedback?: FeedbackItem[];
}

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

const CATEGORIES = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
}));

const FeedbackRaccomandata: React.FC<FeedbackRaccomandataProps> = ({
    feedback = [],
}) => {
    const [nome, setNome] = useState("");
    const [citta, setCitta] = useState("");
    const [codice, setCodice] = useState("");
    const [categoria, setCategoria] = useState("");
    const [commento, setCommento] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [honeypot, setHoneypot] = useState("");
    const [formLoadedAt] = useState(() => Date.now());

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);

        const now = Date.now();

        if (honeypot) return;

        if (now - formLoadedAt < 4000) {
            setErrorMsg("Per favore riprova tra qualche secondo.");
            return;
        }

        if (!nome || !citta || !codice || !categoria || !commento) {
            setErrorMsg("Per favore compila tutti i campi.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    citta,
                    codice,
                    categoria,
                    commento,
                    submittedAt: now,
                    honeypot,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                const msg = data?.message ?? "Errore durante l’invio.";
                throw new Error(msg);
            }

            setSuccessMsg(
                "Grazie! Il tuo feedback sarà visibile dopo la nostra approvazione."
            );

            setNome("");
            setCitta("");
            setCodice("");
            setCategoria("");
            setCommento("");
            setHoneypot("");
        } catch (err) {
            if (err instanceof Error) {
                setErrorMsg(err.message);
            } else {
                setErrorMsg("Errore imprevisto.");
            }
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <section className="mt-10 space-y-6">
            {/* FEEDBACK ALTRI UTENTI */}
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900 md:text-xl">
                    Feedback di altri utenti
                </h2>

                {feedback.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        Non ci sono ancora feedback pubblici per questo codice.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {feedback.map((item) => {
                            const categoriaLabel =
                                CATEGORY_LABELS[item.categoria] ?? item.categoria;

                            return (
                                <article
                                    key={item._id}
                                    className="
                                        relative
                                        flex items-start justify-between
                                        rounded-2xl border border-slate-200 bg-white
                                        px-4 py-3 shadow-sm
                                        transition-all duration-200
                                        hover:border-blue-300 hover:shadow-md hover:-translate-y-[1px]
                                    "
                                >
                                    {/* Borde animado premium */}
                                    <span
                                        className="
                                            pointer-events-none absolute inset-0 rounded-2xl
                                            border-2 border-blue-500 opacity-0
                                            transition-opacity duration-200
                                            hover:opacity-20
                                        "
                                    ></span>

                                    <div className="flex flex-1 items-start gap-3">
                                        <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                            <MessageCircle className="h-4 w-4" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-sm font-semibold text-slate-900">
                                                    {item.nome}
                                                </span>

                                                {item.citta && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                                        <MapPin className="h-3 w-3" />
                                                        {item.citta}
                                                    </span>
                                                )}
                                            </div>

                                            {categoriaLabel && (
                                                <div className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                                                    {categoriaLabel}
                                                </div>
                                            )}

                                            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                                {item.commento}
                                            </p>
                                        </div>
                                    </div>

                                    {item.createdAt && (
                                        <p className="ml-3 shrink-0 text-xs text-slate-400">
                                            Inviato il{" "}
                                            {new Date(item.createdAt).toLocaleDateString("it-IT")}
                                        </p>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* FORM */}
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                            Condividi la tua esperienza
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Racconta cosa hai trovato nella tua raccomandata.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsFormOpen((prev) => !prev)}
                        className={`
        inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 
        px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition 
        hover:bg-slate-100
        ${!isFormOpen ? "animate-[pulseLight_2.5s_ease-in-out_infinite]" : ""}
    `}
                    >
                        <MessageCircle className="h-4 w-4" />
                        {isFormOpen ? "Nascondi modulo" : "Lascia un feedback"}
                    </button>
                </div>

                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                        <input
                            type="text"
                            name="website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            className="hidden"
                        />

                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Città
                                </label>
                                <input
                                    type="text"
                                    value={citta}
                                    onChange={(e) => setCitta(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Codice raccomandata
                                </label>
                                <input
                                    type="text"
                                    value={codice}
                                    onChange={(e) => setCodice(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Categoria
                                </label>
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="">Seleziona...</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Commento
                            </label>
                            <textarea
                                value={commento}
                                onChange={(e) => setCommento(e.target.value)}
                                rows={4}
                                className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        {errorMsg && (
                            <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                {errorMsg}
                            </p>
                        )}

                        {successMsg && (
                            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                {successMsg}
                            </p>
                        )}

                        <p className="text-xs text-slate-500">
                            Il tuo feedback sarà visibile dopo approvazione.
                        </p>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Invio..." : "Invia feedback"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default FeedbackRaccomandata;
