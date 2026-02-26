'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

export default function ClutchPlaceholder() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const widgetRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Widget animation
      gsap.from(widgetRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Ensure the Clutch widget initializes without re-adding the script
  useEffect(() => {
    const init = () => (window as any)?.CLUTCHCO?.Init?.()

    if ((window as any)?.CLUTCHCO) {
      init()
      return
    }

    const interval = setInterval(() => {
      if ((window as any)?.CLUTCHCO) {
        init()
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className={`${sora.className} py-4 md:py-6 bg-white`}
      >
        <div className="mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-neutral-50 box-border content-stretch flex flex-col gap-[20px] items-center justify-start py-[48px] px-4 md:px-8 relative rounded-[32px]">
            <div className="w-full">
              {/* Label */}
              <div
                ref={labelRef}
                className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 mb-6"
              >
                <div className="font-normal leading-[0] relative shrink-0 text-[#001109] text-[14px] text-nowrap tracking-[2.8px] uppercase">
                  <p className="leading-[1.5] whitespace-pre">CLUTCH REVIEWS</p>
                </div>
              </div>

              {/* Clutch Widget Container */}
              <div
                ref={widgetRef}
                className="w-full min-h-[600px]"
              >
                <div
                  className="clutch-widget"
                  data-url="https://widget.clutch.co"
                  data-widget-type="8"
                  data-height="600"
                  data-nofollow="false"
                  data-expandifr="true"
                  data-scale="100"
                  data-clutchcompany-id="2504132"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
