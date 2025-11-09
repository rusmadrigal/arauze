// /sanity/lib/queries/raccomandata.ts
import { groq } from "next-sanity";

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
