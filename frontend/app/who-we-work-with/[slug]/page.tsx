import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { whoWeWorkWithQuery, whoWeWorkWithSlugsQuery } from '@/sanity/lib/queries'

import SegmentHero from '@/components/v2/segment-hero'
import SegmentBenefits from '@/components/v2/who-we-work-with/segment-benefits'
import SegmentComparison from '@/components/v2/who-we-work-with/segment-comparison'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import SegmentFaqs from '@/components/v2/who-we-work-with/segment-faqs'
import CtaSection from '@/components/v2/cta-section'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(whoWeWorkWithSlugsQuery)

  return slugs.map((slug: string) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const segment = await client.fetch(whoWeWorkWithQuery, { slug })

  if (!segment) {
    return {
      title: 'Segment Not Found - Profit Mill',
      description: 'The requested segment could not be found.',
    }
  }

  const title = segment.seo_title || `${segment.title} - Profit Mill`
  const description = segment.seo_description || segment.hero?.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.profitmill.io/who-we-work-with/${slug}`,
    },
  }
}

async function getSegment(slug: string) {
  return await client.fetch(whoWeWorkWithQuery, { slug }, {
    next: {
      tags: ['who-we-work-with', `who-we-work-with-${slug}`]
    }
  })
}

export default async function WhoWeWorkWithSegmentPage({ params }: Props) {
  const { slug } = await params
  const segment = await getSegment(slug)

  if (!segment) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {segment.hero && (
        <SegmentHero
          headline={segment.hero.headline}
          description={segment.hero.description}
          buttonText={segment.hero.buttonText}
          buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
          showClutchBadge={segment.hero.showClutchBadge}
          logoSectionTitle={segment.hero.logoSectionTitle}
          logos={segment.processedLogos?.filter((l): l is { name: string; logoUrl: string } => l.logoUrl !== null) || []}
        />
      )}

      {segment.benefits && (
        <SegmentBenefits
          title={segment.benefits.title}
          description={segment.benefits.description}
          items={segment.benefits.items || []}
        />
      )}

      {segment.comparison && (
        <SegmentComparison
          mainTitle={segment.comparison.mainTitle}
          problemsTitle={segment.comparison.problemsTitle}
          problems={segment.comparison.problems || []}
          solutionsTitle={segment.comparison.solutionsTitle}
          solutions={segment.comparison.solutions || []}
          ctaButtonText={segment.comparison.ctaButtonText}
        />
      )}

      <CaseStudiesSection
        title={segment.caseStudiesTitle || "Our work in the numbers"}
      />

      <SegmentFaqs faqs={segment.faqs || []} />

      {segment.ctaSection && (
        <CtaSection
          title={segment.ctaSection.title}
          subtitle={segment.ctaSection.subtitle}
          buttonText={segment.ctaSection.buttonText}
          buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
        />
      )}
    </div>
  )
}
