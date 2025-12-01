import React from "react";
import { ArrowRight } from "lucide-react";
import TrendMiniChart from "@/components/raccomandata/TrendMiniChart";
import Link from "next/link";

export type Urgency = "ALTA" | "MEDIA" | "BASSA" | "RITIRATA";

export type RaccomandataItem = {
  code: string;
  sender: string;
  urgency: Urgency;
  state?: string;
  href?: string;
};

export default function UltimeRaccomandateAnalizzate({
  items,
}: {
  items: RaccomandataItem[];
}) {
  /** ORDEN PRIORITARIO */
  const ORDER: Record<Urgency, number> = {
    ALTA: 1,
    MEDIA: 2,
    BASSA: 3,
    RITIRATA: 4,
  };

  /** Ordenamos los resultados */
  const sorted = [...items].sort(
    (a, b) => ORDER[a.urgency] - ORDER[b.urgency]
  );

  return (
    <section className="mt-10">
      {/* Contenedor con borde/redondeado */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {/* ✅ Scroll horizontal en móvil */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                  Raccomandata
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                  Urgenza
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                  Tendenza
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide">
                  Azione
                </th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((it, i) => (
                <tr key={i} className="hover:bg-gray-50/70 transition">
                  {/* Codice + mittente */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-base leading-tight">
                      #{it.code}
                    </div>
                    <div className="text-xs text-gray-500">{it.sender}</div>
                  </td>

                  {/* Urgenza */}
                  <td className="px-4 py-3">
                    <Badge tone={it.urgency}>{it.urgency}</Badge>
                  </td>

                  {/* Mini chart */}
                  <td className="px-4 py-3 align-middle">
                    <div className="h-10 w-28">
                      <TrendMiniChart code={it.code} />
                    </div>
                  </td>

                  {/* Azione */}
                  <td className="px-4 py-3 text-right">
                    {it.href ? (
                      <Link
                        href={it.href.toLowerCase()}
                        className="inline-flex items-center gap-1.5 text-[#2F66D5] hover:text-[#2552AD] transition group"
                        aria-label={`Vedi dettagli per ${it.code}`}
                      >
                        <span className="text-sm font-medium">Dettaglio</span>
                        <ArrowRight
                          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          strokeWidth={2.2}
                        />
                      </Link>
                    ) : (
                      <span className="text-gray-400">›</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- Badge ---------- */
function Badge({
  tone,
  children,
}: {
  tone: Urgency;
  children: React.ReactNode;
}) {
  const map: Record<Urgency, string> = {
    ALTA: "bg-rose-100 text-rose-700",
    MEDIA: "bg-orange-100 text-orange-700",
    BASSA: "bg-emerald-100 text-emerald-700",
    RITIRATA: "bg-gray-100 text-gray-700",
  };

  const urgencyClass = map[tone] ?? "bg-gray-100 text-gray-700";

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${urgencyClass}`}
    >
      {children}
    </span>
  );
}
