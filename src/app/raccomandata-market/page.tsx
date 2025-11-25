// app/raccomandata-market/page.tsx
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_LIST } from "sanity/lib/queries/raccomandataList";
import TopNav from "@/components/ui/TopNav";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import TrendMiniChart from "@/components/raccomandata/TrendMiniChart";

// -------------------
// 🔹 Tipi
// -------------------
type Urgency = "ALTA" | "MEDIA" | "BASSA" | "RITIRATA" | undefined;

interface RaccomandataItem {
    _id: string;
    code: string;
    mittente?: string;
    priority?: Urgency;
    stato?: string;
    href: string;
}

export const revalidate = 60;

// -------------------
// 🔹 Metadata SEO (pagina)
// -------------------
export const metadata: Metadata = {
    title: "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
    description:
        "Consulta l’elenco aggiornato delle raccomandate analizzate da Arauze. Scopri mittente, urgenza e stato di ciascuna comunicazione.",
    alternates: { canonical: "https://arauze.com/raccomandata-market" },
    openGraph: {
        type: "website",
        title: "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
        description:
            "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
        url: "https://arauze.com/raccomandata-market",
        siteName: "Arauze",
    },
    twitter: {
        card: "summary",
        title: "Raccomandata Market – Elenco Raccomandate Analizzate | Arauze",
        description:
            "Consulta l’elenco aggiornato delle raccomandate analizzate da Arauze.",
    },
    robots: { index: true, follow: true },
};

// -------------------
// 🔹 Pagina principale
// -------------------
export default async function RaccomandataMarketPage() {
    const items: RaccomandataItem[] = await sanityClient.fetch(RACCOMANDATA_LIST);

    // Ordine di priorità
    const ORDER: Record<Exclude<Urgency, undefined>, number> = {
        ALTA: 1,
        MEDIA: 2,
        BASSA: 3,
        RITIRATA: 4,
    };

    // Ordinamento risultati
    const sorted = [...items].sort((a, b) => {
        const pa = a.priority ?? "RITIRATA";
        const pb = b.priority ?? "RITIRATA";
        return ORDER[pa] - ORDER[pb];
    });

    return (
        <div
            className="mx-auto max-w-5xl px-4"
            role="main"
            aria-label="Elenco Raccomandata Market"
        >
            <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
                <TopNav />

                <h1 className="text-2xl font-semibold mb-6">
                    Raccomandata Market — Ultime Analizzate
                </h1>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Codice
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Mittente
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Urgenza
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                                    Tendenza
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide">
                                    Dettaglio
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {sorted.map((it) => (
                                <tr key={it._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-semibold text-base leading-tight">
                                        #{it.code}
                                    </td>
                                    <td className="px-4 py-3">{it.mittente || "—"}</td>
                                    <td className="px-4 py-3">
                                        {it.priority ? (
                                            <PriorityIndicator level={it.priority} />
                                        ) : (
                                            <span className="text-gray-500">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <TrendMiniChart code={it.code} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={it.href}
                                            className="inline-flex items-center gap-1.5 text-[#2F66D5] hover:text-[#2552AD] transition group"
                                        >
                                            <span className="text-sm font-medium">Dettaglio</span>
                                            <ArrowRight
                                                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                                strokeWidth={2.2}
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ------------------------------ */}
                {/* 🔵 Contenuto informativo RM   */}
                {/* ------------------------------ */}
                <section className="mt-12 space-y-6 text-slate-700 leading-relaxed">

                    <p>La posta certificata è un tipo di comunicazione legale, utilizzata da aziende pubbliche o private.
                        Esistono diversi tipi di codici che vengono assegnati a seconda del contenuto della raccomandata.
                        Il destinatario e/o il delegato NON è obbligato a firmare la posta certificata, anche se ciò non annulla la competenza della comunicazione e dopo 30 giorni il processo di comunicazione con il destinatario si considera concluso.
                        La raccomandata è utilizzata principalmente per l’invio di documenti legali; il peso massimo da spedire è di 2 kg, quindi viene solitamente utilizzata per l’invio di documenti legali. Inoltre, insieme alla raccomandata viene inviato un codice certificato, che viene assegnato a seconda del contenuto del pacco.</p>

                    <p>È importante ricordare che il servizio di posta raccomandata può essere utilizzato da aziende pubbliche e private e anche da privati (avvocati, notai, architetti, ecc.) Per inviare documenti importanti, che devono essere firmati dal destinatario o da una persona delegata. Qui di seguito vi spieghiamo in dettaglio tutto quello che c’è da sapere sul cosiddetto Raccomandata Market.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: cos’è esattamente?</h2>

                    <p>È un mezzo di comunicazione legale, fornito da Poste Italiane; questo servizio funziona all’interno dell’Italia (ovviamente) ma anche per le spedizioni all’estero. Essendo un servizio di posta veloce e altamente custodito, non è possibile spedire pacchi di peso superiore ai 2 chili, e questo servizio viene utilizzato principalmente per l’invio di documenti legali, che devono essere ricevuti e firmati dal destinatario o da una persona da lui delegata.</p>

                    <p>Poiché la Posta Raccomandata è un servizio che può essere utilizzato da aziende pubbliche e private, il tipo di notifiche e documentazione che possono essere inviate è vario; tuttavia, le nostre registrazioni e la nostra esperienza dimostrano che, nella maggior parte dei casi, il contenuto di una raccomandata ha a che fare con il pagamento di tasse o multe.</p>

                    <p>Alcuni degli enti pubblici che maggiormente utilizzano il Raccomandata Market sono.</p>

                    <ul className="list-disc ml-6 space-y-1">
                        <li>Agenzia delle Entrate-Riscossione (ex Equitalia)</li>
                        <li>Agenzia delle Entrate</li>
                        <li>INPS</li>
                        <li>Imprese di assicurazione</li>
                        <li>Tribunale di Giustizia</li>
                    </ul>

                    <p><strong>Ricordate che...</strong><br />
                        Anche se nella maggior parte dei casi il servizio di posta raccomandata viene utilizzato per la riscossione di tributi o multe, ci sono occasioni in cui può essere utilizzato per la documentazione relativa ad altre procedure (carte di credito, di credito o di debito, ecc.), il contenuto della raccomandata è di natura legale, quindi è molto importante che la riceviate e ne convalidiate le informazioni.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: chi lo usa?</h2>

                    <p>Il servizio Raccomandata Market può essere utilizzato da aziende del settore pubblico o privato, ma anche da privati che hanno bisogno di inviare documentazione importante al destinatario, ad esempio: avvocati, architetti, commercialisti, ecc.</p>

                    <p>Anche se abbiamo detto che la Raccomandata Market può essere utilizzata da diversi tipi di aziende e privati, la verità è che, nella maggior parte dei casi, viene utilizzata dalle aziende del settore pubblico per inviare incassi relativi a tasse e multe.</p>

                    <p>Ecco un elenco di alcuni degli enti pubblici che più comunemente utilizzano il servizio di Raccomandata.</p>

                    <ul className="list-disc ml-6 space-y-1">
                        <li>Agenzia delle Entrate-Riscossione (ex Equitalia)</li>
                        <li>Agenzia delle Entrate</li>
                        <li>INPS</li>
                        <li>Compagnie di assicurazione</li>
                        <li>Tribunale di Giustizia</li>
                    </ul>

                    <p><strong>Ricordate che...</strong><br />
                        Il servizio Raccomandata Market è a disposizione di aziende pubbliche e private e di privati. Pertanto, le lettere inviate non sempre hanno a che fare con le riscossioni, ma potrebbero riguardare qualche altro tipo di notifica.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Elenco dei codici certificati</h2>

                    <p>All’interno del servizio di Posta Raccomandata esiste un elenco di codici che vengono assegnati alla raccomandata a seconda del contenuto della stessa. Di seguito troverete una tabella con tutti i codici certificati, quindi una descrizione dettagliata dei codici certificati più utilizzati all’interno del servizio Raccomandata Market.</p>

                    <ul className="space-y-1">
                        <li><strong>608 e 609</strong> – Atti della pubblica amministrazione o provenienti da un ente pubblico.</li>
                        <li><strong>618 e 688</strong> – Comunicazioni relative al proprio veicolo, azioni di recupero crediti, segnalazioni di mancato pagamento di una fattura, comunicazioni da parte di una compagnia assicurativa.</li>
                        <li><strong>612, 614 e 0693</strong> – Istituti di credito per comunicazioni relative a conto corrente, mutuo, prestito, carta prepagata, libretto di risparmio.</li>
                        <li><strong>695, 6905</strong> – Imposte di registro e canoni RAI non pagati.</li>
                        <li><strong>616</strong> – Comunicazioni varie: mancato pagamento imposta, assicurazione, IMU, bollette, ecc.</li>
                        <li><strong>6161</strong> – Comunicazione del Fondo pensione complementare.</li>

                        <li><strong>617, 648, 649, 669</strong> – Documenti da banche e istituti di credito, carte, solleciti, richiami auto.</li>
                        <li><strong>628</strong> – Comunicazioni generiche (bollo auto, mancati pagamenti, avvocato, ecc.).</li>
                        <li><strong>665</strong> – Rapporti di sinistri stradali o comunicazioni assicurative.</li>
                        <li><strong>668</strong> – Comunicazioni amministrative e giudiziarie (multe, citazioni, arresti, richieste autorità).</li>
                        <li><strong>670, 671, 689</strong> – Ricevute di pagamento (AE-Riscossione, Regioni, Comuni).</li>
                        <li><strong>63, 65, 630 e 650</strong> – Atti dell`INPS: pensioni, benefici, invalidità, visite mediche.</li>
                        <li><strong>572</strong> – Mancato pagamento imposte o contributi INPS.</li>
                        <li><strong>785</strong> – Multe TARI o altri mancati pagamenti AE.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 05</h2>

                    <p>Il codice 05 è assegnato alla raccomandata espressa. Ciò significa che viene assegnato a tutte le raccomandate che vengono consegnate entro 1 giorno lavorativo (compreso il sabato) e che richiedono la firma del destinatario o della persona delegata.</p>

                    <p>Viene generalmente utilizzata per l’invio di comunicazioni urgenti: contratti, testamenti, domande di lavoro, ecc.</p>

                    <p>Questo tipo di raccomandata permette al mittente di seguire lo stato della raccomandata online, utilizzando il sito ufficiale di Poste Italiane o l’app mobile.</p>

                    <p>Trattandosi di un servizio veloce, ha un costo superiore alla posta tradizionale.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 056</h2>

                    <p>Il codice 056 identifica documentazione inviata da privati: banca, assicurazione, ricevute di spesa o comunicazioni del vostro avvocato.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codici 2, 13, 14, 15, 151, 152, 1513, 1514, 1515</h2>

                    <p>Il codice 13 si riferisce alle “raccomandate semplici”, spesso inviate da privati o professionisti (commercialisti, avvocati, ecc.).</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 75, 76, 77, 78, 79</h2>

                    <p>Il codice 78 è dedicato agli atti giudiziari: notifiche del tribunale, tasse, multe, ecc.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 5730, 573</h2>

                    <p>Riguarda comunicazioni dell’Agenzia delle Entrate (ex Equitalia). Non determina esattamente il contenuto, ma solitamente si tratta di avvisi di pagamento.</p>

                    <p><strong>Si noti che...</strong><br />L’Agenzia delle Entrate utilizza talvolta i codici 613 e 615 per avvisi di pagamento.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 386</h2>

                    <p>Spesso contiene multe stradali, ma può riguardare anche tasse stradali, rivalutazioni catastali o citazioni in tribunale.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 388</h2>

                    <p>Contiene multe per eccesso di velocità rilevate dagli autovelox.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 390</h2>

                    <p>Identifica un avviso di accertamento della tassa automobilistica.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 720, 721, 722</h2>

                    <p>Identificano rimborsi da parte di enti o uffici delle imposte.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 200, 201, 2000, 207</h2>

                    <p>Legati ad avvisi di debito, carte di credito, assicurazioni scadute, bollette.
                        Il codice 201 è spesso connesso al recupero crediti.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 608, 609</h2>

                    <p>Codici spesso utilizzati dagli enti pubblici per notifiche varie.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 612, 614, 0693</h2>

                    <p>Identificano istituti finanziari: banche, Poste Italiane, ecc.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 613, 615</h2>

                    <p>Notifiche dell’ufficio imposte: tasse, multe o comunicazioni di Poste Italiane.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 616</h2>

                    <p>Mancato pagamento bollo, ritiro auto, sinistri, bollette, AE, Poste, ecc.</p>

                    <p><strong>Si prega di notare che...</strong><br />Il codice 616 può contenere notifiche molto varie: è sempre meglio ritirare la raccomandata.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 617, 648, 649, 664, 669</h2>

                    <p>Notifiche fiscali, pagamenti scaduti, carte bancarie, richiami auto.
                        Il codice 664 riguarda spesso accertamenti TARI.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 618, 619</h2>

                    <p>Comunicazioni da privati, banche, assicurazioni, avvocati o datori di lavoro.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 628</h2>

                    <p>Non è destinato ad azioni legali ma a comunicazioni varie: mancati pagamenti, privati, avvocati, carte, ecc.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 665</h2>

                    <p>Comunicazioni relative a incidenti stradali o assicurazioni.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 670, 671, 689</h2>

                    <p>Utilizzati per raccomandate contenenti Cartelle Equitalia.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 63, 65, 630, 650</h2>

                    <p>Notifiche provenienti dall’INPS.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 668</h2>

                    <p>Documenti e procedimenti legali: multe, citazioni, tribunale, pignoramenti, sfratti, variazioni catastali.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 695</h2>

                    <p>Fatture fiscali AE, tassa di circolazione, canone RAI.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Codice 647</h2>

                    <p>Provvedimenti giudiziari: decreti, sentenze, convocazioni in udienza.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: è obbligatorio ritirare la raccomandata?</h2>

                    <p>No. Tuttavia, è bene sapere che la raccomandata sarà conservata per 30 giorni lavorativi presso l’Ufficio Postale indicato nell’avviso di giacenza.</p>

                    <p>Nel caso di raccomandate giudiziarie, la mancata ricezione non annulla il procedimento: trascorsi i 30 giorni, la notifica si considera conclusa.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: Avviso di giacenza</h2>

                    <p>È il documento lasciato dal postino in caso di assenza. La raccomandata può essere ritirata entro 30 giorni lavorativi. Oltre tale periodo, non sarà più possibile ritirarla.</p>

                    <p>Per le raccomandate giudiziarie, la mancata ricezione non blocca l’iter: dopo 30 giorni, la notifica è considerata perfezionata.</p>

                    <h2 className="text-xl font-semibold text-slate-900">Raccomandata Market: domande frequenti</h2>

                    <p>Di seguito troverete alcune delle domande più frequenti inviate dai nostri lettori. Se non avete trovato la risposta alla vostra domanda in questo articolo o nella sezione FAQ, potete lasciarci un commento e uno dei nostri esperti vi risponderà al più presto (non fornite dati sensibili: ID, numeri di conto, ecc.).</p>

                    <h3 className="text-lg font-semibold text-slate-900">Che cos`è la posta raccomandata?</h3>
                    <p>La raccomandata è un mezzo di comunicazione di Poste Italiane, utilizzato principalmente per l invio di corrispondenza, che in molti casi è di natura legale e/o giuridica.</p>

                    <h3 className="text-lg font-semibold text-slate-900">Può qualcun altro ricevere la mia posta certificata?</h3>
                    <p>Sì, potete delegare una terza persona a ricevere o ritirare la posta certificata; la persona delegata deve avere un documento d identità valido e una copia del vostro documento d`identità e dell`avviso di giacenza.</p>

                </section>

            </div>

            {/* JSON-LD */}
            <Script
                id="raccomandata-market-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: sorted.map((it, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `https://arauze.com${it.href}`,
                            name: `Raccomandata ${it.code}`,
                        })),
                    }),
                }}
            />
        </div>
    );
}

// -------------------
// 🔹 Indicatore visivo di Urgenza
// -------------------
function PriorityIndicator({ level }: { level: Exclude<Urgency, undefined> }) {
    const PRIORITY_STYLES: Record<
        Exclude<Urgency, undefined>,
        { ping: string; dot: string; label: string }
    > = {
        ALTA: { ping: "bg-rose-500", dot: "bg-rose-600", label: "Urgenza Alta" },
        MEDIA: { ping: "bg-orange-500", dot: "bg-orange-600", label: "Urgenza Media" },
        BASSA: { ping: "bg-emerald-500", dot: "bg-emerald-600", label: "Urgenza Bassa" },
        RITIRATA: { ping: "bg-gray-400", dot: "bg-gray-500", label: "Ritirata" },
    };

    const styles = PRIORITY_STYLES[level];
    return (
        <div className="flex items-center gap-2">
            <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
                <span
                    className={`absolute inline-flex h-3.5 w-3.5 rounded-full opacity-60 animate-ping ${styles.ping}`}
                />
                <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${styles.dot}`} />
            </span>
            <span className="text-sm font-medium">{styles.label}</span>
        </div>
    );
}
