import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/ui/TopNav";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 3600;

const siteUrl = getSiteOrigin();
const canonical = `${siteUrl}/avviso-di-giacenza`;

const keyCodes = [
  { code: "201", label: "Codice 201", note: "avvisi fiscali e notifiche di pagamento" },
  { code: "386", label: "Codice 386", note: "atti giudiziari e multe" },
  { code: "617", label: "Codice 617", note: "solleciti amministrativi e atti giudiziari" },
  { code: "619", label: "Codice 619", note: "atti giudiziari e comunicazioni fiscali" },
  { code: "665", label: "Codice 665", note: "raccomandate market e posta" },
  { code: "669", label: "Codice 669", note: "multe e notifiche amministrative" },
  { code: "697", label: "Codice 697", note: "avvisi fiscali e notifiche importanti" },
  { code: "786", label: "Codice 786", note: "atti giudiziari e notifiche legali" },
  { code: "788", label: "Codice 788", note: "atti giudiziari e raccomandate market" },
  { code: "529", label: "Codice 529", note: "recupero crediti e comunicazioni" },
  { code: "549", label: "Codice 549", note: "comunicazioni fiscali e amministrative" },
  { code: "200", label: "Codice 200", note: "avvisi fiscali e amministrativi" },
  { code: "616", label: "Codice 616", note: "controlli bancari e comunicazioni" },
] as const;

const courtesyCodes = [
  { code: "572", label: "Codice 572", note: "avviso di cortesia e Agenzia delle Entrate" },
  { code: "5727", label: "Codice 5727", note: "varianti RKE e cortesia" },
  { code: "1-g30", label: "1-g30", note: "tracciamento postale e cortesia" },
  { code: "07a", label: "07a", note: "comunicazione interna e cortesia" },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Avviso di giacenza: significato, codici e cosa fare",
  description:
    "Guida pratica per capire un avviso di giacenza: codici più frequenti, avviso di cortesia, atti giudiziari, multe e notifiche fiscali.",
  alternates: alternatesItalianCanonical(canonical),
  keywords: [
    "avviso di giacenza",
    "avvisi di giacenza",
    "avviso di cortesia",
    "codice avviso di giacenza",
    "poste italiane avviso di giacenza",
    "atti giudiziari avviso di giacenza",
  ],
  openGraph: {
    type: "article",
    locale: "it_IT",
    url: canonical,
    siteName: "Arauze",
    title: "Avviso di giacenza: significato, codici e cosa fare",
    description:
      "Guida pratica per capire un avviso di giacenza: codici più frequenti, avviso di cortesia, atti giudiziari, multe e notifiche fiscali.",
  },
  twitter: {
    card: "summary",
    title: "Avviso di giacenza: significato, codici e cosa fare",
    description:
      "Guida pratica per capire un avviso di giacenza: codici più frequenti, avviso di cortesia, atti giudiziari, multe e notifiche fiscali.",
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
        name: "Avviso di giacenza: significato, codici e cosa fare",
        description:
          "Guida pratica per capire un avviso di giacenza: codici più frequenti, avviso di cortesia, atti giudiziari, multe e notifiche fiscali.",
        inLanguage: "it",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Un avviso di giacenza significa sempre qualcosa di urgente?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non sempre, ma conviene controllarlo subito: spesso riguarda notifiche fiscali, atti giudiziari, multe o comunicazioni con una scadenza.",
            },
          },
          {
            "@type": "Question",
            name: "Che differenza c'è tra avviso di giacenza e avviso di cortesia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "L'avviso di cortesia è una segnalazione preliminare o informativa; l'avviso di giacenza indica invece che un atto è già disponibile per il ritiro.",
            },
          },
          {
            "@type": "Question",
            name: "Quali codici devo guardare per primi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I più utili sono quelli collegati ad atti giudiziari, multe e notifiche fiscali, come 201, 386, 617, 619, 669, 697, 786 e 788.",
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

export default function AvvisoGiacenzaPage() {
  return (
    <>
      <SeoJsonLd />
      <main className="mx-auto max-w-5xl px-4" aria-label="Guida avviso di giacenza">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
          <TopNav />
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Avviso di giacenza" },
            ]}
          />

          <section className="mt-8 space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
              Guida pratica
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Avviso di giacenza: come capire subito cosa significa
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              Se hai trovato un avviso in cassetta, la lettura giusta parte dal codice.
              Qui raccogliamo i casi più cercati in Italia per capire se si tratta di
              posta raccomandata, atti giudiziari, multe, comunicazioni fiscali o di un
              semplice avviso di cortesia.
            </p>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <InfoCard
              title="Prime verifiche"
              text="Controlla codice, mittente, ufficio di ritiro e data: sono i dettagli che chiariscono quasi sempre il contenuto."
            />
            <InfoCard
              title="Messaggi fiscali"
              text="Molti avvisi rimandano ad Agenzia delle Entrate, solleciti o documenti collegati a pagamenti e scadenze."
            />
            <InfoCard
              title="Atti giudiziari e multe"
              text="Se il codice è vicino a 386, 617, 619, 669, 786 o 788, conviene trattarlo con attenzione immediata."
            />
          </section>

          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Codici da controllare subito
                </h2>
                <p className="mt-2 max-w-2xl text-slate-600">
                  Sono i codici che nello studio delle keyword mostrano la domanda più
                  solida. Li abbiamo messi qui per portare al dettaglio giusto in un
                  clic.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {keyCodes.map((item) => (
                <DetailLinkCard
                  key={item.code}
                  href={`/raccomandata/${item.code.toLowerCase()}`}
                  title={item.label}
                  note={item.note}
                />
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Avviso di cortesia</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Quando l&apos;avviso sembra solo informativo, di solito rientra nel
              cluster dell&apos;avviso di cortesia. Ha senso tenerne una sezione
              dedicata perché queste ricerche includono spesso riferimenti RKE e
              messaggi di Poste Italiane.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {courtesyCodes.map((item) => (
                <DetailLinkCard
                  key={item.code}
                  href={`/raccomandata/${item.code.toLowerCase()}`}
                  title={item.label}
                  note={item.note}
                />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Cosa fare adesso</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoCard
                title="1. Verifica il codice"
                text="Usa il codice stampato sull'avviso per aprire la scheda corretta e capire il contesto più probabile."
              />
              <InfoCard
                title="2. Controlla il mittente"
                text="Poste Italiane, Agenzia delle Entrate, banca o ufficio giudiziario sono segnali molto utili per orientarti."
              />
              <InfoCard
                title="3. Rispetta i tempi"
                text="Se c'è un termine di ritiro o una scadenza, conviene muoversi subito e non rimandare la verifica."
              />
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">
              Esplora anche
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <LinkCard
                href="/raccomandata-market"
                title="Raccomandata Market"
                text="Elenco delle schede analizzate e dei codici più utili per capire il mittente."
              />
              <LinkCard
                href="/codice-tributo"
                title="Codice tributo"
                text="Hub pratico per i codici fiscali e le guide F24 più richieste."
              />
              <LinkCard
                href="/raccomandata/cmp"
                title="Centri CMP"
                text="Rete dei CMP principali per completare la lettura delle notifiche postali."
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
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function DetailLinkCard({
  href,
  title,
  note,
}: {
  href: string;
  title: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
    >
      <p className="text-sm font-semibold text-[#2F66D5]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
    </Link>
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
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Link>
  );
}
