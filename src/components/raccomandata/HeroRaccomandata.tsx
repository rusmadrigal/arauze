// src/components/raccomandata/HeroRaccomandata.tsx
import Link from "next/link";
import { RACCOMANDATA_HERO_SUBTITLE_DEFAULT } from "@/lib/raccomandata/italianPublicCopy";

type RaccomandataPageMeta = {
  code: string;
  heroTitleSuffix?: string;
  heroSubtitle?: string;
};

type Props = {
  code: string;
  pageMeta: RaccomandataPageMeta;
};

export default function HeroRaccomandata({ code, pageMeta }: Props) {
  const heroTitleSuffix =
    pageMeta.heroTitleSuffix ?? "Guida pratica e verifiche consigliate (Italia)";
  const heroSubtitle = pageMeta.heroSubtitle ?? RACCOMANDATA_HERO_SUBTITLE_DEFAULT;

  return (
    <section className="mt-4 md:mt-6 text-center md:text-left">
      <nav aria-label="Percorso di navigazione" className="mb-3 md:mb-4">
        <ol className="rac-body-sm flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-gray-500 md:justify-start">
          <li>
            <Link href="/" className="text-gray-500 hover:text-[#2552AD] hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-gray-300">
            /
          </li>
          <li>
            <Link
              href="/raccomandata-market"
              className="text-gray-500 hover:text-[#2552AD] hover:underline"
            >
              Codici analizzati
            </Link>
          </li>
          <li aria-hidden className="text-gray-300">
            /
          </li>
          <li className="font-sans text-sm font-semibold text-gray-800" aria-current="page">
            Codice {code}
          </li>
        </ol>
      </nav>

      <h1 className="rac-page-h1">
        Raccomandata codice {code}: {heroTitleSuffix}
      </h1>

      <p className="rac-body mt-2 max-w-2xl">{heroSubtitle}</p>
    </section>
  );
}
