// components/raccomandata/StepsRaccomandata.tsx
"use client";
import React from "react";
import { Search, Mailbox, FileText } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export default function StepsRaccomandata() {
  const steps: Step[] = [
    {
      title: "Identificare il Mittente",
      description:
        "Controlla attentamente l’avviso di giacenza e il codice riportato. Il mittente può essere un ente pubblico come l’Agenzia delle Entrate o l’INPS.",
      icon: <Search className="h-5 w-5" aria-hidden="true" />,
    },
    {
      title: "Ritirare la Raccomandata",
      description:
        "Recati presso l’ufficio postale indicato nell’avviso entro 30 giorni per evitare che venga restituita al mittente.",
      icon: <Mailbox className="h-5 w-5" aria-hidden="true" />,
    },
    {
      title: "Leggere il Contenuto",
      description:
        "Una volta ritirata, verifica la natura della comunicazione per capire se richiede una risposta o un pagamento.",
      icon: <FileText className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Cosa Fare Passo per Passo
      </h2>

      {/* Timeline container */}
      <ol className="relative ms-4 space-y-4 before:absolute before:inset-y-0 before:-start-4 before:w-px before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
        {steps.map((step, idx) => (
          <li key={idx} className="relative">
            {/* Numbered node */}
            <span
              className="absolute -start-4 -translate-x-1/2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_1px_0_#0000000d,0_1px_3px_#0001] ring-1 ring-slate-200"
              aria-hidden="true"
            >
              <span className="text-xs font-semibold">{idx + 1}</span>
            </span>

            {/* Step card */}
            <div
              className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 md:p-5
                         shadow-[0_1px_0_#0000000d,0_12px_24px_-12px_rgba(0,0,0,0.2)]
                         hover:shadow-[0_1px_0_#0000000d,0_18px_36px_-12px_rgba(0,0,0,0.25)]
                         transition-shadow"
            >
              <div className="flex items-start gap-3">
                {/* Rounded icon */}
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                                 bg-gradient-to-br from-[#2F66D5]/10 to-[#2552AD]/10
                                 text-[#2552AD] ring-1 ring-[#2F66D5]/20">
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {step.description}
                  </p>

                  {/* Optional detail tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-lg bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                      Passo {idx + 1}
                    </span>
                    {idx === 1 && (
                      <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                        Entro 30 giorni
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
// components/raccomandata/StepsRaccomandata.tsx
"use client";
import React from "react";
import { Search, Mailbox, FileText } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export default function StepsRaccomandata() {
  const steps: Step[] = [
    {
      title: "Identificare il Mittente",
      description:
        "Controlla attentamente l’avviso di giacenza e il codice riportato. Il mittente può essere un ente pubblico come l’Agenzia delle Entrate o l’INPS.",
      icon: <Search className="h-5 w-5" aria-hidden="true" />,
    },
    {
      title: "Ritirare la Raccomandata",
      description:
        "Recati presso l’ufficio postale indicato nell’avviso entro 30 giorni per evitare che venga restituita al mittente.",
      icon: <Mailbox className="h-5 w-5" aria-hidden="true" />,
    },
    {
      title: "Leggere il Contenuto",
      description:
        "Una volta ritirata, verifica la natura della comunicazione per capire se richiede una risposta o un pagamento.",
      icon: <FileText className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Cosa Fare Passo per Passo
      </h2>

      {/* Timeline container */}
      <ol className="relative ms-4 space-y-4 before:absolute before:inset-y-0 before:-start-4 before:w-px before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
        {steps.map((step, idx) => (
          <li key={idx} className="relative">
            {/* Numbered node */}
            <span
              className="absolute -start-4 -translate-x-1/2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_1px_0_#0000000d,0_1px_3px_#0001] ring-1 ring-slate-200"
              aria-hidden="true"
            >
              <span className="text-xs font-semibold">{idx + 1}</span>
            </span>

            {/* Step card */}
            <div
              className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 md:p-5
                         shadow-[0_1px_0_#0000000d,0_12px_24px_-12px_rgba(0,0,0,0.2)]
                         hover:shadow-[0_1px_0_#0000000d,0_18px_36px_-12px_rgba(0,0,0,0.25)]
                         transition-shadow"
            >
              <div className="flex items-start gap-3">
                {/* Rounded icon */}
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                                 bg-gradient-to-br from-[#2F66D5]/10 to-[#2552AD]/10
                                 text-[#2552AD] ring-1 ring-[#2F66D5]/20">
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {step.description}
                  </p>

                  {/* Optional detail tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-lg bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                      Passo {idx + 1}
                    </span>
                    {idx === 1 && (
                      <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                        Entro 30 giorni
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
