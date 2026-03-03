'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
  _id: string
  name: string | null
  jobTitle: string | null
  bio: string | null
  photoUrl: string | null
}

interface OurPeopleProps {
  className?: string
  members: TeamMember[]
}

export default function OurPeople({ className = '', members }: OurPeopleProps) {
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
      gsap.from(teamMembersRef.current.filter(Boolean), {
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
  }, [members])

  if (members.length === 0) return null

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
            {members.map((member, index) => (
              <div
                key={member._id}
                ref={setTeamMemberRef(index)}
                className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1"
              >
                {member.photoUrl && (
                  <div className="relative w-full lg:w-[225px] aspect-square rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                    <Image
                      src={member.photoUrl}
                      alt={`${member.name}, ${member.jobTitle}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                      {member.name}
                    </h3>
                    <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                      {member.jobTitle}
                    </p>
                  </div>
                  {member.bio && (
                    <p className="font-normal text-[#001109] text-[16px] leading-[1.5] w-full">
                      {member.bio.split('\n\n').map((paragraph, i) => (
                        <span key={i}>
                          {i > 0 && <><br /><br /></>}
                          {paragraph}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
