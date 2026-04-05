import type { Metadata } from "next";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

const base = getSiteOrigin();
const title = "Termini e condizioni d’uso – Arauze.com";
const description =
  "Termini legali per l’utilizzo di Arauze.com: uso del sito, proprietà intellettuale, limitazioni di responsabilità e legge applicabile.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesItalianCanonical(`${base}/termini`),
  openGraph: {
    type: "website",
    url: `${base}/termini`,
    siteName: "Arauze.com",
    title,
    description,
    locale: "it_IT",
  },
  twitter: { card: "summary", title, description },
};

export default function TerminiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
