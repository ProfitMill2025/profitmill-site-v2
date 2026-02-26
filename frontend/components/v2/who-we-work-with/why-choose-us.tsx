'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    title: "Industry-specific expertise",
    description: "We understand the unique challenges, regulations, and customer behaviors in your industry. Our strategies are tailored to what actually works in your market.",
    icon: "🎯"
  },
  {
    title: "Full-funnel approach",
    description: "We don't just drive traffic—we optimize the entire customer journey from first click to final purchase, ensuring every dollar spent drives real business results.",
    icon: "🔄"
  },
  {
    title: "Data-driven optimization",
    description: "Every decision is backed by data. We continuously test, measure, and optimize campaigns based on real performance metrics, not assumptions.",
    icon: "📊"
  },
  {
    title: "Compliance-first mindset",
    description: "Whether it's HIPAA for healthcare or financial regulations, we ensure all campaigns meet industry compliance requirements from day one.",
    icon: "🛡️"
  },
  {
    title: "Proven track record",
    description: "We've helped businesses across industries scale from startup to enterprise, with documented results and case studies to prove our methods work.",
    icon: "🏆"
  },
  {
    title: "Transparent reporting",
    description: "No black boxes or vague metrics. You get clear, actionable reports that show exactly how your campaigns are performing and where your budget is going.",
    icon: "📈"
  }
]

export default function WhyChooseUs() {
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
      className={`${sora.className} bg-[#f1fff5] py-12 px-4 md:py-20 md:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-center text-[#001109]"
          >
            Why businesses choose Profit Mill
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="bg-white rounded-[20px] p-8 shadow-sm"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-[20px] leading-[1.2] text-[#001109] mb-4">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="font-normal text-[16px] leading-[1.5] text-[#001109]">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}