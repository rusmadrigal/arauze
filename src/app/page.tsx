"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BottomCTA from "./components/ui/BottomCTA";
import HeroHeader from "./components/home/HeroHeader";
import TopNav from "./components/ui/TopNav";
import SearchForm from "./components/home/SearchForm";
import ComeFunziona from "./components/home/ComeFunziona";

export default function HomePage() {
  const r = useRouter();
  const [code, setCode] = useState("");

  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* Card principal */}
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        {/* Header semplice */}
        <TopNav />

        {/* Hero */}
        <HeroHeader />
        <SearchForm />

        {/* Come funziona */}
        <ComeFunziona />
        {/* Ultime Raccomandate Analizzate */}
        <section className="mt-10">
          <h3 className="text-base font-semibold mb-3">
            Ultime Raccomandate Analizzate
          </h3>
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
                <Row
                  code="573"
                  sender="AGENZIA DEI…"
                  urgency="ALTA"
                  state="IN ATTESA"
                />
                <Row
                  code="573"
                  sender="AGENZIA DEI…"
                  urgency="BASSA"
                  state="IN ATTESA"
                />
                <Row
                  code="573"
                  sender="AGENZIA DEI…"
                  urgency="RITIRATA"
                  state="RITIRATA"
                />
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
            Una samandata da pesta o movio direttament/li-comandanti e di
            luco-di degettre a luito. Riconoscee ita e un denominare tipol una
            raccomandata strate il-mètelo ala in macchiking.
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
        <div className="mt-10">
          <BottomCTA />
        </div>
      </div>
    </main>
  );
}

/* ---------- Componenti UI interni ---------- */
function Step({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 flex items-center gap-4">
      <div className="h-10 w-10 flex items-center justify-center text-lg rounded-full bg-surface">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        {subtitle ? (
          <div className="text-sm text-gray-500">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide">
      {children}
    </th>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "ALTA" | "BASSA" | "RITIRATA";
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    ALTA: "bg-rose-100 text-rose-700",
    BASSA: "bg-amber-100 text-amber-700",
    RITIRATA: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
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
      <td className="px-4 py-3">
        <Badge tone={urgency}>{urgency}</Badge>
      </td>
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
        <span className="text-gray-400 group-open:rotate-180 transition">
          ⌄
        </span>
      </summary>
      <div className="px-5 pb-5 text-gray-600 text-sm">{children}</div>
    </details>
  );
}
