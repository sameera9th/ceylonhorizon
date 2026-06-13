import { defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'alt', title: 'Alternative text', type: 'string', description: 'Describe the image for guests using screen readers.', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: { select: { title: 'caption', subtitle: 'alt', media: 'image' } },
})
