'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface TeamPet {
  _id: string
  name: string | null
  jobTitle: string | null
  photoUrl: string | null
}

interface OurDogsProps {
  className?: string
  pets: TeamPet[]
}

export default function OurDogs({ className = '', pets }: OurDogsProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const dogCardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setDogCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) dogCardsRef.current[index] = el
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

      // Dog cards stagger animation with playful bounce
      gsap.from(dogCardsRef.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Add subtle hover animation for interactivity
      dogCardsRef.current.forEach((card) => {
        if (card) {
          const imageContainer = card.querySelector('.dog-image') as HTMLElement
          if (imageContainer) {
            card.addEventListener('mouseenter', () => {
              gsap.to(imageContainer, {
                scale: 1.05,
                rotation: 2,
                duration: 0.3,
                ease: "power2.out"
              })
            })
            card.addEventListener('mouseleave', () => {
              gsap.to(imageContainer, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
              })
            })
          }
        }
      })
    })

    return () => ctx.revert()
  }, [pets])

  if (pets.length === 0) return null

  // Split pets into rows of 3
  const rows: TeamPet[][] = []
  for (let i = 0; i < pets.length; i += 3) {
    rows.push(pets.slice(i, i + 3))
  }

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
            Our Barketing & Purrformance Team
          </h2>

          {/* Pet Grid - Rows of 3 */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex flex-col lg:flex-row gap-12 items-start justify-start w-full ${
                row.length < 3 ? 'lg:justify-center' : ''
              } ${rowIndex > 0 ? 'mt-12' : ''}`}
            >
              {row.map((pet, petIndex) => {
                const globalIndex = rowIndex * 3 + petIndex
                return (
                  <div
                    key={pet._id}
                    ref={setDogCardRef(globalIndex)}
                    className={`flex flex-col gap-6 items-start justify-start w-full lg:flex-1 cursor-pointer ${
                      row.length < 3 ? 'lg:max-w-[33.333%]' : ''
                    }`}
                  >
                    {pet.photoUrl && (
                      <div className="dog-image relative w-full h-[290px] lg:w-[225px] lg:h-[225px] rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                        <Image
                          src={pet.photoUrl}
                          alt={`${pet.name} - ${pet.jobTitle}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-4 lg:gap-6 items-start justify-start w-full">
                      <div className="flex flex-col gap-2 items-start justify-start w-full">
                        <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                          {pet.name}
                        </h3>
                        <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                          {pet.jobTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
