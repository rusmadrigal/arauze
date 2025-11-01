// app/raccomandata/[code]/page.tsx
import React from "react";
import TopNav from "@/components/ui/TopNav";

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
    // Igual que el home → sin py extra (el layout ya tiene py-8)
    <main className="mx-auto max-w-5xl px-4" role="main">
      {/* Contenedor principal idéntico al home */}
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        {/* Mismo orden y ritmo vertical */}
        <div className="space-y-8 md:space-y-10">
          <TopNav />

          <HeroRaccomandata />
          <InfoBoxRaccomandata />
          <AuthorBox />
          <StepsRaccomandata />
          <DetailsSection />
          <AlertBox />
          <AssistenzaSection />
          <FAQSection />
          <AdditionalInfoBanner />
        </div>
      </div>
    </main>
  );
}
