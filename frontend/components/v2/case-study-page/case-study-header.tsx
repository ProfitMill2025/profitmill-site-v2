'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface CaseStudyHeaderProps {
  title: string
  clientName: string
  clientLogo?: string
  description: string
  caseStudyType?: string
}

// SVG Background Grid Component
function BackgroundGrid() {
  return (
    <div className="absolute left-0 top-0 w-full md:w-3/4 h-full overflow-hidden opacity-70">
      <svg
        className="absolute left-0 top-0 w-full h-full"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid pattern - fixed 80px spacing */}
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#B6FFCE"
              strokeWidth="1"
              opacity="0.4"
            />
          </pattern>
        </defs>
        {/* Mobile: full-width grid (no stop line or extensions) */}
        <g className="md:hidden">
          <rect width="100%" height="100%" fill="url(#grid)" />
        </g>

        {/* Desktop/Tablet: capped grid with stop line and extensions */}
        <g className="hidden md:block">
          {/* Draw the main grid within a fixed width (14 cols x 80px = 1120px) */}
          <rect width="1120" height="100%" fill="url(#grid)" />

          {/* Final right-side stop line at the end of the grid */}
          <line x1="1120" y1="0" x2="1120" y2="100%" stroke="#B6FFCE" strokeWidth="1" opacity="0.4" />

          {/* Extend the bottom 2–3 horizontal lines slightly past the stop line */}
          {/* 80px spacing: bottom rows at y=720, 640, 560 */}
          <line x1="1120" y1="720" x2="1152" y2="720" stroke="#B6FFCE" strokeWidth="1" opacity="0.4" />
          <line x1="1120" y1="640" x2="1152" y2="640" stroke="#B6FFCE" strokeWidth="1" opacity="0.4" />
          <line x1="1120" y1="560" x2="1152" y2="560" stroke="#B6FFCE" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Decorative circles */}
        <circle cx="100" cy="200" r="4" fill="#B6FFCE" opacity="0.2" />
        <circle cx="300" cy="150" r="3" fill="#B6FFCE" opacity="0.25" />
        <circle cx="450" cy="300" r="5" fill="#B6FFCE" opacity="0.15" />
        <circle cx="650" cy="180" r="3.5" fill="#B6FFCE" opacity="0.2" />
        <circle cx="800" cy="250" r="4.5" fill="#B6FFCE" opacity="0.18" />
        <circle cx="1000" cy="400" r="3" fill="#B6FFCE" opacity="0.2" />
      </svg>
    </div>
  )
}

// Light Element Component (matches other headers)
function LightElement() {
  return (
    <div
      className="hidden md:block absolute w-[1454px] h-[1454px] right-[-952px] top-[-600px] rounded-full z-[1] pointer-events-none"
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, #B6FFCE 0%, #006840 49.04%, #00351F 100%)',
        filter: 'blur(250px)'
      }}
    />
  )
}

export default function CaseStudyHeader({
  title = "How a scavenger hunt company 3x'd their revenue with Google Ads",
  clientName = "Let's Roam",
  clientLogo = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1737137544/logo7_fvlsjv.png",
  description = "Let's Roam creates scavenger hunts for both B2C and B2B market segments.\n\nWhen they approached me, they were a small, bootstrapped company. They had a great product and knew the demand was there, but their Google Ads were unprofitable and poorly optimized.\n\nLet's Roam needed an expert to turn things around.",
  caseStudyType = "case study"
}: CaseStudyHeaderProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Title animation
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Logo animation
      gsap.from(logoRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Description animation
      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Format description with line breaks and highlights
  const formatDescription = (text: string) => {
    const paragraphs = text.split('\n\n')
    return paragraphs.map((paragraph, index) => {
      if (paragraph.trim() === '') return null

      // Check if paragraph contains client name for highlighting
      const parts = paragraph.split(clientName)
      if (parts.length > 1) {
        return (
          <p key={index} className="mb-4 last:mb-0">
            {parts.map((part, partIndex) => (
              <span key={partIndex}>
                {part}
                {partIndex < parts.length - 1 && (
                  <span className="text-[#ffba0a] underline decoration-solid">
                    {clientName}
                  </span>
                )}
              </span>
            ))}
          </p>
        )
      }

      return (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      )
    })
  }

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-[#00351f] relative overflow-hidden rounded-[32px] md:rounded-[32px] lg:rounded-[32px]`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-[1]">
        <BackgroundGrid />
      </div>
      <LightElement />

      {/* Content */}
      <div className="relative z-[4] pt-[80px] md:pt-[80px] pb-[96px] md:pb-[96px] px-6 md:px-8 lg:px-[120px]">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-[80px] items-start justify-start w-full">
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col gap-4 items-start justify-start">
            <div ref={labelRef} className="font-extrabold text-white text-[12px] tracking-[2.16px] uppercase leading-[1.3]">
              {caseStudyType} / {clientName.toLowerCase()}
            </div>
            <h1 ref={titleRef} className="font-bold text-[#ceff00] text-[42px] leading-[1.2] w-full">
              {title}
            </h1>
          </div>

          {/* Right Column - Logo and Description */}
          <div className="flex-1 flex flex-col gap-12 items-start justify-center">
            {/* Client Logo */}
            <div ref={logoRef} className="h-[150px] w-[300px] flex items-center justify-center overflow-hidden">
              {clientLogo ? (
                <Image
                  src={clientLogo}
                  alt={`${clientName} logo`}
                  width={211}
                  height={81}
                  className="object-contain max-w-full max-h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/60 text-sm">Logo</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div ref={descriptionRef} className="font-normal text-white text-[18px] leading-[1.5] w-full max-w-lg">
              {formatDescription(description)}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-8 items-start justify-start w-full">
          {/* Text Content */}
          <div className="flex flex-col gap-4 items-start justify-start w-full">
            <div ref={labelRef} className="font-extrabold text-white text-[12px] tracking-[2.16px] uppercase leading-[1.3]">
              {caseStudyType} / {clientName.toLowerCase()}
            </div>
            <h1 ref={titleRef} className="font-bold text-[#ceff00] text-[30px] md:text-[32px] leading-[1.2] w-full">
              {title}
            </h1>
          </div>

          {/* Logo and Description */}
          <div className="flex flex-col gap-6 items-center justify-start w-full">
            {/* Client Logo */}
            <div ref={logoRef} className="h-[115px] w-[230px] flex items-center justify-center overflow-hidden">
              {clientLogo ? (
                <Image
                  src={clientLogo}
                  alt={`${clientName} logo`}
                  width={162}
                  height={62}
                  className="object-contain max-w-full max-h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/60 text-sm">Logo</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div ref={descriptionRef} className="font-normal text-white text-[16px] md:text-[18px] leading-[1.5] w-full max-w-lg text-left md:text-left">
              {formatDescription(description)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
