'use client'

import { useEffect, useState } from 'react'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

interface TOCItem {
  id: string
  text: string
  level: number // 2 for h2, 3 for h3
}

interface TableOfContentsProps {
  content: any[] // Portable Text content from Sanity
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from Portable Text content
    const extractedHeadings: TOCItem[]= []

    if (!content || !Array.isArray(content)) {
      console.log('TOC: No content or content is not an array', content)
      return
    }

    content.forEach((block, index) => {
      if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
        const text = block.children
          ?.map((child: any) => child.text)
          .join('') || ''

        if (text) {
          extractedHeadings.push({
            id: `heading-${block._key || index}`,
            text,
            level: block.style === 'h2' ? 2 : 3,
          })
        }
      }
    })

    console.log('TOC: Extracted headings:', extractedHeadings)
    setHeadings(extractedHeadings)

    // Intersection Observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    )

    // Observe all headings in the document
    const headingElements = document.querySelectorAll('h2, h3')
    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [content])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -120 // Account for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <div
      className={`${sora.className} bg-[#F5F5F5] box-border flex flex-col gap-[24px] p-[24px] rounded-[10px] w-full`}
      data-name="table-of-contents"
    >
      <div className="flex flex-col gap-[24px] w-full">
        {/* Header */}
        <div className="font-extrabold text-[#BABABA] text-[12px] tracking-[2.16px] uppercase leading-[1.3]">
          TABLE OF CONTENTS
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-[16px] w-full">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`text-left font-normal text-[#001109] transition-colors hover:text-[#006840] ${
                heading.level === 2 ? 'text-[16px]' : 'text-[14px] pl-[20px]'
              } ${activeId === heading.id ? 'text-[#006840] font-medium' : ''}`}
              style={{ lineHeight: 1.5 }}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}