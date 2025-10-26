"use client";
import SearchForm from "../home/SearchForm";


export default function HeroHeader() {
  return (
    <header className="rounded-2xl shadow-card bg-white p-6 md:p-10">
      {/* Contenido + imagen */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Controlla subito la tua <br />
            <span className="text-brand-600">Raccomandata Online</span>
          </h1>
          <p className="mt-3 text-gray-600">
            Scopri chi ti ha inviato la comunicazione e se richiede un’azione
            urgente.
          </p>

          {/* Buscador como componente aparte */}
          <div className="mt-6">
            <SearchForm />
          </div>
        </div>

        <div className="hidden md:block">
          <div className="mx-auto h-48 w-72 rounded-xl bg-brand-50/60 relative">
            <div className="absolute right-6 top-6 h-28 w-44 bg-white rounded-lg shadow-card" />
            <div className="absolute left-8 bottom-8 h-10 w-10 rounded-full bg-brand-500/90" />
          </div>
        </div>
      </section>
    </header>
  );
}
