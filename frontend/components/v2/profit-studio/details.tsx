'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Cloudinary hosted images
const coinIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1759113709/img_abq1ft.png"
const arrowIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758384287/Vector_4_tcrwdz.svg"
const growthIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1759113741/img_ctemts.png"

interface DetailsProps {
  className?: string
}

export default function Details({ className = '' }: DetailsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const angelInvestingRef = useRef<HTMLDivElement>(null)
  const startupStudioRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const setContentRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) contentRefs.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Angel Investing section animation
      gsap.from(angelInvestingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: angelInvestingRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Angel Investing content animation
      if (angelInvestingRef.current) {
        const elements = angelInvestingRef.current.querySelectorAll('.animate-content')
        gsap.from(elements, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: angelInvestingRef.current,
            start: 'top 70%',
            once: true,
          },
        })
      }

      // Startup Studio section animation
      gsap.from(startupStudioRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: startupStudioRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Startup Studio content animation
      if (startupStudioRef.current) {
        const elements = startupStudioRef.current.querySelectorAll('.animate-content')
        gsap.from(elements, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: startupStudioRef.current,
            start: 'top 70%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white flex flex-col gap-16 md:gap-20 items-center pb-16 md:pb-20 pt-12 px-4 md:px-[120px] relative w-full ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-16 md:gap-20 items-start w-full">

          {/* Angel Investing Section */}
          <div ref={angelInvestingRef} className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center w-full">
            {/* Image */}
            <div className="overflow-hidden relative rounded-[10px] shrink-0 w-full lg:w-[450px] aspect-square lg:aspect-auto lg:h-[450px]">
              <Image
                src={coinIcon}
                alt="Angel Investing"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-6 items-start justify-center text-[#001109]">
              <div className="flex flex-col gap-2 w-full animate-content">
                <div className="font-extrabold text-xs tracking-[2.16px] uppercase">
                  ANGEL INVESTING
                </div>
                <h2 className="font-semibold text-2xl leading-9">
                  Angel investing meets growth expertise
                </h2>
              </div>

              <div className="text-base leading-6 space-y-4 animate-content">
                <p>
                  We only invest where we can add value. As angel investors, we back founders we&apos;ve worked with on paid growth, so we know the opportunity and understand your audience already.
                </p>
                <p>Here&apos;s our criteria to invest:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>We&apos;ve managed your paid media and believe in the long-term potential</li>
                  <li>We see untapped marketing upside others miss</li>
                  <li>We believe in your founder–market fit and vision</li>
                </ul>
              </div>

              {/* Call-out Box */}
              <div className="bg-[#f1fff5] rounded-[10px] p-6 w-full animate-content">
                <div className="flex flex-col gap-2">
                  <p className="text-sm">
                    <span className="font-bold">Meet our angel investment: Jungle AI</span>
                    <br />
                    <span className="font-normal">
                      Jungle&apos;s founder had the grit and story. The product was differentiated. And paid media was an under-leveraged channel. We saw the opportunity and backed them—not just with cash, but expertise.
                    </span>
                  </p>
                  <Link
                    href="#"
                    className="flex items-center gap-1 text-[#006840] font-semibold text-base hover:opacity-80 transition-opacity"
                  >
                    <span>Read more</span>
                    <Image src={arrowIcon} alt="" width={16} height={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Startup Studio Section */}
          <div ref={startupStudioRef} className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-20 items-center w-full">
            {/* Image */}
            <div className="overflow-hidden relative rounded-[10px] shrink-0 w-full lg:w-[450px] aspect-square lg:aspect-auto lg:h-[450px]">
              <Image
                src={growthIcon}
                alt="Startup Studio"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-6 items-start justify-center text-[#001109]">
              <div className="flex flex-col gap-2 w-full animate-content">
                <div className="font-extrabold text-xs tracking-[2.16px] uppercase">
                  STARTUP STUDIO
                </div>
                <h2 className="font-semibold text-2xl leading-9">
                  Co-build your business with the best
                </h2>
              </div>

              <div className="text-base leading-6 space-y-4 animate-content">
                <p>
                  Through our Startup Studio model, we join forces with select startups to become your go-to-market team in exchange for equity.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2">You get:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Strategy, execution, and iteration across channels</li>
                      <li>Access to our full growth playbook (website, ads, funnel, outbound)</li>
                      <li>Embedded collaboration and Slack-based communication</li>
                      <li>No need to hire a full in-house team</li>
                      <li>Real marketing firepower, aligned to your goals</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2">This model works best for:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Founders with conviction and urgency</li>
                      <li>Lead-gen driven businesses (B2B or B2C)</li>
                      <li>Companies with product-market fit or strong signals</li>
                      <li>Startups ready to scale, but not ready to build an internal team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}