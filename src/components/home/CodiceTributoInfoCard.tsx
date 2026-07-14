import Link from "next/link";
import { Check } from "lucide-react";

export default function CodiceTributoInfoCard() {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold leading-tight text-slate-900">
            Codici tributo e F24
          </h2>
          <p className="text-slate-600">
            Una nuova sezione dedicata ai codici tributo più cercati: IMU, TARI, F24,
            cedolare secca, ravvedimento operoso e imposta di bollo.
          </p>
          <ul className="space-y-3 text-slate-800">
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-blue-600" />
              <span>Guide editoriali con focus pratico</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-blue-600" />
              <span>Codici singoli e hub tematici</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-blue-600" />
              <span>Controlli utili prima del pagamento</span>
            </li>
          </ul>
          <Link
            href="/codice-tributo"
            className="text-sm font-medium text-blue-600 hover:underline md:text-base"
          >
            Vai al hub Codice tributo
          </Link>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
          <p className="font-semibold text-slate-900">Cosa trovi dentro</p>
          <p className="mt-2">
            Pagine per i codici più cercati e hub tematici per capire rapidamente dove
            inserire il tributo nell&apos;F24 e quali verifiche fare prima di pagare.
          </p>
        </div>
      </div>
    </section>
  );
}

