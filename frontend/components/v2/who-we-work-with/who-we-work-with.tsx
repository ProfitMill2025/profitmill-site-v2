'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Arrow icon
const arrowIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758384287/Vector_4_tcrwdz.svg"

// Cloudinary images
const b2bSaasImg = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758037139/img_wpmw50.svg"
const plgImg = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758037026/img_vabbym.svg"
const servicesImg = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758037171/img_vf8g1q.svg"

interface WhoWeWorkWithProps {
  className?: string
}

export default function WhoWeWorkWith({ className = '' }: WhoWeWorkWithProps) {
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

  const businessTypes = [
    {
      title: "Great product but blowing the budget on acquisition? We can fix that.",
      description: "For product-led companies, attribution is messy, CAC is high, and investing in paid often feels like a gamble. We bring clarity and control with server-side tracking, milestone-based bidding, and strategy designed to turn trial users into long-term revenue.",
      points: [
        "Ideal for: PLG teams with clear PMF and budget to test and scale",
        "Results: Lower CAC, better buyer targeting, faster feedback loops"
      ],
      linkText: "Learn more about PLG companies",
      linkUrl: "/who-we-work-with/paid-ads-plg-companies",
      visualType: "PLG",
      position: "left"
    },
    {
      title: "Ads that drive sales, not just fill your CRM? We help you sell SaaS.",
      description: "If you're running a sales-led motion, you've likely paid for more bad leads than you'd like to admit. We help SaaS teams clean up attribution, improve lead quality, and connect ad spend directly to pipeline.",
      points: [
        "Ideal for: Sales-led SaaS companies with high ACV and complex buying journey",
        "Results: Better-qualified leads, faster follow-up, clearer ROI"
      ],
      linkText: "Learn more about B2B SaaS",
      linkUrl: "/who-we-work-with/paid-ads-b2b-saas",
      visualType: "B2B SaaS",
      position: "right"
    },
    {
      title: "Struggling to turn clicks into customers? We help you build trust.",
      description: "For service businesses, it's not about traffic—it's about trust. We help teams close the gap from attention to action by improving lead quality, tracking the online and offline buyer journey, and helping your team close more of what comes in.",
      points: [
        "Ideal for: Lead-hungry service businesses with multi-touch sales cycles",
        "Results: Higher close rates, cleaner attribution, better lead quality"
      ],
      linkText: "Learn more about service businesses",
      linkUrl: "/who-we-work-with/paid-ads-service-businesses",
      visualType: "SERVICES",
      position: "left"
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white py-12 px-5 md:py-20 md:px-8 lg:px-[120px] ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 md:mb-20 text-center">
          <h2
            ref={headingRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-[#001109] mb-4 md:mb-6"
          >
            Stop wasting money on ads that fall flat
          </h2>

          
          <p
            ref={descriptionRef}
            className="font-normal text-[18px] leading-[1.5] text-[#001109] max-w-4xl mx-auto"
          >
            Cut wasted spend and low-quality leads, track the right metrics, and see traceable revenue gains with campaigns driven by paid ad experts.
          </p>
        </div>

        {/* Business Types */}
        <div className="flex flex-col gap-12 md:gap-20">
          {businessTypes.map((businessType, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className={`flex flex-col gap-8 items-center ${
                businessType.position === 'right'
                  ? 'lg:flex-row-reverse'
                  : 'lg:flex-row'
              } lg:gap-20`}
            >
              {/* Visual */}
              <div className="bg-[#00351f] overflow-hidden relative rounded-[10px] md:rounded-[20px] w-full max-w-[450px] aspect-square flex-shrink-0">
                {/* Background Shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {businessType.visualType === "PLG" && (
                    <div className="absolute inset-0">
                      <Image
                        alt="PLG visualization"
                        src={plgImg}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  {businessType.visualType === "B2B SaaS" && (
                    <div className="absolute inset-0">
                      <Image
                        alt="B2B SaaS visualization"
                        src={b2bSaasImg}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  {businessType.visualType === "SERVICES" && (
                    <div className="absolute inset-0">
                      <Image
                        alt="Services visualization"
                        src={servicesImg}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[18px] md:text-[24px] leading-[1.25] md:leading-[1.5] text-[#001109] mb-4 md:mb-6">
                  {businessType.title}
                </h3>

                <div className="space-y-4 md:space-y-6 mb-6">
                  <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                    {businessType.description}
                  </p>

                  <ul className="space-y-2">
                    {businessType.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#001109] rounded-full mt-2 flex-shrink-0" />
                        <span className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Link */}
                <Link
                  href={businessType.linkUrl}
                  className="inline-flex items-center gap-2 text-[#006840] hover:text-[#004d2e] transition-colors group"
                >
                  <span className="font-semibold text-[16px] leading-[1.5]">
                    {businessType.linkText}
                  </span>
                  <div className="w-4 h-4 relative">
                    <Image
                      src={arrowIcon}
                      alt=""
                      fill
                      className="object-contain transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}