import { Metadata } from 'next'
import PageHeader from '@/components/v2/page-header'
import CtaSection from '@/components/v2/cta-section'
import WhatIsProfitStudio from '@/components/v2/profit-studio/what-is-profit-studio'
import Details from '@/components/v2/profit-studio/details'
import WhateverStage from '@/components/v2/profit-studio/whatever-stage'

export const metadata: Metadata = {
  title: 'Hands-On Venture Studio for B2B Founders | Profit Mill',
  description: "Profit Studio partners with early-stage B2B founders to launch and grow smarter. We bring 10+ years of go-to-market experience\u2014funding, strategy, and firepower included.",
  alternates: {
    canonical: 'https://www.profitmill.io/profit-studio',
  },
}

export default function ProfitStudioPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="For founders looking for more than funding"
        description="Profit Studio is a hands-on venture studio for founders who want strategic partners, not passive investors. We bring 10+ years of go-to-market expertise to help you launch, grow, and win—right off the bat."
        buttonText="Get in touch with Peter"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
        showClutchBadge={true}
      />
      <WhatIsProfitStudio />
      <Details />
      <WhateverStage className="mx-4 md:mx-[120px] mb-16 md:mb-20" />
      <CtaSection
        title="Ready to build with us?"
        subtitle="We partner with a small number of founders per year—when the product, timing, and vision align. Got a venture worth building? Send us your pitch and let's talk."
        buttonText="Pitch us your startup"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
