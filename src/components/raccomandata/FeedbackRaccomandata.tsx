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
  /** Precompila il codice sulla pagina di dettaglio */
  defaultCode?: string;
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
  defaultCode = "",
}) => {
  const [nome, setNome] = useState("");
  const [citta, setCitta] = useState("");
  const [codice, setCodice] = useState(() => defaultCode.trim());
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

      setSuccessMsg("Grazie! Il tuo feedback sarà visibile dopo la nostra approvazione.");

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
    <section className="rac-section space-y-6">
      {/* FEEDBACK ALTRI UTENTI */}
      <div className="rac-panel">
        <h2 className="rac-section-h2">Feedback di altri utenti</h2>
        <p className="rac-body mt-1">
          Segnalazioni pubblicate dopo moderazione. Sono esperienze personali: usale come
          indicazione, non come prova ufficiale del contenuto della raccomandata.
        </p>

        {feedback.length === 0 ? (
          <p className="rac-body mt-4 text-gray-500">
            Non ci sono ancora feedback pubblici per questo codice.
          </p>
        ) : (
          <div className="space-y-3">
            {feedback.map((item) => {
              const categoriaLabel = CATEGORY_LABELS[item.categoria] ?? item.categoria;

              return (
                <article
                  key={item._id}
                  className="relative flex items-start justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:border-[#2F66D5]/40 hover:shadow-md hover:-translate-y-px"
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
                    <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-sans text-base font-semibold text-gray-900">
                          {item.nome}
                        </span>

                        {item.citta && (
                          <span className="rac-body-sm inline-flex items-center gap-1 text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {item.citta}
                          </span>
                        )}
                      </div>

                      {categoriaLabel && (
                        <div className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-0.5 font-sans text-xs font-medium text-gray-700">
                          {categoriaLabel}
                        </div>
                      )}

                      <p className="rac-body mt-2 text-gray-700">{item.commento}</p>
                    </div>
                  </div>

                  {item.createdAt && (
                    <p className="rac-body-sm ml-3 shrink-0 text-gray-400">
                      Inviato il {new Date(item.createdAt).toLocaleDateString("it-IT")}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* FORM */}
      <div className="rac-panel">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="rac-subsection-h3">Condividi la tua esperienza</h3>
            <p className="rac-body mt-1">
              Racconta cosa hai trovato nella tua raccomandata.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen((prev) => !prev)}
            className={`rac-btn-ghost shrink-0 ${!isFormOpen ? "animate-[pulseLight_2.5s_ease-in-out_infinite]" : ""}`}
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
                <label className="rac-form-label">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="rac-form-control"
                />
              </div>

              <div>
                <label className="rac-form-label">Città</label>
                <input
                  type="text"
                  value={citta}
                  onChange={(e) => setCitta(e.target.value)}
                  className="rac-form-control"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="rac-form-label">Codice raccomandata</label>
                <input
                  type="text"
                  value={codice}
                  onChange={(e) => setCodice(e.target.value)}
                  className="rac-form-control"
                />
              </div>

              <div>
                <label className="rac-form-label">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="rac-form-control"
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
              <label className="rac-form-label">Commento</label>
              <textarea
                value={commento}
                onChange={(e) => setCommento(e.target.value)}
                rows={4}
                className="rac-form-control min-h-[7rem]"
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

            <p className="rac-body-sm text-gray-500">
              Il tuo feedback sarà visibile dopo approvazione.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rac-btn-primary w-full md:w-auto"
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
