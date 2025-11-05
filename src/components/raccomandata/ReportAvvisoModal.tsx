// src/components/raccomandata/ReportAvvisoModal.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/ui/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  initialCode?: string;
};

export default function ReportAvvisoModal({
  open,
  onClose,
  initialCode = "",
}: Props) {
  const [code, setCode] = useState(initialCode);
  const [mittente, setMittente] = useState("");
  const [provincia, setProvincia] = useState("");
  const [dataRicezione, setDataRicezione] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const codeRef = useRef<HTMLInputElement | null>(null);

  // Sincroniza el código cuando se abre el modal
  useEffect(() => {
    if (open) {
      setCode(initialCode || "");
      setErr(null);
      // Foco al primer input para mejor UX
      setTimeout(() => codeRef.current?.focus(), 0);
    } else {
      // Al cerrar, limpiar estados
      setMittente("");
      setProvincia("");
      setDataRicezione("");
      setLoading(false);
      setDone(false);
      setErr(null);
    }
  }, [open, initialCode]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const codeTrim = code.trim();
    const mittTrim = mittente.trim();

    if (!/^\d{3,6}$/.test(codeTrim) || !mittTrim) {
      setErr("Inserisci un codice valido (3–6 cifre) e il mittente.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeTrim,
          mittenteSegnalato: mittTrim,
          provincia: provincia.trim() || undefined,
          dataRicezione: dataRicezione || undefined,
        }),
      });

      const data: { ok: boolean; id?: string; error?: string } = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Errore");
      }
      setDone(true);
    } catch (e) {
      setErr("Non è stato possibile inviare la segnalazione. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Invia una segnalazione">
      {done ? (
        <div className="text-sm" aria-live="polite">
          <p className="mb-2 font-medium text-gray-900">Grazie! ✅</p>
          <p className="text-gray-600">
            La tua segnalazione è stata ricevuta e verrà revisionata. Questo aiuta a migliorare il
            database di Arauze.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Codice <span className="text-rose-600">*</span>
            </label>
            <input
              ref={codeRef}
              inputMode="numeric"
              pattern="\d*"
              minLength={3}
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
              placeholder="es. 697"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mittente visto <span className="text-rose-600">*</span>
            </label>
            <input
              required
              value={mittente}
              onChange={(e) => setMittente(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
              placeholder="es. Agenzia delle Entrate"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Provincia (opz.)</label>
              <input
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
                placeholder="es. RM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data ricezione (opz.)
              </label>
              <input
                type="date"
                value={dataRicezione}
                onChange={(e) => setDataRicezione(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {err && <p className="text-sm text-rose-600">{err}</p>}

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Inviando…" : "Invia segnalazione"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annulla
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
