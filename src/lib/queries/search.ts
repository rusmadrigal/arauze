import { groq } from "next-sanity";

export const EXISTS_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  lower(string(code)) == lower(string($code))
][0]{
  code, mittente, heroTitleSuffix
}
`;

export const SEARCH_RACCOMANDATA = groq`
*[
  _type == "raccomandataPage" && (
    mittente match $p ||
    heroTitleSuffix match $p ||
    heroSubtitle match $p ||
    tipologia match $p ||
    stato match $p
  )
] | order(_updatedAt desc) [0...10]{
  code, mittente, heroTitleSuffix, tipologia, stato
}
`;

/** Suggerimenti home: codice parziale (wildcard su string(code), case-insensitive). */
export const SUGGEST_RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  defined(code) &&
  lower(string(code)) match $codePattern
] | order(length(string(code)) asc, code asc) [0...8]{
  code,
  mittente,
  heroTitleSuffix,
  tipologia
}
`;

/** Suggerimenti home: testo (stessi campi della ricerca principale, meno risultati). */
export const SUGGEST_RACCOMANDATA_TEXT = groq`
*[
  _type == "raccomandataPage" && (
    mittente match $p ||
    heroTitleSuffix match $p ||
    heroSubtitle match $p ||
    tipologia match $p ||
    stato match $p
  )
] | order(_updatedAt desc) [0...8]{
  code,
  mittente,
  heroTitleSuffix,
  tipologia,
  stato
}
`;
