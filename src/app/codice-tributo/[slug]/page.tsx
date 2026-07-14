import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityClient } from "sanity/lib/client";
import {
  CODICE_TRIBUTO_BY_SLUG,
  CODICE_TRIBUTO_LIST,
} from "sanity/lib/queries/codiceTributo";
import TopNav from "@/components/ui/TopNav";
import CodiceTributoJsonLd from "@/components/seo/CodiceTributoJsonLd";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";
import {
  CODICE_TRIBUTO_SEEDS,
  getCodiceTributoSeed,
} from "@/lib/seo/keywordSeeds";

type PageParams = { slug?: string };

type CodiceTributoPageDoc = {
  slug?: string;
  kind?: "code" | "guide";
  code?: string;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  heroSubtitle?: string;
  sections?: { title?: string; body?: string[]; paragraphs?: string[] }[];
  highlights?: string[];
  faq?: { q?: string; a?: string }[];
  updatedAt?: string;
};

export const revalidate = 3600;

function getPage(slug: string) {
  return getCodiceTributoSeed(slug);
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const pages = await sanityClient.fetch<Array<{ slug?: string }>>(
    CODICE_TRIBUTO_LIST,
    {},
    { next: { revalidate } }
  );
  const slugs = new Set<string>(
    [
      ...(pages ?? []).map((item) => (item.slug ?? "").trim().toLowerCase()),
      ...CODICE_TRIBUTO_SEEDS.map((item) => item.slug.trim().toLowerCase()),
    ].filter(Boolean)
  );

  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const normalized = (slug ?? "").trim().toLowerCase();
  const sanityPage = await sanityClient.fetch<CodiceTributoPageDoc>(
    CODICE_TRIBUTO_BY_SLUG,
    { slug: normalized },
    { next: { revalidate } }
  );
  const page = sanityPage ?? getPage(normalized);
  const siteUrl = getSiteOrigin();
  const canonical = `${siteUrl}/codice-tributo/${encodeURIComponent(normalized)}`;

  if (!page) {
    return {
      title: "Codice tributo",
      description: "Guida editoriale ai codici tributo e all'uso nell'F24.",
      alternates: alternatesItalianCanonical(canonical),
    };
  }

  return {
    title: page.metaTitle ?? page.title ?? "Codice tributo",
    description:
      page.metaDescription ?? page.heroSubtitle ?? "Guida editoriale ai codici tributo.",
    alternates: alternatesItalianCanonical(canonical),
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: canonical,
      siteName: "Arauze.com",
      title: page.metaTitle ?? page.title ?? "Codice tributo",
      description:
        page.metaDescription ?? page.heroSubtitle ?? "Guida editoriale ai codici tributo.",
    },
    twitter: {
      card: "summary",
      title: page.metaTitle ?? page.title ?? "Codice tributo",
      description:
        page.metaDescription ?? page.heroSubtitle ?? "Guida editoriale ai codici tributo.",
    },
  };
}

export default async function CodiceTributoPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const normalized = (slug ?? "").trim().toLowerCase();
  const sanityPage = await sanityClient.fetch<CodiceTributoPageDoc>(
    CODICE_TRIBUTO_BY_SLUG,
    { slug: normalized },
    { next: { revalidate } }
  );
  const page = sanityPage ?? getPage(normalized);

  if (!page) notFound();

  const title = page.title ?? "Codice tributo";
  const heroSubtitle =
    page.heroSubtitle ?? "Guida editoriale ai codici tributo e ai controlli in F24.";
  const sections = (page.sections ?? []).map((section) => ({
    title: section.title ?? "",
    paragraphs: section.body ?? section.paragraphs ?? [],
  }));
  const highlights = page.highlights ?? [];
  const faqItems = page.faq ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
        <TopNav />
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Codice tributo", href: "/codice-tributo" },
            { label: title },
          ]}
        />

        <div className="mt-10 space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-[#2552AD]">
            {page.kind === "code" ? `Codice ${page.code ?? page.slug}` : "Guida tributi"}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {heroSubtitle}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Punti rapidi
            </h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">FAQ</h2>
            <div className="mt-4 space-y-4">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                  <summary className="cursor-pointer list-none font-medium text-slate-900">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <Link
              href="/codice-tributo"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
            >
              <h2 className="text-base font-semibold text-slate-900">Hub codice tributo</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Torna al hub per esplorare gli altri codici e le guide più cercate.
              </p>
            </Link>
            <Link
              href="/raccomandata-market"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
            >
              <h2 className="text-base font-semibold text-slate-900">Raccomandata Market</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Collegamento utile per chi cerca notifiche e codici postali correlati.
              </p>
            </Link>
            <Link
              href={page.kind === "code" ? "/codice-tributo/imu" : "/codice-tributo/f24"}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
            >
              <h2 className="text-base font-semibold text-slate-900">Approfondimento guida</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Parti da una guida tematica per capire meglio il contesto fiscale.
              </p>
            </Link>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/codice-tributo"
              className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Torna all&apos;hub
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <CodiceTributoJsonLd
        input={{
          slug: page.slug,
          title,
          metaTitle: page.metaTitle ?? title,
          metaDescription: page.metaDescription ?? heroSubtitle,
          heroSubtitle,
          code: page.code,
          kind: page.kind,
          faq: faqItems,
        }}
      />
    </main>
  );
}

