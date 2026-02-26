import { defineField, defineType } from 'sanity'

export const playbook = defineType({
  name: 'playbook',
  title: 'Playbook',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Playbook Title',
      type: 'string',
      description: 'e.g., "PLG Paid Ads Playbook"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of what the playbook covers',
      validation: (Rule) => Rule.required().max(300)
    }),

    // Download
    defineField({
      name: 'downloadFile',
      title: 'Playbook File',
      type: 'file',
      description: 'The playbook file users will download (PDF preferred)',
      options: {
        accept: '.pdf,.docx,.doc'
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
      description: 'Cover image for the playbook card',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    }),

    // Categorization
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Primary industry this playbook targets',
      options: {
        list: [
          { title: 'B2B SaaS', value: 'b2b-saas' },
          { title: 'PLG (Product-Led Growth)', value: 'plg' },
          { title: 'Services', value: 'services' },
          { title: 'Enterprise', value: 'enterprise' },
          { title: 'Marketplace', value: 'marketplace' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Finance', value: 'finance' },
          { title: 'Education', value: 'education' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for filtering (e.g., "Google Ads", "LinkedIn Ads", "Facebook Ads", "Strategy")',
      options: {
        layout: 'tags'
      }
    }),

    // Additional Info
    defineField({
      name: 'pageCount',
      title: 'Page Count',
      type: 'number',
      description: 'Number of pages in the playbook',
      validation: (Rule) => Rule.min(1)
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size',
      type: 'string',
      description: 'File size (e.g., "2.5 MB", "850 KB")'
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'When the playbook was last updated',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),

    // Status
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which playbooks appear (lower numbers appear first)'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Playbook',
      type: 'boolean',
      description: 'Feature this playbook on the homepage or resources page',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this playbook on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      industry: 'industry',
      media: 'coverImage',
      isActive: 'isActive',
      featured: 'featured',
      pageCount: 'pageCount'
    },
    prepare(selection) {
      const { title, industry, isActive, featured, pageCount } = selection
      const statusFlags = []
      if (featured) statusFlags.push('Featured')
      if (!isActive) statusFlags.push('Inactive')
      const status = statusFlags.length > 0 ? ` • ${statusFlags.join(', ')}` : ''
      const pages = pageCount ? ` • ${pageCount} pages` : ''

      return {
        title: title,
        subtitle: `${industry}${pages}${status}`,
        media: selection.media
      }
    }
  }
})