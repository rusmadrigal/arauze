// sanity/lib/queries/raccomandataMarketPage.ts
export const RACCOMANDATA_MARKET_PAGE = `
*[_type == "raccomandataMarketPage" && slug.current == "raccomandata-market"][0]{
  title,
  metaTitle,
  metaDescription,
  mainContent,
  faqs,
  comparison,
  alertBox
}
`;
