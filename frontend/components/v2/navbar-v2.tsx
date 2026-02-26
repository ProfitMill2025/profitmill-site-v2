'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Equal, ChevronDown } from 'lucide-react'
import { Sora } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sora = Sora({ subsets: ['latin'] })

export default function NavbarV2() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<null | 'what' | 'who' | 'resources'>(null)
  const [mobileDropdown, setMobileDropdown] = useState<null | 'what' | 'who' | 'resources'>(null)
  const pathname = usePathname()
  const router = useRouter()
  
  // Determine if we're on the homepage
  const isHomePage = pathname === '/'
  
  // Helper function to construct links
  const getHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns on outside click and on Escape
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.js-nav-dropdown')) {
        setOpenDropdown(null)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Update the handleNavClick function to use SheetContext
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    
    if (isHomePage) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push('/' + hash) // Push to homepage with hash
    }
    setIsSheetOpen(false) // Close the sheet after navigation
  }

  return (
    <header className={`${sora.className} z-[100] fixed top-0 left-0 right-0 pt-6`}>
      <div className="mx-auto px-4 md:px-8">
        <nav className="bg-[#F5F5F5] rounded-[32px] h-[72px] md:h-[113px] px-6 shadow-sm">
          <div className="max-w-[1500px] mx-auto h-full">
            <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center h-[49px] pb-1">
            <svg width="161" height="35" viewBox="0 0 161 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[34px] w-auto">
              <g clipPath="url(#clip0_1333_24)">
                <path d="M14.6151 12.2638C13.1416 12.2638 11.946 13.4593 11.946 14.9328C11.946 16.4064 13.1416 17.6019 14.6151 17.6019C16.0887 17.6019 17.2842 16.4064 17.2842 14.9328C17.2842 13.4593 16.0887 12.2638 14.6151 12.2638Z" fill="#006840"/>
                <path d="M8.23588 29.5418H4.52881V34.0644H8.23588V29.5418Z" fill="#006840"/>
                <path d="M29.2272 13.0824H24.5254C24.2628 11.6799 23.7098 10.3763 22.9313 9.23942L26.1256 6.04516L23.5028 3.42241L20.3086 6.61666C19.1717 5.83818 17.8712 5.28521 16.4656 5.02262V0.5H12.7585V5.02262C11.356 5.28521 10.0523 5.83818 8.9155 6.61666L5.71507 3.41623L3.09231 6.03898L6.29275 9.23942C5.51427 10.3763 4.96129 11.6768 4.69871 13.0824H0V16.7895H4.5288V25.8347H8.23587V14.9359C8.23587 11.4204 11.0965 8.55979 14.612 8.55979C18.1276 8.55979 20.9882 11.4204 20.9882 14.9359V16.7895H24.6953H29.2241V13.0824H29.2272Z" fill="#006840"/>
                <path d="M16.4687 25.0192H12.7616V34.0644H16.4687V25.0192Z" fill="#006840"/>
                <path d="M24.6983 20.4935H20.9912V34.0675H24.6983V20.4935Z" fill="#006840"/>
                <path d="M36.4158 34.0613H40.3731V26.3877H45.0471C46.326 26.3877 47.469 26.122 48.4792 25.5938C49.4863 25.0655 50.2864 24.3148 50.8764 23.3448C51.4665 22.3748 51.76 21.241 51.76 19.9436V19.5234C51.76 18.2043 51.4758 17.0675 50.9073 16.1067C50.3389 15.146 49.5481 14.4046 48.541 13.8732C47.5308 13.345 46.3693 13.0793 45.0502 13.0793H36.4189V22.7887H33.7776V26.2734H36.4189V34.0582L36.4158 34.0613ZM40.3731 16.6783H44.6578C45.597 16.6783 46.3569 16.9377 46.9346 17.4567C47.5123 17.9757 47.8027 18.6862 47.8027 19.5852V19.8849C47.8027 20.7838 47.5123 21.4944 46.9346 22.0133C46.3538 22.5323 45.597 22.7918 44.6578 22.7918H40.3731V16.6783Z" fill="#001109"/>
                <path d="M62.3156 19.1372H60.5177C59.838 19.1372 59.2449 19.2763 58.7352 19.5574C58.2255 19.8385 57.8609 20.2772 57.6416 20.8765H57.101V19.199H53.3846V34.0644H57.1628V25.6123C57.1628 24.5527 57.4717 23.768 58.0926 23.2614C58.7105 22.7516 59.5013 22.4983 60.459 22.4983H62.3156V19.1403V19.1372Z" fill="#001109"/>
                <path d="M83.1339 13.9968C82.5253 14.6053 82.2195 15.4209 82.2195 16.4403V19.199H79.5906V22.3161H82.2195V34.0644H85.9976V22.3161H89.4792V19.199H85.9976V17.1014C85.9976 16.5021 86.2757 16.2025 86.8379 16.2025H89.4792V13.0854H85.5188C84.5395 13.0854 83.7456 13.3913 83.137 13.9999L83.1339 13.9968Z" fill="#001109"/>
                <path d="M105.114 30.9443C104.555 30.9443 104.274 30.6446 104.274 30.0453V22.313H107.764V19.196H104.274V14.6394H100.498V19.196H97.8757V22.313H100.498V30.7033C100.498 31.7228 100.804 32.5352 101.413 33.1469C102.021 33.7555 102.815 34.0613 103.795 34.0613H107.771V30.9443H105.114Z" fill="#001109"/>
                <path d="M93.7299 19.6655C93.1306 19.6655 92.5591 19.5358 92.0432 19.3072C91.9474 19.2639 91.8424 19.3319 91.8424 19.4338V34.0613H95.6205V19.4338C95.6205 19.3288 95.5155 19.2639 95.4197 19.3072C94.9038 19.5358 94.3323 19.6655 93.733 19.6655H93.7299Z" fill="#001109"/>
                <path d="M93.73 13.0824C92.414 13.0824 91.3451 14.1512 91.3451 15.4672C91.3451 16.7833 92.414 17.8521 93.73 17.8521C95.046 17.8521 96.1149 16.7833 96.1149 15.4672C96.1149 14.1512 95.046 13.0824 93.73 13.0824Z" fill="#001109"/>
                <path d="M70.9531 18.7882C66.6158 18.7882 63.0972 22.3037 63.0972 26.6441C63.0972 30.9844 66.6158 34.4999 70.9531 34.4999C75.2903 34.4999 78.809 30.9844 78.809 26.6441C78.809 22.3037 75.2934 18.7882 70.9531 18.7882ZM70.9531 31.1543C68.4662 31.1543 66.4428 29.1309 66.4428 26.6441C66.4428 24.1572 68.4662 22.1338 70.9531 22.1338C73.4399 22.1338 75.4633 24.1572 75.4633 26.6441C75.4633 29.1309 73.4399 31.1543 70.9531 31.1543Z" fill="#001109"/>
                <path d="M128.379 31.3675H127.838L124.211 13.0855H116.868V34.0675H120.705V15.9925H121.246L124.842 34.0675H131.375L134.971 15.9925H135.512V34.0675H139.346V13.0855H132.006L128.379 31.3675Z" fill="#001109"/>
                <path d="M153.25 13.0824H149.472V34.0675H153.25V13.0824Z" fill="#001109"/>
                <path d="M160.266 13.0855H156.488V34.0644H160.266V13.0855Z" fill="#001109"/>
                <path d="M144.313 19.6717C143.711 19.6717 143.142 19.542 142.623 19.3134C142.531 19.2701 142.426 19.335 142.426 19.44V34.0675H146.204V19.44C146.204 19.3381 146.099 19.2732 146.006 19.3134C145.49 19.542 144.919 19.6717 144.316 19.6717H144.313Z" fill="#001109"/>
                <path d="M144.313 13.0855C142.997 13.0855 141.928 14.1544 141.928 15.4704C141.928 16.7864 142.997 17.8552 144.313 17.8552C145.629 17.8552 146.698 16.7864 146.698 15.4704C146.698 14.1544 145.629 13.0855 144.313 13.0855Z" fill="#001109"/>
              </g>
              <defs>
                <clipPath id="clip0_1333_24">
                  <rect width="160.266" height="34" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </Link>
          
          <div className="hidden xl:flex flex-1 items-center justify-center xl:gap-2 2xl:gap-6 screen-2000px:gap-8 h-[49px]">
            <Link
              href="/about"
              className="text-[#006840] hover:text-[#004d32] font-medium text-sm px-4 py-2"
            >
              About
            </Link>
            <Link
              href="/paid-ads-pricing"
              className="text-[#006840] hover:text-[#004d32] font-medium text-sm px-4 py-2"
            >
              Pricing
            </Link>

            {/* What we do dropdown (custom) */}
            <div className={`js-nav-dropdown relative ${openDropdown === 'what' ? 'bg-[#f1fff5] rounded-t-[10px] rounded-b-none' : ''}`}>
              <div className={`flex items-center w-full justify-between font-medium text-sm outline-none transition-colors px-4 py-2 ${openDropdown === 'what' ? 'text-[#004d32]' : 'text-[#006840] hover:text-[#004d32]'}`}>
                <Link
                  href="/what-we-do"
                  className="flex-1 text-left"
                >
                  What we do
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDropdown((cur) => (cur === 'what' ? null : 'what'))
                  }}
                  className="ml-2 p-1"
                >
                  <ChevronDown size={16} className={`transition-transform ${openDropdown === 'what' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openDropdown === 'what' && (
                <div className="absolute left-0 right-0 top-full bg-[#f1fff5] rounded-b-[10px] p-6 shadow-lg z-[200]">
                  <Link href="/what-we-do/google-ads" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">Google Ads</Link>
                  <Link href="/what-we-do/linkedin-ads" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">LinkedIn Ads</Link>
                  <Link href="/what-we-do/other-channels" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32]">Other Channels</Link>
                </div>
              )}
            </div>

            {/* Who we work with dropdown (custom) */}
            <div className={`js-nav-dropdown relative ${openDropdown === 'who' ? 'bg-[#f1fff5] rounded-t-[10px] rounded-b-none' : ''}`}>
              <div className={`flex items-center w-full justify-between font-medium text-sm outline-none transition-colors px-4 py-2 ${openDropdown === 'who' ? 'text-[#004d32]' : 'text-[#006840] hover:text-[#004d32]'}`}>
                <Link
                  href="/who-we-work-with"
                  className="flex-1 text-left"
                >
                  Who we work with
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDropdown((cur) => (cur === 'who' ? null : 'who'))
                  }}
                  className="ml-2 p-1"
                >
                  <ChevronDown size={16} className={`transition-transform ${openDropdown === 'who' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openDropdown === 'who' && (
                <div className="absolute left-0 right-0 top-full bg-[#f1fff5] rounded-b-[10px] p-6 shadow-lg z-[200]">
                  <Link href="/who-we-work-with/paid-ads-b2b-saas" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">B2B SaaS</Link>
                  <Link href="/who-we-work-with/paid-ads-plg-companies" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">PLG Companies</Link>
                  <Link href="/who-we-work-with/paid-ads-service-businesses" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32]">Services</Link>
                </div>
              )}
            </div>

            <Link
              href="/case-studies"
              className="text-[#006840] hover:text-[#004d32] font-medium text-sm px-4 py-2"
            >
              Case studies
            </Link>

            {/* Resources dropdown (custom) */}
            <div className={`js-nav-dropdown relative ${openDropdown === 'resources' ? 'bg-[#f1fff5] rounded-t-[10px] rounded-b-none' : ''}`}>
              <div className={`flex items-center w-full justify-between font-medium text-sm outline-none transition-colors px-4 py-2 ${openDropdown === 'resources' ? 'text-[#004d32]' : 'text-[#006840] hover:text-[#004d32]'}`}>
                <span className="flex-1 text-left cursor-default">
                  Resources
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDropdown((cur) => (cur === 'resources' ? null : 'resources'))
                  }}
                  className="ml-2 p-1"
                >
                  <ChevronDown size={16} className={`transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openDropdown === 'resources' && (
                <div className="absolute left-0 right-0 top-full bg-[#f1fff5] rounded-b-[10px] p-6 shadow-lg z-[200]">
                  <Link href="/resources/podcasts" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">Podcasts</Link>
                  <Link href="/resources/tools-templates" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">Tools & Templates</Link>
                  <Link href="/resources/blog" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32] mb-4">Blog</Link>
                  <Link href="/resources/alternatives" className="block text-[#006840] text-sm leading-[1.5] hover:text-[#004d32]">Alternatives</Link>
                </div>
              )}
            </div>

            <Link
              href="/profit-studio"
              className="text-[#006840] hover:text-[#004d32] font-medium text-sm"
            >
              Profit studio
            </Link>
          </div>

          <Link
            href="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
            className="hidden xl:flex items-center justify-center bg-[#FFBA0A] hover:bg-[#FFBA0A]/90 text-black px-6 h-[49px] rounded-[8px] transition-colors font-semibold text-sm"
          >
            Book a call
          </Link>

          {/* Mobile menu trigger using Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button 
                className="xl:hidden text-[#006840] hover:text-[#004d32]"
                aria-label="Open menu"
              >
                <Equal size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full bg-[#00351F] border-none p-5 rounded-l-[20px] overflow-y-auto"
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <Link
                    href="/"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <img
                      src="https://res.cloudinary.com/dzn9bpr2h/image/upload/v1758749041/logo-horiz_pqrngt.svg"
                      alt="Profit Mill Logo"
                      className="h-8 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="text-white hover:text-white/80 p-1"
                  >
                    <X size={28} />
                  </button>
                </div>

                <div className="flex flex-col gap-8 px-5 pb-8">
                  <Link
                    href="/about"
                    className="text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/paid-ads-pricing"
                    className="text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Pricing
                  </Link>

                  {/* What we do with dropdown */}
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <Link
                        href="/what-we-do"
                        className="text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal flex-1"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        What we do
                      </Link>
                      <button
                        onClick={() => setMobileDropdown(mobileDropdown === 'what' ? null : 'what')}
                        className="p-1 text-[#B6FFCE] hover:text-[#B6FFCE]/80"
                      >
                        <ChevronDown size={24} className={`transition-transform ${mobileDropdown === 'what' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {mobileDropdown === 'what' && (
                      <>
                        <div className="border-b border-[#006840] mt-4" />
                        <div className="flex flex-col gap-8 pl-6 mt-4">
                          <Link href="/what-we-do/google-ads" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Google Ads
                          </Link>
                          <Link href="/what-we-do/linkedin-ads" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            LinkedIn Ads
                          </Link>
                          <Link href="/what-we-do/other-channels" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Other Channels
                          </Link>
                        </div>
                        <div className="border-b border-[#006840] mt-4" />
                      </>
                    )}
                  </div>

                  {/* Who we work with dropdown */}
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <Link
                        href="/who-we-work-with"
                        className="text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal flex-1"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Who we work with
                      </Link>
                      <button
                        onClick={() => setMobileDropdown(mobileDropdown === 'who' ? null : 'who')}
                        className="p-1 text-[#B6FFCE] hover:text-[#B6FFCE]/80"
                      >
                        <ChevronDown size={24} className={`transition-transform ${mobileDropdown === 'who' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {mobileDropdown === 'who' && (
                      <>
                        <div className="border-b border-[#006840] mt-4" />
                        <div className="flex flex-col gap-8 pl-6 mt-4">
                          <Link href="/who-we-work-with/paid-ads-b2b-saas" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            B2B SaaS
                          </Link>
                          <Link href="/who-we-work-with/paid-ads-plg-companies" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            PLG Companies
                          </Link>
                          <Link href="/who-we-work-with/paid-ads-service-businesses" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Services
                          </Link>
                        </div>
                        <div className="border-b border-[#006840] mt-4" />
                      </>
                    )}
                  </div>

                  <Link
                    href="/case-studies"
                    className="text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Case Studies
                  </Link>

                  {/* Resources with dropdown and border */}
                  <div>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === 'resources' ? null : 'resources')}
                      className="flex items-center gap-1 text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal w-full"
                    >
                      <span>Resources</span>
                      <ChevronDown size={24} className={`transition-transform text-[#B6FFCE] ${mobileDropdown === 'resources' ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDropdown === 'resources' && (
                      <>
                        <div className="border-b border-[#006840] mt-4" />
                        <div className="flex flex-col gap-8 pl-6 mt-4 pb-6">
                          <Link href="/resources/podcasts" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Podcasts
                          </Link>
                          <Link href="/resources/tools-templates" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Tools & Templates
                          </Link>
                          <Link href="/resources/blog" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Blog
                          </Link>
                          <Link href="/resources/alternatives" className="text-white hover:text-white/80 text-[18px]" onClick={() => setIsSheetOpen(false)}>
                            Alternatives
                          </Link>
                        </div>
                        <div className="border-b border-[#006840]" />
                      </>
                    )}
                  </div>

                  <Link
                    href="/profit-studio"
                    className="text-[#B6FFCE] hover:text-[#B6FFCE]/80 text-[18px] font-normal"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Profit studio
                  </Link>
                </div>

                <div className="px-5 pb-10 mt-12">
                  <Link
                    href="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
                    onClick={() => setIsSheetOpen(false)}
                    className="block text-center border-2 border-[#FFBA0A] text-white hover:bg-[#FFBA0A]/10 px-8 py-3.5 rounded-[2px] font-semibold text-[14px] transition-colors"
                  >
                    Book a call
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
