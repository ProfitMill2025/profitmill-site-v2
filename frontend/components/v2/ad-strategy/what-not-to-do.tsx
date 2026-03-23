'use client'

import { Sora } from 'next/font/google'
import { useState, useEffect, useRef, useCallback } from 'react'
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

function ImageLightbox({ example, onClose }: { example: BadExample; onClose: () => void }) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors">✕</button>
        <div className="bg-white rounded-2xl overflow-hidden">
          <img
            src={example.src}
            alt={example.title}
            className="w-full max-h-[75vh] object-contain bg-gray-50"
          />
          <div className="p-4 md:p-6">
            <h4 className="font-bold text-[#001109] mb-2">{example.title}</h4>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{example.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpandableCard({ example, index }: { example: BadExample; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
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
    <>
      <div ref={cardRef} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Clickable image area — opens lightbox */}
        <div
          className="aspect-[16/9] overflow-hidden bg-gray-50 cursor-pointer group relative"
          onClick={() => setLightboxOpen(true)}
        >
          <img src={example.src} alt={example.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-[#001109] text-sm font-medium px-4 py-2 rounded-full shadow-sm">
              Click to enlarge
            </span>
          </div>
        </div>

        {/* Expandable text area */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#001109]">{example.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Discussion starter</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
        {expanded && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-gray-600 text-sm leading-relaxed">{example.description}</p>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          example={example}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
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
            Not every ad lands. These examples break the principles above — and they&apos;re worth discussing as a team. Click the image to see it full-size, or expand the card for discussion notes.
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
