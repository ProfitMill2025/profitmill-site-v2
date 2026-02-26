'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Background shapes SVGs as data URIs for better performance
const shapes = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='49' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='35' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='25' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='15' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='10' stroke='%23B6FFCE' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E"
]

interface WhatIsProfitStudioProps {
  title?: string
  description?: string
  cards?: Array<{
    title: string
    description: string
  }>
}

export default function WhatIsProfitStudio({
  title = "What is Profit Studio?",
  description = "Profit Studio is the venture arm of Profit Mill. We partner with select founders in two ways:",
  cards = [
    {
      title: "Angel Investing",
      description: "We back the best with capital and conviction."
    },
    {
      title: "Startup Studio",
      description: "We roll up our sleeves, join your team, and help you grow—fast."
    }
  ]
}: WhatIsProfitStudioProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Cards animation with stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 60%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`${sora.className} bg-white relative flex gap-20 items-center justify-center px-4 md:px-[120px] py-12 md:py-[48px] w-full overflow-hidden`}
    >
      {/* Background Shapes - positioned absolutely */}
      <div className="absolute right-[-200px] md:right-[-400px] lg:right-[-600px] top-1/2 -translate-y-1/2 w-[800px] md:w-[1000px] lg:w-[1256px] h-[800px] md:h-[1000px] lg:h-[1256px] pointer-events-none">
        {shapes.map((shape, index) => (
          <img
            key={index}
            src={shape}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `scale(${1 - index * 0.1})`,
            }}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1120px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20">
        {/* Left Column - Title and Description */}
        <div ref={contentRef} className="flex flex-col gap-6 max-w-[520px]">
          <h2 className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-[#001109]">
            {title}
          </h2>
          <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
            {description}
          </p>
        </div>

        {/* Right Column - Cards */}
        <div ref={cardsRef} className="flex flex-col gap-4 max-w-[520px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#F1FFF5] rounded-[10px] p-6 flex flex-col gap-4"
            >
              <h3 className="font-semibold text-[24px] leading-[1.5] text-[#001109]">
                {card.title}
              </h3>
              <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}