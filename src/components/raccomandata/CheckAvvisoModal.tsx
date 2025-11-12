"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import ReportAvvisoModal from "@/components/raccomandata/ReportAvvisoModal";

// Tipos de respuesta del endpoint
type LinkObj = { title?: string; url?: string };

type OfficialFound = {
  ok: true;
  found: true;
  code: string;
  mittente: string;
  tipologia: string;
  stato: string;
  confidence?: number | string | null;
  score?: number | string | null;
  reportsCount?: number;
  sources?: Array<string | LinkObj> | string | null;
  fonti?: Array<string | LinkObj> | string | null;
  links?: Array<string | LinkObj> | string | null;
  updatedAt?: string | null;
  _updatedAt?: string;
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

/* =============== Helpers =============== */

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function isOfficialFound(x: unknown): x is OfficialFound {
  return (
    isRecord(x) &&
    x.ok === true &&
    x.found === true &&
    typeof x.code === "string"
  );
}

function pickFirst(obj: unknown, keys: readonly string[]): unknown {
  if (!isRecord(obj)) return undefined;
  for (const k of keys) {
    if (k in obj) return (obj as Record<string, unknown>)[k];
  }
  return undefined;
}

function toNumberOrNull(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function normalizeSources(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    const out: string[] = [];
    for (const item of raw) {
      if (typeof item === "string") {
        const t = item.trim();
        if (t) out.push(t);
      } else if (isRecord(item)) {
        const title = typeof item.title === "string" ? item.title.trim() : "";
        const url = typeof item.url === "string" ? item.url.trim() : "";
        const chosen = title || url;
        if (chosen) out.push(chosen);
      }
    }
    return out;
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  return [];
}

/* =============== Componente principal =============== */

export default function CheckAvvisoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<CheckResponse | null>(null);
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
      const r = await fetch(`/api/check-codice?code=${encodeURIComponent(trimmed)}`);
      const data: CheckResponse = await r.json();
      setRes(data);
    } catch {
      setErr("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  const initialReportCode =
    res && res.ok && !("found" in res && res.found)
      ? (res as OfficialNotFound).code
      : code;

  /* ---------- Normalizados ---------- */
  const found = isOfficialFound(res) ? res : null;

  const rawConfidence = found ? pickFirst(found, ["confidence", "score"]) : undefined;
  const normConfidence = toNumberOrNull(rawConfidence);

  const rawSources = found ? pickFirst(found, ["sources", "fonti", "links"]) : undefined;
  const normSourcesList = normalizeSources(rawSources);
  const normSourcesText = normSourcesList.length > 0 ? normSourcesList.join(", ") : "—";

  const rawUpdatedAt = found ? found.updatedAt ?? found._updatedAt ?? null : null;
  const normUpdatedAtText = rawUpdatedAt
    ? new Date(rawUpdatedAt).toLocaleString("it-IT", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

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
          {res && res.ok && "found" in res && res.found === false && (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <div className="font-semibold mb-1">
                Nessun dato ufficiale per il codice {(res as OfficialNotFound).code}
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
          {found && (
            <div className="mt-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-800">
              <div className="font-semibold text-gray-900 mb-2">
                Codice {found.code} — risultato
              </div>

              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Mittente</span>
                  <span className="font-medium text-right">{found.mittente}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Tipologia</span>
                  <span className="font-medium text-right">{found.tipologia}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Stato</span>
                  <span className="font-medium text-right">{found.stato}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Confidence (0–10)</span>
                  <span className="font-medium text-right">
                    {normConfidence !== null
                      ? new Intl.NumberFormat("it-IT", {
                          maximumFractionDigits: 2,
                        }).format(normConfidence)
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Reports Count</span>
                  <span className="font-medium text-right">
                    {typeof found.reportsCount === "number"
                      ? found.reportsCount
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Sources</span>
                  <span className="font-medium text-right">{normSourcesText}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Updated At</span>
                  <span className="font-medium text-right">{normUpdatedAtText}</span>
                </div>
              </div>
            </div>
          )}

          {/* Caso: error */}
          {res && !res.ok && (
            <p className="text-sm text-rose-600 mt-2">
              {"error" in res ? (res as ErrorResponse).error : "Errore sconosciuto"}
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
