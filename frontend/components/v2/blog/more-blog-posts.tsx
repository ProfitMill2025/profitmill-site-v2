'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  id: string
  title: string
  subtitle?: string
  description?: string
  heroImage?: string | null
  thumbnail?: string
  slug: string
  category?: string
  categories?: string[]
}

interface MoreBlogPostsProps {
  posts: BlogPost[]
  title?: string
}

export default function MoreBlogPosts({ posts, title = "More blog posts" }: MoreBlogPostsProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const setCardRef = useCallback((index: number) => (el: HTMLAnchorElement | null) => {
    if (el) cardsRef.current[index] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Cards stagger animation
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Show maximum of 3 posts
  const displayPosts = posts.slice(0, 3)

  // If no posts, don't render
  if (displayPosts.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} bg-[#00351F] rounded-[20px] md:rounded-[32px] px-5 py-12 md:px-[120px] md:py-20 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-white text-[32px] md:text-[42px] font-bold text-center leading-[1.2] mb-8 md:mb-12"
        >
          {title}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/resources/blog/${post.slug}`}
              ref={setCardRef(index)}
            >
              <article className="bg-[#006840] rounded-[10px] border border-[#B6FFCE] overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Thumbnail */}
                {(post.thumbnail || post.heroImage) && (
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <Image
                      src={post.thumbnail || post.heroImage || ''}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="px-8 md:px-12 py-8 flex flex-col flex-1">
                  <div className="flex-1 mb-12">
                    {/* Category Label */}
                    <div className="text-[#B6FFCE] text-xs font-extrabold uppercase tracking-[2.16px] leading-[1.3] mb-4">
                      {post.category || (post.categories && post.categories[0]) || 'BLOG POST'}
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-lg font-normal leading-[1.5] mb-4">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#B6FFCE] text-sm leading-[1.5]">
                      {post.description || post.subtitle || ''}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center gap-1.5 group/link">
                    <span className="text-[#FFBA0A] text-base font-semibold leading-[1.5]">
                      Read more
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-[#FFBA0A] group-hover/link:translate-x-1 transition-transform"
                    >
                      <path
                        d="M3 8H13M13 8L8 3M13 8L8 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}