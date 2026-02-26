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
import { FaqItem } from '@/data/faqs';

interface FaqsSectionProps {
  className?: string;
  faqData: FaqItem[];
}

export default function FaqsSection({ className = "", faqData }: FaqsSectionProps) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const accordionRef = useRef(null);

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
        <div className="max-w-7xl mx-auto">
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