'use client'

import { useEffect, useState, type RefObject } from 'react'
import { usePathname } from 'next/navigation'

const SCRIPT_ID = 'clutch-widget-js'
const SCRIPT_SRC = 'https://widget.clutch.co/static/js/widget.js'

let scriptPromise: Promise<void> | null = null

/**
 * Loads the Clutch widget script exactly once, shared by every Clutch
 * component on the site. Subsequent callers reuse the same promise.
 */
function loadClutchScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
      if (existing) {
        if ((window as any).CLUTCHCO) {
          resolve()
        } else {
          existing.addEventListener('load', () => resolve())
          existing.addEventListener('error', () =>
            reject(new Error('Clutch widget script failed to load'))
          )
        }
        return
      }

      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        // Allow a later retry if the network hiccuped
        scriptPromise = null
        reject(new Error('Clutch widget script failed to load'))
      }
      document.body.appendChild(script)
    })
  }

  return scriptPromise
}

export type ClutchStatus = 'loading' | 'ready' | 'failed'

/**
 * Reliably initializes a Clutch widget inside the given container:
 * - loads the script once (shared across components)
 * - re-runs CLUTCHCO.Init() on mount AND on client-side route changes
 * - retries until the widget iframe actually appears
 * - reports 'failed' so callers can render a fallback link instead of an empty box
 */
export function useClutchInit(containerRef: RefObject<HTMLDivElement | null>): ClutchStatus {
  const [status, setStatus] = useState<ClutchStatus>('loading')
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    const maxAttempts = 20 // ~5s of retries

    const hasRendered = () => !!containerRef.current?.querySelector('iframe')

    const tryInit = () => {
      if (cancelled) return
      if (hasRendered()) {
        setStatus('ready')
        return
      }

      const clutch = (window as any).CLUTCHCO
      if (clutch?.Init) {
        try {
          clutch.Init()
        } catch {
          // Clutch's Init can throw on double-invocation; safe to ignore
        }
      }

      attempts += 1
      if (hasRendered()) {
        setStatus('ready')
      } else if (attempts < maxAttempts) {
        setTimeout(tryInit, 250)
      } else if (!cancelled) {
        setStatus('failed')
      }
    }

    setStatus('loading')
    loadClutchScript()
      .then(tryInit)
      .catch(() => {
        if (!cancelled) setStatus('failed')
      })

    return () => {
      cancelled = true
    }
  }, [containerRef, pathname])

  return status
}
