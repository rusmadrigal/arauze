// app/components/shared/PortableTextRenderer.tsx
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0">
                {children}
            </p>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {children}
            </ul>
        ),
    },
};

type PortableTextValue = PortableTextBlock[] | undefined | null;

export default function PortableTextRenderer({
    value,
}: {
    value: PortableTextValue;
}) {
    if (!value) return null;
    return <PortableText value={value} components={components} />;
}
