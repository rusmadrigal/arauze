"use client";
import React from "react";
import Link from "next/link";

export default function HeroRaccomandata() {
  return (
    <section className="mt-4 md:mt-6 text-center md:text-left">
      {/* Breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="text-sm text-gray-400 mb-3 md:mb-4"
      >
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-gray-500">Raccomandata Market 697</span>
      </nav>

      {/* Título principal */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
        Raccomandata Market 697: Guida Completa e Cosa Fare
      </h1>

      {/* Subtítulo */}
      <p className="mt-2 text-gray-600 max-w-2xl">
        Scopri cosa significa il codice 697, chi può essere il mittente e come
        comportarti passo per passo per ritirare la tua raccomandata in tempo.
      </p>
    </section>
  );
}
