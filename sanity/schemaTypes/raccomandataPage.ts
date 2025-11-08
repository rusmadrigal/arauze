import { defineType, defineField } from "sanity";

export default defineType({
  name: "raccomandataPage",
  title: "Raccomandata – Single Page",
  type: "document",
  fields: [
    // Clave del documento (llave por URL)
    defineField({
      name: "code",
      title: "Codice",
      type: "string",
      description: "Solo números (3–6 dígitos). Ej: 697",
      validation: (r) =>
        r.required().regex(/^\d{3,6}$/, { name: "3–6 digits" }),
    }),

    // HERO (cabecera)
    defineField({
      name: "heroTitleSuffix",
      title: "Hero Title Suffix",
      description:
        'Texto que acompaña al código en el H1. Ej: "Guida Completa e Cosa Fare"',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      description: "Párrafo corto bajo el H1",
      type: "text",
      rows: 3,
    }),

    // INFOBOX (datos oficiales)
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
      description: "Es: In attesa di ritiro, Ritirata, In giacenza…",
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
