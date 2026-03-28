import type { PortableTextComponents } from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity/lib/client";
import BodyImageLightbox from "@/components/shared/BodyImageLightbox";
import PortableTextMarkLink from "@/components/shared/PortableTextMarkLink";

const builder = createImageUrlBuilder(sanityClient);

function urlFor(source: Record<string, unknown>) {
  return builder.image(source).auto("format").fit("max");
}

type PortableImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
  [key: string]: unknown;
};

const linkClass =
  "text-[#2552AD] underline underline-offset-2 hover:text-[#1D3E82] font-medium";

/**
 * Portable Text allineato allo stesso sistema tipografico della scheda raccomandata:
 * titoli interni = stesse classi di H2/H3 di pagina (rac-section-h2 / rac-card-heading).
 */
export const raccomandataRichTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="rac-body mb-4 whitespace-pre-line last:mb-0">{children}</p>
    ),
    /* In Sanity: "Titolo H2" — stessa resa visiva degli altri titoli di sezione (es. Dettagli) */
    h2: ({ children }) => (
      <h3 className="rac-section-h2 mt-8 mb-3 first:mt-0">{children}</h3>
    ),
    /* In Sanity: "Titolo H3" — come sottotitoli nelle card / passi */
    h3: ({ children }) => (
      <h4 className="rac-card-heading mt-5 mb-2 first:mt-0">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="rac-body border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    link: ({ value, children }) => {
      const href =
        value &&
        typeof value === "object" &&
        "href" in value &&
        typeof (value as { href?: string }).href === "string"
          ? (value as { href: string }).href
          : "#";
      return (
        <PortableTextMarkLink href={href} className={linkClass}>
          {children}
        </PortableTextMarkLink>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="rac-body list-disc pl-5 my-3 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="rac-body list-decimal pl-5 my-3 space-y-1">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="rac-body whitespace-pre-line">{children}</li>
    ),
    number: ({ children }) => (
      <li className="rac-body whitespace-pre-line">{children}</li>
    ),
  },

  types: {
    image: ({ value }) => {
      const img = value as PortableImageValue;
      if (!img?.asset?._ref) return null;
      const src = urlFor(img as Record<string, unknown>).url();
      if (!src) return null;
      return (
        <BodyImageLightbox
          src={src}
          alt={img.alt || ""}
          caption={img.caption}
          sizes="(max-width: 768px) 100vw, 700px"
          width={800}
          height={500}
        />
      );
    },
  },
};
