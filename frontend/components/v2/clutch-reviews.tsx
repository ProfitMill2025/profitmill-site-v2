"use client"

import { useRef } from "react"
import { useClutchInit } from "./use-clutch-init"

type Props = {
  companyId?: string
}

export default function ClutchReviews({ companyId = "2504132" }: Props) {
  const widgetRef = useRef<HTMLDivElement | null>(null)
  const status = useClutchInit(widgetRef)

  return (
    <>
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
          {status === "failed" && (
            <a
              href={`https://clutch.co/profile/${companyId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#006840] underline"
            >
              See our reviews on Clutch
            </a>
          )}
        </div>
      </section>
      <noscript>
        <a href={`https://clutch.co/profile/${companyId}`}>See our reviews on Clutch</a>
      </noscript>
    </>
  )
}
