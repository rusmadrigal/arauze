// src/lib/queries/raccomandata.js
import { groq } from "next-sanity";

// 🔹 Un único fetch: HERO + INFOBOX (todo vive en `raccomandataPage`)
export const RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
][0]{
  // clave
  code,

  // HERO
  heroTitleSuffix,
  heroSubtitle,

  // INFOBOX
  mittente,
  tipologia,
  stato
}
`;

// 🔹 (Opcional) Conteo de reportes crowd si sigues usando `raccomandataReport`
export const REPORTS_BY_CODE = groq`
count(*[
  _type == "raccomandataReport" &&
  string(code) == string($code) &&
  status != "rejected"
])
`;
