"use client";
import React from "react";
import Link from "next/link";

export default function AdditionalInfoBanner() {
  return (
    <section className="mt-10">
      <div className="w-full rounded-b-2xl bg-gradient-to-r from-[#2F66D5] to-[#2552AD] text-white px-6 md:px-8 py-8 shadow-card text-center md:text-left">
        <h3 className="text-xl font-semibold mb-2">
          Hai ricevuto una Raccomandata Market?
        </h3>
        <p className="text-white/90 max-w-2xl mx-auto md:mx-0">
          Scopri subito chi è il mittente e cosa fare per ritirarla in tempo.
          Evita ritardi e comunicazioni fiscali perse.
        </p>

        <div className="mt-5">
          <Link
            href="/"
            className="inline-block bg-white text-[#2552AD] font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-[1.05]"
          >
            Cerca un altro codice
          </Link>
        </div>
      </div>
    </section>
  );
}
