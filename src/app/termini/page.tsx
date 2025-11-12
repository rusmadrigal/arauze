"use client";

import TopNav from "@/components/ui/TopNav";

export default function TerminiPage() {
    return (
        <main className="mx-auto max-w-5xl px-4" role="main">
            {/* Caja principal (mismo boxed que Home) */}
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <TopNav />

                {/* Header */}
                <header className="mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" aria-hidden="true" />
                        Termini
                    </div>
                    <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                        Termini e Condizioni d’Uso
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">Ultimo aggiornamento: 11 novembre 2025</p>

                    {/* Meta chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                            Informazioni & Trasparenza
                        </span>
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                            Uso lecito del sito
                        </span>
                    </div>
                </header>

                {/* TOC */}
                <nav aria-label="Indice della pagina" className="mb-8 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="text-xs font-semibold text-gray-600 mb-3">Contenuto</div>
                    <ul className="flex flex-wrap gap-2">
                        {[
                            ["#uso", "Uso del sito"],
                            ["#proprieta", "Proprietà intellettuale"],
                            ["#limitazioni", "Limitazioni di responsabilità"],
                            ["#contenuti", "Contenuti di terzi"],
                            ["#account", "Account & condotte vietate"],
                            ["#modifiche", "Modifiche del servizio"],
                            ["#legge", "Legge applicabile & Foro"],
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
                    <Block id="uso" title="1. Uso del sito">
                        <p>
                            Le informazioni pubblicate su <strong>Arauze.com</strong> hanno solo scopo informativo.
                            L’utente si impegna a utilizzare il sito in modo lecito, senza arrecare danno a sistemi,
                            dati o terze parti, e nel rispetto della normativa vigente.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="proprieta" title="2. Proprietà intellettuale">
                        <p>
                            Testi, loghi, grafiche e layout sono di proprietà di Arauze (o dei rispettivi titolari
                            con licenza). È vietata qualsiasi riproduzione o distribuzione non autorizzata.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="limitazioni" title="3. Limitazioni di responsabilità">
                        <Callout>
                            Arauze non garantisce l’assenza di errori, interruzioni o inesattezze. L’uso delle
                            informazioni avviene a proprio rischio. Nei limiti consentiti dalla legge, Arauze non
                            risponde di danni diretti o indiretti derivanti dall’utilizzo del sito.
                        </Callout>
                    </Block>

                    <Divider />

                    <Block id="contenuti" title="4. Contenuti e link di terzi">
                        <p>
                            Il sito può includere collegamenti o riferimenti a risorse esterne. Arauze non controlla
                            né approva tali contenuti e non è responsabile per materiali, politiche o pratiche di siti
                            di terzi.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="account" title="5. Account & condotte vietate">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>È vietato il tentativo di accesso non autorizzato a sistemi o dati.</li>
                            <li>È vietata l’introduzione di malware, scraping aggressivo o attività di spam.</li>
                            <li>Se l’utente crea un account (ove disponibile), è responsabile della custodia delle credenziali.</li>
                        </ul>
                    </Block>

                    <Divider />

                    <Block id="modifiche" title="6. Modifiche del servizio e dei termini">
                        <p>
                            Arauze può aggiornare funzioni, contenuti o i presenti termini per motivi tecnici o legali.
                            Le modifiche saranno pubblicate su questa pagina con data di aggiornamento.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="legge" title="7. Legge applicabile & Foro competente">
                        <p>
                            I presenti termini sono regolati dalla legge italiana. Per ogni controversia è competente
                            in via esclusiva il Foro individuato dalla normativa applicabile.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="contatti" title="8. Contatti">
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
                            href="#uso"
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
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-[15px] leading-relaxed">
            <div className="mb-1 text-sm font-semibold text-amber-700">Avvertenza</div>
            <div className="text-amber-900">{children}</div>
        </div>
    );
}
