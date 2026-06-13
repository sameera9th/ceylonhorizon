import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site title', type: 'string' }),
    defineField({ name: 'seoTitle', title: 'SEO page title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'Social sharing image', type: 'image', description: 'Optional 1200 × 630 image used when sharing the website.', options: { hotspot: true } }),
    defineField({ name: 'whatsappLink', title: 'WhatsApp link', type: 'url' }),
    defineField({ name: 'emailAddress', title: 'Email address', type: 'email' }),
    defineField({ name: 'phoneNumber', title: 'Phone number', type: 'string' }),
    defineField({ name: 'footerDescription', title: 'Footer description', type: 'text', rows: 2 }),
    defineField({ name: 'socialLinks', title: 'Social links', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', title: 'Platform', type: 'string' }, { name: 'url', title: 'URL', type: 'url' },
    ] }] }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
