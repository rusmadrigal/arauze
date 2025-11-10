// /sanity/schemas/raccomandataPage.ts
import { defineType, defineField } from "sanity";
import { List } from "phosphor-react";

export default defineType({
  name: "raccomandataPage",
  title: "Raccomandata – Single Page",
  type: "document",

  fields: [
    // ===== Clave / Hero / Info =====
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
      validation: (r) => r.required().max(80),
      description: "Sufijo del título en el hero (máx. ~80 caracteres).",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      validation: (r) => r.max(240),
      description: "Subtítulo breve (recomendado ≤ 240 caracteres).",
    }),
    defineField({ name: "mittente", title: "Mittente", type: "string" }),
    defineField({ name: "tipologia", title: "Tipologia", type: "string" }),
    defineField({ name: "stato", title: "Stato", type: "string" }),

    // ===== SEO =====
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Título SEO (ideal 50–60, máximo 65 caracteres).",
      validation: (r) => r.max(65),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Descripción SEO (ideal 140–155, máximo 160 caracteres).",
      validation: (r) => r.max(160),
    }),

    // ===== Priorità (para el ping en UI) =====
    defineField({
      name: "priority",
      title: "Priorità",
      type: "string",
      description: "Define el nivel de urgencia/visibilidad del aviso.",
      options: {
        list: [
          { title: "Alta", value: "ALTA" },   // rojo
          { title: "Media", value: "MEDIA" }, // naranja
          { title: "Bassa", value: "BASSA" }, // verde
        ],
        layout: "radio",
      },
      initialValue: "BASSA",
      validation: (r) => r.required(),
    }),

    // ===== Steps (Cosa fare) =====
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
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              validation: (r) => r.required().max(120),
            }),
            defineField({
              name: "description",
              title: "Descrizione",
              type: "text",
              rows: 3,
              validation: (r) => r.required().max(600),
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
      validation: (r) => r.min(1).max(8),
    }),

    // ===== Details (sezione testo) =====
    defineField({
      name: "details",
      title: "Dettagli (Sezione Testo)",
      description: "Blocchi di testo per 'Motivo', 'Tempi', ecc.",
      type: "array",
      of: [
        {
          type: "object",
          name: "detailBlock",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              validation: (r) => r.required().max(120),
            }),
            defineField({
              name: "body",
              title: "Corpo del testo",
              type: "text",
              rows: 5,
              validation: (r) => r.required().max(2000),
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
      validation: (r) => r.min(1).max(10),
    }),

    // ===== Alert Box (Avviso) =====
    defineField({
      name: "alertBox",
      title: "Alert Box (Avviso)",
      type: "object",
      options: { collapsible: true, collapsed: true },
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
          validation: (r) => r.max(140),
        }),
        defineField({
          name: "body",
          title: "Testo",
          type: "text",
          rows: 4,
          initialValue:
            "Se non ritiri la raccomandata entro 30 giorni, potrebbe essere considerata come notificata per “compiuta giacenza”. In tal caso, eventuali comunicazioni fiscali o multe saranno comunque valide anche senza la tua firma di ritiro.",
          validation: (r) => r.max(800),
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

    // ===== Assistenza e Contatti =====
    defineField({
      name: "assistenza",
      title: "Assistenza e Contatti Utili",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          title: "Titolo Sezione",
          type: "string",
          initialValue: "Assistenza e Contatti Utili",
          validation: (r) => r.max(120),
        }),
        defineField({
          name: "cards",
          title: "Schede di Contatto",
          type: "array",
          of: [
            defineField({
              name: "card",
              title: "Scheda",
              type: "object",
              options: { collapsible: true, collapsed: true },
              fields: [
                defineField({
                  name: "icon",
                  title: "Icona (Lucide)",
                  type: "string",
                  description: "Esempi: MapPin, Phone, Mail, HelpCircle…",
                  initialValue: "MapPin",
                }),
                defineField({
                  name: "title",
                  title: "Titolo",
                  type: "string",
                  validation: (r) => r.required().max(120),
                }),
                defineField({
                  name: "description",
                  title: "Descrizione",
                  type: "text",
                  rows: 3,
                  validation: (r) => r.required().max(600),
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
            }),
          ],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),

    defineField({
      name: "authorBox",
      title: "Author Box",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "name",
          title: "Nombre del autor",
          type: "string",
          validation: (r) => r.required().max(80),
          initialValue: "Lorenzo Sposti",
        }),
        defineField({
          name: "avatarUrl",
          title: "Avatar URL (Next/Image)",
          type: "url",
          description: "URL absoluta o ruta pública (p.ej. /images/author.jpg).",
          validation: (r) => r.uri({ allowRelative: true }),
          initialValue: "/images/author.jpg",
        }),
        defineField({
          name: "updatedAt",
          title: "Fecha de actualización",
          type: "datetime",
          description: "Se mostrará como 'Aggiornato il …' en it-IT.",
          validation: (r) => r.required(),
          initialValue: () => new Date().toISOString(),
        }),
      ],
    }),


    // ===== FAQ =====
    defineField({
      name: "faq",
      title: "Domande Frequenti (FAQ)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          title: "Titolo Sezione",
          type: "string",
          initialValue: "Domande Frequenti (FAQ)",
          validation: (r) => r.max(120),
        }),
        defineField({
          name: "items",
          title: "Elenco Domande e Risposte",
          type: "array",
          of: [
            defineField({
              name: "faqItem",
              title: "Domanda",
              type: "object",
              options: { collapsible: true, collapsed: true },
              fields: [
                defineField({
                  name: "q",
                  title: "Domanda",
                  type: "string",
                  validation: (r) => r.required().max(160),
                }),
                defineField({
                  name: "a",
                  title: "Risposta",
                  type: "text",
                  rows: 3,
                  validation: (r) => r.required().max(800),
                }),
              ],
              preview: {
                select: { title: "q", subtitle: "a" },
                prepare({ title, subtitle }) {
                  return {
                    title,
                    subtitle: subtitle ? subtitle.slice(0, 60) + "…" : "",
                    media: List,
                  };
                },
              },
            }),
          ],
          validation: (r) => r.min(1).max(10),
        }),
      ],
    }),
  ],

  preview: {
    select: { title: "code", mittente: "mittente", priority: "priority" },
    prepare({ title, mittente, priority }) {
      const tag =
        priority === "ALTA" ? "🔴 Alta" :
          priority === "MEDIA" ? "🟠 Media" :
            priority === "BASSA" ? "🟢 Bassa" :
              "—";
      return {
        title,
        subtitle: mittente ? `${mittente} · ${tag}` : tag,
      };
    },
  },
});
