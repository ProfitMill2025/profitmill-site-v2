'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface WhyClientsSectionProps {
  lightBackground?: boolean
  className?: string
}

export default function WhyClientsSection({ lightBackground = false, className = '' }: WhyClientsSectionProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  const setRowRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) rowsRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Rows stagger animation
      gsap.from(rowsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const clientReasons = [
    {
      title: "ROI Obsessed",
      description: "We're here to increase your profit, not just your ad spend. That's why we're called Profit Mill—our ultimate goal is to help B2B businesses generate profit from paid ads."
    },
    {
      title: "Ad platform experts",
      description: "Founded by an ex-Googler, our team of big tech alumni has managed 1,000+ ad accounts. We know exactly what works (and what doesn't) in paid media."
    },
    {
      title: "Full-funnel marketing support",
      description: "Just running paid ads won't deliver the results you want. We help optimize your landing pages, website, and marketing funnel — so every click has a better shot at converting."
    },
    {
      title: "Flexible contracts",
      description: "No long-term lock-in, just flexible monthly contracts. Paid ads deliver results fast, so you'll know within weeks if it's working. If it's not a fit, we part ways. Simple as that."
    },
    {
      title: "Direct communication",
      description: "Think of us as an extension of your team. Through weekly syncs, async video updates, and Slack support, we're always available to answer questions and share performance updates."
    },
    {
      title: "Meaningful insights, not vanity metrics",
      description: "You'll get clear, jargon-free reports that focus on the metrics that drive revenue, not just clicks or impressions."
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} py-16 md:py-20 px-4 md:px-8 lg:px-[120px] ${className}`}
    >
      <div className={`${lightBackground ? 'md:bg-[#f1fff5] md:rounded-[32px] md:py-12 md:px-12 md:overflow-hidden' : ''}`}>
        <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="max-w-[734px] w-full">
            <h2 
              ref={headingRef}
              className="text-[#001109] text-[32px] md:text-[42px] font-bold leading-[1.2] text-center"
            >
              Why clients say we&apos;re the &quot;real deal&quot;
            </h2>
          </div>
        </div>

        {/* Rows Container */}
        <div className="space-y-6 md:space-y-8 lg:space-y-5">
          {clientReasons.map((reason, index) => (
            <div
              key={index}
              ref={setRowRef(index)}
              className="flex flex-col lg:flex-row gap-2 md:gap-6 lg:gap-6"
            >
              {/* Desktop: Alternating layout, Mobile: Always title first */}
              {index % 2 === 0 ? (
                <>
                  {/* Title Card */}
                  <div className="bg-[#B6FFCE] rounded-[10px] p-5 lg:flex-shrink-0 lg:w-auto flex items-center">
                    <h3 className="text-[#00351F] text-[24px] lg:text-[32px] font-semibold leading-[1.25] lg:leading-[1.5] lg:whitespace-nowrap">
                      {reason.title}
                    </h3>
                  </div>
                  
                  {/* Description Card */}
                  <div className="bg-[#00351F] rounded-[10px] p-5 flex-grow flex items-center">
                    <p className="text-[#B6FFCE] text-[16px] leading-[1.5]">
                      {reason.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* On mobile, always show title first */}
                  <div className="bg-[#B6FFCE] rounded-[10px] p-5 lg:hidden flex items-center">
                    <h3 className="text-[#00351F] text-[24px] font-semibold leading-[1.25]">
                      {reason.title}
                    </h3>
                  </div>
                  
                  <div className="bg-[#00351F] rounded-[10px] p-5 lg:hidden flex items-center">
                    <p className="text-[#B6FFCE] text-[16px] leading-[1.5]">
                      {reason.description}
                    </p>
                  </div>

                  {/* Desktop: Reverse order */}
                  <div className="hidden lg:flex lg:flex-row lg:gap-8 lg:w-full">
                    {/* Description Card */}
                    <div className="bg-[#00351F] rounded-[10px] p-5 flex-grow flex items-center">
                      <p className="text-[#B6FFCE] text-[16px] leading-[1.5]">
                        {reason.description}
                      </p>
                    </div>
                    
                    {/* Title Card */}
                    <div className="bg-[#B6FFCE] rounded-[10px] p-5 flex-shrink-0 flex items-center">
                      <h3 className="text-[#00351F] text-[32px] font-semibold leading-[1.5] whitespace-nowrap">
                        {reason.title}
                      </h3>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}