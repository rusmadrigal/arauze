"use client";
import React from "react";
import FaqItem from "./FaqItem";

export default function FAQSection() {
  const faqs = [
    {
      q: "Cosa significa Raccomandata Market 697?",
      a: "È una comunicazione ufficiale, spesso inviata da enti pubblici come l’Agenzia delle Entrate, relativa a pratiche fiscali o amministrative.",
    },
    {
      q: "Quanto tempo ho per ritirarla?",
      a: "Hai 30 giorni di tempo dalla data del primo tentativo di consegna per ritirare la raccomandata.",
    },
    {
      q: "Posso delegare qualcun altro al ritiro?",
      a: "Sì, è possibile delegare un familiare o altra persona munita di delega e documento di identità valido.",
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Domande Frequenti (FAQ)
      </h2>

      <div className="rounded-xl border divide-y">
        {faqs.map((item, index) => (
          <FaqItem key={index} q={item.q}>
            {item.a}
          </FaqItem>
        ))}
      </div>
    </section>
  );
}
