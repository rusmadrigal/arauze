const clean = (v?: string | null) => (v ?? "").trim();
const hasText = (v?: string | null) => clean(v).length > 0;

export type CmpPageJsonLdFaq = { q: string; a: string };

export type CmpPageJsonLdInput = {
  slug: string;
  siteUrl: string;
  name: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  city?: string;
  province?: string;
  region?: string;
  /** Indirizzo in testo semplice (opzionale) */
  addressPlain?: string;
  faq?: CmpPageJsonLdFaq[];
};

/**
 * JSON-LD per /raccomandata/cmp/[slug]: pagina informativa su un CMP in una località.
 * - WebPage + Place (località): aiuta a chiarire il contesto geografico; non equivale a scheda Google Business.
 * - FAQPage solo se ci sono domande/risposte testuali valide.
 */
export function buildCmpPageJsonLd(input: CmpPageJsonLdInput): Record<string, unknown> {
  const slug = clean(input.slug).toLowerCase();
  const { siteUrl } = input;
  const pageUrl = `${siteUrl}/raccomandata/cmp/${encodeURIComponent(slug)}`;

  const title =
    clean(input.metaTitle) ||
    (hasText(input.subtitle)
      ? `${clean(input.name)} – ${clean(input.subtitle)}`
      : clean(input.name));

  const description =
    clean(input.metaDescription) ||
    clean(input.subtitle) ||
    "Scheda informativa del centro di meccanizzazione postale (CMP) in Italia.";

  const orgId = `${siteUrl}#org`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const localityId = `${pageUrl}#locality`;

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

  const city = clean(input.city);
  const province = clean(input.province);
  const region = clean(input.region);
  const addressPlain = clean(input.addressPlain);

  const hasLocality = Boolean(city || region);

  if (hasLocality) {
    const place: Record<string, unknown> = {
      "@type": "Place",
      "@id": localityId,
      name: city || region,
    };

    if (region && city) {
      place.containedInPlace = {
        "@type": "AdministrativeArea",
        name: region,
      };
    }

    if (addressPlain || city || province) {
      const postal: Record<string, unknown> = { "@type": "PostalAddress" };
      if (city) postal.addressLocality = city;
      if (province) postal.addressRegion = province;
      if (addressPlain) postal.streetAddress = addressPlain.slice(0, 500);
      place.address = postal;
    }

    graph.push(place);
  }

  const about: unknown[] = [];
  if (hasLocality) about.push({ "@id": localityId });
  about.push({
    "@type": "Thing",
    name: clean(input.name),
    ...(hasText(input.subtitle) ? { description: clean(input.subtitle) } : {}),
  });

  const faqEntities = (input.faq ?? [])
    .filter((item) => hasText(item.q) && hasText(item.a))
    .map((item) => ({
      "@type": "Question",
      name: clean(item.q),
      acceptedAnswer: { "@type": "Answer", text: clean(item.a) },
    }));

  const hasPart: unknown[] = [];
  if (faqEntities.length) hasPart.push({ "@id": `${pageUrl}#faq` });

  graph.push({
    "@type": "WebPage",
    "@id": webpageId,
    url: pageUrl,
    name: title,
    headline: title,
    description,
    inLanguage: "it-IT",
    isPartOf: { "@id": websiteId },
    about,
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
        name: "Centri CMP",
        item: `${siteUrl}/raccomandata/cmp`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: clean(input.name) || slug,
        item: pageUrl,
      },
    ],
  });

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
