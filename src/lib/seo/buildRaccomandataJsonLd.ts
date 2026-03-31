import { raccomandataMetaDescriptionFallback } from "@/lib/raccomandata/italianPublicCopy";

export type RaccomandataJsonLdSeoStep = { title: string; description: string };
export type RaccomandataJsonLdSeoFaq = { q: string; a: string };
export type RaccomandataJsonLdSeoDetail = { title: string; body: string };

export type RaccomandataJsonLdInput = {
  code: string;
  siteUrl: string;
  metaTitle?: string;
  heroTitleSuffix?: string;
  heroSubtitle?: string;
  metaDescription?: string;
  mittente?: string;
  tipologia?: string;
  stato?: string;
  _createdAt?: string;
  _updatedAt?: string;
  author?: { name?: string; url?: string; image?: string };
  steps?: RaccomandataJsonLdSeoStep[];
  faq?: RaccomandataJsonLdSeoFaq[];
  details?: RaccomandataJsonLdSeoDetail[];
};

const clean = (v?: string | null) => (v ?? "").trim();
const hasText = (v?: string | null) => clean(v).length > 0;

/**
 * JSON-LD per /raccomandata/[code]: @graph con Organization, WebSite, WebPage,
 * Article (contenuto editoriale), WebApplication+SoftwareApplication (strumento di consultazione),
 * BreadcrumbList, HowTo e FAQ ove presenti.
 */
export function buildRaccomandataJsonLd(
  input: RaccomandataJsonLdInput
): Record<string, unknown> {
  const { code, siteUrl } = input;
  /** Allineato a canonical e middleware: solo slug URL in minuscolo. */
  const displayCode = clean(code);
  const codeSlug = displayCode.toLowerCase();
  const pageUrl = `${siteUrl}/raccomandata/${encodeURIComponent(codeSlug)}`;

  const rawTitleSuffix = clean(input.heroTitleSuffix);
  const rawMetaTitle = clean(input.metaTitle);
  const rawHeroSubtitle = clean(input.heroSubtitle);
  const rawMetaDescription = clean(input.metaDescription);

  const seoTitle =
    rawMetaTitle ||
    (rawTitleSuffix
      ? `Raccomandata ${displayCode} – ${rawTitleSuffix}`
      : `Raccomandata ${displayCode}`);

  const seoDescription =
    rawMetaDescription ||
    rawHeroSubtitle ||
    raccomandataMetaDescriptionFallback(displayCode || codeSlug);

  const orgId = `${siteUrl}#org`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const articleId = `${pageUrl}#article`;
  const lookupId = `${pageUrl}#lookup`;

  const graph: Record<string, unknown>[] = [];

  graph.push({
    "@type": "Organization",
    "@id": orgId,
    name: "Arauze",
    url: siteUrl,
  });

  graph.push({
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: "Arauze",
    publisher: { "@id": orgId },
  });

  const howToSteps = (input.steps ?? [])
    .filter((s) => hasText(s.title) || hasText(s.description))
    .map((s) => ({
      "@type": "HowToStep",
      name: clean(s.title),
      text: clean(s.description),
    }));

  const faqEntities = (input.faq ?? [])
    .filter((item) => hasText(item.q) && hasText(item.a))
    .map((item) => ({
      "@type": "Question",
      name: clean(item.q),
      acceptedAnswer: { "@type": "Answer", text: clean(item.a) },
    }));

  const details = (input.details ?? []).filter(
    (d) => hasText(d.title) || hasText(d.body)
  );
  const detailsList =
    details.length > 0
      ? {
          "@type": "ItemList",
          name: "Dettagli e informazioni",
          itemListElement: details.map((d, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "WebPageElement",
              name: clean(d.title),
              text: clean(d.body),
            },
          })),
        }
      : null;

  const pageDefinedTerms: unknown[] = [
    {
      "@type": "DefinedTerm",
      name: `Raccomandata ${displayCode || codeSlug}`,
      termCode: codeSlug,
    },
  ];
  if (hasText(input.mittente)) {
    pageDefinedTerms.push({
      "@type": "DefinedTerm",
      name: clean(input.mittente),
      ...(hasText(input.tipologia) ? { inDefinedTermSet: clean(input.tipologia) } : {}),
    });
  }

  const hasPart: unknown[] = [];
  if (howToSteps.length) hasPart.push({ "@id": `${pageUrl}#howto` });
  if (faqEntities.length) hasPart.push({ "@id": `${pageUrl}#faq` });
  // ItemList non ha isPartOf in schema.org: resta inline sotto WebPage.hasPart
  if (detailsList) hasPart.push(detailsList);

  const authorName = clean(input.author?.name);
  const authorNode = authorName
    ? {
        "@type": "Person",
        name: authorName,
        ...(hasText(input.author?.url) ? { url: clean(input.author?.url) } : {}),
        ...(hasText(input.author?.image) ? { image: clean(input.author?.image) } : {}),
      }
    : {
        "@type": "Organization",
        name: "Arauze",
        "@id": orgId,
      };

  const keywords = [
    displayCode || codeSlug,
    clean(input.mittente),
    clean(input.tipologia),
    clean(input.stato),
  ]
    .filter(Boolean)
    .join(", ");

  graph.push({
    "@type": "Article",
    "@id": articleId,
    headline: seoTitle,
    description: seoDescription,
    inLanguage: "it-IT",
    url: pageUrl,
    author: authorNode,
    publisher: { "@id": orgId },
    ...(hasText(input._createdAt) ? { datePublished: clean(input._createdAt) } : {}),
    ...(hasText(input._updatedAt) ? { dateModified: clean(input._updatedAt) } : {}),
    ...(keywords ? { keywords } : {}),
    about: pageDefinedTerms,
    mainEntityOfPage: { "@id": webpageId },
  });

  /**
   * WebApplication è sottotipo di SoftwareApplication (schema.org).
   * Doppio @type massimizza compatibilità con documentazione / validatori che citano "SoftwareApplication".
   */
  graph.push({
    "@type": ["WebApplication", "SoftwareApplication"],
    "@id": lookupId,
    name: `Arauze – consultazione codice raccomandata ${displayCode || codeSlug}`,
    alternateName: "Arauze Raccomandata Market Identifier",
    applicationCategory: "ReferenceApplication",
    operatingSystem: "Web",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    provider: { "@id": orgId },
    isRelatedTo: { "@id": articleId },
  });

  graph.push({
    "@type": "WebPage",
    "@id": webpageId,
    url: pageUrl,
    name: seoTitle,
    headline: seoTitle,
    description: seoDescription,
    inLanguage: "it-IT",
    isPartOf: { "@id": websiteId },
    ...(hasText(input._createdAt) ? { datePublished: clean(input._createdAt) } : {}),
    ...(hasText(input._updatedAt) ? { dateModified: clean(input._updatedAt) } : {}),
    about: pageDefinedTerms,
    mainEntity: { "@id": articleId },
    ...(hasPart.length ? { hasPart } : {}),
  });

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Codici analizzati",
        item: `${siteUrl}/raccomandata-market`,
      },
      { "@type": "ListItem", position: 3, name: `Codice ${displayCode || codeSlug}`, item: pageUrl },
    ],
  });

  if (howToSteps.length) {
    graph.push({
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: `Cosa fare con la raccomandata (codice ${displayCode || codeSlug}, Italia)`,
      step: howToSteps,
      isPartOf: { "@id": webpageId },
    });
  }

  if (faqEntities.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqEntities,
      isPartOf: { "@id": webpageId },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
