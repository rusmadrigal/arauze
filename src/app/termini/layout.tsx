import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/siteUrl";

const base = getSiteOrigin();
const title = "Termini e condizioni d’uso – Arauze.com";
const description =
  "Termini legali per l’utilizzo di Arauze.com: uso del sito, proprietà intellettuale, limitazioni di responsabilità e legge applicabile.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${base}/termini` },
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

export default function TerminiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
