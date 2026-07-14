import { cache } from "react";
import { groq } from "next-sanity";
import { sanityClient } from "sanity/lib/client";

const PUBLISHED_CODES_QUERY = groq`
  *[
    _type == "raccomandataPage" &&
    defined(code) &&
    !(_id in path("drafts.**"))
  ].code
`;

/**
 * Set di codici con scheda pubblicata (minuscolo, per confronto con URL canonical).
 * Dedup per richiesta React (stessa pagina / layout).
 */
export const getPublishedRaccomandataCodeSet = cache(
  async (): Promise<Set<string>> => {
    const codes = await sanityClient.fetch<string[]>(PUBLISHED_CODES_QUERY);
    return new Set(
      (codes ?? [])
        .map((c) => String(c).trim().toLowerCase())
        .filter(Boolean)
    );
  }
);
