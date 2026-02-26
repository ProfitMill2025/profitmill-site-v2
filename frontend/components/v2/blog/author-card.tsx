'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

interface AuthorCardProps {
  author: {
    name: string
    title?: string
    bio?: string
    profileImage: string
    linkedinUrl?: string
    slug?: string
  }
  compact?: boolean
}

export default function AuthorCard({ author, compact = true }: AuthorCardProps) {
  if (compact) {
    // Sidebar version - compact card
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
            <Image
              src={author.profileImage}
              alt={author.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {author.name}
          </h3>
          {author.linkedinUrl && (
            <Link
              href={author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mb-4 text-gray-600 hover:text-[#0077b5] transition-colors"
              aria-label={`${author.name} LinkedIn profile`}
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25402 6.66641C9.25353 7.75216 8.59482 8.7292 7.5885 9.13681C6.58218 9.54444 5.42921 9.30124 4.67325 8.5219C3.91729 7.74256 3.70932 6.5827 4.14738 5.58926C4.58546 4.59582 5.5821 3.96717 6.66736 3.99974C8.10878 4.04301 9.25468 5.22433 9.25402 6.66641ZM9.33402 11.3064H4.00069V27.9997H9.33402V11.3064ZM17.7607 11.3064H12.454V27.9997H17.7074V19.2397C17.7074 14.3597 24.0674 13.9064 24.0674 19.2397V27.9997H29.3341V17.4264C29.3341 9.19974 19.9207 9.50641 17.7074 13.5464L17.7607 11.3064Z" fill="currentColor"/>
              </svg>
            </Link>
          )}
          <Link
            href={author.slug ? `/resources/author/${author.slug}` : "/about#team"}
            className="text-[#006840] text-sm font-medium hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    )
  }

  // Full author section at bottom of article
  return (
    <div className={`${sora.className} bg-[#F5F5F5] rounded-[32px] p-8 flex gap-8 items-center`}>
      {/* Author Image */}
      <div className="flex-shrink-0">
        <div className="w-[150px] h-[150px] rounded-[2.8px] overflow-hidden">
          <Image
            src={author.profileImage}
            alt={author.name}
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Author Info */}
      <div className="flex-1 flex flex-col gap-[25px]">
        {/* Text content */}
        <div className="flex flex-col gap-2">
          {/* Author label */}
          <p className="text-[#BABABA] text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]">
            Author
          </p>

          {/* Author name */}
          <h3 className="text-[#006840] text-[22px] font-normal leading-[1.5]">
            {author.name}
          </h3>

          {/* Author title */}
          {author.title && (
            <p className="text-[#001109] text-[14px] font-normal leading-[1.5]">
              {author.title}
            </p>
          )}

          {/* LinkedIn icon */}
          {author.linkedinUrl && (
            <Link
              href={author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006840] hover:opacity-70 transition-opacity w-6 h-6"
              aria-label={`${author.name} LinkedIn profile`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M9.25402 6.66641C9.25353 7.75216 8.59482 8.7292 7.5885 9.13681C6.58218 9.54444 5.42921 9.30124 4.67325 8.5219C3.91729 7.74256 3.70932 6.5827 4.14738 5.58926C4.58546 4.59582 5.5821 3.96717 6.66736 3.99974C8.10878 4.04301 9.25468 5.22433 9.25402 6.66641ZM9.33402 11.3064H4.00069V27.9997H9.33402V11.3064ZM17.7607 11.3064H12.454V27.9997H17.7074V19.2397C17.7074 14.3597 24.0674 13.9064 24.0674 19.2397V27.9997H29.3341V17.4264C29.3341 9.19974 19.9207 9.50641 17.7074 13.5464L17.7607 11.3064Z" fill="#006840"/>
              </svg>
            </Link>
          )}
        </div>

        {/* About link */}
        <Link
          href={author.slug ? `/resources/author/${author.slug}` : "/about#team"}
          className="inline-flex items-center gap-[5px] text-[#006840] text-[16px] font-semibold leading-[1.5] hover:opacity-70 transition-opacity"
        >
          <span>About {author.name.split(' ')[0]}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.66667 3.33333L13.3333 8L8.66667 12.6667M12.6667 8H2.66667" stroke="#006840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}