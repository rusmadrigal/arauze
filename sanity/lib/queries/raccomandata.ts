// /sanity/lib/queries/raccomandata.ts
import { groq } from "next-sanity";

// ✅ Query usada por el endpoint /api/check-codice
// Busca una raccomandata por número de código y devuelve datos básicos.
export const CODE_BY_NUMBER = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
][0]{
  code,
  mittente,
  tipologia,
  stato,
  priority,
  _updatedAt
}
`;

// ✅ Query completa para renderizar la página /raccomandata/[code]
export const RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
][0]{
  // CLAVE
  code,

  // HERO
  heroTitleSuffix,
  heroSubtitle,

  // INFOBOX
  mittente,
  tipologia,
  stato,
  priority,

  // DETAILS
  details[]{ 
    title, 
    body 
  },

  // STEPS
  steps[]{ 
    title, 
    description 
  },

  // ALERT BOX
  alertBox{
    enabled,
    title,
    body,
    icon
  },

  // ASSISTENZA
  assistenza{
    title,
    cards[]{
      icon,
      title,
      description
    }
  },

  // FAQS
  faq{
    title,
    items[]{
      q,
      a
    }
  }
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
