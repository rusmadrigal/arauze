// 🔍 GROQ queries centralizadas para Raccomandate
export const CODE_BY_NUMBER = (code: string) => `
  *[_type == "raccomandataCode" && code == "${code}"][0]{
    code,
    mittente,
    tipologia,
    stato,
    confidence,
    reportsCount,
    updatedAt
  }
`;

export const REPORTS_BY_CODE = (code: string) => `
  count(*[_type == "raccomandataReport" && code == "${code}" && status != "rejected"])
`;

export const LATEST_CODES = `
  *[_type == "raccomandataCode"] | order(updatedAt desc)[0..10]{
    code,
    mittente,
    tipologia,
    stato,
    reportsCount
  }
`;

export const PENDING_REPORTS = `
  *[_type == "raccomandataReport" && status == "pending"]{
    code,
    mittenteSegnalato,
    provincia,
    dataRicezione,
    _createdAt
  } | order(_createdAt desc)[0..20]
`;
