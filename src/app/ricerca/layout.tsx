import type { Metadata } from "next";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

const base = getSiteOrigin();
const title = "Ricerca raccomandata – Arauze";
const description =
  "Affina la ricerca con un codice (3–6 cifre) o un testo descrittivo per trovare informazioni sulla tua raccomandata.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesItalianCanonical(`${base}/ricerca`),
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: `${base}/ricerca`,
    siteName: "Arauze.com",
    title,
    description,
    locale: "it_IT",
  },
  twitter: { card: "summary", title, description },
};

export default function RicercaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
