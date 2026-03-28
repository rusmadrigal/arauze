// src/components/raccomandata/StepsRaccomandata.tsx
import React from "react";
import { Search, Mailbox, FileText } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { raccomandataRichTextComponents } from "@/components/shared/richTextPortableComponents";
import { RACCOMANDATA_DEFAULT_STEPS } from "@/lib/raccomandata/italianPublicCopy";

type Step = {
  title: string;
  description?: string | TypedObject[];
};

interface Props {
  steps?: Step[];
}

export default function StepsRaccomandata({ steps }: Props) {
  const defaultSteps: Step[] = RACCOMANDATA_DEFAULT_STEPS.map((s) => ({
    title: s.title,
    description: s.description,
  }));

  const visibleSteps = steps?.length ? steps : defaultSteps;

  return (
    <section className="rac-section">
      <h2 className="rac-section-h2 mb-4">Cosa fare passo dopo passo (Italia)</h2>

      <ol className="relative ms-4 space-y-4 before:absolute before:inset-y-0 before:-start-4 before:w-px before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-transparent">
        {visibleSteps.map((step, idx) => (
          <li key={idx} className="relative">
            <span
              className="absolute -start-4 -translate-x-1/2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white font-sans text-xs font-semibold text-gray-700 shadow ring-1 ring-gray-200"
              aria-hidden="true"
            >
              {idx + 1}
            </span>

            <div className="rac-surface rac-surface-pad group transition-shadow hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F66D5]/10 to-[#2552AD]/10 text-[#2552AD] ring-1 ring-[#2F66D5]/20">
                  {idx === 0 ? (
                    <Search className="h-5 w-5" />
                  ) : idx === 1 ? (
                    <Mailbox className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </span>

                <div className="flex-1">
                  <h3 className="rac-card-heading">{step.title}</h3>

                  {/* Si viene Portable Text, lo renderizamos enriquecido */}
                  {Array.isArray(step.description) ? (
                    <div className="rac-prose mt-2">
                      <PortableText
                        value={step.description}
                        components={raccomandataRichTextComponents}
                      />
                    </div>
                  ) : step.description ? (
                    <p className="rac-body mt-2">{step.description}</p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                      Passo {idx + 1}
                    </span>
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
