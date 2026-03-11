'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

const img = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758038125/x_mqdvbe.svg"

const notReadySigns = [
  {
    text: "Still testing for product-market fit and haven't found your ideal audience."
  },
  {
    text: "Hoping for overnight results without investing long enough to see performance grow (3+ months)."
  },
  {
    text: "Expecting paid ads to be a silver bullet that fixes churn, cash flow, or market conditions."
  }
]

interface HowToTellProps {
  className?: string
}

export default function HowToTell({ className = '' }: HowToTellProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
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

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 30,
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

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white text-black py-12 px-4 md:py-20 md:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex gap-20 items-center">
          {/* Left Column - Heading */}
          <div className="flex-1">
            <h2
              ref={headingRef}
              className="font-bold text-[42px] leading-[1.2] text-[#001109] mb-8"
            >
              Are you ready to work with a paid ads agency? Here&apos;s how to tell:
            </h2>

            {/* Book a call button */}
            <button
              onClick={() => window.open('https://app.hellobonsai.com/s/profitmill/paidadsaudit', '_blank')}
              className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors px-8 py-3.5 rounded-[2px] cursor-pointer"
            >
              <span className="font-semibold text-[14px] text-black">
                Book a call
              </span>
            </button>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div
              ref={subtitleRef}
              className="font-semibold text-[24px] leading-[1.5] text-[#001109]"
            >
              Not every business is ready to make paid ads work. We&apos;re not the right fit if you&apos;re:
            </div>

            <div className="flex flex-col gap-4">
              {notReadySigns.map((sign, index) => (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  className="flex gap-8 items-center p-6 rounded-[10px]"
                >
                  <div className="relative shrink-0 w-12 h-12">
                    <Image
                      src={img}
                      alt="X icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                      {sign.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-8">
          {/* Mobile Heading */}
          <div>
            <h2
              ref={headingRef}
              className="font-bold text-[32px] leading-[1.2] text-[#001109]"
            >
              Are you ready to work with a paid ads agency? Here&apos;s how to tell:
            </h2>
          </div>

          {/* Mobile Content */}
          <div className="flex flex-col gap-6">
            <div
              ref={subtitleRef}
              className="font-semibold text-[18px] leading-[1.25] text-[#001109]"
            >
              Not every business is ready to make paid ads work. We&apos;re not the right fit if you&apos;re:
            </div>

            <div className="flex flex-col gap-4">
              {notReadySigns.map((sign, index) => (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  className="flex flex-col gap-6 items-center justify-center p-6 rounded-[10px]"
                >
                  <div className="relative shrink-0 w-12 h-12">
                    <Image
                      src={img}
                      alt="X icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full">
                    <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                      {sign.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Book a call button */}
            <div className="mt-8">
              <button
                onClick={() => window.open('https://app.hellobonsai.com/s/profitmill/paidadsaudit', '_blank')}
                className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors px-8 py-3.5 rounded-[2px] w-full cursor-pointer"
              >
                <span className="font-semibold text-[14px] text-black">
                  Book a call
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}