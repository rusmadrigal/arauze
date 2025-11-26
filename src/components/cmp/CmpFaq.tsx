interface CmpFaqProps {
    data: {
        faqTitle?: string;
        faqItems?: {
            q: string;
            a: string;
        }[];
    };
}

export default function CmpFaq({ data }: CmpFaqProps) {
    return (
        <section className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
                {data.faqTitle}
            </h2>

            <div className="mt-3 space-y-4">
                {data.faqItems?.map((item, i) => (
                    <div key={i}>
                        <p className="text-sm font-medium text-gray-800">{item.q}</p>
                        <p className="mt-1 text-sm text-gray-700">{item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
