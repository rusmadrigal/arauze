// sanity/schemas/raccomandataPage.ts
import { defineType, defineField } from "sanity";
import { List } from "phosphor-react";

export default defineType({
  name: "raccomandataPage",
  title: "Raccomandata – Single Page",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code (Codice)",
      type: "string",
      validation: (r) => r.required().regex(/^\d{3,6}$/, { name: "3–6 digits" }),
    }),
    defineField({
      name: "heroTitleSuffix",
      title: "Hero Title Suffix",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mittente",
      title: "Mittente",
      type: "string",
    }),
    defineField({
      name: "tipologia",
      title: "Tipologia",
      type: "string",
    }),
    defineField({
      name: "stato",
      title: "Stato",
      type: "string",
    }),

    // 🆕 Nuevo campo
    defineField({
      name: "steps",
      title: "Passaggi (Steps – Cosa Fare)",
      description: "Lista di passaggi mostrati nella sezione 'Cosa Fare Passo per Passo'.",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Descrizione",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? subtitle.slice(0, 50) + "…" : "",
                media: List,
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "code", subtitle: "mittente" },
  },
});
