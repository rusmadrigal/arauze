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

import SEOJsonLd from "@/components/seo/SEOJsonLd";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import {
  RACCOMANDATA_BY_CODE,
  RACCOMANDATA_RELATED_CANDIDATES,
  REPORTS_BY_CODE,
} from "sanity/lib/queries/raccomandata";
import type { TypedObject } from "@portabletext/types";
import AdSenseAd from "@/components/ads/AdSenseAd";
import RaccomandataTrustPanel from "@/components/raccomandata/RaccomandataTrustPanel";
import RaccomandataRelatedPages, {
  type RaccomandataRelatedItem,
} from "@/components/raccomandata/RaccomandataRelatedPages";
import { getSiteOrigin } from "@/lib/siteUrl";
import {
  raccomandataMetaDescriptionFallback,
  RACCOMANDATA_CHART_TITLE_FALLBACK,
} from "@/lib/raccomandata/italianPublicCopy";

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
    cards?:
      | { icon?: string | null; title?: string | null; description?: unknown }[]
      | null;
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

type RelatedCandidate = {
  code: string;
  mittente?: string | null;
  tipologia?: string | null;
  priority?: Priority | null;
};

function pickRelatedRaccomandataPages(
  candidates: RelatedCandidate[],
  current: { code: string; tipologia?: string | null },
  limit = 3
): RaccomandataRelatedItem[] {
  const cur = norm(current.code).toLowerCase();
  const list = candidates.filter((c) => {
    const cc = norm(c.code).toLowerCase();
    return cc.length > 0 && cc !== cur;
  });
  const tip = norm(current.tipologia).toLowerCase();
  const sameTip = tip ? list.filter((c) => norm(c.tipologia).toLowerCase() === tip) : [];
  const sameTipCodes = new Set(sameTip.map((c) => norm(c.code).toLowerCase()));
  const other = list.filter((c) => !sameTipCodes.has(norm(c.code).toLowerCase()));
  return [...sameTip, ...other].slice(0, limit).map((c) => ({
    code: norm(c.code),
    mittente: c.mittente ?? undefined,
    tipologia: c.tipologia ?? undefined,
  }));
}

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
  a?: {
    title?: string | null;
    cards?:
      | {
          icon?: string | null;
          title?: string | null;
          description?: unknown;
        }[]
      | null;
  } | null
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
        .filter(
          (c): c is { icon?: string; title?: string; description?: string } => c !== null
        )
    : undefined;

  return {
    title: norm(a.title) || undefined,
    cards,
  };
}

function normalizeFAQ(
  f?: {
    title?: string | null;
    items?: { q?: string | null; a?: unknown }[] | null;
  } | null
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

function stepsForJsonLd(steps: UIStep[]) {
  return steps.map((s) => ({
    title: s.title,
    description:
      typeof s.description === "string"
        ? s.description.trim()
        : ptToPlainText(s.description),
  }));
}

function detailsForJsonLd(details: UIDetail[]) {
  return details.map((d) => ({
    title: d.title,
    body: typeof d.body === "string" ? d.body.trim() : ptToPlainText(d.body),
  }));
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
  const title = page?.metaTitle?.trim()
    ? page.metaTitle
    : page?.heroTitleSuffix
      ? `${base} – ${page.heroTitleSuffix}`
      : base;

  const description = page?.metaDescription?.trim()
    ? page.metaDescription
    : (page?.heroSubtitle ?? raccomandataMetaDescriptionFallback(codice));

  const siteUrl = getSiteOrigin();
  const canonical = `${siteUrl}/raccomandata/${codice.toLowerCase()}`;

  return {
    title,
    description,
    alternates: alternatesItalianCanonical(canonical),
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: canonical,
      siteName: "Arauze.com",
      title,
      description,
    },
    twitter: { card: "summary", title, description },
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

  const [chartData, reportCount, relatedCandidates] = await Promise.all([
    getRaccomandataChart(codice),
    sanityClient
      .fetch<number>(REPORTS_BY_CODE, { code: codice }, { cache: "no-store" })
      .then((n) => (typeof n === "number" ? n : 0)),
    sanityClient.fetch<RelatedCandidate[]>(
      RACCOMANDATA_RELATED_CANDIDATES,
      { code: codice },
      { cache: "no-store" }
    ),
  ]);

  const relatedPages = pickRelatedRaccomandataPages(relatedCandidates ?? [], {
    code: codice,
    tipologia: page.tipologia,
  });

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

          <RaccomandataTrustPanel
            updatedAt={page._updatedAt}
            createdAt={page._createdAt}
            reportCount={reportCount}
            feedbackCount={uiFeedback.length}
          />

          <InfoBoxRaccomandata
            code={codice}
            mittente={page.mittente ?? undefined}
            tipologia={page.tipologia ?? undefined}
            stato={page.stato ?? undefined}
            priority={page.priority ?? undefined}
          />

          <AdSenseAd adSlot="2025677270" className="my-6" />

          <AuthorBox data={page.authorBox} />

          <FeedbackRaccomandata feedback={uiFeedback} defaultCode={codice} />

          <AdSenseAd adSlot="2025677270" className="my-6" />

          {chartData?.slices?.length ? (
            <RaccomandataPieChart
              slices={chartData.slices}
              title={chartData.titolo ?? RACCOMANDATA_CHART_TITLE_FALLBACK}
            />
          ) : null}

          <StepsRaccomandata steps={uiSteps} />

          <AdSenseAd adSlot="2025677270" className="my-6" />

          <DetailsSection details={uiDetails} />

          <AlertBox data={uiAlertBox} />

          <AssistenzaSection data={uiAssistenza} />

          <FAQSection data={uiFAQ} />

          <RaccomandataRelatedPages pages={relatedPages} />
        </div>
      </div>

      <SEOJsonLd
        input={{
          code: codice,
          metaTitle: pageMeta.metaTitle,
          metaDescription: pageMeta.metaDescription,
          heroTitleSuffix: pageMeta.heroTitleSuffix,
          heroSubtitle: pageMeta.heroSubtitle,
          mittente: pageMeta.mittente,
          tipologia: pageMeta.tipologia,
          stato: pageMeta.stato,
          _createdAt: page._createdAt ?? undefined,
          _updatedAt: page._updatedAt ?? undefined,
          author: page.authorBox?.name
            ? {
                name: page.authorBox.name,
                image: page.authorBox.avatarUrl ?? undefined,
              }
            : undefined,
          steps: stepsForJsonLd(uiSteps),
          faq:
            uiFAQ?.items
              ?.map((i) => ({
                q: (i.q ?? "").trim(),
                a: (i.a ?? "").trim(),
              }))
              .filter((i) => i.q && i.a) ?? [],
          details: detailsForJsonLd(uiDetails),
        }}
      />
    </main>
  );
}
