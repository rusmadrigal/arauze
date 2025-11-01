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
      {/* Input with smooth latency animation */}
      <input
        aria-label="Codice raccomandata"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Inserisci il codice..."
        className="
          w-full h-12 md:h-14
          rounded-2xl border border-slate-200 bg-white
          px-4 pr-28
          text-slate-700 placeholder-slate-400
          outline-none shadow-sm
          transition-all duration-500 ease-in-out
          focus:scale-[1.025] focus:shadow-[0_0_0_5px_rgba(63,123,250,0.12)]
          focus:border-brand-300 focus:ring-0
        "
      />

      {/* Button with gentle press effect */}
      <button
        type="submit"
        className="
    absolute right-2 top-1/2 -translate-y-1/2
    h-10 md:h-12 px-5 md:px-6
    rounded-xl
    bg-linear-to-r from-[#2F66D5] to-[#2552AD]
    text-white font-semibold
    shadow-card
    transition-all duration-300 ease-in-out
    hover:scale-[1.05] active:scale-[0.95]
    focus:outline-none focus:ring-4 focus:ring-blue-200
  "
      >
        Cerca
      </button>
    </form>
  );
}
