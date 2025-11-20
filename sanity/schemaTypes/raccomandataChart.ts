// /sanity/schemas/raccomandataChart.ts
import { defineType, defineField } from "sanity";
import { ChartPie } from "phosphor-react";


export default defineType({
    name: "raccomandataChart",
    title: "Grafico Raccomandata",
    type: "document",
    icon: ChartPie,

    fields: [
        defineField({
            name: "codice",
            title: "Codice raccomandata",
            type: "string",
            description: "Es. 697, 689, 665...",
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
            name: "titolo",
            title: "Titolo (opzionale)",
            type: "string",
            description: "Es. Distribuzione degli esiti per il codice 697",
        }),

        defineField({
            name: "slices",
            title: "Segmenti del grafico",
            type: "array",
            of: [
                defineField({
                    name: "slice",
                    title: "Segmento",
                    type: "object",
                    fields: [
                        defineField({
                            name: "categoria",
                            title: "Categoria",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Avviso di giacenza", value: "avviso_giacenza" },
                                    {
                                        title: "Agenzia delle Entrate / Fisco",
                                        value: "agenzia_entrate",
                                    },
                                    {
                                        title: "INPS / Ente previdenziale",
                                        value: "inps",
                                    },
                                    { title: "Comune / Municipio", value: "comune" },
                                    {
                                        title: "Prefettura / Questura / Forze dell’ordine",
                                        value: "forze_ordine",
                                    },
                                    {
                                        title: "Tribunale / Ufficio giudiziario",
                                        value: "tribunale",
                                    },
                                    { title: "Banca / Finanziaria", value: "banca" },
                                    { title: "Assicurazione", value: "assicurazione" },
                                    {
                                        title: "Recupero crediti / Sollecito di pagamento",
                                        value: "recupero_crediti",
                                    },
                                    { title: "Multa / Verbale di contestazione", value: "multa" },
                                    {
                                        title:
                                            "Fornitore di servizi (luce, gas, acqua, internet)",
                                        value: "fornitore_servizi",
                                    },
                                    {
                                        title:
                                            "Condominio / Amministratore di condominio",
                                        value: "condominio",
                                    },
                                    { title: "Altro", value: "altro" },
                                ],
                                layout: "dropdown",
                            },
                            validation: (Rule) => Rule.required(),
                        }),

                        defineField({
                            name: "valore",
                            title: "Valore",
                            type: "number",
                            description:
                                "Numero di feedback o percentuale (es. 45 = 45%)",
                            validation: (Rule) => Rule.required().min(0),
                        }),

                        defineField({
                            name: "color",
                            title: "Colore (opzionale)",
                            type: "string",
                            description:
                                "Colore HEX per questo segmento (es. #2563eb)",
                        }),
                    ],
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],

    preview: {
        select: {
            title: "codice",
            subtitle: "titolo",
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            return {
                title: title || "Codice sconosciuto",
                subtitle: subtitle || "Grafico raccomandata",
            };
        },
    },
});
