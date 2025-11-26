import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
                {children}
            </ol>
        ),
    },
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
