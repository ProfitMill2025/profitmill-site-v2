import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import ProductTable from '@/components/v2/what-we-do/product-table'
import WhyChoose from '@/components/v2/what-we-do/why-choose'
import ComparisonChart from '@/components/v2/comparison-chart'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'We Help Companies Profit From Paid Ads | Profit Mill',
  description: 'Ready for paid ads but not sure where to start? Profit Mill helps ambitious teams scale smarter with full-funnel paid ad strategy and technical setup.',
  alternates: {
    canonical: 'https://www.profitmill.io/what-we-do',
  },
}

export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Other agencies run ads. We drive growth."
        description="Tired of burning budget on ads that don't convert? We help B2B teams turn paid media into profit—with strategy, tracking, and funnel support that actually drives results."
        buttonText="Get a free paid ads audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
        showClutchBadge={true}
      />
      <ProductTable />
      <WhyChoose />
      <ComparisonChart />
      <CaseStudiesSection title="Our work in the numbers" />
      <CtaSection
        title="Ready for paid ads that drive profit?"
        subtitle="Don't just take our word for it. Share read-only access to your ad accounts, and we'll show you exactly where you're leaving money on the table."
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
