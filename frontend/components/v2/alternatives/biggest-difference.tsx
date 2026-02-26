'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// SVG underline from Cloudinary
const underlineIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758751345/Vector_5_ovezxf.svg"

interface BiggestDifferenceProps {
  className?: string
}

export default function BiggestDifference({ className = '' }: BiggestDifferenceProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const setParagraphRef = (index: number) => (el: HTMLParagraphElement | null) => {
    if (el) paragraphRefs.current[index] = el
  }

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

      // Paragraphs stagger animation
      gsap.from(paragraphRefs.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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
      className={`${sora.className} bg-[#b6ffce] text-black flex flex-col justify-center py-12 px-4 md:py-20 md:px-8 ${className}`}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Heading with underline */}
        <div ref={headingRef} className="mb-8 md:mb-12">
          <h2 className="font-bold text-[32px] md:text-[50px] leading-[1.2] text-center text-[#001109] mb-4">
            The biggest difference is
            <br className="hidden md:block" />
            {' our '}
            <span className="relative inline-block">
              insider knowledge
              <div
                className="absolute -bottom-2 left-0 right-0 h-[20px] pointer-events-none"
                style={{
                  backgroundImage: `url('${underlineIcon}')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />
            </span>
          </h2>
        </div>

        {/* Content paragraphs */}
        <div className="space-y-6 text-[#001109]">
          <p
            ref={setParagraphRef(0)}
            className="text-[16px] md:text-[18px] leading-[1.5] text-center md:text-left"
          >
            There are a lot of good paid ad agencies out there. But if you were happy with one of them, you wouldn&apos;t be here.
          </p>

          <p
            ref={setParagraphRef(1)}
            className="text-[16px] md:text-[18px] leading-[1.5] text-center md:text-left"
          >
            Before starting Profit Mill, we spent 20+ years managing ads in-house for Google and LinkedIn. That meant working with thousands of advertisers across industries, budgets, and growth stages. This helped us understand what actually works, what consistently fails, and how success is really measured from inside the platform.
          </p>

          <p
            ref={setParagraphRef(2)}
            className="text-[16px] md:text-[18px] leading-[1.5] text-center md:text-left"
          >
            We also partnered with hundreds of paid ad agencies. We saw the good, the bad, and the ones that looked busy but didn&apos;t actually deliver results. So we built Profit Mill by taking the best practices, leaving the wasted effort, and applying a repeatable framework that drives measurable profit.
          </p>
        </div>
      </div>
    </section>
  )
}