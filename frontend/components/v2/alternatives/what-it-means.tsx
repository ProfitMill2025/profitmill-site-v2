'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface WhatItMeansProps {
  className?: string
}

interface CardData {
  number: string
  title: string
  description: string
}

const cardsData: CardData[] = [
  {
    number: '1',
    title: 'Strategy based on insider knowledge, not guesswork.',
    description: "Most agencies rely on limited experience and trial & error. We've seen behind the curtain at Google and LinkedIn, which means we know how leading ad platforms measure success, and which strategies drive profitable growth over time."
  },
  {
    number: '2',
    title: 'Paid ad specialists, not marketing generalists.',
    description: 'A lot of agencies try to do everything: SEO, web design, content, paid ads. We focus on paid ads for B2B businesses, with deep expertise in Google and LinkedIn. If paid ads are your growth lever, you want specialists, not generalists.'
  },
  {
    number: '3',
    title: 'Communication that matches your speed.',
    description: "Most agencies make you save your questions for the weekly call or charge extra for access. We think open lines of communication are crucial. That's why we give every client direct Slack access for real-time answers and quick feedback, no limits or add-on fees"
  },
  {
    number: '4',
    title: 'Profit is the KPI that matters.',
    description: "Plenty of agencies send reports full of impressions and click-through rates. But paid ads are expensive, and the only metric that really matters is whether they drive profit. That's why we called ourselves Profit Mill, because if the ads don't pay off, nothing else matters."
  },
  {
    number: '5',
    title: 'Pricing that reflects value, not bloat.',
    description: "We're not as cheap as a freelancer, but our pricing gives you access to top-tier expertise without the agency bloat. We don't charge setup fees, run fully remote, and invest where it matters—in tracking, strategy, and execution."
  }
]

export default function WhatItMeans({ className = '' }: WhatItMeansProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
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

      // Cards stagger animation
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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
      className={`${sora.className} bg-white py-12 md:py-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-12 items-center">
          {/* Heading */}
          <div ref={headingRef} className="w-full">
            <h2 className="font-semibold text-[#001109] text-[18px] md:text-[24px] leading-[1.25] md:leading-[1.5] text-center">
              Here&apos;s what that means in practice:
            </h2>
          </div>

          {/* Cards Container - Desktop: 3-2 layout, Mobile: Stack */}
          <div className="w-full">
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col gap-8">
              {/* First Row - 3 cards */}
              <div className="grid grid-cols-3 gap-8">
                {cardsData.slice(0, 3).map((card, index) => (
                  <div
                    key={index}
                    ref={setCardRef(index)}
                    className="bg-[#006840] rounded-[10px] p-6 lg:px-6 lg:pt-6 lg:pb-12 flex flex-col gap-8"
                  >
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-2">
                        <div className="text-[#b6ffce] font-semibold text-[18px] leading-[1.25] text-center">
                          {card.number}
                        </div>
                        <div className="text-white font-bold text-[18px] leading-[1.5] text-center">
                          {card.title}
                        </div>
                      </div>
                      <div className="text-white font-normal text-[16px] leading-[1.5] text-center">
                        {card.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row - 2 cards centered */}
              <div className="flex justify-center gap-8">
                {cardsData.slice(3, 5).map((card, index) => (
                  <div
                    key={index + 3}
                    ref={setCardRef(index + 3)}
                    className="bg-[#006840] rounded-[10px] p-6 flex flex-col gap-8 w-[352px]"
                  >
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-2">
                        <div className="text-[#b6ffce] font-semibold text-[18px] leading-[1.25] text-center">
                          {card.number}
                        </div>
                        <div className="text-white font-bold text-[18px] leading-[1.5] text-center">
                          {card.title}
                        </div>
                      </div>
                      <div className="text-white font-normal text-[16px] leading-[1.5] text-center">
                        {card.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout - All cards stack */}
            <div className="flex md:hidden flex-col gap-4">
              {cardsData.map((card, index) => (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  className="bg-[#006840] rounded-[10px] px-6 pt-6 pb-12 flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-[#b6ffce] font-semibold text-[18px] leading-[1.25] text-center">
                        {card.number}
                      </div>
                      <div className="text-white font-semibold text-[18px] leading-[1.25] text-center">
                        {card.title}
                      </div>
                    </div>
                    <div className="text-white font-normal text-[16px] leading-[1.5] text-center">
                      {card.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}