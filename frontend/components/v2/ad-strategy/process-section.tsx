'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: 1,
    title: 'The Brief',
    description: 'We define the platform, thesis, and specs. You get full context on what we\'re designing and why.',
    points: [
      'Platform selection and campaign thesis',
      'Tactical dimensions and number of versions needed',
      'Visual direction and ideas that reinforce the message',
      'Full ad copy — both on the creative and around it (headline, body, CTA)',
      'Audience targeting rationale and persona alignment',
    ],
  },
  {
    step: 2,
    title: 'The Craft',
    description: 'Our designers apply core principles of hierarchy, spacing, and clarity. We iterate through versions to find what works.',
    points: [
      'Clear visual hierarchy — big text, dominant message, no clutter',
      'Complementary colors and proper contrast for legibility',
      'Generous white space so the ad breathes in the feed',
      'Multiple variations for A/B testing and creative fatigue rotation',
      'Platform-optimized sizing and format compliance',
    ],
  },
  {
    step: 3,
    title: 'Collaboration',
    description: 'Transparent communication and organized delivery. No friction, no surprises.',
    points: [
      'Dedicated Slack channel for real-time feedback and discussion',
      'Figma files with clearly dated versions and organized folders',
      'Google Workspace for documentation, briefs, and copy decks',
      'Structured review cycles with clear timelines',
      'Direct access to designers — no layers of account management',
    ],
  },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            y: 30, opacity: 0, duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          })
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${sora.className} py-16 md:py-24 bg-white`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#0d0e12] leading-[1.2] mb-4">
            How We Work Together
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From brief to final creative, here&apos;s what the process looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              ref={(el) => { cardsRef.current[idx] = el }}
              className="bg-[#00351f] rounded-2xl p-8 text-white"
            >
              <div className="text-[#B6FFCE] text-sm font-semibold mb-3">Step {step.step}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{step.description}</p>
              <ul className="space-y-3">
                {step.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B6FFCE] mt-1.5 shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
