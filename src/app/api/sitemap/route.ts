import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "sanity/lib/client";
import { getSiteOrigin } from "@/lib/siteUrl";

/** Public URL stays `/sitemap.xml` via `next.config.ts` rewrite (avoids Next 16 metadata clash on `app/sitemap.xml/route`). */

export const revalidate = 3600;

/** Normalized sitemap changefreq (weekly only for this project). */
type ChangeFreq = "weekly";

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
};

const SITEMAP_DATA = groq`{
  "raccomandate": *[
    _type == "raccomandataPage" &&
    defined(code) &&
    !(_id in path("drafts.**"))
  ]{
    "code": code,
    _updatedAt
  },
  "cmps": *[
    _type == "cmpPage" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ]{
    "slug": slug.current,
    _updatedAt
  },
  "market": *[
    _type == "raccomandataMarketPage" &&
    !(_id in path("drafts.**"))
  ][0]{
    "slug": slug.current,
    _updatedAt
  }
}`;

type SanitySitemapPayload = {
  raccomandate?: Array<{ code?: string; _updatedAt?: string }>;
  cmps?: Array<{ slug?: string; _updatedAt?: string }>;
  market?: { slug?: string; _updatedAt?: string } | null;
};

/** Static / fallback: current instant as ISO 8601 (task spec). */
function lastmodNow(): string {
  return new Date().toISOString();
}

/** Dynamic: derive from Sanity `_updatedAt`; never empty. */
function lastmodFromSanity(updatedAt?: string | null): string {
  if (!updatedAt) return lastmodNow();
  const d = new Date(updatedAt);
  if (Number.isNaN(d.getTime())) return lastmodNow();
  return d.toISOString();
}

function maxLastmodFromSanity(dates: Array<string | undefined>): string {
  const times = dates
    .filter(Boolean)
    .map((s) => new Date(s as string).getTime())
    .filter((t) => !Number.isNaN(t));
  if (times.length === 0) return lastmodNow();
  return new Date(Math.max(...times)).toISOString();
}

function escapeXmlLoc(url: string): string {
  return url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildUrlElement(e: SitemapEntry): string {
  return [
    "  <url>",
    `    <loc>${escapeXmlLoc(e.loc)}</loc>`,
    `    <lastmod>${e.lastmod}</lastmod>`,
    `    <changefreq>${e.changefreq}</changefreq>`,
    `    <priority>${e.priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemapXml(entries: SitemapEntry[]): string {
  const body = entries.map(buildUrlElement).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

function pickNewerLastmod(a: string, b: string): string {
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

function mergeEntries(list: SitemapEntry[]): SitemapEntry[] {
  const byLoc = new Map<string, SitemapEntry>();
  for (const e of list) {
    const prev = byLoc.get(e.loc);
    if (!prev) {
      byLoc.set(e.loc, e);
      continue;
    }
    if (e.priority > prev.priority) {
      byLoc.set(e.loc, e);
    } else if (e.priority < prev.priority) {
      continue;
    } else {
      byLoc.set(e.loc, {
        ...prev,
        lastmod: pickNewerLastmod(prev.lastmod, e.lastmod),
      });
    }
  }
  return [...byLoc.values()].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.loc.localeCompare(b.loc);
  });
}

export async function GET() {
  const base = getSiteOrigin();
  const data = await sanityClient.fetch<SanitySitemapPayload>(
    SITEMAP_DATA,
    {},
    { cache: "no-store" }
  );

  const cmps = data.cmps ?? [];
  const raccomandate = data.raccomandate ?? [];

  const staticPaths = ["/contatti", "/privacy", "/termini"] as const;
  const staticEntries: SitemapEntry[] = staticPaths.map((path) => ({
    loc: `${base}${path}`,
    lastmod: lastmodNow(),
    changefreq: "weekly",
    priority: 0.7,
  }));

  const raccomandataEntries: SitemapEntry[] = raccomandate
    .map((item) => {
      const codeSlug = String(item.code ?? "")
        .trim()
        .toLowerCase();
      if (!codeSlug) return null;
      return {
        loc: `${base}/raccomandata/${encodeURIComponent(codeSlug)}`,
        lastmod: lastmodFromSanity(item._updatedAt),
        changefreq: "weekly" as const,
        priority: 0.7,
      } satisfies SitemapEntry;
    })
    .filter((e): e is SitemapEntry => e !== null);

  const cmpDetailEntries: SitemapEntry[] = cmps
    .map((item) => {
      const slug = String(item.slug ?? "").trim();
      if (!slug) return null;
      return {
        loc: `${base}/raccomandata/cmp/${encodeURIComponent(slug)}`,
        lastmod: lastmodFromSanity(item._updatedAt),
        changefreq: "weekly" as const,
        priority: 0.7,
      } satisfies SitemapEntry;
    })
    .filter((e): e is SitemapEntry => e !== null);

  const marketSlug = String(data.market?.slug ?? "raccomandata-market")
    .trim()
    .replace(/^\/+/, "")
    .split("/")[0];
  const marketSegment = marketSlug || "raccomandata-market";

  const entries: SitemapEntry[] = [
    {
      loc: `${base}/`,
      lastmod: lastmodNow(),
      changefreq: "weekly",
      priority: 1,
    },
    ...staticEntries,
    {
      loc: `${base}/raccomandata/cmp`,
      lastmod: maxLastmodFromSanity(cmps.map((c) => c._updatedAt)),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: `${base}/${encodeURIComponent(marketSegment)}`,
      lastmod: lastmodFromSanity(data.market?._updatedAt),
      changefreq: "weekly",
      priority: 0.9,
    },
    ...raccomandataEntries,
    ...cmpDetailEntries,
  ];

  const merged = mergeEntries(entries);
  const xml = buildSitemapXml(merged);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
