import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/utils'
import { portableTextComponents } from '@/components/portable-text'
import CaseStudyHero from '@/components/v2/case-studies/case-study-hero'
import CaseStudyHeader from '@/components/v2/case-study-page/case-study-header'
import MetricsSection from '@/components/v2/case-study-page/metrics-section'
import TestimonialsSection from '@/components/v2/landing-page/testimonials'
import ClutchReviews from '@/components/v2/clutch-reviews'
import CtaSection from '@/components/v2/cta-section'
import CaseStudiesSection from '@/components/v2/case-studies-section'

type Props = {
  params: Promise<{ slug: string }>
}

interface CaseStudy {
  title: string
  slug: {
    current: string
  }
  clientName: string
  clientLogo: any
  industry: string
  tools: string
  whoIWorkedWith: string
  excerpt: string
  projectHighlights: {
    metric1?: { title: string; description: string };
    metric2?: { title: string; description: string };
    metric3?: { title: string; description: string };
    metric4?: { title: string; description: string };
    metric5?: { title: string; description: string };
  }
  beforeSection: {
    image: any
    text: any[]
  }
  duringSection: {
    image: any
    text: any[]
  }
  afterSection: {
    image: any
    text: any[]
  }
  ctaSection: {
    text: string
    buttonText: string
  }
  content: any[]
  seo_title?: string;
  seo_description?: string;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`
    *[_type == "caseStudy" && isActive == true].slug.current
  `)

  return slugs.map((slug: string) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await client.fetch<CaseStudy>(`
    *[_type == "caseStudy" && slug.current == $slug][0] {
      title,
      excerpt,
      seo_title,
      seo_description
    }
  `, { slug })

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found - Profit Mill',
      description: 'The requested case study could not be found.',
    }
  }

  const title = caseStudy.seo_title || `${caseStudy.title} - Profit Mill`
  const description = caseStudy.seo_description || caseStudy.excerpt

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.profitmill.io/case-studies/${slug}`,
    },
  }
}

async function getCaseStudy(slug: string) {
  return await client.fetch<CaseStudy>(`
    *[_type == "caseStudy" && slug.current == $slug][0] {
      title,
      slug,
      clientName,
      clientLogo,
      industry,
      tools,
      whoIWorkedWith,
      excerpt,
      projectHighlights,
      beforeSection {
        image,
        text
      },
      duringSection {
        image,
        text
      },
      afterSection {
        image,
        text
      },
      ctaSection {
        text,
        buttonText
      },
      content,
      seo_title,
      seo_description
    }
  `, { slug }, {
    next: {
      tags: ['case-studies', `case-study-${slug}`]
    }
  })
}


export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  const beforeImageUrl = caseStudy.beforeSection?.image ? urlFor(caseStudy.beforeSection.image).width(800).height(800).url() : ''
  const duringImageUrl = caseStudy.duringSection?.image ? urlFor(caseStudy.duringSection.image).width(800).height(800).url() : ''
  const afterImageUrl = caseStudy.afterSection?.image ? urlFor(caseStudy.afterSection.image).width(800).height(800).url() : ''
  const clientLogoUrl = caseStudy.clientLogo ? urlFor(caseStudy.clientLogo).width(200).height(100).url() : ''

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <section className="pt-[120px] md:pt-[161px] pb-4 bg-white">
        <div className="mx-auto px-4 md:px-8">
          <CaseStudyHeader
            title={caseStudy.title}
            clientName={caseStudy.clientName}
            clientLogo={clientLogoUrl}
            description={caseStudy.excerpt}
            caseStudyType="case study"
          />
        </div>
      </section>

      <MetricsSection
        projectHighlights={caseStudy.projectHighlights}
        industry={caseStudy.industry}
        tools={caseStudy.tools}
        team={caseStudy.whoIWorkedWith}
      />

      <section className="bg-white pt-12 lg:pt-20 pb-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            <div>
              <h2 className="text-8xl lg:text-[120px] font-bold text-[#BDFFD9] mb-12 -mb-16 lg:ml-20">Before</h2>
              <div className={beforeImageUrl ? "grid md:grid-cols-2 gap-16 items-center" : ""}>
                {beforeImageUrl && (
                  <Image
                    src={beforeImageUrl}
                    alt="Before image"
                    width={800}
                    height={800}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                )}
                <div className={`prose prose-lg text-gray-700 leading-snug ${!beforeImageUrl ? 'max-w-4xl mx-auto' : ''}`}>
                  <PortableText
                    value={caseStudy.beforeSection?.text || []}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-8xl lg:text-[120px] font-bold text-[#BDFFD9] mb-12 -mb-16 lg:ml-20">During</h2>
              <div className={duringImageUrl ? "grid md:grid-cols-2 gap-16 items-center" : ""}>
                {duringImageUrl && (
                  <Image
                    src={duringImageUrl}
                    alt="During image"
                    width={800}
                    height={800}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                )}
                <div className={`prose prose-lg text-gray-700 leading-snug ${!duringImageUrl ? 'max-w-4xl mx-auto' : ''}`}>
                  <PortableText
                    value={caseStudy.duringSection?.text || []}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-8xl lg:text-[120px] font-bold text-[#BDFFD9] mb-12 -mb-16 lg:ml-20">After</h2>
              <div className={afterImageUrl ? "grid md:grid-cols-2 gap-16 items-center" : ""}>
                {afterImageUrl && (
                  <Image
                    src={afterImageUrl}
                    alt="After image"
                    width={800}
                    height={800}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                )}
                <div className={`prose prose-lg text-gray-700 leading-snug ${!afterImageUrl ? 'max-w-4xl mx-auto' : ''}`}>
                  <PortableText
                    value={caseStudy.afterSection?.text || []}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudiesSection title="More case studies" />
      <ClutchReviews companyId="2504132" />
      <TestimonialsSection />
      <CtaSection
        title={caseStudy.ctaSection?.text || "Want to see what a performance-driven Google Ads strategy can do for your business?"}
        subtitle=""
        buttonText={caseStudy.ctaSection?.buttonText || "Book your free audit"}
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
