import { Metadata } from 'next'
import ROICalculator from './roi-calculator'

export const metadata: Metadata = {
  title: 'Paid Ads ROI Calculator | Profit Mill',
  description: 'Calculate your B2B SaaS paid advertising ROI. Model your full funnel from ad spend through clicks, leads, MQLs, SQLs, opportunities, and closed deals to see your projected return on investment.',
  openGraph: {
    title: 'Paid Ads ROI Calculator | Profit Mill',
    description: 'Calculate your B2B SaaS paid advertising ROI. Model your full funnel from ad spend to closed deals.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io/roi-calculator',
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
    title: 'Paid Ads ROI Calculator | Profit Mill',
    description: 'Calculate your B2B SaaS paid advertising ROI. Model your full funnel from ad spend to closed deals.',
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
    canonical: 'https://www.profitmill.io/roi-calculator',
  },
}

export default function ROICalculatorPage() {
  return (
    <div className="bg-white min-h-screen pt-[120px] md:pt-[160px]">
      <ROICalculator />
    </div>
  )
}
