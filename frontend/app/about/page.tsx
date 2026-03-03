import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import HowWeStarted from '@/components/v2/about/how-we-started'
import WhatWeStandFor from '@/components/v2/about/what-we-stand-for'
import OurPeople from '@/components/v2/about/our-people'
import TestimonialsSection from '@/components/v2/landing-page/testimonials'
import OurDogs from '@/components/v2/about/our-dogs'
import CtaSection from '@/components/v2/cta-section'
import { sanityFetch } from '@/sanity/lib/live'
import { allTeamMembersQuery, allTeamPetsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/utils'

export const metadata: Metadata = {
  title: 'Strategic Paid Media Growth for Startups | Profit Mill',
  description: 'Learn how Profit Mill helps startups and scaleups accelerate growth through smarter paid media. Led by ex-Google experts, built for founders and marketers ready to scale.',
  alternates: {
    canonical: 'https://www.profitmill.io/about',
  },
}

export default async function AboutPage() {
  const [{ data: rawMembers }, { data: rawPets }] = await Promise.all([
    sanityFetch({ query: allTeamMembersQuery }),
    sanityFetch({ query: allTeamPetsQuery }),
  ])

  const members = (rawMembers ?? []).map((m: Record<string, unknown>) => ({
    _id: m._id as string,
    name: m.name as string | null,
    jobTitle: m.jobTitle as string | null,
    bio: m.bio as string | null,
    photoUrl: m.photo ? urlForImage(m.photo).width(450).height(450).url() : null,
  }))

  const pets = (rawPets ?? []).map((p: Record<string, unknown>) => ({
    _id: p._id as string,
    name: p.name as string | null,
    jobTitle: p.jobTitle as string | null,
    photoUrl: p.photo ? urlForImage(p.photo).width(450).height(450).url() : null,
  }))

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="We're here to drive profit, not ad spend"
        description="Profit Mill helps high-growth teams turn ad spend into actual revenue with fully-integrated paid media campaigns."
        showClutchBadge={false}
        buttonText=""
      />

      <HowWeStarted />
      <WhatWeStandFor />

      <div className="px-6 py-8">
        <OurPeople members={members} />
      </div>
      <div className="px-6 py-8">
        <OurDogs pets={pets} />
      </div>

      <TestimonialsSection />

      <CtaSection
        title="Get your free ad audit"
        subtitle="Don't just take our word for it. Share read-only access to your ad accounts, and we'll show you exactly where you're leaving money on the table."
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
