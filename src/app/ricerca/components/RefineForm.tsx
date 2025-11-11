"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function RefineForm({ initialQuery }: { initialQuery: string }) {
    const [value, setValue] = useState(initialQuery);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const v = value.trim();
        if (!v) {
            window.location.href = "/ricerca";
            return;
        }
        const m = v.match(/\b(\d{3,6})\b/);
        if (m?.[1]) {
            window.location.href = `/raccomandata/${m[1]}`;
            return;
        }
        window.location.href = `/ricerca?q=${encodeURIComponent(v)}`;
    }

    return (
        <form onSubmit={onSubmit} className="relative">
            <input
                aria-label="Termine di ricerca"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                name="q"
                placeholder="Inserisci il codice o testo…"
                className="
          w-full h-12 rounded-xl
          border border-gray-200 bg-white
          pl-10 pr-28 text-gray-800 placeholder-gray-400
          outline-none shadow-sm transition
          focus:shadow-[0_0_0_6px_rgba(47,102,213,0.12)]
          focus:border-[#2F66D5]
        "
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <button
                type="submit"
                className="
          absolute right-2 top-1/2 -translate-y-1/2
          h-10 px-5 rounded-lg
          bg-gradient-to-r from-[#2F66D5] to-[#2552AD]
          text-white font-semibold shadow
          hover:opacity-95 active:scale-95
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          focus-visible:ring-[#2F66D5]
          focus-visible:ring-offset-white
        "
            >
                Cerca
            </button>
        </form>
    );
}
