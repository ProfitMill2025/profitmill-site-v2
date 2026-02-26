'use client'

import { useState } from 'react'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  // Check if native share is available
  const canShare = typeof window !== 'undefined' && 'share' in navigator

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : `https://profitmill.io${url}`

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    bluesky: `https://bsky.app/intent/compose?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
    slack: `https://slack.com/share?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || title + '\n\n' + shareUrl)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl,
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 items-start">
      {/* Title */}
      <p className={`${sora.className} text-[#BABABA] text-[12px] font-extrabold uppercase tracking-[2.16px] leading-[1.3]`}>
        share this article
      </p>

      {/* Icons */}
      <div className="flex gap-8 items-center">
        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
          aria-label="Share on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M9.25402 6.66641C9.25353 7.75216 8.59482 8.7292 7.5885 9.13681C6.58218 9.54444 5.42921 9.30124 4.67325 8.5219C3.91729 7.74256 3.70932 6.5827 4.14738 5.58926C4.58546 4.59582 5.5821 3.96717 6.66736 3.99974C8.10878 4.04301 9.25468 5.22433 9.25402 6.66641ZM9.33402 11.3064H4.00069V27.9997H9.33402V11.3064ZM17.7607 11.3064H12.454V27.9997H17.7074V19.2397C17.7074 14.3597 24.0674 13.9064 24.0674 19.2397V27.9997H29.3341V17.4264C29.3341 9.19974 19.9207 9.50641 17.7074 13.5464L17.7607 11.3064Z" fill="#006840"/>
          </svg>
        </a>

        {/* Twitter/X */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
          aria-label="Share on Twitter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M23.5832 4.0835L16.9209 11.6992L11.1606 4.0835H2.81772L12.7862 17.1184L3.33838 27.9168H7.38394L14.6757 19.585L21.0484 27.9168H29.1847L18.7933 14.1791L27.6264 4.0835H23.5832ZM22.1643 25.4968L7.53916 6.37639H9.94328L24.4045 25.4968H22.1643Z" fill="#006840"/>
          </svg>
        </a>

        {/* Bluesky */}
        <a
          href={shareLinks.bluesky}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
          aria-label="Share on Bluesky"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 15.1844C14.7922 12.8355 11.5044 8.45881 8.44663 6.30104C5.51773 4.23325 4.40107 4.59104 3.66885 4.92325C2.82107 5.30437 2.66663 6.60658 2.66663 7.37102C2.66663 8.13769 3.08663 13.6488 3.35996 14.57C4.26552 17.61 7.48552 18.6366 10.4522 18.3077C6.10552 18.9521 2.2444 20.5354 7.30773 26.1721C12.8777 31.9388 14.941 24.9354 16 21.3854C17.0589 24.9354 18.2777 31.6866 24.5922 26.1721C29.3333 21.3854 25.8944 18.9521 21.5477 18.3077C24.5144 18.6377 27.7344 17.61 28.64 14.57C28.9133 13.65 29.3333 8.13658 29.3333 7.37214C29.3333 6.60548 29.1789 5.30436 28.331 4.92104C27.5989 4.58992 26.4822 4.23214 23.5533 6.29881C20.4956 8.45992 17.2077 12.8366 16 15.1844Z" fill="#006840"/>
          </svg>
        </a>

        {/* Slack */}
        <button
          onClick={() => window.open(shareLinks.slack, '_blank')}
          className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
          aria-label="Share on Slack"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8.70314 19.3511C8.70314 20.7951 7.52348 21.9749 6.07941 21.9749C4.63534 21.9749 3.45569 20.7951 3.45569 19.3511C3.45569 17.907 4.63534 16.7274 6.07941 16.7274H8.70314V19.3511ZM10.0252 19.3511C10.0252 17.907 11.2048 16.7274 12.6489 16.7274C14.093 16.7274 15.2726 17.907 15.2726 19.3511V25.9206C15.2726 27.3647 14.093 28.5443 12.6489 28.5443C11.2048 28.5443 10.0252 27.3647 10.0252 25.9206V19.3511ZM12.6489 8.70254C11.2048 8.70254 10.0252 7.52288 10.0252 6.07881C10.0252 4.63474 11.2048 3.45508 12.6489 3.45508C14.093 3.45508 15.2726 4.63474 15.2726 6.07881V8.70254H12.6489ZM12.6489 10.0246C14.093 10.0246 15.2726 11.2042 15.2726 12.6483C15.2726 14.0923 14.093 15.2721 12.6489 15.2721H6.07941C4.63534 15.2721 3.45569 14.0923 3.45569 12.6483C3.45569 11.2042 4.63534 10.0246 6.07941 10.0246H12.6489ZM23.2976 12.6483C23.2976 11.2042 24.4772 10.0246 25.9212 10.0246C27.3653 10.0246 28.5449 11.2042 28.5449 12.6483C28.5449 14.0923 27.3653 15.2721 25.9212 15.2721H23.2976V12.6483ZM21.9754 12.6483C21.9754 14.0923 20.7958 15.2721 19.3517 15.2721C17.9077 15.2721 16.728 14.0923 16.728 12.6483V6.07881C16.728 4.63474 17.9077 3.45508 19.3517 3.45508C20.7958 3.45508 21.9754 4.63474 21.9754 6.07881V12.6483ZM19.3517 23.2969C20.7958 23.2969 21.9754 24.4766 21.9754 25.9206C21.9754 27.3647 20.7958 28.5443 19.3517 28.5443C17.9077 28.5443 16.728 27.3647 16.728 25.9206V23.2969H19.3517ZM19.3517 21.9749C17.9077 21.9749 16.728 20.7951 16.728 19.3511C16.728 17.907 17.9077 16.7274 19.3517 16.7274H25.9212C27.3653 16.7274 28.5449 17.907 28.5449 19.3511C28.5449 20.7951 27.3653 21.9749 25.9212 21.9749H19.3517Z" fill="#006840"/>
          </svg>
        </button>

        {/* Email */}
        <a
          href={shareLinks.email}
          className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
          aria-label="Share via email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4.00002 4H28C28.7364 4 29.3334 4.59696 29.3334 5.33333V26.6667C29.3334 27.4031 28.7364 28 28 28H4.00002C3.26365 28 2.66669 27.4031 2.66669 26.6667V5.33333C2.66669 4.59696 3.26365 4 4.00002 4ZM26.6667 9.65056L16.0958 19.1173L5.33335 9.62125V25.3333H26.6667V9.65056ZM6.0153 6.66667L16.0826 15.5493L26.0014 6.66667H6.0153Z" fill="#006840"/>
          </svg>
        </a>

        {/* Share / Copy Link */}
        <div className="relative">
          {canShare ? (
            <button
              onClick={handleNativeShare}
              className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity"
              aria-label="Share"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M17.3333 18.6667H14.6667C10.056 18.6667 6.05271 21.2669 4.04319 25.0809C4.01457 24.7244 4 24.3639 4 24C4 16.6363 9.96953 10.6667 17.3333 10.6667V4L30.6667 14.6667L17.3333 25.3333V18.6667Z" fill="#006840"/>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleCopyLink}
              className="w-8 h-8 text-[#006840] hover:opacity-70 transition-opacity relative"
              aria-label={copied ? 'Link copied!' : 'Copy link'}
            >
              {copied ? (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3333 20.6667L8 15.3333L9.88 13.4533L13.3333 16.9067L22.12 8.12L24 10L13.3333 20.6667Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M17.3333 18.6667H14.6667C10.056 18.6667 6.05271 21.2669 4.04319 25.0809C4.01457 24.7244 4 24.3639 4 24C4 16.6363 9.96953 10.6667 17.3333 10.6667V4L30.6667 14.6667L17.3333 25.3333V18.6667Z" fill="#006840"/>
                </svg>
              )}
            </button>
          )}
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Link copied!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}