import type { Metadata } from "next";
import { sanityClient } from "sanity/lib/client";
import { CMP_LIST_QUERY } from "sanity/lib/queries/cmpList";
import type { CmpItem } from "@/components/cmp/types";

import TopNav from "../components/ui/TopNav";
import HeroHeader from "../components/home/HeroHeader";
import SearchForm from "../components/home/SearchForm";
import ComeFunziona from "../components/home/ComeFunziona";
import UltimeAnalizzateDynamic from "../components/home/UltimeAnalizzateDynamic";
import TextBlockHome from "../components/home/TextBlockHome";
import FaqsHome from "../components/home/FaqsHome";
import NewsletterCTA from "../components/ui/NewsletterCTA";
import AvvisoGiacenzaInfoCard from "@/components/home/AvvisoGiacenzaInfoCard";
import RaccomandataMarketInfoCard from "@/components/home/RaccomandataMarketInfoCard";
import CodiceTributoInfoCard from "@/components/home/CodiceTributoInfoCard";
import CmpPreviewSection from "@/components/cmp/CmpPreviewSection";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 60;

const siteUrl = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arauze.com – avviso di giacenza, raccomandate, codici tributo e CMP",
  description:
    "Consulta gli avvisi di giacenza, i codici Raccomandata Market, i codici tributo e i centri CMP più rilevanti per l’Italia.",
  alternates: alternatesItalianCanonical(`${siteUrl}/`),
  keywords: [
    "raccomandata market",
    "codice raccomandata",
    "avviso di giacenza",
    "mittente raccomandata",
    "centri CMP",
    "raccomandata Italia",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: `${siteUrl}/`,
    siteName: "Arauze",
    title: "Arauze.com – avviso di giacenza, raccomandate, codici tributo e CMP",
    description:
      "Consulta gli avvisi di giacenza, i codici Raccomandata Market, i codici tributo e i centri CMP più rilevanti per l’Italia.",
  },
  twitter: {
    card: "summary",
    title: "Arauze.com – avviso di giacenza, raccomandate, codici tributo e CMP",
    description:
      "Consulta gli avvisi di giacenza, i codici Raccomandata Market, i codici tributo e i centri CMP più rilevanti per l’Italia.",
  },
  robots: { index: true, follow: true },
};

// --- Fetch CMP desde Sanity ---
async function getCmpList(): Promise<CmpItem[]> {
  const data = await sanityClient.fetch<CmpItem[]>(CMP_LIST_QUERY);
  return Array.isArray(data) ? data : [];
}

// --- Schema JSON-LD ---
function SEOJsonLd() {
  const orgId = `${siteUrl}#org`;
  const websiteId = `${siteUrl}#website`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Arauze",
        url: siteUrl,
        logo: `${siteUrl}/images/logo.webp`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "Arauze",
        inLanguage: "it",
        publisher: { "@id": orgId },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${siteUrl}/ricerca?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// --- Página principal ---
export default async function HomePage() {
  const cmpList = await getCmpList();

  return (
    <>
      <SEOJsonLd />
      <main className="mx-auto max-w-5xl px-4" role="main">
        <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
          <TopNav />
          <HeroHeader />
          <SearchForm />
          <ComeFunziona />
          <UltimeAnalizzateDynamic />
          <TextBlockHome />

          <CmpPreviewSection
            items={cmpList}
            title="Centri CMP principali"
            subtitle="Scopri i CMP più importanti per raccomandate, multe e atti giudiziari."
            viewAllHref="/raccomandata/cmp"
            maxItems={6}
          />

          <AvvisoGiacenzaInfoCard />
          <RaccomandataMarketInfoCard />
          <CodiceTributoInfoCard />
          <FaqsHome />
          <div className="mt-10">
            <NewsletterCTA />
          </div>
        </div>
      </main>
    </>
  );
}
