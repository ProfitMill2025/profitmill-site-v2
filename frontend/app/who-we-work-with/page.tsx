import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import WhoWeWorkWith from '@/components/v2/who-we-work-with/who-we-work-with'
import HowToTell from '@/components/v2/who-we-work-with/how-to-tell'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'Paid Ads Agency for High-Growth Companies | Profit Mill',
  description: 'We help ambitious PLG startups, B2B SaaS, and service businesses turn ad spend into real revenue. See if Profit Mill is the right fit for your growth goals.',
  alternates: {
    canonical: 'https://www.profitmill.io/who-we-work-with',
  },
}

export default function WhoWeWorkWithPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Grow your B2B business with paid ads"
        description="Ready to make paid ads work for you? If you've got the foundation, we'll bring the strategy, tracking, and targeting to turn ad spend into profit."
        buttonText="Get a free paid ads audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
        showClutchBadge={true}
      />
      <WhoWeWorkWith />
      <HowToTell />
      <CaseStudiesSection title="Our work in the numbers" />
      <CtaSection
        title="Are your paid ads paying off? We'll tell you (for free)."
        subtitle="Don't gamble on your growth. We'll audit your current setup and show you exactly where your strategy is falling short—and tell you straight if we can help."
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
