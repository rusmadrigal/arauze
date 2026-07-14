/**
 * Testi di default per le pagine /raccomandata/[code] (mercato italiano, orientamento 2026).
 * Allineati a prassi Poste Italiane su avviso/giacenza; non sostituiscono documenti ufficiali.
 */

export const RACCOMANDATA_HERO_SUBTITLE_DEFAULT =
  "Guida orientativa sul codice che trovi su avviso di mancata consegna o sulla raccomandata tracciata con Poste Italiane: possibile mittente, tempi di ritiro e cosa verificare su piego e canali ufficiali (anche poste.it).";

export function raccomandataMetaDescriptionFallback(code: string): string {
  return `Italia 2026 — Codice ${code}: mittente tipico, tipologia di comunicazione e ritiro presso la rete Poste Italiane. Informazioni di supporto: controlla sempre avviso, piego e portale ufficiale.`;
}

export const RACCOMANDATA_CHART_TITLE_FALLBACK =
  "Come i lettori etichettano questo codice (dati aggregati e moderati, non ufficiali)";

export type DefaultStep = {
  title: string;
  description: string;
};

/** Passi di fallback se Sanity non definisce gli step. */
export const RACCOMANDATA_DEFAULT_STEPS: DefaultStep[] = [
  {
    title: "Leggere avviso e codice (Poste Italiane)",
    description:
      "Controlla l’avviso di mancata consegna (o di giacenza) e il piego: il codice deve coincidere. Per lo stato della spedizione puoi usare anche l’app o il sito poste.it se hai il numero di tracciamento della raccomandata.",
  },
  {
    title: "Ritirare entro i termini indicati",
    description:
      "I giorni per il ritiro in ufficio postale sono quelli scritti sull’avviso. Di norma, per la raccomandata ordinaria in giacenza si parla spesso di circa 30 giorni; per la Raccomandata 1 i termini sono in genere più brevi (spesso intorno a 15 giorni). Dopo la scadenza la spedizione può essere restituita al mittente: verifica sempre sul tuo documento.",
  },
  {
    title: "Verificare il contenuto e rispondere se necessario",
    description:
      "Dopo il ritiro, leggi la comunicazione (atti, avvisi, solleciti). Per gli enti pubblici spesso si usano canali come PEC o portali istituzionali: usa solo quelli ufficiali indicati nel documento.",
  },
];
