'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
gsap.registerPlugin(ScrollTrigger)

interface Point {
  text: string
  bold: string[]
}

interface Principle {
  title: string
  body: string
  bodyBold: string[]
  points: Point[]
}

const principlesData = [
  {
    title: "Get out of the way.",
    body: "You have two or three seconds. People\'s brains are dopamine-addicted and competing with everything else in their feed. Your ad must be a moment of clarity in a feed designed for distraction.",
    bodyBold: ["two or three seconds", "moment of clarity", "distraction"],
    points: [
      { text: "Keep the ad visually simple — white space draws the eye in a busy feed", bold: ["visually simple", "white space"] },
      { text: "Don\'t try to do all the selling in the ad — its job is to get the click", bold: ["get the click"] },
      { text: "Use the ad to filter out the wrong audience as much as attract the right one", bold: ["filter out the wrong audience"] }
    ]
  },
  {
    title: "Lead with the pain point.",
    body: "Speak to the problem your audience lives every day. When they read it, they should feel it. That recognition is what gets them to stop, remember, and click.",
    bodyBold: ["feel it", "stop, remember, and click"],
    points: [
      { text: "Use natural language that mirrors how they\'d describe the problem themselves", bold: ["natural language", "describe the problem themselves"] },
      { text: "Pair the pain with a clear visual that reinforces the message", bold: ["clear visual", "reinforces the message"] },
      { text: "Call out the specific persona — it makes the ad feel like it\'s speaking directly to them", bold: ["specific persona", "speaking directly to them"] }
    ]
  },
  {
    title: "Respect the platform.",
    body: "Each channel has its own culture. LinkedIn users want to learn. Redditors are readers who reject polished corporate messaging. Understand the mode your audience is in and meet them there.",
    bodyBold: ["own culture", "reject polished corporate messaging", "meet them there"],
    points: [
      { text: "Document ads and industry reports perform well on LinkedIn", bold: ["Document ads", "industry reports", "LinkedIn"] },
      { text: "Text-heavy, meme-like, and unhinged content works on Reddit", bold: ["unhinged content", "Reddit"] },
      { text: "Match the content consumption mode of each platform", bold: ["content consumption mode"] }
    ]
  },
  {
    title: "Pursue image-copy harmony.",
    body: "The best ads double down on their message. The visual doesn\'t just accompany the copy — it articulates the same idea. When both elements work in concert, the message becomes unmistakable.",
    bodyBold: ["double down", "articulates the same idea", "unmistakable"],
    points: [
      { text: "Big, clear text paired with a visual that reinforces the core message", bold: ["Big, clear text", "core message"] },
      { text: "Analog-world references can create powerful visual breaks in digital feeds", bold: ["Analog-world references", "visual breaks"] },
      { text: "Complementary colors, good spacing, and empty space are table stakes", bold: ["Complementary colors", "good spacing", "table stakes"] }
    ]
  },
  {
    title: "Know when to break the rules.",
    body: "Sometimes the most effective creative is completely unhinged. Competitor callouts, seasonal tie-ins, bold offers — if you have the appetite for it, test it. The data will tell you if it works.",
    bodyBold: ["completely unhinged", "test it", "The data will tell you"],
    points: [
      { text: "Competitor ads get attention through curiosity and drama", bold: ["curiosity and drama"] },
      { text: "Seasonal ads create relevance that most brands overlook", bold: ["relevance", "most brands overlook"] },
      { text: "The only rule that can\'t be broken: understand your persona first", bold: ["understand your persona first"] }
    ]
  }
]

function BoldText({ text, boldWords }: { text: string; boldWords: string[] }) {
  if (!boldWords.length) return <>{}</>  
  
  let result: (string | ReactNode)[] = [text]
  
  boldWords.forEach((word, i) => {
    const newResult: (string | ReactNode)[] = []
    result.forEach((part) => {
      if (typeof part === 'string') {
        const idx = part.indexOf(word)
        if (idx >= 0) {
          if (idx > 0) newResult.push(part.slice(0, idx))
          newResult.push(<strong key={`${i}-${idx}`} className="font-semibold">{word}</strong>)
          if (idx + word.length < part.length) newResult.push(part.slice(idx + word.length))
        } else {
          newResult.push(part)
        }
      } else {
        newResult.push(part)
      }
    })
    result = newResult
  })
  
  return <span>{result}</span>
}

export default function PrinciplesSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            y: 30, opacity: 0, duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          })
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="our-principles" ref={sectionRef} className={`${sora.className} py-16 md:py-24 bg-[#f8faf9]`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#001109] leading-[1.2] mb-4">
            Our Principles
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A few rules we live by to ensure your ads perform.
          </p>
        </div>

        <div className="space-y-8">
          {principlesData.map((principle, idx) => (
            <div
              key={principle.title}
              ref={(el) => { cardsRef.current[idx] = el }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-[#006840] font-bold text-lg shrink-0">{idx + 1}.</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#001109]">{principle.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 ml-8">
                <BoldText text={principle.body} boldWords={principle.bodyBold} />
              </p>
              <ul className="space-y-3 ml-8">
                {principle.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006840] mt-2 shrink-0" />
                    <span className="text-gray-600 leading-relaxed">
                      <BoldText text={point.text} boldWords={point.bold} />
                    </span>
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
