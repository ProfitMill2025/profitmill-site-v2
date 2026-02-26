import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import HowWeStarted from '@/components/v2/about/how-we-started'
import WhatWeStandFor from '@/components/v2/about/what-we-stand-for'
import OurPeople from '@/components/v2/about/our-people'
import TestimonialsSection from '@/components/v2/landing-page/testimonials'
import OurDogs from '@/components/v2/about/our-dogs'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'Strategic Paid Media Growth for Startups | Profit Mill',
  description: 'Learn how Profit Mill helps startups and scaleups accelerate growth through smarter paid media. Led by ex-Google experts, built for founders and marketers ready to scale.',
  alternates: {
    canonical: 'https://www.profitmill.io/about',
  },
}

export default function AboutPage() {
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
        <OurPeople />
      </div>
      <div className="px-6 py-8">
        <OurDogs />
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
