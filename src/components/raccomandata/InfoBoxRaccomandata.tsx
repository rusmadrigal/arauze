// components/raccomandata/InfoBoxRaccomandata.tsx
"use client";
import React, { useState } from "react";
import CheckAvvisoModal from "@/components/raccomandata/CheckAvvisoModal";

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

  const keyInfo = [
    { label: "Codice", value: code },
    { label: "Mittente", value: mittente },
    { label: "Tipologia", value: tipologia },
    { label: "Stato", value: stato },
  ];

  const isUrgent = urgency === "ALTA";

  return (
    <section className="text-sm">
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#2F66D5] to-[#2552AD] text-white px-5 py-6 sm:px-6 md:px-8 md:py-7 shadow-card overflow-hidden">
        {/* 🔴 Punto rojo con tooltip animado (hover/tap/focus) */}
        {isUrgent && (
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="group relative inline-flex h-3 w-3 items-center justify-center outline-none"
              aria-label="Urgenza: Alta"
            >
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-rose-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-600" />
              <span
                className="pointer-events-none absolute right-6 top-[-4px] rounded-md bg-white px-2 py-1 text-xs font-medium text-[#2552AD] shadow-md whitespace-nowrap
                           opacity-0 translate-y-1 transition
                           duration-200 ease-out
                           group-hover:opacity-100 group-hover:translate-y-0
                           group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                role="tooltip"
              >
                Urgenza Alta
              </span>
            </button>
          </div>
        )}

        {/* Título */}
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

        {/* Lista clave */}
        <ul>
          {keyInfo.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center py-2 border-b border-white/20 last:border-none text-[0.94rem] sm:text-base"
            >
              <span className="opacity-90">{item.label}</span>
              <span className="font-semibold text-right">{item.value}</span>
            </li>
          ))}
        </ul>

        {/* CTA → abre modal */}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={() => setOpenCheck(true)}
            className="inline-block bg-white text-[#2552AD] font-semibold px-5 py-3 rounded-xl text-[0.95rem] md:text-base transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            Hai ricevuto un avviso?
          </button>
        </div>

        {/* Modal funcional (consulta /api/check-codice) */}
        <CheckAvvisoModal open={openCheck} onClose={() => setOpenCheck(false)} />
      </div>
    </section>
  );
}
