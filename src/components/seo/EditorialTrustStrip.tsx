import { Check } from "lucide-react";

type TrustItem = {
  title: string;
  text: string;
};

const DEFAULT_ITEMS: TrustItem[] = [
  {
    title: "Analisi editoriale",
    text: "Ogni pagina punta a spiegare il contesto, non solo a mostrare un codice.",
  },
  {
    title: "Aggiornato spesso",
    text: "La struttura del sito privilegia contenuti facili da mantenere e correggere.",
  },
  {
    title: "Fonti e utilit뿯½",
    text: "I contenuti rimandano a schede, hub e strumenti davvero utili per decidere il passo successivo.",
  },
];

export default function EditorialTrustStrip({
  title = "Come lavoriamo",
  items = DEFAULT_ITEMS,
}: {
  title?: string;
  items?: TrustItem[];
}) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
            Criterio editoriale
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Il sito deve chiarire prima di tutto cosa fare e dove andare, senza sembrare una
          lista automatica di codici.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
