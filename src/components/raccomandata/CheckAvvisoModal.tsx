// src/components/raccomandata/CheckAvvisoModal.tsx
"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";

type OkFound = {
  ok: true; found: true;
  code: string; mittente: string; tipologia: string; stato: string;
  confidence?: number; reportsCount?: number;
};
type OkNotFound = {
  ok: true; found: false;
  code: string; suggestion: string; reportsCount?: number;
};
type Fail = { ok: false; error: string };
type CheckResult = OkFound | OkNotFound | Fail;

export default function CheckAvvisoModal({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<CheckResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onCheck(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setRes(null);

    const trimmed = code.trim();
    if (!/^\d{3,6}$/.test(trimmed)) {
      setErr("Inserisci un codice valido (3–6 cifre).");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(`/api/check-codice?code=${encodeURIComponent(trimmed)}`);
      const data: CheckResult = await r.json();
      setRes(data);
    } catch {
      setErr("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Verifica il tuo avviso">
      <form onSubmit={onCheck} className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Codice (es. 697)
        </label>
        <input
          inputMode="numeric" pattern="\d*" maxLength={6}
          placeholder="Inserisci il codice"
          value={code} onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="submit" disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Verificando…" : "Verifica"}
        </button>

        {err && <p className="text-sm text-rose-600">{err}</p>}

        {/* Resultado: FOUND */}
        {res && res.ok && res.found && (
          <div className="mt-3 rounded-lg border border-gray-200 p-3 text-sm">
            <div className="font-semibold text-gray-900 mb-1">
              Codice {res.code} — risultato
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <div><span className="text-gray-500">Mittente:</span> {res.mittente}</div>
              <div><span className="text-gray-500">Tipologia:</span> {res.tipologia}</div>
              <div><span className="text-gray-500">Stato:</span> {res.stato}</div>
              {typeof res.reportsCount === "number" && (
                <div className="text-gray-500">Conferme: {res.reportsCount}</div>
              )}
            </div>
          </div>
        )}

        {/* Resultado: NOT FOUND */}
        {res && res.ok && !res.found && (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <div className="font-semibold mb-1">Nessun dato ufficiale</div>
            <p className="mb-2">{res.suggestion}</p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100"
            >
              Invia una segnalazione
            </button>
          </div>
        )}

        {/* Resultado: FAIL */}
        {res && !res.ok && (
          <p className="text-sm text-rose-600 mt-2">{res.error || "Errore sconosciuto"}</p>
        )}
      </form>
    </Modal>
  );
}
