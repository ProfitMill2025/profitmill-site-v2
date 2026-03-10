'use client'

import { Sora } from 'next/font/google'
import { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PortableText } from '@portabletext/react'

const sora = Sora({ subsets: ['latin'] })

gsap.registerPlugin(ScrollTrigger)

// SVG icons from Cloudinary
const arrowIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758250895/Vector_3_kuocut.svg"
const chevronIcon = "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758384287/Vector_4_tcrwdz.svg"

// Download Icon SVG Component
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path d="M3 19.0408H21V21.0408H3V19.0408ZM13 13.2124L19.0711 7.14127L20.4853 8.55549L12 17.0408L3.51472 8.55549L4.92893 7.14127L11 13.2124V2.04077H13V13.2124Z" fill="#FFBA0A"/>
  </svg>
)

interface Resource {
  _id?: string
  id?: string
  type?: string // e.g., 'EPISODE 01', 'WEBINAR', 'GUIDE', 'CHECKLIST'
  title: string
  text?: string // Description text
  description?: any[] // Portable Text blocks for rich text
  tags?: string // For case study style tags
  url?: string // Link to resource page
  downloadLink?: string // Direct download link
  slug?: {
    current: string
  }
  // Additional fields for flexibility
  coverImage?: any // For resources with images
  duration?: string // For podcasts/webinars
  date?: string // Publication or event date
  author?: string // Resource author
  excerpt?: string // For backwards compatibility
  bulletPoints?: string[] // For downloadable resources
  ctaText?: string // Custom CTA text
}

interface ResourceCardProps {
  resource: Resource
  index: number
  setContentRef: (index: number) => (el: HTMLDivElement | null) => void
  cardType?: 'simple' | 'withImage' // simple for podcasts, withImage for downloads
}

interface ResourceListProps {
  sectionTitle?: string
  sectionSubtitle?: string
  sectionTitleClassName?: string // Custom classes for the title (overrides default)
  sectionTitleAlign?: 'left' | 'center' // Title alignment (default: center)
  resources?: Resource[]
  filters?: string[]
  currentPage?: number
  totalPages?: number
  onFilterChange?: (filter: string) => void
  onPageChange?: (page: number) => void
  itemsPerPage?: number
  cardType?: 'simple' | 'withImage' | 'auto' // auto determines based on content
  showPagination?: boolean
  columns?: number // Number of columns to display
  backgroundColor?: 'light-green' | 'white' | 'none' // Background color option
}

function ResourceCard({
  resource,
  index,
  setContentRef,
  cardType = 'simple'
}: ResourceCardProps) {
  const hasDownload = !!resource.downloadLink
  const hasUrl = !!(resource.url || resource.slug?.current)
  const hasCoverImage = !!resource.coverImage

  // Determine card type automatically if needed
  const actualCardType = cardType === 'simple' || !hasCoverImage ? 'simple' : 'withImage'

  if (actualCardType === 'withImage' && hasCoverImage) {
    // Card with image header (for downloadables/webinars)
    return (
      <div
        ref={setContentRef(index)}
        className="bg-[#006840] flex flex-col items-start justify-start relative rounded-[10px] w-full"
      >
        {/* Image Header */}
        <div className="bg-center bg-cover bg-no-repeat h-[200px] rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-full relative overflow-hidden">
          {resource.coverImage && (
            <Image
              src={resource.coverImage}
              alt={resource.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="box-border flex flex-col gap-6 items-start justify-start px-[48px] py-[32px] relative w-full">
          <div className="content-stretch flex flex-col gap-[16px] items-start justify-start leading-[0] relative shrink-0 w-full">
            {resource.type && (
              <div className="font-extrabold relative shrink-0 text-[#b6ffce] text-[12px] tracking-[2.16px] uppercase w-full">
                <p className="leading-[1.3]">{resource.type}</p>
              </div>
            )}
            <div className="font-normal relative shrink-0 text-[18px] text-white w-full">
              <p className="leading-[1.5]">{resource.title}</p>
            </div>
            {resource.description && Array.isArray(resource.description) ? (
              <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
                <PortableText
                  value={resource.description}
                  components={{
                    block: {
                      normal: ({children}) => <p className="leading-[1.5]">{children}</p>,
                    },
                    list: {
                      bullet: ({children}) => <ul className="list-disc ml-[21px] mt-2 space-y-1">{children}</ul>,
                    },
                    listItem: {
                      bullet: ({children}) => <li className="leading-[1.5]">{children}</li>,
                    },
                  }}
                />
              </div>
            ) : resource.text ? (
              <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
                <p className="leading-[1.5]">{resource.text}</p>
              </div>
            ) : null}
            {resource.bulletPoints && resource.bulletPoints.length > 0 && (
              <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
                <ul className="list-disc ml-[21px]">
                  {resource.bulletPoints.map((point, i) => (
                    <li key={i} className={i > 0 ? '' : 'mb-0'}>
                      <span className="leading-[1.5]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-[8px] items-center justify-start relative">
            {hasDownload ? (
              <a
                href={resource.downloadLink}
                download
                className="flex gap-[8px] items-center justify-start cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="font-semibold leading-[0] relative shrink-0 text-[#ffba0a] text-[16px] text-nowrap">
                  <p className="leading-[1.5] whitespace-pre">{resource.ctaText || 'Download'}</p>
                </div>
                <DownloadIcon />
              </a>
            ) : hasUrl && (
              <Link
                href={resource.url || `/resources/${resource.slug?.current}`}
                className="flex gap-[8px] items-center justify-start cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="font-semibold leading-[0] relative shrink-0 text-[#ffba0a] text-[16px] text-nowrap">
                  <p className="leading-[1.5] whitespace-pre">{resource.ctaText || 'Learn more'}</p>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src={arrowIcon} />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Simple card (for podcasts/case studies)
  return (
    <div
      ref={setContentRef(index)}
      className="bg-[#006840] box-border flex flex-col gap-6 items-start px-[48px] py-[32px] relative rounded-[10px] w-full"
    >
      <div className="content-stretch flex flex-col gap-[16px] items-start justify-start leading-[0] relative shrink-0 w-full">
        {resource.type && (
          <div className="font-extrabold relative shrink-0 text-[#b6ffce] text-[12px] tracking-[2.16px] uppercase w-full">
            <p className="leading-[1.3]">{resource.type}</p>
          </div>
        )}
        <div className="font-normal relative shrink-0 text-[18px] text-white w-full">
          <p className="leading-[1.5]">{resource.title}</p>
        </div>
        {resource.description && Array.isArray(resource.description) ? (
          <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
            <PortableText
              value={resource.description}
              components={{
                block: {
                  normal: ({children}) => <p className="leading-[1.5]">{children}</p>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc ml-[21px] mt-2 space-y-1">{children}</ul>,
                },
                listItem: {
                  bullet: ({children}) => <li className="leading-[1.5]">{children}</li>,
                },
              }}
            />
          </div>
        ) : resource.text ? (
          <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
            <p className="leading-[1.5]">{resource.text}</p>
          </div>
        ) : null}
        {resource.tags && (
          <div className="font-normal relative shrink-0 text-[#b6ffce] text-[14px] w-full">
            <p className="leading-[1.5]">{resource.tags}</p>
          </div>
        )}
      </div>

      <div className="content-stretch flex gap-[8px] items-center justify-start relative shrink-0">
        {hasUrl && (
          <Link
            href={resource.url || `/resources/${resource.slug?.current}`}
            className="flex gap-[8px] items-center justify-start cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="font-semibold leading-[0] relative shrink-0 text-[#ffba0a] text-[16px] text-nowrap">
              <p className="leading-[1.5] whitespace-pre">
                {resource.ctaText || (resource.duration ? `Listen now` : 'Read more')}
              </p>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <img alt="" className="block max-w-none size-full" src={arrowIcon} />
            </div>
          </Link>
        )}
        {hasDownload && (
          <a
            href={resource.downloadLink}
            download
            className="flex gap-[8px] items-center justify-start cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="font-semibold leading-[0] relative shrink-0 text-[#ffba0a] text-[16px] text-nowrap">
              <p className="leading-[1.5] whitespace-pre">Download</p>
            </div>
            <DownloadIcon />
          </a>
        )}
      </div>
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

const defaultFilters = ['All']

export default function ResourceList({
  sectionTitle = "Browse our resources",
  sectionSubtitle,
  sectionTitleClassName,
  sectionTitleAlign = 'center',
  resources = [],
  filters = defaultFilters,
  currentPage = 1,
  totalPages,
  onFilterChange,
  onPageChange,
  itemsPerPage,
  cardType = 'auto',
  showPagination = true,
  columns,
  backgroundColor = 'light-green'
}: ResourceListProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const filterRef = useRef(null)
  const contentRef = useRef<(HTMLDivElement | null)[]>([])
  const paginationRef = useRef(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)

  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPageState, setCurrentPageState] = useState(currentPage)
  const [isMobile, setIsMobile] = useState(false)

  // Determine background color classes
  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case 'light-green':
        return 'bg-[#f1fff5] text-black py-16 px-4 md:py-20 md:px-8 rounded-[32px]'
      case 'white':
        return 'bg-white text-black py-16 px-4 md:py-20 md:px-8 rounded-[32px]'
      case 'none':
        return 'text-black py-16 px-0 md:py-20'
      default:
        return 'bg-[#f1fff5] text-black py-16 px-4 md:py-20 md:px-8 rounded-[32px]'
    }
  }

  // Determine card type based on first resource if auto
  const determineCardType = () => {
    if (cardType !== 'auto') return cardType
    if (resources.length > 0 && resources[0].coverImage) return 'withImage'
    return 'simple'
  }

  const actualCardType = determineCardType()

  // Calculate items per page based on card type and screen size
  const getItemsPerPage = () => {
    if (itemsPerPage) return itemsPerPage

    if (actualCardType === 'withImage') {
      // Larger cards with images - 2 columns, 2 rows on desktop
      return isMobile ? 4 : 4
    } else {
      // Simple cards - 3 columns, 3 rows on desktop
      return isMobile ? 6 : 9
    }
  }

  const actualItemsPerPage = getItemsPerPage()

  // Filter resources based on active filter
  const filteredResources = resources.filter(resource => {
    if (activeFilter === 'All') return true

    // Check type first
    if (resource.type === activeFilter) return true

    // Then check tags
    const tags = resource.tags?.split(', ') || []
    return tags.some(tag => tag.trim() === activeFilter)
  })

  // Calculate pagination based on filtered results
  const totalPagesCalculated = Math.ceil(filteredResources.length / actualItemsPerPage)
  const actualTotalPages = totalPages || totalPagesCalculated

  // Get current page items from filtered results
  const startIndex = (currentPageState - 1) * actualItemsPerPage
  const endIndex = startIndex + actualItemsPerPage
  const currentPageItems = filteredResources.slice(startIndex, endIndex)

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkIsMobile()
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

    // Scroll to top of resources grid
    if (cardsGridRef.current) {
      const elementTop = cardsGridRef.current.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementTop - 200

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Resource cards stagger animation
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
      if (showPagination && paginationRef.current) {
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
      }
    })

    return () => ctx.revert()
  }, [showPagination]) // Removed filteredResources to prevent re-animation on filter change

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
      if (filters.length > 1 && filterRef.current) {
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
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${sora.className} py-8 bg-white`}
    >
      <div className="mx-auto px-4 md:px-8">
        <div className={`flex flex-col justify-center ${getBackgroundClasses()}`}>
          <div className="max-w-6xl mx-auto w-full">
            {/* Section Header - Only render if there's a title or subtitle */}
            {(sectionTitle || sectionSubtitle) && (
              <div ref={headingRef} className={`content-stretch flex flex-col gap-[20px] ${sectionTitleAlign === 'left' ? 'items-start' : 'items-center'} justify-start relative shrink-0 w-full mb-12`}>
                {sectionTitle && (
                  <h2 className={sectionTitleClassName || `font-bold leading-[1.2] relative shrink-0 text-[#001109] text-[32px] md:text-[42px] ${sectionTitleAlign === 'left' ? 'text-left' : 'text-center'} w-full`}>
                    {sectionTitle}
                  </h2>
                )}
                {sectionSubtitle && (
                  <p className={`font-normal leading-[1.5] relative shrink-0 text-[#001109] text-[16px] ${sectionTitleAlign === 'left' ? 'text-left' : 'text-center'} w-full`}>
                    {sectionSubtitle}
                  </p>
                )}
              </div>
            )}

            {/* Filter Buttons - Only show if more than one filter */}
            {filters.length > 1 && (
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
            )}

            {/* Resources Grid */}
            <div ref={cardsGridRef} className="content-stretch flex flex-col gap-[32px] items-start justify-start relative shrink-0 w-full mb-12">
              {currentPageItems.length === 0 ? (
                <p className="text-[#001109]/60 text-base w-full">No active posts</p>
              ) : (
                /* Responsive Grid: 1 column mobile, 2 columns tablet/md, 3 columns large+ */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[32px] w-full items-start">
                  {currentPageItems.map((resource, index) => (
                    <ResourceCard
                      key={resource._id || resource.id || `resource-${index}`}
                      resource={resource}
                      index={index}
                      setContentRef={setContentRef}
                      cardType={actualCardType}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination - Only show if enabled and more than one page */}
            {showPagination && actualTotalPages > 1 && (
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
                          <img alt="Previous page" className="block max-w-none size-full" src={chevronIcon} />
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
                          <img alt="Next page" className="block max-w-none size-full" src={chevronIcon} />
                        </div>
                      </div>
                    </div>
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