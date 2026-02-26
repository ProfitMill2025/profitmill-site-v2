'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

interface ClutchWidgetProps {
  className?: string
}

// Add global styles for Clutch badge widget (type 2) only
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .clutch-widget[data-widget-type="2"] iframe {
      max-width: 180px !important;
      width: 180px !important;
    }
  `
  if (!document.querySelector('style[data-clutch-widget]')) {
    style.setAttribute('data-clutch-widget', 'true')
    document.head.appendChild(style)
  }
}

export default function ClutchWidget({ className = '' }: ClutchWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger Clutch widget initialization after mount
    const initWidget = () => {
      if (widgetRef.current && (window as any).CLUTCHCO) {
        (window as any).CLUTCHCO.Init()
      }
    }

    // Try to init immediately if script already loaded
    if ((window as any).CLUTCHCO) {
      initWidget()
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if ((window as any).CLUTCHCO) {
          initWidget()
          clearInterval(checkInterval)
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [])

  return (
    <>
      <Script
        id="clutch-widget-script"
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="afterInteractive"
      />
      <div className={`bg-[rgba(255,255,255,0.9)] rounded-[8.673px] w-fit h-[52px] relative px-3 py-2 flex items-center justify-center ${className}`}>
        <div
          ref={widgetRef}
          className="clutch-widget"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="40"
          data-nofollow="false"
          data-expandifr="true"
          data-clutchcompany-id="2504132"
        />
      </div>
    </>
  )
}
