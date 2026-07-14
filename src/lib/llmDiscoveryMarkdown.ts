import { CANONICAL_SITE_ORIGIN } from "@/lib/siteUrl";

/**
 * Contenuto condiviso per /llm.txt e /llms.txt (Markdown, text/plain).
 * URL assoluti sul dominio canonico per coerenza tra ambienti.
 */
export function getLlmDiscoveryMarkdown(): string {
  const base = CANONICAL_SITE_ORIGIN;

  return `# Arauze

> Arauze.com è un sito informativo in italiano sul significato dei codici raccomandata, sui possibili mittenti tipici e su cosa fare per ritirare le comunicazioni. Integra dati editoriali, modelli ricorrenti e contributi degli utenti moderati. Non sostituisce Poste Italiane, l'avviso di ritiro o le comunicazioni ufficiali del mittente.

Le schede descrivono codici numerici spesso riportati su avvisi e documentazione postale; l'utente deve sempre verificare su piego, avviso di giacenza e canali istituzionali.

## Cosa non facciamo

Arauze non fornisce:

- consulenza legale o fiscale
- tracciamento ufficiale delle spedizioni Poste Italiane
- certezza del mittente reale di una raccomandata specifica (solo orientamento basato su fonti pubbliche e segnalazioni)

## Contatto

- Email: info@arauze.com

## Informazioni chiave

- [Home](${base}/): Ricerca codici e contenuti principali
- [Codici analizzati](${base}/raccomandata-market): Elenco delle schede per codice
- [Ricerca](${base}/ricerca): Ricerca per codice o testo
- [Centri CMP](${base}/raccomandata/cmp): Centri di meccanizzazione postale in Italia
- [Contatti](${base}/contatti)
- [Privacy](${base}/privacy)
- [Termini](${base}/termini)
- [Sitemap XML](${base}/sitemap.xml)

## AI Discovery Files

- [llms.txt](${base}/llms.txt): Stesso contenuto (convenzione alternativa)
- [llm.txt](${base}/llm.txt): Questo file (variante di nome)
`;
}
