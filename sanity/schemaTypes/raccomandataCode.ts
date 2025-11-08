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
      description: "Solo números (3–6 dígitos), ej. 697",
      validation: (r) =>
        r.required().regex(/^\d{3,6}$/, { name: "3–6 digits" }),
    }),
    defineField({
      name: "mittente",
      title: "Mittente",
      type: "string",
      // opcional: valores por defecto para nuevos docs
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
  ],
  preview: {
    select: { title: "code", subtitle: "mittente" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || "—" };
    },
  },
});
