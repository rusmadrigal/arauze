import Image from "next/image";

interface CmpMapAndMeaningProps {
    data: {
        typeLabel?: string;
        mapImage?: string;
        mapAlt?: string;
        addressTitle?: string;
        address?: string;
        meaningTitle?: string;
        meaningBody?: string[];
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

                    <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
                        {data.address}
                    </p>
                </div>
            </div>

            {/* Significato */}
            <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">
                    {data.meaningTitle}
                </h2>

                <div className="mt-3 space-y-3 text-sm text-gray-700 leading-relaxed">
                    {data.meaningBody?.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>

        </section>
    );
}
