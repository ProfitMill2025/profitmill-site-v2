import { defineField, defineType } from 'sanity'

export const whoWeWorkWith = defineType({
  name: 'whoWeWorkWith',
  title: 'Who We Work With',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "B2B SaaS"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort segments in listing page',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this segment on the website',
      initialValue: true,
    }),

    // SEO
    defineField({
      name: 'seo_title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title tag for search engines',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated')
    }),
    defineField({
      name: 'seo_description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search engines',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated')
    }),

    // Hero Section with Logos
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Main Headline',
          type: 'text',
          rows: 2,
          description: 'e.g., "Paid ads that drive high-value SaaS leads"',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'buttonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get A Free Paid Ad Audit',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'showClutchBadge',
          title: 'Show Clutch Badge',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'logoSectionTitle',
          title: 'Logo Section Title',
          type: 'string',
          description: 'e.g., "B2B SAAS COMPANIES WE\'VE WORKED WITH"',
          validation: (Rule) => Rule.required()
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
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'logo',
                  title: 'Logo Image',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required()
                }),
              ]
            }
          ]
        }),
      ]
    }),

    // Benefits Section (3 columns)
    defineField({
      name: 'benefits',
      title: 'Benefits Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'e.g., "Prove what works before scaling spend"',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'items',
          title: 'Benefit Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Benefit Title',
                  type: 'string',
                  description: 'e.g., "Reach higher quality leads"',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Benefit Description',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required()
                }),
              ]
            }
          ],
          validation: (Rule) => Rule.min(3).max(3).warning('Should have exactly 3 benefits')
        }),
      ]
    }),

    // Comparison Section (Problems vs Solutions)
    defineField({
      name: 'comparison',
      title: 'Comparison Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainTitle',
          title: 'Main Section Title',
          type: 'string',
          description: 'e.g., "Stop wasting spend and start closing deals"',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'problemsTitle',
          title: 'Problems Column Title',
          type: 'string',
          description: 'e.g., "Why paid ads aren\'t proving their worth for B2B SaaS"',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'problems',
          title: 'Problems List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Problem Text',
                  type: 'text',
                  rows: 2,
                  validation: (Rule) => Rule.required()
                }),
              ]
            }
          ]
        }),
        defineField({
          name: 'solutionsTitle',
          title: 'Solutions Column Title',
          type: 'string',
          description: 'e.g., "Here\'s why B2B SaaS teams trust Profit Mill with paid acquisition"',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'solutions',
          title: 'Solutions List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Solution Title',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Solution Description',
                  type: 'text',
                  rows: 2,
                  validation: (Rule) => Rule.required()
                }),
              ]
            }
          ]
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book a call',
          validation: (Rule) => Rule.required()
        }),
      ]
    }),

    // Case Studies
    defineField({
      name: 'caseStudiesTitle',
      title: 'Case Studies Section Title',
      type: 'string',
      description: 'e.g., "B2B SaaS brands seeing real results with paid ads"',
    }),

    // FAQs
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
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'defaultOpen',
              title: 'Open by Default',
              type: 'boolean',
              initialValue: false,
            }),
          ]
        }
      ]
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          description: 'e.g., "Ready for paid ads that actually work for SaaS?"',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'CTA Subtitle',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'buttonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book Your Free Audit',
          validation: (Rule) => Rule.required()
        }),
      ]
    }),
  ]
})