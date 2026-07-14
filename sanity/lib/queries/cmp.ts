export const GET_CMP_PAGE = `
  *[_type == "cmpPage" && slug.current == $slug][0]{

    metaTitle,
    metaDescription,

    name,
    subtitle,
    typeLabel,

    city,
    province,
    region,

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

    frequentCodesTitle,
    frequentCodes,

    statusTableTitle,
    statusRows,

    faqTitle,
    faqItems,

    richContent
  }
`;
