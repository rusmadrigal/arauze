// sanity/schemaTypes/raccomandataMarketPage.ts
import { defineType, defineField } from "sanity";

export const raccomandataMarketPage = defineType({
    name: "raccomandataMarketPage",
    title: "Pagina Raccomandata Market",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titolo pagina",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "metaTitle",
            title: "Meta title SEO",
            type: "string",
        }),
        defineField({
            name: "metaDescription",
            title: "Meta description SEO",
            type: "text",
        }),

        // Contenuto principale
        defineField({
            name: "mainContent",
            title: "Contenuto principale",
            type: "blockContent", // asegúrate de tener este tipo creado y registrado
        }),

        // Alertbox
        defineField({
            name: "alertBox",
            title: "Messaggio di avviso (alert)",
            type: "text",
        }),

        // Confronto con Atti Giudiziari (opzionale)
        defineField({
            name: "comparison",
            title: "Confronto con Atti Giudiziari",
            type: "blockContent",
        }),

        // FAQ
        defineField({
            name: "faqs",
            title: "FAQ sulla Raccomandata Market",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "raccomandataMarketFaq",
                    title: "FAQ",
                    fields: [
                        defineField({
                            name: "question",
                            title: "Domanda",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "answer",
                            title: "Risposta",
                            type: "blockContent",
                        }),
                    ],
                },
            ],
        }),
    ],
});
