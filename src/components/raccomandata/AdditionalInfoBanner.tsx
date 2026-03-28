// components/raccomandata/AdditionalInfoBanner.tsx
"use client";
import React from "react";
import Link from "next/link";
import { MailSearch } from "lucide-react";

export default function AdditionalInfoBanner() {
  return (
    <section className="mt-12">
      {/* Banner container */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#2F66D5] to-[#2552AD]
                   text-white px-6 md:px-10 py-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)]
                   transition-all duration-300 hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.35)]"
      >
        {/* Decorative icon */}
        <div className="absolute -top-4 right-6 opacity-10">
          <MailSearch className="h-20 w-20 text-white" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            Hai ricevuto una Raccomandata Market?
          </h3>
          <p className="text-white/90 max-w-2xl mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
            Scopri subito chi è il mittente e cosa fare per ritirarla in tempo.
            Evita ritardi e comunicazioni fiscali perse.
          </p>

          {/* CTA button */}
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-[#2552AD] font-semibold 
                         px-6 py-2.5 rounded-xl text-sm md:text-base
                         shadow-sm hover:shadow-md hover:scale-[1.04] active:scale-[0.97]
                         transition-transform duration-300"
            >
              <MailSearch className="h-4 w-4 text-[#2552AD]" aria-hidden="true" />
              Cerca un altro codice
            </Link>
          </div>
        </div>

        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-white/40 via-transparent to-white/40 rounded-b-2xl"></div>
      </div>
    </section>
  );
}
