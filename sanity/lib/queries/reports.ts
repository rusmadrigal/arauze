// /sanity/lib/queries/reports.ts
// Versión 100 % compatible con Sanity v3

export const REPORTS_SERIES_BY_CODE = `
{
  "points": *[
    _type == "raccomandataReport" &&
    code == $code
  ] | order(_createdAt asc) {
    "date": string(_createdAt)[0..9],
    "count": coalesce(count, 1)
  }
}
`;
