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

  return (
    <section
      className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
      aria-labelledby="cmp-frequent-codes-heading"
    >
      <h2
        id="cmp-frequent-codes-heading"
        className="text-base font-semibold text-gray-900"
      >
        {heading}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {list.map((code, i) => {
          const hasLanding = publishedCodes.has(code);
          return (
            <li key={`${code}-${i}`}>
              {hasLanding ? (
                <Link
                  href={`/raccomandata/${code}`}
                  className="inline-flex items-center rounded-full border border-[#2F66D5]/30 bg-[#2F66D5]/8 px-3 py-1 text-sm font-semibold text-[#2552AD] transition hover:border-[#2F66D5]/50 hover:bg-[#2F66D5]/15"
                >
                  Raccomandata {code}
                </Link>
              ) : (
                <span
                  className="inline-flex cursor-default items-center rounded-full border border-dashed border-gray-300 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600"
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
