import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allPodcastsQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/v2/page-header'
import PodcastList from '@/components/v2/podcast-list'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'Hear How B2B Leaders Are Generating Leads | Profit Mill',
  description: 'Listen in as top B2B marketers, founders, and growth leaders share the exact strategies they use to acquire customers and drive profit.',
  alternates: {
    canonical: 'https://www.profitmill.io/resources/podcasts',
  },
}

async function getPodcasts() {
  return await client.fetch(allPodcastsQuery, {}, {
    next: {
      tags: ['podcasts'],
      revalidate: 60
    }
  })
}

export default async function PodcastsPage() {
  const podcasts = await getPodcasts()

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="The podcast for profitable B2B growth"
        description="Tired of guessing what really drives growth? We talk to B2B founders and marketing leaders about the tactics they're using to acquire customers today—across paid, SEO, outbound, and PLG."
        buttonText="Subscribe on Spotify"
        buttonLink="https://open.spotify.com/show/your-podcast-id"
      />

      <PodcastList
        sectionTitle="Latest episodes"
        podcasts={podcasts}
        showPagination={true}
        itemsPerPage={6}
      />

      <CtaSection
        title="Need help scaling your paid ads profitably?"
        subtitle="We work with B2B teams to turn underperforming ad accounts into profitable growth channels. Book a free ad audit, and we'll walk you through what's working, what's not, and what to fix first."
        buttonText="Book your free audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
      />
    </div>
  )
}
