'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Channel configurations
const channelConfigs = {
  'google-ads': {
    title: "Google Ads that drive sales, not just clicks",
    subtitle: "Profit Mill helps growth-hungry teams set up Google Ads to:",
    logoText: "Google",
    logoClass: "text-white text-6xl lg:text-8xl font-normal tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #00351f 0%, #006840 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757992082/f9157e795bb597da3ca952f34a0ed0673e4018f1_hha5iw.jpg",
    benefits: [
      "Capture buyer demand that's already there",
      "Scale paid campaigns after hitting product-market fit",
      "Reduce CAC and improve ROAS across funnel stages",
      "Build campaigns that you can attribute directly to profit—not just clicks"
    ]
  },
  'linkedin-ads': {
    title: "Stop boosting posts. Start booking meetings.",
    subtitle: "Profit Mill helps B2B businesses set up LinkedIn Ads to:",
    logoText: "",
    logoClass: "",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #0077B5 0%, #005885 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757992986/img_g0qndn.png",
    benefits: [
      "Create a category and capture demand in the right niche",
      "Launch cold-to-warm ABM sequences that convert customers",
      "Go beyond surface-level job titles to target B2B decision makers",
      "Build credibility in competitive categories",
      "Drive qualified pipeline, not just MQLs or impressions"
    ]
  },
  'other-channels': {
    title: "Expand to new channels. Keep a strategic focus.",
    subtitle: "Target niche buyers and capture more relevant traffic. We'll help you identify and activate the right channels based on your product, audience, and growth goals.",
    logoText: "",
    logoClass: "",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757993382/img_vwk5ym.png",
    benefits: [
      "**G2 & Capterra** → Capture high-intent buyers already comparing solutions",
      "**Bing** → Reach untapped, high-intent audiences at a lower cost",
      "**Meta (Facebook/Instagram)** → Expand retargeting or test bottom-of-funnel paid social",
      "**Reddit** → Tap into niche communities with contextual targeting",
      "**X (formerly Twitter)** → Drive awareness with timely, interest-based targeting"
    ]
  }
}

interface ProductOverviewProps {
  channel: string
  title?: string
  subtitle?: string
  benefits?: string[]
}

export default function ProductOverview({
  channel,
  title,
  subtitle,
  benefits
}: ProductOverviewProps) {
  // Get configuration for the current channel
  const config = channelConfigs[channel as keyof typeof channelConfigs] || channelConfigs['google-ads']

  // Use provided props or fallback to channel config
  const displayTitle = title || config.title
  const displaySubtitle = subtitle || config.subtitle
  const displayBenefits = benefits || config.benefits
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const subtitleRef = useRef(null)
  const benefitsRef = useRef<(HTMLLIElement | null)[]>([])

  const setBenefitRef = useCallback((index: number) => (el: HTMLLIElement | null) => {
    if (el) benefitsRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Image animation
      gsap.from(imageRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Content area animation
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Benefits stagger animation
      gsap.from(benefitsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white text-[#001109] py-12 px-4 md:py-20 md:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-12 md:mb-20">
          <h2
            ref={headingRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-center"
          >
            {displayTitle}
          </h2>
        </div>

        {/* Content Layout - Mobile: Stack, Desktop: Side by side */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
          {/* Channel Logo/Image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[450px] aspect-square relative rounded-[7px] lg:rounded-[10px] overflow-hidden flex items-center justify-center order-1 lg:order-1"
            style={{
              backgroundImage: config.backgroundImage
                ? `url('${config.backgroundImage}')`
                : config.backgroundGradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >

            {/* Channel Logo */}
            <div className="relative z-10">
              {config.logoImage ? (
                <Image
                  src={config.logoImage}
                  alt={`${channel} logo`}
                  width={200}
                  height={100}
                  className="object-contain max-w-[200px] max-h-[100px] lg:max-w-[280px] lg:max-h-[140px]"
                />
              ) : (
                <div className={config.logoClass}>
                  {config.logoText}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="flex-1 order-2 lg:order-2 min-w-0"
          >
            {/* Subtitle */}
            <h3
              ref={subtitleRef}
              className={`${channel === 'other-channels' ? 'font-normal text-[16px] md:text-[18px]' : 'font-semibold text-[18px] md:text-[24px]'} leading-[1.25] md:leading-[1.5] mb-6`}
            >
              {displaySubtitle}
            </h3>

            {/* Benefits List */}
            <ul className="space-y-3">
              {displayBenefits.map((benefit, index) => {
                // Handle markdown-style bold formatting for platform names
                const parts = benefit.split('**')
                const hasFormatting = parts.length > 1

                return (
                  <li
                    key={index}
                    ref={setBenefitRef(index)}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-[#001109] rounded-full mt-2.5 flex-shrink-0" />
                    <span className="font-normal text-[16px] leading-[1.5]">
                      {hasFormatting ? (
                        <>
                          <span className="font-bold">{parts[1]}</span>
                          {parts[2]}
                        </>
                      ) : (
                        benefit
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}