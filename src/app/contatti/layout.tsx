import type { Metadata } from "next";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

const base = getSiteOrigin();
const title = "Contatti – Arauze.com";
const description =
  "Contatta il team Arauze per supporto, collaborazioni e comunicazioni ufficiali. Risposta entro 48 ore lavorative.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesItalianCanonical(`${base}/contatti`),
  openGraph: {
    type: "website",
    url: `${base}/contatti`,
    siteName: "Arauze.com",
    title,
    description,
    locale: "it_IT",
  },
  twitter: { card: "summary", title, description },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
