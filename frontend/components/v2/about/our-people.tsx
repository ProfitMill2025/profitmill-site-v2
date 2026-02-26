'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Asset constants (uploaded to Cloudinary)
const imgPeterGreen4 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757282683/figma-components/our-people/our-people-image-1.jpg"
const imgPeterGreen6 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757282683/figma-components/our-people/our-people-image-3.jpg"

interface OurPeopleProps {
  className?: string
}

export default function OurPeople({ className = '' }: OurPeopleProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const teamMembersRef = useRef<(HTMLDivElement | null)[]>([])

  const setTeamMemberRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) teamMembersRef.current[index] = el
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

      // Team members stagger animation
      gsap.from(teamMembersRef.current, {
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
    <section 
      ref={sectionRef} 
      className={`${sora.className} bg-[#f1fff5] py-16 md:py-20 px-4 md:px-8 rounded-[32px] ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-12 md:gap-16 items-center justify-start w-full">
          {/* Section Heading */}
          <h2 
            ref={headingRef}
            className="font-bold text-[#001109] text-center leading-[1.2] w-full"
            style={{ 
              fontSize: 'clamp(32px, 4vw, 42px)' 
            }}
          >
            Meet our team of growth experts
          </h2>

          {/* Team Grid */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start justify-start w-full">
            {/* Peter Guba */}
            <div 
              ref={setTeamMemberRef(0)}
              className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1"
            >
              <div className="relative w-full lg:w-[225px] aspect-square rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                <Image
                  src={imgPeterGreen4}
                  alt="Peter Guba, Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                    Peter Guba
                  </h3>
                  <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                    Founder
                  </p>
                </div>
                <p className="font-normal text-[#001109] text-[16px] leading-[1.5] w-full">
                  Peter Guba spent 8 years at Google managing 1,000+ ad accounts across startups, scale-ups, and enterprise giants. He&apos;s helped companies launch their first campaigns, refine multimillion-dollar ad strategies, and build repeatable revenue engines. Before Google, Peter worked at and co-founded startups, giving him a front-row seat to the challenges founders face at every stage of growth. Today, he leads Profit Mill with one goal: helping ambitious B2B companies turn ad spend into profitable growth.
                </p>
              </div>
            </div>

            {/* Alex Gubecka */}
            <div
              ref={setTeamMemberRef(1)}
              className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1"
            >
              <div className="relative w-full lg:w-[225px] aspect-square rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                <Image
                  src={imgPeterGreen6}
                  alt="Alex Gubecka, Director of Paid Media"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                    Alex Gubecka
                  </h3>
                  <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                    Director of Paid Media
                  </p>
                </div>
                <p className="font-normal text-[#001109] text-[16px] leading-[1.5] w-full">
                  A performance marketing strategist with over 10 years of experience helping startups and B2B companies accelerate growth through smarter digital advertising. He specializes in Google Ads, LinkedIn Ads, and Meta Ads—designing campaigns that maximize ROI, scale customer acquisition, and connect brands with the right audiences.
                  <br /><br />
                  With a background in PHP and JavaScript development, Alex brings a deep technical understanding of how the web works under the hood. He also has managerial experience leading PPC teams and, as part of a venture capital environment, has helped dozens of startups scale efficiently—turning ambitious goals into measurable results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}