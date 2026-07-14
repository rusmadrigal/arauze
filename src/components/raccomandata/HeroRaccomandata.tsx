// src/components/raccomandata/HeroRaccomandata.tsx
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
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
        Raccomandata codice {code}: {heroTitleSuffix}
      </h1>

      <p className="mt-2 text-gray-600 max-w-2xl leading-relaxed">{heroSubtitle}</p>
    </section>
  );
}
