'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// SVG arrow icons (will be processed through Cloudinary)
const img = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758250895/Vector_3_kuocut.svg"
const img1 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758384287/Vector_4_tcrwdz.svg"
const img2 = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758384287/Vector_4_tcrwdz.svg"

interface CaseStudy {
  _id?: string
  id?: string
  type?: string
  title: string
  tags?: string
  slug?: {
    current: string
  }
  clientName?: string
  industry?: string
  tools?: string
  excerpt?: string
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  index: number
  setContentRef: (index: number) => (el: HTMLDivElement | null) => void
}

interface CaseStudyListProps {
  title?: string
  caseStudies?: CaseStudy[]
  filters?: string[]
  currentPage?: number
  totalPages?: number
  onFilterChange?: (filter: string) => void
  onPageChange?: (page: number) => void
  itemsPerPage?: number
}

function CaseStudyCard({ caseStudy, index, setContentRef }: CaseStudyCardProps) {
  return (
    <div
      ref={setContentRef(index)}
      className="bg-[#006840] box-border content-stretch flex flex-col h-[380px] items-start justify-between px-[48px] py-[32px] relative rounded-[10px] shrink-0"
    >
      <div className="content-stretch flex flex-col gap-[16px] items-start justify-start leading-[0] relative shrink-0 w-full">
        <div className="font-extrabold relative shrink-0 text-[#b6ffce] text-[12px] tracking-[2.16px] uppercase w-full">
          <p className="leading-[1.3]">{caseStudy.type || 'CASE STUDY'}</p>
        </div>
        <div className="font-normal relative shrink-0 text-[18px] text-white w-full">
          <p className="leading-[1.5]">{caseStudy.title}</p>
        </div>
        <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
          <p className="leading-[1.5]">{caseStudy.tags || `${caseStudy.industry || 'B2B SaaS'}, ${caseStudy.tools || 'Google Ads'}`}</p>
        </div>
      </div>
      {caseStudy.slug?.current ? (
        <Link href={`/case-studies/${caseStudy.slug.current}`} className="content-stretch flex gap-[5px] items-center justify-start relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="font-semibold leading-[0] relative shrink-0 text-[#ffba0a] text-[16px] text-nowrap">
            <p className="leading-[1.5] whitespace-pre">Read more</p>
          </div>
          <div className="h-0 relative shrink-0 w-[16px]">
            <div className="absolute bottom-[-7.36px] left-0 right-[-6.25%] top-[-7.36px]">
              <img alt="" className="block max-w-none size-full" src={img} />
            </div>
          </div>
        </Link>
      ) : (
        <div className="content-stretch flex gap-[5px] items-center justify-start relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="font-semibold leading-[0] relative shrink-0 text-[#ffba0a] text-[16px] text-nowrap">
            <p className="leading-[1.5] whitespace-pre">Read more</p>
          </div>
          <div className="h-0 relative shrink-0 w-[16px]">
            <div className="absolute bottom-[-7.36px] left-0 right-[-6.25%] top-[-7.36px]">
              <img alt="" className="block max-w-none size-full" src={img} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterButton({
  label,
  isActive,
  onClick
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`box-border content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[16px] relative rounded-[500px] shrink-0 border-2 border-[#006840] transition-all duration-200 hover:opacity-80 ${
        isActive
          ? 'bg-[#006840] text-white'
          : 'bg-transparent text-[#001109]'
      }`}
    >
      <div className="font-normal leading-[0] relative shrink-0 text-[14px] text-center text-nowrap">
        <p className="leading-[1.5] whitespace-pre">{label}</p>
      </div>
    </button>
  )
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

const defaultCaseStudies: CaseStudy[] = [
  {
    id: '1',
    type: 'case study',
    title: 'How a CSV importer platform cut their ad spend by 50% while getting more high-quality leads',
    tags: 'B2B SaaS, Google Ads'
  },
  {
    id: '2',
    type: 'case study',
    title: 'How a Gen AI flashcard platform got 5x ROI from Google Ads within 1 month and hit record revenue',
    tags: 'B2B SaaS, Google Ads'
  },
  {
    id: '3',
    type: 'case study',
    title: 'How I helped a leading audience engagement platform optimize Google Ads for high-value leads',
    tags: 'B2B SaaS, Google Ads'
  },
  {
    id: '4',
    type: 'case study',
    title: 'How a public speaking training company expanded beyond referrals and achieved positive ROI within the 1st year',
    tags: 'Services, Google Ads'
  },
  {
    id: '5',
    type: 'case study',
    title: 'How a scavenger hunt company 3x\'d their revenue with Google Ads',
    tags: 'Services, Google Ads'
  },
  {
    id: '6',
    type: 'case study',
    title: 'How an artisan baker platform saw a 460% increase in free trials within 1 month',
    tags: 'B2B SaaS, Google Ads'
  }
]

const defaultFilters = ['All', 'PLG', 'B2B SaaS', 'Services', 'Google Ads', 'LinkedIn Ads', 'Other Paid Ads']

export default function CaseStudyList({
  title = "We don't overpromise, we just deliver",
  caseStudies = defaultCaseStudies,
  filters = defaultFilters,
  currentPage = 1,
  totalPages,
  onFilterChange,
  onPageChange,
  itemsPerPage // Will be calculated based on screen size
}: CaseStudyListProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const filterRef = useRef(null)
  const contentRef = useRef<(HTMLDivElement | null)[]>([])
  const paginationRef = useRef(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)

  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPageState, setCurrentPageState] = useState(currentPage)
  const [isMobile, setIsMobile] = useState(false)

  // Calculate items per page based on screen size
  const desktopItemsPerPage = 9 // 3 rows × 3 columns
  const mobileItemsPerPage = 6 // 6 items per page on mobile
  const actualItemsPerPage = itemsPerPage || (isMobile ? mobileItemsPerPage : desktopItemsPerPage)

  // Filter case studies based on active filter
  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    if (activeFilter === 'All') return true

    // Split tags and check if any tag matches the filter
    const tags = caseStudy.tags?.split(', ') || []
    return tags.some(tag => tag.trim() === activeFilter)
  })

  // Calculate pagination based on filtered results
  const totalPagesCalculated = Math.ceil(filteredCaseStudies.length / actualItemsPerPage)
  const actualTotalPages = totalPages || totalPagesCalculated

  // Get current page items from filtered results
  const startIndex = (currentPageState - 1) * actualItemsPerPage
  const endIndex = startIndex + actualItemsPerPage
  const currentPageItems = filteredCaseStudies.slice(startIndex, endIndex)

  // Always show exactly 3 rows (9 items max per page)
  const maxRowsPerPage = 3

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    // Check on mount
    checkIsMobile()

    // Add resize listener
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const setContentRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) contentRef.current[index] = el
  }, [])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPageState(1) // Reset to first page when filter changes
    onFilterChange?.(filter)
  }

  const handlePageClick = (page: number) => {
    setCurrentPageState(page)
    onPageChange?.(page)

    // Scroll to top of case studies grid with smooth animation and extra offset
    if (cardsGridRef.current) {
      const elementTop = cardsGridRef.current.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementTop - 200 // Add 200px offset above the cards

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Case study cards stagger animation
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Pagination animation
      gsap.from(paginationRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
        },
      })
    })

    return () => ctx.revert()
  }, [filteredCaseStudies])

  // Run heading and filter animations only once on mount
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

      // Filter buttons animation
      gsap.from(filterRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, []) // Empty dependency array - runs only once on mount

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} py-8 bg-white`}
    >
      <div className="mx-auto px-4 md:px-8">
        <div id="case-studies-list" className="bg-[#f1fff5] text-black flex flex-col justify-center py-16 px-4 md:py-20 md:px-8 rounded-[32px]">
          <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div ref={headingRef} className="content-stretch flex flex-col gap-[20px] items-start justify-start relative shrink-0 w-full mb-12">
          <h2 className="font-bold leading-[1.2] relative shrink-0 text-[#001109] text-[32px] md:text-[42px] text-center w-full">
            {title}
          </h2>
        </div>

        {/* Filter Buttons */}
        <div ref={filterRef} className="content-stretch flex flex-col md:flex-row gap-[24px] items-start md:items-center justify-start relative rounded-[10px] shrink-0 w-full mb-12">
          <div className="flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#001109] text-[12px] text-center text-nowrap tracking-[2.16px] uppercase">
            <p className="leading-[1.3] whitespace-pre">Filter by:</p>
          </div>
          <div className="content-start flex flex-wrap gap-[8px] items-start justify-start md:justify-between min-h-px min-w-px relative shrink-0 w-full md:flex-1">
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div ref={cardsGridRef} className="content-stretch flex flex-col gap-[32px] items-start justify-start relative shrink-0 w-full mb-12">
          {/* Desktop: Always exactly 3 rows, 3 columns - consistent height */}
          <div className="hidden md:flex content-stretch flex-col gap-[32px] items-start justify-start relative shrink-0 w-full">
            {Array.from({ length: maxRowsPerPage }, (_, rowIndex) => {
              const rowStartIndex = rowIndex * 3
              const rowEndIndex = rowStartIndex + 3
              const rowItems = currentPageItems.slice(rowStartIndex, rowEndIndex)

              return (
                <div key={rowIndex} className="content-stretch flex gap-[32px] items-start justify-start relative shrink-0 w-full h-[380px]">
                  {Array.from({ length: 3 }, (_, colIndex) => {
                    const caseStudy = rowItems[colIndex]

                    if (caseStudy) {
                      // Render actual case study card
                      return (
                        <div key={caseStudy._id || caseStudy.id || `case-${rowIndex}-${colIndex}`} className="basis-0 grow min-h-px min-w-px shrink-0">
                          <CaseStudyCard
                            caseStudy={caseStudy}
                            index={rowStartIndex + colIndex}
                            setContentRef={setContentRef}
                          />
                        </div>
                      )
                    } else {
                      // Render invisible placeholder to maintain consistent height and layout
                      return (
                        <div key={`empty-${rowIndex}-${colIndex}`} className="basis-0 grow min-h-[380px] min-w-px shrink-0 invisible">
                          {/* Empty placeholder with same height as case study card */}
                        </div>
                      )
                    }
                  })}
                </div>
              )
            })}
          </div>

          {/* Mobile: Single column with pagination */}
          <div className="md:hidden content-stretch flex flex-col gap-[24px] items-start justify-start relative shrink-0 w-full">
            {currentPageItems.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy._id || caseStudy.id || `mobile-case-${index}`}
                caseStudy={caseStudy}
                index={index}
                setContentRef={setContentRef}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div ref={paginationRef} className="content-stretch flex gap-[16px] items-center justify-center md:justify-center relative shrink-0">
          {/* Previous button */}
          <PaginationButton
            onClick={() => handlePageClick(currentPageState - 1)}
            disabled={currentPageState === 1}
            className="px-[18px] py-[28px] rounded-[2px]"
          >
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg]">
                <div className="h-0 relative w-[20px]">
                  <div className="absolute bottom-[-7.36px] left-0 right-[-5%] top-[-7.36px]">
                    <img alt="Previous page" className="block max-w-none size-full" src={img1} />
                  </div>
                </div>
              </div>
            </div>
          </PaginationButton>

          {/* Page numbers */}
          {Array.from({ length: Math.min(actualTotalPages, 5) }, (_, index) => {
            let pageNumber: number | string = index + 1

            // Show ellipsis and last page if there are many pages
            if (actualTotalPages > 5 && index === 3) {
              pageNumber = '...'
            } else if (actualTotalPages > 5 && index === 4) {
              pageNumber = actualTotalPages
            }

            return (
              <PaginationButton
                key={index}
                isActive={pageNumber === currentPageState}
                onClick={() => typeof pageNumber === 'number' ? handlePageClick(pageNumber) : undefined}
                disabled={pageNumber === '...'}
              >
                <div className="font-semibold leading-[0] relative shrink-0 text-[16px] text-nowrap">
                  <p className="leading-[1.5] whitespace-pre">{pageNumber}</p>
                </div>
              </PaginationButton>
            )
          })}

          {/* Next button */}
          <PaginationButton
            onClick={() => handlePageClick(currentPageState + 1)}
            disabled={currentPageState === actualTotalPages}
            className="px-[18px] py-[28px] rounded-[2px]"
          >
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none">
                <div className="h-0 relative w-[20px]">
                  <div className="absolute bottom-[-7.36px] left-[-5%] right-0 top-[-7.36px]">
                    <img alt="Next page" className="block max-w-none size-full" src={img2} />
                  </div>
                </div>
              </div>
            </div>
          </PaginationButton>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}