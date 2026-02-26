'use client'


import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface AuthorHeaderProps {
  authorName: string
  className?: string
}

// Light Element Component
function LightElement() {
  return (
    <div
      className="hidden md:block absolute w-[1454px] h-[1454px] right-[-952px] top-[-256px] rounded-full z-[1] pointer-events-none"
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, #B6FFCE 0%, #006840 49.04%, #00351F 100%)',
        filter: 'blur(250px)'
      }}
    />
  )
}

export default function AuthorHeader({
  authorName,
  className = ''
}: AuthorHeaderProps) {
  const sectionRef = useRef(null)
  const breadcrumbRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breadcrumb animation
      gsap.from(breadcrumbRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Author name animation
      gsap.from(nameRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
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
      className={`${sora.className} pt-[120px] md:pt-[161px] pb-8 bg-white ${className}`}
      data-name="author-header"
    >
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#00351f] box-border relative overflow-hidden rounded-[20px] md:rounded-[32px] w-full">
          {/* Decorative circular shapes - left side */}
          <div
            className="absolute h-[1302.34px] left-[-273px] top-[-79px] w-[1309.24px] z-[1]"
            data-name="shapes"
          >
            {/* Generate concentric circles with increasing sizes */}
            {Array.from({ length: 9 }).map((_, i) => {
              const inset = `${i * 5.544}%`
              return (
                <div
                  key={i}
                  className="absolute border border-[#006840] rounded-full"
                  style={{
                    inset: inset,
                  }}
                />
              )
            })}
          </div>

          {/* Decorative light glow - right side (desktop only) */}
          <LightElement />

          {/* Content container */}
          <div
            className="relative z-[4] flex gap-[80px] items-start pb-[48px] md:pb-[80px] pt-[56px] md:pt-[80px] px-[32px] md:px-[120px] w-full"
            data-name="content"
          >
            {/* Text content */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              {/* Breadcrumb */}
              <p
                ref={breadcrumbRef}
                className="font-extrabold text-[12px] text-white tracking-[2.16px] uppercase leading-[1.3]"
              >
                blog / author
              </p>

              {/* Author Name */}
              <h1
                ref={nameRef}
                className="font-bold text-[#CEFF00] text-[50px] md:text-[72px] tracking-[0.5px] md:tracking-[0.72px] leading-[1.2] w-full"
              >
                {authorName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
