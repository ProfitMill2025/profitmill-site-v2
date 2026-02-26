'use client'

import { Sora } from 'next/font/google'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Industry-specific FAQ configurations
const industryFaqs = {
  'saas': [
    {
      question: "How do you help SaaS companies improve trial-to-paid conversion rates?",
      answer: "We optimize the entire user journey from ad click to trial signup to paid conversion. This includes landing page optimization, onboarding sequence improvements, and targeted nurture campaigns for trial users."
    },
    {
      question: "What's your approach to reducing CAC for SaaS businesses?",
      answer: "We focus on targeting high-intent users who are more likely to convert and stay long-term. This includes optimizing for lifetime value (LTV), not just initial conversions, and implementing advanced attribution models to identify the most profitable acquisition channels."
    },
    {
      question: "Do you work with both B2B and B2C SaaS companies?",
      answer: "Yes, we work with both. Our strategies adapt based on your target market, sales cycle length, and customer behavior patterns. B2B typically focuses on LinkedIn and Google, while B2C might include social channels."
    },
    {
      question: "How do you measure success for SaaS advertising campaigns?",
      answer: "Beyond standard metrics, we track trial conversion rates, customer lifetime value (CLV), churn rates, and revenue attribution. We provide dashboards that show how advertising directly impacts your MRR growth."
    }
  ],
  'ecommerce': [
    {
      question: "How do you optimize ROAS for e-commerce advertising?",
      answer: "We use advanced product catalog optimization, smart bidding strategies, and customer segmentation to ensure ad spend goes toward high-value customers. We also implement dynamic remarketing and cart abandonment campaigns."
    },
    {
      question: "What platforms work best for e-commerce advertising?",
      answer: "It depends on your products and audience. We typically recommend Google Shopping and Search ads as a foundation, then expand to Meta (Facebook/Instagram), Pinterest, or other channels based on your customer data and product type."
    },
    {
      question: "How do you handle seasonal fluctuations in e-commerce?",
      answer: "We develop seasonal strategies that account for peak periods (like Black Friday) and slower seasons. This includes budget allocation planning, seasonal creative development, and inventory-based campaign management."
    },
    {
      question: "Can you help with international e-commerce expansion?",
      answer: "Yes, we help e-commerce brands expand to new markets with localized campaigns, currency considerations, and market-specific strategies. We handle the complexity of multi-country advertising setups."
    }
  ],
  'professional-services': [
    {
      question: "How do you generate high-quality leads for professional services?",
      answer: "We focus on targeting decision-makers with specific pain points your services solve. This includes LinkedIn advertising, search campaigns for high-intent keywords, and content-based lead magnets that demonstrate your expertise."
    },
    {
      question: "What's your approach to longer B2B sales cycles?",
      answer: "We build nurture sequences that keep your firm top-of-mind throughout the decision process. This includes retargeting campaigns, email automation, and content that addresses different stages of the buyer journey."
    },
    {
      question: "How do you help professional services firms stand out from competitors?",
      answer: "We develop messaging that emphasizes your unique value proposition and expertise. This includes case study-based creative, thought leadership positioning, and targeting strategies that reach your ideal client profile."
    },
    {
      question: "Do you work with specific types of professional services?",
      answer: "We work with law firms, accounting practices, consulting firms, marketing agencies, IT services, and other B2B professional services. Our approach adapts to your specific industry and target market."
    }
  ],
  'healthcare': [
    {
      question: "How do you ensure HIPAA compliance in healthcare advertising?",
      answer: "All our healthcare campaigns are built with HIPAA compliance from day one. We use compliant tracking methods, avoid collecting protected health information in ads, and ensure all landing pages meet privacy requirements."
    },
    {
      question: "What types of healthcare providers do you work with?",
      answer: "We work with medical practices, dental offices, mental health providers, specialty clinics, and healthcare systems. Each has unique compliance requirements and patient acquisition strategies."
    },
    {
      question: "How do you target patients locally for healthcare practices?",
      answer: "We use advanced local targeting including zip code targeting, radius targeting around your practice, and demographic targeting based on your ideal patient profile. We also optimize for local search visibility."
    },
    {
      question: "Can you help with patient retention and repeat visits?",
      answer: "Yes, we develop campaigns that target existing patients for follow-up care, preventive services, and additional treatments. This includes compliant retargeting and educational content campaigns."
    }
  ],
  'financial-services': [
    {
      question: "How do you navigate financial advertising regulations?",
      answer: "We stay current with FTC, SEC, and other regulatory requirements. All campaigns include required disclosures, comply with truth-in-advertising rules, and follow platform-specific financial services policies."
    },
    {
      question: "What types of financial services do you advertise for?",
      answer: "We work with financial advisors, insurance agencies, mortgage brokers, accounting firms, and other financial service providers. Each has unique regulatory and targeting requirements."
    },
    {
      question: "How do you build trust through financial services advertising?",
      answer: "We emphasize credentials, testimonials, and educational content that demonstrates expertise. Trust signals like certifications, awards, and client testimonials are integrated into all campaign materials."
    },
    {
      question: "Can you help target high-net-worth individuals?",
      answer: "Yes, we use sophisticated targeting to reach affluent audiences including income targeting, interest-based targeting, and lookalike audiences based on your best clients. All targeting respects privacy regulations."
    }
  ],
  'manufacturing': [
    {
      question: "How do you reach B2B decision-makers in manufacturing?",
      answer: "We use LinkedIn's advanced targeting to reach engineers, procurement managers, and C-suite executives in relevant industries. We also leverage industry publications and trade-specific targeting options."
    },
    {
      question: "What's your approach to long B2B sales cycles in manufacturing?",
      answer: "We build comprehensive nurture campaigns that provide valuable content throughout the research and decision process. This includes technical resources, case studies, and capability demonstrations."
    },
    {
      question: "How do you showcase technical capabilities in advertising?",
      answer: "We develop content that demonstrates your manufacturing expertise, including video tours, case studies, technical specifications, and customer success stories. The focus is on credibility and capability."
    },
    {
      question: "Can you help with industry-specific trade show and event marketing?",
      answer: "Yes, we create integrated campaigns around trade shows and industry events. This includes pre-event awareness, lead capture during events, and follow-up campaigns for post-event nurturing."
    }
  ]
}

interface IndustryFaqsProps {
  industry: string
}

export default function IndustryFaqs({ industry }: IndustryFaqsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const faqsRef = useRef<(HTMLDivElement | null)[]>([])

  const setFaqRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) faqsRef.current[index] = el
  }, [])

  // Get FAQs for current industry or default to SaaS
  const faqs = industryFaqs[industry as keyof typeof industryFaqs] || industryFaqs.saas

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

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

      // FAQs stagger animation
      gsap.from(faqsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
      className={`${sora.className} bg-[#f1fff5] py-12 px-4 md:py-20 md:px-8`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="font-bold text-[32px] md:text-[42px] leading-[1.2] text-center text-[#001109]"
          >
            Frequently asked questions
          </h2>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={setFaqRef(index)}
              className="bg-white rounded-[12px] border border-gray-100 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[16px] md:text-[18px] text-[#001109] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#001109] transition-transform flex-shrink-0 ${
                    openFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openFaq === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="font-normal text-[16px] leading-[1.6] text-[#001109] pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="font-normal text-[16px] leading-[1.5] text-[#001109] mb-6">
            Have more questions about how we work with your industry?
          </p>
          <button className="bg-[#ffba0a] hover:bg-[#ffba0a]/90 transition-colors px-8 py-3.5 rounded-[2px]">
            <span className="font-semibold text-[14px] text-black">
              Schedule a consultation
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}