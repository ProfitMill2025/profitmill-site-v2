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

interface PricingGridMobileProps {
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
      ["1 ad channel", "Ad spend of <$30K USD/mo", "1 custom landing page", "› Strategy, copy, design, dev", "› Monthly conversion experiment"],
      ["Text + Image Ads", "Full performance visibility in ad platform", "Bi-weekly meetings + Unlimited Slack and email access"],
      ["Client side conversion tracking, offline conversion import, or full server side setup", "CDPs, GA4, CRM integrations"]
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
      ["3 ad channels", "Ad spend of $30K USD - $100K USD/mo", "1 custom landing page", "› Up to 5 custom-lite landing pages", "› Monthly conversion experiment"],
      ["Text + Image Ads + Video Ads", "Full performance visibility in ads platforms + Looker dashboard", "Weekly meetings + Unlimited Slack and email access"],
      ["Client side conversion tracking, offline conversion import, or full server side setup", "CDPs, GA4, CRM integrations"]
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
      ["Unlimited ad channels", "Ad spend of $100K+ USD/mo", "3 custom landing pages", "› Up to 5 custom-lite landing pages", "› Monthly conversion experiment"],
      ["Text + Image Ads + Video Ads", "Full performance visibility in ad platforms + Premium dashboard", "Weekly meetings + Unlimited Slack and email access"],
      ["Client side conversion tracking, offline conversion import, or full server side setup", "CDPs, GA4, CRM integrations"]
    ]
  }
]

export default function PricingGridMobile({ tiers = defaultTiers, className = '' }: PricingGridMobileProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const backgroundRef = useRef<HTMLDivElement>(null)
  const pricingGridRef = useRef<HTMLDivElement>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, Set<number>>>(
    tiers.reduce((acc, _, tierIndex) => {
      acc[tierIndex] = new Set()
      return acc
    }, {} as Record<string, Set<number>>)
  )

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
  }, [])

  const toggleSection = (tierIndex: number, sectionIndex: number) => {
    setExpandedSections(prev => {
      const newState = { ...prev }
      const tierSections = new Set(prev[tierIndex])
      
      if (tierSections.has(sectionIndex)) {
        tierSections.delete(sectionIndex)
      } else {
        tierSections.add(sectionIndex)
      }
      
      newState[tierIndex] = tierSections
      return newState
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
      
      // Cards animation with stagger
      .from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
      }, "-=0.5")
    })

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} md:hidden bg-white py-12 px-5 relative ${className}`}
    >
      {/* Background Decorative Shapes */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute h-[979px] w-[984px] left-[-8px] top-[138px]">
          {/* Grid pattern with mint color */}
          <svg width="984" height="979" viewBox="0 0 984 979" fill="none" className="w-full h-full">
            <defs>
              <pattern id="mobile-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-grid)" />
            
            {/* Decorative circles */}
            <circle cx="492" cy="200" r="80" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="492" cy="400" r="120" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.15"/>
            <circle cx="492" cy="600" r="160" fill="none" stroke="#B6FFCE" strokeWidth="0.5" opacity="0.1"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-12 items-center">
        {/* Header */}
        <div className="text-center w-full">
          <h2 
            ref={headingRef}
            className="text-[#001109] text-[32px] font-bold leading-[1.2] mb-6"
          >
            Simple pricing for serious growth
          </h2>
          <p 
            ref={subheadingRef}
            className="text-[#001109] text-[18px] leading-[1.5] w-full"
          >
            Choose a plan that matches your ambition. We can always adjust up or down later.
          </p>
        </div>

        {/* Mobile Pricing Cards - Vertical Stack */}
        <div ref={pricingGridRef} className="flex flex-col gap-6 w-full">
          {tiers.map((tier, tierIndex) => (
            <div
              key={tierIndex}
              ref={setCardRef(tierIndex)}
              className="bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)] overflow-hidden w-full"
            >
              {/* Highlight Badge */}
              {tier.highlight && (
                <div 
                  className="px-8 py-4 flex items-center justify-center rounded-t-[10px]"
                  style={{ backgroundColor: tier.highlightColor }}
                >
                  <span className="text-[#001109] text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]">
                    {tier.highlight}
                  </span>
                </div>
              )}

              {/* Tier Name Header */}
              <div 
                className={`px-8 py-6 flex items-center justify-center ${
                  !tier.highlight ? 'rounded-t-[10px]' : ''
                }`}
                style={{ backgroundColor: tier.headerBgColor }}
              >
                <h3 className="text-[#b6ffce] text-[18px] font-semibold leading-[1.25] text-center">
                  {tier.name}
                </h3>
              </div>

              {/* Content Section */}
              <div className="bg-neutral-100 px-8 pt-8 pb-6">
                <div className="pb-6">
                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="text-[#006840] text-[24px] font-semibold leading-[1.25] mb-0">
                      {tier.price}
                    </div>
                    <div className="text-[#006840] text-[18px] leading-[1.5]">
                      {tier.period}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-[#001109] text-[16px] leading-[1.5] mb-6">
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

              {/* Additional Details Sections - Edge to Edge */}
              {tier.details?.map((sectionDetails, sectionIndex) => {
                const bgColors = ["#002413", "#00351f", "#006840"]
                const isExpanded = expandedSections[tierIndex]?.has(sectionIndex) || false
                const isLastSection = sectionIndex === tier.details!.length - 1
                
                return (
                  <div key={sectionIndex} className="w-full">
                    <button
                      onClick={() => toggleSection(tierIndex, sectionIndex)}
                      className={`w-full px-8 py-4 flex items-center justify-center gap-2 text-white hover:opacity-80 transition-opacity ${
                        isLastSection && !isExpanded ? 'rounded-b-[10px]' : ''
                      }`}
                      style={{ backgroundColor: bgColors[sectionIndex] }}
                    >
                      <span className="text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]">
                        {sectionLabels[sectionIndex]}
                      </span>
                      <div className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`}>
                        <ChevronDownIcon />
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div
                        className={`px-8 pt-4 pb-4 text-white ${
                          isLastSection ? 'rounded-b-[10px]' : ''
                        }`}
                        style={{ backgroundColor: bgColors[sectionIndex] }}
                      >
                        <ul className="space-y-2">
                          {sectionDetails.map((detail, detailIndex) => {
                            const isSubItem = detail.startsWith('› ')
                            const displayText = isSubItem ? detail.slice(2) : detail
                            return (
                              <li key={detailIndex} className={`text-[14px] leading-[1.4] flex items-start ${isSubItem ? 'ml-4' : ''}`}>
                                <span className="text-white mr-2">{isSubItem ? '◦' : '•'}</span>
                                <span>{displayText}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}