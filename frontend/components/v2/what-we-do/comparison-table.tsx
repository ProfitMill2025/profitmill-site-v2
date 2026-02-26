'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface ComparisonTableProps {
  title?: string
}

export default function ComparisonTable({
  title = "How Profit Mill compares to other paid ad options"
}: ComparisonTableProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const tableRef = useRef(null)
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

      // Table header animation
      gsap.from(tableRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Rows stagger animation
      gsap.from(rowsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const tableData = [
    {
      category: "Services",
      inHouse: "Usually generalists, not specialists",
      freelancer: "Expertise but solo bandwidth",
      traditional: "Limited market perspective",
      profitMill: "Performance experts with 20 years at Google & LinkedIn"
    },
    {
      category: "Price",
      inHouse: "High cost (salary, benefits, & tools)",
      freelancer: "Low but can fluctuate",
      traditional: "Bloated retainers",
      profitMill: "Fair and predictable cost"
    },
    {
      category: "Speed",
      inHouse: "Lengthy hiring process",
      freelancer: "Typically moves fast",
      traditional: "Slow onboarding",
      profitMill: "Launch in 1-2 weeks + regular reporting and optimization"
    },
    {
      category: "Quality",
      inHouse: "Depends on the individual",
      freelancer: "Execution only",
      traditional: "Old playbooks, lackluster execution",
      profitMill: "Full-funnel strategy + execution from platform experts"
    },
    {
      category: "Availability",
      inHouse: "Limited (often stretched thin)",
      freelancer: "Varied and low touch",
      traditional: "Often hands-off after onboarding",
      profitMill: "Slack access + regular calls for fast collaboration"
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white py-12 md:py-16 px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Full width light green background container */}
        <div className="bg-[#f1fff5] -mx-4 md:-mx-8 px-4 md:px-8 py-12 md:py-20">
          {/* Content container */}
          <div className="max-w-[1120px] mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-8 md:gap-16 items-center">
            <h2
              ref={headingRef}
              className="font-semibold text-[24px] md:text-[32px] leading-[1.25] md:leading-[1.5] text-[#001109] text-center w-full"
            >
              {title}
            </h2>

            {/* Table - Desktop and Mobile */}
            <div className="w-full overflow-x-auto">
              <div ref={tableRef} className="w-full min-w-[800px]">
                {/* Header Row */}
                <div className="flex w-full">
                  <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-center justify-start p-4">
                    <div className="font-bold text-[16px] leading-[1.5] text-[#001109]">
                      {/* Empty header cell */}
                    </div>
                  </div>
                  <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-center justify-start p-4">
                    <div className="font-bold text-[16px] leading-[1.5] text-[#001109]">
                      In-House Hire
                    </div>
                  </div>
                  <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-center justify-start p-4">
                    <div className="font-bold text-[16px] leading-[1.5] text-[#001109]">
                      Freelancer
                    </div>
                  </div>
                  <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-center justify-start p-4">
                    <div className="font-bold text-[16px] leading-[1.5] text-[#001109]">
                      Traditional Agency
                    </div>
                  </div>
                  <div className="w-[160px] md:flex-1 bg-[#006840] box-border flex gap-2.5 items-center justify-start p-4 rounded-tl-[10px] rounded-tr-[10px]">
                    <div className="font-bold text-[16px] leading-[1.5] text-white">
                      Profit Mill
                    </div>
                  </div>
                </div>

                {/* Data Rows */}
                {tableData.map((row, index) => (
                  <div
                    key={index}
                    ref={setRowRef(index)}
                    className="flex w-full"
                  >
                    <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-start justify-start p-4 relative border-t border-[#001109]">
                      <div className="font-bold text-[16px] leading-[1.5] text-[#001109]">
                        {row.category}
                      </div>
                    </div>
                    <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-start justify-start p-4 relative border-t border-[#001109]">
                      <div className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                        {row.inHouse}
                      </div>
                    </div>
                    <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-start justify-start p-4 relative border-t border-[#001109]">
                      <div className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                        {row.freelancer}
                      </div>
                    </div>
                    <div className="w-[160px] md:flex-1 box-border flex gap-2.5 items-start justify-start p-4 relative border-t border-[#001109]">
                      <div className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                        {row.traditional}
                      </div>
                    </div>
                    <div
                      className={`w-[160px] md:flex-1 bg-[#006840] box-border flex gap-2.5 items-start justify-start p-4 relative border-t border-[#001109] ${
                        index === tableData.length - 1 ? 'rounded-bl-[10px] rounded-br-[10px]' : ''
                      }`}
                    >
                      <div className="font-normal text-[16px] leading-[1.5] text-white">
                        {row.profitMill}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}