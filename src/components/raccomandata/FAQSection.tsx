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
    <section className="rac-section">
      <div className="rac-section-head">
        <div className="rac-section-icon" aria-hidden>
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 className="rac-section-h2">{sectionTitle}</h2>
      </div>

      <div className="rac-surface divide-y divide-gray-100 shadow-[0_1px_0_#0000000d,0_8px_16px_-8px_rgba(0,0,0,0.12)]">
        {data.items.map((item, index) => (
          <FaqItem key={index} q={item.q ?? ""}>
            {item.a}
          </FaqItem>
        ))}
      </div>
    </section>
  );
}
