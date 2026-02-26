'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface WhatWeStandForProps {
  className?: string
}

export default function WhatWeStandFor({ className = '' }: WhatWeStandForProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
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

      // Subheading animation
      gsap.from(subheadingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Row stagger animation
      gsap.from(rowsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const values = [
    {
      title: "Tell it like it is",
      description: "We speak our minds because we care. Clear direct feedback is how we move faster, collaborate better, and build a partnership based on trust (and performance)."
    },
    {
      title: "Be a true partner",
      description: "We never leave you wondering where things stand. Expect Slack access, regular calls, async updates, and unlimited questions — because growth doesn't wait for a scheduled meeting."
    },
    {
      title: "Keep it realistic",
      description: "We'd rather exceed expectations than inflate them. Our goals are always realistic, time-based, and measurable, not just what sounds good on a sales call."
    },
    {
      title: "Deliver outcomes not optics",
      description: "We don't do busywork or chase vanity metrics. Every move we make is tied to real business goals—and we expect the same from the teams we work with."
    },
    {
      title: "Know when to walk away",
      description: "We operate on a monthly model, no long-term lock-ins. If it's not a cultural or strategic fit, we can part ways. And if we're not adding value, we'll bow out before your budget pays the price."
    },
    {
      title: "Stay curious and keep evolving",
      description: "We know what works, but we're also obsessed with what's next. Whether it's AI or the latest marketing trends, we stay curious and keep evolving—because the best agencies don't sit still."
    },
    {
      title: "Own the results",
      description: "We own the wins, the misses, and everything in between—because trust takes months to earn and seconds to lose. And we're here for the long game."
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} bg-white text-black py-12 md:py-16 px-4 md:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <h2 
            ref={headingRef}
            className="font-bold text-[#001109] leading-[1.2] mb-6"
            style={{ 
              fontSize: 'clamp(32px, 4vw, 42px)' 
            }}
          >
            What we stand for
          </h2>
          <p 
            ref={subheadingRef}
            className="font-normal text-[#001109] text-lg leading-[1.5]"
          >
            These are the values we live by
          </p>
        </div>

        {/* Values Grid */}
        <div className="space-y-4 md:space-y-6">
          {values.map((value, index) => (
            <div 
              key={index}
              ref={setRowRef(index)}
              className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-8"
            >
              {/* Desktop Layout */}
              <div className="hidden md:flex w-full gap-6 lg:gap-8">
                {index % 2 === 0 ? (
                  <>
                    {/* Title on left */}
                    <div className="bg-[#b6ffce] rounded-[10px] p-5 flex items-center justify-start flex-shrink-0 min-w-[280px] lg:min-w-[320px]">
                      <h3 className="font-semibold text-[#00351f] text-2xl lg:text-[32px] leading-[1.5] whitespace-nowrap">
                        {value.title}
                      </h3>
                    </div>
                    {/* Description on right */}
                    <div className="bg-[#00351f] rounded-[10px] p-5 flex items-center justify-center flex-1">
                      <p className="font-normal text-[#b6ffce] text-base leading-[1.5]">
                        {value.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Description on left */}
                    <div className="bg-[#00351f] rounded-[10px] p-5 flex items-center justify-center flex-1">
                      <p className="font-normal text-[#b6ffce] text-base leading-[1.5]">
                        {value.description}
                      </p>
                    </div>
                    {/* Title on right */}
                    <div className="bg-[#b6ffce] rounded-[10px] p-5 flex items-center justify-start flex-shrink-0 min-w-[280px] lg:min-w-[320px]">
                      <h3 className="font-semibold text-[#00351f] text-2xl lg:text-[32px] leading-[1.5] whitespace-nowrap">
                        {value.title}
                      </h3>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-2">
                {/* Title */}
                <div className="bg-[#b6ffce] rounded-[10px] p-5">
                  <h3 className="font-semibold text-[#00351f] text-2xl leading-[1.25]">
                    {value.title}
                  </h3>
                </div>
                {/* Description */}
                <div className="bg-[#00351f] rounded-[10px] p-5">
                  <p className="font-normal text-[#b6ffce] text-base leading-[1.5]">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}