// components/raccomandata/AlertBox.tsx
"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";

export default function AlertBox() {
  return (
    <section className="mt-10">
      {/* Alert card container */}
      <div
        className="relative w-full rounded-2xl border border-blue-200 bg-gradient-to-r from-[#3A78E0] to-[#2F66D5]
                   text-white px-6 md:px-8 py-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)]
                   transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)]"
      >
        {/* Prominent icon integrated in the corner */}
        <div className="absolute -top-5 left-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-blue-100">
            <AlertTriangle className="h-5 w-5 text-[#2F66D5]" aria-hidden="true" />
          </div>
        </div>

        {/* Text content */}
        <div className="pt-4">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Attenzione ai Termini di Ritiro
          </h3>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            Se non ritiri la raccomandata entro 30 giorni, potrebbe essere
            considerata come notificata per “compiuta giacenza”. In tal caso,
            eventuali comunicazioni fiscali o multe saranno comunque valide anche
            senza la tua firma di ritiro.
          </p>
        </div>

        {/* Subtle bottom light bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-white/30 via-transparent to-white/30 rounded-b-2xl"></div>
      </div>
    </section>
  );
}
