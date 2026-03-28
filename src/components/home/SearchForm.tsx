"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchForm() {
  const r = useRouter();
  const [q, setQ] = useState("");
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(v)}`, { cache: "no-store" });
        const data = await res.json();

        if (!data?.ok) {
          // fallback rápido si el API falla: si es solo dígitos, intentamos directo
          if (/^\d{3,6}$/.test(v)) return r.push(`/raccomandata/${v}`);
          return r.push(`/ricerca?q=${encodeURIComponent(v)}`);
        }

        if (data.action === "redirect" && data.href) {
          return r.push(data.href);
        }

        if (data.action === "multiple") {
          return r.push(`/ricerca?q=${encodeURIComponent(v)}`);
        }

        // sin resultados explícitos
        return r.push(`/ricerca?q=${encodeURIComponent(v)}`);
      } catch {
        // idem fallback
        if (/^\d{3,6}$/.test(v)) return r.push(`/raccomandata/${v}`);
        return r.push(`/ricerca?q=${encodeURIComponent(v)}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-3">
      <input
        aria-label="Codice raccomandata"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Inserisci il codice o testo…"
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
      <button
        type="submit"
        disabled={pending}
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
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {pending ? "Cercando…" : "Cerca"}
      </button>
    </form>
  );
}
