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
    defineField({ name: "mittente", title: "Mittente", type: "string" }),
    defineField({ name: "tipologia", title: "Tipologia", type: "string" }),
    defineField({ name: "stato", title: "Stato", type: "string" }),

    // Steps (Cosa fare)
    defineField({
      name: "steps",
      title: "Passaggi (Steps – Cosa Fare)",
      description:
        "Lista di passaggi mostrati nella sezione 'Cosa Fare Passo per Passo'.",
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

    // Details (sezione testo)
    defineField({
      name: "details",
      title: "Dettagli (Sezione Testo)",
      description: "Blocchi di testo per 'Motivo', 'Tempi', ecc.",
      type: "array",
      of: [
        {
          type: "object",
          name: "detailBlock",
          fields: [
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Corpo del testo",
              type: "text",
              rows: 5,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? `${subtitle.slice(0, 60)}…` : "",
                media: List,
              };
            },
          },
        },
      ],
    }),

    // Alert Box (Avviso)
    defineField({
      name: "alertBox",
      title: "Alert Box (Avviso)",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Mostrare il blocco?",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "title",
          title: "Titolo",
          type: "string",
          initialValue: "Attenzione ai Termini di Ritiro",
        }),
        defineField({
          name: "body",
          title: "Testo",
          type: "text",
          rows: 4,
          initialValue:
            "Se non ritiri la raccomandata entro 30 giorni, potrebbe essere considerata come notificata per “compiuta giacenza”. In tal caso, eventuali comunicazioni fiscali o multe saranno comunque valide anche senza la tua firma di ritiro.",
        }),
        defineField({
          name: "icon",
          title: "Icona (Lucide)",
          type: "string",
          description: "Esempi: AlertTriangle, Info, Bell…",
          initialValue: "AlertTriangle",
        }),
      ],
    }),
  ],

  preview: {
    select: { title: "code", subtitle: "mittente" },
  },
});
