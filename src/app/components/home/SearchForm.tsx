"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const r = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = code.trim();
    if (!v) return;
    r.push(`/raccomandata/${v}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-3">
      {/* Input ancho (wide) */}
      <input
        aria-label="Codice raccomandata"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Inserisci il codice..."
        className="
          w-full h-12 md:h-14
          rounded-2xl
          border border-slate-200
          bg-white
          px-4 pr-28
          text-slate-700 placeholder-slate-400
          outline-none
          shadow-sm
          focus:border-brand-300 focus:ring-4 focus:ring-brand-50
        "
      />

      {/* Botón superpuesto a la derecha */}
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2
             h-10 md:h-12 px-5 md:px-6
             rounded-xl border border-slate-200
             bg-blue-500 text-white
             hover:bg-blue-600
             font-semibold shadow-sm
             focus:outline-none focus:ring-4 focus:ring-brand-50"
      >
        Cerca
      </button>
    </form>
  );
}
