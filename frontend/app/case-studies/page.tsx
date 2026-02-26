import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import CaseStudyHero from '@/components/v2/case-studies/case-study-hero'
import CaseStudyList from '@/components/v2/case-studies/case-study-list'
import ClutchReviews from '@/components/v2/clutch-reviews'
import TestimonialsSection from '@/components/v2/landing-page/testimonials'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'Run Paid Ads That Drive B2B Results | Profit Mill',
  description: 'See how Profit Mill cuts CAC, improves lead quality, and turns ad spend into revenue across Google, LinkedIn, and more.',
  alternates: {
    canonical: 'https://www.profitmill.io/case-studies',
  },
}

async function getAllCaseStudies() {
  return await client.fetch(`
    *[_type == "caseStudy" && isActive == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      clientName,
      clientLogo,
      industry,
      tools
    }
  `, {}, {
    next: {
      tags: ['case-studies']
    }
  })
}

export default async function CaseStudiesPage() {
  const sanityData = await getAllCaseStudies()

  const caseStudies = sanityData.map((study: any) => ({
    _id: study._id,
    title: study.title,
    slug: study.slug,
    type: 'CASE STUDY',
    tags: `${study.industry || 'B2B SaaS'}, ${study.tools || 'Google Ads'}`,
    clientName: study.clientName,
    industry: study.industry,
    tools: study.tools,
    excerpt: study.excerpt
  }))

  return (
    <div className="min-h-screen bg-white">
      <CaseStudyHero />
      <CaseStudyList caseStudies={caseStudies} />
      <ClutchReviews companyId="2504132" />
      <TestimonialsSection />
      <CtaSection
        title="Turn your paid ads into qualified pipeline"
        subtitle="Want to see how? Share read-only access to your ad accounts, and we'll show you exactly where you're leaving money on the table."
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
