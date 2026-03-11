'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

export default function BlogCTACard() {
  return (
    <div className={`${sora.className} relative w-full h-[200px] overflow-hidden rounded-[10px]`}>
      {/* Card Background Image */}
      <Image
        src="https://res.cloudinary.com/dzn9bpr2h/image/upload/v1759182048/card_ssjddb.png"
        alt=""
        width={358}
        height={280}
        className="w-full"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col gap-6 items-start justify-center p-8">
        <h3 className="text-2xl font-semibold text-white leading-[1.5] text-left">
          Ready for paid ads that pay off?
        </h3>

        <Link
          href="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
          className="w-full bg-[#FFBA0A] hover:bg-[#FFBA0A]/90 text-black px-8 py-3.5 rounded-[2px] font-semibold text-sm transition-colors text-center"
        >
          Book your free audit
        </Link>
      </div>
    </div>
  )
}