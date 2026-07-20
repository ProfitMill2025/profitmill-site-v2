'use client'

import { useRef } from 'react'
import { useClutchInit } from './use-clutch-init'

interface ClutchWidgetProps {
  className?: string
}

const CLUTCH_COMPANY_ID = '2504132'
const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/profit-mill'

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
  const status = useClutchInit(widgetRef)

  return (
    <div
      className={`bg-[rgba(255,255,255,0.9)] rounded-[8.673px] w-fit h-[52px] relative px-3 py-2 flex items-center justify-center ${className}`}
    >
      {status === 'failed' ? (
        <a
          href={CLUTCH_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006840] whitespace-nowrap"
        >
          <span aria-hidden="true">★★★★★</span>
          <span>4.8 on Clutch</span>
        </a>
      ) : (
        <div
          ref={widgetRef}
          className="clutch-widget"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="40"
          data-nofollow="false"
          data-expandifr="true"
          data-clutchcompany-id={CLUTCH_COMPANY_ID}
        />
      )}
    </div>
  )
}
