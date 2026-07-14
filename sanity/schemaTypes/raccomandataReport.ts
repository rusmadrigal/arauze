import { defineType, defineField } from "sanity";

export default defineType({
  name: "raccomandataReport",
  title: "Raccomandata Report (Crowd)",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mittenteSegnalato",
      title: "Mittente Segnalato",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "provincia",
      title: "Provincia",
      type: "string",
    }),
    defineField({
      name: "dataRicezione",
      title: "Data Ricezione",
      type: "date",
    }),
    defineField({
      name: "fotoAvviso",
      title: "Foto Avviso",
      type: "image",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "fingerprint",
      title: "Fingerprint (dedupe)",
      type: "string",
      description: "Hash unico per evitare duplicati giornalieri",
      readOnly: true,
    }),

    // 🆕 Campo agregado para el conteo de segnalazioni
    defineField({
      name: "count",
      title: "Conteggio Segnalazioni",
      type: "number",
      description: "Numero totale di segnalazioni accumulate per questo codice.",
      validation: (Rule) => Rule.min(1),
      initialValue: 1,
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "code",
      subtitle: "mittenteSegnalato",
      media: "fotoAvviso",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: `Codice ${title}`,
        subtitle: subtitle ? `Mittente: ${subtitle}` : "Segnalazione utente",
        media,
      };
    },
  },
});
