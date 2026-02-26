'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

export default function HowIDoThings() {
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
        duration: 1,
        delay: 0.2,
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

  const profitSteps = [
    {
      letter: "P",
      title: "Positioning clarity:",
      description: "We start by nailing who you are for and why buyers should click, so every ad attracts the right type of customer (and filters out the wrong ones)."
    },
    {
      letter: "R",
      title: "Revenue attribution:",
      description: "No matter your pricing plan, we implement complete conversion tracking that ties every impression, click, call, and deal back to actual revenue."
    },
    {
      letter: "O",
      title: "Omnichannel targeting:",
      description: "Nurture audiences by appearing across search, social, and review sites so you remain top-of-mind when they're ready to buy."
    },
    {
      letter: "F",
      title: "Funnel velocity:",
      description: "We optimize each step—from ad copy to landing page—to make it easier for potential buyers to convert."
    },
    {
      letter: "I",
      title: "Intent activation:",
      description: "Capture existing demand and create new demand with tailored content and offers."
    },
    {
      letter: "T",
      title: "Testing for scale:",
      description: "Structured experiments iterate creative, bids, and audiences every week, not once a quarter."
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} py-16 md:py-20 px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start lg:items-center">
          {/* Left side - Copy */}
          <div className="flex-1">
            <div className="flex flex-col gap-5">
              <h2 
                ref={headingRef}
                className="text-[#001109] text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.2]"
              >
                How we do things with The PROFIT Plan™
              </h2>
              <p 
                ref={subheadingRef}
                className="text-[#001109] text-base md:text-lg lg:text-[22px] leading-[1.5]"
              >
                <span>The PROFIT Plan</span>
                <span className="text-sm align-super">™</span>
                <span> is our foundational framework for launching, optimizing, and scaling your paid ads.</span>
              </p>
            </div>
          </div>

          {/* Right side - PROFIT Steps */}
          <div className="flex-1">
            <div className="space-y-4">
              {profitSteps.map((step, index) => (
                <div
                  key={index}
                  ref={setRowRef(index)}
                  className="flex gap-2 md:gap-4 items-stretch"
                >
                  {/* Letter */}
                  <div className="bg-[#006840] rounded-[10px] px-[30px] py-5 flex items-center justify-center min-w-[80px] w-20">
                    <span className="text-[#b6ffce] text-2xl md:text-[32px] font-semibold leading-[1.5]">
                      {step.letter}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-[#006840] rounded-[10px] px-6 py-4 flex-1 flex items-center">
                    <p className="text-white text-base leading-[1.5]">
                      <span className="font-bold">{step.title}</span>
                      <span> {step.description}</span>
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