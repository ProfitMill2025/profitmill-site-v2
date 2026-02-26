'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// SVG Check Icon Component
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none" className="w-12 h-12">
    <g clipPath="url(#clip0_3065_7650)">
      <path d="M24 4.04077C12.96 4.04077 4 13.0008 4 24.0408C4 35.0808 12.96 44.0408 24 44.0408C35.04 44.0408 44 35.0808 44 24.0408C44 13.0008 35.04 4.04077 24 4.04077ZM20 34.0408L10 24.0408L12.82 21.2208L20 28.3808L35.18 13.2008L38 16.0408L20 34.0408Z" fill="#006840"/>
    </g>
    <defs>
      <clipPath id="clip0_3065_7650">
        <rect width="48" height="48" fill="white" transform="translate(0 0.0407715)"/>
      </clipPath>
    </defs>
  </svg>
)

// Channel configurations
const channelConfigs = {
  'google-ads': {
    title: "Don't settle for run-of-the-mill. Work with Profit Mill.",
    subtitle: "Here's why Google Ads with Profit Mill outperform the rest:",
    benefits: [
      {
        title: "Expertise from 8+ years at Google",
        description: "We've managed 1,000+ accounts from inside the platform—giving us strategic insight most agencies don't have. We don't just follow best practices, we wrote the book on them."
      },
      {
        title: "Strategy to improve your marketing—not just your ads",
        description: "We connect messaging, landing pages, and targeting to the bigger picture—making sure your entire funnel is working toward one thing: increasing profit."
      },
      {
        title: "Launch fast and learn what works",
        description: "We launch fast, track performance, and keep you in the loop via Slack, calls, and async updates so we can optimize as soon as we see what's working."
      }
    ]
  },
  'linkedin-ads': {
    title: "Don't settle for run-of-the-mill. Work with Profit Mill.",
    subtitle: "Here's why LinkedIn Ads with Profit Mill outperform the rest:",
    benefits: [
      {
        title: "Expertise from inside LinkedIn",
        description: "Our LinkedIn experts have strategic insight most agencies don't have. We don't just follow best practices, we wrote the book on them."
      },
      {
        title: "Strategy to improve your marketing—not just your ads",
        description: "We connect messaging, landing pages, and targeting to the bigger picture—making sure your entire funnel is working toward one thing: increasing profit."
      },
      {
        title: "Launch fast and learn what works",
        description: "We launch fast, track performance, and keep you in the loop via Slack, calls, and async updates so we can optimize as soon as we see what's working."
      }
    ]
  },
  'other-channels': {
    title: "Don't settle for run-of-the-mill. Work with Profit Mill.",
    subtitle: "Here's why Google Ads with Profit Mill outperform the rest:",
    benefits: [
      {
        title: "Platform expertise from industry experts",
        description: "We've managed 1,000+ accounts from inside the platform—giving us strategic insight most agencies don't have. We don't just follow best practices, we wrote the book on them."
      },
      {
        title: "Strategy to improve your marketing—not just your ads",
        description: "We connect messaging, landing pages, and targeting to the bigger picture—making sure your entire funnel is working toward one thing: increasing profit."
      },
      {
        title: "Launch fast and learn what works",
        description: "We launch fast, track performance, and keep you in the loop via Slack, calls, and async updates so we can optimize as soon as we see what's working."
      }
    ]
  }
}

interface WhyProfitMillProps {
  channel: string
  title?: string
  subtitle?: string
  benefits?: Array<{
    title: string
    description: string
  }>
}

export default function WhyProfitMill({
  channel,
  title,
  subtitle,
  benefits
}: WhyProfitMillProps) {
  // Get configuration for the current channel
  const config = channelConfigs[channel as keyof typeof channelConfigs] || channelConfigs['google-ads']

  // Use provided props or fallback to channel config
  const displayTitle = title || config.title
  const displaySubtitle = subtitle || config.subtitle
  const displayBenefits = benefits || config.benefits

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Cards stagger animation
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center">
          <h2
            ref={titleRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] mb-6"
          >
            {displayTitle}
          </h2>
          <p
            ref={subtitleRef}
            className="font-normal text-[18px] leading-[1.5] text-[#001109]"
          >
            {displaySubtitle}
          </p>
        </div>

        {/* Benefits Grid - Mobile: Stack, Desktop: Three columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayBenefits.map((benefit, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="bg-[#f1fff5] rounded-[10px] p-6 flex flex-col gap-8 items-center text-center"
            >
              {/* Check Icon */}
              <div className="flex-shrink-0">
                <CheckIcon />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 items-center w-full">
                <h3 className="font-semibold text-[18px] md:text-[24px] leading-[1.25] md:leading-[1.5] text-[#001109]">
                  {benefit.title}
                </h3>
                <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}