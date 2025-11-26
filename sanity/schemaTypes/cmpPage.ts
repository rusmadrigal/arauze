// sanity/schemas/documents/cmpPage.ts
import { defineType, defineField } from "sanity";

export const cmpPage = defineType({
  name: "cmpPage",
  title: "Pagina CMP",
  type: "document",
  fields: [
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
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "text",
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

    // Significato
    defineField({
      name: "meaningTitle",
      title: "Titolo significato",
      type: "string",
    }),
    defineField({
      name: "meaningBody",
      title: "Testo significato",
      type: "array",
      of: [{ type: "text" }],
    }),

    // Tempi di consegna
    defineField({
      name: "deliveryTitle",
      title: "Titolo tempi di consegna",
      type: "string",
    }),
    defineField({
      name: "deliveryBody",
      title: "Testo tempi di consegna",
      type: "array",
      of: [{ type: "text" }],
    }),

    // Cosa succede nel CMP
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

    // Problemi comuni
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

    // Tabella stati
    defineField({
      name: "statusTableTitle",
      title: "Titolo tabella stati",
      type: "string",
    }),
    defineField({
      name: "statusRows",
      title: "Righe tabella stati",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "status", title: "Stato", type: "string" },
            { name: "meaning", title: "Significato", type: "text" },
          ],
        },
      ],
    }),

    // FAQ
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
            { name: "a", title: "Risposta", type: "text" },
          ],
        },
      ],
    }),
  ],
});
