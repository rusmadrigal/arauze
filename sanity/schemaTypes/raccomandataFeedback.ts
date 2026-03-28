// /sanity/schemas/raccomandataFeedback.ts
import { defineType, defineField } from "sanity";
import { ChatCircleDots } from "phosphor-react";

export default defineType({
    name: "raccomandataFeedback",
    title: "Feedback Raccomandata",
    type: "document",
    icon: ChatCircleDots,

    fields: [
        defineField({
            name: "nome",
            title: "Nome",
            type: "string",
            validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
            name: "citta",
            title: "Città",
            type: "string",
            validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
            name: "codice",
            title: "Codice raccomandata",
            type: "string",
            validation: (Rule) =>
                Rule.required()
                    .min(3)
                    .max(30)
                    .regex(/^[A-Za-z0-9\s-]+$/, {
                        name: "codice",
                        invert: false,
                    }),
        }),
        defineField({
            name: "categoria",
            title: "Categoria",
            type: "string",
            options: {
                list: [
                    { title: "Avviso di giacenza", value: "avviso_giacenza" },
                    { title: "Agenzia delle Entrate / Fisco", value: "agenzia_entrate" },
                    { title: "INPS / Ente previdenziale", value: "inps" },
                    { title: "Comune / Municipio", value: "comune" },
                    {
                        title: "Prefettura / Questura / Forze dell’ordine",
                        value: "forze_ordine",
                    },
                    { title: "Tribunale / Ufficio giudiziario", value: "tribunale" },
                    { title: "Banca / Finanziaria", value: "banca" },
                    { title: "Assicurazione", value: "assicurazione" },
                    {
                        title: "Recupero crediti / Sollecito di pagamento",
                        value: "recupero_crediti",
                    },
                    { title: "Multa / Verbale di contestazione", value: "multa" },
                    {
                        title: "Fornitore di servizi (luce, gas, acqua, internet)",
                        value: "fornitore_servizi",
                    },
                    {
                        title: "Condominio / Amministratore di condominio",
                        value: "condominio",
                    },
                    { title: "Altro", value: "altro" },
                ],
                layout: "dropdown",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "commento",
            title: "Commento",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required().min(10).max(1000),
        }),
        defineField({
            name: "approved",
            title: "Approvato",
            type: "boolean",
            description:
                "Mostra il feedback sul sito solo quando è impostato su 'true'.",
            initialValue: false,
        }),
        defineField({
            name: "createdAt",
            title: "Data di invio",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],

    preview: {
        select: {
            title: "codice",
            subtitle: "categoria",
            nome: "nome",
        },
        prepare(selection) {
            const { title, subtitle, nome } = selection;
            return {
                title: title || "Codice sconosciuto",
                subtitle: nome ? `${nome} – ${subtitle || ""}` : subtitle,
            };
        },
    },
});
