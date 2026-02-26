"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"


type Props = {
  companyId?: string
}

export default function ClutchReviews({ companyId = "2504132" }: Props) {
  const widgetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ensureScript = () => {
      if (document.getElementById("clutch-widget-js")) return Promise.resolve()
      return new Promise<void>((resolve) => {
        const s = document.createElement("script")
        s.id = "clutch-widget-js"
        s.src = "https://widget.clutch.co/static/js/widget.js"
        s.async = true
        s.onload = () => resolve()
        document.body.appendChild(s)
      })
    }

    ensureScript().then(() => {
      ;(window as any)?.CLUTCHCO?.Init?.()
    })
  }, [])

  return (
    <>
      {/* Minimal, from-scratch embed per Clutch snippet */}
      <Script id="clutch-widget-inline" src="https://widget.clutch.co/static/js/widget.js" strategy="afterInteractive" />
      <section className="py-8 md:py-12 bg-white">
        <div className="mx-auto px-4 md:px-8 max-w-[1400px]">
          <div
            ref={widgetRef}
            className="clutch-widget"
            data-url="https://widget.clutch.co"
            data-widget-type="12"
            data-height="375"
            data-nofollow="false"
            data-expandifr="true"
            data-reviews=""
            data-clutchcompany-id={companyId}
          />
        </div>
      </section>
      <noscript>
        <a href={`https://clutch.co/profile/${companyId}`}>See our reviews on Clutch</a>
      </noscript>
    </>
  )
}
