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
        r.required().regex(/^\d{3,6}$/, { name: "3–6 digits" }),
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

    // 🆕 NUEVO: conteo total de reportes (usado por /api/check-codice)
    defineField({
      name: "reportsCount",
      title: "Numero di Segnalazioni",
      type: "number",
      description: "Conteggio totale delle segnalazioni ricevute per questo codice.",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: { title: "code", subtitle: "mittente" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || "—" };
    },
  },
});
