'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Checkmark icon from Figma
const checkIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758252229/check_dgi0ah.svg"

interface SegmentBenefitsProps {
  title: string
  description: string
  items: Array<{
    title: string
    description: string
  }>
}

export default function SegmentBenefits({ title, description, items }: SegmentBenefitsProps) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${sora.className} bg-white py-16 md:py-20 px-4 md:px-8 lg:px-[120px]`}>
      <div className="max-w-6xl mx-auto">
        {/* Header Content */}
        <div className="flex flex-col gap-6 items-center justify-start mb-12 w-full">
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <h2 ref={titleRef} className="font-bold text-[42px] leading-[1.2] text-[#001109] text-center w-full">
              {title}
            </h2>
          </div>
          <p className="font-normal text-[18px] leading-[1.5] text-[#001109] text-center w-full">
            {description}
          </p>
        </div>

        {/* 3-Column Benefits Grid */}
        <div className="flex gap-8 items-stretch justify-center w-full">
          {items.map((item, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="basis-0 bg-[#f1fff5] box-border flex flex-col grow items-center justify-start min-h-px min-w-px p-6 rounded-[10px] shrink-0"
            >
              {/* Checkmark Icon */}
              <div className="size-12 mb-8">
                <img alt="" className="block max-w-none size-full" src={checkIcon} />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[#001109] text-[24px] text-center leading-[1.5] mb-8">
                {item.title}
              </h3>

              {/* Description - grows to fill remaining space */}
              <p className="font-normal text-[#001109] text-[16px] text-center leading-[1.5] flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}