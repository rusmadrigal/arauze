// app/raccomandata/cmp/page.tsx
import type { Metadata } from "next";
import { sanityClient } from "sanity/lib/client";
import { CMP_LIST_QUERY } from "sanity/lib/queries/cmpList";
import CmpHomeClient from "@/components/cmp/CmpHomeClient";
import type { CmpItem } from "@/components/cmp/types";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 60;

const siteUrl = getSiteOrigin();
const title = "Centri CMP in Italia – Meccanizzazione postale | Arauze";
const description =
  "Elenco dei Centri di Meccanizzazione Postale (CMP): città, provincia, servizi e dettagli per raccomandate e comunicazioni tracciate.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/raccomandata/cmp` },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: `${siteUrl}/raccomandata/cmp`,
    siteName: "Arauze.com",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

async function getCmpList(): Promise<CmpItem[]> {
    const data = await sanityClient.fetch<CmpItem[]>(CMP_LIST_QUERY);
    return Array.isArray(data) ? data : [];
}

export default async function CmpHomePage() {
    const cmpList = await getCmpList();

    return <CmpHomeClient initialList={cmpList} />;
}
