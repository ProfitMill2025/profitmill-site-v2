'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Asset constants (using Cloudinary for production images)
const imgPeterGreen4 = 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757282342/figma-components/our-dogs/our-dogs-image-1.jpg'
const imgPeterGreen5 = 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757282342/figma-components/our-dogs/our-dogs-image-2.jpg'
const imgPeterGreen6 = 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757282342/figma-components/our-dogs/our-dogs-image-3.jpg'

interface OurDogsProps {
  className?: string
}

export default function OurDogs({ className = '' }: OurDogsProps) {
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
      gsap.from(dogCardsRef.current, {
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
            Our Barketing & Purrformance Team
          </h2>

          {/* Dogs Grid - Responsive layout */}
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-start w-full">
            {/* Dog 1 - Chief Happiness Officer */}
            <div 
              ref={setDogCardRef(0)}
              className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1 cursor-pointer"
            >
              <div className="dog-image relative w-full h-[290px] lg:w-[225px] lg:h-[225px] rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                <Image
                  src={imgPeterGreen4}
                  alt="Office dog - Chief Happiness Officer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                    Charlie
                  </h3>
                  <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                    Chief Happiness Officer
                  </p>
                </div>
              </div>
            </div>

            {/* Dog 2 - Chief Nap Officer */}
            <div 
              ref={setDogCardRef(1)}
              className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1 cursor-pointer"
            >
              <div className="dog-image relative w-full h-[290px] lg:w-[225px] lg:h-[225px] rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                <Image
                  src={imgPeterGreen5}
                  alt="Office dog - Chief Nap Officer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                    Bella
                  </h3>
                  <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                    Chief Nap Officer
                  </p>
                </div>
              </div>
            </div>

            {/* Dog 3 - Director of Barketing */}
            <div 
              ref={setDogCardRef(2)}
              className="flex flex-col gap-6 items-start justify-start w-full lg:flex-1 cursor-pointer"
            >
              <div className="dog-image relative w-full h-[290px] lg:w-[225px] lg:h-[225px] rounded-[10px] overflow-hidden bg-center bg-cover bg-no-repeat">
                <Image
                  src={imgPeterGreen6}
                  alt="Office dog - Director of Barketing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <h3 className="font-semibold text-[#006840] text-[24px] leading-[1.5] w-full">
                    Max
                  </h3>
                  <p className="font-normal text-[#001109] text-[18px] leading-[1.5] w-full">
                    Director of Barketing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}