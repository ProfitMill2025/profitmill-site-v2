'use client'

import { Sora } from 'next/font/google'
import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
gsap.registerPlugin(ScrollTrigger)

interface Example {
  src: string
  caption: string
}

interface AdceptCategory {
  title: string
  description: string
  verdict: string
  examples: Example[]
}

const adceptsData = [
  {
    title: "Straight to the Point",
    description: "Ads that use natural language in a readable sentence to succinctly communicate the value proposition. Table stakes, but effective — if the person is already interested, they'll respond. At minimum, the ad makes it unmistakably clear what's being offered.",
    verdict: "Solid baseline",
    examples: [
      { src: "/assets/straight-1-HCnKVuZi.png", caption: "Growmodo — \"Working on Creative Projects? We've Got The Talent You Need.\" — clean, direct" },
      { src: "/assets/straight-2-DgSE2cG1.png", caption: "Pavago — \"Hire Elite Sales Talent for $1,000/mo\" — price anchor with strikethrough" },
      { src: "/assets/straight-3-nR67UUSd.png", caption: "Daniel Iles — \"WE GET YOU NOTICED\" — bold typography, 1M views guaranteed" },
      { src: "/assets/straight-4-BLREOhhx.png", caption: "Feedbird — \"I need a designer to post on social media\" — crossed out pain, starting at $99/mo" },
      { src: "/assets/straight-5-hNN2X6Gw.png", caption: "Abe — \"We run LinkedIn ads for the biggest B2B brands\" — authority + Lincoln visual" },
      { src: "/assets/straight-6-D67znF2w.png", caption: "30characters — \"My boss thinks I'm a speedy ad copy genius\" — Reddit native ad with product screenshot" },
      { src: "/assets/straight-7-D7AazTUu.png", caption: "Ownr — \"From Weekend Hobby to Full-time Business\" — aspirational with clear CTA" }
    ]
  },
  {
    title: "Pain Point Ads",
    description: "These are always great. When someone reads that pain and thinks \"I've lived that life,\" you've created a memorable moment. They're more likely to take action because the ad triggered a real emotional response.",
    verdict: "Highly effective",
    examples: [
      { src: "/assets/pain-1-BOrd2AVG.png", caption: "Pavago — \"What if you could build your dream team without burning $600K/year?\"" },
      { src: "/assets/pain-2-B6tTiG6J.png", caption: "Wispr Flow — \"Bad prompts = Bad results from ChatGPT\" with clear cause-effect" },
      { src: "/assets/pain-3-Cfw4h-81.png", caption: "Wispr AI — \"Backlog of unread messages you need to reply to?\" with illustration" },
      { src: "/assets/pain-5-DXPIqGLH.png", caption: "Smart Pricing Table — \"FINALLY. PROPOSAL SOFTWARE. THAT WORKS.\" massive bold text" },
      { src: "/assets/pain-6-BaG46E6I.png", caption: "Folk — \"Like the sales assistant your team never had\" with product screenshot" },
      { src: "/assets/pain-7-DfALAPrt.png", caption: "Agri Lead — \"Stop wasting time on tire-kickers\" with visual funnel" },
      { src: "/assets/pain-8-BGYAjWIH.png", caption: "Apple — \"Your PC needs a security update\" — competitor pain point play" },
      { src: "/assets/pain-9-7tG6w1uF.png", caption: "Ratio Fellowship — \"We scale SaaS startups through profitable paid ads\"" },
      { src: "/assets/pain-10-DQhaTlMl.png", caption: "Willful — \"Last year you said 'this year'\" — emotional urgency with strikethrough" }
    ]
  },
  {
    title: "Persona Call-Outs",
    description: "Ads that call out a specific profession or company type — \"Marketing agency owners,\" \"Series A founders\" — immediately capture attention because they feel like they're speaking directly to you. Combine with a pain point for maximum impact.",
    verdict: "Phenomenal",
    examples: [
      { src: "/assets/persona-callout-1-DrVN4ctg.png", caption: "Boardy — calls out \"Founders\" directly, pairs with a clear value list" },
      { src: "/assets/persona-callout-2-CvhdKIUI.png", caption: "Matej Otys — targets \"Marketing Agency Owners @ $20-40K/M\" with urgency" },
      { src: "/assets/persona-callout-3-CdG0UMeD.png", caption: "Motion.io — \"Loved by Agencies Like Yours\" with social proof stats" },
      { src: "/assets/persona-callout-4-Bj4k4QLd.png", caption: "VXT — \"How law firms are using call routing\" targets a specific vertical" },
      { src: "/assets/persona-callout-5-DSZqZSCc.png", caption: "Soblu — \"Marketing Agency Owners\" with a bold, clear offer" },
      { src: "/assets/persona-callout-6-CKtdQEaS.png", caption: "XTiles — \"The founder is not an administrator\" speaks to the persona's pain" }
    ]
  },
  {
    title: "Competitor Ads",
    description: "Whether subtle or aggressive, calling out a competitor gets people to stop. It triggers curiosity — people want to hear the drama. You need appetite for it, but the attention-grabbing power is real.",
    verdict: "Attention-grabbing",
    examples: [
      { src: "/assets/competitor-1-CN_9zo86.png", caption: "Statusbrew — \"Sprout Called. They Want Their Users Back.\" bold competitor callout" },
      { src: "/assets/competitor-2-BvM0dvJT.png", caption: "HeyOrca — \"Add more team members without paying more\" — undercutting competitor pricing" },
      { src: "/assets/competitor-3-Bf8pN77q.png", caption: "IClosed — \"You're Losing Money With Calendly\" — direct competitor attack with product demo" },
      { src: "/assets/competitor-4-BIF9JcVS.png", caption: "IClosed — \"You're Losing Money With Calendly (Proof Below)\" — competitor teardown with testimonial" },
      { src: "/assets/competitor-5-CWcUIhNo.png", caption: "Instantly.ai — \"Some outreach tools fill inboxes… Instantly fills calendars\" — subtle competitor dig" },
      { src: "/assets/competitor-6-B0r7MW4m.png", caption: "HeyOrca — \"So your social media tool just hiked its prices, eh?\" — capitalizing on competitor price hike" }
    ]
  },
  {
    title: "Analog-World References",
    description: "Digital ads that replicate something from the physical world — a Post-It note, a whiteboard, a handwritten letter. It's a powerful visual break from the usual feed content. The analog reference adds context that makes the message land.",
    verdict: "Great visual break",
    examples: [
      { src: "/assets/analog-1-Cz1LPO1G.jpg", caption: "Peopleforce — billboard on a city street, blending digital ad with real-world placement" },
      { src: "/assets/analog-2-CIYUvCoe.png", caption: "Rivyl — wax-sealed letter with bold serif typography, pure analog aesthetic" },
      { src: "/assets/analog-3-BxgCjN0G.jpg", caption: "Call Magik — Google Ads receipt printed on paper, data-heavy analog format" },
      { src: "/assets/analog-4-CUklDpAD.png", caption: "Zown — printed flyer held up against Toronto skyline, real-world context" },
      { src: "/assets/analog-5-D867KI3d.png", caption: "Linklo.io — handwritten letter to Santa, seasonal + analog mashup" }
    ]
  },
  {
    title: "Report & Content Ads",
    description: "B2B companies offering free reports and research as gated content. It's a high-value offer — substantial content given away for free. Works especially well on LinkedIn where audiences are in a professional development mindset.",
    verdict: "High-value offer",
    examples: [
      { src: "/assets/report-1-BOu-9HaL.png", caption: "HubSpot — \"100 ready-to-use AI prompts for marketers\" — free downloadable resource" },
      { src: "/assets/report-2-gKxalsIX.png", caption: "Ryan Stewart — \"ONE SOP. Unlimited Local SEO Clients.\" — bold, direct offer with price" },
      { src: "/assets/report-3-C9VSLSNK.png", caption: "Instantly.ai — \"Cold Email Benchmark Report 2026\" — data-driven gated content" },
      { src: "/assets/report-4-BgxBhBfy.png", caption: "Vanta — \"SOC 2 Compliance Checklist\" — free checklist download with 338 submits" },
      { src: "/assets/report-5-CsCJePhL.png", caption: "Procore — \"Canada's Construction Forecast for 2025\" — industry report with magazine preview" },
      { src: "/assets/report-6-Dpg1mbXk.png", caption: "Vanta — \"ISO 42001: Your AI compliance checklist\" — compliance guide download" }
    ]
  },
  {
    title: "Seasonal Ads",
    description: "Attaching your message to real-world moments — holidays, summer slowdowns, industry events. Most brands don't do this, which makes it a great way to stand out. August is slow? Make an ad about it.",
    verdict: "Underutilized",
    examples: [
      { src: "/assets/seasonal-1-BkKYUiMD.png", caption: "Hike SEO — \"Life's back on schedule. Make sure your SEO is too\" — back-to-school seasonal tie-in" }
    ]
  },
  {
    title: "Social Proof Ads",
    description: "Client logos, review badges, testimonial quotes. Fundamentally a sales-first approach. Works better for remarketing audiences who already know your brand than for cold prospects.",
    verdict: "Best for retargeting",
    examples: [
      { src: "/assets/social-1-UkkrNQfQ.png", caption: "MarketerHire — \"Join thousands of other companies\" with Netflix, Lyft, Plaid logos" },
      { src: "/assets/social-2-C0iMYJ9l.png", caption: "Projectworks — \"It is actually a joy to complete the timesheets now\" — testimonial with G2, App Store ratings" },
      { src: "/assets/social-3-VuB1K6B3.png", caption: "Koala Insulation — \"High Insulation Demand in Windsor!\" — local social proof with geo-targeting" },
      { src: "/assets/social-4-je1hjpRq.png", caption: "Pressmaster.ai — \"The Highest-Rated Content Tool for Agencies\" — G2 rating + award badges" },
      { src: "/assets/social-5-UNZtBAev.png", caption: "Wing Assistant — client reviews from Google, Capterra, Clutch with highlighted quotes" },
      { src: "/assets/social-6-AWTTWET9.png", caption: "Mews — \"The Hotel Next Door Uses Mews. Why Don't You?\" — bold peer pressure play" }
    ]
  },
  {
    title: "Offer & Incentive Ads",
    description: "Gift cards, free headphones, tangible incentives for taking a meeting. Can work for conversation ads, but we've seen it underperform on image ads — it leans too heavily into the sales pitch.",
    verdict: "Mixed results",
    examples: [
      { src: "/assets/offer-1-C4Lhyfle.png", caption: "Nebius — \"Up to 3 months free if you switch NOW\" — aggressive switching incentive with urgency" }
    ]
  }
]

function Lightbox({ examples, initialIndex, onClose }: { examples: Example[]; initialIndex: number; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') setCurrentIdx((i) => Math.min(i + 1, examples.length - 1))
    if (e.key === 'ArrowLeft') setCurrentIdx((i) => Math.max(i - 1, 0))
  }, [examples.length, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const example = examples[currentIdx]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors">✕</button>
        <div className="bg-white rounded-2xl overflow-hidden">
          <img
            src={example.src}
            alt={example.caption}
            className="w-full max-h-[70vh] object-contain bg-gray-50"
          />
          <div className="p-4 md:p-6">
            <p className="text-gray-600 text-sm md:text-base">{example.caption}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(i - 1, 0))}
                disabled={currentIdx === 0}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <span className="text-gray-400 text-sm">{currentIdx + 1} / {examples.length}</span>
              <button
                onClick={() => setCurrentIdx((i) => Math.min(i + 1, examples.length - 1))}
                disabled={currentIdx === examples.length - 1}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdceptCard({ category, index }: { category: AdceptCategory; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        delay: (index % 3) * 0.1,
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
      })
    }
  }, [index])

  return (
    <>
      <div
        ref={cardRef}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        {/* Preview image */}
        {category.examples[0] && (
          <div className="aspect-[4/3] overflow-hidden bg-gray-50">
            <img
              src={category.examples[0].src}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-[#001109]">{category.title}</h3>
            <span className="text-xs font-semibold text-[#006840] bg-[#006840]/10 px-2.5 py-1 rounded-full">
              {category.examples.length}
            </span>
          </div>
          <span className="inline-block text-xs font-medium text-[#006840] mb-2">{category.verdict}</span>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{category.description}</p>
          <div className="mt-4 text-sm font-medium text-[#006840] group-hover:underline">
            View examples →
          </div>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox
          examples={category.examples}
          initialIndex={0}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}

export default function AdceptsSection() {
  return (
    <section className={`${sora.className} py-16 md:py-24 bg-white`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#001109] leading-[1.2] mb-4">
            Adcepts: Patterns That Work
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Themes and formats we see consistently capture attention. In all these cases, the ads aren&apos;t busy — big text, clear message, smart use of visuals.
          </p>
        </div>
        <p className="text-center text-gray-400 text-sm mb-12">
          Click on any card with examples to see real ads in the wild. Use ← → arrow keys to navigate within the lightbox.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adceptsData.map((category, idx) => (
            <AdceptCard key={category.title} category={category} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
