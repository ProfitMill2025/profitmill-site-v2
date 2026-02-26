'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Asset constants (using Cloudinary for production images)
const img3D021 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1756844385/00b2276afac21c91f3bf88b1d7a4bf2618953099_of0fav.png"

interface AboutHeroProps {
  className?: string
}

export default function AboutHero({ className = '' }: AboutHeroProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background container animation
      gsap.from(backgroundRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
        },
      })

      // Heading animation
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Subheading animation
      gsap.from(subheadingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} pt-[120px] md:pt-[161px] pb-8 bg-white ${className}`}
    >
      <div className="mx-auto px-4 md:px-8">
        {/* Hero Container */}
        <div 
          ref={backgroundRef}
          className="bg-[#00351f] relative overflow-hidden rounded-[32px] py-12 md:py-16 lg:py-20"
        >
          {/* Main Content */}
          <div className="flex flex-col gap-12 items-center justify-center text-center px-4 md:px-8 relative z-10">
            {/* Headline Section */}
            <div className="w-full max-w-4xl">
              <h1 
                ref={headingRef}
                className="font-bold leading-[1.2] text-[50px] sm:text-[60px] lg:text-[72px] text-white tracking-[0.72px]"
              >
                We&apos;re here to drive profit, not ad spend
              </h1>
            </div>

            {/* Description */}
            <p 
              ref={subheadingRef}
              className="font-normal leading-[1.5] max-w-4xl text-[16px] sm:text-[20px] lg:text-[22px] text-white"
            >
              Profit Mill helps high-growth teams turn ad spend into actual revenue with fully-integrated paid media campaigns.
            </p>
          </div>

          {/* Background Images */}
          <div 
            className="absolute inset-0 md:bg-center md:bg-cover bg-center bg-cover bg-no-repeat md:h-[1200px] md:left-[-300px] mix-blend-lighten opacity-50 md:top-[100px] md:w-[900px] z-[2] pointer-events-none"
            style={{ backgroundImage: `url('${img3D021}')` }}
          />
          <div 
            className="hidden md:block absolute w-[1454px] h-[1454px] right-[-952px] top-[-256px] rounded-full z-[1] pointer-events-none"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #B6FFCE 0%, #006840 49.04%, #00351F 100%)',
              filter: 'blur(250px)'
            }}
          />
        </div>
      </div>
    </section>
  )
}