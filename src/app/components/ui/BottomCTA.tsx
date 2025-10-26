"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BottomCTA() {
  const r = useRouter();
  const [code, setCode] = useState("");

  return (
    <div className="mx-auto mt-12 max-w-6xl">
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-8 py-8 shadow-card flex flex-col md:flex-row items-center justify-between">
        <span className="text-lg font-semibold mb-4 md:mb-0">
          Insericciuto una raccomandata?
        </span>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Inserisci il codice..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/70 w-full md:w-64"
          />
          <button
            onClick={() => r.push(`/raccomandata/${code || ""}`)}
            className="rounded-lg bg-blue-500 text-white px-6 py-3 font-semibold hover:bg-blue-600 transition w-full md:w-auto"
          >
            Inserisci il codice
          </button>
        </div>
      </div>
    </div>
  );
}
