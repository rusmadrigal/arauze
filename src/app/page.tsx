"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BottomCTA from "./components/ui/BottomCTA";

export default function HomePage() {
  const r = useRouter();
  const [code, setCode] = useState("");

  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* Card principal */}
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        {/* Header simple */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="font-semibold text-gray-800">Arauze.com</span>
          <nav className="space-x-6">
            <a className="hover:text-gray-700" href="#">Privacy</a>
            <a className="hover:text-gray-700" href="#">Termini</a>
            <a className="hover:text-gray-700" href="#">Contatti</a>
          </nav>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Controlla subito la tua <br />
              <span className="text-brand-600">Raccomandata Online</span>
            </h1>
            <p className="mt-3 text-gray-600">
              Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!code.trim()) return;
                r.push(`/raccomandata/${code.trim()}`);
              }}
              className="mt-6 flex gap-3"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Inserisci il codice..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-brand-50"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 font-semibold transition"
              >
                Cerca
              </button>
            </form>
          </div>

          {/* Ilustración ligera (placeholder) */}
          <div className="hidden md:block">
            <div className="mx-auto h-48 w-72 rounded-xl bg-brand-50/60 relative">
              <div className="absolute right-6 top-6 h-28 w-44 bg-white rounded-lg shadow-card" />
              <div className="absolute left-8 bottom-8 h-10 w-10 rounded-full bg-brand-500/90" />
            </div>
          </div>
        </section>

        {/* Come funziona */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Come funziona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Step icon="🔎" title="Inserisci" subtitle="il codice" />
            <Step icon="⚙️" title="Analisi" subtitle="" />
            <Step icon="ℹ️" title="Risultato" subtitle="" />
          </div>
        </section>

        {/* Ultime Raccomandate Analizzate */}
        <section className="mt-10">
          <h3 className="text-base font-semibold mb-3">Ultime Raccomandate Analizzate</h3>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <Th>Regumatlada</Th>
                  <Th>Urgenza</Th>
                  <Th>Stato</Th>
                  <Th>{null}</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <Row code="573" sender="AGENZIA DEI…" urgency="ALTA" state="IN ATTESA" />
                <Row code="573" sender="AGENZIA DEI…" urgency="BASSA" state="IN ATTESA" />
                <Row code="573" sender="AGENZIA DEI…" urgency="RITIRATA" state="RITIRATA" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Blocco informativo */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-2">
            Che cos’è una raccomandata market, AR o 697?
          </h3>
          <p className="text-gray-600">
            Una samandata da pesta o movio direttament/li-comandanti e di luco-di degettre a luito.
            Riconoscee ita e un denominare tipol una raccomandata strate il-mètelo ala in macchiking.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-3">
            Hai ricevuto una raccomandata? Scoprilo ora.
          </h3>
          <div className="rounded-xl border divide-y">
            <FaqItem q="Come capire ima raccomandata? 3">
              Testo di esempio per la risposta.
            </FaqItem>
            <FaqItem q="Cosa significa raccomandata market 573?">
              Testo di esempio per la risposta.
            </FaqItem>
            <FaqItem q="Come ritirare una raccomandata?">
              Testo di esempio per la risposta.
            </FaqItem>
          </div>
        </section>
      </div>
      {/* Footer CTA */}
      <BottomCTA />
    </main>
  );
}

/* ---------- Componenti UI interni ---------- */
function Step({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="rounded-xl border bg-white p-5 flex items-center gap-4">
      <div className="h-10 w-10 flex items-center justify-center text-lg rounded-full bg-surface">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        {subtitle ? <div className="text-sm text-gray-500">{subtitle}</div> : null}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide">{children}</th>;
}

function Badge({ tone, children }: { tone: "ALTA" | "BASSA" | "RITIRATA"; children: React.ReactNode }) {
  const map: Record<string, string> = {
    ALTA: "bg-rose-100 text-rose-700",
    BASSA: "bg-amber-100 text-amber-700",
    RITIRATA: "bg-emerald-100 text-emerald-700",
  };
  return <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${map[tone]}`}>{children}</span>;
}

function Row({
  code,
  sender,
  urgency,
  state,
}: {
  code: string;
  sender: string;
  urgency: "ALTA" | "BASSA" | "RITIRATA";
  state: string;
}) {
  return (
    <tr className="hover:bg-gray-50/70">
      <td className="px-4 py-3">
        <div className="font-semibold text-base leading-tight">{code}</div>
        <div className="text-xs text-gray-500">{sender}</div>
      </td>
      <td className="px-4 py-3"><Badge tone={urgency}>{urgency}</Badge></td>
      <td className="px-4 py-3 font-semibold">{state}</td>
      <td className="px-4 py-3 text-right">
        <button className="text-gray-400 hover:text-gray-600">›</button>
      </td>
    </tr>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between">
        <span className="font-medium">{q}</span>
        <span className="text-gray-400 group-open:rotate-180 transition">⌄</span>
      </summary>
      <div className="px-5 pb-5 text-gray-600 text-sm">{children}</div>
    </details>
  );
}
