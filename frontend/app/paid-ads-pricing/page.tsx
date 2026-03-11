import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import PricingGrid from '@/components/v2/pricing/pricing-grid'
import PricingGridMobile from '@/components/v2/pricing/pricing-grid-mobile'
import HowIDoThings from '@/components/v2/landing-page/how-i-do-things'
import WhyClientsSection from '@/components/v2/landing-page/why-clients-section'
import TestimonialsSection from '@/components/v2/landing-page/testimonials'
import CaseStudiesSection from '@/components/v2/case-studies-section'
import FaqsSection from '@/components/v2/landing-page/faqs-section'
import CtaSection from '@/components/v2/cta-section'
import { client } from '@/sanity/lib/client'
import { pageFaqsQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Paid Ads That Pay For Themselves | Profit Mill',
  description: 'See pricing plans for growth-ready teams. Profit Mill\'s PROFIT Plan\u2122 turns paid ad investment into real ROI with expert strategy, tracking, and results.',
  openGraph: {
    title: 'Paid Ads That Pay For Themselves | Profit Mill',
    description: 'See pricing plans for growth-ready teams. Profit Mill\'s PROFIT Plan\u2122 turns paid ad investment into real ROI with expert strategy, tracking, and results.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io/paid-ads-pricing',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paid Ads That Pay For Themselves | Profit Mill',
    description: 'See pricing plans for growth-ready teams. Profit Mill\'s PROFIT Plan\u2122 turns paid ad investment into real ROI with expert strategy, tracking, and results.',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      }
    ],
  },
  alternates: {
    canonical: 'https://www.profitmill.io/paid-ads-pricing',
  },
}

export default async function PricingPage() {
  const faqDoc = await client.fetch(pageFaqsQuery, { pageSlug: 'pricing' }, {
    next: { tags: ['pageFaqs', 'pageFaqs-pricing'] }
  })

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Paid ads that pay for themselves"
        description="Want ads that bring leads, not just traffic? Profit Mill sets you up with everything—from strategy to tracking—so your paid ads drive real growth."
        buttonText="Get a free paid ads audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
      />
      <PricingGrid />
      <PricingGridMobile />

      <div className="relative bg-white overflow-hidden">
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
        </div>
        <div className="relative">
        <WhyClientsSection lightBackground={true} />
        </div>

      </div>
      <TestimonialsSection
        title="Don't just take our word for it"
        description="Hear what our clients have to say:"
      />
      <CaseStudiesSection />
      {faqDoc?.faqs && <FaqsSection faqData={faqDoc.faqs} />}
      <CtaSection
        title="Get your free ad audit"
        subtitle="Don't just take our word for it. Share read-only access to your ad accounts, and we'll show you exactly where you're leaving money on the table."
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
      />
    </div>
  )
}
