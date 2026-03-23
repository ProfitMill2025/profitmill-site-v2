import crypto from 'crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

/**
 * Verify the Sanity webhook signature using HMAC-SHA256.
 * Sanity signs the request body with the shared secret and sends
 * the hex-encoded HMAC in the 'sanity-webhook-signature' header.
 */
function isValidSignature(
  rawBody: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false

  const hmac = crypto.createHmac('sha256', secret)
  const expectedSignature = hmac.update(rawBody).digest('hex')

  // Use timingSafeEqual to prevent timing attacks
  const expected = Buffer.from(expectedSignature)
  const received = Buffer.from(signature)

  if (expected.length !== received.length) return false
  return crypto.timingSafeEqual(expected, received)
}

export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text()

    // Verify the webhook secret if configured
    if (WEBHOOK_SECRET) {
      const signature = request.headers.get('sanity-webhook-signature')
      if (!isValidSignature(rawBody, signature, WEBHOOK_SECRET)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    // Parse the body from raw text (can't use request.json() after request.text())
    const body = JSON.parse(rawBody)
    const { _type, slug } = body

    console.log('Revalidating:', { _type, slug })

    // Track which paths were revalidated for debugging
    const revalidatedPaths: string[] = []

    switch (_type) {
      case 'caseStudy':
        if (slug?.current) {
          revalidatePath(`/case-studies/${slug.current}`, 'page')
          revalidatedPaths.push(`/case-studies/${slug.current}`)
        }
        revalidatePath('/', 'page')
        revalidateTag('case-studies', { expire: 0 })
        revalidatedPaths.push('/')
        break

      case 'blogPost':
        if (slug?.current) {
          revalidatePath(`/resources/blog/${slug.current}`, 'page')
          revalidatedPaths.push(`/resources/blog/${slug.current}`)
        }
        revalidatePath('/resources/blog', 'page')
        revalidateTag('blog-posts', { expire: 0 })
        revalidatedPaths.push('/resources/blog')
        break

      case 'whoWeWorkWith':
        if (slug?.current) {
          revalidatePath(`/who-we-work-with/${slug.current}`, 'page')
          revalidatedPaths.push(`/who-we-work-with/${slug.current}`)
        }
        revalidatePath('/who-we-work-with', 'page')
        revalidatedPaths.push('/who-we-work-with')
        break

      case 'privacyPolicy':
        revalidatePath('/privacy-policy', 'page')
        revalidatedPaths.push('/privacy-policy')
        break

      case 'terms':
        revalidatePath('/terms-conditions', 'page')
        revalidatedPaths.push('/terms-conditions')
        break

      case 'pageFaqs':
        revalidatePath('/', 'page')
        revalidateTag('pageFaqs', { expire: 0 })
        revalidatedPaths.push('/')
        break

      case 'pageLogos':
        revalidatePath('/', 'page')
        revalidateTag('pageLogos', { expire: 0 })
        revalidatedPaths.push('/')
        break

      case 'teamMember':
      case 'teamPet':
        revalidatePath('/about', 'page')
        revalidatedPaths.push('/about')
        break

      case 'tool':
      case 'playbook':
        revalidatePath('/resources/tools-templates', 'page')
        revalidatedPaths.push('/resources/tools-templates')
        break

      case 'podcast':
        revalidatePath('/resources/podcasts', 'page')
        revalidatedPaths.push('/resources/podcasts')
        break

      case 'author':
        revalidatePath('/resources/blog', 'page')
        revalidatedPaths.push('/resources/blog')
        break

      case 'settings':
        // Settings affect the entire site layout
        revalidatePath('/', 'layout')
        revalidatedPaths.push('/ (full site layout)')
        break

      default:
        // For any unrecognized type, revalidate the full site
        revalidatePath('/', 'layout')
        revalidatedPaths.push('/ (full site layout - unrecognized type)')
        break
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 },
    )
  }
}
