import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/ui/TopNav";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import EditorialTrustStrip from "@/components/seo/EditorialTrustStrip";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 3600;

const siteUrl = getSiteOrigin();
const canonical = `${siteUrl}/avviso-di-cortesia`;

const courtesyCodes = [
  {
    code: "572",
    label: "Codice 572",
    note: "spesso collegato ad avvisi preliminari o a comunicazioni fiscali leggere",
  },
  {
    code: "5727",
    label: "Codice 5727",
    note: "variante molto cercata nei casi di RKE e cortesia postale",
  },
  {
    code: "1-g30",
    label: "1-g30",
    note: "ricorre nei tracciamenti postali e nei preavvisi informativi",
  },
  {
    code: "07a",
    label: "07a",
    note: "codice corto che compare in alcune comunicazioni di cortesia",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Avviso di cortesia: significato, codici e cosa controllare",
  description:
    "Guida editoriale all'avviso di cortesia: codici più cercati, differenza con l'avviso di giacenza e collegamenti utili per capire il messaggio.",
  alternates: alternatesItalianCanonical(canonical),
  keywords: [
    "avviso di cortesia",
    "avviso di cortesia poste italiane",
    "codice 572",
    "codice 5727",
    "1-g30",
    "07a",
  ],
  openGraph: {
    type: "article",
    locale: "it_IT",
    url: canonical,
    siteName: "Arauze",
    title: "Avviso di cortesia: significato, codici e cosa controllare",
    description:
      "Guida editoriale all'avviso di cortesia: codici più cercati, differenza con l'avviso di giacenza e collegamenti utili per capire il messaggio.",
  },
  twitter: {
    card: "summary",
    title: "Avviso di cortesia: significato, codici e cosa controllare",
    description:
      "Guida editoriale all'avviso di cortesia: codici più cercati, differenza con l'avviso di giacenza e collegamenti utili per capire il messaggio.",
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
        name: "Avviso di cortesia: significato, codici e cosa controllare",
        description:
          "Guida editoriale all'avviso di cortesia con i codici più cercati e i collegamenti utili.",
        inLanguage: "it",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "L'avviso di cortesia è uguale all'avviso di giacenza?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. L'avviso di cortesia è in genere un preavviso o un messaggio informativo; l'avviso di giacenza indica invece che c'è già qualcosa da ritirare.",
            },
          },
          {
            "@type": "Question",
            name: "Quali codici guardare per primi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I più utili sono 572, 5727, 1-g30 e 07a, perché compaiono spesso nelle ricerche di cortesia e RKE.",
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

export default function AvvisoCortesiaPage() {
  return (
    <>
      <SeoJsonLd />
      <main className="mx-auto max-w-5xl px-4" aria-label="Avviso di cortesia">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
          <TopNav />
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Avviso di giacenza", href: "/avviso-di-giacenza" },
              { label: "Avviso di cortesia" },
            ]}
          />

          <section className="mt-8 space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
              Cluster editoriale
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Avviso di cortesia: come leggerlo senza confonderlo con una giacenza
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              Questo cluster raccoglie i casi più frequenti quando il messaggio sembra
              solo informativo, ma in realtà va interpretato con attenzione. Qui trovi i
              codici più cercati, il contesto e i collegamenti rapidi per non perdere
              tempo.
            </p>
          </section>

          <EditorialTrustStrip
            title="Perché questa pagina serve"
            items={[
              {
                title: "Preavviso, non rumore",
                text: "Separiamo i messaggi solo informativi da quelli che possono richiedere una verifica più attenta.",
              },
              {
                title: "Codici ad alta domanda",
                text: "I codici più cercati qui coincidono con le ricerche reali che portano gli utenti al sito.",
              },
              {
                title: "Risultato utile",
                text: "Ogni scheda porta alla lettura giusta invece di lasciare l'utente su una pagina generica.",
              },
            ]}
          />

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Come riconoscerlo"
              text="Spesso il tono è più leggero di un avviso di giacenza: meno urgenza, più informazione preliminare o tracciamento."
            />
            <InfoCard
              title="Quando fare attenzione"
              text="Se compare un codice corto, un riferimento RKE o un richiamo a Poste Italiane, conviene aprire subito la scheda corretta."
            />
            <InfoCard
              title="Dove andare dopo"
              text="Se hai già il numero o vuoi un secondo parere, il decoder e la guida di giacenza sono i passaggi più utili."
            />
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Codici da aprire subito</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {courtesyCodes.map((item) => (
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
                href="/avviso-di-giacenza/decoder"
                title="Decoder avviso"
                text="Usa il tool per capire in pochi secondi il cluster più probabile."
              />
              <LinkCard
                href="/avviso-di-giacenza"
                title="Avviso di giacenza"
                text="Hub principale per leggere il codice, il mittente e l'urgenza."
              />
              <LinkCard
                href="/raccomandata-market"
                title="Raccomandata Market"
                text="Altra porta d'ingresso per i codici e i mittenti più frequenti."
              />
              <LinkCard
                href="/multe"
                title="Multe"
                text="Se il contenuto sembra più delicato, passa al cluster dedicato."
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
