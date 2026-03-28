import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import PortableTextMarkLink from "@/components/shared/PortableTextMarkLink";

const components: PortableTextComponents = {
  // 🔹 Bloques de texto (párrafos, headings, etc.)
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-sm text-gray-700 leading-relaxed">{children}</p>
    ),
    // Si luego quieres soportar títulos dentro del body:
    // h2: ({ children }) => (
    //   <h2 className="mt-4 mb-2 text-base font-semibold text-gray-900">
    //     {children}
    //   </h2>
    // ),
  },

  marks: {
    link: ({ value, children }) => {
      const href =
        value &&
        typeof value === "object" &&
        "href" in value &&
        typeof (value as { href?: string }).href === "string"
          ? (value as { href: string }).href
          : "#";
      return (
        <PortableTextMarkLink href={href} className="text-blue-600 underline font-medium">
          {children}
        </PortableTextMarkLink>
      );
    },
  },

  // 🔹 Listas (<ul>, <ol>)
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
        {children}
      </ol>
    ),
  },

  // 🔹 Items de lista (<li>)
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

interface PortableTextRendererProps {
  value?: PortableTextBlock[] | null;
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
