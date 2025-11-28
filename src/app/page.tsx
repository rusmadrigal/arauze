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
import RaccomandataMarketInfoCard from "@/components/home/RaccomandataMarketInfoCard";
import CmpPreviewSection from "@/components/cmp/CmpPreviewSection";

export const revalidate = 60;

// Dominio base (prod) con fallback a localhost en dev
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.NODE_ENV === "production"
    ? "https://arauze.com"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Raccomandata Market Tracking 2026 – Consulta e Monitora Codici CMP",
  description:
    "Scopri chi ha inviato la tua raccomandata, come interpretare il codice CMP e se è necessaria un’azione immediata.",
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Arauze",
    title: "Raccomandata Market Tracking 2026 – Consulta e Monitora Codici CMP",
    description:
      "Scopri chi ha inviato la tua raccomandata, come interpretare il codice CMP e se è necessaria un’azione immediata.",
  },
  twitter: {
    card: "summary",
    title: "Raccomandata Market Tracking 2026 – Consulta e Monitora Codici CMP",
    description:
      "Scopri chi ha inviato la tua raccomandata, come interpretare il codice CMP e se è necessaria un’azione immediata.",
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

          <RaccomandataMarketInfoCard />
          <FaqsHome />
          <div className="mt-10">
            <NewsletterCTA />
          </div>
        </div>
      </main>
    </>
  );
}
