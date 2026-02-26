'use client'

import { Sora } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    name: 'SaaS',
    slug: 'saas',
    description: 'Software companies looking to scale user acquisition and drive trial-to-paid conversions.',
    features: ['Trial optimization', 'User onboarding funnels', 'Churn reduction campaigns'],
    bgColor: '#00351f'
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Online retailers focused on driving sales and increasing customer lifetime value.',
    features: ['Product catalog ads', 'Cart abandonment recovery', 'ROAS optimization'],
    bgColor: '#004528'
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    description: 'Service firms that need to generate qualified leads and book high-value meetings.',
    features: ['Lead qualification', 'Meeting booking funnels', 'Expertise positioning'],
    bgColor: '#006840'
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Healthcare providers seeking compliant patient acquisition and growth strategies.',
    features: ['HIPAA compliance', 'Local targeting', 'Patient journey optimization'],
    bgColor: '#008a52'
  },
  {
    name: 'Financial Services',
    slug: 'financial-services',
    description: 'Financial firms requiring compliant lead generation and trust-building campaigns.',
    features: ['Compliance focus', 'Trust building', 'High-value lead gen'],
    bgColor: '#00a862'
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'B2B manufacturers targeting decision-makers in competitive industrial markets.',
    features: ['B2B targeting', 'Long sales cycles', 'Technical positioning'],
    bgColor: '#00c474'
  }
]

export default function IndustryTable() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  const setCardRef = useCallback((index: number) => (el: HTMLElement | null) => {
    if (el) cardsRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
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
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white py-12 px-4 md:py-20 md:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-center text-[#001109]"
          >
            Industries we specialize in
          </h2>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Link
              key={industry.slug}
              href={`/who-we-work-with/${industry.slug}`}
              ref={setCardRef(index)}
              className="group block"
            >
              <div
                className="rounded-[20px] p-8 h-full transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundColor: industry.bgColor }}
              >
                {/* Industry Name */}
                <h3 className="font-bold text-[24px] leading-[1.2] text-white mb-4">
                  {industry.name}
                </h3>

                {/* Description */}
                <p className="font-normal text-[16px] leading-[1.5] text-white mb-6">
                  {industry.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {industry.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-[#b6ffce] rounded-full mt-2 flex-shrink-0" />
                      <span className="font-normal text-[14px] leading-[1.4] text-[#b6ffce]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover arrow indicator */}
                <div className="mt-6 flex items-center text-[#b6ffce] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-semibold text-[14px] mr-2">Learn more</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}