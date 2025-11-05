// components/raccomandata/AssistenzaSection.tsx
"use client";
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function AssistenzaSection() {
  // Data for each assistance card
  const cards = [
    {
      icon: <MapPin className="w-6 h-6 text-[#2F66D5]" />,
      title: "Ufficio Postale",
      description:
        "Puoi ritirare la raccomandata presso l’ufficio postale indicato sull’avviso di giacenza.",
    },
    {
      icon: <Phone className="w-6 h-6 text-[#2F66D5]" />,
      title: "Numero Verde Poste",
      description: "Chiama il servizio clienti Poste Italiane al 803.160.",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#2F66D5]" />,
      title: "Assistenza Online",
      description:
        "Accedi al portale di Poste Italiane per verificare lo stato della tua spedizione.",
    },
  ];

  return (
    <section className="mt-10">
      {/* Section title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
        Assistenza e Contatti Utili
      </h2>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white
                       shadow-[0_2px_6px_-2px_rgba(0,0,0,0.15)]
                       transition-all duration-300 hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)]
                       hover:-translate-y-1"
          >
            {/* Top gradient accent */}
            <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#2F66D5] to-[#3A78E0]" />

            {/* Card content */}
            <div className="p-6 relative z-10">
              {/* Icon inside circular container */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl 
                              bg-gradient-to-br from-[#2F66D5]/10 to-[#3A78E0]/10 
                              ring-1 ring-[#2F66D5]/20">
                {card.icon}
              </div>

              <h3 className="font-semibold text-slate-900 mb-1">{card.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
                            bg-gradient-to-br from-[#2F66D5]/5 to-[#3A78E0]/5 rounded-2xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
