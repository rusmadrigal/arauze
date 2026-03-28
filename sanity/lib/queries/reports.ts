export const REPORTS_SERIES_BY_CODE = `
{
  "points": *[
    _type == "raccomandataReport" &&
    (
      string(code) == $code ||
      code == $code
    )
  ] | order(coalesce(_createdAt, createdAt) asc) {
    "date": select(
      defined(_createdAt) => string(_createdAt)[0..9],
      defined(createdAt) => string(createdAt)[0..9],
      string(now())[0..9]
    ),
    "count": coalesce(count, 1),
    "_createdAt": _createdAt,
    "createdAt": createdAt
  }
}
`;
