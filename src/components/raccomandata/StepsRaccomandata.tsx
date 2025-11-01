"use client";
import React from "react";

export default function StepsRaccomandata() {
  const steps = [
    {
      title: "1. Identificare il Mittente",
      description:
        "Controlla attentamente l’avviso di giacenza e il codice riportato. Il mittente può essere un ente pubblico come l’Agenzia delle Entrate o INPS.",
    },
    {
      title: "2. Ritirare la Raccomandata",
      description:
        "Recati presso l’ufficio postale indicato nell’avviso entro 30 giorni per evitare che venga restituita al mittente.",
    },
    {
      title: "3. Leggere il Contenuto",
      description:
        "Una volta ritirata, verifica la natura della comunicazione per capire se richiede una risposta o un pagamento.",
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Cosa Fare Passo per Passo
      </h2>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-4 md:p-5 bg-gray-50/40"
          >
            <h3 className="font-semibold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
