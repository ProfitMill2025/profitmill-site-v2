import { defineField, defineType } from 'sanity'

export const tool = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Tool Title',
      type: 'string',
      description: 'e.g., "Are you ready for paid ads?"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Tool Type',
      type: 'string',
      description: 'e.g., "PAID ADS READINESS CHECKLIST", "CHANNEL FIT FLOWCHART"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Main description and bullet points of what the tool does',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'}
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ]
          }
        }
      ],
      validation: (Rule) => Rule.required()
    }),

    // Download
    defineField({
      name: 'downloadFile',
      title: 'Download File',
      type: 'file',
      description: 'The file users will download (PDF, Excel, etc.)',
      options: {
        accept: '.pdf,.xlsx,.xls,.docx,.doc,.csv,.zip'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'downloadButtonText',
      title: 'Download Button Text',
      type: 'string',
      initialValue: 'Download',
      description: 'Text for the download button',
      validation: (Rule) => Rule.required()
    }),

    // Visual
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Cover image for the tool card',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    }),

    // Categorization
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for filtering (e.g., "Google Ads", "LinkedIn Ads", "Strategy", "Calculator")',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Main category for the tool',
      options: {
        list: [
          { title: 'Checklist', value: 'checklist' },
          { title: 'Calculator', value: 'calculator' },
          { title: 'Template', value: 'template' },
          { title: 'Guide', value: 'guide' },
          { title: 'Flowchart', value: 'flowchart' },
          { title: 'Worksheet', value: 'worksheet' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),

    // Additional Info
    defineField({
      name: 'fileSize',
      title: 'File Size',
      type: 'string',
      description: 'File size (e.g., "2.5 MB", "450 KB")'
    }),
    defineField({
      name: 'fileFormat',
      title: 'File Format',
      type: 'string',
      description: 'File format (e.g., "PDF", "Excel", "Google Sheet")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'When the tool was last updated',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),

    // Status
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which tools appear (lower numbers appear first)'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Tool',
      type: 'boolean',
      description: 'Feature this tool on the homepage or resources page',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this tool on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      category: 'category',
      media: 'coverImage',
      isActive: 'isActive',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, type, category, isActive, featured } = selection
      const statusFlags = []
      if (featured) statusFlags.push('Featured')
      if (!isActive) statusFlags.push('Inactive')
      const status = statusFlags.length > 0 ? ` • ${statusFlags.join(', ')}` : ''

      return {
        title: title,
        subtitle: `${type} • ${category}${status}`,
        media: selection.media
      }
    }
  }
})