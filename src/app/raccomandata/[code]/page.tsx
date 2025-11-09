// src/app/raccomandata/[code]/page.tsx
import React from "react";
import TopNav from "@/components/ui/TopNav";
import HeroRaccomandata from "@/components/raccomandata/HeroRaccomandata";
import InfoBoxRaccomandata from "@/components/raccomandata/InfoBoxRaccomandata";
import AuthorBox from "@/components/raccomandata/AuthorBox";
import StepsRaccomandata from "@/components/raccomandata/StepsRaccomandata";
import DetailsSection from "@/components/raccomandata/DetailsSection";
import AlertBox from "@/components/raccomandata/AlertBox";
import AssistenzaSection from "@/components/raccomandata/AssistenzaSection";
import FAQSection from "@/components/raccomandata/FAQSection";
import AdditionalInfoBanner from "@/components/raccomandata/AdditionalInfoBanner";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE } from "sanity/lib/queries/raccomandata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ✅ Tipo actualizado
type RaccomandataPageDoc = {
  code: string;
  heroTitleSuffix?: string;
  heroSubtitle?: string;
  mittente?: string;
  tipologia?: string;
  stato?: string;
  steps?: { title: string; description: string }[];
  details?: { title: string; body: string }[];
  alertBox?: { enabled?: boolean; title?: string; body?: string; icon?: string };
  assistenza?: {
    title?: string;
    cards?: { icon?: string; title?: string; description?: string }[];
  };
} | null;

// Next 15: params es Promise
export async function generateMetadata(
  { params }: { params: Promise<{ code?: string }> }
): Promise<Metadata> {
  const { code: raw } = await params;
  const code = (raw ?? "").trim();

  const page = await sanityClient.fetch<RaccomandataPageDoc>(
    RACCOMANDATA_BY_CODE,
    { code },
    {
      cache: "no-store",
      next: { revalidate: 0, tags: [`raccomandata:${code}`] },
    }
  );

  const titleBase = code ? `Raccomandata ${code}` : "Raccomandata";
  return {
    title: page?.heroTitleSuffix
      ? `${titleBase} – ${page.heroTitleSuffix}`
      : titleBase,
    description:
      page?.heroSubtitle ??
      (code ? `Dettagli per il codice ${code}` : "Dettagli raccomandata"),
  };
}

export default async function RaccomandataPage(
  { params }: { params: Promise<{ code?: string }> }
) {
  const { code: raw } = await params;
  const code = (raw ?? "").trim();

  const page = await sanityClient.fetch<RaccomandataPageDoc>(
    RACCOMANDATA_BY_CODE,
    { code },
    {
      cache: "no-store",
      next: { revalidate: 0, tags: [`raccomandata:${code}`] },
    }
  );

  if (!page) {
    notFound();
  }

  // Usamos el code del doc si existe; así “Codice” sale del CMS
  const codice = (page?.code ?? code).trim();

  return (
    <main className="mx-auto max-w-5xl px-4" role="main">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <div className="space-y-8 md:space-y-10">
          <TopNav />

          {/* Hero (usa code + hero fields del mismo doc) */}
          <HeroRaccomandata code={codice} pageMeta={page} />

          {/* InfoBox (recibe todo desde el doc unificado) */}
          <InfoBoxRaccomandata
            code={codice}
            mittente={page?.mittente}
            tipologia={page?.tipologia}
            stato={page?.stato}
          // urgency opcional: si querés derivarla desde `stato`, hazlo aquí
          // urgency={/ritiro|giacenza/i.test(page?.stato ?? "") ? "ALTA" : "NONE"}
          />

          <AuthorBox />
          <StepsRaccomandata steps={page?.steps} />
          <DetailsSection details={page?.details} />
          <AlertBox data={page?.alertBox} />
          <AssistenzaSection data={page?.assistenza} />
          <FAQSection />
          <AdditionalInfoBanner />
        </div>
      </div>
    </main>
  );
}
