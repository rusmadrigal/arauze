import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/ui/TopNav";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import EditorialTrustStrip from "@/components/seo/EditorialTrustStrip";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 3600;

const siteUrl = getSiteOrigin();
const canonical = `${siteUrl}/multe`;

const urgentCodes = [
  {
    code: "386",
    label: "Codice 386",
    note: "atti giudiziari e multe con urgenza alta",
  },
  {
    code: "617",
    label: "Codice 617",
    note: "solleciti amministrativi e atti da trattare subito",
  },
  {
    code: "619",
    label: "Codice 619",
    note: "notifiche fiscali e atti giudiziari",
  },
  {
    code: "669",
    label: "Codice 669",
    note: "multe e notifiche amministrative",
  },
  {
    code: "786",
    label: "Codice 786",
    note: "atti giudiziari e comunicazioni legali",
  },
  {
    code: "788",
    label: "Codice 788",
    note: "atti giudiziari e raccomandate market",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Multe e atti giudiziari: codici, urgenza e cosa fare",
  description:
    "Guida editoriale ai codici più cercati quando una notifica riguarda multe, atti giudiziari o comunicazioni amministrative delicate.",
  alternates: alternatesItalianCanonical(canonical),
  keywords: [
    "multe",
    "atti giudiziari",
    "codice 386",
    "codice 617",
    "codice 669",
    "codice 786",
  ],
  openGraph: {
    type: "article",
    locale: "it_IT",
    url: canonical,
    siteName: "Arauze",
    title: "Multe e atti giudiziari: codici, urgenza e cosa fare",
    description:
      "Guida editoriale ai codici più cercati quando una notifica riguarda multe, atti giudiziari o comunicazioni amministrative delicate.",
  },
  twitter: {
    card: "summary",
    title: "Multe e atti giudiziari: codici, urgenza e cosa fare",
    description:
      "Guida editoriale ai codici più cercati quando una notifica riguarda multe, atti giudiziari o comunicazioni amministrative delicate.",
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
        name: "Multe e atti giudiziari: codici, urgenza e cosa fare",
        description:
          "Guida editoriale per leggere multe, atti giudiziari e notifiche amministrative.",
        inLanguage: "it",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Una multa va sempre trattata come urgente?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sì, conviene trattarla come prioritaria finché non hai capito con certezza il contenuto e la scadenza.",
            },
          },
          {
            "@type": "Question",
            name: "Quali codici devo controllare per primi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I più frequenti sono 386, 617, 619, 669, 786 e 788, perché ricorrono spesso nelle notifiche più delicate.",
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

export default function MultePage() {
  return (
    <>
      <SeoJsonLd />
      <main className="mx-auto max-w-5xl px-4" aria-label="Multe e atti giudiziari">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
          <TopNav />
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Multe e atti giudiziari" },
            ]}
          />

          <section className="mt-8 space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
              Cluster ad alta intenzione
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Multe e atti giudiziari: i codici da controllare subito
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              Quando una notifica sembra delicata, la priorità non è leggere tutto ma
              capire subito se si tratta di una multa, di un atto giudiziario o di una
              comunicazione amministrativa con scadenza.
            </p>
          </section>

          <EditorialTrustStrip
            title="Perché questo cluster è importante"
            items={[
              {
                title: "Urgenza reale",
                text: "Qui la priorità è ridurre il tempo tra ricezione della notifica e comprensione del rischio.",
              },
              {
                title: "Codici ricorrenti",
                text: "I codici collegati a multe e atti giudiziari sono tra le query con maggiore intento informativo.",
              },
              {
                title: "Percorso chiaro",
                text: "Dal codice puoi andare alla scheda giusta o tornare al decoder per un secondo filtro.",
              },
            ]}
          />

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Se c'è una scadenza"
              text="Tratta la notifica come prioritaria e apri subito il dettaglio del codice o il decoder."
            />
            <InfoCard
              title="Se manca chiarezza"
              text="Confronta mittente, formato e ufficio di ritiro: spesso bastano per restringere il cluster."
            />
            <InfoCard
              title="Se è un atto giudiziario"
              text="Non fermarti alla sigla: controlla anche CMP, mittente e pagina di riferimento collegata."
            />
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Codici più utili</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {urgentCodes.map((item) => (
                <LinkCard
                  key={item.code}
                  href={`/raccomandata/${item.code.toLowerCase()}`}
                  title={item.label}
                  text={item.note}
                />
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Esplora anche</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <LinkCard
                href="/avviso-di-giacenza"
                title="Avviso di giacenza"
                text="Hub principale para entender el contexto de la notifica."
              />
              <LinkCard
                href="/avviso-di-giacenza/decoder"
                title="Decoder avviso"
                text="Filtra el mensaje por mittente, formato y scadenza."
              />
              <LinkCard
                href="/raccomandata/cmp"
                title="Centri CMP"
                text="Consulta i centri di smistamento più utili per le notifiche."
              />
              <LinkCard
                href="/raccomandata-market"
                title="Raccomandata Market"
                text="Elenco analizzato dei codici e dei mittenti più frequenti."
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
