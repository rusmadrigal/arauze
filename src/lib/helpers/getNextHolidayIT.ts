const IT_PUBLIC_HOLIDAYS_URL = (year: number) =>
  `https://date.nager.at/api/v3/PublicHolidays/${year}/IT`;

export type PublicHolidayRow = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
};

export type NextItalianHoliday = {
  date: string;
  localName: string;
};

const CACHE = { next: { revalidate: 86400 } } as const;

export async function fetchItalianHolidaysYear(
  year: number
): Promise<PublicHolidayRow[]> {
  const res = await fetch(IT_PUBLIC_HOLIDAYS_URL(year), {
    ...CACHE,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Public holidays ${year}: ${res.status}`);
  }
  const data = (await res.json()) as PublicHolidayRow[];
  return Array.isArray(data) ? data : [];
}

/** Mezzanotte locale (solo data, no fusi). */
function startOfDayFromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function todayStart(): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
}

/**
 * Data in italiano per copy SEO (es. "15 agosto").
 * Usa mezzogiorno locale per evitare shift di fuso su stringhe ISO.
 */
export function formatItalianHolidayDate(isoDate: string): string {
  try {
    const [y, m, d] = isoDate.split("-").map(Number);
    if (!y || !m || !d) return isoDate;
    const date = new Date(y, m - 1, d, 12, 0, 0, 0);
    if (Number.isNaN(date.getTime())) return isoDate;
    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
    }).format(date);
  } catch {
    return isoDate;
  }
}

/**
 * Prossimo giorno festivo nazionale in Italia (da oggi incluso).
 * Se non ce ne sono più nell’anno corrente, il primo dell’anno successivo.
 */
export async function getNextHolidayIT(): Promise<NextItalianHoliday | null> {
  const today = todayStart();
  const currentYear = today.getFullYear();

  let rows: PublicHolidayRow[];
  try {
    rows = await fetchItalianHolidaysYear(currentYear);
  } catch {
    return null;
  }

  const upcomingThisYear = rows
    .map((h) => ({ ...h, sort: startOfDayFromISO(h.date).getTime() }))
    .filter((h) => startOfDayFromISO(h.date) >= today)
    .sort((a, b) => a.sort - b.sort);

  if (upcomingThisYear.length > 0) {
    const h = upcomingThisYear[0];
    const label = safeHolidayLabel(h);
    if (!label || !h.date) return null;
    return { date: h.date, localName: label };
  }

  try {
    rows = await fetchItalianHolidaysYear(currentYear + 1);
  } catch {
    return null;
  }

  const sorted = rows
    .map((h) => ({ ...h, sort: startOfDayFromISO(h.date).getTime() }))
    .sort((a, b) => a.sort - b.sort);

  if (sorted.length === 0) return null;
  const h = sorted[0];
  const label = safeHolidayLabel(h);
  if (!label || !h.date) return null;
  return { date: h.date, localName: label };
}

function safeHolidayLabel(h: PublicHolidayRow): string {
  const a = typeof h.localName === "string" ? h.localName.trim() : "";
  const b = typeof h.name === "string" ? h.name.trim() : "";
  return a || b || "";
}
