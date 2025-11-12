"use client";

import TopNav from "@/components/ui/TopNav";

export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-5xl px-4" role="main">
            {/* Caja principal (mismo boxed que Home, con mejoras visuales) */}
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <TopNav />

                {/* Header */}
                <header className="mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" aria-hidden="true" />
                        Informativa
                    </div>
                    <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                        Informativa sulla Privacy
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">Ultimo aggiornamento: 11 novembre 2025</p>

                    {/* Meta chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                            GDPR (UE) 2016/679
                        </span>
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                            Trasparenza & Sicurezza
                        </span>
                    </div>
                </header>

                {/* TOC compacto */}
                <nav
                    aria-label="Indice della pagina"
                    className="mb-8 rounded-xl border border-gray-100 bg-gray-50/60 p-4"
                >
                    <div className="text-xs font-semibold text-gray-600 mb-3">Contenuto</div>
                    <ul className="flex flex-wrap gap-2">
                        {[
                            ["#titolare", "Titolare"],
                            ["#dati", "Dati raccolti"],
                            ["#finalita", "Finalità"],
                            ["#base", "Base giuridica"],
                            ["#conservazione", "Conservazione & Sicurezza"],
                            ["#terze", "Condivisioni a terzi"],
                            ["#diritti", "Diritti dell’interessato"],
                            ["#cookie", "Cookie & analytics"],
                            ["#modifiche", "Modifiche"],
                            ["#contatti", "Contatti"],
                        ].map(([href, label]) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 hover:border-gray-300 hover:text-gray-900"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contenido */}
                <section className="space-y-10 text-gray-700 text-[15px] leading-relaxed">
                    <div id="intro" className="space-y-3">
                        <p>
                            La presente informativa descrive le modalità di trattamento dei dati personali raccolti
                            attraverso il sito <strong>Arauze.com</strong>, in conformità al Regolamento (UE) 2016/679 (GDPR)
                            e alla normativa italiana applicabile.
                        </p>
                    </div>

                    <Divider />

                    <Block id="titolare" title="1. Titolare del trattamento">
                        <p>
                            Arauze – Email:{" "}
                            <a href="mailto:support@arauze.com" className="text-blue-600 underline">
                                support@arauze.com
                            </a>
                            .
                        </p>
                    </Block>

                    <Divider />

                    <Block id="dati" title="2. Dati raccolti">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Indirizzo IP, user agent e dati di navigazione aggregati.</li>
                            <li>Cookie tecnici e, ove presenti, cookie di misurazione/analytics.</li>
                            <li>Dati di contatto (es. email) solo se inviati volontariamente.</li>
                        </ul>
                    </Block>

                    <Divider />

                    <Block id="finalita" title="3. Finalità del trattamento">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Garantire il corretto funzionamento del sito e la sicurezza.</li>
                            <li>Migliorare l’esperienza utente tramite statistiche aggregate.</li>
                            <li>Gestire richieste di supporto e comunicazioni informative.</li>
                        </ul>
                    </Block>

                    <Divider />

                    <Block id="base" title="4. Base giuridica">
                        <p>
                            Le basi giuridiche includono:{" "}
                            <strong>esecuzione di misure precontrattuali/contrattuali</strong>,{" "}
                            <strong>legittimo interesse</strong> (miglioramento servizi/sicurezza) e{" "}
                            <strong>consenso</strong> (ove richiesto per specifiche funzionalità).
                        </p>
                    </Block>

                    <Divider />

                    <Block id="conservazione" title="5. Conservazione & Sicurezza">
                        <p>
                            I dati sono conservati su infrastrutture sicure e protetti da misure tecniche e organizzative adeguate.
                            I tempi di conservazione sono limitati allo stretto necessario per le finalità indicate.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="terze" title="6. Condivisioni a terzi">
                        <p>
                            Non cediamo i dati a terze parti non autorizzate. Eventuali fornitori (es. hosting, analytics)
                            trattano i dati in qualità di responsabili, secondo accordi conformi al GDPR.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="diritti" title="7. Diritti dell’interessato">
                        <Callout>
                            Puoi esercitare i diritti di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione,
                            scrivendo a{" "}
                            <a href="mailto:support@arauze.com" className="text-blue-600 underline">
                                support@arauze.com
                            </a>
                            . Hai inoltre diritto a proporre reclamo all’Autorità Garante.
                        </Callout>
                    </Block>

                    <Divider />

                    <Block id="cookie" title="8. Cookie & analytics">
                        <p>
                            Utilizziamo cookie tecnici essenziali. Eventuali cookie di analisi (se presenti) sono configurati in forma
                            aggregata/anonymizzata. Puoi gestire le preferenze dal tuo browser.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="modifiche" title="9. Modifiche all’informativa">
                        <p>
                            Ci riserviamo il diritto di aggiornare la presente informativa per adeguarla a evoluzioni normative o
                            tecniche. Le modifiche saranno pubblicate su questa pagina.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="contatti" title="10. Contatti">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm text-gray-500">Email</dt>
                                <dd>
                                    <a href="mailto:support@arauze.com" className="text-blue-600 underline">
                                        support@arauze.com
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Sito</dt>
                                <dd>
                                    <a href="https://arauze.com" className="text-blue-600 underline">
                                        arauze.com
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </Block>

                    {/* Back to top */}
                    <div className="pt-2">
                        <a
                            href="#intro"
                            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                        >
                            ↑ Torna su
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}

/* ------------------------ UI helpers (inline) ------------------------ */

function Divider() {
    return <hr className="border-t border-gray-100" />;
}

function Block({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-20">
            <h2 className="text-xl md:text-[22px] font-semibold mb-2">{title}</h2>
            <div className="space-y-3">{children}</div>
        </section>
    );
}

function Callout({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-[15px] leading-relaxed">
            <div className="mb-1 text-sm font-semibold text-emerald-700">
                Diritti e richieste
            </div>
            <div className="text-emerald-900">{children}</div>
        </div>
    );
}
