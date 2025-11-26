// src/components/home/TextBlockHome.tsx
import { Mail, Landmark, Info } from "lucide-react";

export default function Raccomendatamarket() {
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
                    La raccomandata è utilizzata principalmente per l’invio di documenti legali; il peso massimo da spedire è di 2 kg, quindi viene solitamente utilizzata per l’invio di documenti legali. Inoltre, insieme alla raccomandata viene inviato un codice certificato, che viene assegnato a seconda del contenuto del pacco.

                </p>
                <p>
                    È importante ricordare che il servizio di posta raccomandata può essere utilizzato da aziende pubbliche e private e anche da privati (avvocati, notai, architetti, ecc.) Per inviare documenti importanti, che devono essere firmati dal destinatario o da una persona delegata. Qui di seguito vi spieghiamo in dettaglio tutto quello che c’è da sapere sul cosiddetto Raccomandata Market.
                </p>
                <p>
                    È un mezzo di comunicazione legale, fornito da Poste Italiane; questo servizio funziona all’interno dell’Italia (ovviamente) ma anche per le spedizioni all’estero.  Essendo un servizio di posta veloce e altamente custodito, non è possibile spedire pacchi di peso superiore ai 2 chili, e questo servizio viene utilizzato principalmente per l’invio di documenti legali, che devono essere ricevuti e firmati dal destinatario o da una persona da lui delegata.
                </p>

                <p>
                    Inoltre, potete condividere la vostra esperienza per aiutare altri
                    utenti a comprendere meglio le loro notifiche.
                </p>
            </div>
        </section>
    );
}
