"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const r = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    r.push(`/raccomandata/${code.trim()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Inserisci il codice..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-brand-50"
      />
      <button
        type="submit"
        className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 font-semibold transition"
      >
        Cerca
      </button>
    </form>
  );
}
