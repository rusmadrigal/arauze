
import { defineType, defineField } from "sanity";
import { List } from "phosphor-react";

// 🔧 Bloques de Portable Text con estilos, listas, links e imágenes
const richTextBlocks = [
  {
    type: "block",
    styles: [
      { title: "Normale", value: "normal" },
      { title: "Titolo H2", value: "h2" },
      { title: "Titolo H3", value: "h3" },
      { title: "Citazione", value: "blockquote" },
    ],
    lists: [
      { title: "Lista puntata", value: "bullet" },
      { title: "Lista numerata", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Grassetto", value: "strong" },
        { title: "Corsivo", value: "em" },
        { title: "Sottolineato", value: "underline" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [
            {
              name: "href",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    },
  },
  {
    type: "image",
    options: { hotspot: true },
    fields: [
      {
        name: "alt",
        title: "Testo alternativo (alt)",
        type: "string",
        validation: (r: any) =>
          r
            .required()
            .error(
              "L'immagine deve avere un testo alternativo per l'accessibilità."
            ),
      },
      {
        name: "caption",
        title: "Didascalia",
        type: "string",
      },
    ],
  },
];

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
      validation: (r: any) =>
        r.required().regex(/^\d{3,6}$/, { name: "3–6 digits" }),
    }),
    defineField({
      name: "heroTitleSuffix",
      title: "Hero Title Suffix",
      type: "string",
      validation: (r: any) => r.required().max(80),
      description: "Sufijo del título en el hero (máx. ~80 caracteres).",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      validation: (r: any) => r.max(240),
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
      validation: (r: any) => r.max(65),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Descripción SEO (ideal 140–155, máximo 160 caracteres).",
      validation: (r: any) => r.max(160),
    }),

    // ===== Priorità =====
    defineField({
      name: "priority",
      title: "Priorità",
      type: "string",
      description: "Define el nivel de urgencia/visibilidad del aviso.",
      options: {
        list: [
          { title: "Alta", value: "ALTA" },
          { title: "Media", value: "MEDIA" },
          { title: "Bassa", value: "BASSA" },
        ],
        layout: "radio",
      },
      initialValue: "BASSA",
      validation: (r: any) => r.required(),
    }),

    // ===== Steps (Cosa fare) =====
    defineField({
      name: "steps",
      title: "Passaggi (Steps – Cosa Fare)",
      description: "Lista di passaggi mostrati nella sezione 'Cosa Fare'.",
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
              validation: (r: any) => r.required().max(120),
            }),
            defineField({
              name: "description",
              title: "Descrizione",
              type: "array",
              of: richTextBlocks,
              validation: (r: any) => r.required(),
            }),
          ],
          preview: {
            select: { title: "title", body: "description" },
            prepare({ title, body }) {
              let subtitle = "";
              if (Array.isArray(body) && body.length > 0) {
                const first = (body as any)[0]?.children?.[0];
                subtitle =
                  typeof first?.text === "string"
                    ? first.text.slice(0, 50) + "…"
                    : "";
              }
              return { title, subtitle, media: List };
            },
          },
        },
      ],
      validation: (r: any) => r.min(1).max(8),
    }),

    // ===== Details =====
    defineField({
      name: "details",
      title: "Dettagli (Sezione Testo)",
      description: "Blocchi testuali (Motivo, Tempi, ecc.)",
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
              validation: (r: any) => r.max(120),
            }),
            defineField({
              name: "body",
              title: "Corpo del testo",
              type: "array",
              of: richTextBlocks,
              // opcional → sin required
            }),
          ],
          preview: {
            select: { title: "title", body: "body" },
            prepare({ title, body }) {
              let subtitle = "";
              if (Array.isArray(body) && body.length > 0) {
                const first = (body as any)[0]?.children?.[0];
                subtitle =
                  typeof first?.text === "string"
                    ? first.text.slice(0, 60) + "…"
                    : "";
              }
              return {
                title: title || "(Nessun titolo)",
                subtitle,
                media: List,
              };
            },
          },
        },
      ],
      validation: (r: any) => r.min(1).max(100),
    }),

    // ===== Alert Box =====
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
          validation: (r: any) => r.max(140),
        }),
        defineField({
          name: "body",
          title: "Testo",
          type: "array",
          of: richTextBlocks,
        }),
        defineField({
          name: "icon",
          title: "Icona (Lucide)",
          type: "string",
          initialValue: "AlertTriangle",
        }),
      ],
    }),

    // ===== Assistenza =====
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
          validation: (r: any) => r.max(120),
        }),
        defineField({
          name: "cards",
          title: "Schede",
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
                  initialValue: "MapPin",
                }),
                defineField({
                  name: "title",
                  title: "Titolo",
                  type: "string",
                  validation: (r: any) => r.required().max(120),
                }),
                defineField({
                  name: "description",
                  title: "Descrizione",
                  type: "array",
                  of: richTextBlocks,
                  validation: (r: any) => r.required(),
                }),
              ],
              preview: {
                select: { title: "title", body: "description" },
                prepare({ title, body }) {
                  let subtitle = "";
                  if (Array.isArray(body) && body.length > 0) {
                    const first = (body as any)[0]?.children?.[0];
                    subtitle =
                      typeof first?.text === "string"
                        ? first.text.slice(0, 50) + "…"
                        : "";
                  }
                  return {
                    title,
                    subtitle,
                    media: List,
                  };
                },
              },
            }),
          ],
          validation: (r: any) => r.min(1).max(6),
        }),
      ],
    }),

    // ===== Author Box =====
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
          validation: (r: any) => r.required().max(80),
          initialValue: "Lorenzo Sposti",
        }),
        defineField({
          name: "avatarUrl",
          title: "Avatar URL",
          type: "url",
          initialValue: "/images/author.jpg",
          validation: (r: any) => r.uri({ allowRelative: true }),
        }),
        defineField({
          name: "updatedAt",
          title: "Fecha de actualización",
          type: "datetime",
          validation: (r: any) => r.required(),
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
          validation: (r: any) => r.max(120),
        }),
        defineField({
          name: "items",
          title: "Domande e Risposte",
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
                  validation: (r: any) => r.required().max(160),
                }),
                defineField({
                  name: "a",
                  title: "Risposta",
                  type: "array",
                  of: richTextBlocks,
                  validation: (r: any) => r.required(),
                }),
              ],
              preview: {
                select: { title: "q", body: "a" },
                prepare({ title, body }) {
                  let subtitle = "";
                  if (Array.isArray(body) && body.length > 0) {
                    const first = (body as any)[0]?.children?.[0];
                    subtitle =
                      typeof first?.text === "string"
                        ? first.text.slice(0, 60) + "…"
                        : "";
                  }
                  return {
                    title,
                    subtitle,
                    media: List,
                  };
                },
              },
            }),
          ],
          validation: (r: any) => r.min(1).max(10),
        }),
      ],
    }),
  ],

  preview: {
    select: { title: "code", mittente: "mittente", priority: "priority" },
    prepare({ title, mittente, priority }) {
      const tag =
        priority === "ALTA"
          ? "🔴 Alta"
          : priority === "MEDIA"
          ? "🟠 Media"
          : priority === "BASSA"
          ? "🟢 Bassa"
          : "—";

      return {
        title,
        subtitle: mittente ? `${mittente} · ${tag}` : tag,
      };
    },
  },
});
