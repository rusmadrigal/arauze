import { defineField, defineType } from "sanity";

export const codiceTributoPage = defineType({
  name: "codiceTributoPage",
  title: "Pagina Codice Tributo",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Slug della pagina, ad esempio 3918, imu, tari o codice-tributo.",
    }),
    defineField({
      name: "kind",
      title: "Tipo pagina",
      type: "string",
      options: {
        list: [
          { title: "Codice", value: "code" },
          { title: "Guida", value: "guide" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Codice",
      type: "string",
      description: "Compila solo per le pagine di singolo codice tributo.",
    }),
    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "string",
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
      name: "heroSubtitle",
      title: "Sottotitolo hero",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Sezioni contenuto",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "title",
              title: "Titolo sezione",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Paragrafi",
              type: "array",
              of: [{ type: "text" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Punti rapidi",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "q",
              title: "Domanda",
              type: "string",
            }),
            defineField({
              name: "a",
              title: "Risposta",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Ultimo aggiornamento",
      type: "datetime",
    }),
  ],
});

