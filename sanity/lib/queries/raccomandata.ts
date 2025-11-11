// /sanity/lib/queries/raccomandata.ts
import { groq } from "next-sanity";

// ✅ Query de detalle por código (ya existente)
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

// (Opcional) Conteo de reportes crowd (ya existente)
export const REPORTS_BY_CODE = groq`
count(*[
  _type == "raccomandataReport" &&
  string(code) == string($code) &&
  status != "rejected"
])
`;

// ✅ NUEVO: últimas páginas analizadas para la tabla del home
// Campos que necesitas en la UI: code (#573), mittente (AGENZIA DEI…), priority (ALTA|BASSA|RITIRATA)
// El texto "Dettaglio →" lo armamos en Next.js, y el href = /raccomandata/${code}
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
