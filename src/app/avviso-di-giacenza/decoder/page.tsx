import type { Metadata } from "next";
import TopNav from "@/components/ui/TopNav";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import AvvisoDecoder from "@/components/avviso/AvvisoDecoder";
import { alternatesItalianCanonical } from "@/lib/seo/hreflang";
import { getSiteOrigin } from "@/lib/siteUrl";

export const revalidate = 3600;

const siteUrl = getSiteOrigin();
const canonical = `${siteUrl}/avviso-di-giacenza/decoder`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Decoder avviso di giacenza: capisci il mittente e il codice",
  description:
    "Strumento interattivo per decodificare avvisi di giacenza, avviso di cortesia e raccomandate con un primo orientamento rapido.",
  alternates: alternatesItalianCanonical(canonical),
  keywords: [
    "decoder avviso di giacenza",
    "avviso di giacenza decoder",
    "avviso di cortesia",
    "codice avviso di giacenza",
    "raccomandata decoder",
  ],
  openGraph: {
    type: "article",
    locale: "it_IT",
    url: canonical,
    siteName: "Arauze",
    title: "Decoder avviso di giacenza: capisci il mittente e il codice",
    description:
      "Strumento interattivo per decodificare avvisi di giacenza, avviso di cortesia e raccomandate con un primo orientamento rapido.",
  },
  twitter: {
    card: "summary",
    title: "Decoder avviso di giacenza: capisci il mittente e il codice",
    description:
      "Strumento interattivo per decodificare avvisi di giacenza, avviso di cortesia e raccomandate con un primo orientamento rapido.",
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
        name: "Decoder avviso di giacenza",
        description:
          "Strumento interattivo per decodificare avvisi di giacenza e avvisi di cortesia.",
        inLanguage: "it",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Il decoder sostituisce la verifica ufficiale?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Serve per orientarsi in pochi secondi, ma il documento originale e i canali ufficiali restano la verifica finale.",
            },
          },
          {
            "@type": "Question",
            name: "Posso usarlo senza inserire il codice?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sì. Anche senza codice il decoder usa formato, mittente e presenza di una scadenza per suggerire il cluster più probabile.",
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

export default function AvvisoDecoderPage() {
  return (
    <>
      <SeoJsonLd />
      <main className="mx-auto max-w-5xl px-4" aria-label="Decoder avviso di giacenza">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-10">
          <TopNav />
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Avviso di giacenza", href: "/avviso-di-giacenza" },
              { label: "Decoder avviso" },
            ]}
          />

          <div className="mt-8 space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
              Strumento interattivo
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Decoder avviso di giacenza
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              Un assistente rapido per capire se il tuo avviso sembra una giacenza
              postale, un avviso di cortesia, una notifica fiscale o un atto
              giudiziario. Inserisci qualche indizio e ottieni il cluster più
              probabile con le schede da aprire per prime.
            </p>
          </div>

          <AvvisoDecoder />
        </div>
      </main>
    </>
  );
}
