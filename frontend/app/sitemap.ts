import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { authorSlugsQuery, sitemapData } from '@/sanity/lib/queries'

const baseUrl = 'https://www.profitmill.io'

const routeMap: Record<string, string> = {
  caseStudy: '/case-studies',
  blogPost: '/resources/blog',
  whoWeWorkWith: '/who-we-work-with',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/case-studies',
    '/paid-ads-pricing',
    '/privacy-policy',
    '/profit-studio',
    '/terms-conditions',
    '/what-we-do',
    '/what-we-do/google-ads',
    '/what-we-do/linkedin-ads',
    '/what-we-do/other-channels',
    '/who-we-work-with',
    '/resources/blog',
    '/resources/podcasts',
    '/resources/tools-templates',
    '/resources/alternatives',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic routes from Sanity
  const [dynamicContent, authorSlugs] = await Promise.all([
    client.fetch<Array<{ slug: string; _type: string; _updatedAt: string }>>(sitemapData),
    client.fetch<Array<string>>(authorSlugsQuery),
  ])

  const dynamicRoutes = dynamicContent.map((item) => {
    const prefix = routeMap[item._type] || ''
    return {
      url: `${baseUrl}${prefix}/${item.slug}`,
      lastModified: item._updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  const authorRoutes = authorSlugs.map((slug) => ({
    url: `${baseUrl}/resources/author/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...dynamicRoutes, ...authorRoutes]
}
