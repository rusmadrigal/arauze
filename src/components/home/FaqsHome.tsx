// src/components/home/FaqsHome.tsx
import React from "react";

type FaqItemProps = {
  q: string;
  children: React.ReactNode;
};

export default function FaqsHome() {
  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-3">
        Hai ricevuto una raccomandata? Scoprilo ora.
      </h3>

      {/* Sin borde, sombra suave y divisores gris claro */}
      <div className="rounded-xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          <li>
            <FaqItem q="Come capire ima raccomandata? 3">
              Testo di esempio per la risposta.
            </FaqItem>
          </li>
          <li>
            <FaqItem q="Cosa significa raccomandata market 573?">
              Testo di esempio per la risposta.
            </FaqItem>
          </li>
          <li>
            <FaqItem q="Come ritirare una raccomandata?">
              Testo di esempio per la risposta.
            </FaqItem>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- Subcomponent: FaqItem (accordion) ---------- */

function FaqItem({ q, children }: FaqItemProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
