import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/ui/TopNav";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import EditorialTrustStrip from "@/components/seo/EditorialTrustStrip";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 3600;

const siteUrl = getSiteOrigin();
const canonical = `${siteUrl}/codice-tributo/f24`;

const f24Links = [
  {
    href: "/codice-tributo/codice-tributo-f24",
    title: "Codice tributo F24",
    text: "Spiegazione pratica del rapporto tra codice e modello di pagamento.",
  },
  {
    href: "/codice-tributo/codice-tributo-imu",
    title: "IMU",
    text: "Una delle ricerche più forti quando l'F24 riguarda immobili e scadenze.",
  },
  {
    href: "/codice-tributo/codice-tributo-tari",
    title: "TARI",
    text: "Guida utile per i pagamenti locali e i codici tributo più comuni.",
  },
  {
    href: "/codice-tributo/codice-tributo-ravvedimento-operoso",
    title: "Ravvedimento operoso",
    text: "Per correggere errori o pagare con sanzioni ridotte.",
  },
  {
    href: "/codice-tributo/codice-tributo-imposta-di-bollo-fatture-elettroniche",
    title: "Bollo fatture elettroniche",
    text: "Percorso dedicato ai pagamenti periodici più cercati.",
  },
  {
    href: "/codice-tributo",
    title: "Hub Codice tributo",
    text: "La porta d'ingresso se stai cercando il significato del codice.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "F24: come leggere il modello e scegliere il codice tributo",
  description:
    "Guida pratica al modello F24: come orientarsi tra codici tributo, IMU, TARI, ravvedimento operoso e imposta di bollo.",
  alternates: alternatesItalianCanonical(canonical),
  keywords: [
    "F24",
    "codice tributo F24",
    "IMU F24",
    "TARI F24",
    "ravvedimento operoso",
  ],
  openGraph: {
    type: "article",
    locale: "it_IT",
    url: canonical,
    siteName: "Arauze",
    title: "F24: come leggere il modello e scegliere il codice tributo",
    description:
      "Guida pratica al modello F24: come orientarsi tra codici tributo, IMU, TARI, ravvedimento operoso e imposta di bollo.",
  },
  twitter: {
    card: "summary",
    title: "F24: come leggere il modello e scegliere il codice tributo",
    description:
      "Guida pratica al modello F24: come orientarsi tra codici tributo, IMU, TARI, ravvedimento operoso e imposta di bollo.",
  },
  robots: { index: true, follow: true },
};

function SeoJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "F24: come leggere il modello e scegliere il codice tributo",
        description:
          "Guida pratica al modello F24 e ai codici tributo più cercati.",
        inLanguage: "it",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Che cos'è l'F24?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "È il modello usato per pagare molti tributi e contributi in Italia, dal singolo codice tributo fino ai pagamenti periodici.",
            },
          },
          {
            "@type": "Question",
            name: "Da dove parto se non so quale codice usare?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Parti dal tipo di imposta: IMU, TARI, ravvedimento operoso o imposta di bollo. Poi apri la guida specifica del codice tributo.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function F24Page() {
  return (
    <>
      <SeoJsonLd />
      <main className="mx-auto max-w-5xl px-4" aria-label="Guida F24">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
          <TopNav />
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Codice tributo", href: "/codice-tributo" },
              { label: "F24" },
            ]}
          />

          <section className="mt-8 space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
              Guida operativa
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              F24: come leggere il modello e scegliere il codice tributo
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              L'F24 non è un elenco di sigle da memorizzare. È un percorso che parte dal
              tipo di imposta e arriva al codice giusto, senza confondere il tributo con
              la notifica o con la semplice ricerca del numero.
            </p>
          </section>

          <EditorialTrustStrip
            title="Perché questa guida è diversa"
            items={[
              {
                title: "Parte dal problema",
                text: "Prima capisci quale pagamento stai facendo, poi scegli il codice.",
              },
              {
                title: "Collega i cluster",
                text: "IMU, TARI, ravvedimento operoso e bollo non vivono in pagine separate a caso.",
              },
              {
                title: "Riduce l'errore",
                text: "La pagina porta alle guide utili invece di lasciare il lettore con informazioni sparse.",
              },
            ]}
          />

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Se paghi IMU"
              text="Apri la guida specifica per l'imposta e verifica il codice prima di procedere."
            />
            <InfoCard
              title="Se paghi TARI"
              text="Controlla il periodo, il comune e il codice tributo giusto per evitare errori."
            />
            <InfoCard
              title="Se correggi un pagamento"
              text="Il ravvedimento operoso richiede attenzione al tributo, alle sanzioni e alle scadenze."
            />
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Percorsi più utili</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {f24Links.map((item) => (
                <LinkCard
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  text={item.text}
                />
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Esplora anche</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <LinkCard
                href="/codice-tributo"
                title="Hub Codice tributo"
                text="Torna all'elenco generale dei codici e delle guide."
              />
              <LinkCard
                href="/avviso-di-giacenza"
                title="Avviso di giacenza"
                text="Se il problema nasce da una notifica postale, parti da qui."
              />
              <LinkCard
                href="/multe"
                title="Multe"
                text="Se l'avviso è più delicato, passa al cluster giudiziario."
              />
              <LinkCard
                href="/avviso-di-giacenza/decoder"
                title="Decoder avviso"
                text="Un secondo filtro utile quando hai dubbi sul tipo di messaggio."
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function LinkCard({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
    >
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Link>
  );
}
