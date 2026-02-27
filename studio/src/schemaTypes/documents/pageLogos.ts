import { defineField, defineType } from 'sanity'

export const pageLogos = defineType({
  name: 'pageLogos',
  title: 'Page Logos',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page this logo set belongs to',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Case Studies', value: 'case-studies' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoSectionTitle',
      title: 'Logo Section Title',
      type: 'string',
      description: 'e.g., "We\'ve managed 1000+ ad accounts for companies like:"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logos',
      title: 'Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'page',
    },
    prepare({ title }) {
      const pageNames: Record<string, string> = {
        'homepage': 'Homepage Logos',
        'case-studies': 'Case Studies Logos',
      }
      return {
        title: pageNames[title] || title,
      }
    },
  },
})
