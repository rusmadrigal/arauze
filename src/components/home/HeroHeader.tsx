"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroHeader() {
  return (
    <header className="rounded-2xl bg-white p-6 pt-10 pb-6 shadow-card md:p-10 md:pt-14">
      <section className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-10">
        <div className="w-full max-w-3xl md:pr-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
            Hub editoriale Italia
          </p>
          <h1 className="mt-3 max-w-[12ch] text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-900 md:text-[48px]">
            Capisci subito un avviso di giacenza
          </h1>

          <p className="mt-4 max-w-[56ch] text-base leading-[1.6] text-slate-600 md:text-lg">
            Parti dal decoder per orientarti in pochi secondi, poi usa il codice solo
            quando lo hai già a disposizione.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/avviso-di-giacenza/decoder"
              className="inline-flex items-center gap-2 rounded-full bg-[#2F66D5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2552AD]"
            >
              Prova il decoder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-end relative pr-1">
          <div className="absolute -z-10 right-0 top-6 h-64 w-64 rounded-full bg-emerald-50/60 blur-2xl" />

          <Image
            src="/images/hero-envelope.webp"
            alt="Illustrazione di una raccomandata online"
            width={300}
            height={220}
            priority
            sizes="(max-width: 768px) 0vw, 300px"
            className="object-contain translate-x-6 -mt-1"
          />
        </div>
      </section>
    </header>
  );
}
