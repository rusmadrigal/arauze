// app/components/cmp/types.ts
export type CmpItem = {
    slug: string;
    name: string;
    city: string;
    province: string;
    region: string;
    macroArea: string;
    description?: string;
    services?: string[];
};
