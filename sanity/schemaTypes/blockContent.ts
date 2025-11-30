// sanity/schemaTypes/blockContent.ts
import { defineType } from "sanity";

export const blockContent = defineType({
    name: "blockContent",
    title: "Rich text",
    type: "array",
    of: [
        {
            type: "block",
        },
        {
            type: "image",
            options: { hotspot: true },
        },
    ],
});
