import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allBlogPostsQuery } from '@/sanity/lib/queries'
import ResourceList from '@/components/resource-list'
import PageHeader from '@/components/v2/page-header'
import CtaSection from '@/components/v2/cta-section'
import SubscribeCTA from '@/components/v2/blog/subscribe-cta'
import FeatureBlog from '@/components/v2/blog/feature-blog'
import imageUrlBuilder from '@sanity/image-url'

export const metadata: Metadata = {
  title: 'The Paid Growth Blog For B2B Marketers | Profit Mill',
  description: "Fresh takes on paid growth from the team that's spent 10 years managing 1000+ ad accounts. Built for B2B marketers and founders who want to make paid ads profitable.",
  alternates: {
    canonical: 'https://www.profitmill.io/resources/blog',
  },
}

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getBlogPosts() {
  return await client.fetch(allBlogPostsQuery, {}, {
    next: {
      tags: ['blogPost'],
      revalidate: 60
    }
  })
}

function calculateReadTime(subtitle?: string | null): string {
  return '5 min'
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  const featuredPosts = blogPosts.slice(0, 3).map(post => ({
    _id: post._id,
    title: post.title,
    subtitle: post.subtitle ?? undefined,
    slug: post.slug,
    heroImage: post.heroImage ? urlFor(post.heroImage).width(800).url() : undefined,
    category: post.categories?.[0] || 'Blog Post',
  }))

  const transformedPosts = blogPosts.map(post => ({
    _id: post._id,
    type: post.categories?.[0]?.toUpperCase() || 'ARTICLE',
    title: post.title,
    text: post.subtitle || '',
    tags: post.tags?.join(', '),
    slug: post.slug,
    duration: calculateReadTime(post.subtitle),
    date: new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    ctaText: 'Read more',
    coverImage: post.heroImage ? urlFor(post.heroImage).width(600).url() : undefined,
    author: post.author?.name,
  }))

  const allCategories = blogPosts.flatMap(post => post.categories || [])
  const allTags = blogPosts.flatMap(post => post.tags || [])
  const uniqueFilters = ['All', ...Array.from(new Set([...allCategories, ...allTags])).sort()]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Unfiltered perspectives on profitable paid growth"
        description="Built for marketers and founders who want less theory, and more ROI. Get fresh takes on the tactics and strategy we use to help our clients achieve profitable growth with paid ads."
        buttonText="Get a free paid ad audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />

      <div className="max-w-[2000px] mx-auto px-4 md:px-8">
        <SubscribeCTA />
      </div>

      <FeatureBlog posts={featuredPosts} />

      <ResourceList
        sectionTitle="Catch up on the latest insights"
        sectionTitleClassName="font-semibold leading-[1.5] text-[#001109] text-[24px]"
        sectionTitleAlign="left"
        resources={transformedPosts}
        cardType="simple"
        filters={uniqueFilters}
        showPagination={true}
        itemsPerPage={9}
        backgroundColor="none"
      />

      <CtaSection
        title="Ready to make paid ads work for you?"
        subtitle="Book a free ad audit and our performance experts will assess your setup and show you exactly where you're leaving money on the table—and how to fix it."
        buttonText="Book your free audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
