import { defineField, defineType } from 'sanity'

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      description: 'Title for internal reference (Spotify embed displays its own title)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      description: 'Link to the episode on Spotify (e.g., https://open.spotify.com/episode/ABC123)',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }).custom((url) => {
        if (!url) return true
        if (url.includes('spotify.com') || url.includes('spoti.fi')) {
          return true
        }
        return 'Please enter a valid Spotify URL'
      })
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this episode on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, isActive } = selection
      return {
        title: title,
        subtitle: !isActive ? '(Inactive)' : ''
      }
    }
  }
})