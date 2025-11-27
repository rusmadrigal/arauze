import type { Metadata } from "next";
import TopNav from "../components/ui/TopNav";
import HeroHeader from "../components/home/HeroHeader";
import SearchForm from "../components/home/SearchForm";
import ComeFunziona from "../components/home/ComeFunziona";
import UltimeAnalizzateDynamic from "../components/home/UltimeAnalizzateDynamic";
import TextBlockHome from "../components/home/TextBlockHome";
import FaqsHome from "../components/home/FaqsHome";
import NewsletterCTA from "../components/ui/NewsletterCTA";
import RaccomandataMarketInfoCard from "@/components/home/RaccomandataMarketInfoCard";



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
    "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Arauze",
    title: "Raccomandata Market Tracking 2026 – Consulta e Monitora Codici CMP",
    description:
      "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
  },
  twitter: {
    card: "summary",
    title: "Raccomandata Market Tracking 2026 – Consulta e Monitora Codici CMP",
    description:
      "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
  },
  robots: { index: true, follow: true },
};

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
export default function HomePage() {
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
