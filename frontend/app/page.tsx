import { Metadata } from 'next'

import HomepageHero from '@/components/v2/landing-page/homepage-hero'
import Intro from '@/components/v2/landing-page/intro'
import ScalingChannels from '@/components/v2/landing-page/scaling-channels'
import WhoWeWorkWith from '@/components/v2/landing-page/who-we-work-with'
import HowIDoThings from '@/components/v2/landing-page/how-i-do-things'
import WhyClientsSection from '@/components/v2/landing-page/why-clients-section'
import TestimonialsSection from '@/components/v2/landing-page/testimonials'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import FaqsSection from '@/components/v2/landing-page/faqs-section'
import CtaSection from '@/components/v2/cta-section'
import { homepageFaqs } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'Paid Ads Experts for B2B Growth | Profit Mill',
  description: 'Profit Mill helps startups and scaleups turn paid ads into profit. Get strategic Google, LinkedIn, and paid media management from ex-Google and LinkedIn experts.',
  alternates: {
    canonical: 'https://www.profitmill.io',
  },
}

export default function Homepage() {
  return (
    <>
      <HomepageHero />
      <Intro />
      <ScalingChannels />
      <WhoWeWorkWith />

      {/* Sections with shared circular background */}
      <div className="relative bg-white overflow-hidden">
        {/* Shared Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-1/3 -translate-y-1/2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute border rounded-full"
                style={{
                  width: `${120 * (i + 1)}px`,
                  height: `${120 * (i + 1)}px`,
                  left: `${-60 * (i + 1)}px`,
                  top: `${-60 * (i + 1)}px`,
                  borderColor: '#B6FFCE',
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <HowIDoThings />
          <WhyClientsSection />
        </div>
      </div>

      <TestimonialsSection />
      <CaseStudiesSection />
      <FaqsSection faqData={homepageFaqs} />
      <CtaSection buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit" />
    </>
  )
}
