'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

interface SegmentComparisonProps {
  mainTitle: string
  problemsTitle: string
  problems: Array<{ text: string }>
  solutionsTitle: string
  solutions: Array<{
    title: string
    description: string
  }>
  ctaButtonText: string
}

export default function SegmentComparison({
  mainTitle,
  problemsTitle,
  problems,
  solutionsTitle,
  solutions,
  ctaButtonText
}: SegmentComparisonProps) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      gsap.from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#f1fff5] rounded-[20px] lg:rounded-[32px] py-12 lg:py-20 px-5 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 ref={titleRef} className="font-bold text-[32px] lg:text-[42px] leading-[1.2] text-[#001109] text-center mb-12">
              {mainTitle}
            </h2>

            {/* Two Column Layout */}
            <div ref={contentRef} className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12">
              {/* Problems Column */}
              <div className="flex-1">
                <h3 className="font-semibold text-[22px] lg:text-[24px] text-[#001109] mb-8 leading-[1.5]">
                  {problemsTitle}
                </h3>

                <div className="flex flex-col gap-8">
                  {problems.map((problem, index) => (
                    <div key={index} className="flex items-start gap-[10px]">
                      {/* X Icon - matching Figma size and style */}
                      <div className="w-12 h-12 bg-[#001109] rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>

                      <p className="text-[16px] text-[#001109] leading-[1.5] font-normal">
                        {problem.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions Column */}
              <div className="flex-1">
                <h3 className="font-semibold text-[22px] lg:text-[24px] text-[#006840] mb-8 leading-[1.5]">
                  {solutionsTitle}
                </h3>

                <div className="flex flex-col gap-8">
                  {solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-[10px]">
                      {/* Checkmark Icon - matching Figma size and style */}
                      <div className="w-12 h-12 bg-[#006840] rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <p className="text-[16px] leading-[1.5] text-[#001109]">
                          <span className="font-semibold">{solution.title}: </span>
                          <span className="font-normal">{solution.description}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button
                ref={buttonRef}
                className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 text-black font-semibold text-[14px] px-8 py-3.5 rounded-[2px] leading-[1.5] w-full md:w-auto"
              >
                {ctaButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}