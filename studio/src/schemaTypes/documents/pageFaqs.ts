import {defineField, defineType} from 'sanity'

export const pageFaqs = defineType({
  name: 'pageFaqs',
  title: 'Page FAQs',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Display name (e.g., "Homepage FAQs")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageSlug',
      title: 'Page Slug',
      type: 'slug',
      description:
        'Must match site route identifier (e.g., "homepage", "pricing", "google-ads")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'defaultOpen',
              title: 'Open by Default',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'pageSlug.current',
    },
  },
})
