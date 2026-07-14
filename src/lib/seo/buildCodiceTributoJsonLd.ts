const clean = (v?: string | null) => (v ?? "").trim();
const hasText = (v?: string | null) => clean(v).length > 0;

export type CodiceTributoJsonLdFaq = { q: string; a: string };

export type CodiceTributoJsonLdInput = {
  slug: string;
  siteUrl: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  heroSubtitle?: string;
  code?: string;
  kind: "code" | "guide";
  faq?: CodiceTributoJsonLdFaq[];
};

export function buildCodiceTributoJsonLd(
  input: CodiceTributoJsonLdInput
): Record<string, unknown> {
  const slug = clean(input.slug).toLowerCase();
  const pageUrl = `${input.siteUrl}/codice-tributo/${encodeURIComponent(slug)}`;
  const title = clean(input.metaTitle) || clean(input.title);
  const description =
    clean(input.metaDescription) ||
    clean(input.heroSubtitle) ||
    "Guida editoriale ai codici tributo e ai controlli da fare in F24.";

  const orgId = `${input.siteUrl}#org`;
  const websiteId = `${input.siteUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const articleId = `${pageUrl}#article`;
  const faqId = `${pageUrl}#faq`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: "Arauze",
      url: input.siteUrl,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: input.siteUrl,
      name: "Arauze",
      publisher: { "@id": orgId },
    },
    {
      "@type": "Article",
      "@id": articleId,
      headline: title,
      description,
      inLanguage: "it-IT",
      url: pageUrl,
      about: [
        {
          "@type": "DefinedTerm",
          name: clean(input.title),
          ...(hasText(input.code) ? { termCode: clean(input.code) } : {}),
        },
      ],
      mainEntityOfPage: { "@id": webpageId },
      publisher: { "@id": orgId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: title,
      headline: title,
      description,
      inLanguage: "it-IT",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": articleId },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${input.siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Codice tributo",
          item: `${input.siteUrl}/codice-tributo`,
        },
        { "@type": "ListItem", position: 3, name: clean(input.title), item: pageUrl },
      ],
    },
  ];

  const faqEntities = (input.faq ?? [])
    .filter((item) => hasText(item.q) && hasText(item.a))
    .map((item) => ({
      "@type": "Question",
      name: clean(item.q),
      acceptedAnswer: { "@type": "Answer", text: clean(item.a) },
    }));

  if (faqEntities.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faqEntities,
      isPartOf: { "@id": webpageId },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

