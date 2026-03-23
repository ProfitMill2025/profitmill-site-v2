import { Metadata } from 'next'
import HeroSection from '@/components/v2/ad-strategy/hero-section'
import ChannelsSection from '@/components/v2/ad-strategy/channels-section'
import PrinciplesSection from '@/components/v2/ad-strategy/principles-section'
import AdceptsSection from '@/components/v2/ad-strategy/adcepts-section'
import WhatNotToDo from '@/components/v2/ad-strategy/what-not-to-do'
import ProcessSection from '@/components/v2/ad-strategy/process-section'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'B2B Ad Strategy & Creative Philosophy | Profit Mill',
  description: 'We create high-signal advertising for LinkedIn, Meta, X, and Reddit by focusing on one thing: clarity. See our ad strategy principles, creative patterns, and process.',
  openGraph: {
    title: 'B2B Ad Strategy & Creative Philosophy | Profit Mill',
    description: 'We create high-signal advertising for LinkedIn, Meta, X, and Reddit by focusing on one thing: clarity.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io/ad-strategy',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Ad Strategy & Creative Philosophy | Profit Mill',
    description: 'We create high-signal advertising for LinkedIn, Meta, X, and Reddit by focusing on one thing: clarity.',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.profitmill.io/ad-strategy',
  },
}

export default function AdStrategyPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] md:pt-[160px]">
      <HeroSection />
      <ChannelsSection />
      <PrinciplesSection />
      <AdceptsSection />
      <WhatNotToDo />
      <ProcessSection />
      <CtaSection
        title="Let's build your next campaign"
        subtitle="Ready to create ads that actually convert? We'll help you craft high-signal creative for LinkedIn, Meta, Google, X, and Reddit."
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
      />
    </div>
  )
}
