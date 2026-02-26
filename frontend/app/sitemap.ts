import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { sitemapData } from '@/sanity/lib/queries'

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
    '/who-we-work-with',
    '/resources/blog',
    '/resources/podcasts',
    '/resources/tools-templates',
    '/resources/alternatives',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic routes from Sanity
  const dynamicContent = await client.fetch<Array<{ slug: string; _type: string; _updatedAt: string }>>(sitemapData)
  const dynamicRoutes = dynamicContent.map((item) => {
    const prefix = routeMap[item._type] || ''
    return {
      url: `${baseUrl}${prefix}/${item.slug}`,
      lastModified: item._updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  return [...staticRoutes, ...dynamicRoutes]
}
