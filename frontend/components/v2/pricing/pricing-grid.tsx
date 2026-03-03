'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Chevron down icon for expand/collapse
const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform rotate-180">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  stage: string
  stageDetail: string
  arr: string
  arrDetail: string
  highlight?: string
  highlightColor?: string
  headerBgColor?: string
  isPopular?: boolean
  isHighestValue?: boolean
  details?: string[][]
}

interface PricingGridProps {
  tiers?: PricingTier[]
  className?: string
}

const sectionLabels = ["KEY PLAN DIFFERENCES", "INCREMENTAL DIFFERENCES", "ALWAYS INCLUDED"]

const defaultTiers: PricingTier[] = [
  {
    name: "Explore",
    price: "$5,000",
    period: "USD/month",
    description: "Often selected by teams testing channel fit and early traction",
    stage: "Common Stage:",
    stageDetail: " Pre-seed / self-funded",
    arr: "Common Revenue:",
    arrDetail: " Up to $1M",
    headerBgColor: "#006840",
    details: [
      ["Google Ads OR LinkedIn Ads", "Text + Image Ads", "Landing page advice"],
      ["Ad spend = $30K USD/mo", "Full performance visibility", "Bi-weekly meetings + Slack and email access"],
      ["Client side tracking, offline conversion, & server side consultation", "CDPs, GA4, CRM integrations", "Up to $100 in lead list credits"]
    ]
  },
  {
    name: "Invest",
    price: "$8,000",
    period: "USD/month",
    description: "Often selected by teams with PMF looking to accelerate scale",
    stage: "Common Stage:",
    stageDetail: " Seed to Series A",
    arr: "Common Revenue:",
    arrDetail: " $1M - $10M",
    highlight: "most popular",
    highlightColor: "#ffba0a",
    headerBgColor: "#00351f",
    isPopular: true,
    details: [
      ["Google Ads + LinkedIn Ads + 1 other", "Text + Image Ads", "1x/mo landing page"],
      ["Ad spend = $30K USD - $100K USD/mo", "Full performance visibility + dashboard", "Bi-weekly meetings + Slack and email access"],
      ["Client side tracking, offline conversion, & full server side setup", "CDPs, GA4, CRM integrations", "Up to $200 in lead list credits"]
    ]
  },
  {
    name: "Accelerate",
    price: "$12,000",
    period: "USD/month",
    description: "Often selected by teams driving hyper-growth and peak expansion",
    stage: "Common Stage:",
    stageDetail: " Series B and beyond",
    arr: "Common Revenue:",
    arrDetail: " $10M+",
    highlight: "highest value",
    highlightColor: "#b6ffce",
    headerBgColor: "#001109",
    isHighestValue: true,
    details: [
      ["Full multi-channel: Google, Meta, LinkedIn, YouTube, etc.", "Text + Image Ads", "Unlimited landing pages"],
      ["Ad spend = $100K+ USD/mo", "Full performance visibility + custom dashboard", "Weekly meetings + Slack and email access"],
      ["Client side tracking, offline conversion, & full server side setup", "CDPs, GA4, CRM integrations", "Up to $300 in lead list credits"]
    ]
  }
]

export default function PricingGrid({ tiers = defaultTiers, className = '' }: PricingGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const backgroundRef = useRef<HTMLDivElement>(null)
  const pricingGridRef = useRef<HTMLDivElement>(null)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
  }, [])

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionIndex)) {
        newSet.delete(sectionIndex)
      } else {
        newSet.add(sectionIndex)
      }
      return newSet
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the entire component as one cohesive unit
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Background and overall container animation
      tl.from(backgroundRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      })
      
      // Header content animation - together
      .from([headingRef.current, subheadingRef.current], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      }, "-=0.8")
      
      // Entire pricing grid animation - all components together
      .from(pricingGridRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5")
    })

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} hidden md:block bg-white py-16 md:py-20 relative ${className}`}
    >
      {/* Background Decorative Shapes */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute h-[979px] w-[984px] right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
          {/* Geometric background pattern */}
          <svg width="984" height="979" viewBox="0 0 984 979" fill="none" className="w-full h-full">
            {/* Grid pattern with mint color */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Decorative circles */}
            <circle cx="492" cy="200" r="80" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="492" cy="400" r="120" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.15"/>
            <circle cx="492" cy="600" r="160" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.1"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-[#001109] text-[32px] md:text-[42px] font-bold leading-[1.2] mb-6"
          >
            Simple pricing for serious growth
          </h2>
          <p 
            ref={subheadingRef}
            className="text-[#001109] text-[18px] leading-[1.5] max-w-2xl mx-auto"
          >
            Choose a plan that matches your ambition. We can always adjust up or down later.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={pricingGridRef} className="flex flex-col">
          {/* Top Badge Row */}
          <div className="flex flex-col md:flex-row gap-0 justify-center">
            {tiers.map((tier, index) => {
              const isLast = index === tiers.length - 1
              
              return (
                <div
                  key={`badge-${index}`}
                  className="flex-1 md:max-w-[352px]"
                >
                  {/* Highlight Badge or Empty Space */}
                  {tier.highlight ? (
                    <div 
                      className={`px-8 py-4 flex items-center justify-center ${
                        index === 1 ? 'rounded-t-[10px]' : ''
                      } ${isLast ? 'rounded-t-[10px]' : ''}`}
                      style={{ backgroundColor: tier.highlightColor }}
                    >
                      <span className="text-[#001109] text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]">
                        {tier.highlight}
                      </span>
                    </div>
                  ) : (
                    <div className="px-8 py-4">
                      {/* Empty space for alignment */}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Main Cards Row */}
          <div className="flex flex-col md:flex-row gap-0 justify-center items-stretch">
            {tiers.map((tier, index) => {
              const isFirst = index === 0
              const isLast = index === tiers.length - 1
              
              return (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  className={`bg-[#f5f5f5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)] overflow-hidden flex-1 md:max-w-[352px] relative flex flex-col ${
                    isFirst ? 'rounded-tl-[10px] rounded-bl-[10px]' : ''
                  } ${isLast ? 'rounded-br-[10px]' : ''}`}
                >
                  {/* Tier Name Row */}
                  <div 
                    className="px-8 py-6 flex items-center justify-center"
                    style={{ backgroundColor: tier.headerBgColor }}
                  >
                    <h3 className="text-[#b6ffce] text-[18px] md:text-[24px] font-semibold leading-[1.5] text-center">
                      {tier.name}
                    </h3>
                  </div>

              {/* Content */}
              <div className="bg-[#f5f5f5] px-8 py-4 flex-1">
                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="text-[#006840] text-[24px] md:text-[32px] font-semibold leading-[1.25] mb-0">
                    {tier.price}
                  </div>
                  <div className="text-[#006840] text-[18px] leading-[1.5]">
                    {tier.period}
                  </div>
                </div>

                {/* Description */}
                <div className="text-[#001109] text-[16px] leading-[1.5]">
                  <p className="mb-2">{tier.description}</p>
                  <p>
                    <span className="font-bold text-[14px]">{tier.stage}</span>
                    <span className="text-[16px]">{tier.stageDetail}</span>
                  </p>
                  <p>
                    <span className="font-bold text-[14px]">{tier.arr}</span>
                    <span className="text-[16px]">{tier.arrDetail}</span>
                  </p>
                </div>

              </div>
            </div>
            )
          })}
          </div>
          
          {/* Accordion Sections - Full Width Rows */}
          {tiers[0].details?.map((_, sectionIndex) => {
            const bgColors = ["#002413", "#00351f", "#006840"]
            const isExpanded = expandedSections.has(sectionIndex)
            
            return (
              <div key={sectionIndex}>
                {/* Accordion Header Row */}
                <div className="flex flex-col md:flex-row gap-0 justify-center">
                  {tiers.map((tier, tierIndex) => {
                    const isFirst = tierIndex === 0
                    const isLast = tierIndex === tiers.length - 1
                    
                    return (
                      <div
                        key={tierIndex}
                        className={`flex-1 md:max-w-[352px] ${
                          sectionIndex === 2 && !isExpanded && isFirst ? 'rounded-bl-[10px]' : ''
                        } ${sectionIndex === 2 && !isExpanded && isLast ? 'rounded-br-[10px]' : ''}`}
                        style={{ backgroundColor: bgColors[sectionIndex] }}
                      >
                        <button
                          onClick={() => toggleSection(sectionIndex)}
                          className="w-full px-8 py-4 flex items-center justify-between text-white hover:opacity-80 transition-opacity"
                        >
                          <span className="text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]">
                            {sectionLabels[sectionIndex]}
                          </span>
                          <div className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`}>
                            <ChevronDownIcon />
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
                
                {/* Accordion Content Row */}
                {isExpanded && (
                  <div className="flex flex-col md:flex-row gap-0 justify-center">
                    {tiers.map((tier, tierIndex) => {
                      const isFirst = tierIndex === 0
                      const isLast = tierIndex === tiers.length - 1
                      const isLastSection = sectionIndex === tiers[0].details!.length - 1
                      
                      return (
                        <div
                          key={tierIndex}
                          className={`flex-1 md:max-w-[352px] px-8 pb-4 text-white ${
                            sectionIndex === 2 && isFirst ? 'rounded-bl-[10px]' : ''
                          } ${sectionIndex === 2 && isLast ? 'rounded-br-[10px]' : ''}`}
                          style={{ backgroundColor: bgColors[sectionIndex] }}
                        >
                          <ul className="space-y-2">
                            {tier.details?.[sectionIndex]?.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-[14px] leading-[1.4] flex items-start">
                                <span className="text-white mr-2">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}