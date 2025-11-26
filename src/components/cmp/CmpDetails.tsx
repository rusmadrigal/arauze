interface CmpDetailsProps {
    data: {
        deliveryTitle?: string;
        deliveryBody?: string[];

        whatHappensTitle?: string;
        whatHappensList?: string[];

        commonIssuesTitle?: string;
        commonIssuesList?: string[];
    };
}

export default function CmpDetails({ data }: CmpDetailsProps) {
    return (
        <section className="space-y-6">

            {/* Tempi di consegna */}
            <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">
                    {data.deliveryTitle}
                </h2>

                <div className="mt-2 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {data.deliveryBody?.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>

            {/* Cosa succede / Problemi comuni */}
            <div className="grid gap-6 md:grid-cols-2">

                {/* Cosa succede */}
                <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                    <h2 className="text-base font-semibold text-gray-900">
                        {data.whatHappensTitle}
                    </h2>

                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        {data.whatHappensList?.map((item, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Problemi comuni */}
                <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                    <h2 className="text-base font-semibold text-gray-900">
                        {data.commonIssuesTitle}
                    </h2>

                    <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
                        {data.commonIssuesList?.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
