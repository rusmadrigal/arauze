"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

type Source =
  | "poste"
  | "agenzia"
  | "banca"
  | "giudiziario"
  | "rke"
  | "unknown";

type Format =
  | "giacenza"
  | "cortesia"
  | "busta-verde"
  | "cartolina-bianca"
  | "scontrino-bianco"
  | "cartoncino-bianco";

type Result = {
  title: string;
  description: string;
  action: string;
  confidence: "Alta" | "Media" | "Bassa";
  urgency: "Alta" | "Media" | "Bassa";
  urgencyReason: string;
  nextSteps: string[];
  codes: Array<{ code: string; label: string; href: string }>;
};

type FieldGroupProps = {
  label: string;
  children: ReactNode;
};

const KNOWN_CODES = {
  "07a": {
    label: "Avviso di cortesia 07a",
    href: "/raccomandata/07a",
  },
  "1-g30": {
    label: "Avviso di cortesia 1-g30",
    href: "/raccomandata/1-g30",
  },
  "200": { label: "Codice 200", href: "/raccomandata/200" },
  "201": { label: "Codice 201", href: "/raccomandata/201" },
  "386": { label: "Codice 386", href: "/raccomandata/386" },
  "529": { label: "Codice 529", href: "/raccomandata/529" },
  "549": { label: "Codice 549", href: "/raccomandata/549" },
  "572": { label: "Codice 572", href: "/raccomandata/572" },
  "5727": { label: "Codice 5727", href: "/raccomandata/5727" },
  "617": { label: "Codice 617", href: "/raccomandata/617" },
  "618": { label: "Codice 618", href: "/raccomandata/618" },
  "619": { label: "Codice 619", href: "/raccomandata/619" },
  "665": { label: "Codice 665", href: "/raccomandata/665" },
  "669": { label: "Codice 669", href: "/raccomandata/669" },
  "697": { label: "Codice 697", href: "/raccomandata/697" },
  "785": { label: "Codice 785", href: "/raccomandata/785" },
  "786": { label: "Codice 786", href: "/raccomandata/786" },
  "788": { label: "Codice 788", href: "/raccomandata/788" },
} as const;

const SOURCE_LABELS: Record<Source, string> = {
  poste: "Poste Italiane",
  agenzia: "Agenzia delle Entrate",
  banca: "Banca / Finanziaria",
  giudiziario: "Ufficio giudiziario / Polizia",
  rke: "RKE / avviso di cortesia",
  unknown: "Non lo so ancora",
};

const FORMAT_LABELS: Record<Format, string> = {
  giacenza: "Avviso di giacenza",
  cortesia: "Avviso di cortesia",
  "busta-verde": "Busta verde",
  "cartolina-bianca": "Cartolina bianca",
  "scontrino-bianco": "Scontrino bianco",
  "cartoncino-bianco": "Cartoncino bianco",
};

const SOURCE_SCORE: Record<Source, Partial<Result>> = {
  poste: {
    title: "Probabile notifica postale",
    description:
      "Il pattern sembra coerente con una comunicazione di Poste Italiane o con un passaggio in giacenza.",
    action: "Controlla l'ufficio di ritiro e verifica il codice stampato sull'avviso.",
    confidence: "Media",
  },
  agenzia: {
    title: "Probabile comunicazione fiscale",
    description:
      "La combinazione richiama spesso avvisi fiscali o comunicazioni legate ad Agenzia delle Entrate.",
    action: "Apri il dettaglio del codice e verifica subito eventuali scadenze.",
    confidence: "Alta",
  },
  banca: {
    title: "Probabile notifica bancaria",
    description:
      "La domanda si concentra di solito su carte, estratti conto, recupero crediti o controlli interni.",
    action: "Confronta il messaggio con i canali ufficiali della banca prima di agire.",
    confidence: "Media",
  },
  giudiziario: {
    title: "Probabile atto giudiziario o multa",
    description:
      "Se il formato o il mittente sembrano giudiziari, conviene muoversi con urgenza e leggere la scheda corretta.",
    action: "Controlla subito il codice: qui i casi 386, 617, 619, 669, 786 e 788 sono i più utili.",
    confidence: "Alta",
  },
  rke: {
    title: "Probabile avviso di cortesia",
    description:
      "Quando compare RKE o un formato informativo, spesso si tratta di un avviso preliminare o di cortesia.",
    action: "Verifica se c'e' un codice corto come 572, 5727, 1-g30 o 07a.",
    confidence: "Media",
  },
  unknown: {
    title: "Serve un controllo più preciso",
    description:
      "Non basta un solo indizio per classificare l'avviso. Conviene partire da formato, colore e codice.",
    action: "Se hai il codice, usalo ora. Se no, prova a cercare il formato dell'avviso.",
    confidence: "Bassa",
  },
};

const FORMAT_HINTS: Record<Format, string> = {
  giacenza: "Indica quasi sempre un avviso da ritirare o verificare al più presto.",
  cortesia: "Di solito segnala un preavviso o una notifica informativa.",
  "busta-verde": "Spesso è associata ad atti con valore legale o giudiziario.",
  "cartolina-bianca": "Ricorre spesso nei flussi postali standard o amministrativi.",
  "scontrino-bianco": "Può apparire nei dettagli di giacenza e nei tracciamenti postali.",
  "cartoncino-bianco": "Talvolta accompagna notifiche amministrative o informative.",
};

function getUrgency(
  source: Source,
  format: Format,
  hasDeadline: boolean,
  exactCode?: string
): { urgency: Result["urgency"]; urgencyReason: string } {
  const urgentCodes = new Set(["201", "386", "617", "619", "669", "697", "786", "788"]);
  const normalizedCode = (exactCode ?? "").trim().toLowerCase();

  if (hasDeadline || source === "giudiziario" || source === "agenzia") {
    return {
      urgency: "Alta",
      urgencyReason:
        "Ci sono segnali che meritano controllo immediato: scadenza visibile, mittente delicato o contesto fiscale/giudiziario.",
    };
  }

  if (normalizedCode && urgentCodes.has(normalizedCode)) {
    return {
      urgency: "Alta",
      urgencyReason:
        "Il codice rientra tra quelli che più spesso indicano una notifica da verificare subito.",
    };
  }

  if (source === "poste" || format === "giacenza" || source === "rke" || format === "cortesia") {
    return {
      urgency: "Media",
      urgencyReason:
        "Ci sono buoni indizi, ma serve ancora il dettaglio del codice o del mittente per confermare il tipo di notifica.",
    };
  }

  return {
    urgency: "Bassa",
    urgencyReason:
      "L'avviso non mostra ancora segnali forti: vale la pena completare il controllo con un codice o un formato più preciso.",
  };
}

export default function AvvisoDecoder() {
  const [source, setSource] = useState<Source>("unknown");
  const [format, setFormat] = useState<Format>("giacenza");
  const [code, setCode] = useState("");
  const [hasDeadline, setHasDeadline] = useState(false);

  const result = useMemo<Result>(() => {
    const normalized = code.trim().toLowerCase();
    const exact = normalized ? KNOWN_CODES[normalized as keyof typeof KNOWN_CODES] : null;

    if (exact) {
      const urgent = getUrgency(source, format, hasDeadline, exact ? normalized : undefined);
      const exactUrgency = urgent.urgency === "Bassa" ? "Media" : urgent.urgency;
      return {
        title: `Corrisponde a ${exact.label}`,
        description:
          "Hai inserito un codice che corrisponde a una delle schede già coperte dal sito. Apri subito il dettaglio per il contesto completo.",
        action: "Vai alla scheda del codice e controlla mittente, urgenza e FAQ.",
        confidence: "Alta",
        urgency: exactUrgency,
        urgencyReason: `${urgent.urgencyReason} Il codice è stato riconosciuto con precisione.`,
        nextSteps: [
          "Apri subito la scheda del codice e leggi mittente, contesto e FAQ.",
          hasDeadline
            ? "Hai una scadenza: valuta il ritiro o la verifica oggi stesso."
            : "Se il mittente non coincide, confronta il formato con la notifica in mano.",
          "Se vuoi un secondo passaggio, usa il decoder o la pagina hub di riferimento.",
        ],
        codes: [{ code: normalized, label: exact.label, href: exact.href }],
      };
    }

    const base = SOURCE_SCORE[source];
    const formatHint = FORMAT_HINTS[format];
    const codes: Result["codes"] = [];
    const urgency = getUrgency(source, format, hasDeadline);

    if (source === "agenzia") {
      codes.push(
        { code: "201", label: "Codice 201", href: KNOWN_CODES["201"].href },
        { code: "617", label: "Codice 617", href: KNOWN_CODES["617"].href },
        { code: "619", label: "Codice 619", href: KNOWN_CODES["619"].href }
      );
    } else if (source === "giudiziario") {
      codes.push(
        { code: "386", label: "Codice 386", href: KNOWN_CODES["386"].href },
        { code: "669", label: "Codice 669", href: KNOWN_CODES["669"].href },
        { code: "786", label: "Codice 786", href: KNOWN_CODES["786"].href }
      );
    } else if (source === "poste" || format === "giacenza") {
      codes.push(
        { code: "665", label: "Codice 665", href: KNOWN_CODES["665"].href },
        { code: "697", label: "Codice 697", href: KNOWN_CODES["697"].href },
        { code: "788", label: "Codice 788", href: KNOWN_CODES["788"].href }
      );
    } else if (source === "rke" || format === "cortesia") {
      codes.push(
        { code: "572", label: "Codice 572", href: KNOWN_CODES["572"].href },
        { code: "5727", label: "Codice 5727", href: KNOWN_CODES["5727"].href },
        { code: "07a", label: "07a", href: KNOWN_CODES["07a"].href }
      );
    } else if (source === "banca") {
      codes.push(
        { code: "529", label: "Codice 529", href: KNOWN_CODES["529"].href },
        { code: "549", label: "Codice 549", href: KNOWN_CODES["549"].href },
        { code: "618", label: "Codice 618", href: KNOWN_CODES["618"].href }
      );
    } else {
      codes.push(
        { code: "201", label: "Codice 201", href: KNOWN_CODES["201"].href },
        { code: "386", label: "Codice 386", href: KNOWN_CODES["386"].href },
        { code: "572", label: "Codice 572", href: KNOWN_CODES["572"].href }
      );
    }

    return {
      title: base?.title ?? "Classificazione probabilistica",
      description: `${base?.description ?? ""} ${formatHint}`.trim(),
      action: `${base?.action ?? ""} ${hasDeadline ? "Hai indicato una scadenza: meglio muoversi subito." : ""}`.trim(),
      confidence: base?.confidence ?? "Bassa",
      urgency: urgency.urgency,
      urgencyReason: urgency.urgencyReason,
      nextSteps: [
        "Apri una delle schede consigliate per capire il cluster più probabile.",
        "Rivedi mittente, formato e codice: il dettaglio giusto cambia spesso la lettura.",
        hasDeadline
          ? "Con una scadenza visibile conviene trattare l'avviso come prioritario."
          : "Se manca un codice, usa il formato per restringere il campo prima di cercare altro.",
      ],
      codes,
    };
  }, [code, format, hasDeadline, source]);

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2F66D5]">
            Decoder interattivo
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Capisci subito cosa hai ricevuto
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Seleziona il formato, il mittente probabile e, se lo hai, il codice
            dell&apos;avviso. Il decoder ti suggerisce il cluster piu&apos; probabile e le
            schede da aprire per prime.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <FieldGroup label="Mittente probabile">
            <ChoiceGrid value={source} onChange={(value) => setSource(value as Source)} />
          </FieldGroup>

          <FieldGroup label="Formato o colore">
            <FormatGrid value={format} onChange={(value) => setFormat(value as Format)} />
          </FieldGroup>

          <FieldGroup label="Codice avviso">
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Es. 619, 386, 572, 07a..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2F66D5] focus:bg-white"
            />
          </FieldGroup>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={hasDeadline}
              onChange={(event) => setHasDeadline(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2F66D5] focus:ring-[#2F66D5]"
            />
            <span>
              C&apos;e&apos; una scadenza o un termine di ritiro visibile sull&apos;avviso
            </span>
          </label>
        </div>
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white md:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-300">
          Risultato
        </p>
        <h3 className="mt-3 text-2xl font-semibold">{result.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{result.description}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/8 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              Urgenza
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{result.urgency}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{result.urgencyReason}</p>
          </div>
          <div className="rounded-2xl bg-white/8 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              Confidenza
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{result.confidence}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Il decoder privilegia segnali forti, poi passa ai codici più probabili.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white/8 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            Lettura rapida
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{result.action}</p>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-white">Cosa fare adesso</p>
          <ol className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
            {result.nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl bg-white/5 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-sky-300">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-white">Schede consigliate</p>
          <div className="mt-3 space-y-3">
            {result.codes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10"
              >
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 text-xs text-slate-300">{item.code}</p>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs leading-5 text-slate-400">
          Questo strumento e&apos; orientativo e non sostituisce la verifica del documento
          originale o dei canali ufficiali.
        </p>
      </aside>
    </section>
  );
}

function FieldGroup({ label, children }: FieldGroupProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-900">{label}</p>
      {children}
    </div>
  );
}

function ChoiceGrid({
  value,
  onChange,
}: {
  value: Source;
  onChange: (value: Source) => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {(Object.keys(SOURCE_LABELS) as Source[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
            value === key
              ? "border-[#2F66D5] bg-[#2F66D5] text-white"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
          }`}
        >
          {SOURCE_LABELS[key]}
        </button>
      ))}
    </div>
  );
}

function FormatGrid({
  value,
  onChange,
}: {
  value: Format;
  onChange: (value: Format) => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {(Object.keys(FORMAT_LABELS) as Format[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
            value === key
              ? "border-[#2F66D5] bg-[#2F66D5] text-white"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
          }`}
        >
          {FORMAT_LABELS[key]}
        </button>
      ))}
    </div>
  );
}
