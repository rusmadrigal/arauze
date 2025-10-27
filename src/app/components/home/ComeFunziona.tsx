"use client";

export default function ComeFunziona() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-[26px] font-semibold font-serif text-slate-900 mb-8">
        Come funziona
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        <StepItem
          icon={<IconSearch />}
          title="Inserisci"
          subtitle="il codice"
        />
        <StepItem icon={<IconGear />} title="Analisi" />
        <StepItem icon={<IconInfo />} title="Risultato" />
      </div>
    </section>
  );
}

function StepItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Icono circular con sombra difusa y pulsante */}
      <div
        className="
          relative h-16 w-16 rounded-full 
          bg-brand-50 flex items-center justify-center
          shadow-[0_8px_18px_rgba(63,123,250,0.25)]
          animate-[pulse_3s_ease-in-out_infinite]
          transition-transform duration-500
          hover:scale-[1.05]
        "
      >
        {/* Círculo interior degradado */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#7FB3FF] to-[#3F7BFA] opacity-[.15]" />
        <div className="relative h-9 w-9 rounded-full bg-gradient-to-b from-[#7FB3FF] to-[#3F7BFA] flex items-center justify-center text-white shadow-[0_3px_8px_rgba(63,123,250,0.35)]">
          {icon}
        </div>
      </div>

      <div>
        <div className="text-lg font-semibold text-slate-900">{title}</div>
        {subtitle ? (
          <div className="text-sm text-slate-500 leading-snug">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

/* --- Íconos SVG minimalistas --- */
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20L16.65 16.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGear() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a6.9 6.9 0 0 0-1.7-1l-.3-2.7h-4l-.3 2.7a6.9 6.9 0 0 0-1.7 1l-2.4-1-2 3.5L5.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1c.5.4 1.1.7 1.7 1l.3 2.7h4l.3-2.7c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.5L18.9 13c.1-.3.1-.7.1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 10v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}
