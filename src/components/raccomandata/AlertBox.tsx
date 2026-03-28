import React from "react";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

// Sólo componentes válidos (excluimos exports utilitarios)
type LucideIconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;
type LucideIconName = Exclude<keyof typeof Lucide, "createLucideIcon" | "default">;

export type AlertBoxData = {
  enabled?: boolean;
  title?: string;
  body?: string;
  // 👇 Aceptamos string desde Sanity
  icon?: string;
};

// Type guard para validar que el string corresponde a un icono Lucide válido
function isLucideIconName(value: unknown): value is LucideIconName {
  return (
    typeof value === "string" &&
    value in Lucide &&
    value !== "createLucideIcon" &&
    value !== "default"
  );
}

export default function AlertBox({ data }: { data?: AlertBoxData }) {
  if (data?.enabled === false) return null;

  const resolvedName: LucideIconName = isLucideIconName(data?.icon)
    ? (data!.icon as LucideIconName)
    : "AlertTriangle";

  const IconComponent = Lucide[resolvedName] as LucideIconComponent;

  return (
    <section className="mt-10">
      <div
        className="relative w-full rounded-2xl border border-blue-200 bg-gradient-to-r from-[#3A78E0] to-[#2F66D5]
                   px-6 md:px-8 py-7 text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)]
                   transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)]
                   [&_h3]:!text-white [&_p]:!text-white"
      >
        <div className="absolute -top-5 left-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-blue-100">
            <IconComponent className="h-5 w-5 text-[#2F66D5]" aria-hidden="true" />
          </div>
        </div>

        <div className="pt-4">
          <h3 className="rac-callout-title mb-2">
            {data?.title || "Attenzione ai Termini di Ritiro"}
          </h3>
          <p className="rac-callout-body">
            {data?.body ||
              "Se non ritiri la raccomandata entro 30 giorni, potrebbe essere considerata come notificata per “compiuta giacenza”. In tal caso, eventuali comunicazioni fiscali o multe saranno comunque valide anche senza la tua firma di ritiro."}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-white/30 via-transparent to-white/30 rounded-b-2xl"></div>
      </div>
    </section>
  );
}
