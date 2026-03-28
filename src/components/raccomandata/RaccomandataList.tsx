import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Urgency = "ALTA" | "BASSA" | "RITIRATA";

type RaccomandataItem = {
  _id: string;
  code: string;
  mittente?: string;
  priority?: Urgency;
  stato?: string;
  href: string;
};

export default function RaccomandataList({ items }: { items: RaccomandataItem[] }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Raccomandata Market</h1>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                Codice
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                Mittente
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                Urgenza
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">
                Stato
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide">
                Dettaglio
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it._id} className="hover:bg-gray-50/70 transition">
                <td className="px-4 py-3 font-semibold text-base leading-tight">#{it.code}</td>
                <td className="px-4 py-3">{it.mittente || "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={it.priority}>{it.priority || "—"}</Badge>
                </td>
                <td className="px-4 py-3">{it.stato || "—"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={it.href}
                    className="inline-flex items-center gap-1.5 text-[#2F66D5] hover:text-[#2552AD] transition group"
                  >
                    <span className="text-sm font-medium">Dettaglio</span>
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Badge({
  tone,
  children,
}: {
  tone?: Urgency;
  children: React.ReactNode;
}) {
  const map: Record<Urgency, string> = {
    ALTA: "bg-rose-100 text-rose-700",
    BASSA: "bg-amber-100 text-amber-700",
    RITIRATA: "bg-emerald-100 text-emerald-700",
  };
  const cls = tone ? map[tone] : "bg-gray-100 text-gray-700";
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}
