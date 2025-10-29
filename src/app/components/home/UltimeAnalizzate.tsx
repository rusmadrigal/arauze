import React from "react";

type Urgency = "ALTA" | "BASSA" | "RITIRATA";
type Stato = "IN ATTESA" | "RITIRATA" | "RECAPITATA" | string;

export type RaccomandataItem = {
  code: string;
  sender: string;
  urgency: Urgency;
  state: Stato;
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

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <Th>Regumatlada</Th>
              <Th>Urgenza</Th>
              <Th>Stato</Th>
              <Th>{null}</Th>
            </tr>
          </thead>

          <tbody className="divide-y">
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
  const { code, sender, urgency, state } = item;

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
        <StateBadge state={state} />
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
 * - ALTA: rojo con pulso y latencia escalonada por fila (index)
 * - BASSA: verde suave, sin animación
 * - RITIRATA: gris
 */
function UrgencyBadge({ urgency, index }: { urgency: Urgency; index: number }) {
  const map = {
    ALTA: {
      bg: "bg-red-100",
      dot: "bg-red-500",
      text: "text-red-700",
      ring: "bg-red-400",
      // Latencia escalonada: 0ms, 180ms, 360ms, ...
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
        {/* Círculo de pulso detrás: solo para ALTA */}
        {urgency === "ALTA" && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${cfg.ring} opacity-75 motion-safe:animate-ping`}
            style={{ animationDelay: `${cfg.delayMs}ms` }}
            aria-hidden
          />
        )}
        {/* Punto sólido al frente */}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
      </span>
      <span className="font-medium">{urgency}</span>
    </span>
  );
}

function StateBadge({ state }: { state: Stato }) {
  const normalized = state.toUpperCase();

  const styles =
    normalized === "IN ATTESA"
      ? "bg-amber-50 text-amber-700"
      : normalized === "RECAPITATA"
      ? "bg-emerald-50 text-emerald-700"
      : normalized === "RITIRATA"
      ? "bg-gray-100 text-gray-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${styles}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current/60 mr-2" />
      <span className="font-medium">{state}</span>
    </span>
  );
}

/* ---------- Ejemplo de uso ---------- */
// Coloca esto donde renderices la sección:
// <UltimeRaccomandateAnalizzate
//   items={[
//     { code: "573", sender: "AGENZIA DEI…", urgency: "ALTA",   state: "IN ATTESA" },
//     { code: "573", sender: "AGENZIA DEI…", urgency: "BASSA",  state: "IN ATTESA" },
//     { code: "573", sender: "AGENZIA DEI…", urgency: "RITIRATA", state: "RITIRATA" },
//   ]}
// />
