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
      <nav aria-label="breadcrumb" className="text-sm text-gray-400 mb-3 md:mb-4">
        <Link href="/" className="hover:underline">Home</Link>{" "}
        / <span className="text-gray-500">Raccomandata Market {code}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
        Raccomandata Market {code}: {heroTitleSuffix}
      </h1>

      <p className="mt-2 text-gray-600 max-w-2xl">{heroSubtitle}</p>
    </section>
  );
}
