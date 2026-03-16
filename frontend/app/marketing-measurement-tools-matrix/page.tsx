import { Metadata } from 'next'
import MatrixApp from './matrix-app'

export const metadata: Metadata = {
  title: 'Marketing Measurement Tools Matrix | Profit Mill',
  description:
    'Compare 40+ marketing measurement tools across MTA, MMM, incrementality testing, audiences, attribution models, and pricing. Interactive matrix by Profit Mill.',
  openGraph: {
    title: 'Marketing Measurement Tools Matrix | Profit Mill',
    description:
      'Compare 40+ MTA, MMM, and incrementality tools. Filter by audience, model, and price.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io/marketing-measurement-tools-matrix',
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
    title: 'Marketing Measurement Tools Matrix | Profit Mill',
    description:
      'Compare 40+ MTA, MMM, and incrementality tools. Filter by audience, model, and price.',
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
    canonical: 'https://www.profitmill.io/marketing-measurement-tools-matrix',
  },
}

export default function MarketingMeasurementToolsMatrixPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] md:pt-[160px]">
      <MatrixApp />
    </div>
  )
}
