export const GET_CMP_PAGE = `
  *[_type == "cmpPage" && slug.current == $slug][0]{

    metaTitle,
    metaDescription,

    name,
    subtitle,
    typeLabel,

    addressTitle,
    address,

    "mapImage": mapImage.asset->url,
    mapAlt,

    meaningTitle,
    meaningBody,

    deliveryTitle,
    deliveryBody,

    whatHappensTitle,
    whatHappensList,

    commonIssuesTitle,
    commonIssuesList,

    statusTableTitle,
    statusRows,

    faqTitle,
    faqItems,

    richContent
  }
`;
