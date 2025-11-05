"use client";

export default function ComeFunziona() {
  return (
    <section className="mt-10 sm:mt-12 text-center md:text-left">
      <h2 className="text-2xl sm:text-3xl font-semibold font-serif text-slate-900 mb-8 sm:mb-10">
        Come funziona
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
        <StepItem
          icon={<IconSearch />}
          title="Inserisci"
          subtitle="il codice della tua raccomandata"
        />
        <StepItem
          icon={<IconGear />}
          title="Analisi"
          subtitle="elaboriamo i dati per identificare il mittente"
        />
        <StepItem
          icon={<IconInfo />}
          title="Risultato"
          subtitle="visualizzi chi ha inviato la raccomandata"
        />
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
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 text-center sm:text-left">
      {/* Icon container */}
      <div
        className="
          relative h-14 w-14 sm:h-16 sm:w-16 rounded-full 
          bg-brand-50 flex items-center justify-center
          shadow-[0_8px_18px_rgba(63,123,250,0.25)]
          animate-[pulse_3s_ease-in-out_infinite]
          transition-transform duration-500
          hover:scale-[1.05]
          flex-shrink-0
        "
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#7FB3FF] to-[#3F7BFA] opacity-[.15]" />
        <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-b from-[#7FB3FF] to-[#3F7BFA] flex items-center justify-center text-white shadow-[0_3px_8px_rgba(63,123,250,0.35)]">
          {icon}
        </div>
      </div>

      {/* Text */}
      <div>
        <div className="text-base sm:text-lg font-semibold text-slate-900">
          {title}
        </div>
        {subtitle && (
          <div className="text-sm text-slate-500 leading-snug mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Minimal SVG icons --- */
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
