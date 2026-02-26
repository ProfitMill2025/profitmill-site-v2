/**
 * Simple in-memory rate limiter
 * Limits requests per IP address to prevent abuse
 */

interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

// Configuration
const WINDOW_MS = 60 * 1000 // 1 minute window
const MAX_REQUESTS = 5 // 5 requests per window

// Cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000

let cleanupTimer: NodeJS.Timeout | null = null

function startCleanup() {
  if (cleanupTimer) return

  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }, CLEANUP_INTERVAL)

  // Don't prevent process from exiting
  cleanupTimer.unref()
}

export interface RateLimitResult {
  allowed: boolean
  retryAfter?: number
  remaining: number
}

/**
 * Check if a request from the given identifier should be allowed
 * @param identifier - Unique identifier (typically IP address)
 * @returns Object with allowed status and retry information
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  startCleanup()

  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  // No existing record or window has expired
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  // Check if limit exceeded
  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfter, remaining: 0 }
  }

  // Increment count
  record.count++
  return { allowed: true, remaining: MAX_REQUESTS - record.count }
}

/**
 * Extract client IP from request headers
 * @param headers - Request headers
 * @returns Client IP address or 'unknown'
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
