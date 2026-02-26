'use client'

import { useState } from 'react'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

export default function SubscribeCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          website: (e.target as HTMLFormElement).website?.value,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setIsError(true)
        setMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setMessage('Thanks for subscribing!')
      setEmail('')
    } catch {
      setIsError(true)
      setMessage('Unable to subscribe. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`${sora.className} py-12`}>
      <div className="bg-[#00351F] rounded-[32px] px-6 py-8 md:px-[120px] md:py-12 relative overflow-hidden">
        {/* Decorative circular shapes - thick concentric circles (only top half visible) - desktop only */}
        <div className="hidden md:block absolute left-[75%] top-[240px] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="380" stroke="#001109" strokeWidth="12" opacity="0.6"/>
            <circle cx="400" cy="400" r="330" stroke="#001109" strokeWidth="12" opacity="0.6"/>
            <circle cx="400" cy="400" r="280" stroke="#001109" strokeWidth="12" opacity="0.6"/>
            <circle cx="400" cy="400" r="230" stroke="#001109" strokeWidth="12" opacity="0.6"/>
            <circle cx="400" cy="400" r="180" stroke="#001109" strokeWidth="12" opacity="0.6"/>
            <circle cx="400" cy="400" r="130" stroke="#001109" strokeWidth="12" opacity="0.6"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          {/* Title */}
          <div className="md:flex-1">
            <h2 className="text-[#B6FFCE] text-xl md:text-2xl font-semibold leading-[1.5]">
              Keep up with the latest insights
            </h2>
          </div>

          {/* Form */}
          <div className="md:flex-1 w-full md:max-w-[500px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row md:gap-0">
              {/* Honeypot field - hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="w-full bg-[#F5F5F5] text-[#000000] placeholder:text-[#AFAFAF] px-6 py-3.5 rounded-[2px] md:rounded-l-[2px] md:rounded-r-none text-sm focus:outline-none focus:ring-2 focus:ring-[#B6FFCE] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-[#FFBA0A] hover:bg-[#FFBA0A]/90 text-black px-8 py-3.5 rounded-[2px] md:rounded-r-[2px] md:rounded-l-none font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${isError ? 'text-red-400' : 'text-[#B6FFCE]'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}