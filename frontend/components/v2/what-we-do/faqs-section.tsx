'use client';

import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqsSectionProps {
  channel: string;
  className?: string;
}

// Channel-specific FAQ configurations
const channelFaqData = {
  'google-ads': [
    {
      question: "What exactly does Profit Mill do for my Google Ads?",
      answer: "Profit Mill takes care of your Google Ads by setting up, managing, and tracking your campaigns so you spend less on unqualified leads and more on results that increase profit. Your account is in the hands of a Google expert who really knows the ropes.",
      defaultOpen: true,
    },
    {
      question: "How does the free Google Ads audit work?",
      answer: "We'll review your current Google Ads account (or help you get started if you don't have one) and identify opportunities to improve performance. We'll look at your targeting, keywords, ad copy, landing pages, and tracking setup. Then we'll provide you with a clear roadmap for improvement—no strings attached.",
    },
    {
      question: "How does Profit Mill make Google Ads profitable?",
      answer: "We focus on the full funnel—not just clicks. We optimize for profit by improving Quality Score, refining targeting, and connecting ads to landing pages that convert. Plus, we track everything so you know exactly what's driving revenue. Most agencies optimize for vanity metrics. We optimize for what matters: your bottom line.",
    },
    {
      question: "What's different about managing Google Ads with Profit Mill compared to hiring in-house or going with a freelancer?",
      answer: "Unlike in-house hires who need training or freelancers who juggle multiple clients, you get dedicated Google Ads experts with platform insight from managing 1,000+ accounts. We provide strategic thinking, not just campaign management—connecting your ads to broader marketing goals for sustainable growth.",
    },
    {
      question: "Am I locked into a long-term contract?",
      answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. You can pause or cancel anytime with 30 days notice. Our goal is to make your Google Ads so profitable that you never want to leave.",
    },
  ],
  'linkedin-ads': [
    {
      question: "What exactly does Profit Mill do for my LinkedIn Ads?",
      answer: "We run LinkedIn Ads that reach the right people, build trust over long sales cycles, and influence enterprise deals that pay off down the line. Whether you're launching a new market or targeting niche buyers, we set you up with the strategy, tracking, and optimization to stay top of mind with the prospects who matter most.",
      defaultOpen: true,
    },
    {
      question: "How does the free LinkedIn Ads audit work?",
      answer: "We'll review your current LinkedIn Ads account (or help you get started if you don't have one) and analyze your targeting, creative, and campaign structure. We'll look at your audience targeting, ad performance, and conversion tracking. Then we'll provide you with a clear roadmap for reaching decision-makers and driving qualified pipeline—no strings attached.",
    },
    {
      question: "How does Profit Mill make LinkedIn Ads work for B2B?",
      answer: "We focus on account-based marketing that targets specific companies and decision-makers, not just broad demographics. We create content that speaks to your buyer's journey, from awareness to consideration to decision. Plus, we track everything back to pipeline and revenue so you know your LinkedIn investment is paying off.",
    },
    {
      question: "What's different about managing LinkedIn Ads with Profit Mill compared to hiring in-house or going with a freelancer?",
      answer: "Unlike in-house hires who need training or freelancers who juggle multiple clients, you get dedicated LinkedIn Ads experts with platform insight from managing hundreds of B2B accounts. We understand B2B sales cycles and provide strategic thinking that connects your LinkedIn efforts to broader revenue goals.",
    },
    {
      question: "Am I locked into a long-term contract?",
      answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. You can pause or cancel anytime with 30 days notice. Our goal is to make your LinkedIn Ads so effective at driving pipeline that you never want to leave.",
    },
  ],
  'other-channels': [
    {
      question: "Are we even ready for paid ads on other channels?",
      answer: "Maybe. Maybe not. We'll take a close look at your funnel, budget, and sales process to see if channels like Meta, Reddit, or Bing make sense for your goals, or if you should just double down on what's already working.",
      defaultOpen: true,
    },
    {
      question: "We've only run Google or LinkedIn ads. Will expanding just waste budget?",
      answer: "Not if you do it right. We start by understanding what's working in your current channels, then test new ones strategically with smaller budgets. We only scale what proves profitable. Many companies benefit from diversifying, but timing and execution matter more than jumping into every channel at once.",
    },
    {
      question: "Why not just hire in-house or go with a freelancer?",
      answer: "In-house hires are expensive and often lack cross-channel expertise. Freelancers can be hit-or-miss and usually focus on tactics, not strategy. We bring years of multi-channel experience, proven frameworks, and the ability to see how all your marketing efforts work together to drive profit.",
    },
    {
      question: "Will this take a lot of our time?",
      answer: "No. We handle the heavy lifting—setup, management, optimization, and reporting. You'll get regular updates and we're always available for questions, but our goal is to free up your time so you can focus on running your business while we handle the ads.",
    },
    {
      question: "How does the free ad audit work?",
      answer: "We'll review your current advertising efforts across all channels and identify opportunities for improvement or expansion. We'll look at your targeting, creative, tracking, and overall strategy. Then we'll give you a clear roadmap for optimizing what you have and strategically adding new channels—no strings attached.",
    },
    {
      question: "How does Profit Mill make paid ads profitable?",
      answer: "We focus on the metrics that matter: customer lifetime value, profit margins, and sustainable growth. We optimize for revenue, not just clicks or impressions. Plus, we track everything across channels so you can see exactly what's driving real business results.",
    },
    {
      question: "Am I locked into a long-term contract?",
      answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. You can pause or cancel anytime with 30 days notice. Our goal is to make your paid advertising so profitable across all channels that you never want to leave.",
    },
  ],
};

export default function FaqsSection({ channel, className = "" }: FaqsSectionProps) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const accordionRef = useRef(null);

  // Get FAQ data for the current channel
  const faqData = channelFaqData[channel as keyof typeof channelFaqData] || channelFaqData['google-ads'];

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
      });

      // Accordion animation
      gsap.from(accordionRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-white ${className}`}
    >
      {/* Desktop Layout */}
      <div className="hidden md:block py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-12 items-center justify-start w-full">
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-['Sora',_sans-serif] font-bold text-[42px] leading-[1.2] text-[#001109] text-center w-full"
          >
            FAQs
          </h2>

          {/* FAQ Accordion */}
          <div
            ref={accordionRef}
            className="w-full"
          >
            <Accordion
              type="single"
              collapsible
              defaultValue={faqData.find(faq => faq.defaultOpen)?.question}
              className="flex flex-col gap-4"
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className={`border-none rounded-[10px] ${
                    index % 2 === 0 ? 'bg-[#006840]' : 'bg-[#00351f]'
                  }`}
                >
                  <AccordionTrigger className="px-6 py-5 text-white hover:no-underline group [&[data-state=open]>svg]:rotate-180">
                    <div className="flex gap-4 items-start justify-start w-full">
                      <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200 text-white mt-1" />
                      <div className="flex-1 text-left">
                        <h3 className="font-['Sora',_sans-serif] font-normal text-[22px] leading-[1.5] text-white">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <div className="ml-10">
                      <div className="font-['Sora',_sans-serif] font-normal text-[16px] leading-[1.5] text-white">
                        {typeof faq.answer === 'string' ? (
                          <p>{faq.answer}</p>
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden py-14 px-4">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 items-center justify-start w-full">
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-['Sora',_sans-serif] font-bold text-[32px] leading-[1.2] text-[#001109] text-center w-full"
          >
            FAQs
          </h2>

          {/* FAQ Accordion */}
          <div
            ref={accordionRef}
            className="w-full"
          >
            <Accordion
              type="single"
              collapsible
              defaultValue={faqData.find(faq => faq.defaultOpen)?.question}
              className="flex flex-col gap-4"
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className={`border-none rounded-[10px] ${
                    index % 2 === 0 ? 'bg-[#006840]' : 'bg-[#00351f]'
                  }`}
                >
                  <AccordionTrigger className="px-6 py-5 text-white hover:no-underline group [&[data-state=open]>svg]:rotate-180">
                    <div className="flex gap-4 items-start justify-start w-full">
                      <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200 text-white mt-1" />
                      <div className="flex-1 text-left">
                        <h3 className="font-['Sora',_sans-serif] font-normal text-[18px] leading-[1.5] text-white">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <div className="ml-10">
                      <div className="font-['Sora',_sans-serif] font-normal text-[16px] leading-[1.5] text-white">
                        {typeof faq.answer === 'string' ? (
                          <p>{faq.answer}</p>
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}