'use client'

import Image from 'next/image'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

interface BlogPostHeaderProps {
  title: string
  heroImage: string
  heroImageAlt?: string
}

export default function BlogPostHeader({ title, heroImage, heroImageAlt }: BlogPostHeaderProps) {
  return (
    <section
      className={`${sora.className} pt-[120px] md:pt-[161px] pb-8 bg-white`}
      data-name="blog-post-header"
    >
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#00351f] box-border relative overflow-hidden rounded-[20px] md:rounded-[32px] w-full">
      {/* Decorative circular shapes - left side */}
      <div
        className="absolute h-[1302.34px] left-[-273px] top-[-79px] w-[1309.24px] z-[1]"
        data-name="shapes"
      >
        {/* Generate concentric circles with increasing sizes */}
        {Array.from({ length: 9 }).map((_, i) => {
          const inset = `${i * 5.544}%`
          return (
            <div
              key={i}
              className="absolute border border-[#006840] rounded-full"
              style={{
                inset: inset,
              }}
            />
          )
        })}
      </div>

      {/* Decorative light glow - right side (desktop only) */}
      <div
        className="absolute right-[-300px] top-[-256px] w-[1454px] h-[1454px] z-[2] hidden lg:block pointer-events-none"
        data-name="light"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(182, 255, 206, 0.15) 0%, rgba(182, 255, 206, 0) 100%)',
        }}
      />

          {/* Content container */}
          <div
            className="relative z-[4] flex flex-col gap-[80px] items-start pb-[48px] md:pb-[96px] pt-[80px] px-4 md:px-8 lg:px-[120px] w-full"
            data-name="content"
          >
        {/* Text content */}
        <div className="flex flex-col gap-[16px] items-start w-full max-w-6xl">
          {/* Breadcrumb */}
          <div
            className={`${sora.className} font-extrabold text-[12px] text-white tracking-[2.16px] uppercase leading-[1.3]`}
          >
            BLOG / BLOG POST
          </div>

          {/* Title */}
          <h1
            className={`${sora.className} font-bold text-[#CEFF00] text-[32px] md:text-[48px] lg:text-[72px] tracking-[0.72px] leading-[1.2] w-full`}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Hero image */}
      <div
        className="relative h-[300px] md:h-[400px] w-full z-[3] rounded-bl-[20px] md:rounded-bl-[32px] rounded-br-[20px] md:rounded-br-[32px] overflow-hidden"
        data-name="image"
      >
        <Image
          src={heroImage}
          alt={heroImageAlt || title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
        </div>
      </div>
    </section>
  )
}