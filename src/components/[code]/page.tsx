import HeroRaccomandata from "@/components/raccomandata/HeroRaccomandata";
import InfoBoxRaccomandata from "@/components/raccomandata/InfoBoxRaccomandata";

export default function RaccomandataPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        <HeroRaccomandata />
        <div className="mt-10">
          <InfoBoxRaccomandata />
        </div>
      </div>
    </main>
  );
}
