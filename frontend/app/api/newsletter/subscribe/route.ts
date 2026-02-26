import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/attio'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request.headers)
    const { allowed, retryAfter } = checkRateLimit(clientIp)

    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${retryAfter} seconds.` },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfter) },
        }
      )
    }

    // Parse request body
    const body = await request.json().catch(() => ({}))
    const { email, website } = body

    // Honeypot check - if filled, likely a bot
    if (website) {
      // Silently succeed to not alert bots
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to the newsletter',
      })
    }

    // Validate email is provided
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Normalize and validate email format
    const normalizedEmail = email.trim().toLowerCase()

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Subscribe to newsletter via Attio
    await subscribeToNewsletter(normalizedEmail)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter',
    })
  } catch (error) {
    // Log error server-side for debugging
    console.error('Newsletter subscription error:', error)

    // Return generic error to client
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
