// components/raccomandata/InfoBoxRaccomandata.tsx
"use client";
import React, { useState } from "react";
import CheckAvvisoModal from "@/components/raccomandata/CheckAvvisoModal";
import { CheckCircle2 } from "lucide-react";

type Urgency = "ALTA" | "BASSA" | "RITIRATA" | "NONE";

interface Props {
  code?: string;
  mittente?: string;
  tipologia?: string;
  stato?: string;
  urgency?: Urgency;
}

export default function InfoBoxRaccomandata({
  code = "697",
  mittente = "Agenzia delle Entrate (probabile)",
  tipologia = "Raccomandata Market",
  stato = "In attesa di ritiro",
  urgency = "NONE",
}: Props) {
  const [openCheck, setOpenCheck] = useState(false);

  // Key info pairs for the list
  const keyInfo = [
    { label: "Codice", value: code },
    { label: "Mittente", value: mittente },
    { label: "Tipologia", value: tipologia },
    { label: "Stato", value: stato },
  ];

  // Urgency helpers
  const isUrgent = urgency === "ALTA";
  const urgencyLabel =
    urgency === "ALTA"
      ? "Urgenza Alta"
      : urgency === "BASSA"
      ? "Urgenza Bassa"
      : urgency === "RITIRATA"
      ? "Ritirata"
      : null;

  return (
    <section className="text-sm">
      {/* Card container */}
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-[#2F66D5]/20
                   bg-gradient-to-r from-[#2F66D5] to-[#2552AD] text-white
                   px-5 py-6 sm:px-6 md:px-8 md:py-7
                   shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)]"
      >
        {/* Corner icon for visual identity */}
        <div className="absolute -top-5 -right-4 opacity-10 pointer-events-none">
          <CheckCircle2 className="h-20 w-20 text-white" aria-hidden="true" />
        </div>

        {/* Urgency badge + pulsating dot (accessible) */}
        {urgencyLabel && (
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {isUrgent && (
              <span className="relative inline-flex h-3 w-3 items-center justify-center" aria-hidden="true">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-rose-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-600" />
              </span>
            )}
            <span
              className={`rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                urgency === "ALTA"
                  ? "bg-white/10 text-white ring-white/30"
                  : urgency === "BASSA"
                  ? "bg-white/10 text-white/90 ring-white/20"
                  : "bg-white/10 text-white/80 ring-white/20"
              }`}
            >
              {urgencyLabel}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold mb-4 leading-tight">
          <svg
            className="h-5 w-5 shrink-0 text-white/90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13l3 3L22 6M3 7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            />
          </svg>
          Informazioni Chiave — Codice {code}
        </h2>

        {/* Key list */}
        <ul className="divide-y divide-white/15 rounded-xl bg-white/5 ring-1 ring-white/10">
          {keyInfo.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center px-3 sm:px-4 py-2.5 text-[0.94rem] sm:text-base"
            >
              <span className="opacity-90">{item.label}</span>
              <span className="font-semibold text-right">{item.value}</span>
            </li>
          ))}
        </ul>

        {/* CTA → open modal */}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={() => setOpenCheck(true)}
            className="inline-block bg-white text-[#2552AD] font-semibold px-5 py-3 rounded-xl
                       text-[0.95rem] md:text-base
                       shadow-sm hover:shadow-md transition
                       hover:scale-[1.03] active:scale-[0.98]
                       focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-haspopup="dialog"
            aria-controls="check-avviso-modal"
          >
            Hai ricevuto un avviso?
          </button>
        </div>

        {/* Modal (fetches /api/check-codice) */}
        <CheckAvvisoModal open={openCheck} onClose={() => setOpenCheck(false)} />
      </div>
    </section>
  );
}
