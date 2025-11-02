import { defineType, defineField } from "sanity";

export default defineType({
  name: "raccomandataReport",
  title: "Raccomandata Report (Crowd)",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code", type: "string", validation: r => r.required() }),
    defineField({ name: "mittenteSegnalato", title: "Mittente Segnalato", type: "string", validation: r => r.required() }),
    defineField({ name: "provincia", title: "Provincia", type: "string" }),
    defineField({ name: "dataRicezione", title: "Data Ricezione", type: "date" }),
    defineField({ name: "fotoAvviso", title: "Foto Avviso", type: "image" }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["pending","approved","rejected"] }, initialValue: "pending" }),
    defineField({ name: "fingerprint", title: "Fingerprint (dedupe)", type: "string" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
  ],
  preview: { select: { title: "code", subtitle: "mittenteSegnalato" } },
});
