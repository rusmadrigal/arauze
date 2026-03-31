import Image from "next/image";
import NextHolidayBadge from "@/components/home/NextHolidayBadge";

export default async function HeroHeader() {
  return (
    <header className="rounded-2xl shadow-card bg-white p-6 md:p-10 pt-12 md:pt-16 pb-5">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* Texto principal de la web*/}

        <div className="w-full min-w-0 md:pr-2 max-w-3xl">
          <h1
            className="font-semibold text-slate-700
             text-[40px] md:text-[44px]
             leading-[1.05] tracking-[-0.02em]"
          >
            <span className="inline-block md:whitespace-nowrap">Raccomandata Market</span>
            <span className="inline-block md:whitespace-nowrap"> Tracking - 2026</span>
          </h1>

          <div className="mt-3 w-full min-w-0 md:mt-4">
            <NextHolidayBadge />
          </div>
        </div>

        {/* Imagen ilustrativa */}
        <div className="hidden md:flex justify-end relative pr-2">
          {/* óvalo de fondo suave detrás */}
          <div className="absolute -z-10 w-[20rem] h-80 bg-emerald-50/70 rounded-full top-2 right-0" />

          <Image
            src="/images/hero-envelope.webp"
            alt="Illustrazione di una raccomandata online"
            width={300}
            height={220}
            priority
            sizes="(max-width: 768px) 0vw, 300px"
            className="h-auto w-[300px] object-contain translate-x-12 -mt-1"
            style={{ height: "auto" }}
          />
        </div>
      </section>
    </header>
  );
}
