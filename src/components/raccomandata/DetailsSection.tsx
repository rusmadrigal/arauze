// src/components/raccomandata/DetailsSection.tsx
import React from "react";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { raccomandataRichTextComponents } from "@/components/shared/richTextPortableComponents";

type Detail = {
  title: string;
  body?: string | TypedObject[];
};

interface Props {
  details?: Detail[];
}

export default function DetailsSection({ details }: Props) {
  const fallback: Detail[] = [
    {
      title: "Motivo della Raccomandata",
      body: "Il codice viene spesso utilizzato da enti pubblici o società di servizi per notifiche ufficiali.",
    },
    {
      title: "Tempi di Giacenza e Ritiro",
      body: "Hai 30 giorni di tempo per ritirare la raccomandata presso l’ufficio postale indicato.",
    },
  ];

  const items = details?.length ? details : fallback;

  return (
    <section className="rac-section">
      {items.map((block, index) => (
        <div key={`${block.title}-${index}`} className="mb-8 last:mb-0">
          <h2 className="rac-section-h2 mb-2">{block.title}</h2>

          {!block.body ? null : Array.isArray(block.body) ? (
            <div className="rac-prose">
              <PortableText
                value={block.body as TypedObject[]}
                components={raccomandataRichTextComponents}
              />
            </div>
          ) : (
            <p className="rac-body whitespace-pre-line">{block.body}</p>
          )}
        </div>
      ))}
    </section>
  );
}
