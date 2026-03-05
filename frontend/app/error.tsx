'use client'

import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className={`${sora.className} min-h-[70vh] flex items-center justify-center bg-white px-4`}>
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#006840] mb-4">Oops</h1>
        <h2 className="text-2xl font-semibold text-[#001109] mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-block bg-[#FFBA0A] hover:bg-[#FFBA0A]/90 text-black px-8 py-3.5 rounded-[2px] font-semibold text-sm transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
