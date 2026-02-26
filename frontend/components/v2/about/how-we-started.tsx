'use client'

import { Sora, Freehand } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
const freehand = Freehand({ 
  subsets: ['latin'],
  weight: '400'
})

gsap.registerPlugin(ScrollTrigger)

// Asset constants (using Cloudinary for production images)
const imgPeterGreen4 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757268115/peter-green_4_mr4tjv.png"
const imgLayer1 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757268115/Layer_1_m4yljy.png"
const imgMill = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1757268115/mill_f1c4qw.png"

interface HowWeStartedProps {
  className?: string
}

export default function HowWeStarted({ className = '' }: HowWeStartedProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const letterRef = useRef(null)
  const peterImageRef = useRef(null)
  const decorativeElementsRef = useRef<(HTMLDivElement | null)[]>([])

  const setDecorativeRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) decorativeElementsRef.current[index] = el
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

      // Letter content animation
      gsap.from(letterRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Peter's image animation with rotation
      gsap.from(peterImageRef.current, {
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        duration: 1.2,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Decorative elements stagger animation
      gsap.from(decorativeElementsRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.3,
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className={`${sora.className} bg-white text-black py-16 md:py-20 pb-32 md:pb-40 px-4 md:px-8 relative ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Decorative Background Elements - Desktop */}
        <div 
          ref={setDecorativeRef(0)}
          className="hidden lg:block absolute left-4 xl:left-8 2xl:left-[-30px] top-[40px] w-[300px] xl:w-[350px] 2xl:w-[380px] h-[350px] xl:h-[380px] 2xl:h-[420px] pointer-events-none z-[1]"
        >
          <Image
            src={imgLayer1}
            alt=""
            width={380}
            height={420}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div 
          ref={setDecorativeRef(1)}
          className="hidden lg:block absolute right-4 xl:right-8 2xl:right-[-50px] bottom-[-100px] w-[350px] xl:w-[400px] 2xl:w-[450px] h-[400px] xl:h-[450px] 2xl:h-[500px] pointer-events-none z-[1]"
        >
          <Image
            src={imgMill}
            alt=""
            width={450}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Section Heading */}
          <div className="mb-12">
            <h2 
              ref={headingRef}
              className="font-bold text-[#001109] text-center leading-[1.2]"
              style={{ 
                fontSize: 'clamp(32px, 4vw, 42px)' 
              }}
            >
              How we started
            </h2>
          </div>

          {/* Letter Content */}
          <div 
            ref={letterRef}
            className="bg-[#f1fff5] rounded-[10px] p-8 pb-12 md:p-12 md:pb-16 lg:p-16 lg:pb-32 relative z-[5] overflow-visible max-w-[960px] xl:max-w-[1100px] mx-auto"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-[#001109] text-base leading-[1.5] mb-4">
                After nearly a decade at Google working with 1,000+ ad accounts and partnering with hundreds of agencies of every size, I saw the same issues again and again. Agencies chasing spend, avoiding accountability, and doing what was easy instead of what was right for the client.
              </p>
              
              <p className="text-[#006840] text-xl md:text-[22px] font-medium leading-[1.5] my-6">
                So I started Profit Mill to do things differently.
              </p>
              
              <p className="text-[#001109] text-base leading-[1.5] mb-4">
                I built this agency to be the kind of partner I always wished I saw more of: honest, hands-on, and focused on outcomes that actually matter. That means:
              </p>
              
              <ul className="text-[#001109] text-base leading-[1.5] mb-6 list-disc pl-6 space-y-2">
                <li>Clear pricing that reflects the complexity of the work—not vague percentages.</li>
                <li>Meeting our clients in the trenches on Slack—not just showing up for a weekly call.</li>
                <li>Doing right by our clients no matter what—not just when it&apos;s good for our bottom line.</li>
              </ul>
              
              <p className="text-[#001109] text-base leading-[1.5] mb-8">
                Because when our clients win, we win. Simple as that.
              </p>
              
              <div className="lg:hidden flex items-start justify-between mt-4">
                <p className={`${freehand.className} text-[#006840] text-2xl md:text-[32px] leading-[1.5] font-normal not-italic`}>
                  -Peter
                </p>
                <div 
                  ref={peterImageRef}
                  className="relative w-[100px] h-[100px] rounded-lg overflow-visible ml-4 flex-shrink-0"
                  style={{ transform: 'rotate(-5.466deg)', marginBottom: '8px' }}
                >
                  <Image
                    src={imgPeterGreen4}
                    alt="Peter, founder of Profit Mill"
                    fill
                    className="object-cover"
                    style={{
                      backgroundSize: '106% 106%',
                      backgroundPosition: '48.3% 0%'
                    }}
                  />
                </div>
              </div>

              <div className="hidden lg:block relative mt-4">
                <div 
                  ref={peterImageRef}
                  className="absolute left-[-140px] top-0 w-[140px] h-[140px] rounded-lg overflow-visible"
                  style={{ transform: 'rotate(-5.466deg)' }}
                >
                  <Image
                    src={imgPeterGreen4}
                    alt="Peter, founder of Profit Mill"
                    fill
                    className="object-cover"
                    style={{
                      backgroundSize: '106% 106%',
                      backgroundPosition: '48.3% 0%'
                    }}
                  />
                </div>
                <p className={`${freehand.className} text-[#006840] text-2xl md:text-[32px] leading-[1.5] font-normal not-italic`}>
                  -Peter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}