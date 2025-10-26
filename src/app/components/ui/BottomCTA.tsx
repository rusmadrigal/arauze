"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BottomCTA() {
  const r = useRouter();
  const [code, setCode] = useState("");

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-6 py-6 shadow-card flex flex-col md:flex-row items-center justify-between">
        <span className="text-lg font-semibold mb-3 md:mb-0">
          Insericciuto una raccomandata?
        </span>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Inserisci il codice..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/70"
          />
          <button
            onClick={() => r.push(`/raccomandata/${code || ""}`)}
            className="rounded-lg bg-white/95 text-brand-700 px-6 py-3 font-semibold hover:bg-white transition"
          >
            Inserisci il codice
          </button>
        </div>
      </div>
    </div>
  );
}
