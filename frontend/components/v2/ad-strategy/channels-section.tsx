'use client'

import { Sora } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sora = Sora({ subsets: ['latin'] })
gsap.registerPlugin(ScrollTrigger)

interface Spec {
  label: string
  value: string
}

interface Format {
  name: string
  description: string
  specs: Spec[]
}

const channelData = {
  "LinkedIn": [
    { name: "Single Image", description: "Promote your message directly in the LinkedIn feed with a clear image and CTA.", specs: [{ label: "Resolution", value: "1200×627px" }, { label: "Format", value: "PNG, JPG" }, { label: "Max Size", value: "5 MB" }, { label: "Headline", value: "70 chars" }] },
    { name: "Video", description: "Tell a richer story with motion and sound delivered directly in the feed.", specs: [{ label: "Format", value: "MP4" }, { label: "Max Size", value: "500 MB" }, { label: "Length", value: "Up to 30 min" }, { label: "Ratios", value: "16:9, 1:1, 9:16" }] },
    { name: "Carousel", description: "Tell a multi-part story with a swipeable series of 2–10 images.", specs: [{ label: "Resolution", value: "1080×1080px" }, { label: "Cards", value: "2–10" }, { label: "Format", value: "JPG, PNG" }, { label: "Max Size", value: "10 MB" }] },
    { name: "Document", description: "Share eBooks, guides, or whitepapers directly in the feed. No landing page required.", specs: [{ label: "Format", value: "PDF, DOCX, PPTX" }, { label: "Max Size", value: "100 MB" }, { label: "Max Pages", value: "300" }, { label: "Lead Gen", value: "Supported" }] },
    { name: "Lead Gen Form", description: "Capture leads instantly with pre-filled data from LinkedIn profiles.", specs: [{ label: "Fields", value: "Up to 12" }, { label: "Custom Q's", value: "Up to 3" }, { label: "CRM", value: "Integrations" }, { label: "Export", value: "CSV download" }] },
    { name: "Conversation", description: "Interactive messaging with multiple CTAs for deeper engagement.", specs: [{ label: "CTAs", value: "Up to 5" }, { label: "Banner", value: "300×250px" }, { label: "Message", value: "8,000 chars" }, { label: "Platform", value: "Desktop only" }] }
  ],
  "Meta": [
    { name: "Image", description: "Drive focused engagement across Facebook and Instagram feeds with a strong visual.", specs: [{ label: "Resolution", value: "1440×1440px (1:1)" }, { label: "Ratio", value: "1.91:1 to 4:5" }, { label: "Format", value: "JPG, PNG" }, { label: "Max Size", value: "30 MB" }] },
    { name: "Video", description: "Capture attention with video across Feed, Stories, and Reels placements.", specs: [{ label: "Resolution", value: "1080p+" }, { label: "Ratio", value: "1:1, 4:5, 9:16" }, { label: "Format", value: "MP4, MOV" }, { label: "Max Size", value: "4 GB" }] },
    { name: "Carousel", description: "Showcase 2–10 images or videos in a single, swipeable ad unit.", specs: [{ label: "Resolution", value: "1080×1080px" }, { label: "Cards", value: "2–10" }, { label: "Ratio", value: "1:1" }, { label: "Headline", value: "27 chars" }] },
    { name: "Collection", description: "Full-screen, immersive mobile experience that showcases multiple products.", specs: [{ label: "Cover", value: "Image or Video" }, { label: "Products", value: "4+ items" }, { label: "Template", value: "Instant Exp." }, { label: "Platform", value: "Mobile only" }] }
  ],
  "Google": [
    { name: "Demand Gen", description: "Visual-first campaigns across YouTube, Discover, Gmail, and Display — designed to drive action with engaging creative.", specs: [{ label: "Images", value: "1200×628, 1200×1200, 960×1200" }, { label: "Video", value: "Horizontal, vertical, square" }, { label: "Headlines", value: "Up to 5 (40 chars)" }, { label: "Descriptions", value: "Up to 5 (90 chars)" }] },
    { name: "Display", description: "Image and responsive ads served across 3M+ websites and apps in the Google Display Network.", specs: [{ label: "Landscape", value: "1200×628px" }, { label: "Square", value: "1200×1200px" }, { label: "Logo", value: "1200×1200px" }, { label: "Max Size", value: "5.12 MB" }] },
    { name: "Performance Max", description: "AI-powered campaigns across all Google channels — Search, Display, YouTube, Gmail, Maps, and Discover.", specs: [{ label: "Images", value: "Up to 20 (varied ratios)" }, { label: "Videos", value: "Up to 5 (≥10s)" }, { label: "Headlines", value: "Up to 15 (30 chars)" }, { label: "Long Headlines", value: "Up to 5 (90 chars)" }] },
    { name: "Search", description: "Text-based ads at the top of Google Search results — driven by keywords and intent.", specs: [{ label: "Headlines", value: "Up to 15 (30 chars)" }, { label: "Descriptions", value: "Up to 4 (90 chars)" }, { label: "Display Path", value: "2 × 15 chars" }, { label: "Image Ext.", value: "1200×628, 1200×1200" }] },
    { name: "Video", description: "Video ads on YouTube and partner sites — skippable, non-skippable, bumper, and in-feed formats.", specs: [{ label: "Skippable", value: "≥12s (rec: 15–60s)" }, { label: "Non-skip", value: "15s or 20s" }, { label: "Bumper", value: "≤6 seconds" }, { label: "Resolution", value: "1920×1080 or 1080×1920" }] }
  ],
  "X": [
    { name: "Image", description: "Highlight your creative and drive action with a single photo in the timeline.", specs: [{ label: "Resolution", value: "1200×1200px (1:1)" }, { label: "Ratios", value: "1:1, 1.91:1, 4:5" }, { label: "Format", value: "PNG, JPEG" }, { label: "Max Size", value: "5 MB" }] },
    { name: "Video", description: "Capture attention with motion and sound. Auto-loops under 60 seconds.", specs: [{ label: "Resolution", value: "1920×1080px" }, { label: "Format", value: "MP4, MOV" }, { label: "Max Size", value: "1 GB (rec: 30 MB)" }, { label: "Length", value: "≤15s rec, 2:20 max" }] },
    { name: "Carousel", description: "Swipeable series of 2–6 images or videos within a single promoted post.", specs: [{ label: "Cards", value: "2–6" }, { label: "Ratios", value: "1:1 or 1.91:1" }, { label: "Image Size", value: "800×800px" }, { label: "Headline", value: "70 chars" }] },
    { name: "Vertical Video", description: "Full-screen immersive video format optimized for mobile viewing.", specs: [{ label: "Ratio", value: "9:16" }, { label: "Resolution", value: "1080×1920px" }, { label: "Length", value: "≤15s recommended" }, { label: "Format", value: "MP4, MOV" }] }
  ],
  "Reddit": [
    { name: "Image", description: "Static image promoted posts that blend natively into community feeds.", specs: [{ label: "Resolution", value: "1080×1080px (1:1)" }, { label: "Cross-device", value: "1440×1080px (4:3)" }, { label: "Format", value: "JPG, PNG, GIF" }, { label: "Max Size", value: "3 MB" }] },
    { name: "Video", description: "Auto-playing or click-to-play video that captures attention in the feed.", specs: [{ label: "Format", value: "MP4, MOV" }, { label: "Max Size", value: "1 GB" }, { label: "Best Length", value: "5–30 seconds" }, { label: "Max FPS", value: "30" }] },
    { name: "Carousel", description: "Tell a sequential story with 2–6 swipeable images or GIFs.", specs: [{ label: "Cards", value: "2–6" }, { label: "Format", value: "JPG, PNG, GIF" }, { label: "Max Size", value: "20 MB/image" }, { label: "Caption", value: "50 chars/image" }] },
    { name: "Free-Form", description: "Rich text ads combining images, videos, and long-form copy like native posts.", specs: [{ label: "Body Text", value: "40,000 chars" }, { label: "Images", value: "Up to 20" }, { label: "Videos", value: "Up to 5" }, { label: "Thumbnail", value: "Required (3 MB)" }] }
  ],
}

const learnMoreUrls: Record<string, string> = {
  "LinkedIn": "https://business.linkedin.com/marketing-solutions/ads",
  "Meta": "https://www.facebook.com/business/ads-guide",
  "Google": "https://support.google.com/google-ads/answer/13676244?hl=en",
  "X": "https://business.x.com/en/help/campaign-setup/create-an-ad-group/ad-formats",
  "Reddit": "https://ads.reddit.com/",
}

const channelColors: Record<string, string> = {
  LinkedIn: '#0A66C2',
  Meta: '#1877F2',
  Google: '#4285F4',
  X: '#000000',
  Reddit: '#FF4500',
}

function ChannelCard({ name, isActive, onClick }: { name: string; isActive: boolean; onClick: () => void }) {
  const color = channelColors[name] || '#006840'
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
        isActive
          ? 'text-white shadow-lg scale-105'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      style={isActive ? { backgroundColor: color } : {}}
    >
      {name}
    </button>
  )
}

function FormatTab({ format, isActive, onClick, color }: { format: Format; isActive: boolean; onClick: () => void; color: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
        isActive
          ? 'text-white'
          : 'bg-white/60 text-gray-600 hover:bg-white/80'
      }`}
      style={isActive ? { backgroundColor: color } : {}}
    >
      {format.name}
    </button>
  )
}

export default function ChannelsSection() {
  const [activeChannel, setActiveChannel] = useState('LinkedIn')
  const [activeFormatIdx, setActiveFormatIdx] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    setActiveFormatIdx(0)
  }, [activeChannel])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 40, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  const formats = channelData[activeChannel as keyof typeof channelData] || []
  const activeFormat = formats[activeFormatIdx]
  const color = channelColors[activeChannel] || '#006840'

  return (
    <section ref={sectionRef} className={`${sora.className} py-16 md:py-24 bg-white`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#001109] leading-[1.2] mb-4">
            The Channels We Work With
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Five platforms, each with unique ad formats and specifications. We know the technical details so you don&apos;t have to.
          </p>
        </div>

        {/* Channel Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(channelData).map((name) => (
            <ChannelCard
              key={name}
              name={name}
              isActive={activeChannel === name}
              onClick={() => setActiveChannel(name)}
            />
          ))}
        </div>

        {/* Channel Content Card */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[#001109]">{activeChannel}</h3>
            <a
              href={learnMoreUrls[activeChannel]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
              style={{ color }}
            >
              Learn more &rarr;
            </a>
          </div>

          {/* Format Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {formats.map((fmt, idx) => (
              <FormatTab
                key={fmt.name}
                format={fmt}
                isActive={activeFormatIdx === idx}
                onClick={() => setActiveFormatIdx(idx)}
                color={color}
              />
            ))}
          </div>

          {/* Active Format Details */}
          {activeFormat && (
            <div>
              <p className="text-gray-600 mb-6">{activeFormat.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeFormat.specs.map((spec) => (
                  <div key={spec.label} className="bg-white rounded-xl p-4">
                    <div className="text-xs text-gray-500 font-medium mb-1">{spec.label}</div>
                    <div className="text-sm font-semibold text-[#001109]">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
