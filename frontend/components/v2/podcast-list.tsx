'use client'

import { Sora } from 'next/font/google'
import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotifyEmbed from './spotify-embed'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// Chevron icon for pagination
const chevronIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758384287/Vector_4_tcrwdz.svg"

interface Podcast {
  _id: string
  title: string
  spotifyUrl: string
}

interface PodcastListProps {
  sectionTitle?: string
  podcasts: Podcast[]
  itemsPerPage?: number
  showPagination?: boolean
}

function PaginationButton({
  children,
  isActive = false,
  onClick,
  disabled = false,
  className = ""
}: {
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`box-border content-stretch flex gap-[5px] items-center justify-center relative shrink-0 transition-all duration-200 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive
          ? 'bg-[#006840] text-[#f1fff5] px-[8px] py-[6px] rounded-[500px] size-[40px]'
          : 'text-[#006840] px-[8px] py-[6px] rounded-[500px] size-[40px]'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default function PodcastList({
  sectionTitle = "Latest episodes",
  podcasts,
  itemsPerPage = 6,
  showPagination = true
}: PodcastListProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const paginationRef = useRef(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
  }, [])

  // Pagination
  const totalPages = Math.ceil(podcasts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPodcasts = podcasts.slice(startIndex, startIndex + itemsPerPage)

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    if (cardsGridRef.current) {
      const elementTop = cardsGridRef.current.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementTop - 200,
        behavior: 'smooth'
      })
    }
  }

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} py-8 bg-white`}
    >
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#f1fff5] text-black py-16 px-4 md:py-20 md:px-8 rounded-[32px]">
          <div className="max-w-6xl mx-auto w-full">
            {/* Section Header */}
            {sectionTitle && (
              <div ref={headingRef} className="mb-12">
                <h2 className="font-bold leading-[1.2] text-[#001109] text-[32px] md:text-[42px] text-center w-full">
                  {sectionTitle}
                </h2>
              </div>
            )}

            {/* Podcasts Grid - Spotify Embeds as Cards */}
            <div ref={cardsGridRef} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPodcasts.map((podcast, index) => (
                  <div
                    key={podcast._id}
                    ref={setCardRef(index)}
                  >
                    <SpotifyEmbed spotifyUrl={podcast.spotifyUrl} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {showPagination && totalPages > 1 && (
              <div ref={paginationRef} className="flex gap-[16px] items-center justify-center">
                {/* Previous button */}
                <PaginationButton
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-[18px] py-[28px] rounded-[2px]"
                >
                  <div className="flex items-center justify-center">
                    <div className="rotate-[180deg]">
                      <img alt="Previous page" className="w-[20px] h-[15px]" src={chevronIcon} />
                    </div>
                  </div>
                </PaginationButton>

                {/* Page numbers */}
                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                  let pageNumber: number | string = index + 1
                  if (totalPages > 5 && index === 3) pageNumber = '...'
                  else if (totalPages > 5 && index === 4) pageNumber = totalPages

                  return (
                    <PaginationButton
                      key={index}
                      isActive={pageNumber === currentPage}
                      onClick={() => typeof pageNumber === 'number' ? handlePageClick(pageNumber) : undefined}
                      disabled={pageNumber === '...'}
                    >
                      <span className="font-semibold text-[16px]">{pageNumber}</span>
                    </PaginationButton>
                  )
                })}

                {/* Next button */}
                <PaginationButton
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-[18px] py-[28px] rounded-[2px]"
                >
                  <div className="flex items-center justify-center">
                    <img alt="Next page" className="w-[20px] h-[15px]" src={chevronIcon} />
                  </div>
                </PaginationButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
