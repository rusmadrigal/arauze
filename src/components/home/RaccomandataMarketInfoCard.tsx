// src/components/home/RaccomandataMarketInfoCard.tsx

import Image from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";

export default function RaccomandataMarketInfoCard() {
    return (
        <section
            className="
        mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10
        transition-all duration-500 ease-out
        hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-lg hover:border-slate-300
      "
        >
            <div className="grid items-center gap-8 md:grid-cols-2">

                {/* LEFT */}
                <div className="space-y-5">
                    <h2 className="text-3xl font-semibold text-slate-900 leading-tight">
                        Come funziona Arauze
                    </h2>

                    <ul className="space-y-3 text-slate-800">
                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 text-blue-600" />
                            <span>Identifica subito mittente e urgenza</span>
                        </li>

                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 text-blue-600" />
                            <span>Basato su dati pubblici + segnalazioni utenti</span>
                        </li>

                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 text-blue-600" />
                            <span>12.000+ consultazioni nel 2025</span>
                        </li>

                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 text-blue-600" />
                            <span>Nessun dato personale richiesto</span>
                        </li>
                    </ul>

                    <Link
                        href="/raccomandata-market"
                        className="text-sm font-medium text-blue-600 hover:underline md:text-base"
                    >
                        Raccomandata Market
                    </Link>
                </div>

                {/* RIGHT */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/images/home/mail-home.webp"
                        alt="Raccomandata Market Illustration"
                        width={380}
                        height={380}
                        className="select-none"
                    />
                </div>
            </div>
        </section>
    );
}
