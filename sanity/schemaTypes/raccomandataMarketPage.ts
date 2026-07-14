// sanity/schemaTypes/raccomandataMarketPage.ts
import { defineType, defineField } from "sanity";

export const raccomandataMarketPage = defineType({
  name: "raccomandataMarketPage",
  title: "Pagina Raccomandata Market",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title SEO",
      type: "string",
      validation: (Rule) => Rule.max(65),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description SEO",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "mainContent",
      title: "Contenuto principale",
      type: "blockContent",
    }),
    defineField({
      name: "alertBox",
      title: "Messaggio di avviso (alert)",
      type: "text",
    }),
    defineField({
      name: "comparison",
      title: "Confronto testuale",
      type: "blockContent",
      description:
        "Blocco editoriale opzionale per spiegare differenze, contesto e criteri di lettura.",
    }),
    defineField({
      name: "comparisonRows",
      title: "Tabella confronto: Raccomandata Market vs Atti Giudiziari",
      type: "array",
      of: [
        {
          type: "object",
          name: "comparisonRow",
          title: "Riga tabella",
          fields: [
            defineField({
              name: "feature",
              title: "Caratteristica",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "raccomandataMarket",
              title: "Raccomandata Market",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "attiGiudiziari",
              title: "Atto Giudiziario",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQ sulla Raccomandata Market",
      type: "array",
      of: [
        {
          type: "object",
          name: "raccomandataMarketFaq",
          title: "FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Domanda",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Risposta",
              type: "blockContent",
            }),
          ],
        },
      ],
    }),
  ],
});
