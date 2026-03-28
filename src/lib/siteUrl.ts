/** Origen canónico en producción (siempre con www), alineado al dominio público. */
export const CANONICAL_SITE_ORIGIN = "https://www.arauze.com";

function trimTrailingSlashes(s: string): string {
  return s.replace(/\/+$/, "");
}

/** Convierte https://arauze.com → https://www.arauze.com */
export function normalizeArauzeOrigin(origin: string): string {
  try {
    const url = new URL(origin);
    if (url.hostname === "arauze.com") {
      url.hostname = "www.arauze.com";
    }
    return trimTrailingSlashes(url.origin);
  } catch {
    return origin;
  }
}

/**
 * Origen absoluto para metadata, sitemap y URLs absolutas (servidor).
 * En preview de Vercel usa el host del deployment si aplica.
 */
export function getSiteOrigin(): string {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return normalizeArauzeOrigin(trimTrailingSlashes(raw));
  }
  return CANONICAL_SITE_ORIGIN;
}

/**
 * Origen para código cliente (solo variables NEXT_PUBLIC_* inyectadas en build).
 */
export function getPublicSiteOrigin(): string {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return normalizeArauzeOrigin(trimTrailingSlashes(raw));
  }
  return CANONICAL_SITE_ORIGIN;
}

export function shouldNoIndexProductionPreview(origin: string): boolean {
  return (
    process.env.VERCEL_ENV === "preview" || origin.includes(".vercel.app")
  );
}
