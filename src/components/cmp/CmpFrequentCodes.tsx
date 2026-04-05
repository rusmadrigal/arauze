import Link from "next/link";

type Props = {
  title?: string | null;
  /** Valori da Sanity (stringhe numeriche) */
  codes?: string[] | null;
  publishedCodes: Set<string>;
};

function normalizeCode(raw: string): string {
  return String(raw ?? "")
    .trim()
    .toLowerCase();
}

/**
 * Sezione “Codici frequenti”: link interno solo se esiste `raccomandataPage` per quel codice.
 */
export default function CmpFrequentCodes({ title, codes, publishedCodes }: Props) {
  const list = (codes ?? [])
    .map(normalizeCode)
    .filter(Boolean);

  if (list.length === 0) return null;

  const heading = (title ?? "").trim() || "Codici frequenti";

  const chipBase =
    "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm sm:min-h-10 sm:px-3.5 sm:py-1.5";

  return (
    <section
      className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-4"
      aria-labelledby="cmp-frequent-codes-heading"
    >
      <h2
        id="cmp-frequent-codes-heading"
        className="text-[1.05rem] font-semibold leading-snug text-gray-900 sm:text-base"
      >
        {heading}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2.5 sm:mt-4 sm:gap-2">
        {list.map((code, i) => {
          const hasLanding = publishedCodes.has(code);
          return (
            <li key={`${code}-${i}`} className="max-w-full">
              {hasLanding ? (
                <Link
                  href={`/raccomandata/${code}`}
                  className={`${chipBase} border border-[#2F66D5]/35 bg-[#2F66D5]/8 font-semibold text-[#2552AD] transition-colors active:bg-[#2F66D5]/20 hover:border-[#2F66D5]/55 hover:bg-[#2F66D5]/14`}
                >
                  Raccomandata {code}
                </Link>
              ) : (
                <span
                  className={`${chipBase} cursor-default border border-dashed border-gray-300 bg-gray-50 font-medium text-gray-600`}
                  title="Scheda non ancora pubblicata: il link apparirà quando sarà disponibile."
                >
                  Codice {code}
                  <span className="sr-only"> (scheda non ancora disponibile)</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
