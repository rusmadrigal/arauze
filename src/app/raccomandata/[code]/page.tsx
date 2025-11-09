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

// SEO JSON-LD
import SEOJsonLd, { type RaccomandataPage as SeoRaccomandataPage } from "@/components/seo/SEOJsonLd";


import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE } from "sanity/lib/queries/raccomandata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ================= Tipos base (desde Sanity) =================
type Priority = "ALTA" | "MEDIA" | "BASSA";
type StepDoc = { title?: string | null; description?: string | null };
type DetailDoc = { title?: string | null; body?: string | null };
type FAQItemDoc = { q?: string | null; a?: string | null };
type RaccomandataPageDoc = {
  code: string;

  // SEO
  metaTitle?: string | null;
  metaDescription?: string | null;

  // HERO
  heroTitleSuffix?: string | null;
  heroSubtitle?: string | null;

  // INFOBOX
  mittente?: string | null;
  tipologia?: string | null;
  stato?: string | null;
  priority?: Priority | null;

  // SECCIONES
  steps?: StepDoc[] | null;
  details?: DetailDoc[] | null;
  alertBox?: { enabled?: boolean; title?: string; body?: string; icon?: string } | null;
  assistenza?: {
    title?: string | null;
    cards?: { icon?: string | null; title?: string | null; description?: string | null }[] | null;
  } | null;
  faq?: { title?: string | null; items?: FAQItemDoc[] | null } | null;

  _createdAt?: string | null;
  _updatedAt?: string | null;
} | null;

// ================= Normalizadores (eliminan null/undefined) =================
const norm = (v?: string | null) => (v ?? "").trim();

function normalizeMeta(input: NonNullable<RaccomandataPageDoc>, fallbackCode: string) {
  return {
    code: (input.code ?? fallbackCode).trim(),
    metaTitle: input.metaTitle ?? undefined,
    metaDescription: input.metaDescription ?? undefined,
    heroTitleSuffix: input.heroTitleSuffix ?? undefined,
    heroSubtitle: input.heroSubtitle ?? undefined,
    mittente: input.mittente ?? undefined,
    tipologia: input.tipologia ?? undefined,
    stato: input.stato ?? undefined,
    priority: input.priority ?? undefined,
  };
}

function normalizeSteps(items?: StepDoc[] | null): { title: string; description: string }[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((s) => ({ title: norm(s?.title), description: norm(s?.description) }))
    .filter((s) => s.title.length > 0 || s.description.length > 0);
}

function normalizeDetails(items?: DetailDoc[] | null): { title: string; body: string }[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((d) => ({ title: norm(d?.title), body: norm(d?.body) }))
    .filter((d) => d.title.length > 0 || d.body.length > 0);
}

// Tipos que esperan los componentes (forma estricta, sin null)
type AssistenzaData = {
  title?: string;
  cards?: { icon?: string; title?: string; description?: string }[];
};
type FAQData = { title?: string; items?: { q?: string; a?: string }[] };

function normalizeAssistenza(
  a?: { title?: string | null; cards?: { icon?: string | null; title?: string | null; description?: string | null }[] | null } | null
): AssistenzaData | undefined {
  if (!a) return undefined;
  const cards = Array.isArray(a.cards)
    ? a.cards
      .map((c) => ({
        icon: c?.icon ?? undefined,
        title: norm(c?.title) || undefined,
        description: norm(c?.description) || undefined,
      }))
      // si todas las props quedan undefined, filtramos
      .filter((c) => c.icon || c.title || c.description)
    : undefined;
  return {
    title: norm(a.title) || undefined,
    cards,
  };
}

function normalizeFAQ(
  f?: { title?: string | null; items?: { q?: string | null; a?: string | null }[] | null } | null
): FAQData | undefined {
  if (!f) return undefined;
  const items = Array.isArray(f.items)
    ? f.items
      .map((it) => ({ q: norm(it?.q) || undefined, a: norm(it?.a) || undefined }))
      .filter((it) => it.q || it.a)
    : undefined;
  return { title: norm(f.title) || undefined, items };
}

// ================= Metadata =================
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

// ================= Página =================
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

  const codice = (page.code ?? code).trim();

  // Para HeroRaccomandata (sin nulls)
  const pageMeta = normalizeMeta(page, codice);

  // Para SEOJsonLd (tolera nulls)
  const seoPage: SeoRaccomandataPage = {
    heroTitleSuffix: page.heroTitleSuffix ?? null,
    metaTitle: page.metaTitle ?? null,
    heroSubtitle: page.heroSubtitle ?? null,
    metaDescription: page.metaDescription ?? null,
    steps: page.steps ?? null,
    faq: page.faq ?? null,
    details: page.details ?? null,
    mittente: page.mittente ?? null,
    tipologia: page.tipologia ?? null,
    _createdAt: page._createdAt ?? null,
    _updatedAt: page._updatedAt ?? null,
  };

  // Normalizados estrictos para componentes que exigen string / arrays definidos
  const uiSteps = normalizeSteps(page.steps);
  const uiDetails = normalizeDetails(page.details);
  const uiAssistenza = normalizeAssistenza(page.assistenza);
  const uiFAQ = normalizeFAQ(page.faq);

  return (
    <main className="mx-auto max-w-5xl px-4" role="main">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <div className="space-y-8 md:space-y-10">
          <TopNav />
          <HeroRaccomandata code={codice} pageMeta={pageMeta} />
          <InfoBoxRaccomandata
            code={codice}
            mittente={page.mittente ?? undefined}
            tipologia={page.tipologia ?? undefined}
            stato={page.stato ?? undefined}
            priority={page.priority ?? undefined}
          />
          <AuthorBox />
          <StepsRaccomandata steps={uiSteps} />
          <DetailsSection details={uiDetails} />
          <AlertBox data={page.alertBox ?? undefined} />
          {/* ✅ ahora sin nulls en cards */}
          <AssistenzaSection data={uiAssistenza} />
          {/* ✅ items normalizados */}
          <FAQSection data={uiFAQ} />
          <AdditionalInfoBanner />
        </div>
      </div>

      {/* JSON-LD dinámico SEO */}
      <SEOJsonLd page={seoPage} code={codice} />
    </main>
  );
}
