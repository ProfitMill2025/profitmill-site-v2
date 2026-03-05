import Link from 'next/link'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

export default function NotFound() {
  return (
    <div className={`${sora.className} min-h-[70vh] flex items-center justify-center bg-white px-4`}>
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#006840] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#001109] mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#FFBA0A] hover:bg-[#FFBA0A]/90 text-black px-8 py-3.5 rounded-[2px] font-semibold text-sm transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
