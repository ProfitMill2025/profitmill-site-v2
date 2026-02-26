'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

const sora = Sora({ subsets: ['latin'] })

export default function Why() {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[index] = el
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return

        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(titleRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })

            // Cards animation
            const cards = cardsRef.current.filter(Boolean)
            gsap.from(cards, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
      <div ref={sectionRef} className="w-full mx-auto px-4 py-16">
        <div className="space-y-12 max-w-6xl mx-auto">
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold text-center text-emerald-800 mb-16">
            Why my clients say I&apos;m &quot;the real deal&quot;
          </h2>
  
          <div className="grid gap-8">
            {/* ROI Obsessed Section */}
            <div ref={setCardRef(0)} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-4 bg-[#B6FFCE] rounded-xl p-6 h-full flex items-center order-1">
                <h2 className="text-2xl md:text-[24px] font-semibold text-[#00351F]">ROI Obsessed</h2>
              </div>
              <div className="md:col-span-8 bg-emerald-950 rounded-xl p-6 h-full flex items-center order-2">
                <p style={{ color: '#B6FFCE' }}>I&apos;m here to help you make money, not just spend it. That&apos;s why I offer a performance-based option where my fees are linked directly to the revenue generated from your ads.</p>
              </div>
            </div>
  
            {/* Ex-Google Section */}
            <div ref={setCardRef(1)} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-4 bg-[#B6FFCE] rounded-xl p-6 h-full flex items-center order-1 md:order-2">
                <h2 className="text-2xl md:text-[24px] font-semibold text-[#00351F]">Ex-Google</h2>
              </div>
              <div className="md:col-span-8 bg-emerald-950 rounded-xl p-6 h-full flex items-center order-2 md:order-1">
                <p style={{ color: '#B6FFCE' }}>After 8+ years at Google managing 1,000+ ad accounts, I&apos;ve gained a deep understanding of what works (and what doesn&apos;t) in the world of Google Ads.</p>
              </div>
            </div>
  
            {/* Marketer Section */}
            <div ref={setCardRef(2)} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-6 bg-[#B6FFCE] rounded-xl p-6 h-full flex items-center order-1">
                <h2 className="text-2xl md:text-[24px] font-semibold" style={{ color: '#00351F' }}>A marketer, not just an ad expert</h2>
              </div>
              <div className="md:col-span-6 bg-emerald-950 rounded-xl p-6 h-full flex items-center order-2">
                <p style={{ color: '#B6FFCE' }}>Google Ads alone won&apos;t drive the results you want. But don&apos;t worry, I&apos;ll help you improve your landing pages, website, and overall marketing strategy.</p>
              </div>
            </div>
  
            {/* Month-to-month Section */}
            <div ref={setCardRef(3)} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-4 bg-[#B6FFCE] rounded-xl p-6 h-full flex items-center order-1 md:order-2">
                <h2 className="text-2xl md:text-[24px] font-semibold" style={{ color: '#00351F' }}>Month-to-month retainer</h2>
              </div>
              <div className="md:col-span-8 bg-emerald-950 rounded-xl p-6 h-full flex items-center order-2 md:order-1">
                <p style={{ color: '#B6FFCE' }}>I won&apos;t make you sign a 12-month contract. I&apos;m confident you&apos;ll love working with me, or we can go our separate ways.</p>
              </div>
            </div>
  
            {/* Direct Access Section */}
            <div ref={setCardRef(4)} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3 bg-[#B6FFCE] rounded-xl p-6 h-full flex items-center order-1">
                <h2 className="text-2xl md:text-[24px] font-semibold text-[#00351F]">Direct access</h2>
              </div>
              <div className="md:col-span-9 bg-emerald-950 rounded-xl p-6 h-full flex items-center order-2">
                <p style={{ color: '#B6FFCE' }}>Think of me as an extension of your team. I&apos;m always available to answer questions on Slack or jump on a quick call – no need to wait for a scheduled meeting.</p>
              </div>
            </div>
  
            {/* No BS Section */}
            <div ref={setCardRef(5)} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-6 bg-[#B6FFCE] rounded-xl p-6 h-full flex items-center order-1 md:order-2">
                <h2 className="text-2xl md:text-[24px] font-semibold" style={{ color: '#00351F' }}>No BS reporting or vanity metrics</h2>
              </div>
              <div className="md:col-span-6 bg-emerald-950 rounded-xl p-6 h-full flex items-center order-2 md:order-1">
                <p style={{ color: '#B6FFCE' }}>You&apos;ll get clear, jargon-free reports that focus on the metrics that drive revenue, not just clicks or impressions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  