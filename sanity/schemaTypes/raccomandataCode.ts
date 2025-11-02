import { defineType, defineField } from "sanity";

export default defineType({
  name: "raccomandataCode",
  title: "Raccomandata Code (Official)",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code", type: "string", validation: r => r.required() }),
    defineField({ name: "mittente", title: "Mittente", type: "string" }),
    defineField({ name: "tipologia", title: "Tipologia", type: "string" }),
    defineField({ name: "stato", title: "Stato", type: "string" }),
    defineField({ name: "confidence", title: "Confidence (0–1)", type: "number", initialValue: 0.6 }),
    defineField({ name: "reportsCount", title: "Reports Count", type: "number", initialValue: 0 }),
    defineField({ name: "sources", title: "Sources", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
  ],
  preview: { select: { title: "code", subtitle: "mittente" } },
});
