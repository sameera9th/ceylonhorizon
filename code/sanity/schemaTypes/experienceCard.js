import { defineField, defineType } from 'sanity'

export const experienceCard = defineType({
  name: 'experienceCard',
  title: 'Experience Card',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'icon', title: 'Icon name or label', type: 'string', description: 'Optional short label, for example 01 or Food.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
})
