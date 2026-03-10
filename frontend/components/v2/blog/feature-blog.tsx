'use client'

import { Sora } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Arrow icon SVG
const arrowIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758250895/Vector_3_kuocut.svg"

interface BlogPost {
  _id: string
  title: string
  subtitle?: string
  slug: {
    current: string
  }
  heroImage?: string
  category?: string
}

interface FeatureBlogProps {
  posts: BlogPost[]
  title?: string
}

export default function FeatureBlog({ posts, title = "Featured articles" }: FeatureBlogProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const featuredCardRef = useRef(null)
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

      // Featured card animation (desktop first card)
      if (featuredCardRef.current) {
        gsap.from(featuredCardRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        })
      }

      // Secondary cards stagger animation
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
  const [featuredPost, ...secondaryPosts] = displayPosts

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} py-8 bg-white`}
    >
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#f1fff5] flex flex-col justify-center py-16 px-4 md:py-20 md:px-8 rounded-[32px]">
          <div className="max-w-6xl mx-auto w-full">
            {/* Heading */}
            <div ref={headingRef} className="w-full mb-8 md:mb-12">
              <h2 className="font-semibold text-[#001109] text-lg md:text-2xl text-center md:text-left leading-[1.25] md:leading-[1.5]">
                {title}
              </h2>
            </div>

            {displayPosts.length === 0 ? (
              <p className="text-[#001109]/60 text-base text-center md:text-left">No active posts</p>
            ) : (
            /* Cards Container */
            <div className="flex flex-col gap-6 md:gap-8 w-full">
            {/* Featured Card - Desktop: Horizontal, Mobile: Vertical */}
            {featuredPost && (
              <Link
                href={`/resources/blog/${featuredPost.slug.current}`}
                ref={featuredCardRef}
                className="block w-full"
              >
                <article className="bg-[#006840] rounded-[10px] overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Desktop: Horizontal Layout */}
                  <div className="hidden md:flex items-stretch">
                    {/* Text Content - Left Side */}
                    <div className="flex flex-col justify-between px-12 py-8 flex-1 min-h-[280px]">
                      <div className="flex flex-col gap-4">
                        {/* Category Label */}
                        <div className="font-extrabold text-[#b6ffce] text-xs tracking-[2.16px] uppercase leading-[1.3]">
                          {featuredPost.category?.toUpperCase() || 'BLOG POST'}
                        </div>

                        {/* Title */}
                        <h3 className="font-normal text-white text-[22px] leading-[1.5]">
                          {featuredPost.title}
                        </h3>

                        {/* Description */}
                        {featuredPost.subtitle && (
                          <p className="font-normal text-[#b6ffce] text-sm leading-[1.5]">
                            {featuredPost.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Read Button */}
                      <div className="flex gap-1.5 items-center group/link">
                        <span className="font-semibold text-[#ffba0a] text-base leading-[1.5]">
                          Read
                        </span>
                        <div className="relative w-4 h-4">
                          <Image
                            src={arrowIcon}
                            alt=""
                            fill
                            className="object-contain group-hover/link:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="relative w-1/2 min-h-[280px]">
                      {featuredPost.heroImage && (
                        <Image
                          src={featuredPost.heroImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover rounded-br-[10px] rounded-tr-[10px] group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                  </div>

                  {/* Mobile: Vertical Layout */}
                  <div className="md:hidden flex flex-col">
                    {/* Image - Top */}
                    <div className="relative w-full h-[200px]">
                      {featuredPost.heroImage && (
                        <Image
                          src={featuredPost.heroImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover rounded-tl-[10px] rounded-tr-[10px] group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    {/* Text Content - Bottom */}
                    <div className="flex flex-col gap-12 px-12 py-8">
                      <div className="flex flex-col gap-4">
                        {/* Category Label */}
                        <div className="font-extrabold text-[#b6ffce] text-xs tracking-[2.16px] uppercase leading-[1.3]">
                          {featuredPost.category?.toUpperCase() || 'BLOG POST'}
                        </div>

                        {/* Title */}
                        <h3 className="font-normal text-white text-[22px] leading-[1.5]">
                          {featuredPost.title}
                        </h3>

                        {/* Description */}
                        {featuredPost.subtitle && (
                          <p className="font-normal text-[#b6ffce] text-sm leading-[1.5]">
                            {featuredPost.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Read Button */}
                      <div className="flex gap-1.5 items-center group/link">
                        <span className="font-semibold text-[#ffba0a] text-base leading-[1.5]">
                          Read
                        </span>
                        <div className="relative w-4 h-4">
                          <Image
                            src={arrowIcon}
                            alt=""
                            fill
                            className="object-contain group-hover/link:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Secondary Cards - Grid */}
            {secondaryPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {secondaryPosts.map((post, index) => (
                  <Link
                    key={post._id}
                    href={`/resources/blog/${post.slug.current}`}
                    ref={setCardRef(index)}
                    className="block"
                  >
                    <article className="bg-[#006840] rounded-[10px] overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative w-full h-[200px]">
                        {post.heroImage && (
                          <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            className="object-cover rounded-tl-[10px] rounded-tr-[10px] group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-12 px-12 py-8 flex-1">
                        <div className="flex flex-col gap-4 flex-1">
                          {/* Category Label */}
                          <div className="font-extrabold text-[#b6ffce] text-xs tracking-[2.16px] uppercase leading-[1.3]">
                            {post.category?.toUpperCase() || 'BLOG POST'}
                          </div>

                          {/* Title */}
                          <h3 className="font-normal text-white text-[22px] leading-[1.5]">
                            {post.title}
                          </h3>

                          {/* Description */}
                          {post.subtitle && (
                            <p className="font-normal text-[#b6ffce] text-sm leading-[1.5]">
                              {post.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Read Button */}
                        <div className="flex gap-1.5 items-center group/link">
                          <span className="font-semibold text-[#ffba0a] text-base leading-[1.5]">
                            Read
                          </span>
                          <div className="relative w-4 h-4">
                            <Image
                              src={arrowIcon}
                              alt=""
                              fill
                              className="object-contain group-hover/link:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}