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
import FeedbackRaccomandata from "@/components/raccomandata/FeedbackRaccomandata";

// SEO JSON-LD
import SEOJsonLd, {
  type RaccomandataPage as SeoRaccomandataPage,
} from "@/components/seo/SEOJsonLd";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE } from "sanity/lib/queries/raccomandata";
import type { TypedObject } from "@portabletext/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ================= Helpers =================

// Normaliza strings
const norm = (v?: string | null) => (v ?? "").trim();

// Tipos para Portable Text plano (para ptToPlainText)
type PortableTextChild = {
  _type?: string;
  text?: string;
  [key: string]: unknown;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextChild[];
  [key: string]: unknown;
};

// Convierte Portable Text (o string) a texto plano
function ptToPlainText(input: unknown): string {
  if (!input) return "";
  if (typeof input === "string") return input.trim();

  if (Array.isArray(input)) {
    const blocks = input as PortableTextBlock[];

    return blocks
      .map((block) => {
        if (block?._type !== "block" || !Array.isArray(block.children)) return "";
        return block.children
          .map((child) =>
            typeof child?.text === "string" ? child.text : ""
          )
          .join("");
      })
      .join("\n")
      .trim();
  }

  return "";
}

// ================= Tipos base (desde Sanity) =================
type Priority = "ALTA" | "MEDIA" | "BASSA";
type StepDoc = { title?: string | null; description?: unknown };
type DetailDoc = { title?: string | null; body?: unknown };
type FAQItemDoc = { q?: string | null; a?: unknown };

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
  alertBox?:
    | { enabled?: boolean; title?: string; body?: unknown; icon?: string }
    | null;
  assistenza?:
    | {
        title?: string | null;
        cards?:
          | {
              icon?: string | null;
              title?: string | null;
              description?: unknown;
            }[]
          | null;
      }
    | null;
  faq?:
    | {
        title?: string | null;
        items?: FAQItemDoc[] | null;
      }
    | null;
  authorBox?: { name?: string; avatarUrl?: string; updatedAt?: string };

  _createdAt?: string | null;
  _updatedAt?: string | null;
} | null;

// Tipo que consumirá StepsRaccomandata (compatible con Step)
type UIStep = {
  title: string;
  description: string | TypedObject[] | undefined;
};

// 👇 body ahora es SIEMPRE una propiedad (puede ser undefined, pero no opcional)
type UIDetail = {
  title: string;
  body: string | TypedObject[] | undefined;
};

// Tipos para otros componentes
type AssistenzaData = {
  title?: string;
  cards?: { icon?: string; title?: string; description?: string }[];
};
type FAQData = { title?: string; items?: { q?: string; a?: string }[] };

// Feedback desde Sanity
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

// ================= Normalizadores (eliminan null/undefined) =================

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

function normalizePortableContent(
  input: unknown
): string | TypedObject[] | undefined {
  if (!input) return undefined;

  if (typeof input === "string") {
    const trimmed = input.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (Array.isArray(input)) {
    return input.length > 0 ? (input as TypedObject[]) : undefined;
  }

  if (typeof input === "object") {
    return [input as TypedObject];
  }

  return undefined;
}

// Mantiene Portable Text para la UI (enlaces, formato, etc.)
function normalizeStepsForUI(items?: StepDoc[] | null): UIStep[] {
  if (!Array.isArray(items)) return [];

  return items
    .map<UIStep | null>((s) => {
      const title = norm(s?.title);
      const description = normalizePortableContent(s?.description);

      if (!title && !description) {
        return null;
      }

      return { title, description };
    })
    .filter((s): s is UIStep => s !== null);
}

function normalizeDetails(items?: DetailDoc[] | null): UIDetail[] {
  if (!Array.isArray(items)) return [];

  return items
    .map<UIDetail | null>((d) => {
      const title = norm(d?.title);
      const body = normalizePortableContent(d?.body);

      const hasBody =
        typeof body === "string"
          ? body.trim().length > 0
          : Array.isArray(body)
          ? body.length > 0
          : false;

      if (!title && !hasBody) {
        return null;
      }

      // body SIEMPRE existe en UIDetail, aunque sea undefined
      return { title, body };
    })
    .filter((detail): detail is UIDetail => detail !== null);
}

function normalizeAssistenza(
  a?:
    | {
        title?: string | null;
        cards?:
          | {
              icon?: string | null;
              title?: string | null;
              description?: unknown;
            }[]
          | null;
      }
    | null
): AssistenzaData | undefined {
  if (!a) return undefined;
  const cards = Array.isArray(a.cards)
    ? a.cards
        .map((c) => ({
          icon: c?.icon ?? undefined,
          title: norm(c?.title) || undefined,
          description: ptToPlainText(c?.description) || undefined,
        }))
        .filter((c) => c.icon || c.title || c.description)
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
        .map((it) => ({
          q: norm(it?.q) || undefined,
          a: ptToPlainText(it?.a) || undefined,
        }))
        .filter((it) => it.q || it.a)
    : undefined;
  return { title: norm(f.title) || undefined, items };
}

function normalizeFeedback(
  docs: FeedbackDoc[],
  fallbackCodice: string
): UIFeedback[] {
  if (!Array.isArray(docs)) return [];
  return docs
    .map<UIFeedback | null>((doc) => {
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

// ================= Metadata =================
// Next 15: params es Promise
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
      : codice
      ? `Dettagli per il codice ${codice}`
      : "Dettagli raccomandata";

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
    {
      cache: "no-store",
      next: { revalidate: 0, tags: [`raccomandata:${code}`] },
    }
  );

  if (!page) notFound();

  const codice = (page.code ?? code).trim();

  // Fetch de feedback aprobados para este codice
  const feedbackDocs = await sanityClient.fetch<FeedbackDoc[]>(
    `*[_type == "raccomandataFeedback" && approved == true && codice == $codice] | order(createdAt desc){
      _id,
      nome,
      citta,
      codice,
      categoria,
      commento,
      createdAt
    }`,
    { codice },
    {
      cache: "no-store",
      next: { revalidate: 0, tags: [`raccomandataFeedback:${codice}`] },
    }
  );

  const uiFeedback = normalizeFeedback(feedbackDocs ?? [], codice);

  // Para HeroRaccomandata (sin nulls)
  const pageMeta = normalizeMeta(page, codice);

  // Normalizados estrictos para componentes que exigen string / arrays definidos
  const uiSteps = normalizeStepsForUI(page.steps);
  const uiDetails = normalizeDetails(page.details);
  const uiAssistenza = normalizeAssistenza(page.assistenza);
  const uiFAQ = normalizeFAQ(page.faq);

  // AlertBox: aplanamos el body para que siga siendo string
  const uiAlertBox = page.alertBox
    ? {
        ...page.alertBox,
        body: ptToPlainText(page.alertBox.body),
      }
    : undefined;

  // ====== Datos para JSON-LD (también en texto plano) ======
  const seoSteps = Array.isArray(page.steps)
    ? page.steps.map((s) => ({
        title: s?.title ?? null,
        description: ptToPlainText(s?.description) || null,
      }))
    : null;

  const seoDetails = Array.isArray(page.details)
    ? page.details.map((d) => ({
        title: d?.title ?? null,
        body: ptToPlainText(d?.body) || null,
      }))
    : null;

  const seoFaq =
    page.faq && Array.isArray(page.faq.items)
      ? {
          title: page.faq.title ?? null,
          items: page.faq.items.map((it) => ({
            q: it?.q ?? null,
            a: ptToPlainText(it?.a) || null,
          })),
        }
      : page.faq
      ? { title: page.faq.title ?? null, items: null }
      : null;

  const seoPage: SeoRaccomandataPage = {
    heroTitleSuffix: page.heroTitleSuffix ?? null,
    metaTitle: page.metaTitle ?? null,
    heroSubtitle: page.heroSubtitle ?? null,
    metaDescription: page.metaDescription ?? null,
    steps: seoSteps,
    faq: seoFaq,
    details: seoDetails,
    mittente: page.mittente ?? null,
    tipologia: page.tipologia ?? null,
    _createdAt: page._createdAt ?? null,
    _updatedAt: page._updatedAt ?? null,
  };

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
          <AuthorBox data={page?.authorBox} />
          <FeedbackRaccomandata feedback={uiFeedback} />
          <StepsRaccomandata steps={uiSteps} />
          <DetailsSection details={uiDetails} />
          <AlertBox data={uiAlertBox} />
          <AssistenzaSection data={uiAssistenza} />
          <FAQSection data={uiFAQ} />
          <AdditionalInfoBanner />
          
        </div>
      </div>

      {/* JSON-LD dinámico SEO */}
      <SEOJsonLd page={seoPage} code={codice} />
    </main>
  );
}
