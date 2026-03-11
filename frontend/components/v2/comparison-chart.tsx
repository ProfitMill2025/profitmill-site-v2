'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Icon Components
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12" cy="12" r="12" fill="#FF4444"/>
    <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconMinus = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12" cy="12" r="12" fill="#FFB800"/>
    <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12" cy="12" r="12" fill="#00C853"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

interface ComparisonChartProps {
  className?: string
}

interface ChartRow {
  category: string
  inHouse: { icon: 'x' | 'minus' | 'check', text: string }
  freelancer: { icon: 'x' | 'minus' | 'check', text: string }
  agency: { icon: 'x' | 'minus' | 'check', text: string }
  profitMill: { icon: 'x' | 'minus' | 'check', text: string }
}

const chartData: ChartRow[] = [
  {
    category: 'Strategic experience',
    inHouse: { icon: 'x', text: 'Limited to individual background' },
    freelancer: { icon: 'minus', text: 'Usually only worked with a handful of accounts' },
    agency: { icon: 'minus', text: 'Moderate, but often limited and diluted' },
    profitMill: { icon: 'check', text: 'In-house expertise from Google & LinkedIn working with 1,000+ advertisers' }
  },
  {
    category: 'Execution skill',
    inHouse: { icon: 'x', text: 'Usually marketing generalist, not ad specialist' },
    freelancer: { icon: 'minus', text: 'Typically highly skilled in one channel' },
    agency: { icon: 'x', text: 'Practiced execution, but spread thin across services' },
    profitMill: { icon: 'check', text: 'Specialists in B2B lead-gen through paid ads' }
  },
  {
    category: 'Communication & availability',
    inHouse: { icon: 'check', text: 'Available full time' },
    freelancer: { icon: 'minus', text: 'Limited availability depending on client load' },
    agency: { icon: 'x', text: 'Limited access, often relies on scheduled meetings and account managers' },
    profitMill: { icon: 'check', text: 'Always available via Slack for async communication plus regular meetings' }
  },
  {
    category: 'Metric of success',
    inHouse: { icon: 'check', text: 'Revenue focus with internal accountability' },
    freelancer: { icon: 'minus', text: 'May rely on vanity metrics' },
    agency: { icon: 'x', text: 'Often measure success with CTRs, impressions, volume' },
    profitMill: { icon: 'check', text: 'Profit-focused KPIs with pipeline and new revenue as the benchmark' }
  },
  {
    category: 'Price',
    inHouse: { icon: 'x', text: 'Full salary + overhead' },
    freelancer: { icon: 'check', text: 'Generally lower cost' },
    agency: { icon: 'x', text: 'Expensive long-term contracts, often with additional setup fees' },
    profitMill: { icon: 'check', text: 'Package pricing with flexible contracts and no additional setup fees' }
  }
]

const IconComponent = ({ type }: { type: 'x' | 'minus' | 'check' }) => {
  switch (type) {
    case 'x': return <IconX />
    case 'minus': return <IconMinus />
    case 'check': return <IconCheck />
    default: return null
  }
}

export default function ComparisonChart({ className = '' }: ComparisonChartProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const tableRef = useRef(null)

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

      // Table animation
      gsap.from(tableRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
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
      className={`${sora.className} bg-white py-12 md:py-16 ${className}`}
    >
      <div className="px-4 md:px-8">
        <div className="bg-[#f1fff5] rounded-[32px] py-12 md:py-20 px-5 md:px-8 lg:px-[120px]">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-semibold text-[#001109] text-[24px] md:text-[32px] leading-[1.25] md:leading-[1.5] text-center mb-12 md:mb-16"
          >
            How Profit Mill compares to other paid ads service options
          </h2>

          {/* Comparison Table */}
          <div ref={tableRef} className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Headers */}
              <div className="grid grid-cols-5 gap-0">
                <div className="h-6"></div>
                <div className="p-4 text-center">
                  <div className="font-bold text-[16px] text-[#001109] leading-[1.5]">
                    <div>Alternative #1</div>
                    <div>In-house hire</div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="font-bold text-[16px] text-[#001109] leading-[1.5]">
                    <div>Alternative #2</div>
                    <div>Freelancer</div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="font-bold text-[16px] text-[#001109] leading-[1.5]">
                    <div>Alternative #3</div>
                    <div>Traditional agency</div>
                  </div>
                </div>
                <div className="bg-[#006840] rounded-t-[10px] p-4 text-center">
                  <div className="font-bold text-[16px] text-white leading-[1.5]">
                    Profit Mill
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              {chartData.map((row, index) => (
                <div key={index} className="grid grid-cols-5 gap-0">
                  <div className="p-4 border-t border-[#001109] font-bold text-[16px] text-[#001109]">
                    {row.category}
                  </div>
                  <div className="p-4 border-t border-[#001109] flex gap-2.5 items-start">
                    <IconComponent type={row.inHouse.icon} />
                    <span className="text-[16px] text-[#001109] leading-[1.5]">{row.inHouse.text}</span>
                  </div>
                  <div className="p-4 border-t border-[#001109] flex gap-2.5 items-start">
                    <IconComponent type={row.freelancer.icon} />
                    <span className="text-[16px] text-[#001109] leading-[1.5]">{row.freelancer.text}</span>
                  </div>
                  <div className="p-4 border-t border-[#001109] flex gap-2.5 items-start">
                    <IconComponent type={row.agency.icon} />
                    <span className="text-[16px] text-[#001109] leading-[1.5]">{row.agency.text}</span>
                  </div>
                  <div className={`p-4 border-t border-[#001109] flex gap-2.5 items-start ${index === chartData.length - 1 ? 'rounded-b-[10px]' : ''}`}>
                    <IconComponent type={row.profitMill.icon} />
                    <span className="text-[16px] text-[#001109] leading-[1.5]">{row.profitMill.text}</span>
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