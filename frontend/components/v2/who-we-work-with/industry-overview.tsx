'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Industry configurations
const industryConfigs = {
  'saas': {
    title: "SaaS marketing that drives trial-to-paid growth",
    subtitle: "Profit Mill helps SaaS companies:",
    logoText: "SaaS",
    logoClass: "text-white text-5xl lg:text-7xl font-bold tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #00351f 0%, #006840 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757995000/saas-bg_example.jpg",
    challenges: [
      "Scale user acquisition beyond organic channels",
      "Optimize trial-to-paid conversion rates",
      "Reduce customer acquisition cost (CAC)",
      "Build predictable growth engines that compound",
      "Target users who are likely to convert and stay"
    ]
  },
  'ecommerce': {
    title: "E-commerce ads that turn browsers into buyers",
    subtitle: "Profit Mill helps e-commerce brands:",
    logoText: "E-com",
    logoClass: "text-white text-5xl lg:text-7xl font-bold tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #004528 0%, #008a52 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757995001/ecommerce-bg_example.jpg",
    challenges: [
      "Drive profitable sales, not just traffic",
      "Optimize product catalog advertising",
      "Recover abandoned carts and increase AOV",
      "Build customer lifetime value through retargeting",
      "Scale across multiple channels while maintaining ROAS"
    ]
  },
  'professional-services': {
    title: "Professional services marketing that books premium clients",
    subtitle: "Profit Mill helps professional service firms:",
    logoText: "Services",
    logoClass: "text-white text-4xl lg:text-6xl font-bold tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #006840 0%, #00a862 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757995002/services-bg_example.jpg",
    challenges: [
      "Generate high-quality leads, not just inquiries",
      "Position expertise and build credibility",
      "Book qualified meetings with decision-makers",
      "Differentiate from competitors on value, not price",
      "Build predictable pipeline for long sales cycles"
    ]
  },
  'healthcare': {
    title: "Healthcare marketing that grows patient base compliantly",
    subtitle: "Profit Mill helps healthcare providers:",
    logoText: "Health",
    logoClass: "text-white text-4xl lg:text-6xl font-bold tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #008a52 0%, #00c474 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757995003/healthcare-bg_example.jpg",
    challenges: [
      "Attract new patients while staying HIPAA compliant",
      "Target local markets and specific demographics",
      "Build trust through educational content",
      "Optimize patient journey from awareness to appointment",
      "Measure ROI on patient acquisition campaigns"
    ]
  },
  'financial-services': {
    title: "Financial services marketing that builds trust and drives leads",
    subtitle: "Profit Mill helps financial service providers:",
    logoText: "Finance",
    logoClass: "text-white text-4xl lg:text-6xl font-bold tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #00a862 0%, #00e085 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757995004/finance-bg_example.jpg",
    challenges: [
      "Navigate complex regulatory compliance requirements",
      "Build trust and credibility through advertising",
      "Generate high-value leads for complex services",
      "Target high-net-worth individuals effectively",
      "Compete in highly regulated advertising environments"
    ]
  },
  'manufacturing': {
    title: "Manufacturing marketing that reaches B2B decision-makers",
    subtitle: "Profit Mill helps manufacturing companies:",
    logoText: "MFG",
    logoClass: "text-white text-5xl lg:text-7xl font-bold tracking-tight relative z-10",
    logoImage: undefined,
    backgroundGradient: "linear-gradient(135deg, #00c474 0%, #00f596 100%)",
    backgroundImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757995005/manufacturing-bg_example.jpg",
    challenges: [
      "Reach decision-makers in complex B2B sales cycles",
      "Position technical capabilities and expertise",
      "Generate qualified leads for high-value contracts",
      "Compete in niche industrial markets",
      "Build awareness in specialized industry verticals"
    ]
  }
}

interface IndustryOverviewProps {
  industry: string
  title?: string
  subtitle?: string
  challenges?: string[]
}

export default function IndustryOverview({
  industry,
  title,
  subtitle,
  challenges
}: IndustryOverviewProps) {
  // Get configuration for the current industry
  const config = industryConfigs[industry as keyof typeof industryConfigs] || industryConfigs['saas']

  // Use provided props or fallback to industry config
  const displayTitle = title || config.title
  const displaySubtitle = subtitle || config.subtitle
  const displayChallenges = challenges || config.challenges

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const subtitleRef = useRef(null)
  const challengesRef = useRef<(HTMLLIElement | null)[]>([])

  const setChallengeRef = useCallback((index: number) => (el: HTMLLIElement | null) => {
    if (el) challengesRef.current[index] = el
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

      // Challenges stagger animation
      gsap.from(challengesRef.current, {
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
          {/* Industry Logo/Image */}
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
            {/* Industry Logo */}
            <div className="relative z-10">
              {config.logoImage ? (
                <Image
                  src={config.logoImage}
                  alt={`${industry} logo`}
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
              className="font-semibold text-[18px] md:text-[24px] leading-[1.25] md:leading-[1.5] mb-6"
            >
              {displaySubtitle}
            </h3>

            {/* Challenges List */}
            <ul className="space-y-3">
              {displayChallenges.map((challenge, index) => (
                <li
                  key={index}
                  ref={setChallengeRef(index)}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-[#001109] rounded-full mt-2.5 flex-shrink-0" />
                  <span className="font-normal text-[16px] leading-[1.5]">
                    {challenge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}