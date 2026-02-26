'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

// Image constants from Figma
const imgCheck = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758252229/check_dgi0ah.svg"

gsap.registerPlugin(ScrollTrigger)

interface WhyChooseProps {
  title?: string
  description?: string
}

export default function WhyChoose({
  title = "Why top B2B teams choose Profit Mill",
  description = `You don't need another agency chasing clicks or running on autopilot. You need a strategic partner you can trust to drive real growth.

After managing 1,000+ ad accounts at Google, we built Profit Mill to be the agency we wish existed—one built for outcomes, not optics.

Here's what that means for you:`
}: WhyChooseProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
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

      // Description animation
      gsap.from(descriptionRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
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

  const benefits = [
    {
      title: "Clear tracking from day one",
      description: "so every dollar spent ties back to revenue, not just traffic."
    },
    {
      title: "Full-funnel strategy",
      description: "that aligns your ads, messaging, landing pages, and buyer journey."
    },
    {
      title: "Regular performance insights and async updates",
      description: "that keep growth moving—without waiting for a meeting."
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white py-12 md:py-20 px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Desktop Layout: Two Columns */}
        <div className="hidden md:flex gap-20 items-center max-w-[1120px] mx-auto">
          {/* Left Column - Content */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2
                ref={headingRef}
                className="font-bold text-[42px] leading-[1.2] text-[#001109]"
              >
                {title}
              </h2>
            </div>
            <div
              ref={descriptionRef}
              className="font-normal text-[16px] leading-[1.5] text-[#001109] whitespace-pre-line"
            >
              {description}
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  className="bg-[#f1fff5] box-border flex gap-8 items-center justify-center px-6 py-12 rounded-[10px]"
                >
                  <div className="flex-shrink-0 size-12">
                    <img
                      src={imgCheck}
                      alt="Check icon"
                      className="w-full h-full max-w-none"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-4 items-start justify-center">
                    <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                      <span className="font-bold">{benefit.title}</span>
                      <span> {benefit.description}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout: Single Column */}
        <div className="md:hidden flex flex-col gap-8 max-w-[1120px] mx-auto">
          {/* Header Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2
                ref={headingRef}
                className="font-bold text-[32px] leading-[1.2] text-[#001109]"
              >
                {title}
              </h2>
            </div>
            <div
              ref={descriptionRef}
              className="font-normal text-[16px] leading-[1.5] text-[#001109] whitespace-pre-line"
            >
              {description}
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  ref={setCardRef(index + 3)} // Offset for mobile refs
                  className="bg-[#f1fff5] box-border flex flex-col gap-6 items-center justify-center p-6 rounded-[10px]"
                >
                  <div className="flex-shrink-0 size-12">
                    <img
                      src={imgCheck}
                      alt="Check icon"
                      className="w-full h-full max-w-none"
                    />
                  </div>
                  <div className="flex flex-col gap-4 items-start justify-center w-full">
                    <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                      <span className="font-bold">{benefit.title}</span>
                      <span> {benefit.description}</span>
                    </p>
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