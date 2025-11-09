import { groq } from "next-sanity";

export const RACCOMANDATA_BY_CODE = groq`
*[
  _type == "raccomandataPage" &&
  string(code) == string($code)
][0]{
  // Clave
  code,

  // HERO
  heroTitleSuffix,
  heroSubtitle,

  // INFOBOX
  mittente,
  tipologia,
  stato,

  // DETAILS
  details[]{ title, body },

  // STEPS
  steps[]{ title, description },

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

  // FAQs
  faq{
    title,
    items[]{
      q,
      a
    }
  }
}
`;
