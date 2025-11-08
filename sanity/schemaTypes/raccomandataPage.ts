import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'raccomandataPage',
  title: 'Raccomandata – Single Page',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: r => r.required().regex(/^\d{3,6}$/, { name: '3-6 digits' })
    }),
    defineField({
      name: 'heroTitleSuffix',
      title: 'Hero Title Suffix',
      description: 'Texto que acompaña al código en el H1. Ej: "Guida Completa e Cosa Fare"',
      type: 'string',
      validation: r => r.required()
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      description: 'Párrafo corto bajo el H1',
      type: 'text',
      rows: 3
    }),
  ],
  preview: { select: { title: 'code' } }
})
