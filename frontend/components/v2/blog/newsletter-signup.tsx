'use client'

import { useState } from 'react'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

export default function NewsletterSignup() {
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

      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch {
      setIsError(true)
      setMessage('Unable to subscribe. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`${sora.className} bg-[#00351F] rounded-[10px] p-8 relative overflow-hidden`}>
      {/* Decorative circular pattern background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-[#006840] rounded-full"
            style={{
              width: `${100 * (i + 1)}px`,
              height: `${100 * (i + 1)}px`,
              left: `${-50 * (i + 1)}px`,
              top: `${-50 * (i + 1)}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6">
        <h3 className="text-lg text-white font-normal leading-[1.5]">
          Keep up with the latest insights
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            className="w-full px-6 py-3.5 bg-[#F5F5F5] text-[#afafaf] placeholder:text-[#afafaf] text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#FFBA0A] disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FFBA0A] hover:bg-[#FFBA0A]/90 text-black px-8 py-3.5 rounded-[2px] font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p className={`text-sm text-center ${isError ? 'text-red-400' : 'text-[#B6FFCE]'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}