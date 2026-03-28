interface CmpData {
  name: string;
  subtitle?: string;
  typeLabel?: string;
}

export default function CmpHero({ data }: { data: CmpData }) {
  return (
    <section className="mt-10 md:mt-14 space-y-3 text-center md:text-left">  {/* ← AQUI SE APLICA */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
        {data.name}
      </h1>

      {data.subtitle && (
        <p className="text-lg text-gray-600">{data.subtitle}</p>
      )}

      {data.typeLabel && (
        <p className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 mt-2">
          {data.typeLabel}
        </p>
      )}
    </section>
  );
}
