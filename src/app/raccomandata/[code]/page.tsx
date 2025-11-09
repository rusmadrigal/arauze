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

// ✅ Tipo actualizado (incluye SEO + priority)
type Priority = "ALTA" | "MEDIA" | "BASSA";
type RaccomandataPageDoc = {
  code: string;
  // SEO
  metaTitle?: string | null;
  metaDescription?: string | null;

  // HERO
  heroTitleSuffix?: string;
  heroSubtitle?: string;

  // INFOBOX
  mittente?: string;
  tipologia?: string;
  stato?: string;
  priority?: Priority;

  // SECTIONS
  steps?: { title: string; description: string }[];
  details?: { title: string; body: string }[];
  alertBox?: { enabled?: boolean; title?: string; body?: string; icon?: string };
  assistenza?: {
    title?: string;
    cards?: { icon?: string; title?: string; description?: string }[];
  };
  faq?: { title?: string; items?: { q?: string; a?: string }[] };
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
    { cache: "no-store", next: { revalidate: 0, tags: [`raccomandata:${code}`] } }
  );

  const codice = (page?.code ?? code).trim();
  const titleBase = codice ? `Raccomandata ${codice}` : "Raccomandata";

  const title =
    page?.metaTitle && page.metaTitle.trim().length > 0
      ? page.metaTitle
      : page?.heroTitleSuffix
        ? `${titleBase} – ${page.heroTitleSuffix}`
        : titleBase;

  const description =
    page?.metaDescription && page.metaDescription.trim().length > 0
      ? page.metaDescription
      : page?.heroSubtitle
        ? page.heroSubtitle
        : (codice ? `Dettagli per il codice ${codice}` : "Dettagli raccomandata");

  // ✅ Canonical relativo; Next lo hará absoluto usando metadataBase en app/layout.tsx
  const canonical = `/raccomandata/${codice}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
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
    { cache: "no-store", next: { revalidate: 0, tags: [`raccomandata:${code}`] } }
  );

  if (!page) notFound();

  const codice = (page?.code ?? code).trim();

  return (
    <main className="mx-auto max-w-5xl px-4" role="main">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <div className="space-y-8 md:space-y-10">
          <TopNav />
          <HeroRaccomandata code={codice} pageMeta={page} />
          <InfoBoxRaccomandata
            code={codice}
            mittente={page?.mittente}
            tipologia={page?.tipologia}
            stato={page?.stato}
            priority={page?.priority as Priority | undefined}
          />
          <AuthorBox />
          <StepsRaccomandata steps={page?.steps} />
          <DetailsSection details={page?.details} />
          <AlertBox data={page?.alertBox} />
          <AssistenzaSection data={page?.assistenza} />
          <FAQSection data={page?.faq} />
          <AdditionalInfoBanner />
        </div>
      </div>
    </main>
  );
}
