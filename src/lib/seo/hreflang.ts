import type { Metadata } from "next";

/**
 * Hreflang per sito monolingue orientato all’Italia.
 * Stessa URL per it-IT, it e x-default: chiarisce lingua/mercato senza versioni alternative.
 *
 * @see https://developers.google.com/search/docs/specialty/international/localized-versions
 */
export function alternatesItalianCanonical(
  absoluteCanonicalUrl: string
): Metadata["alternates"] {
  return {
    canonical: absoluteCanonicalUrl,
    languages: {
      "it-IT": absoluteCanonicalUrl,
      it: absoluteCanonicalUrl,
      "x-default": absoluteCanonicalUrl,
    },
  };
}
