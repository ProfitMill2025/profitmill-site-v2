'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ClutchWidget from '@/components/v2/clutch-widget'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Background 3D image from Cloudinary
const img1 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1756844385/00b2276afac21c91f3bf88b1d7a4bf2618953099_of0fav.png"

interface PageHeaderProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  onButtonClick?: () => void
  showClutchBadge?: boolean
  className?: string
}

export default function PageHeader({
  title = "Paid ads that pay for themselves",
  description = "Want ads that bring leads, not just traffic? Profit Mill sets you up with everything—from strategy to tracking—so your paid ads drive real growth.",
  buttonText = "Get a free paid ads audit",
  buttonLink,
  onButtonClick,
  showClutchBadge = true,
  className = ''
}: PageHeaderProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const ctaRef = useRef(null)
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

      // Description animation
      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
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
        <div 
          ref={backgroundRef}
          className="bg-[#00351f] box-border content-stretch flex flex-col isolate items-center justify-center overflow-clip px-0 py-14 md:py-[104px] relative rounded-[20px] md:rounded-[32px] size-full"
        >
          {/* Main Content */}
          <div className="box-border content-stretch flex flex-col gap-12 items-center justify-center px-5 md:px-8 py-0 relative shrink-0 w-full z-[5]">
            {/* Headline Section */}
            <div className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0 w-full">
              <h1
                ref={headingRef}
                className="font-bold leading-[1.2] relative shrink-0 text-[40px] md:text-[72px] text-center text-white tracking-[0.5px] md:tracking-[0.72px] w-full max-w-4xl"
              >
                {title}
              </h1>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="font-normal leading-[1.5] relative shrink-0 text-[16px] md:text-[22px] text-center text-white w-full max-w-4xl"
            >
              {description}
            </p>

            {/* CTA Section */}
            {(buttonText || showClutchBadge) && (
              <div
                ref={ctaRef}
                className="content-stretch flex flex-col gap-8 items-center justify-start relative shrink-0 w-full md:w-auto"
              >
                {buttonText && (
                  <button
                    onClick={() => {
                      if (buttonLink && buttonLink.startsWith('#')) {
                        // Smooth scroll to anchor
                        const element = document.querySelector(buttonLink)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      } else if (buttonLink) {
                        window.open(buttonLink, '_blank')
                      } else if (onButtonClick) {
                        onButtonClick()
                      }
                    }}
                    className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors box-border content-stretch flex gap-2.5 items-center justify-center px-8 py-3.5 relative rounded-[2px] shrink-0 w-full md:w-auto"
                  >
                    <span className="flex flex-col font-semibold justify-center leading-[1.5] relative shrink-0 text-[14px] text-black text-center text-nowrap">
                      {buttonText}
                    </span>
                  </button>
                )}

                {showClutchBadge && (
                  <ClutchWidget />
                )}
              </div>
            )}
          </div>

          {/* Background Images */}
          <div 
            className="absolute bg-center bg-cover bg-no-repeat h-[1725.6px] left-[-690px] mix-blend-lighten opacity-50 top-[66px] w-[1409.6px] z-[2] pointer-events-none"
            style={{ backgroundImage: `url('${img1}')` }}
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