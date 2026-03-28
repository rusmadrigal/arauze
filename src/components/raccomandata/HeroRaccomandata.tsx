// src/components/raccomandata/HeroRaccomandata.tsx
import Link from "next/link";

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
  const heroTitleSuffix = pageMeta.heroTitleSuffix ?? "Guida Completa e Cosa Fare";
  const heroSubtitle =
    pageMeta.heroSubtitle ??
    "Scopri cosa significa il codice, chi può essere il mittente e come comportarti passo per passo per ritirare la tua raccomandata in tempo.";

  return (
    <section className="mt-4 md:mt-6 text-center md:text-left">
      <nav aria-label="Percorso di navigazione" className="mb-3 md:mb-4">
        <ol className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-sm text-gray-500 md:justify-start">
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
          <li className="font-medium text-gray-800" aria-current="page">
            Codice {code}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
        Raccomandata codice {code}: {heroTitleSuffix}
      </h1>

      <p className="mt-2 text-gray-600 max-w-2xl leading-relaxed">{heroSubtitle}</p>
    </section>
  );
}
