import Image from "next/image";
import PortableTextRenderer from "@/components/shared/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";

interface CmpMapAndMeaningProps {
    data: {
        typeLabel?: string;
        mapImage?: string;
        mapAlt?: string;
        addressTitle?: string;
        address?: PortableTextBlock[];
        meaningTitle?: string;
        meaningBody?: PortableTextBlock[];
    };
}

export default function CmpMapAndMeaning({ data }: CmpMapAndMeaningProps) {
    return (
        <section className="grid gap-6 md:grid-cols-2">
            {/* Mappa + Indirizzo */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                <div className="border-b border-gray-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {data.typeLabel}
                </div>

                <div className="aspect-[4/3] w-full bg-gray-200 relative">
                    <Image
                        src={data.mapImage || ""}
                        alt={data.mapAlt || ""}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="px-4 py-3">
                    <h2 className="text-sm font-semibold text-gray-800">
                        {data.addressTitle}
                    </h2>

                    <div className="mt-1 text-sm text-gray-600">
                        <PortableTextRenderer value={data.address} />
                    </div>
                </div>
            </div>

            {/* Significato */}
            <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">
                    {data.meaningTitle}
                </h2>

                <div className="mt-3">
                    <PortableTextRenderer value={data.meaningBody} />
                </div>
            </div>
        </section>
    );
}
