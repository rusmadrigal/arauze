// src/lib/queries/raccomandata.js
import { groq } from "next-sanity";

export const CODE_BY_NUMBER = groq`
*[
  _type == "raccomandataCode" &&
  string(code) == string($code)
][0]{
  code,
  mittente,
  tipologia,
  stato,
  confidence,
  reportsCount,
  sources,
  updatedAt
}
`;

export const REPORTS_BY_CODE = groq`
count(*[
  _type == "raccomandataReport" &&
  string(code) == string($code) &&
  status != "rejected"
])
`;

export const RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
][0]{
  code,
  heroTitleSuffix,
  heroSubtitle
}
`;
