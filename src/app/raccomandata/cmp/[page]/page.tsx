import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "sanity/lib/client";
import { GET_CMP_PAGE } from "sanity/lib/queries/cmp";

import CmpJsonLd from "@/components/seo/CmpJsonLd";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";
import TopNav from "@/components/ui/TopNav";
import CmpHero from "@/components/cmp/CmpHero";
import CmpMapAndMeaning from "@/components/cmp/CmpMapAndMeaning";
import CmpDetails from "@/components/cmp/CmpDetails";
import CmpFaq from "@/components/cmp/CmpFaq";
import CmpFrequentCodes from "@/components/cmp/CmpFrequentCodes";
import { getPublishedRaccomandataCodeSet } from "@/lib/sanity/publishedRaccomandataCodes";

type PageParams = {
  page?: string;
};

type PortableTextChild = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] };

function ptToPlainText(input: unknown): string {
  if (!input) return "";
  if (typeof input === "string") return input.trim();
  if (Array.isArray(input)) {
    const blocks = input as PortableTextBlock[];
    return blocks
      .map((block) => {
        if (block?._type !== "block" || !Array.isArray(block.children)) return "";
        return block.children.map((c) => c.text || "").join("");
      })
      .join("\n")
      .trim();
  }
  return "";
}

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
  const siteUrl = getSiteOrigin();

  const canonical = `${siteUrl}/raccomandata/cmp/${slug}`;

  if (!cmp) {
    return {
      title: "CMP – Informazioni centro di smistamento",
      description: "Scheda informativa del centro di meccanizzazione postale.",
      alternates: alternatesItalianCanonical(canonical),
    };
  }

  return {
    title: cmp.metaTitle || `${cmp.name} – ${cmp.subtitle}`,
    description:
      cmp.metaDescription ||
      "Scheda informativa del centro di meccanizzazione postale: significato, tempi di consegna e stato nel tracciamento.",
    alternates: alternatesItalianCanonical(canonical),
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

  const publishedRaccomandataCodes = await getPublishedRaccomandataCodeSet();

  const faqForJsonLd =
    cmp.faqItems
      ?.map((item: { q?: string; a?: unknown }) => ({
        q: (item.q ?? "").trim(),
        a: ptToPlainText(item.a),
      }))
      .filter((item: { q: string; a: string }) => item.q && item.a) ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <div className="space-y-8 md:space-y-10">
          <TopNav />

          <CmpHero data={cmp} />

          <CmpMapAndMeaning data={cmp} />

          <CmpFrequentCodes
            title={cmp.frequentCodesTitle}
            codes={cmp.frequentCodes}
            publishedCodes={publishedRaccomandataCodes}
          />

          <CmpDetails data={cmp} />

          <CmpFaq data={cmp} />
        </div>
      </div>

      <CmpJsonLd
        input={{
          slug,
          name: cmp.name,
          subtitle: cmp.subtitle ?? undefined,
          metaTitle: cmp.metaTitle ?? undefined,
          metaDescription: cmp.metaDescription ?? undefined,
          city: cmp.city ?? undefined,
          province: cmp.province ?? undefined,
          region: cmp.region ?? undefined,
          addressPlain: ptToPlainText(cmp.address) || undefined,
          faq: faqForJsonLd,
        }}
      />
    </main>
  );
}
