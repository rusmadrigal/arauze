"use client";
import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("Per favore, inserisci un indirizzo email valido.");
      return;
    }
    if (!accepted) {
      setMessage("Devi accettare l'informativa sulla privacy per iscriverti.");
      return;
    }

    try {
      // TODO: integra tu API aquí
      setMessage(
        "Iscrizione completata! Ti invieremo aggiornamenti periodici."
      );
      setEmail("");
      setAccepted(false);
    } catch {
      setMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    // Mantén el sangrado si lo necesitas para que toque el borde del card padre
    <div className="-mx-6 md:-mx-10 -mb-6 md:-mb-10">
      <div className="w-full rounded-b-2xl bg-linear-to-r from-[#2F66D5] to-[#2552AD] text-white px-6 md:px-8 py-7 shadow-card">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-white">
              Iscriviti alla nostra newsletter
            </p>
            <p className="text-white/80 text-sm mt-1">
              Ricevi aggiornamenti su nuovi codici e informazioni sulle
              raccomandate in Italia.
            </p>
          </div>

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto flex-col md:flex-row items-center gap-3"
          >
            <input
              type="email"
              placeholder="Inserisci la tua email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-72 rounded-lg border-2 border-white/80 bg-white/10 px-4 py-3 text-white placeholder-white/80 outline-none focus:border-white focus:ring-0"
            />
            <button
              type="submit"
              className="rounded-lg bg-white text-[#2552AD] px-6 py-3 font-semibold hover:bg-white/90 transition"
            >
              Iscriviti
            </button>
          </form>
        </div>

        {/* divisor y consentimiento dentro del mismo contenedor */}
        <div className="mt-5 pt-4 border-t border-white/20">
          <label className="flex items-start gap-2 text-sm text-white/90">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-[3px] accent-white"
              aria-label="Accetto l’informativa sulla privacy"
            />
            <span>
              Accetto l’
              <a href="/privacy" className="underline font-medium">
                informativa sulla privacy
              </a>{" "}
              e acconsento al trattamento dei miei dati ai sensi del{" "}
              <span className="font-medium">
                Regolamento UE 2016/679 (GDPR)
              </span>
              .
            </span>
          </label>

          {message && <p className="text-sm mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}
