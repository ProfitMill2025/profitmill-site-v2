'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Asset constants from Cloudinary
const img3D021 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1760732719/c37da6ff2670e54527c7091e34020a9728a3f83e-min_ph3dw3.png"
const imgFrame166 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758040709/Vector_jvpwvu.svg"

// Channel-specific CTA configurations
const channelCtaConfigs = {
  'google-ads': {
    title: "Get a free Google Ads audit",
    subtitle: "Share read-only access to your Google account and we'll show you the gaps, quick wins, and biggest growth opportunities—free of charge.",
    buttonText: "Book your free Google Ads audit"
  },
  'linkedin-ads': {
    title: "Get a free LinkedIn Ads audit",
    subtitle: "Share read-only access to your LinkedIn account and we'll show you the gaps, quick wins, and biggest growth opportunities that you might be missing out on.",
    buttonText: "Book your free LinkedIn Ads audit"
  },
  'other-channels': {
    title: "Get a free paid ads audit",
    subtitle: "Share read-only access to your paid accounts and we'll show you the gaps, quick wins, and biggest growth opportunities that you might be missing out on.",
    buttonText: "Book your free audit"
  }
}

// Default CTA content
const defaultContent = {
  title: "Turn your paid ads into qualified pipeline",
  subtitle: "Want to see how? Share read-only access to your ad accounts, and we'll show you exactly where you're leaving money on the table.",
  buttonText: "Book your free audit"
}

interface CtaSectionProps {
  className?: string
  channel?: string
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

export default function CtaSection({
  className = '',
  channel,
  title,
  subtitle,
  buttonText,
  buttonLink = "https://app.hellobonsai.com/s/profitmill/googleadsaudit"
}: CtaSectionProps) {
  // Get channel config if provided
  const channelConfig = channel ? channelCtaConfigs[channel as keyof typeof channelCtaConfigs] : null

  // Use explicit props first, then channel config, then defaults
  const displayTitle = title || channelConfig?.title || defaultContent.title
  const displaySubtitle = subtitle || channelConfig?.subtitle || defaultContent.subtitle
  const displayButtonText = buttonText || channelConfig?.buttonText || defaultContent.buttonText
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const buttonRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.from(backgroundRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })

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

      // Subheading animation
      gsap.from(subheadingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Button animation
      gsap.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
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
      className={`${sora.className} bg-white relative py-16 md:py-24 ${className}`}
    >
      <div className="px-4 md:px-8 relative">
        {/* CTA Container */}
        <div
          ref={backgroundRef}
          className="bg-[#00351f] relative overflow-visible rounded-[20px] md:rounded-[32px] px-5 py-8 md:px-40 md:py-14"
        >
          {/* Background Elements Container - Clipped to rounded corners */}
          <div className="absolute inset-0 overflow-hidden rounded-[20px] md:rounded-[32px] pointer-events-none">
            {/* Radial Gradient Background - Desktop Only */}
            <div
              className="hidden md:block absolute w-[800px] h-[800px] right-[-400px] top-[-400px] rounded-full z-[1]"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, #B6FFCE 0%, #006840 49.04%, #00351F 100%)',
                filter: 'blur(150px)',
                opacity: 0.8
              }}
            />

            {/* Grid Pattern - Desktop Only */}
            <div
              className="hidden md:block absolute inset-0 opacity-60 z-[2]"
              style={{
                backgroundImage: 'url("https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757262725/shapes_bajvyv.svg")',
                backgroundSize: '600px 600px',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat'
              }}
            />

            {/* 3D Background Image - Clipped with backgrounds */}
            <div
              className="cta-3d-image absolute left-1/2 top-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-no-repeat mix-blend-lighten opacity-50 z-[2]"
              style={{
                backgroundImage: `url('${img3D021}')`,
                backgroundSize: '100%',
                backgroundPosition: 'center'
              }}
            />
            <style jsx>{`
              .cta-3d-image {
                transform: translate(calc(-50% - 200px), calc(-50% + 80px));
              }
              @media (min-width: 768px) {
                .cta-3d-image {
                  transform: translate(calc(-50% - 285px - 240px), calc(-50% + 100px));
                }
              }
            `}</style>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white max-w-[570px] mx-auto">
            <div className="flex flex-col gap-6 items-center mb-6 md:mb-12">
              <h2
                ref={headingRef}
                className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-white"
              >
                {displayTitle}
              </h2>
              <p
                ref={subheadingRef}
                className="font-normal text-[16px] leading-[1.5] text-white"
              >
                {displaySubtitle}
              </p>
            </div>

            <div className="relative w-full md:w-auto">
              <button
                ref={buttonRef}
                onClick={buttonLink ? () => window.open(buttonLink, '_blank') : undefined}
                className="bg-[#ffba0a] text-black font-semibold text-[14px] px-8 py-3.5 rounded-[2px] hover:bg-[#e6a609] transition-colors duration-200 w-full md:w-auto"
              >
                {displayButtonText}
              </button>

              {/* Bottom Decorative Element - Desktop Only */}
              <div className="hidden md:block absolute right-0 top-full translate-x-[60%] translate-y-6">
                <Image alt="" className="block w-[300px] h-[87px]" src={imgFrame166} width={300} height={87} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}