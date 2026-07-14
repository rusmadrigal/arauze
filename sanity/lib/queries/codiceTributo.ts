import { groq } from "next-sanity";

export const CODICE_TRIBUTO_LIST = groq`
*[
  _type == "codiceTributoPage" &&
  defined(slug) &&
  !(_id in path("drafts.**"))
]{
  slug,
  kind,
  code,
  title,
  metaDescription
}
`;

export const CODICE_TRIBUTO_BY_SLUG = groq`
*[
  _type == "codiceTributoPage" &&
  lower(string(slug)) == lower(string($slug))
][0]{
  slug,
  kind,
  code,
  title,
  metaTitle,
  metaDescription,
  heroSubtitle,
  sections[]{
    title,
    body
  },
  highlights,
  faq[]{
    q,
    a
  },
  updatedAt
}
`;

