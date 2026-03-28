import { groq } from "next-sanity";

export const EXISTS_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
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
