import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Verify webhook signature (optional but recommended for security)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret if configured
    if (WEBHOOK_SECRET) {
      const signature = request.headers.get('sanity-webhook-signature')
      if (signature !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await request.json()
    const { _type, slug } = body

    console.log('Revalidating:', { _type, slug })

    if (_type === 'caseStudy') {
      if (slug?.current) {
        revalidatePath(`/case-studies/${slug.current}`, 'page')
      }
      revalidatePath('/', 'page')
      revalidateTag('case-studies', 'default')
    }

    if (_type === 'blogPost') {
      if (slug?.current) {
        revalidatePath(`/resources/blog/${slug.current}`, 'page')
      }
      revalidatePath('/resources/blog', 'page')
      revalidateTag('blog-posts', 'default')
    }

    if (_type === 'whoWeWorkWith') {
      if (slug?.current) {
        revalidatePath(`/who-we-work-with/${slug.current}`, 'page')
      }
      revalidatePath('/who-we-work-with', 'page')
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    )
  }
}
