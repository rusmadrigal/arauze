// src/components/raccomandata/StepsRaccomandata.tsx
import React from "react";
import { Search, Mailbox, FileText } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import PortableTextMarkLink from "@/components/shared/PortableTextMarkLink";
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
    <section className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Cosa fare passo dopo passo (Italia)
      </h2>

      <ol className="relative ms-4 space-y-4 before:absolute before:inset-y-0 before:-start-4 before:w-px before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
        {visibleSteps.map((step, idx) => (
          <li key={idx} className="relative">
            <span
              className="absolute -start-4 -translate-x-1/2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow ring-1 ring-slate-200"
              aria-hidden="true"
            >
              <span className="text-xs font-semibold">{idx + 1}</span>
            </span>

            <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 md:p-5 shadow hover:shadow-lg transition-shadow">
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
                  <h3 className="font-semibold text-slate-900 leading-snug">
                    {step.title}
                  </h3>

                  {/* Si viene Portable Text, lo renderizamos enriquecido */}
                  {Array.isArray(step.description) ? (
                    <div className="mt-1 text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none">
                      <PortableText
                        value={step.description}
                        components={{
                          marks: {
                            link: ({ value, children }) => {
                              const href =
                                value && typeof value.href === "string"
                                  ? value.href
                                  : "#";
                              return (
                                <PortableTextMarkLink
                                  href={href}
                                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                                >
                                  {children}
                                </PortableTextMarkLink>
                              );
                            },
                          },
                        }}
                      />
                    </div>
                  ) : step.description ? (
                    // Fallback string plano
                    <p className="mt-1 text-sm text-slate-600">{step.description}</p>
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
