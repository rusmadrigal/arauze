import type { LucideIcon } from "lucide-react";
import { CalendarDays, ClipboardList, ShieldCheck, Users } from "lucide-react";

function formatItDate(iso?: string | null): string | null {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return null;
  }
}

type Props = {
  updatedAt?: string | null;
  createdAt?: string | null;
  reportCount?: number;
  feedbackCount?: number;
};

function StatCard({
  icon: Icon,
  label,
  value,
  subline,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  subline?: string;
}) {
  const summary = subline ? `${label}: ${value}. ${subline}` : `${label}: ${value}`;

  return (
    <li className="min-w-0">
      <div
        className="flex h-full min-h-23 gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm sm:min-h-0 sm:p-4"
        role="group"
        aria-label={summary}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[11px]">
            {label}
          </p>
          <p className="mt-1 text-[11px] font-normal leading-snug text-slate-700 sm:text-xs">
            {value}
          </p>
          {subline ? (
            <p className="mt-0.5 text-[10px] font-normal leading-snug text-slate-500 sm:text-[11px]">
              {subline}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

/**
 * Trasparenza e contesto: riduce la percezione di “dati inventati” e allinea le aspettative.
 */
export default function RaccomandataTrustPanel({
  updatedAt,
  createdAt,
  reportCount = 0,
  feedbackCount = 0,
}: Props) {
  const updated = formatItDate(updatedAt) ?? formatItDate(createdAt);
  const created = formatItDate(createdAt);
  const hasDateCard = Boolean(updated);

  const feedbackValue =
    feedbackCount === 0
      ? "Ancora nessuno"
      : feedbackCount === 1
        ? "1 commento"
        : `${feedbackCount} commenti`;

  const reportValue =
    reportCount === 0
      ? "Nessun invio"
      : reportCount === 1
        ? "1 invio anonimo"
        : `${reportCount} invii anonimi`;

  // Stessa larghezza per tutte le card su desktop — nessun col-span
  const gridClass = hasDateCard
    ? "m-0 grid list-none grid-cols-1 gap-3 p-0 sm:gap-4 md:grid-cols-3"
    : "m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4";

  return (
    <aside
      className="rounded-2xl border border-slate-200/80 bg-linear-to-b from-slate-50/95 to-slate-100/40 px-4 py-4 shadow-sm md:px-6 md:py-5"
      aria-label="Informazioni sulla scheda e sulle fonti"
    >
      <div className="flex gap-3 sm:gap-4">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80 sm:h-11 sm:w-11">
          <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 sm:text-base">
            Informazioni orientative
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Questa pagina sintetizza dati pubblici, pattern ricorrenti sui codici e{" "}
            <span className="text-slate-800">
              commenti degli utenti approvati e visibili qui sotto
            </span>
            , più eventuali{" "}
            <span className="text-slate-800">
              invii anonimi dal modulo in fondo alla pagina
            </span>
            . Non sostituisce l&apos;avviso di ritiro, il piego o le comunicazioni ufficiali del
            mittente: verifica sempre su documenti e canali istituzionali.
          </p>
        </div>
      </div>

      <div className="my-4 h-px w-full bg-slate-200/90 sm:my-5" aria-hidden />

      <ul className={gridClass}>
        {hasDateCard ? (
          <StatCard
            icon={CalendarDays}
            label="Ultimo aggiornamento"
            value={updated!}
            subline={
              created && created !== updated ? `Prima pubblicazione: ${created}` : undefined
            }
          />
        ) : null}

        <StatCard icon={Users} label="Commenti visibili" value={feedbackValue} />

        <StatCard
          icon={ClipboardList}
          label="Form anonimo (in basso)"
          value={reportValue}
        />
      </ul>
    </aside>
  );
}
