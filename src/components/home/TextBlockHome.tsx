// src/components/home/TextBlockHome.tsx
import { Mail, Landmark, Info } from "lucide-react";

export default function TextBlockHome() {
  return (
    <section className="mt-12 rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Cos’è una Raccomandata Market?
        </h2>
        <p className="text-sm text-slate-600 md:text-base">
          Un sistema ufficiale utilizzato da aziende, enti pubblici e banche
          per inviare comunicazioni con valore legale.
        </p>
      </div>

      {/* Cards con movimiento suave */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="group flex cursor-pointer flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Mail className="h-5 w-5 text-sky-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 md:text-base">
            Comunicazione certificata
          </h3>
          <p className="text-sm text-slate-600">
            Ogni lettera inviata tramite Raccomandata Market è tracciata e ha
            valore legale.
          </p>
        </div>

        <div className="group flex cursor-pointer flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Landmark className="h-5 w-5 text-sky-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 md:text-base">
            Enti pubblici, banche e assicurazioni
          </h3>
          <p className="text-sm text-slate-600">
            Viene usata per notifiche ufficiali: pagamenti, estratti conto,
            contratti, operazioni bancarie e comunicazioni amministrative.
          </p>
        </div>

        <div className="group flex cursor-pointer flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Info className="h-5 w-5 text-sky-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 md:text-base">
            Non tutte le notifiche riguardano debiti
          </h3>
          <p className="text-sm text-slate-600">
            Spesso le banche la usano per inviare informazioni, sostituzioni di
            carte o aggiornamenti ai clienti.
          </p>
        </div>
      </div>

      {/* Texto descriptivo */}
      <div className="space-y-3 text-sm leading-relaxed text-slate-600 md:text-base">
        <p>
          Raccomandata Market è un sistema utilizzato da aziende, enti pubblici
          e fornitori di servizi per inviare comunicazioni ufficiali ai
          destinatari.
        </p>
        <p>
          A differenza della posta tradizionale, le notifiche inviate tramite
          questo sistema sono tracciate in ogni fase e hanno valore legale.
        </p>
        <p>
          Viene impiegata soprattutto per comunicazioni importanti come:
          pagamenti in ritardo, operazioni bancarie, contratti, assicurazioni,
          atti amministrativi o giudiziari. Tuttavia, non tutte le raccomandate
          indicano problemi: molte banche lo utilizzano anche per inviare
          aggiornamenti informativi o sostituzioni di carte.
        </p>
        <p>
          Noi di <strong>Arauze.com</strong> raccogliamo e organizziamo
          informazioni pubbliche relative ai codici di Raccomandata Market, per
          offrirvi maggiore chiarezza su chi vi sta contattando e sul possibile
          contenuto dell’avviso di ritiro.
        </p>
        <p>
          Inoltre, potete condividere la vostra esperienza per aiutare altri
          utenti a comprendere meglio le loro notifiche.
        </p>
      </div>
    </section>
  );
}
