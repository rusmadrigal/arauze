// app/raccomandata/cmp/page.tsx
import { sanityClient } from "sanity/lib/client";
import { CMP_LIST_QUERY } from "sanity/lib/queries/cmpList";
import CmpHomeClient from "@/components/cmp/CmpHomeClient";
import type { CmpItem } from "@/components/cmp/types";

export const revalidate = 60;

async function getCmpList(): Promise<CmpItem[]> {
    const data = await sanityClient.fetch<CmpItem[]>(CMP_LIST_QUERY);
    return Array.isArray(data) ? data : [];
}

export default async function CmpHomePage() {
    const cmpList = await getCmpList();

    return <CmpHomeClient initialList={cmpList} />;
}
