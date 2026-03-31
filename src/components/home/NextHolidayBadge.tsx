import { CalendarDays } from "lucide-react";
import {
  formatItalianHolidayDate,
  getNextHolidayIT,
  type NextItalianHoliday,
} from "@/lib/helpers/getNextHolidayIT";

/** Spazio riservato se API assente (evita salti). */
const WRAPPER_MIN = "min-h-10";

export default async function NextHolidayBadge() {
  let holiday: NextItalianHoliday | null;
  try {
    holiday = await getNextHolidayIT();
  } catch (err) {
    console.error("[NextHolidayBadge]", err);
    return <div className={WRAPPER_MIN} aria-hidden />;
  }

  if (!holiday) {
    return <div className={WRAPPER_MIN} aria-hidden />;
  }

  const dateLabel = formatItalianHolidayDate(holiday.date);

  return (
    <div className="w-full space-y-2">
      <div
        className="holiday-badge-latent max-w-full rounded-lg border border-sky-200/70 bg-linear-to-br from-sky-50/90 to-slate-50/75 px-2.5 py-2 ring-1 ring-sky-200/40 sm:px-3 sm:py-2"
        role="status"
        aria-live="polite"
      >
        <div className="flex gap-1.5 sm:gap-2">
          <CalendarDays
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 sm:h-4 sm:w-4"
            strokeWidth={2}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[0.8125rem] leading-tight text-slate-600 sm:text-sm">
              Il prossimo festivo sarà:
            </p>
            <p className="mt-0.5 text-[0.8125rem] leading-tight text-slate-800 sm:text-sm">
              <strong className="font-semibold">{holiday.localName}</strong>
              <span className="font-normal text-slate-500"> — </span>
              <time dateTime={holiday.date} className="font-medium text-slate-700">
                {dateLabel}
              </time>
            </p>
          </div>
        </div>
      </div>
      <p className="max-w-xl text-xs leading-relaxed text-slate-500 sm:text-[0.8125rem]">
        Nei giorni festivi nazionali{" "}
        <span className="font-medium text-slate-600">Poste Italiane</span> non effettua
        consegne: uffici postali chiusi e nessun recapito in giornata — utile da tenere
        presente per ritiri e raccomandate.
      </p>
    </div>
  );
}
