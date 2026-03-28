// /sanity/lib/queries/raccomandata.ts
import { groq } from "next-sanity";

// ✅ Detalle de la raccomandata por código (case-insensitive)
export const RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  lower(string(code)) == lower(string($code))
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

// ✅ Conteo de reportes crowd por código (case-insensitive)
export const REPORTS_BY_CODE = groq`
count(*[
  _type == "raccomandataReport" &&
  lower(string(code)) == lower(string($code)) &&
  status != "rejected"
])
`;

// ✅ Últimas páginas analizadas para la tabla del home
export const ULTIME_ANALIZZATE_PAGES = groq`
*[
  _type == "raccomandataPage" && defined(code) && defined(mittente)
]
| order(coalesce(authorBox.updatedAt, _updatedAt) desc)[0...6]{
  "code": string(code),
  "sender": mittente,
  "urgency": priority,
  "state": stato
}
`;

// ✅ Datos del gráfico PIE por código (raccomandataChart) – case-insensitive
export const RACCOMANDATA_CHART_BY_CODE = groq`
*[
  _type == "raccomandataChart" &&
  lower(string(codice)) == lower(string($code))
][0]{
  "code": string(codice),
  titolo,
  slices[]{
    categoria,
    valore,
    color
  }
}
`;
