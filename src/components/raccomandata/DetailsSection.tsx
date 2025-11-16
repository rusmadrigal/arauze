// src/components/raccomandata/DetailsSection.tsx
import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity/lib/client";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: { [key: string]: unknown }) {
  return builder.image(source).auto("format").fit("max");
}

type Detail = {
  title: string;
  /** Puede venir como rich text (array de TypedObject) o como string en el fallback */
  body?: string | TypedObject[];
};

interface Props {
  details?: Detail[];
}

// Tipo para el mark "link" de Portable Text
type PortableLinkMarkProps = {
  value?: {
    href?: string | null;
    [key: string]: unknown;
  } | null;
  children: React.ReactNode;
};

// Configuración de componentes para PortableText
const portableComponents: PortableTextComponents = {
  // 🧩 Bloques de texto (párrafos y encabezados)
  block: {
    normal: ({ children }) => (
      <p className="mb-4 whitespace-pre-line">{children}</p>
    ),
    h2: ({ children }) => (
      <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-4 mb-2 text-base font-semibold text-gray-900">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
        {children}
      </blockquote>
    ),
  },

  // 🧩 Links
  marks: {
    link: ({ value, children }: PortableLinkMarkProps) => {
      const href =
        value && typeof value.href === "string" ? value.href : "#";

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
        >
          {children}
        </a>
      );
    },
  },

  // 🧩 Listas (bullets y numeradas)
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 my-3 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 my-3 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="whitespace-pre-line">{children}</li>
    ),
    number: ({ children }) => (
      <li className="whitespace-pre-line">{children}</li>
    ),
  },

  // 🖼️ Imágenes dentro de Portable Text
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-5">
          <img
            src={urlFor(value).url()}
            alt={(value as { alt?: string }).alt || ""}
            className="rounded-lg shadow-sm border border-gray-200"
          />
          {"caption" in (value as object) &&
            (value as { caption?: string }).caption && (
              <figcaption className="text-xs text-gray-500 mt-1">
                {(value as { caption?: string }).caption}
              </figcaption>
            )}
        </figure>
      );
    },
  },
};

export default function DetailsSection({ details }: Props) {
  // Fallback por si aún no hay contenido en Sanity
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

          {!block.body ? null : Array.isArray(block.body) ? (
            // 🧩 Contenido enriquecido desde Sanity (Portable Text)
            <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none">
              <PortableText
                value={block.body as TypedObject[]}
                components={portableComponents}
              />
            </div>
          ) : (
            // 🔤 Texto plano (fallback / compatibilidad)
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {block.body}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
