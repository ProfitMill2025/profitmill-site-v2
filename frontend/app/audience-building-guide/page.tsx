import { Metadata } from 'next'
import AudienceApp from './audience-app'

export const metadata: Metadata = {
  title: 'B2B Audience Building Guide | Profit Mill',
  description:
    'Compare B2B audience types across Google, LinkedIn, Meta, Reddit & X. Interactive matrix of 19 audience building tools with pricing. Free data converter tool.',
  openGraph: {
    title: 'B2B Audience Building Guide | Profit Mill',
    description:
      'Compare B2B ad platform audience types, 19 audience building tools, and convert your data for any platform.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io/audience-building-guide',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Audience Building Guide | Profit Mill',
    description:
      'Compare B2B ad platform audience types, 19 audience building tools, and convert your data for any platform.',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.profitmill.io/audience-building-guide',
  },
}

export default function AudienceBuildingGuidePage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] md:pt-[160px]">
      <AudienceApp />
    </div>
  )
}
