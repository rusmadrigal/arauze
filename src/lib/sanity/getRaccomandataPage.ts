import { cache } from "react";
import { unstable_cache } from "next/cache";
import { sanityClient } from "sanity/lib/client";
import { RACCOMANDATA_BY_CODE } from "sanity/lib/queries/raccomandata";
import { RACCOMANDATA_PAGE_REVALIDATE_SEC } from "@/lib/sanity/revalidate";

const fetchPage = unstable_cache(
  async (code: string) => sanityClient.fetch(RACCOMANDATA_BY_CODE, { code }),
  ["raccomandata-page"],
  { revalidate: RACCOMANDATA_PAGE_REVALIDATE_SEC, tags: ["raccomandata"] }
);

/**
 * Cross-request ISR (unstable_cache) + dedup nella stessa request (React cache)
 * tra generateMetadata e la pagina.
 */
export const getRaccomandataPageByCode = cache((code: string) => fetchPage(code));
