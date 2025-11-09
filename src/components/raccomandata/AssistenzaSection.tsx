import React from "react";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

type LucideIconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;
type LucideIconName = Exclude<keyof typeof Lucide, "createLucideIcon" | "default">;

export type AssistenzaData = {
  title?: string;
  cards?: {
    icon?: string;
    title?: string;
    description?: string;
  }[];
};

// Helper para validar íconos Lucide válidos
function isLucideIconName(value: unknown): value is LucideIconName {
  return (
    typeof value === "string" &&
    value in Lucide &&
    value !== "createLucideIcon" &&
    value !== "default"
  );
}

export default function AssistenzaSection({ data }: { data?: AssistenzaData }) {
  if (!data?.cards?.length) return null;

  const sectionTitle = data.title || "Assistenza e Contatti Utili";

  return (
    <section className="mt-10">
      {/* Section title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
        {sectionTitle}
      </h2>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.cards.map((card, index) => {
          const iconName: LucideIconName = isLucideIconName(card.icon)
            ? (card.icon as LucideIconName)
            : "MapPin";
          const IconComponent = Lucide[iconName] as LucideIconComponent;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white
                       shadow-[0_2px_6px_-2px_rgba(0,0,0,0.15)]
                       transition-all duration-300 hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)]
                       hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#2F66D5] to-[#3A78E0]" />

              <div className="p-6 relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl 
                                bg-gradient-to-br from-[#2F66D5]/10 to-[#3A78E0]/10 
                                ring-1 ring-[#2F66D5]/20">
                  <IconComponent className="w-6 h-6 text-[#2F66D5]" />
                </div>

                <h3 className="font-semibold text-slate-900 mb-1">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
                              bg-gradient-to-br from-[#2F66D5]/5 to-[#3A78E0]/5 rounded-2xl" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
