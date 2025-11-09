"use client";

import React from "react";
import Script from "next/script";

type Step = { title?: string | null; description?: string | null };
type FAQItem = { q?: string | null; a?: string | null };
type FAQBlock = { items?: (FAQItem | null)[] | null };
type Detail = { title?: string | null; body?: string | null };

export type RaccomandataPage = {
  heroTitleSuffix?: string | null;
  metaTitle?: string | null;
  heroSubtitle?: string | null;
  metaDescription?: string | null;
  steps?: (Step | null)[] | null;
  faq?: FAQBlock | null;
  details?: (Detail | null)[] | null;
  mittente?: string | null;
  tipologia?: string | null;
  _createdAt?: string | null;
  _updatedAt?: string | null;
};

type Props = {
  page: RaccomandataPage | null | undefined;
  code: string;
  scriptId?: string;
};

const clean = (v?: string | null) => (v ?? "").trim();
const hasText = (v?: string | null) => clean(v).length > 0;
const arr = <T,>(v: (T | null | undefined)[] | null | undefined): T[] =>
  Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    (process.env.NODE_ENV === "production" ? "https://arauze.com" : "http://localhost:3000")
  );
}

function buildJsonLd(page: RaccomandataPage | null | undefined, code: string) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/raccomandata/${encodeURIComponent(code)}`;

  // Metas limpias
  const rawTitleSuffix = clean(page?.heroTitleSuffix);
  const rawMetaTitle = clean(page?.metaTitle);
  const rawHeroSubtitle = clean(page?.heroSubtitle);
  const rawMetaDescription = clean(page?.metaDescription);

  const seoTitle =
    rawMetaTitle || (rawTitleSuffix ? `Raccomandata ${code} – ${rawTitleSuffix}` : `Raccomandata ${code}`);

  const seoDescription = rawMetaDescription || rawHeroSubtitle || `Dettagli per il codice ${code}`;

  // HowTo
  const howToSteps = arr<Step>(page?.steps)
    .filter((s) => hasText(s?.title) || hasText(s?.description))
    .map((s) => ({ "@type": "HowToStep", name: clean(s?.title), text: clean(s?.description) }));

  // FAQ
  const faqEntities = arr<FAQItem>(page?.faq?.items)
    .filter((item) => hasText(item?.q) && hasText(item?.a))
    .map((item) => ({
      "@type": "Question",
      name: clean(item?.q),
      acceptedAnswer: { "@type": "Answer", text: clean(item?.a) },
    }));

  // Details -> ItemList opcional
  const details = arr<Detail>(page?.details).filter((d) => hasText(d?.title) || hasText(d?.body));
  const detailsList =
    details.length > 0
      ? {
          "@type": "ItemList",
          name: "Dettagli e informazioni",
          itemListElement: details.map((d, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: { "@type": "WebPageElement", name: clean(d?.title), text: clean(d?.body) },
          })),
        }
      : undefined;

  // Términos relacionados al CONTENIDO (los movemos al WebPage.about)
  const pageDefinedTerms = [
    { "@type": "DefinedTerm", name: `Raccomandata ${code}`, termCode: code },
    hasText(page?.mittente)
      ? {
          "@type": "DefinedTerm",
          name: clean(page?.mittente),
          ...(hasText(page?.tipologia) ? { inDefinedTermSet: clean(page?.tipologia) } : {}),
        }
      : null,
  ].filter(Boolean);

  const parts = [
    howToSteps.length
      ? { "@type": "HowTo", "@id": `${pageUrl}#howto`, name: `Cosa fare con la raccomandata ${code}`, step: howToSteps }
      : null,
    faqEntities.length ? { "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faqEntities } : null,
    detailsList ?? null,
  ].filter(Boolean);

  // 1) WebPage (con ABOUT aquí)
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seoTitle,
    headline: seoTitle,
    description: seoDescription,
    inLanguage: "it-IT",
    isPartOf: { "@id": `${siteUrl}#website` },
    ...(hasText(page?._createdAt) ? { datePublished: clean(page?._createdAt) } : {}),
    ...(hasText(page?._updatedAt) ? { dateModified: clean(page?._updatedAt) } : {}),
    about: pageDefinedTerms, // 👈 ahora el about vive en WebPage (CreativeWork)
    mainEntity: {
      "@type": "WebApplication",
      "@id": `${pageUrl}#app`,
      name: "Arauze – Raccomandata Lookup",
      alternateName: "Arauze Raccomandata Market Identifier",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      url: pageUrl,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      // Referencia limpia al Organization
      provider: { "@id": `${siteUrl}#org` },
    },
    ...(parts.length ? { hasPart: parts } : {}),
  } as const;

  // 2) BreadcrumbList
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Raccomandata", item: `${siteUrl}/raccomandata` },
      { "@type": "ListItem", position: 3, name: `Codice ${code}`, item: pageUrl },
    ],
  } as const;

  // 3) Organization raíz con NUEVO @id (#org) y SIN 'about'
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#org`,
    name: "Arauze",
    url: siteUrl,
    // logo: `${siteUrl}/logo.png`,
  } as const;

  return [webPage, breadcrumbList, organization] as const;
}

function SEOJsonLd({ page, code, scriptId = "raccomandata-jsonld" }: Props) {
  const data = buildJsonLd(page, code);
  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          process.env.NODE_ENV === "development"
            ? JSON.stringify(data, null, 2)
            : JSON.stringify(data),
      }}
    />
  );
}

export default SEOJsonLd;
