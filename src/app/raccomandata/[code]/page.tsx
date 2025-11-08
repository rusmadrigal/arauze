// app/raccomandata/[code]/page.tsx
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

type RaccomandataPageMeta = {
  code: string;
  heroTitleSuffix?: string;
  heroSubtitle?: string;
} | null;

export async function generateMetadata(
  { params }: { params: Promise<{ code?: string }> }
): Promise<Metadata> {
  const { code: raw } = await params;
  const code = (raw ?? "").trim();

  // Podés decidir no bloquear el build si no existe; dejamos metadatos básicos
  const pageMeta = await sanityClient.fetch<RaccomandataPageMeta>(
    RACCOMANDATA_BY_CODE,
    { code },
    { cache: "no-store", next: { revalidate: 0, tags: [`raccomandata:${code}`] } }
  );

  const titleBase = code ? `Raccomandata ${code}` : "Raccomandata";
  return {
    title: pageMeta?.heroTitleSuffix
      ? `${titleBase} – ${pageMeta.heroTitleSuffix}`
      : titleBase,
    description:
      pageMeta?.heroSubtitle ??
      (code ? `Dettagli per il codice ${code}` : "Dettagli raccomandata"),
  };
}

export default async function RaccomandataPage(
  { params }: { params: Promise<{ code?: string }> }
) {
  const { code: raw } = await params;
  const code = (raw ?? "").trim();

  // 🔎 Verificación de existencia
  const pageMeta = await sanityClient.fetch<RaccomandataPageMeta>(
    RACCOMANDATA_BY_CODE,
    { code },
    { cache: "no-store", next: { revalidate: 0, tags: [`raccomandata:${code}`] } }
  );

  if (!pageMeta) {
    // 👉 Si no hay doc en Sanity, devolvemos 404
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4" role="main">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <div className="space-y-8 md:space-y-10">
          <TopNav />
          <HeroRaccomandata code={code} pageMeta={pageMeta} />
          <InfoBoxRaccomandata urgency="ALTA" />
          <AuthorBox />
          <StepsRaccomandata />
          <DetailsSection />
          <AlertBox />
          <AssistenzaSection />
          <FAQSection />
          <AdditionalInfoBanner />
        </div>
      </div>
    </main>
  );
}
