// /sanity/lib/queries/raccomandata.ts
import { groq } from "next-sanity";

// ✅ Query completa para renderizar la página /raccomandata/[code]
export const RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
][0]{
  // META/SEO
  code,
  metaTitle,
  metaDescription,

  // HERO
  heroTitleSuffix,
  heroSubtitle,

  // INFOBOX
  mittente,
  tipologia,
  stato,
  priority,

  // DETAILS
  details[]{ title, body },

  // STEPS
  steps[]{ title, description },

  // ALERT BOX
  alertBox{ enabled, title, body, icon },

  // ASSISTENZA
  assistenza{ title, cards[]{ icon, title, description } },

  // FAQS
  faq{ title, items[]{ q, a } },

  // AUTHOR BOX
  authorBox{
    name,
    avatarUrl,
    updatedAt
  },

  // FECHAS PARA SCHEMA
  _createdAt,
  _updatedAt
}
`;



// (Opcional) Conteo de reportes crowd si sigues usando raccomandataReport
export const REPORTS_BY_CODE = groq`
count(*[
  _type == "raccomandataReport" &&
  string(code) == string($code) &&
  status != "rejected"
])
`;
