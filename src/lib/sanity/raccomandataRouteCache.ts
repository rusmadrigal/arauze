import { unstable_cache } from "next/cache";
import { sanityClient } from "sanity/lib/client";
import {
  RACCOMANDATA_FEEDBACK_APPROVED_BY_CODE,
  RACCOMANDATA_RELATED_CANDIDATES,
  REPORTS_BY_CODE,
} from "sanity/lib/queries/raccomandata";
import { RACCOMANDATA_PAGE_REVALIDATE_SEC } from "@/lib/sanity/revalidate";

const FEEDBACK_REVALIDATE_SEC = 120;

export const getReportCountByCode = unstable_cache(
  async (code: string) => {
    const n = await sanityClient.fetch<number>(REPORTS_BY_CODE, { code });
    return typeof n === "number" ? n : 0;
  },
  ["raccomandata-report-count"],
  { revalidate: RACCOMANDATA_PAGE_REVALIDATE_SEC, tags: ["raccomandata"] }
);

type Priority = "ALTA" | "MEDIA" | "BASSA";

type RelatedRow = {
  code: string;
  mittente?: string | null;
  tipologia?: string | null;
  priority?: Priority | null;
};

export const getRelatedCandidatesByCode = unstable_cache(
  async (code: string) => {
    const rows = await sanityClient.fetch<RelatedRow[]>(
      RACCOMANDATA_RELATED_CANDIDATES,
      { code }
    );
    return rows ?? [];
  },
  ["raccomandata-related-candidates"],
  { revalidate: RACCOMANDATA_PAGE_REVALIDATE_SEC, tags: ["raccomandata"] }
);

type FeedbackDoc = {
  _id: string;
  nome?: string | null;
  citta?: string | null;
  codice?: string | null;
  categoria?: string | null;
  commento?: string | null;
  createdAt?: string | null;
};

export const getApprovedFeedbackByCode = unstable_cache(
  async (codiceLower: string) => {
    return sanityClient.fetch<FeedbackDoc[]>(RACCOMANDATA_FEEDBACK_APPROVED_BY_CODE, {
      codiceLower,
    });
  },
  ["raccomandata-feedback-approved"],
  { revalidate: FEEDBACK_REVALIDATE_SEC, tags: ["raccomandata-feedback"] }
);
