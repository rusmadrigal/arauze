"use client";
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function AssistenzaSection() {
  const cards = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Ufficio Postale",
      description:
        "Puoi ritirare la raccomandata presso l’ufficio postale indicato sull’avviso di giacenza.",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Numero Verde Poste",
      description: "Chiama il servizio clienti Poste Italiane al 803.160.",
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Assistenza Online",
      description:
        "Accedi al portale di Poste Italiane per verificare lo stato della tua spedizione.",
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
        Assistenza e Contatti Utili
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-5 bg-gray-50/40 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
