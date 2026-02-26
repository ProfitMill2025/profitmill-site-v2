'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Industry-specific CTA configurations
const industryCtaConfigs = {
  'saas': {
    title: "Ready to scale your SaaS with profitable paid ads?",
    description: "Join other SaaS companies that have transformed their growth with our proven advertising strategies. Get a free audit to see how we can help you optimize trial-to-paid conversions.",
    buttonText: "Get your free SaaS audit",
    benefits: [
      "Trial conversion optimization analysis",
      "CAC reduction strategy recommendations",
      "Competitive landscape assessment",
      "Growth forecasting and planning"
    ]
  },
  'ecommerce': {
    title: "Ready to turn your ad spend into profit?",
    description: "Join e-commerce brands that have scaled profitably with our data-driven approach. Get a free audit to see how we can optimize your ROAS and drive more sales.",
    buttonText: "Get your free e-commerce audit",
    benefits: [
      "Product catalog optimization review",
      "ROAS improvement recommendations",
      "Customer segmentation analysis",
      "Seasonal strategy planning"
    ]
  },
  'professional-services': {
    title: "Ready to book more premium clients?",
    description: "Join professional service firms that have transformed their lead generation with our targeted B2B strategies. Get a free audit to see how we can help you attract high-value clients.",
    buttonText: "Get your free services audit",
    benefits: [
      "Lead quality assessment",
      "Competitive positioning review",
      "Sales cycle optimization analysis",
      "ROI and pipeline forecasting"
    ]
  },
  'healthcare': {
    title: "Ready to grow your practice compliantly?",
    description: "Join healthcare providers that have scaled their patient base with our compliant advertising approach. Get a free audit to see how we can help you attract more patients.",
    buttonText: "Get your free healthcare audit",
    benefits: [
      "HIPAA compliance assessment",
      "Local market analysis",
      "Patient journey optimization",
      "Practice growth planning"
    ]
  },
  'financial-services': {
    title: "Ready to attract high-value clients compliantly?",
    description: "Join financial service providers that have grown their client base with our compliant, trust-building advertising strategies. Get a free audit to see how we can help.",
    buttonText: "Get your free financial audit",
    benefits: [
      "Regulatory compliance review",
      "Trust-building strategy assessment",
      "High-net-worth targeting analysis",
      "Lead quality optimization"
    ]
  },
  'manufacturing': {
    title: "Ready to reach more B2B decision-makers?",
    description: "Join manufacturing companies that have expanded their reach with our B2B-focused advertising strategies. Get a free audit to see how we can help you generate qualified leads.",
    buttonText: "Get your free manufacturing audit",
    benefits: [
      "B2B targeting strategy review",
      "Sales cycle optimization analysis",
      "Technical capability showcasing",
      "Industry positioning assessment"
    ]
  }
}

interface IndustryCtaProps {
  industry: string
}

export default function IndustryCta({ industry }: IndustryCtaProps) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const benefitsRef = useRef(null)

  // Get configuration for current industry or default to SaaS
  const config = industryCtaConfigs[industry as keyof typeof industryCtaConfigs] || industryCtaConfigs.saas

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Benefits animation
      gsap.from(benefitsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
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
      className={`${sora.className} bg-white py-12 px-4 md:py-20 md:px-8`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#00351f] rounded-[20px] md:rounded-[32px] p-8 md:p-12">
          {/* Main Content */}
          <div ref={contentRef} className="text-center mb-8">
            <h2 className="font-bold text-[28px] md:text-[36px] leading-[1.2] text-white mb-6">
              {config.title}
            </h2>
            <p className="font-normal text-[16px] md:text-[18px] leading-[1.5] text-white mb-8">
              {config.description}
            </p>
            <button className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors px-8 py-4 rounded-[2px] mb-8">
              <span className="font-semibold text-[16px] text-black">
                {config.buttonText}
              </span>
            </button>
          </div>

          {/* Benefits */}
          <div ref={benefitsRef} className="border-t border-white/20 pt-8">
            <p className="font-semibold text-[14px] text-[#b6ffce] mb-4 text-center">
              YOUR FREE AUDIT INCLUDES:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {config.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#b6ffce] rounded-full mt-2 flex-shrink-0" />
                  <span className="font-normal text-[14px] leading-[1.4] text-white">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Signal */}
          <div className="mt-8 text-center">
            <p className="font-normal text-[12px] text-[#b6ffce]">
              ✓ No long-term contracts • ✓ Transparent reporting • ✓ Industry expertise guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}