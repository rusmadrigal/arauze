// src/components/raccomandata/HeroRaccomandata.tsx
import Link from "next/link";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE } from "sanity/lib/queries/raccomandata";

type Props = { code?: string };

export default async function HeroRaccomandata({ code }: Props) {
  const safeCode = (code ?? "").trim(); // ← SIEMPRE string
  // ← SIEMPRE envía el objeto { code: safeCode }
  const data = await sanityClient.fetch(RACCOMANDATA_BY_CODE, { code: safeCode });

  const heroTitleSuffix = data?.heroTitleSuffix ?? "Guida Completa e Cosa Fare";
  const heroSubtitle =
    data?.heroSubtitle ??
    "Scopri cosa significa il codice, chi può essere il mittente e come comportarti passo per passo per ritirare la tua raccomandata in tempo.";

  return (
    <section className="mt-4 md:mt-6 text-center md:text-left">
      <nav aria-label="breadcrumb" className="text-sm text-gray-400 mb-3 md:mb-4">
        <Link href="/" className="hover:underline">Home</Link>{" "}
        / <span className="text-gray-500">Raccomandata Market {safeCode}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
        Raccomandata Market {safeCode}: {heroTitleSuffix}
      </h1>

      <p className="mt-2 text-gray-600 max-w-2xl">{heroSubtitle}</p>
    </section>
  );
}
