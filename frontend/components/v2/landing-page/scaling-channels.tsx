'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

// Default arrow component
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B6FFCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
)

// Hover arrow component
const HoverArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <path d="M16.7071 8.86091C17.0976 8.47039 17.0976 7.83722 16.7071 7.4467L10.3431 1.08274C9.95262 0.692216 9.31946 0.692216 8.92893 1.08274C8.53841 1.47326 8.53841 2.10643 8.92893 2.49695L14.5858 8.15381L8.92893 13.8107C8.53841 14.2012 8.53841 14.8344 8.92893 15.2249C9.31946 15.6154 9.95262 15.6154 10.3431 15.2249L16.7071 8.86091ZM0 8.15381L8.74228e-08 9.15381L16 9.15381L16 8.15381L16 7.15381L-8.74228e-08 7.15381L0 8.15381Z" fill="#CEFF00"/>
  </svg>
)

gsap.registerPlugin(ScrollTrigger)

export default function ScalingChannels() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  const channels = [
    {
      title: "Google Ads",
      description: "Turn the world's most popular search engine into a revenue driver with full-funnel campaigns that attract high-intent traffic and convert it into paying customers.",
      href: "/what-we-do/google-ads"
    },
    {
      title: "LinkedIn Ads",
      description: "Reach the right customers with the most targeted ad platform. Craft campaigns and ABM strategies that cut through the noise, establish credibility, and convert decision-makers.",
      href: "/what-we-do/linkedin-ads"
    },
    {
      title: "Other paid channels",
      description: "From Bing to Reddit to G2, we help you test, expand, and win across the right mix of platforms—not just the obvious ones.",
      href: "/what-we-do"
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} bg-white py-16 md:py-20 px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left side - Heading */}
          <div className="flex-1">
            <h2
              ref={headingRef}
              className="text-[#001109] text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.2] text-left"
            >
              Start scaling on the right channels
            </h2>
          </div>

          {/* Right side - Channel Cards */}
          <div className="flex-1">
            <div className="space-y-4">
              {channels.map((channel, index) => (
                <Link
                  key={index}
                  href={channel.href}
                  className="block"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    ref={setCardRef(index)}
                    className={`rounded-[10px] px-6 py-4 transition-colors duration-200 ${
                      hoveredIndex === index
                        ? 'bg-[#00351f]'
                        : 'bg-[#006840]'
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      {/* Title with arrow */}
                      <div className="flex items-center gap-2">
                        <h3 className="text-white text-2xl font-semibold leading-[1.5]">
                          {channel.title}
                        </h3>
                        <div className="w-4 h-4 flex-shrink-0">
                          {hoveredIndex === index ? <HoverArrowIcon /> : <ArrowIcon />}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white text-base leading-[1.5]">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}