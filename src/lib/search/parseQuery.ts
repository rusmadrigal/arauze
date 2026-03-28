/** Stesso pattern del campo `code` in Sanity (raccomandataPage), per URL slug. */
const CODE_SLUG_RE = /^[a-zA-Z0-9_-]{3,32}$/;

export function isCodeSlug(raw: string): boolean {
  return CODE_SLUG_RE.test(raw.trim());
}

// Limpia ruido del dominio y extrae código si existe.
export function extractCode(raw: string): string | null {
  if (!raw) return null;
  const t = raw.trim();
  const m = t.match(/\b(\d{3,6})\b/);
  if (m) return m[1];
  if (isCodeSlug(t)) return t.toLowerCase();
  return null;
}

const STOPWORDS = [
  "raccomandata",
  "raccomendata",
  "racomandata",
  "raccomandatta",
  "market",
  "mercato",
  "lettera",
  "posta",
  "avviso",
  "aviso",
  "codice",
  "code",
  "racc",
  "racco",
  "racc697",
  "spedizione",
];

function stripAccents(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function normalizeQuery(raw: string): string {
  if (!raw) return "";
  let q = stripAccents(raw.toLowerCase()).trim().replace(/\s+/g, " ");
  // quita signos comunes
  q = q
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  // elimina stopwords
  const tokens = q.split(" ").filter((t) => t && !STOPWORDS.includes(t));
  return tokens.join(" ");
}

// Genera patrón tipo *foo bar* para GROQ match
export function toGroqPattern(q: string): string {
  if (!q) return "";
  // Cambia espacios por * para permitir match flexible por término
  // "agenzia entrate 697" => *agenzia*entrate*697*
  return `*${q.replace(/\s+/g, "*")}*`;
}
