"use client";
import React from "react";

export default function DetailsSection() {
  const details = [
    {
      title: "Motivo della Raccomandata Market 697",
      body: `Il codice 697 viene spesso utilizzato da enti pubblici o società
      di servizi per notifiche ufficiali. In molti casi si tratta di comunicazioni
      fiscali provenienti dall’Agenzia delle Entrate o da uffici amministrativi locali.`,
    },
    {
      title: "Tempi di Giacenza e Ritiro",
      body: `Hai 30 giorni di tempo per ritirare la raccomandata presso
      l’ufficio postale indicato. Trascorso questo periodo, la lettera viene
      restituita al mittente, il che può comportare conseguenze amministrative.`,
    },
  ];

  return (
    <section className="mt-10">
      {details.map((block, index) => (
        <div key={index} className="mb-8 last:mb-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            {block.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{block.body}</p>
        </div>
      ))}
    </section>
  );
}
