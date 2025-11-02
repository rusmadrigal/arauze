"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import ReportAvvisoModal from "@/components/raccomandata/ReportAvvisoModal";

// Tipos de respuesta del endpoint
type OfficialFound = {
  ok: true;
  found: true;
  code: string;
  mittente: string;
  tipologia: string;
  stato: string;
  confidence?: number;
  reportsCount?: number;
  sources?: string[];
  updatedAt?: string;
};

type OfficialNotFound = {
  ok: true;
  found: false;
  code: string;
  suggestion: string;
  reportsCount?: number;
};

type ErrorResponse = {
  ok: false;
  error: string;
};

type CheckResponse = OfficialFound | OfficialNotFound | ErrorResponse;

export default function CheckAvvisoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<CheckResponse | null>(null); // ✅ Tipado correcto
  const [err, setErr] = useState<string | null>(null);
  const [openReport, setOpenReport] = useState(false);

  async function onCheck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setRes(null);

    const trimmed = code.trim();
    if (!/^\d{3,6}$/.test(trimmed)) {
      setErr("Inserisci un codice valido (3–6 cifre).");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(
        `/api/check-codice?code=${encodeURIComponent(trimmed)}`
      );
      const data: CheckResponse = await r.json();
      setRes(data);
    } catch {
      setErr("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  const initialReportCode =
    res && res.ok && !res.found && "code" in res ? res.code : code;

  return (
    <>
      <Modal open={open} onClose={onClose} title="Verifica il tuo avviso">
        <form onSubmit={onCheck} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Codice (es. 697)
          </label>
          <input
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
            placeholder="Inserisci il codice"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Verificando…" : "Verifica"}
          </button>

          {err && <p className="text-sm text-rose-600">{err}</p>}

          {/* Caso: no se encuentra */}
          {res && res.ok && !res.found && (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <div className="font-semibold mb-1">
                Nessun dato ufficiale per il codice {res.code}
              </div>
              <p className="mb-2">
                Aiutaci a migliorare il database inviando una segnalazione.
              </p>
              <button
                type="button"
                onClick={() => setOpenReport(true)}
                className="inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-700"
              >
                Invia una segnalazione
              </button>
            </div>
          )}

          {/* Caso: encontrado */}
          {res && res.ok && res.found && (
            <div className="mt-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-800">
              <div className="font-semibold text-gray-900 mb-2">
                Codice {res.code} — risultato
              </div>

              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Mittente</span>
                  <span className="font-medium text-right">{res.mittente}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Tipologia</span>
                  <span className="font-medium text-right">
                    {res.tipologia}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Stato</span>
                  <span className="font-medium text-right">{res.stato}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Confidence (0–1)</span>
                  <span className="font-medium text-right">
                    {typeof res.confidence === "number"
                      ? new Intl.NumberFormat("it-IT", {
                          maximumFractionDigits: 2,
                        }).format(res.confidence)
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Reports Count</span>
                  <span className="font-medium text-right">
                    {typeof res.reportsCount === "number"
                      ? res.reportsCount
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Sources</span>
                  <span className="font-medium text-right">
                    {Array.isArray(res.sources) && res.sources.length > 0
                      ? res.sources.join(", ")
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Updated At</span>
                  <span className="font-medium text-right">
                    {res.updatedAt
                      ? new Date(res.updatedAt).toLocaleString("it-IT", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Caso: error */}
          {res && !res.ok && (
            <p className="text-sm text-rose-600 mt-2">
              {"error" in res ? res.error : "Errore sconosciuto"}
            </p>
          )}
        </form>
      </Modal>

      <ReportAvvisoModal
        open={openReport}
        onClose={() => setOpenReport(false)}
        initialCode={initialReportCode}
      />
    </>
  );
}
