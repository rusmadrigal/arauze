import TopNav from "@/components/ui/TopNav";
import { MailSearch } from "lucide-react";
import RefineForm from "./components/RefineForm";

export default function RicercaPage({
  searchParams,
}: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q ?? "").trim();

  return (
    <main className="mx-auto max-w-5xl px-4" role="main">
      {/* Card boxed, igual que el home */}
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        {/* Nav dentro del box */}
        <TopNav />

        {/* Header compacto */}
        <header className="mt-4 md:mt-6">
          <div className="flex items-center gap-2 text-gray-500">
            <MailSearch className="h-5 w-5" />
            <span className="text-sm">Ricerca</span>
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            Non abbiamo trovato una corrispondenza esatta
          </h1>
          <p className="mt-2 text-gray-600">
            Raffina la ricerca: inserisci un{" "}
            <strong className="font-semibold">codice (3–6 cifre)</strong> oppure
            un testo descrittivo.
          </p>
        </header>

        {/* Search box */}
        <div className="mt-5 md:mt-6">
          <RefineForm initialQuery={q} />
        </div>

        {/* Nota/CTA */}
        <div className="mt-6 md:mt-8 text-sm text-gray-500">
          Suggerimento: se il testo contiene un codice, lo rileviamo
          automaticamente. Se pensi che un codice dovrebbe esistere,{" "}
          <a href="/contatti" className="text-[#2F66D5] hover:underline font-medium">
            contattaci
          </a>.
        </div>
      </div>
    </main>
  );
}
