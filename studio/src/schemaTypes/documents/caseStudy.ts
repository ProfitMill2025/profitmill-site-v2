import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'seo_title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title tag for search engines. If empty, will use the case study title.',
      validation: (Rule: any) => Rule.max(60).warning('Longer titles may be truncated by search engines')
    }),
    defineField({
      name: 'seo_description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search engines. If empty, will use the excerpt.',
      validation: (Rule: any) => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'string',
      description: 'Tools used in the project'
    }),
    defineField({
      name: 'whoIWorkedWith',
      title: 'Who I Worked With',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
  
    defineField({
      name: 'projectHighlights',
      title: 'Project Highlights',
      type: 'object',
      fields: [
        defineField({
          name: 'metric1',
          title: 'Metric 1',
          type: 'object',
          fields: [
            { name: 'title', title: 'Metric Title', type: 'string' },
            { name: 'description', title: 'Metric Description', type: 'string' }
          ]
        }),
        defineField({
          name: 'metric2',
          title: 'Metric 2',
          type: 'object',
          fields: [
            { name: 'title', title: 'Metric Title', type: 'string' },
            { name: 'description', title: 'Metric Description', type: 'string' }
          ]
        }),
        defineField({
          name: 'metric3',
          title: 'Metric 3',
          type: 'object',
          fields: [
            { name: 'title', title: 'Metric Title', type: 'string' },
            { name: 'description', title: 'Metric Description', type: 'string' }
          ]
        }),
        defineField({
          name: 'metric4',
          title: 'Metric 4 (Optional)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Metric Title', type: 'string' },
            { name: 'description', title: 'Metric Description', type: 'string' }
          ]
        }),
        defineField({
          name: 'metric5',
          title: 'Metric 5 (Optional)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Metric Title', type: 'string' },
            { name: 'description', title: 'Metric Description', type: 'string' }
          ]
        })
      ]
    }),
    defineField({
      name: 'beforeSection',
      title: 'Before Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Before Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'text',
          title: 'Before Text',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'}
              ],
              lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Number', value: 'number'}
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'}
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL'
                      }
                    ]
                  }
                ]
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'duringSection',
      title: 'During Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'During Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'text',
          title: 'During Text',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'}
              ],
              lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Number', value: 'number'}
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'}
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL'
                      }
                    ]
                  }
                ]
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'afterSection',
      title: 'After Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'After Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'text',
          title: 'After Text',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'}
              ],
              lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Number', value: 'number'}
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'}
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL'
                      }
                    ]
                  }
                ]
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'CTA Text',
          type: 'text'
        }),
        defineField({
          name: 'buttonText',
          title: 'CTA Button Text',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Additional Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Indicates if the case study is active'
    }),
  ]
})