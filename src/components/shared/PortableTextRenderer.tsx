import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { raccomandataRichTextComponents } from "@/components/shared/richTextPortableComponents";

interface PortableTextRendererProps {
  value?: PortableTextBlock[] | null;
}

/**
 * Stesso rendering di Dettagli / Passi (titoli H2·H3 da CMS, body, liste, link, immagini).
 */
export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;
  return (
    <div className="rac-prose">
      <PortableText value={value} components={raccomandataRichTextComponents} />
    </div>
  );
}
