"use client"

import { Button } from "@/components/ui/button"
import ClutchWidget from "@/components/v2/clutch-widget"

const bgImage = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1756844385/00b2276afac21c91f3bf88b1d7a4bf2618953099_of0fav.png"

interface HomepageHeroProps {
  logoSectionTitle?: string
  logos?: Array<{
    name: string
    logoUrl: string
  }>
}

export default function HomepageHero({ logoSectionTitle, logos = [] }: HomepageHeroProps) {

  return (
    <section className="pt-[120px] md:pt-[161px] pb-8 bg-white">
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#00351f] rounded-[32px] py-12 md:py-16 lg:py-20 relative overflow-hidden">
          {/* Main Content */}
          <div className="flex flex-col gap-12 items-center justify-center text-center px-4 md:px-8 relative z-10">
            {/* Headline Section */}
            <div className="w-full max-w-4xl">
              <h1 className="font-bold leading-[1.2] text-[46px] sm:text-[60px] lg:text-[72px] text-white tracking-tight">
                <span className="block mb-2">Profitable paid ads</span>
                <span className="block mb-2">
                  <span className="block sm:inline">Backed by</span>
                  <span className="text-[#ceff00] block sm:inline sm:ml-2">
                    ex-Google
                  </span>
                </span>
                <span className="block">talent</span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-normal leading-[1.5] max-w-4xl text-[16px] sm:text-[20px] lg:text-[22px] text-white">
              We&apos;re Profit Mill, a B2B paid ads agency built by an ex-Googler. For nearly a decade, we&apos;ve helped growth-hungry companies launch, track, and scale campaigns that drive real profit—not just clicks.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col gap-8 items-center">
              <Button
                size="lg"
                className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 text-black font-semibold text-sm px-8 py-3.5 rounded-[2px]"
                onClick={() => window.open('https://app.hellobonsai.com/s/profitmill/googleadsaudit', '_blank')}
              >
                Get a free paid ads audit
              </Button>

              {/* Clutch Widget */}
              <ClutchWidget />
            </div>
          </div>

          {/* Company Logos Section */}
          {logoSectionTitle && logos.length > 0 && (
            <div className="mt-16 flex flex-col gap-6 items-center px-4 md:px-8 relative z-10">
              <p className="font-extrabold text-[#b6ffce] text-[12px] text-center tracking-[2.16px] uppercase">
                {logoSectionTitle}
              </p>

              {/* Logo Grid */}
              <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 gap-y-0">
                {logos.map((company, index) => (
                  <div key={index} className="h-[60px] md:h-[82px] w-[calc(33.333%-8px)] md:w-[160px] flex items-center justify-center">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className={`object-contain opacity-80 ${
                        company.name === "Nudge"
                          ? "max-w-[60px] max-h-[25px] md:max-w-[100px] md:max-h-[42px]"
                          : "max-w-[80px] max-h-[40px] md:max-w-[150px] md:max-h-[70px]"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Background Images */}
          <div
            className="absolute inset-0 md:bg-left md:bg-contain bg-center bg-cover bg-no-repeat md:h-[1200px] md:left-[-400px] mix-blend-lighten opacity-50 md:top-[100px] md:w-[1000px] z-[2] pointer-events-none"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div
            className="hidden md:block absolute w-[1454px] h-[1454px] right-[-952px] top-[-256px] rounded-full z-[1] pointer-events-none"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #B6FFCE 0%, #006840 49.04%, #00351F 100%)',
              filter: 'blur(250px)'
            }}
          />
        </div>
      </div>
    </section>
  )
}
