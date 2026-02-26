'use client'

import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

export default function WhoWeWorkWith() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const columnsRef = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef(null)

  const setColumnRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) columnsRef.current[index] = el
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

      // Columns stagger animation
      gsap.from(columnsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Button animation
      gsap.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={sectionRef}
      id="who-we-work-with" 
      className={`${sora.className} bg-[#f1fff5] px-4 py-16 md:p-16`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold text-[#001109] text-center mb-16"
        >
          Who we work with
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Perfect Fit Column */}
          <div ref={setColumnRef(0)} className="space-y-8">
            <h2 className="text-2xl md:text-2xl font-semibold text-[#006840] mb-6">
              We&apos;re perfect for…
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#006840] rounded-full p-1 flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Lead-hungry B2B startups & scaleups</p>
                  <p>with clear product-market fit, VC-backed or doing $1M ARR.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#006840] rounded-full p-1 flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Ambitious VCs, founders, and marketing leaders</p>
                  <p>who are fed up with shady ad reps and flaky agencies, and want to work with a strategic partner that actually &apos;gets it&apos;.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#006840] rounded-full p-1 flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Companies ready to go all in on paid ads</p>
                  <p>and see this as an investment in incremental, scalable marketing growth.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Not Right Fit Column */}
          <div ref={setColumnRef(1)} className="space-y-8">
            <h2 className="text-2xl md:text-2xl font-semibold text-[#001109] mb-6">
              We&apos;re not the right fit if…
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-1 flex-shrink-0">
                  <X className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">You&apos;re a paid ads skeptic or looking for a quick fix.</p>
                  <p>To get the results you want, you need to be fully committed to optimizing your entire marketing funnel alongside your ads (that&apos;s something we&apos;ll help you do).</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-1 flex-shrink-0">
                  <X className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">You expect paid ads to be a magic bullet.</p>
                  <p>Performance marketing can accelerate growth, but it can&apos;t fix fundamental issues with your product, messaging, or sales process.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-1 flex-shrink-0">
                  <X className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">You don&apos;t know who your ideal customer is.</p>
                  <p>Are you at an early stage and still figuring out your product/market fit? Then paid ads might not be the right investment right now (but it will be soon).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={buttonRef} className="flex justify-center mt-16 w-full">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#ffba0a] hover:bg-[#ffba0a]/90 text-black font-semibold text-sm px-8 py-3.5 rounded-[2px]"
            onClick={() => window.open('https://app.hellobonsai.com/s/profitmill/googleadsaudit', '_blank')}
          >
            Book a call
          </Button>
        </div>
      </div>
    </div>
  )
}