'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Channel configurations
const channelConfigs = {
  'google-ads': {
    title: "Ready to get started? Here's how we work",
    steps: [
      {
        title: "Free ad audit",
        description: "**Positioning clarity:** We start with a full review of your Google Ads and evaluate based on budget, competition, and demand to see exactly where you're losing money (or missing opportunity).",
        bgColor: "#006840"
      },
      {
        title: "Quick intake",
        description: "We set you up with everything: conversion tracking setup, campaign structure, and keyword strategy. Plus align messaging across the full buyer journey.",
        bgColor: "#004528"
      },
      {
        title: "Launch and learn",
        description: "We go live quickly and assess performance within the first 1–2 weeks, then optimize based on real data.",
        bgColor: "#002413"
      },
      {
        title: "Scale what works",
        description: "Once your Google Ads are dialed in, we expand your strategy across other paid channels to sustain and grow results.",
        bgColor: "#001109"
      }
    ]
  },
  'linkedin-ads': {
    title: "Ready to get started? Here's how we work",
    steps: [
      {
        title: "Free ad audit",
        description: "We start with a full review of your LinkedIn account and evaluate based on budget, competition, and demand to see exactly where you're losing money (or missing opportunity).",
        bgColor: "#006840"
      },
      {
        title: "Quick intake",
        description: "We build account-based campaigns around your key personas, segments, and sales goals. From copy to creative, we help you design every touchpoint to convert.",
        bgColor: "#004528"
      },
      {
        title: "Launch and learn",
        description: "We go live quickly and assess performance within the first 1–2 weeks, then optimize based on real data.",
        bgColor: "#002413"
      },
      {
        title: "Scale what works",
        description: "Once your campaigns are humming, we help you scale efficiently by layering in Google, G2, or retargeting channels.",
        bgColor: "#001109"
      }
    ]
  },
  'other-channels': {
    title: "Ready to get started? Here's how we work",
    steps: [
      {
        title: "Free ad audit",
        description: "We start with a full review of your paid media accounts and evaluate based on budget, competition, and demand to see exactly where you're losing money (or missing opportunity).",
        bgColor: "#006840"
      },
      {
        title: "Quick intake",
        description: "We identify which channels make sense based on your funnel, budget, and audience. Then set you up with everything: tracking, conversion setup, campaign structure, and strategy.",
        bgColor: "#004528"
      },
      {
        title: "Launch and learn",
        description: "We go live quickly and review performance within 1–2 weeks, then optimize based on real data.",
        bgColor: "#002413"
      },
      {
        title: "Scale what works",
        description: "Once we see what's working, we scale spend and double down on the channels that are driving results.",
        bgColor: "#001109"
      }
    ]
  }
}

interface HowWeWorkProps {
  channel: string
  title?: string
  steps?: Array<{
    title: string
    description: string
    bgColor: string
  }>
}

export default function HowWeWork({
  channel,
  title,
  steps
}: HowWeWorkProps) {
  // Get configuration for the current channel
  const config = channelConfigs[channel as keyof typeof channelConfigs] || channelConfigs['google-ads']

  // Use provided props or fallback to channel config
  const displayTitle = title || config.title
  const displaySteps = steps || config.steps

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  const setStepRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) stepsRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Steps stagger animation
      gsap.from(stepsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-[#f1fff5] py-12 px-4 md:py-20 md:px-8 rounded-[20px] md:rounded-[32px] mx-4 md:mx-8`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start lg:items-center">
          {/* Title Section */}
          <div className="w-full lg:flex-1 lg:flex lg:items-center lg:h-full">
            <h2
              ref={titleRef}
              className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-[#001109]"
            >
              {displayTitle}
            </h2>
          </div>

          {/* Steps Section */}
          <div className="w-full lg:flex-1 space-y-4">
            {displaySteps.map((step, index) => {
              // Handle markdown-style bold formatting
              const parts = step.description.split('**')
              const hasFormatting = parts.length > 1

              return (
                <div
                  key={index}
                  ref={setStepRef(index)}
                  className="flex gap-4"
                >
                  {/* Step Number */}
                  <div
                    className="w-20 flex-shrink-0 rounded-[10px] px-[30px] py-5 flex items-center justify-center"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <span className="font-semibold text-[32px] leading-[1.5] text-[#b6ffce]">
                      {index + 1}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div
                    className="flex-1 rounded-[10px] px-6 py-4 flex flex-col gap-2"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <h3 className="font-normal text-[22px] leading-[1.5] text-white">
                      {step.title}
                    </h3>
                    <p className="font-normal text-[16px] leading-[1.5] text-white">
                      {hasFormatting ? (
                        <>
                          <span className="font-bold">{parts[1]}</span>
                          {parts[2]}
                        </>
                      ) : (
                        step.description
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}