"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BottomCTA() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const submit = () => {
    if (!code.trim()) return;
    router.push(`/raccomandata/${code.trim()}`);
  };

  return (
    /**
     * Sangrado lateral e inferior para que el CTA
     * ocupe todo el ancho del card y toque el borde redondeado.
     */
    <div className="-mx-6 md:-mx-10 -mb-6 md:-mb-10">
      <div className="w-full rounded-b-2xl bg-gradient-to-r from-[#2F66D5] to-[#2552AD] text-white px-6 md:px-8 py-6 md:py-7 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-lg font-semibold text-center md:text-left">
          Insericciuto una raccomandata?
        </span>

        <div className="flex w-full md:w-auto items-center gap-3">
          <input
            type="text"
            placeholder="Inserisci il codice..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="
              w-full md:w-72
              rounded-lg
              border-2 border-white/80
              bg-white/10
              px-4 py-3
              text-white placeholder-white/80
              outline-none
              focus:border-white focus:ring-0
            "
          />
          <button
            onClick={submit}
            className="rounded-lg bg-white text-[#2552AD] px-6 py-3 font-semibold hover:bg-white/90 transition"
          >
            Cerca codice
          </button>
        </div>
      </div>
    </div>
  );
}
