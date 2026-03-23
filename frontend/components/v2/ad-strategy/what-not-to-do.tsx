'use client'

import { Sora } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
gsap.registerPlugin(ScrollTrigger)

interface BadExample {
  src: string
  title: string
  description: string
}

const badExamples = [
  { src: "/assets/bad-1-C7gnm58E.png", title: "Too much going on", description: "Daniel Iles — \"How Organic Growth Works\" — arrows, annotations, multiple messages competing for attention. The eye doesn't know where to land." },
  { src: "/assets/bad-2-C6mpuliq.png", title: "Emoji overload, weak message", description: "Pavago — exploding head emoji dominates the creative while the actual value prop gets buried in small text. The visual doesn't reinforce the message." },
  { src: "/assets/bad-3-Cdtb_5mM.png", title: "Style over substance", description: "PRNEWS.IO — \"Switch to AEO instead of SEO\" — visually striking but the message is unclear. What is AEO? Why should I care? The ad assumes too much." }
]

function ExpandableCard({ example, index }: { example: BadExample; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        delay: index * 0.15,
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
      })
    }
  }, [index])

  return (
    <div ref={cardRef} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="aspect-[16/9] overflow-hidden bg-gray-50">
          <img src={example.src} alt={example.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-5 flex items-center justify-between">
          <span className="text-sm text-gray-500">{expanded ? 'Click to collapse' : 'Click to expand'}</span>
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Discussion starter</span>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <h4 className="font-bold text-[#001109] mb-2">{example.title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{example.description}</p>
        </div>
      )}
    </div>
  )
}

export default function WhatNotToDo() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${sora.className} py-16 md:py-24 bg-[#f8faf9]`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#001109] leading-[1.2] mb-4">
            What Not to Do
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Not every ad lands. These examples break the principles above — and they&apos;re worth discussing as a team. Click to expand and brainstorm what went wrong.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badExamples.map((example, idx) => (
            <ExpandableCard key={example.title} example={example} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
