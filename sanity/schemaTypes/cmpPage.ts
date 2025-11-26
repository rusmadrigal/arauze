// sanity/schemas/documents/cmpPage.ts
import { defineType, defineField } from "sanity";

export const cmpPage = defineType({
  name: "cmpPage",
  title: "Pagina CMP",
  type: "document",
  fields: [

    // Name and URL
    defineField({
      name: "name",
      title: "Nome CMP",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    }),

    defineField({
      name: "city",
      title: "Città",
      type: "string",
    }),
    defineField({
      name: "province",
      title: "Provincia",
      type: "string",
    }),
    defineField({
      name: "region",
      title: "Regione",
      type: "string",
    }),
    defineField({
      name: "macroArea",
      title: "Area geografica",
      type: "string",
      options: {
        list: [
          { title: "Nord", value: "Nord" },
          { title: "Centro", value: "Centro" },
          { title: "Sud", value: "Sud" },
        ],
      },
    }),

    // Contenuto aggiuntivo libero (rich text)

    defineField({
      name: "subtitle",
      title: "Sottotitolo",
      type: "string",
    }),

    defineField({
      name: "typeLabel",
      title: "Etichetta tipo",
      type: "string",
      initialValue: "Centro di Meccanizzazione Postale (CMP)",
    }),

    defineField({
      name: "addressTitle",
      title: "Titolo indirizzo",
      type: "string",
      initialValue: "Indirizzo",
    }),

    // 🔹 Indirizzo con editor enriquecido
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "mapImage",
      title: "Immagine mappa",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "mapAlt",
      title: "Alt mappa",
      type: "string",
    }),

    // 🔹 Significato (rich text)
    defineField({
      name: "meaningTitle",
      title: "Titolo significato",
      type: "string",
    }),
    defineField({
      name: "meaningBody",
      title: "Testo significato",
      type: "array",
      of: [{ type: "block" }],
    }),

    // 🔹 Tempi di consegna (rich text)
    defineField({
      name: "deliveryTitle",
      title: "Titolo tempi di consegna",
      type: "string",
    }),
    defineField({
      name: "deliveryBody",
      title: "Testo tempi di consegna",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Cosa succede nel CMP (lista simple)
    defineField({
      name: "whatHappensTitle",
      title: "Titolo cosa succede",
      type: "string",
    }),
    defineField({
      name: "whatHappensList",
      title: "Lista cosa succede",
      type: "array",
      of: [{ type: "string" }],
    }),

    // Problemi comuni (lista simple)
    defineField({
      name: "commonIssuesTitle",
      title: "Titolo problemi comuni",
      type: "string",
    }),
    defineField({
      name: "commonIssuesList",
      title: "Lista problemi comuni",
      type: "array",
      of: [{ type: "string" }],
    }),

    // 🔹 FAQ (risposta con rich text)
    defineField({
      name: "faqTitle",
      title: "Titolo FAQ",
      type: "string",
    }),
    defineField({
      name: "faqItems",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Domanda", type: "string" },
            {
              name: "a",
              title: "Risposta",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    }),
  ],
});
