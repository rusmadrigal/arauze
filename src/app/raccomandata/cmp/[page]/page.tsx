import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import { GET_CMP_PAGE } from "sanity/lib/queries/cmp";

import TopNav from "@/components/ui/TopNav";
import CmpHero from "@/components/cmp/CmpHero";
import CmpMapAndMeaning from "@/components/cmp/CmpMapAndMeaning";
import CmpDetails from "@/components/cmp/CmpDetails";
import CmpFaq from "@/components/cmp/CmpFaq";
import { getSiteOrigin } from "@/lib/siteUrl";

type PageParams = {
  page?: string;
};

export const revalidate = 60;

// --------------------------------------------------
// Metadata
// --------------------------------------------------
export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { page } = await props.params;
  const slug = (page ?? "").toLowerCase();

  const cmp = await sanityClient.fetch(GET_CMP_PAGE, { slug });

  if (!cmp) {
    return {
      title: "CMP – Informazioni centro di smistamento",
      description: "Scheda informativa del centro di meccanizzazione postale.",
    };
  }

  const siteUrl = getSiteOrigin();
  const canonical = `${siteUrl}/raccomandata/cmp/${slug}`;
  const title = cmp.metaTitle || `${cmp.name} – ${cmp.subtitle}`;
  const description =
    cmp.metaDescription ||
    "Scheda informativa del centro di meccanizzazione postale: significato, tempi di consegna e stato nel tracciamento.";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: canonical,
      siteName: "Arauze.com",
      title,
      description,
    },
    twitter: { card: "summary", title, description },
    robots: { index: true, follow: true },
  };
}

// --------------------------------------------------
// Pagina dinámica CMP
// --------------------------------------------------
export default async function CmpPage({ params }: { params: Promise<PageParams> }) {
  const { page } = await params;
  const slug = (page ?? "").toLowerCase();

  const cmp = await sanityClient.fetch(GET_CMP_PAGE, { slug });

  if (!cmp) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <div className="space-y-8 md:space-y-10">
          <TopNav />

          <CmpHero data={cmp} />

          <CmpMapAndMeaning data={cmp} />

          <CmpDetails data={cmp} />

          <CmpFaq data={cmp} />
        </div>
      </div>
    </main>
  );
}
