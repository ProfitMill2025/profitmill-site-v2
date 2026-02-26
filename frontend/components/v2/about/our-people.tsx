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
                  alt="Peter Guba, Founder & CEO"
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
                    Founder &amp; CEO
                  </p>
                </div>
                <p className="font-normal text-[#001109] text-[16px] leading-[1.5] w-full">
                  Peter spent 8 years at Google managing 1,000+ accounts, ranging from first-time startup launches to $50M/year global ad spends for brands like Air Canada and Four Seasons.
                  <br /><br />
                  At Profit Mill, he leads the team with a performance-first mindset, focusing exclusively on turning paid ads spend into measurable, profitable growth.
                  <br /><br />
                  When he isn&apos;t focusing on his team, Peter is likely traveling with his wife and toddler—taking full advantage of the remote-work lifestyle to spend extended time on either coast.
                </p>
              </div>
            </div>

            {/* Nikolina Piplica */}
            <div
              ref={setTeamMemberRef(1)}
              className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1"
            >
              <div className="relative w-full lg:w-[225px] aspect-square rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                <Image
                  src={imgPeterGreen6}
                  alt="Nikolina Piplica, Account Executive"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                    Nikolina Piplica
                  </h3>
                  <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                    Account Executive
                  </p>
                </div>
                <p className="font-normal text-[#001109] text-[16px] leading-[1.5] w-full">
                  Nikolina has spent 6+ years managing multi-million dollar B2B campaigns across the healthcare and technology sectors.
                  <br /><br />
                  While a specialist in data-driven ad strategy, she is an elite project manager at her core—a combination that allows her to turn client growth opportunities into practical execution. At Profit Mill, Nikolina acts as a seamless extension of her clients&apos; teams, ensuring every campaign is as organized as it is profitable.
                  <br /><br />
                  When she&apos;s not strategizing with clients, you&apos;ll find her mastering Mario Kart while her three cats provide expert commentary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}