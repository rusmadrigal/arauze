// app/raccomandata/[code]/page.tsx
import React from "react";
import TopNav from "@/components/ui/TopNav"; // mismo nav del home

import HeroRaccomandata from "@/components/raccomandata/HeroRaccomandata";
import InfoBoxRaccomandata from "@/components/raccomandata/InfoBoxRaccomandata";
import AuthorBox from "@/components/raccomandata/AuthorBox";
import StepsRaccomandata from "@/components/raccomandata/StepsRaccomandata";
import DetailsSection from "@/components/raccomandata/DetailsSection";
import AlertBox from "@/components/raccomandata/AlertBox";
import AssistenzaSection from "@/components/raccomandata/AssistenzaSection";
import FAQSection from "@/components/raccomandata/FAQSection";
import AdditionalInfoBanner from "@/components/raccomandata/AdditionalInfoBanner";

export default function RaccomandataPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Card principal (igual al home) */}
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        {/* NAV Igual al home, dentro de la tarjeta */}
        <TopNav />

        {/* Hero */}
        <HeroRaccomandata />

        {/* Key info */}
        <div className="mt-10">
          <InfoBoxRaccomandata />
        </div>

        {/* Autor */}
        <AuthorBox />

        {/* Pasos */}
        <StepsRaccomandata />

        {/* Detalles */}
        <DetailsSection />

        {/* Alerta */}
        <AlertBox />

        {/* Asistencia */}
        <AssistenzaSection />

        {/* FAQ */}
        <FAQSection />

        {/* CTA final */}
        <AdditionalInfoBanner />
      </div>
    </main>
  );
}
