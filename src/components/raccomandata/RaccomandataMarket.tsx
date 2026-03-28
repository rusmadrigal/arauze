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
            <div className="space-y-6 text-sm leading-relaxed text-slate-600 md:text-base">
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    Che cos`è realmente la Raccomandata Market e perché è così utilizzata in Italia
                </h2>
                <p>
                    La Raccomandata Market è uno dei formati di comunicazione certificata più utilizzati in Italia
                    da aziende private, enti finanziari e fornitori di servizi. Sebbene molti cittadini la associano
                    esclusivamente ad avvisi di pagamento o solleciti di fatture, la sua funzione va ben oltre: si
                    tratta di un sistema progettato per garantire che un documento arrivi al destinatario in modo
                    tracciabile, sicuro e con validità probatoria in caso di controversie o verifiche successive.
                </p>
                <p>
                    A differenza della raccomandata tradizionale o delle comunicazioni giudiziarie, la Raccomandata Market
                    è pensata per situazioni in cui l`azienda ha bisogno di dimostrare che un`informazione importante è
                    stata inviata, ma senza ricorrere alle procedure formali riservate agli atti legali rigorosi. Per questo
                    motivo, è uno strumento comune nei rapporti tra cittadini e aziende di fornitura di energia elettrica,
                    gas, telecomunicazioni, banche, società finanziarie, assicurazioni o società di recupero crediti.
                </p>

                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    Perché così tante aziende ricorrono alla Raccomandata Market?
                </h2>
                <p>
                    Il suo utilizzo risponde a un equilibrio tra costo, velocità e livello di garanzia. Offre una sicurezza
                    giuridica sufficiente affinché il mittente possa accreditare la spedizione, la data e il tentativo di consegna,
                    ma senza i costi e le esigenze procedurali degli atti giudiziari. Questo la rende la soluzione ideale per
                    notificare scadenze, richieste di documentazione, aggiornamenti contrattuali, rinnovi obbligatori o
                    comunicazioni di rischio.
                </p>

                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    Cosa deve tenere presente il destinatario
                </h2>
                <p>
                    Ricevere una Raccomandata Market non implica automaticamente un problema, ma significa che c`è una
                    comunicazione importante da esaminare. Il suo contenuto può variare da un semplice aggiornamento
                    informativo a un avviso di pagamento o una richiesta di dati. Rispondere tempestivamente aiuta a evitare
                    more, blocchi del servizio o malintesi amministrativi, soprattutto quando sono coinvolte banche,
                    assicurazioni o fornitori essenziali.
                </p>
                <p>
                    In un contesto in cui molte operazioni vengono gestite online, la Raccomandata Market rimane uno strumento
                    fondamentale per quelle comunicazioni che richiedono certezza, tracciabilità e responsabilità condivisa tra
                    mittente e destinatario.
                </p>
            </div>

        </section>
    );
}
