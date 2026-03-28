import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export type RaccomandataRelatedItem = {
  code: string;
  mittente?: string | null;
  tipologia?: string | null;
};

function RelatedCard({ code, mittente, tipologia }: RaccomandataRelatedItem) {
  const href = `/raccomandata/${encodeURIComponent(code.trim())}`;
  const title = `Raccomandata ${code.trim()}`;
  const description =
    (mittente && mittente.trim()) ||
    (tipologia && tipologia.trim()) ||
    "Scheda con passi orientativi, FAQ e verifiche consigliate (Italia).";

  return (
    <li className="min-w-0">
      <Link
        href={href}
        className="group flex h-full min-h-18 flex-col gap-2 rounded-xl border border-gray-200/90 bg-gray-50/80 p-4 transition-colors hover:border-[#2552AD]/35 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2552AD] md:min-h-0 md:p-4"
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm ring-1 ring-gray-200/80 transition-colors group-hover:text-[#2552AD] group-hover:ring-[#2552AD]/25"
            aria-hidden
          >
            <Mail className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="rac-card-heading flex items-center gap-1">
              {title}
              <ArrowRight
                className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#2552AD]"
                aria-hidden
              />
            </span>
            <p className="rac-body-sm mt-1 md:text-base">{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

type Props = {
  pages: RaccomandataRelatedItem[];
};

/**
 * Link interni verso altre schede /raccomandata/[code] (cluster tematico, mobile first).
 */
export default function RaccomandataRelatedPages({ pages }: Props) {
  if (!pages.length) return null;

  return (
    <section
      className="border-t border-gray-200/90 pt-8 md:pt-10"
      aria-labelledby="raccomandata-related-heading"
    >
      <h2 id="raccomandata-related-heading" className="rac-section-h2">
        Altre raccomandate correlate
      </h2>
      <p className="rac-body mt-1.5">
        Altre schede Arauze sulle raccomandate tracciate in Italia: confronto tra codici e
        passi consigliati (sempre da incrociare con avviso e Poste Italiane).
      </p>
      <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:gap-4 md:grid-cols-3">
        {pages.map((p) => (
          <RelatedCard key={p.code} {...p} />
        ))}
      </ul>
    </section>
  );
}
