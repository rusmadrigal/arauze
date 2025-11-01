"use client";
import React from "react";

export default function AlertBox() {
  return (
    <section className="mt-10">
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#3A78E0] to-[#2F66D5] text-white px-6 md:px-8 py-7 shadow-card">
        <h3 className="text-lg font-semibold mb-2">
          Attenzione ai Termini di Ritiro
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed">
          Se non ritiri la raccomandata entro 30 giorni, potrebbe essere
          considerata come notificata per “compiuta giacenza”. In tal caso,
          eventuali comunicazioni fiscali o multe saranno comunque valide anche
          senza la tua firma di ritiro.
        </p>
      </div>
    </section>
  );
}
