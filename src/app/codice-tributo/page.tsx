import type { Metadata } from "next";
import Link from "next/link";
import { sanityClient } from "sanity/lib/client";
import { CODICE_TRIBUTO_LIST } from "sanity/lib/queries/codiceTributo";
import TopNav from "@/components/ui/TopNav";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";
import { CODICE_TRIBUTO_SEEDS } from "@/lib/seo/keywordSeeds";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";

export const revalidate = 3600;

const siteUrl = getSiteOrigin();
const canonical = `${siteUrl}/codice-tributo`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Codice tributo 2026: guide, codici F24 e pagine utili",
  description:
    "Hub editoriale sui codici tributo più cercati: IMU, TARI, F24, cedolare secca, bollo fatture elettroniche e ravvedimento operoso.",
  alternates: alternatesItalianCanonical(canonical),
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: canonical,
    siteName: "Arauze.com",
    title: "Codice tributo 2026: guide, codici F24 e pagine utili",
    description:
      "Hub editoriale sui codici tributo più cercati: IMU, TARI, F24, cedolare secca, bollo fatture elettroniche e ravvedimento operoso.",
  },
  twitter: {
    card: "summary",
    title: "Codice tributo 2026: guide, codici F24 e pagine utili",
    description:
      "Hub editoriale sui codici tributo più cercati: IMU, TARI, F24, cedolare secca, bollo fatture elettroniche e ravvedimento operoso.",
  },
  robots: { index: true, follow: true },
};

type CodiceTributoListItem = {
  slug?: string;
  kind?: "code" | "guide";
  title?: string;
  metaDescription?: string;
};

async function getCodiceTributoItems() {
  const docs = await sanityClient.fetch<CodiceTributoListItem[]>(
    CODICE_TRIBUTO_LIST,
    {},
    { next: { revalidate } }
  );

  const map = new Map<string, { slug: string; kind: "code" | "guide"; title: string; metaDescription: string }>();
  for (const item of [...(docs ?? []), ...CODICE_TRIBUTO_SEEDS]) {
    const slug = (item.slug ?? "").trim().toLowerCase();
    if (!slug) continue;
    if (map.has(slug)) continue;
    map.set(slug, {
      slug,
      kind: (item.kind ?? "guide") as "code" | "guide",
      title: item.title ?? slug,
      metaDescription:
        "metaDescription" in item && typeof item.metaDescription === "string"
          ? item.metaDescription
          : "Guida editoriale ai codici tributo e all'uso nell'F24.",
    });
  }

  return [...map.values()];
}

export default async function CodiceTributoHomePage() {
  const items = await getCodiceTributoItems();
  const guides = items.filter((item) => item.kind === "guide");
  const codes = items.filter((item) => item.kind === "code");

  return (
    <main className="mx-auto max-w-5xl px-4">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
        <TopNav />
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Codice tributo" },
          ]}
        />
        <div className="mt-10 space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Codice tributo: guide pratiche e codici F24
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Una raccolta editoriale pensata per chi cerca il significato di un codice tributo,
            vuole capire come leggerlo nell&apos;F24 o sta cercando una guida per IMU, TARI,
            cedolare secca, ravvedimento operoso e imposta di bollo.
          </p>
        </div>

        <section className="mt-10 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((item) => (
              <Card key={item.slug} href={`/codice-tributo/${item.slug}`} title={item.title} description={item.metaDescription} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Codici più cercati
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {codes.map((item) => (
              <Card key={item.slug} href={`/codice-tributo/${item.slug}`} title={item.title} description={item.metaDescription} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          <Link
            href="/raccomandata-market"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
          >
            <h2 className="text-base font-semibold text-slate-900">Raccomandata Market</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Collega i codici F24 alle notifiche più cercate del mercato postale.
            </p>
          </Link>
          <Link
            href="/codice-tributo/imu"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
          >
            <h2 className="text-base font-semibold text-slate-900">IMU</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Vai subito alle guide più cercate su IMU, acconto e saldo.
            </p>
          </Link>
          <Link
            href="/codice-tributo/f24"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
          >
            <h2 className="text-base font-semibold text-slate-900">F24</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Hub utile per leggere correttamente il modello e scegliere il tributo.
            </p>
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteUrl}/codice-tributo/${encodeURIComponent(item.slug)}`,
              name: item.title,
            })),
          }),
        }}
      />
    </main>
  );
}

function Card({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
    >
      <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#2552AD]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </Link>
  );
}

