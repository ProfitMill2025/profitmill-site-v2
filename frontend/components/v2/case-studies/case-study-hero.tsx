"use client"

import { Button } from "@/components/ui/button"
import ClutchWidget from '@/components/v2/clutch-widget'

// Company logos from Cloudinary
const img1 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137435/logo1_zgvgof.png"
const img2 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137489/logo2_zoejfy.png"
const img3 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137505/logo3_webuzi.png"
const img4 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1744813063/forum_ventures_logo_lpg0nr.png"
const img5 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137530/logo5_ogqiby.png"
const img6 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137537/logo6_xkvmk3.png"
const img7 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137544/logo7_fvlsjv.png"
const img8 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137552/logo8_l342ig.png"
const img9 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1744813063/nudge_ai_logo_fa8rd3.png"
const img10 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137561/logo9_bu8jdq.png"
const img11 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137569/logo10_ytdciy.png"
const img12 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137579/logo11_i2kpc5.png"
const img13 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1744813063/paraform_logo_j6pdwk.png"
const img14 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137586/logo12_avc5tk.png"
const img15 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1744813063/womp_logo_vfwlsi.png"
const img16 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1756844385/00b2276afac21c91f3bf88b1d7a4bf2618953099_of0fav.png"

const companies = [
  { name: "Careerflow", logo: img1 },
  { name: "Corfix", logo: img2 },
  { name: "EliseAI", logo: img3 },
  { name: "Forum Ventures", logo: img4 },
  { name: "Insurify", logo: img5 },
  { name: "JungleAI", logo: img6 },
  { name: "Let's Roam", logo: img7 },
  { name: "MeetingPulse", logo: img8 },
  { name: "Nudge", logo: img9 },
  { name: "OpticOdds", logo: img10 },
  { name: "Paraform", logo: img13 },
  { name: "Speaker Labs", logo: img11 },
  { name: "TeamLinkt", logo: img12 },
  { name: "ULF", logo: img14 },
  { name: "Womp", logo: img15 },
]

export default function HomepageHero() {
  return (
    <section className="pt-[120px] md:pt-[161px] pb-8 bg-white">
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#00351f] rounded-[32px] py-12 md:py-16 lg:py-20 relative overflow-hidden">
          {/* Main Content */}
          <div className="flex flex-col gap-12 items-center justify-center text-center px-4 md:px-8 relative z-10">
            {/* Headline Section */}
            <div className="w-full max-w-4xl">
              <h1 className="font-bold leading-[1.2] text-[50px] sm:text-[60px] lg:text-[72px] text-white tracking-[0.72px]">
                <span className="block mb-2">Make paid ads</span>
                <span className="block">worth the spend</span>
              </h1>
            </div>

            {/* Description */}
            <p className="font-normal leading-[1.5] max-w-4xl text-[16px] sm:text-[20px] lg:text-[22px] text-white">
              Our clients didn&apos;t gamble on growth—they bet on it. From product-led teams to scrappy startups, we turn wasted spend into strategy, tracking, and targeting that converts the right customers.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col gap-8 items-center">
              <Button
                size="lg"
                onClick={() => window.open('https://app.hellobonsai.com/s/profitmill/googleadsaudit', '_blank')}
                className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 text-black font-semibold text-sm px-8 py-3.5 rounded-[2px]"
              >
                Get a free paid ads audit
              </Button>

              {/* Clutch Badge */}
              <ClutchWidget />
            </div>
          </div>

          {/* Company Logos Section */}
          <div className="mt-16 flex flex-col gap-6 items-center px-4 md:px-8 relative z-10">
            <p className="font-extrabold text-[#b6ffce] text-[12px] text-center tracking-[2.16px] uppercase">
              We&apos;ve managed 1000+ ad accounts for companies like:
            </p>

            {/* Logo Grid */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 gap-y-0">
              {companies.map((company, index) => (
                <div key={index} className="h-[60px] md:h-[82px] w-[calc(33.333%-8px)] md:w-[160px] flex items-center justify-center">
                  <img
                    src={company.logo}
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

          {/* Background Images */}
          <div
            className="absolute inset-0 md:bg-left md:bg-contain bg-center bg-cover bg-no-repeat md:h-[1200px] md:left-[-400px] mix-blend-lighten opacity-50 md:top-[100px] md:w-[1000px] z-[2] pointer-events-none"
            style={{ backgroundImage: `url('${img16}')` }}
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