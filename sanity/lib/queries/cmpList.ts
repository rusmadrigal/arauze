// sanity/lib/queries/cmpList.ts
export const CMP_LIST_QUERY = /* groq */ `
*[_type == "cmpPage" && !(_id in path("drafts.**"))]
| order(name asc) {
  "slug": slug.current,
  name,
  city,
  province,
  region,
  macroArea,
  description,
  services
}
`;
