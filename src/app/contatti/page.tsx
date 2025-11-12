"use client";

import TopNav from "@/components/ui/TopNav";

export default function ContattiPage() {
    return (
        <main className="mx-auto max-w-5xl px-4" role="main">
            {/* Caja principal (mismo estilo boxed que Home) */}
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <TopNav />

                {/* Header */}
                <header className="mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" aria-hidden="true" />
                        Contatti
                    </div>
                    <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                        Contatta il team di Arauze
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Ti risponderemo entro 48 ore lavorative.
                    </p>

                    {/* Meta chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                            Supporto & Collaborazioni
                        </span>
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                            Comunicazioni ufficiali
                        </span>
                    </div>
                </header>

                {/* Sección de contacto */}
                <section className="space-y-10 text-gray-700 text-[15px] leading-relaxed">
                    <Block id="email" title="1. Contatti principali">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <dt className="text-sm text-gray-500">Email</dt>
                                <dd>
                                    <a
                                        href="mailto:support@arauze.com"
                                        className="text-blue-600 underline"
                                    >
                                        support@arauze.com
                                    </a>
                                </dd>
                            </div>
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <dt className="text-sm text-gray-500">Sito Web</dt>
                                <dd>
                                    <a
                                        href="https://arauze.com"
                                        className="text-blue-600 underline"
                                        rel="noopener noreferrer"
                                    >
                                        https://arauze.com
                                    </a>
                                </dd>
                            </div>
                        </dl>
                        <p className="mt-3 text-sm text-gray-500">
                            Puoi contattarci per richieste stampa, partnership o segnalazioni tecniche.
                        </p>
                    </Block>

                    <Divider />

                    <Block id="form" title="2. Invia un messaggio">
                        <p>
                            Compila il modulo sottostante per inviare un messaggio diretto al nostro team.
                            Ti risponderemo appena possibile.
                        </p>
                        <form
                            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nome
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Messaggio
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                >
                                    Invia messaggio
                                </button>
                            </div>
                        </form>
                    </Block>

                    <Divider />

                    <Block id="mappa" title="3. Dove operiamo">
                        <p>
                            Arauze è una piattaforma digitale online, accessibile da qualsiasi paese dell’Unione Europea.
                        </p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
                            <iframe
                                title="Mappa Arauze"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.298878557228!2d12.496366415418026!3d41.90278397922078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a9d6d7a83f%3A0xa02a8dbd4c53d3f9!2sRoma%2C%20Italia!5e0!3m2!1sit!2sit!4v1708900000000!5m2!1sit!2sit"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </Block>

                    {/* Back to top */}
                    <div className="pt-2">
                        <a
                            href="#email"
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

/* ------------------------ UI helpers ------------------------ */
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