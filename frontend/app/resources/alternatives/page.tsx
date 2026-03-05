import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import ComparisonIntro from '@/components/v2/alternatives/comparison-intro'
import WhatItMeans from '@/components/v2/alternatives/what-it-means'
import ComparisonChart from '@/components/v2/comparison-chart'
import ClutchReviews from '@/components/v2/clutch-reviews'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'B2B Paid Ads Agency Comparisons & Alternatives | Profit Mill',
  description: "Freelancer, in-house, or agency? See how the top B2B paid ads options stack up and why Profit Mill's revenue-obsessed might be the best move.",
  alternates: {
    canonical: 'https://www.profitmill.io/resources/alternatives',
  },
}

export default function AlternativesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="How Profit Mill compares to other paid ads agencies"
        description="Looking for someone to scale your paid ads? At Profit Mill we bring nearly a decade of ex-Google experience to help B2B companies grow profitably, not just spend more."
        buttonText="Get a free paid ad audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />

      <ComparisonIntro />
      <WhatItMeans />
      <ComparisonChart />
      <ClutchReviews />
      <CaseStudiesSection />
      <CtaSection
        title="Ready for paid ads that drive profit?"
        subtitle="Don't just take our word for it. Share read-only access to your ad accounts, and we'll show you exactly where you're leaving money on the table."
        buttonText="Book your free audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
