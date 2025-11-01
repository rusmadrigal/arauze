"use client";
import React from "react";

export default function InfoBoxRaccomandata() {
  const keyInfo = [
    { label: "Codice", value: "697" },
    { label: "Mittente", value: "Agenzia delle Entrate (probabile)" },
    { label: "Tipologia", value: "Raccomandata Market" },
    { label: "Stato", value: "In attesa di ritiro" },
  ];

  return (
    <section>
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#2F66D5] to-[#2552AD] text-white px-6 md:px-8 py-7 shadow-card">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Informazioni Chiave — Codice 697
        </h2>

        <ul>
          {keyInfo.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b border-white/20 last:border-none text-sm md:text-base"
            >
              <span className="opacity-90">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            href="#"
            className="inline-block bg-white text-[#2552AD] font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-[1.05]"
          >
            Hai ricevuto un avviso?
          </a>
        </div>
      </div>
    </section>
  );
}
