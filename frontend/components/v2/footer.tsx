'use client'

import { Sora } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Logo assets
const logo = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757261808/Layer_2_micb9a.png"
const linkedinIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757262025/Vector_iwjbud.png"

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const sectionRef = useRef(null)
  const logoRef = useRef(null)
  const navigationRef = useRef<(HTMLDivElement | null)[]>([])
  const socialRef = useRef(null)
  const footerInfoRef = useRef(null)

  const setNavigationRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) navigationRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.from(logoRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Navigation stagger animation
      gsap.from(navigationRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Social icon animation
      gsap.from(socialRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Footer info animation
      gsap.from(footerInfoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={`bg-white mx-auto px-4 md:px-8 py-4 md:py-8 ${className}`}>
      <footer 
        ref={sectionRef}
        className={`${sora.className} bg-[#001109] rounded-[32px] py-20 px-6 lg:px-[120px]`}
      >
        <div className="max-w-7xl mx-auto w-full">
        {/* Desktop Layout - 1240px and above */}
        <div className="hidden xl:flex flex-col gap-8">
          {/* Navigation Section */}
          <div className="flex gap-14 items-start justify-start w-full">
            {/* Logo */}
            <div ref={logoRef} className="shrink-0">
              <Link href="/">
                <img
                  src={logo}
                  alt="Profit Mill Logo"
                  className="h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex justify-between items-start text-[#b6ffce] text-[14px]">
              {/* About */}
              <div ref={setNavigationRef(0)} className="flex flex-col justify-center">
                <Link href="/about" className="leading-[1.5] hover:text-white transition-colors">
                  About
                </Link>
              </div>

              {/* Pricing */}
              <div ref={setNavigationRef(1)} className="flex flex-col justify-center">
                <Link href="/paid-ads-pricing" className="leading-[1.5] hover:text-white transition-colors">
                  Pricing
                </Link>
              </div>

              {/* What we do */}
              <div ref={setNavigationRef(2)} className="flex flex-col gap-[21px] items-start justify-center">
                <div className="flex flex-col justify-center">
                  <Link href="/what-we-do" className="leading-[24px] text-nowrap font-medium hover:text-white transition-colors">What we do</Link>
                </div>
                <div className="flex flex-col gap-[21px]">
                  <Link href="/what-we-do/google-ads" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Google Ads
                  </Link>
                  <Link href="/what-we-do/linkedin-ads" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    LinkedIn Ads
                  </Link>
                  <Link href="/what-we-do/other-channels" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Other channels
                  </Link>
                </div>
              </div>

              {/* Who we work with */}
              <div ref={setNavigationRef(3)} className="flex flex-col gap-[21px] items-start justify-center">
                <div className="flex flex-col justify-center">
                  <Link href="/who-we-work-with" className="leading-[24px] text-nowrap font-medium hover:text-white transition-colors">Who we work with</Link>
                </div>
                <div className="flex flex-col gap-[21px]">
                  <Link href="/who-we-work-with/paid-ads-b2b-saas" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    B2B SaaS
                  </Link>
                  <Link href="/who-we-work-with/paid-ads-plg-companies" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    PLG Companies
                  </Link>
                  <Link href="/who-we-work-with/paid-ads-service-businesses" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Services
                  </Link>
                </div>
              </div>

              {/* Case Studies */}
              <div ref={setNavigationRef(4)} className="flex flex-col justify-center">
                <Link href="/case-studies" className="leading-[24px] hover:text-white transition-colors">
                  Case Studies
                </Link>
              </div>

              {/* Resources */}
              <div ref={setNavigationRef(5)} className="flex flex-col gap-[21px] items-start justify-center">
                <div className="flex flex-col justify-center">
                  <span className="leading-[24px] text-nowrap font-medium">Resources</span>
                </div>
                <div className="flex flex-col gap-[21px]">
                  <Link href="/resources/blog" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Blog
                  </Link>
                  <div className="leading-[24px] text-nowrap">
                    <Link href="/resources/alternatives" className="hover:text-white transition-colors">
                      Alternatives &<br />Comparisons
                    </Link>
                  </div>
                </div>
              </div>

              {/* Profit studio */}
              <div ref={setNavigationRef(6)} className="flex flex-col justify-center">
                <Link href="/profit-studio" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                  Profit studio
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div ref={socialRef} className="flex flex-col gap-2.5 items-center justify-center w-full">
            <div className="p-[5px]">
              <Link
                href="https://www.linkedin.com/company/profitmill/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[31.5px] h-[31.5px] hover:scale-110 transition-transform"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Footer Information */}
          <div ref={footerInfoRef} className="flex flex-col gap-2 items-center justify-center w-full">
            <div className="flex flex-col justify-center">
              <p className="leading-[1.5] text-[#006840] text-[14px] text-center">
                19 Clifford St, Detroit, MI 48226, United States
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center text-[#006840] text-[14px]">
              <p className="leading-[1.5] text-nowrap">
                © 2025 Profit Mill. All Rights Reserved.
              </p>
              <Link href="/privacy-policy" className="leading-[1.5] text-nowrap hover:text-[#008751] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="leading-[1.5] text-nowrap hover:text-[#008751] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile Layout - Below 1240px */}
        <div className="xl:hidden flex flex-col gap-6">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center justify-start">
            <Link href="/">
              <img
                src={logo}
                alt="Profit Mill Logo"
                className="h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex gap-6 items-start justify-start w-full">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-8 text-[#b6ffce] text-[14px]">
              <div ref={setNavigationRef(0)}>
                <Link href="/about" className="leading-[1.5] hover:text-white transition-colors">
                  About
                </Link>
              </div>
              <div ref={setNavigationRef(1)}>
                <Link href="/paid-ads-pricing" className="leading-[1.5] hover:text-white transition-colors">
                  Pricing
                </Link>
              </div>
              <div ref={setNavigationRef(2)} className="flex flex-col gap-4">
                <div>
                  <Link href="/what-we-do" className="leading-[24px] text-nowrap font-medium hover:text-white transition-colors">What we do</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/what-we-do/google-ads" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Google Ads
                  </Link>
                  <Link href="/what-we-do/linkedin-ads" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    LinkedIn Ads
                  </Link>
                  <Link href="/what-we-do/other-channels" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Other channels
                  </Link>
                </div>
              </div>
              <div ref={setNavigationRef(3)} className="flex flex-col gap-4">
                <div>
                  <Link href="/who-we-work-with" className="leading-[24px] text-nowrap font-medium hover:text-white transition-colors">Who we work with</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/who-we-work-with/paid-ads-b2b-saas" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    B2B SaaS
                  </Link>
                  <Link href="/who-we-work-with/paid-ads-plg-companies" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    PLG Companies
                  </Link>
                  <Link href="/who-we-work-with/paid-ads-service-businesses" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Services
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-8 text-[#b6ffce] text-[14px]">
              <div ref={setNavigationRef(4)}>
                <Link href="/case-studies" className="leading-[24px] hover:text-white transition-colors">
                  Case Studies
                </Link>
              </div>
              <div ref={setNavigationRef(5)} className="flex flex-col gap-4">
                <div>
                  <span className="leading-[24px] text-nowrap font-medium">Resources</span>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/resources/blog" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                    Blog
                  </Link>
                  <div className="leading-[24px] text-nowrap">
                    <Link href="/resources/alternatives" className="hover:text-white transition-colors">
                      Alternatives &<br />Comparisons
                    </Link>
                  </div>
                </div>
              </div>
              <div ref={setNavigationRef(6)}>
                <Link href="/profit-studio" className="leading-[24px] text-nowrap hover:text-white transition-colors">
                  Profit studio
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Social Media */}
          <div ref={socialRef} className="flex flex-col gap-2.5 items-center justify-center w-full">
            <div className="p-[5px]">
              <Link
                href="https://www.linkedin.com/company/profitmill/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[31.5px] h-[31.5px] hover:scale-110 transition-transform"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Mobile Footer Information */}
          <div ref={footerInfoRef} className="flex flex-col gap-2 items-center justify-center w-full">
            <div className="flex flex-col justify-center w-full">
              <p className="leading-[1.5] text-[#006840] text-[14px] text-center">
                19 Clifford St, Detroit, MI 48226, United States
              </p>
            </div>
            <div className="flex flex-col justify-center w-full">
              <p className="leading-[1.5] text-[#006840] text-[14px] text-center">
                © 2025 Profit Mill. All Rights Reserved.
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center text-[#006840] text-[14px] w-full">
              <Link href="/privacy-policy" className="leading-[1.5] text-nowrap hover:text-[#008751] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="leading-[1.5] text-nowrap hover:text-[#008751] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  )
}