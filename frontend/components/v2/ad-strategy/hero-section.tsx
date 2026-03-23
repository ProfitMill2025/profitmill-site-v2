'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
gsap.registerPlugin(ScrollTrigger)

const bgImg = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1756844385/00b2276afac21c91f3bf88b1d7a4bf2618953099_of0fav.png"

export default function HeroSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(descRef.current, {
        y: 30, opacity: 0, duration: 0.8, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(ctaRef.current, {
        y: 20, opacity: 0, duration: 0.8, delay: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${sora.className} pb-8 bg-white`}>
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#00351f] box-border flex flex-col items-center justify-center overflow-clip px-0 py-14 md:py-[104px] relative rounded-[20px] md:rounded-[32px] w-full">
          <div className="flex flex-col gap-12 items-center justify-center px-5 md:px-8 relative w-full z-[5]">
            <div className="flex flex-col gap-4 items-center w-full">
              <h1
                ref={headingRef}
                className="font-bold leading-[1.2] text-[40px] md:text-[72px] text-center text-white tracking-[0.5px] md:tracking-[0.72px] max-w-4xl"
              >
                B2B ads that get the right click.
              </h1>
            </div>
            <p
              ref={descRef}
              className="font-normal leading-[1.5] text-[16px] md:text-[22px] text-center text-white max-w-4xl"
            >
              We create high-signal advertising for LinkedIn, Meta, X, and Reddit by focusing on one thing: clarity.
            </p>
            <div ref={ctaRef}>
              <button
                onClick={() => {
                  const el = document.getElementById('our-principles')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors px-8 py-3.5 rounded-[2px] font-semibold text-[14px] text-black"
              >
                See Our Approach
              </button>
            </div>
          </div>
          <div
            className="absolute bg-center bg-cover bg-no-repeat h-[1725.6px] left-[-690px] mix-blend-lighten opacity-50 top-[66px] w-[1409.6px] z-[2] pointer-events-none"
            style={{ backgroundImage: `url('${bgImg}')` }}
          />
          <div
            className="hidden md:block absolute w-[1454px] h-[1454px] right-[-952px] top-[-256px] rounded-full z-[1] pointer-events-none"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #B6FFCE 0%, #006840 49.04%, #00351F 100%)',
              filter: 'blur(250px)'
            }}
          />
        </div>
      </div>
    </section>
  )
}
