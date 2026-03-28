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
import FeedbackRaccomandata from "@/components/raccomandata/FeedbackRaccomandata";
import RaccomandataPieChart from "@/components/raccomandata/RaccomandataPieChart";
import { getRaccomandataChart } from "@/lib/sanity/raccomandataChart";

import SEOJsonLd, {
  type RaccomandataPage as SeoRaccomandataPage,
} from "@/components/seo/SEOJsonLd";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE } from "sanity/lib/queries/raccomandata";
import type { TypedObject } from "@portabletext/types";
import AdSenseAd from "@/components/ads/AdSenseAd";

export const dynamic = "force-dynamic";
export const revalidate = 0;


// -----------------------------
// UTILITIES
// -----------------------------

const norm = (v?: string | null): string => (v ?? "").trim();


// Convert Portable Text → plain text
type PortableTextChild = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] };

function ptToPlainText(input: unknown): string {
  if (!input) return "";
  if (typeof input === "string") return input.trim();

  if (Array.isArray(input)) {
    const blocks = input as PortableTextBlock[];

    return blocks
      .map((block) => {
        if (block?._type !== "block" || !Array.isArray(block.children)) return "";
        return block.children.map((c) => c.text || "").join("");
      })
      .join("\n")
      .trim();
  }

  return "";
}


// -----------------------------
// TYPES
// -----------------------------

type Priority = "ALTA" | "MEDIA" | "BASSA";

type StepDoc = { title?: string | null; description?: unknown };
type DetailDoc = { title?: string | null; body?: unknown };
type FAQItemDoc = { q?: string | null; a?: unknown };

type RaccomandataPageDoc = {
  code: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitleSuffix?: string | null;
  heroSubtitle?: string | null;
  mittente?: string | null;
  tipologia?: string | null;
  stato?: string | null;
  priority?: Priority | null;
  steps?: StepDoc[] | null;
  details?: DetailDoc[] | null;
  alertBox?: { enabled?: boolean; title?: string; body?: unknown; icon?: string } | null;
  assistenza?: {
    title?: string | null;
    cards?: { icon?: string | null; title?: string | null; description?: unknown }[] | null;
  } | null;
  faq?: {
    title?: string | null;
    items?: FAQItemDoc[] | null;
  } | null;
  authorBox?: { name?: string; avatarUrl?: string; updatedAt?: string };
  _createdAt?: string | null;
  _updatedAt?: string | null;
};

type UIStep = { title: string; description: string | TypedObject[] | undefined };
type UIDetail = { title: string; body: string | TypedObject[] | undefined };
type AssistenzaData = {
  title?: string;
  cards?: { icon?: string; title?: string; description?: string }[];
};
type FAQData = { title?: string; items?: { q?: string; a?: string }[] };

type FeedbackDoc = {
  _id: string;
  nome?: string | null;
  citta?: string | null;
  codice?: string | null;
  categoria?: string | null;
  commento?: string | null;
  createdAt?: string | null;
};

type UIFeedback = {
  _id: string;
  nome: string;
  citta: string;
  codice: string;
  categoria: string;
  commento: string;
  createdAt?: string;
};


// -----------------------------
// NORMALIZERS
// -----------------------------

function normalizePortableContent(input: unknown): string | TypedObject[] | undefined {
  if (!input) return undefined;
  if (typeof input === "string") return input.trim() || undefined;
  if (Array.isArray(input)) return input.length ? (input as TypedObject[]) : undefined;
  if (typeof input === "object") return [input as TypedObject];
  return undefined;
}

function normalizeMeta(input: RaccomandataPageDoc, fallbackCode: string) {
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

function normalizeStepsForUI(items?: StepDoc[] | null): UIStep[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((s): UIStep | null => {
      const title = norm(s?.title);
      const description = normalizePortableContent(s?.description);
      if (!title && !description) return null;
      return { title, description };
    })
    .filter((s): s is UIStep => s !== null);
}

function normalizeDetails(items?: DetailDoc[] | null): UIDetail[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((d): UIDetail | null => {
      const title = norm(d?.title);
      const body = normalizePortableContent(d?.body);

      const hasBody =
        typeof body === "string"
          ? body.trim().length > 0
          : Array.isArray(body)
            ? body.length > 0
            : false;

      if (!title && !hasBody) return null;

      return { title, body };
    })
    .filter((d): d is UIDetail => d !== null);
}

function normalizeAssistenza(
  a?:
    | {
      title?: string | null;
      cards?: {
        icon?: string | null;
        title?: string | null;
        description?: unknown;
      }[] | null;
    }
    | null
): AssistenzaData | undefined {
  if (!a) return undefined;

  const cards = Array.isArray(a.cards)
    ? a.cards
      .map((c): { icon?: string; title?: string; description?: string } | null => {
        const icon = c?.icon ?? undefined;
        const title = norm(c?.title) || undefined;
        const description = ptToPlainText(c?.description) || undefined;

        if (!icon && !title && !description) return null;

        return { icon, title, description };
      })
      .filter((c): c is { icon?: string; title?: string; description?: string } => c !== null)
    : undefined;

  return {
    title: norm(a.title) || undefined,
    cards,
  };
}


function normalizeFAQ(
  f?:
    | {
      title?: string | null;
      items?: { q?: string | null; a?: unknown }[] | null;
    }
    | null
): FAQData | undefined {
  if (!f) return undefined;

  const items = Array.isArray(f.items)
    ? f.items
      .map((it): { q?: string; a?: string } | null => {
        const q = norm(it?.q) || undefined;
        const a = ptToPlainText(it?.a) || undefined;
        if (!q && !a) return null;
        return { q, a };
      })
      .filter((it): it is { q?: string; a?: string } => it !== null)
    : undefined;

  return {
    title: norm(f.title) || undefined,
    items,
  };
}


function normalizeFeedback(docs: FeedbackDoc[], fallbackCodice: string): UIFeedback[] {
  return docs
    .map((doc): UIFeedback | null => {
      const nome = norm(doc.nome) || "Utente";
      const citta = norm(doc.citta);
      const codice = norm(doc.codice) || fallbackCodice;
      const categoria = norm(doc.categoria);
      const commento = (doc.commento ?? "").trim();

      if (!commento) return null;

      return {
        _id: doc._id,
        nome,
        citta,
        codice,
        categoria,
        commento,
        createdAt: doc.createdAt ?? undefined,
      };
    })
    .filter((f): f is UIFeedback => f !== null);
}


// -----------------------------
// METADATA
// -----------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code?: string }>;
}): Promise<Metadata> {
  const { code: raw } = await params;
  const code = (raw ?? "").trim();

  const page = await sanityClient.fetch<RaccomandataPageDoc>(
    RACCOMANDATA_BY_CODE,
    { code },
    { cache: "no-store", next: { revalidate: 0 } }
  );

  const codice = (page?.code ?? code).trim();

  const base = codice ? `Raccomandata ${codice}` : "Raccomandata";
  const title =
    page?.metaTitle?.trim()
      ? page.metaTitle
      : page?.heroTitleSuffix
        ? `${base} – ${page.heroTitleSuffix}`
        : base;

  const description =
    page?.metaDescription?.trim()
      ? page.metaDescription
      : page?.heroSubtitle ?? `Dettagli per il codice ${codice}`;

  return {
    title,
    description,
    alternates: { canonical: `/raccomandata/${codice.toLowerCase()}` },
  };
}


// -----------------------------
// PAGE COMPONENT
// -----------------------------

export default async function RaccomandataPage({
  params,
}: {
  params: Promise<{ code?: string }>;
}) {
  const { code: raw } = await params;
  const code = (raw ?? "").trim();

  const page = await sanityClient.fetch<RaccomandataPageDoc>(
    RACCOMANDATA_BY_CODE,
    { code },
    { cache: "no-store", next: { revalidate: 0 } }
  );

  if (!page) notFound();

  const codice = (page.code ?? code).trim();
  const codiceLower = codice.toLowerCase();

  const chartData = await getRaccomandataChart(codice);

  // -----------------------------
  // FIXED FEEDBACK QUERY
  // EXACT MATCH ONLY
  // -----------------------------
  const feedbackDocs = await sanityClient.fetch<FeedbackDoc[]>(
    `*[
      _type == "raccomandataFeedback" &&
      approved == true &&
      lower(codice) == $codiceLower
    ] | order(createdAt desc){
      _id,
      nome,
      citta,
      codice,
      categoria,
      commento,
      createdAt
    }`,
    { codiceLower },
    { cache: "no-store", next: { revalidate: 0 } }
  );

  const uiFeedback = normalizeFeedback(feedbackDocs ?? [], codice);

  const pageMeta = normalizeMeta(page, codice);
  const uiSteps = normalizeStepsForUI(page.steps);
  const uiDetails = normalizeDetails(page.details);
  const uiAssistenza = normalizeAssistenza(page.assistenza);
  const uiFAQ = normalizeFAQ(page.faq);

  const uiAlertBox = page.alertBox
    ? { ...page.alertBox, body: ptToPlainText(page.alertBox.body) }
    : undefined;

  return (
    <main className="mx-auto max-w-5xl px-4">
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

          <AdSenseAd adSlot="2025677270" className="my-6" />

          <AuthorBox data={page.authorBox} />

          <FeedbackRaccomandata feedback={uiFeedback} />

          <AdSenseAd adSlot="2025677270" className="my-6" />

          {chartData?.slices?.length ? (
            <RaccomandataPieChart
              slices={chartData.slices}
              title={
                chartData.titolo ??
                "Distribuzione delle categorie per questo codice"
              }
            />
          ) : null}

          <StepsRaccomandata steps={uiSteps} />

          <AdSenseAd adSlot="2025677270" className="my-6" />

          <DetailsSection details={uiDetails} />

          <AlertBox data={uiAlertBox} />

          <AssistenzaSection data={uiAssistenza} />

          <FAQSection data={uiFAQ} />

        </div>
      </div>

      <SEOJsonLd page={pageMeta as SeoRaccomandataPage} code={codice} />
    </main>
  );
}
