import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/v2/page-header'
import ProductOverview from '@/components/v2/what-we-do/product-overview'
import WhyProfitMill from '@/components/v2/what-we-do/why-profit-mill'
import HowWeWork from '@/components/v2/what-we-do/how-we-work'
import FaqsSection from '@/components/v2/what-we-do/faqs-section'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import CtaSection from '@/components/v2/cta-section'
import { client } from '@/sanity/lib/client'
import { pageFaqsQuery } from '@/sanity/lib/queries'

const services = {
  'google-ads': {
    title: 'Google Ads',
    metaTitle: 'Google Ads Agency for B2B SaaS | Profit Mill',
    metaDescription: 'Profit Mill is a Google Ads agency for B2B SaaS companies. Get ex-Google expertise, full-funnel strategy, and results tracking focused on driving real revenue.',
    description: 'Drive profitable growth with data-driven Google Ads campaigns that convert.',
    headerTitle: 'The Google Ads agency built by an ex-Googler',
    headerDescription: 'Most agencies follow the playbook—we helped write it. With 1,000+ accounts under our belt, we bring the strategy, technical setup, and full-funnel optimization to make Google Ads your most profitable paid channel.',
    buttonText: 'Get A Free Paid Ad Audit'
  },
  'linkedin-ads': {
    title: 'LinkedIn Ads',
    metaTitle: 'LinkedIn Ads Agency for B2B SaaS | Profit Mill',
    metaDescription: 'Profit Mill is a LinkedIn Ads agency for B2B SaaS and service companies. Get precision ABM targeting, ex-LinkedIn expertise, and campaigns built for revenue—not just reach.',
    description: 'Reach decision-makers and drive B2B growth with targeted LinkedIn advertising campaigns.',
    headerTitle: 'The LinkedIn Ads agency built for B2B growth',
    headerDescription: 'LinkedIn Ads are the best way to fill your pipeline with high-quality leads—if you know what you\'re doing. From ABM funnels to cold-to-close campaigns, we help everyone from B2B brands to scrappy startups turn LinkedIn into a high-ROI channel.',
    buttonText: 'Get a free paid ad audit'
  },
  'other-channels': {
    title: 'Other Channels',
    metaTitle: 'Paid Media Management for B2B Companies | Profit Mill',
    metaDescription: 'Profit Mill is a paid ads agency for B2B companies. Run smarter ads on G2, Meta, Bing, and beyond—with campaigns engineered for leads, not just clicks.',
    description: 'Expand your reach with Facebook, Instagram, YouTube, and other digital advertising channels.',
    headerTitle: 'Extend your reach with other paid media channels',
    headerDescription: 'Ready to tap into new audiences? We help you reach niche buyers, build remarketing audiences, and drive full-funnel growth through channels like G2, Meta, Bing, and Reddit—without wasting time or budget.',
    buttonText: 'Get a free paid ad audit'
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    return {
      title: 'Service Not Found - Profit Mill',
      description: 'The requested service page could not be found.',
    }
  }

  return {
    title: service.metaTitle || `${service.title} - Profit Mill`,
    description: service.metaDescription || service.description,
    alternates: {
      canonical: `https://www.profitmill.io/what-we-do/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  const faqDoc = await client.fetch(pageFaqsQuery, { pageSlug: slug }, {
    next: { tags: ['pageFaqs', `pageFaqs-${slug}`] }
  })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={service.headerTitle}
        description={service.headerDescription}
        buttonText={service.buttonText}
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
        showClutchBadge={true}
      />
      <ProductOverview channel={slug} />
      <HowWeWork channel={slug} />
      <WhyProfitMill channel={slug} />
      <CaseStudiesSection title="Not to brag... but we deliver results" />
      {faqDoc?.faqs && <FaqsSection faqData={faqDoc.faqs} />}
      <CtaSection channel={slug} />
    </div>
  )
}
