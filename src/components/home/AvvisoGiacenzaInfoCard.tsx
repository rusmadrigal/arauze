import Link from "next/link";
import { Check } from "lucide-react";

export default function AvvisoGiacenzaInfoCard() {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold leading-tight text-slate-900">
            Avviso di giacenza
          </h2>
          <p className="text-slate-600">
            Una guida pensata per capire subito se l&apos;avviso riguarda posta
            raccomandata, atti giudiziari, multe o un semplice avviso di cortesia.
          </p>
          <ul className="space-y-3 text-slate-800">
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-blue-600" />
              <span>Codici e casi più cercati in un solo hub</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-blue-600" />
              <span>Link diretti alle pagine di dettaglio più utili</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-blue-600" />
              <span>Lettura chiara, senza riempitivi né testo ripetuto</span>
            </li>
          </ul>
          <Link
            href="/avviso-di-giacenza"
            className="text-sm font-medium text-blue-600 hover:underline md:text-base"
          >
            Vai al hub Avviso di giacenza
          </Link>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
          <p className="font-semibold text-slate-900">Dentro trovi</p>
          <p className="mt-2">
            I codici più frequenti, il blocco dedicato all&apos;avviso di cortesia e i
            collegamenti rapidi verso le schede che aiutano davvero a capire cosa fare
            quando arriva la notifica.
          </p>
        </div>
      </div>
    </section>
  );
}
