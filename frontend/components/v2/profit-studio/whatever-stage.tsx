'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface WhateverStageProps {
  className?: string
}

export default function WhateverStage({ className = '' }: WhateverStageProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current[index] = el
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
          once: true,
        },
      })

      // Description animation
      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Cards stagger animation
      gsap.from(cardRefs.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Individual card content animations
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const elements = card.querySelectorAll('.animate-content')
          gsap.from(elements, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-[#00351f] relative rounded-3xl overflow-hidden ${className}`}
    >
      <div className="relative z-10 px-4 md:px-[120px] py-12 md:py-[48px]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start">
            {/* Left column - Title and description */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2
                  ref={headingRef}
                  className="font-bold text-[#b6ffce] text-3xl md:text-[42px] leading-[1.2]"
                >
                  Whatever stage you&apos;re in, we&apos;ll help you grow
                </h2>
              </div>

              <div
                ref={descriptionRef}
                className="text-white text-base leading-[1.5]"
              >
                <p className="mb-4">
                  We&apos;ve helped hundreds of startups—from scrappy bootstrappers to VC-backed ventures—launch and scale paid acquisition for the first time. With 10+ years of experience, including work inside Google&apos;s startup incubator, we bring battle-tested GTM strategy and a trusted network of vetted contractors.
                </p>
                <p>
                  Wherever you are in your journey, we&apos;ll help you grow—faster, smarter, and without wasting time or budget.
                </p>
              </div>
            </div>

            {/* Right column - Cards */}
            <div
              ref={cardsContainerRef}
              className="flex-1 flex flex-col gap-4"
            >
              {/* Who we work with card */}
              <div
                ref={setCardRef(0)}
                className="bg-[#f1fff5] rounded-[10px] p-6"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="animate-content font-semibold text-[#001109] text-lg md:text-2xl leading-[1.25] md:leading-[1.5]">
                    Who we work with
                  </h3>

                  <div className="animate-content text-[#001109] text-base leading-[1.5]">
                    <p className="mb-4">
                      We don&apos;t invest in categories—we invest in conviction. But here&apos;s what makes us lean in:
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Lead-gen driven businesses with marketing upside</li>
                      <li>Founders with a strong &ldquo;founder–market fit&rdquo; story</li>
                      <li>A differentiated product with signs of early traction</li>
                      <li>A space where we see growth opportunities that others don&apos;t</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Industries we're drawn to card */}
              <div
                ref={setCardRef(1)}
                className="bg-[#f1fff5] rounded-[10px] p-6"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="animate-content font-semibold text-[#001109] text-lg md:text-2xl leading-[1.25] md:leading-[1.5]">
                    Industries we&apos;re drawn to:
                  </h3>

                  <div className="animate-content text-[#001109] text-base leading-[1.5]">
                    <ul className="list-disc ml-6 space-y-1">
                      <li>EdTech</li>
                      <li>MarTech</li>
                      <li>SalesTech</li>
                      <li>Services that sell online (B2B or B2C)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration - subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00351f] via-[#00351f] to-[#004d2e] opacity-50 pointer-events-none" />
    </section>
  )
}