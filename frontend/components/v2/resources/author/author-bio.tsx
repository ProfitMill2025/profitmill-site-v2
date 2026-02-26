'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface AuthorBioProps {
  author: {
    name: string
    bio?: string
    profileImage?: string | null
    linkedinUrl?: string
  }
  className?: string
}

export default function AuthorBio({ author, className = '' }: AuthorBioProps) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const headingRef = useRef(null)
  const linkedinRef = useRef(null)
  const bioRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Heading animation
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // LinkedIn icon animation
      gsap.from(linkedinRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Bio text animation
      gsap.from(bioRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Split bio into paragraphs for proper formatting
  const bioParagraphs = author.bio?.split('\n\n').filter(p => p.trim()) || []

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-white py-8 md:py-12 ${className}`}
      data-name="author-bio"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Desktop Layout (side by side) */}
        <div className="hidden md:flex bg-[#F5F5F5] rounded-[32px] p-8 gap-8 items-start">
          {/* Author Image */}
          {author.profileImage && (
            <div
              ref={imageRef}
              className="flex-shrink-0"
            >
              <div className="w-[240px] h-[240px] rounded-[4.5px] overflow-hidden relative">
                <Image
                  src={author.profileImage}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[#006840] text-[22px] font-normal leading-[1.5]"
            >
              About {author.name}
            </h2>

            {/* LinkedIn Icon */}
            {author.linkedinUrl && (
              <Link
                ref={linkedinRef}
                href={author.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
                aria-label={`${author.name} LinkedIn profile`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.25402 6.66641C9.25353 7.75216 8.59482 8.7292 7.5885 9.13681C6.58218 9.54444 5.42921 9.30124 4.67325 8.5219C3.91729 7.74256 3.70932 6.5827 4.14738 5.58926C4.58546 4.59582 5.5821 3.96717 6.66736 3.99974C8.10878 4.04301 9.25468 5.22433 9.25402 6.66641ZM9.33402 11.3064H4.00069V27.9997H9.33402V11.3064ZM17.7607 11.3064H12.454V27.9997H17.7074V19.2397C17.7074 14.3597 24.0674 13.9064 24.0674 19.2397V27.9997H29.3341V17.4264C29.3341 9.19974 19.9207 9.50641 17.7074 13.5464L17.7607 11.3064Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            )}

            {/* Bio Text */}
            <div
              ref={bioRef}
              className="text-[#001109] text-[16px] font-normal leading-[1.5] space-y-4"
            >
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden flex flex-col bg-[#F5F5F5] rounded-[32px] p-8 gap-8">
          {/* Author Image */}
          {author.profileImage && (
            <div
              ref={imageRef}
              className="flex-shrink-0"
            >
              <div className="w-[240px] h-[240px] rounded-[4.5px] overflow-hidden relative">
                <Image
                  src={author.profileImage}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[#006840] text-[22px] font-normal leading-[1.5]"
            >
              About {author.name}
            </h2>

            {/* LinkedIn Icon */}
            {author.linkedinUrl && (
              <Link
                ref={linkedinRef}
                href={author.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
                aria-label={`${author.name} LinkedIn profile`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.25402 6.66641C9.25353 7.75216 8.59482 8.7292 7.5885 9.13681C6.58218 9.54444 5.42921 9.30124 4.67325 8.5219C3.91729 7.74256 3.70932 6.5827 4.14738 5.58926C4.58546 4.59582 5.5821 3.96717 6.66736 3.99974C8.10878 4.04301 9.25468 5.22433 9.25402 6.66641ZM9.33402 11.3064H4.00069V27.9997H9.33402V11.3064ZM17.7607 11.3064H12.454V27.9997H17.7074V19.2397C17.7074 14.3597 24.0674 13.9064 24.0674 19.2397V27.9997H29.3341V17.4264C29.3341 9.19974 19.9207 9.50641 17.7074 13.5464L17.7607 11.3064Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            )}

            {/* Bio Text */}
            <div
              ref={bioRef}
              className="text-[#001109] text-[16px] font-normal leading-[1.5] space-y-4"
            >
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
