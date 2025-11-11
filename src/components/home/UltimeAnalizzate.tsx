// src/app/components/home/UltimeAnalizzate.tsx
import React from "react";
import { ArrowRight } from "lucide-react";

export type Urgency = "ALTA" | "BASSA" | "RITIRATA";

export type RaccomandataItem = {
  code: string;
  sender: string;
  urgency: Urgency;
  /** Texto opcional para la 3ra columna (p.ej. "Dettaglio →") */
  state?: string;
  /** URL opcional para el CTA de detalle */
  href?: string;
};

export default function UltimeRaccomandateAnalizzate({
  items,
}: {
  items: RaccomandataItem[];
}) {
  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Ultime Raccomandate Analizzate</h3>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">Raccomandata</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">Urgenza</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide"> </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide"> </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="hover:bg-gray-50/70">
                <td className="px-4 py-3">
                  <div className="font-semibold text-base leading-tight">#{it.code}</div>
                  <div className="text-xs text-gray-500">{it.sender}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={it.urgency}>{it.urgency}</Badge>
                </td>
                <td className="px-4 py-3 font-semibold">
                  {it.href ? (
                    <a href={it.href} className="text-[#2F66D5] hover:underline">
                      {it.state ?? "Dettaglio →"}
                    </a>
                  ) : (
                    it.state ?? "Dettaglio →"
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {it.href ? (
                    <a
                      href={it.href}
                      className="inline-flex items-center gap-1.5 text-[#2F66D5] hover:text-[#2552AD] transition group"
                      aria-label={`Vedi dettagli per ${it.code}`}
                    >
                      <span className="text-sm font-medium">{it.state ?? "Dettaglio"}</span>
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2.2}
                      />
                    </a>
                  ) : (
                    <span className="text-gray-400">{it.state ?? "—"}</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: Urgency;
  children: React.ReactNode;
}) {
  const map: Record<Urgency, string> = {
    ALTA: "bg-rose-100 text-rose-700",
    BASSA: "bg-amber-100 text-amber-700",
    RITIRATA: "bg-emerald-100 text-emerald-700",
  };
  const urgencyClass = map[tone] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${urgencyClass}`}>
      {children}
    </span>
  );
}
