import React from "react";

type Detail = {
  title: string;
  body: string;
};

interface Props {
  details?: Detail[];
}

export default function DetailsSection({ details }: Props) {
  // Fallback por si aún no cargaste contenido en Sanity
  const fallback: Detail[] = [
    {
      title: "Motivo della Raccomandata",
      body:
        "Il codice viene spesso utilizzato da enti pubblici o società di servizi per notifiche ufficiali.",
    },
    {
      title: "Tempi di Giacenza e Ritiro",
      body:
        "Hai 30 giorni di tempo per ritirare la raccomandata presso l’ufficio postale indicato.",
    },
  ];

  const items = details?.length ? details : fallback;

  return (
    <section className="mt-10">
      {items.map((block, index) => (
        <div key={`${block.title}-${index}`} className="mb-8 last:mb-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            {block.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{block.body}</p>
        </div>
      ))}
    </section>
  );
}
