'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

const comparisonData = [
  {
    feature: "Industry expertise",
    generic: "Generic approach for all businesses",
    profitMill: "Deep industry-specific knowledge and strategies",
    profitMillIcon: "✓"
  },
  {
    feature: "Compliance awareness",
    generic: "Basic understanding of regulations",
    profitMill: "Full compliance expertise (HIPAA, financial regs, etc.)",
    profitMillIcon: "✓"
  },
  {
    feature: "Customer journey optimization",
    generic: "Focus on clicks and impressions",
    profitMill: "Full-funnel optimization from awareness to conversion",
    profitMillIcon: "✓"
  },
  {
    feature: "Reporting transparency",
    generic: "Basic metrics and vanity numbers",
    profitMill: "Detailed ROI reporting with business impact metrics",
    profitMillIcon: "✓"
  },
  {
    feature: "Strategic planning",
    generic: "Reactive campaign management",
    profitMill: "Proactive strategy based on industry best practices",
    profitMillIcon: "✓"
  },
  {
    feature: "Team specialization",
    generic: "Generalist approach across industries",
    profitMill: "Specialists with proven track records in your industry",
    profitMillIcon: "✓"
  }
]

export default function IndustryComparisonTable() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const tableRef = useRef(null)

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

      // Table animation
      gsap.from(tableRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
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
            Generic agencies vs. industry specialists
          </h2>
        </div>

        {/* Comparison Table */}
        <div
          ref={tableRef}
          className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="font-bold text-[18px] text-center text-[#001109]">
                Feature
              </h3>
            </div>
            <div className="p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="font-bold text-[18px] text-center text-[#001109]">
                Generic Agencies
              </h3>
            </div>
            <div className="p-6 bg-[#00351f]">
              <h3 className="font-bold text-[18px] text-center text-white">
                Profit Mill
              </h3>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-gray-200"
            >
              {/* Feature */}
              <div className="p-6 bg-gray-25 border-b lg:border-b-0 lg:border-r border-gray-200">
                <p className="font-semibold text-[16px] text-[#001109]">
                  {row.feature}
                </p>
              </div>

              {/* Generic */}
              <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
                <p className="font-normal text-[14px] leading-[1.4] text-[#666666]">
                  {row.generic}
                </p>
              </div>

              {/* Profit Mill */}
              <div className="p-6 bg-[#f1fff5]">
                <div className="flex items-start gap-3">
                  <span className="text-[#00a862] font-bold text-[16px] mt-0.5">
                    {row.profitMillIcon}
                  </span>
                  <p className="font-normal text-[14px] leading-[1.4] text-[#001109]">
                    {row.profitMill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="font-normal text-[16px] leading-[1.5] text-[#001109] mb-6">
            Ready to work with specialists who understand your industry?
          </p>
          <button className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors px-8 py-3.5 rounded-[2px]">
            <span className="font-semibold text-[14px] text-black">
              Get a free industry-specific audit
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}