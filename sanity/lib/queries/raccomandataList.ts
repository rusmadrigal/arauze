// /sanity/lib/queries/raccomandataList.ts

export const RACCOMANDATA_LIST = `
*[_type == "raccomandataPage" && defined(code)] | order(_createdAt desc) {
  _id,
  code,
  mittente,
  priority,
  stato,
  "href": "/raccomandata/" + lower(code)
}
`;
