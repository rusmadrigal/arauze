import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { groq } from "next-sanity";

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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://arauze.com";

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
      const loc = `${baseUrl}/raccomandata/${encodeURIComponent(
        item.code
      )}`;
      const lastmodIso = item.lastmod
        ? new Date(item.lastmod).toISOString().split("T")[0]
        : null;

      return `
  <url>
    <loc>${loc}</loc>
    ${lastmodIso ? `<lastmod>${lastmodIso}</lastmod>` : ""}
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const cmpUrls = (cmps || [])
    .map((item) => {
      const loc = `${baseUrl}/raccomandata/cmp/${encodeURIComponent(
        item.slug
      )}`;
      const lastmodIso = item.lastmod
        ? new Date(item.lastmod).toISOString().split("T")[0]
        : null;

      return `
  <url>
    <loc>${loc}</loc>
    ${lastmodIso ? `<lastmod>${lastmodIso}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Índice CMP -->
  <url>
    <loc>${baseUrl}/raccomandata/cmp</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
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
