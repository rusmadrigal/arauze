// sanity/lib/queries/raccomandataMarketPage.ts
export const RACCOMANDATA_MARKET_PAGE = `
*[_type == "raccomandataMarketPage"][0]{
  title,
  slug,
  metaTitle,
  metaDescription,
  mainContent,
  alertBox,
  comparison,
  faqs[]{
    question,
    answer
  },
  comparisonRows[]{
    feature,
    raccomandataMarket,
    attiGiudiziari
  }
}
`;
