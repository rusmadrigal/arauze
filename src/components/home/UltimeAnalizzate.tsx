import React from "react";

type Urgency = "ALTA" | "BASSA" | "RITIRATA";

export type RaccomandataItem = {
  code: string;
  sender: string;
  urgency: Urgency;
};

type Props = {
  items: RaccomandataItem[];
  title?: string;
};

export default function UltimeRaccomandateAnalizzate({
  items,
  title = "Ultime Raccomandate Analizzate",
}: Props) {
  return (
    <section className="mt-10">
      <h3 className="text-base font-semibold mb-3">{title}</h3>

      {/* Quitar borde exterior y mantener estructura */}
      <div className="overflow-hidden rounded-xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <Th>Regumatlada</Th>
              <Th>Urgenza</Th>
              <Th>{null}</Th>
            </tr>
          </thead>

          {/* Líneas internas en gris claro */}
          <tbody className="divide-y divide-gray-200">
            {items.map((it, i) => (
              <Row key={`${it.code}-${i}`} item={it} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}

function Row({ item, index }: { item: RaccomandataItem; index: number }) {
  const { code, sender, urgency } = item;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <Td>
        <div className="flex items-center gap-2">
          <span className="font-medium tabular-nums">#{code}</span>
          <span className="text-gray-500">{sender}</span>
        </div>
      </Td>

      <Td>
        <UrgencyBadge urgency={urgency} index={index} />
      </Td>

      <Td>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 font-medium"
          aria-label="Apri dettaglio"
        >
          Dettaglio →
        </button>
      </Td>
    </tr>
  );
}

/**
 * UrgencyBadge
 * - ALTA: rojo con pulso y latencia escalonada
 * - BASSA: verde suave
 * - RITIRATA: gris
 */
function UrgencyBadge({ urgency, index }: { urgency: Urgency; index: number }) {
  const map = {
    ALTA: {
      bg: "bg-red-100",
      dot: "bg-red-500",
      text: "text-red-700",
      ring: "bg-red-400",
      delayMs: index * 180,
    },
    BASSA: {
      bg: "bg-emerald-100",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
      ring: "bg-emerald-400",
      delayMs: 0,
    },
    RITIRATA: {
      bg: "bg-gray-100",
      dot: "bg-gray-400",
      text: "text-gray-700",
      ring: "bg-gray-300",
      delayMs: 0,
    },
  } as const;

  const cfg = map[urgency];

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text} relative`}
    >
      <span className="relative flex h-2.5 w-2.5">
        {urgency === "ALTA" && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${cfg.ring} opacity-75 motion-safe:animate-ping`}
            style={{ animationDelay: `${cfg.delayMs}ms` }}
            aria-hidden
          />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${cfg.dot}`}
        />
      </span>
      <span className="font-medium">{urgency}</span>
    </span>
  );
}
