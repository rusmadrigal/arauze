// src/app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "sanity/lib/client";
import { groq } from "next-sanity";

const RACCOMANDATA_CODES_QUERY = groq`
  *[_type == "raccomandataCode" && defined(code)]{
    "code": code,
    _updatedAt
  }
`;

export const revalidate = 3600; // 1 hora

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arauze.com";

  const codes: { code: string; _updatedAt?: string }[] = await sanityClient.fetch(
    RACCOMANDATA_CODES_QUERY,
    {},
    { cache: "no-store" }
  );

  const urls = codes
    .map((item) => {
      const loc = `${baseUrl}/raccomandata/${item.code}`;
      const lastmod = item._updatedAt ? new Date(item._updatedAt).toISOString() : undefined;

      return `
        <url>
          <loc>${loc}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
