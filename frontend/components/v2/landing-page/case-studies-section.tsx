'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const sora = Sora({ subsets: ['latin'] })

// Asset URLs from Figma
const dromoLogo = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137505/logo3_webuzi.png"
const juiceLogo = "http://localhost:3845/assets/3a1e34370094b14c61faeb5eedc7fce0c82394d9.png"
const meetingPulseLogo = "http://localhost:3845/assets/585d75176e8f46a2f2f49fa1457305473b7ff904.png"
const arrowIcon = "http://localhost:3845/assets/77a3d484ec8d4491a485cf57d73969b48c67d2e8.svg"

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudiesSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef(null)

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

      // Button animation
      gsap.from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const caseStudies = [
    {
      title: "How a CSV importer platform cut their ad spend by 50% while getting more high-quality leads",
      category: "B2B SaaS, Google Ads",
      logo: dromoLogo,
      logoStyle: {
        backgroundPosition: "center",
        backgroundSize: "contain"
      },
      slug: "dromo-case-study"
    },
    {
      title: "How a Gen AI flashcard platform got 5x ROI from Google Ads within 1 month and hit record revenue",
      category: "B2B SaaS, Google Ads", 
      logo: juiceLogo,
      logoStyle: {
        backgroundPosition: "2.91% 0%",
        backgroundSize: "71.62% 100%"
      },
      slug: "juice-case-study"
    },
    {
      title: "How I helped a leading audience engagement platform optimize Google Ads for high-value leads",
      category: "B2B SaaS, Google Ads",
      logo: meetingPulseLogo,
      logoStyle: {
        backgroundPosition: "1.98% 0%",
        backgroundSize: "58.44% 100%"
      },
      slug: "meeting-pulse-case-study"
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} bg-white py-16 md:py-20`}
    >
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#00351F] rounded-[20px] lg:rounded-[32px] py-12 lg:py-20 px-5 lg:px-8 relative">
          <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <h2 
            ref={headingRef}
            className="text-white text-[32px] lg:text-[42px] font-bold leading-[1.2] text-center"
          >
            Our work in the numbers
          </h2>
        </div>

        {/* Case Studies Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="bg-[#006840] rounded-[10px] px-6 lg:px-12 py-8 lg:h-[380px] flex flex-col gap-6 lg:justify-between relative border border-[#B6FFCE]"
            >
              {/* Content */}
              <div className="flex flex-col gap-4">
                <div className="text-[#B6FFCE] text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]">
                  CASE STUDY
                </div>
                
                <h3 className="text-white text-[18px] font-normal leading-[1.5]">
                  {study.title}
                </h3>
                
                <p className="text-[#B6FFCE] text-[14px] font-normal leading-[1.5]">
                  {study.category}
                </p>

                {/* Logo Container */}
                <div className="h-[75px] w-full flex items-center justify-start lg:justify-center">
                  <div 
                    className="w-[124.5px] h-[47.815px] bg-no-repeat"
                    style={{
                      backgroundImage: `url('${study.logo}')`,
                      ...study.logoStyle
                    }}
                  />
                </div>
              </div>

              {/* Read More Button */}
              <Link 
                href={`/case-studies/${study.slug}`}
                className="flex items-center gap-[5px] text-[#FFBA0A] hover:opacity-80 transition-opacity"
              >
                <span className="text-[16px] font-semibold leading-[1.5]">
                  Read more
                </span>
                <div className="w-4 h-0 relative">
                  <img 
                    src={arrowIcon} 
                    alt="" 
                    className="absolute bottom-[-7.36px] left-0 w-4 h-[14.72px]"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* More Case Studies Button */}
        <div className="flex justify-center">
          <Link
            ref={buttonRef}
            href="/case-studies"
            className="border-2 border-[#FFBA0A] text-white px-8 py-3.5 rounded-[2px] hover:bg-[#FFBA0A] hover:text-[#00351F] transition-colors w-full lg:w-auto text-center"
          >
            <span className="text-[14px] font-semibold leading-[1.5]">
              More case studies
            </span>
          </Link>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}