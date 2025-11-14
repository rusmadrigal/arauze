"use client";
import Image from "next/image";

export default function HeroHeader() {
  return (
    <header className="rounded-2xl shadow-card bg-white p-6 md:p-10 pt-12 md:pt-16 pb-5">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* Texto principal */}
        <div className="w-full md:pr-2 max-w-3xl">
          <h1
            className="font-semibold text-slate-700
             text-[40px] md:text-[44px]
             leading-[1.05] tracking-[-0.02em]"
          >
            <span className="inline-block md:whitespace-nowrap">
              Raccomandata Market
            </span>
            <span className="inline-block md:whitespace-nowrap">2026</span>
          </h1>

          <p className="mt-4 md:mt-5 text-semibold text-lg md:text-xl leading-[1.35] max-w-[60ch]">
            Inserisci il codice raccomandata e scopri il mittente e l’urgenza
            della comunicazione.
          </p>
        </div>

        {/* Imagen ilustrativa */}
        <div className="hidden md:flex justify-end relative pr-2">
          {/* óvalo de fondo suave detrás */}
          <div className="absolute -z-10 w-[20rem] h-80 bg-brand-50/60 rounded-full top-2 right-0" />
          <Image
            src="/images/hero-envelope.webp"
            alt="Illustrazione di una raccomandata online"
            width={300}
            height={220}
            priority
            className="object-contain translate-x-12 -mt-1"
          />
        </div>
      </section>
    </header>
  );
}
