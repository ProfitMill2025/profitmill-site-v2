import { Metadata } from 'next'
import TargetingApp from './targeting-app'

export const metadata: Metadata = {
  title: 'Ad Audience Targeting Generator | Profit Mill',
  description: 'Compare 32+ audience targeting features across Google Ads, LinkedIn, Meta, Reddit, and X. Interactive matrix with AI-powered targeting recommendations for your business.',
  openGraph: {
    title: 'Ad Audience Targeting Generator | Profit Mill',
    description: 'Compare audience targeting options across 5 major ad platforms. Get AI-powered recommendations.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io/ad-audience-targeting-generator',
    images: [{ url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png', width: 1200, height: 630, alt: 'Profit Mill' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ad Audience Targeting Generator | Profit Mill',
    description: 'Compare audience targeting options across 5 major ad platforms. Get AI-powered recommendations.',
    images: [{ url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png', width: 1200, height: 630, alt: 'Profit Mill' }],
  },
  alternates: { canonical: 'https://www.profitmill.io/ad-audience-targeting-generator' },
}

export default function AdAudienceTargetingGeneratorPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] md:pt-[160px]">
      <TargetingApp />
    </div>
  )
}
