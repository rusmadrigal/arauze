"use client";
import Image from "next/image";

interface HeroHeaderProps {
  isChristmas?: boolean;
}

export default function HeroHeader({ isChristmas = true }: HeroHeaderProps) {
  return (
    <header className="rounded-2xl shadow-card bg-white p-6 md:p-10 pt-12 md:pt-16 pb-5">
      {/* Banda superior navideña */}
      {isChristmas && (
        <div className="mb-4 flex items-center justify-between gap-3 text-xs md:text-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-red-500 px-3 py-1 text-white shadow-sm">
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em]">
              Natale 2025
            </span>
            <span className="hidden md:inline-block text-[11px] font-medium">
              Vi auguriamo un sereno e felice Natale
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-emerald-800">
            🎄
          </span>
        </div>
      )}

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
            <span className="inline-block md:whitespace-nowrap">
              {" "}
              Tracking - 2026
            </span>
          </h1>

          <p className="mt-4 md:mt-5 text-semibold text-lg md:text-xl leading-[1.35] max-w-[60ch]">
            Inserisci il codice raccomandata e scopri il mittente e l’urgenza
            della comunicazione.
          </p>
        </div>

        {/* Imagen ilustrativa + elementos navideños */}
        <div className="hidden md:flex justify-end relative pr-2">
          {/* óvalo de fondo suave detrás */}
          <div className="absolute -z-10 w-[20rem] h-80 bg-emerald-50/70 rounded-full top-2 right-0" />

          {isChristmas && (
            <>


              {/* Timbro redondo estilo sello postal */}
              <div className="absolute -left-3 top-7 h-16 w-16 rounded-full border border-dashed border-red-400/80 bg-red-50/95 flex items-center justify-center shadow-sm rotate-[-12deg]">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-red-600 text-center leading-tight">
                  Natale
                  <br />
                  2025
                </span>
              </div>

              {/* 🎄 Arbolito minimal */}
              <div className="absolute bottom-4 left-1 flex flex-col items-center gap-1">
                {/* copa del árbol */}
                <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent border-b-emerald-700" />
                <div className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[32px] border-l-transparent border-r-transparent border-b-emerald-600 -mt-2" />
                {/* tronco */}
                <div className="h-3 w-3 rounded-[2px] bg-amber-800" />
                {/* estrella */}
                <div className="-mt-8 h-2 w-2 rotate-45 bg-amber-400 rounded-[2px]" />
              </div>

              {/* 🎁 Regalos */}
              <div className="absolute bottom-3 left-24 flex gap-2">
                <div className="h-6 w-6 rounded-[4px] bg-red-500 shadow-sm flex items-center justify-center relative">
                  <div className="h-6 w-[3px] bg-amber-200" />
                  <div className="absolute top-0 h-3 w-3 -mt-1 -translate-y-1/4 rotate-45 bg-amber-300 rounded-[2px]" />
                </div>
                <div className="h-5 w-7 rounded-[4px] bg-emerald-500 shadow-sm flex items-center justify-center relative">
                  <div className="h-5 w-[3px] bg-amber-100" />
                  <div className="absolute top-0 h-2.5 w-2.5 -mt-1 -translate-y-1/4 rotate-45 bg-red-300 rounded-[2px]" />
                </div>
              </div>

              {/* 🛷 Trineo simplificado */}
              <div className="absolute bottom-1 right-6 flex flex-col items-end gap-1">
                {/* asiento */}
                <div className="h-3 w-10 rounded-t-lg bg-red-500 shadow-sm" />
                {/* base */}
                <div className="h-[2px] w-11 bg-amber-600 rounded-full" />
                {/* patines */}
                <div className="flex gap-4 mt-[2px]">
                  <div className="h-[2px] w-4 bg-amber-700 rounded-full" />
                  <div className="h-[2px] w-4 bg-amber-700 rounded-full" />
                </div>
              </div>

              {/* “Fiocchi” suaves */}
              <div className="absolute -bottom-3 left-10 flex gap-1.5 opacity-80">
                <span className="h-2 w-2 rounded-full bg-sky-100" />
                <span className="h-2.5 w-2.5 rounded-full bg-sky-50" />
                <span className="h-2 w-2 rounded-full bg-sky-100" />
              </div>
            </>
          )}

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
