'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
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
    <section ref={sectionRef} className={`${sora.className} bg-white text-black flex flex-col justify-center py-16 px-4 md:py-16 md:px-8`}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 ref={headingRef} className="text-[#001109] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-12 lg:mb-12 leading-tight text-center">
          You don&apos;t just want more leads, you want more revenue
        </h2>
        
        <p ref={subheadingRef} className="text-lg md:text-lg mb-12 md:mb-8 lg:mb-10 text-center">
          Clients come to Profit Mill when they want to:
        </p>

        <div className="space-y-4 md:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Scale Revenue Card */}
          <div ref={setCardRef(0)} className="bg-[#E7FFF5] rounded-2xl p-6">
            <div className="md:grid md:grid-cols-3 md:gap-8 lg:block md:items-center">
              <h2 className="text-[#006840] text-xl md:text-2xl font-medium mb-4 md:mb-0 lg:mb-4 text-center md:text-left lg:text-center">
                Scale profit,<br />not just ad spend
              </h2>
              <div className="relative w-full aspect-video mb-6 md:mb-0 lg:mb-8">
                <Image
                  src="/intro-photo1.png"
                  alt="Upward trending arrow graph"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm md:text-base text-center md:text-left lg:text-center">
                <strong>You&apos;re paying for clicks—but aren&apos;t making sales.</strong> We help fix the funnel to attract the right leads at the right price, so you can scale profitably.
              </p>
            </div>
          </div>

          {/* Strategic Expertise Card */}
          <div ref={setCardRef(1)} className="bg-[#E7FFF5] rounded-2xl p-6">
            <div className="md:grid md:grid-cols-3 md:gap-8 lg:block md:items-center">
              <h2 className="text-[#006840] text-xl md:text-2xl font-medium mb-4 md:mb-0 lg:mb-4 text-center md:text-left lg:text-center">
                Lean on a growth<br />partner
              </h2>
              <div className="relative w-full aspect-video mb-6 md:mb-0 lg:mb-8">
                <Image
                  src="https://res.cloudinary.com/dzn9bpr2h/image/upload/v1766505353/Frame_124_bpeask.png"
                  alt="Strategic expertise illustration"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm md:text-base text-center md:text-left lg:text-center">
                <strong>You&apos;re not sure what works—and guessing is expensive.</strong> With 8+ years of experience working with (and for) major ad platforms, we know what drives growth and what wastes budget.
              </p>
            </div>
          </div>

          {/* Navigate Challenges Card */}
          <div ref={setCardRef(2)} className="bg-[#E7FFF5] rounded-2xl p-6">
            <div className="md:grid md:grid-cols-3 md:gap-8 lg:block md:items-center">
              <h2 className="text-[#006840] text-xl md:text-2xl font-medium mb-4 md:mb-0 lg:mb-4 text-center md:text-left lg:text-center">
                Gain insights to help<br />you grow
              </h2>
              <div className="relative w-full aspect-video mb-6 md:mb-0 lg:mb-8">
                <Image
                  src="/intro-photo3.png"
                  alt="Spiral arrow indicating navigation"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm md:text-base text-center md:text-left lg:text-center">
                <strong>You&apos;re running paid ads—but can&apos;t tie it to revenue.</strong> We give you clear attribution and regular insights to show you exactly where your spend is (or isn&apos;t) working.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
