import { defineType, defineField } from "sanity";

export default defineType({
  name: "raccomandataCode",
  title: "Raccomandata – Code",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Codice",
      type: "string",
      description: "Solo numeri (3–6 cifre), es. 697",
      validation: (r) =>
        r.required().regex(/^[A-Za-z0-9]{3,6}$/, { name: "3–6 lettere o numeri" }),
    }),

    defineField({
      name: "mittente",
      title: "Mittente",
      type: "string",
      initialValue: "Agenzia delle Entrate (probabile)",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "tipologia",
      title: "Tipologia",
      type: "string",
      initialValue: "Raccomandata Market",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "stato",
      title: "Stato",
      type: "string",
      initialValue: "In attesa di ritiro",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "confidence",
      title: "Confidence (0–10)",
      type: "number",
      description:
        "Livello di attendibilità stimato per le informazioni di questo codice (0 = bassa, 10 = massima).",
      validation: (r) => r.min(0).max(10),
    }),

    defineField({
      name: "reportsCount",
      title: "Numero di Segnalazioni",
      type: "number",
      description:
        "Conteggio totale delle segnalazioni ricevute per questo codice.",
      initialValue: 0,
      validation: (r) => r.min(0),
    }),

    defineField({
      name: "sources",
      title: "Fonti / Sources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titolo", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "title", subtitle: "url" },
          },
        },
      ],
      description: "Link alle fonti ufficiali o ai riferimenti pubblici.",
    }),

    defineField({
      name: "updatedAt",
      title: "Ultimo Aggiornamento Manuale",
      type: "datetime",
      description:
        "Data in cui questo record è stato aggiornato manualmente.",
    }),
  ],

  preview: {
    select: {
      title: "code",
      subtitle: "mittente",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || "—",
      };
    },
  },
});
