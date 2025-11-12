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
        <FaqItem q="Cos’è Arauze.com?">
          Arauze è una piattaforma che ti aiuta a capire chi ti ha inviato una
          raccomandata o una comunicazione importante, semplicemente inserendo
          il codice presente sull’avviso.
        </FaqItem>

        <FaqItem q="Devo registrarmi per usare il servizio?">
          No, non è richiesta alcuna registrazione. Tutte le ricerche sono
          gratuite e immediate.
        </FaqItem>

        <FaqItem q="I dati inseriti vengono salvati?">
          No, Arauze non memorizza né condivide i codici o le informazioni
          inserite dagli utenti.
        </FaqItem>

        <FaqItem q="Cosa significa 'Urgenza alta' o 'bassa'?">
          Si tratta di un’indicazione generata automaticamente in base al tipo
          di mittente e al contenuto della comunicazione.
        </FaqItem>
      </div>
    </section>
  );
}
