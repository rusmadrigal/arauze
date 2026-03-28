import React from "react";
import { HelpCircle } from "lucide-react";
import FaqItem from "./FaqItem";

export type FAQData = {
  title?: string;
  items?: {
    q?: string;
    a?: string;
  }[];
};

export default function FAQSection({ data }: { data?: FAQData }) {
  if (!data?.items?.length) return null;

  const sectionTitle = data.title || "Domande Frequenti (FAQ)";

  return (
    <section className="mt-12">
      {/* Section title with icon */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F66D5]/10 to-[#3A78E0]/10 text-[#2F66D5] ring-1 ring-[#2F66D5]/20">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          {sectionTitle}
        </h2>
      </div>

      {/* FAQ container */}
      <div
        className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm
                   shadow-[0_1px_0_#0000000d,0_8px_16px_-8px_rgba(0,0,0,0.15)] divide-y divide-slate-100"
      >
        {data.items.map((item, index) => (
          <FaqItem key={index} q={item.q ?? ""}>
            {item.a}
          </FaqItem>
        ))}
      </div>
    </section>
  );
}
