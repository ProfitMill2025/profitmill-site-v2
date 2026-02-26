'use client'

import { Sora } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

// Image constants from Figma
const imgGoogle2015Logo = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758252151/Google_2015_logo_xbnvga.svg"
const imgLinkedInLogo = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758252151/LinkedIn_logo_nuxkfu.svg"

gsap.registerPlugin(ScrollTrigger)

interface ProductTableProps {
  title?: string
  subtitle?: string
}

export default function ProductTable({
  title = "Ready for paid ads, but don't know where to start?",
  subtitle = "Our clients come to us with problems. We turn them into profit."
}: ProductTableProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
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

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
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

  const channels = [
    {
      logo: imgGoogle2015Logo,
      title: "Google Ads are great for…",
      url: "/what-we-do/google-ads",
      features: [
        "Capturing demand that's already there",
        "Scaling after product-market fit",
        "Attracting enterprise buyers",
        "Running campaigns that drive attributable ROI"
      ]
    },
    {
      logo: imgLinkedInLogo,
      title: "LinkedIn Ads are great for…",
      url: "/what-we-do/linkedin-ads",
      features: [
        "Creating demand in a new category",
        "Nailing your ABM strategy",
        "Building a full-funnel B2B motion",
        "Scaling growth post–PMF"
      ]
    },
    {
      logo: null,
      title: "Other paid channels are great for…",
      url: "/what-we-do/other-channels",
      subtitle: "OTHER",
      subtitleLarge: "Paid Channels",
      features: [
        "Expanding proven strategy beyond Google & LinkedIn",
        "Targeting niche, intent-driven audiences",
        "Standing out in less crowded spaces"
      ]
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white text-black flex flex-col justify-center py-16 px-4 md:py-20 md:px-8`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col gap-12 md:gap-20 items-center justify-start text-[#001109] text-center w-full mb-12 md:mb-20">
          <div
            ref={headingRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] w-full"
          >
            {title}
          </div>
          <div
            ref={subtitleRef}
            className="font-normal text-[18px] leading-[1.5] w-full"
          >
            {subtitle}
          </div>
        </div>

        {/* Cards Grid - Desktop: Row, Mobile: Column */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center w-full max-w-[1120px] mx-auto">
          {channels.map((channel, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="w-full md:flex-1 flex flex-col items-start justify-start"
            >
              {/* Header with Logo/Title */}
              <div className="bg-[#00351f] flex flex-col h-[130px] md:h-40 items-center justify-center overflow-hidden rounded-tl-[10px] rounded-tr-[10px] w-full">
                {channel.logo ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={channel.logo}
                      alt={channel.title.split(' ')[0] + ' logo'}
                      className="max-w-none"
                      style={{
                        height: channel.logo === imgGoogle2015Logo ? '56.667px' : '49.02px',
                        width: channel.logo === imgGoogle2015Logo ? '150px' : '188px'
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-white text-center text-nowrap">
                    <div className="font-extrabold text-[12px] tracking-[2.16px] uppercase leading-[1.3] mb-2">
                      {channel.subtitle}
                    </div>
                    <div className="font-semibold text-[32px] leading-[1.5]">
                      {channel.subtitleLarge}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Card */}
              <div className="bg-[#f1fff5] box-border flex flex-col gap-8 md:gap-12 items-center justify-start px-5 md:px-8 py-8 md:py-12 rounded-bl-[10px] rounded-br-[10px] w-full">
                {/* Title */}
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="flex gap-2.5 items-center justify-center w-full">
                    <div className="flex-1 font-semibold leading-[1.25] md:leading-[1.5] text-[#006840] text-[18px] md:text-[24px]">
                      {channel.title}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="font-normal leading-[1.5] text-[#001109] text-[16px] w-full">
                    <ul className="list-disc space-y-1">
                      {channel.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="ml-6">
                          <span className="leading-[1.5]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learn More Button */}
                <Link
                  href={channel.url}
                  className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors box-border flex gap-2.5 items-center justify-center px-8 py-3.5 rounded-[2px] w-full md:w-auto"
                >
                  <div className="flex flex-col font-semibold justify-center leading-[1.5] text-[14px] text-black text-center text-nowrap">
                    Learn more
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}