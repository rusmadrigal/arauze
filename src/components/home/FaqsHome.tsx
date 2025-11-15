import React from "react";

type FaqItemProps = {
  q: string;
  children: React.ReactNode;
};

function FaqItem({ q, children }: FaqItemProps) {
  // sin useState para que sea Server Component compatible
  return (
    <details className="group border-b border-gray-100 last:border-0">
      <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between">
        <span className="font-medium text-gray-800">{q}</span>
        <span
          className="text-gray-400 group-open:rotate-180 transition-transform"
          aria-hidden="true"
        >
          ⌄
        </span>
      </summary>
      <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
        {children}
      </div>
    </details>
  );
}

export default function FaqsHome() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4 px-5">Domande frequenti</h2>
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        <FaqItem q="Che cos’è una Raccomandata Market?">
          Raccomandata Market è un sistema utilizzato da aziende, enti pubblici
          e fornitori di servizi per inviare comunicazioni ufficiali con valore
          legale. A differenza della posta tradizionale, ogni fase della
          spedizione viene registrata e il mittente può dimostrare di aver
          inviato correttamente la comunicazione al destinatario.
        </FaqItem>

        <FaqItem q="Ricevere una Raccomandata Market significa sempre qualcosa di grave?">
          No. Anche se si tratta di corrispondenza di natura legale, non tutte
          le notifiche riguardano multe, citazioni in giudizio o debiti. In
          molti casi le banche e le aziende usano Raccomandata Market per
          inviare estratti conto, sostituzioni di carte di credito, aggiornamenti
          contrattuali o semplici comunicazioni informative rivolte a un gruppo
          di clienti.
        </FaqItem>

        <FaqItem q="Chi utilizza di solito il servizio Raccomandata Market?">
          Il servizio è usato soprattutto da banche, compagnie assicurative,
          enti pubblici, amministrazioni e grandi fornitori di servizi (energia,
          telefonia, ecc.) quando hanno bisogno di inviare comunicazioni
          importanti, tracciabili e con valore legale ai propri clienti.
        </FaqItem>

        <FaqItem q="Arauze.com è un servizio ufficiale delle poste?">
          No. Arauze.com non è collegato ufficialmente a Poste Italiane né ad
          altri operatori postali. È una piattaforma indipendente che raccoglie
          informazioni pubbliche e segnalazioni degli utenti per aiutarti a
          capire, in modo orientativo, che tipo di contenuto potrebbe avere la
          tua Raccomandata Market.
        </FaqItem>

        <FaqItem q="I dati e i codici che inserisco vengono salvati?">
          No, Arauze.com non memorizza né condivide i codici inseriti per la
          ricerca. Le informazioni che vedi nelle schede provengono da fonti
          pubbliche e dalle segnalazioni volontarie degli utenti, elaborate in
          forma anonima e aggregata.
        </FaqItem>

        <FaqItem q="Posso segnalare il contenuto della mia Raccomandata Market?">
          Sì. Se conosci già il contenuto della tua raccomandata, puoi
          segnalarlo su Arauze.com in modo anonimo. In questo modo aiuti altri
          utenti ad avere un’idea più chiara di cosa potrebbe contenere il loro
          avviso di ritiro con lo stesso codice.
        </FaqItem>
      </div>
    </section>
  );
}