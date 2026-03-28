import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/siteUrl";

const base = getSiteOrigin();
const title = "Privacy Policy e GDPR – Arauze.com";
const description =
  "Informativa sul trattamento dei dati personali, cookie, diritti dell’interessato e conformità al Regolamento UE 2016/679 (GDPR).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${base}/privacy` },
  openGraph: {
    type: "website",
    url: `${base}/privacy`,
    siteName: "Arauze.com",
    title,
    description,
    locale: "it_IT",
  },
  twitter: { card: "summary", title, description },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
