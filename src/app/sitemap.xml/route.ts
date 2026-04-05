import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { groq } from "next-sanity";
import { getSiteOrigin } from "@/lib/siteUrl";

/** hreflang nel sitemap (allineato a `alternatesItalianCanonical`). */
function xmlHreflangAlternateLinks(absoluteUrl: string): string {
  const href = absoluteUrl
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
  return `
    <xhtml:link rel="alternate" hreflang="it-IT" href="${href}" />
    <xhtml:link rel="alternate" hreflang="it" href="${href}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${href}" />`;
}

const RACCOMANDATA_CODES_QUERY = groq`
  *[
    _type == "raccomandataPage" &&
    defined(code) &&
    !(_id in path("drafts.**"))
  ]{
    "code": code,
    "lastmod": coalesce(authorBox.updatedAt, _updatedAt, _createdAt)
  }
`;

const CMP_PAGES_QUERY = groq`
  *[
    _type == "cmpPage" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ]{
    "slug": slug.current,
    "lastmod": coalesce(authorBox.updatedAt, _updatedAt, _createdAt)
  }
`;

export const revalidate = 3600; // 1 hora

export async function GET() {
  const baseUrl = getSiteOrigin();

  const [codes, cmps] = await Promise.all([
    sanityClient.fetch<{ code: string; lastmod?: string }[]>(
      RACCOMANDATA_CODES_QUERY,
      {},
      { cache: "no-store" }
    ),
    sanityClient.fetch<{ slug: string; lastmod?: string }[]>(
      CMP_PAGES_QUERY,
      {},
      { cache: "no-store" }
    ),
  ]);

  const raccomandataUrls = (codes || [])
    .map((item) => {
      const codeSlug = String(item.code ?? "")
        .trim()
        .toLowerCase();
      const loc = `${baseUrl}/raccomandata/${encodeURIComponent(codeSlug)}`;
      const lastmodIso = item.lastmod
        ? new Date(item.lastmod).toISOString().split("T")[0]
        : null;

      return `
  <url>
    <loc>${loc}</loc>${xmlHreflangAlternateLinks(loc)}
    ${lastmodIso ? `<lastmod>${lastmodIso}</lastmod>` : ""}
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const cmpUrls = (cmps || [])
    .map((item) => {
      const loc = `${baseUrl}/raccomandata/cmp/${encodeURIComponent(item.slug)}`;
      const lastmodIso = item.lastmod
        ? new Date(item.lastmod).toISOString().split("T")[0]
        : null;

      return `
  <url>
    <loc>${loc}</loc>${xmlHreflangAlternateLinks(loc)}
    ${lastmodIso ? `<lastmod>${lastmodIso}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("");

  const homeUrl = `${baseUrl}/`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Home -->
  <url>
    <loc>${homeUrl}</loc>${xmlHreflangAlternateLinks(homeUrl)}
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Índice CMP -->
  <url>
    <loc>${baseUrl}/raccomandata/cmp</loc>${xmlHreflangAlternateLinks(`${baseUrl}/raccomandata/cmp`)}
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Hub e pagine istituzionali -->
  <url>
    <loc>${baseUrl}/raccomandata-market</loc>${xmlHreflangAlternateLinks(`${baseUrl}/raccomandata-market`)}
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/ricerca</loc>${xmlHreflangAlternateLinks(`${baseUrl}/ricerca`)}
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contatti</loc>${xmlHreflangAlternateLinks(`${baseUrl}/contatti`)}
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>${xmlHreflangAlternateLinks(`${baseUrl}/privacy`)}
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/termini</loc>${xmlHreflangAlternateLinks(`${baseUrl}/termini`)}
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- AI / LLM discovery (Markdown text/plain) -->
  <url>
    <loc>${baseUrl}/llm.txt</loc>${xmlHreflangAlternateLinks(`${baseUrl}/llm.txt`)}
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/llms.txt</loc>${xmlHreflangAlternateLinks(`${baseUrl}/llms.txt`)}
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>

  <!-- Raccomandata codes -->
  ${raccomandataUrls}

  <!-- Páginas CMP -->
  ${cmpUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
