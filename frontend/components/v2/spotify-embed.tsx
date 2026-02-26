'use client'

interface SpotifyEmbedProps {
  spotifyUrl: string
  className?: string
  height?: number
}

/**
 * Converts a Spotify URL to an embed URL
 * Supports episode, show, track, album, and playlist URLs
 */
function getSpotifyEmbedUrl(url: string): string | null {
  try {
    // Handle various Spotify URL formats
    // https://open.spotify.com/episode/ABC123
    // https://open.spotify.com/show/ABC123
    // https://spoti.fi/ABC123

    const urlObj = new URL(url)

    if (urlObj.hostname === 'open.spotify.com') {
      // Already a Spotify URL, convert to embed format
      const pathParts = urlObj.pathname.split('/')
      const type = pathParts[1] // episode, show, track, album, playlist
      const id = pathParts[2]

      if (type && id) {
        return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`
      }
    }

    return null
  } catch {
    return null
  }
}

export default function SpotifyEmbed({ spotifyUrl, className = '', height = 352 }: SpotifyEmbedProps) {
  const embedUrl = getSpotifyEmbedUrl(spotifyUrl)

  if (!embedUrl) {
    return null
  }

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height={height}
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className={`rounded-xl border-0 ${className}`}
      title="Spotify Episode"
    />
  )
}
