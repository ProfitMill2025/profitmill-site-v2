import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import BlogPostContent from '@/components/v2/blog/blog-post-content'
import AuthorCard from '@/components/v2/blog/author-card'
import SocialShare from '@/components/v2/blog/social-share'
import BlogPostHeader from '@/components/v2/blog/blog-post-header'
import TableOfContents from '@/components/v2/blog/table-of-contents'
import BlogCTACard from '@/components/v2/blog/blog-cta-card'
import NewsletterSignup from '@/components/v2/blog/newsletter-signup'
import SubscribeCTA from '@/components/v2/blog/subscribe-cta'
import MoreBlogPosts from '@/components/v2/blog/more-blog-posts'
import CtaSection from '@/components/v2/cta-section'
import { client } from '@/sanity/lib/client'
import React from 'react'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getBlogPost(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    slug,
    publishedAt,
    categories,
    tags,
    heroImage,
    content,
    seoTitle,
    seoDescription,
    featured,
    author->{
      name,
      title,
      bio,
      profileImage,
      linkedinUrl,
      twitterUrl,
      email,
      slug
    },
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && defined(publishedAt)] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      subtitle,
      heroImage,
      publishedAt,
      categories
    }
  }`

  const post = await client.fetch(query, { slug })
  return post
}

function calculateReadTime(content: any[]): string {
  const wordsPerMinute = 200
  let wordCount = 0

  content?.forEach((block) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.split(' ').length
        }
      })
    }
  })

  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readTime} min`
}

function createPortableTextComponents() {
  let h2Count = 0

  return {
    block: {
      h2: ({ children, value }: any) => {
        h2Count++
        const id = `heading-${value._key || Math.random()}`
        const isSecondH2 = h2Count === 2

        return (
          <>
            {isSecondH2 && (
              <div className="lg:hidden my-8">
                <BlogCTACard />
              </div>
            )}
            <h2 id={id} className="text-3xl font-semibold mt-12 mb-6 text-gray-900 scroll-mt-[140px]">
              {children}
            </h2>
          </>
        )
      },
    h3: ({ children, value }: any) => {
      const id = `heading-${value._key || Math.random()}`
      return (
        <h3 id={id} className="text-2xl font-semibold mt-10 mb-4 text-gray-900 scroll-mt-[140px]">
          {children}
        </h3>
      )
    },
      h4: ({ children }: any) => (
        <h4 className="text-xl font-semibold mt-8 mb-3 text-gray-900">{children}</h4>
      ),
      normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-[#006840] pl-6 italic text-gray-600 my-8 text-xl">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 my-6 space-y-2">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 my-6 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="text-gray-700">{children}</li>,
      number: ({ children }: any) => <li className="text-gray-700">{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
      em: ({ children }: any) => <em>{children}</em>,
      link: ({ value, children }: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-[#006840] underline hover:text-[#004d2f]"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center">{value.caption}</p>
          )}
        </div>
      ),
      callToAction: ({ value }: any) => (
        <div className={`my-8 p-6 rounded-lg ${
          value.style === 'primary' ? 'bg-[#006840] text-white' :
          value.style === 'secondary' ? 'bg-gray-100' :
          'bg-gray-50'
        }`}>
          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
          <p className="mb-4">{value.description}</p>
          <a
            href={value.buttonUrl}
            className={`inline-block px-4 py-2 rounded font-medium ${
              value.style === 'primary' ? 'bg-white text-[#006840]' : 'bg-[#006840] text-white'
            }`}
          >
            {value.buttonText}
          </a>
        </div>
      ),
    },
  }
}

const mockBlogPost = {
  title: "This is a blog post title",
  subtitle: "A compelling subtitle that explains what this post is about",
  author: {
    name: "Peter Guba",
    title: "CEO of Profit Mill",
    bio: "CEO and founder of Profit Mill. Expert in growth marketing and paid media strategies.",
    profileImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1759113709/img_abq1ft.png",
    linkedinUrl: "https://linkedin.com/in/peterguba"
  },
  publishedAt: "2024-02-15",
  readTime: "10 min",
  heroImage: "https://res.cloudinary.com/dzn9bpr2h/image/upload/v1759113741/img_ctemts.png",
  content: ``,
  relatedPosts: []
}

export const metadata: Metadata = {
  title: 'Blog Post - Profit Mill',
  description: 'Read our latest insights on growth marketing and paid media',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post = null
  let useFallback = false

  try {
    post = await getBlogPost(slug)
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    useFallback = true
  }

  if (!post && slug === 'ultimate-guide-growth-marketing-2024') {
    useFallback = true
  } else if (!post) {
    notFound()
  }

  const blogData = useFallback ? mockBlogPost : {
    title: post.title,
    subtitle: post.subtitle,
    author: {
      name: post.author?.name || 'Guest Author',
      title: post.author?.title,
      bio: post.author?.bio,
      profileImage: post.author?.profileImage ? urlFor(post.author.profileImage).width(150).url() : mockBlogPost.author.profileImage,
      linkedinUrl: post.author?.linkedinUrl,
      slug: post.author?.slug?.current,
    },
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : mockBlogPost.publishedAt,
    readTime: calculateReadTime(post.content),
    heroImage: post.heroImage ? urlFor(post.heroImage).width(1200).url() : mockBlogPost.heroImage,
    content: post.content,
    relatedPosts: post.relatedPosts?.map((related: any) => ({
      id: related._id,
      title: related.title,
      subtitle: related.subtitle || '',
      heroImage: related.heroImage ? urlFor(related.heroImage).width(400).url() : mockBlogPost.heroImage,
      slug: related.slug.current,
      categories: related.categories || [],
    })) || [],
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogPostHeader
        title={blogData.title}
        heroImage={blogData.heroImage}
        heroImageAlt={post?.heroImage?.alt || blogData.title}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="lg:col-span-3 lg:sticky lg:top-[160px] lg:h-fit lg:self-start">
            <TableOfContents content={blogData.content} />
          </div>

          <div className="lg:col-span-6 lg:self-start">
            {useFallback ? (
              <BlogPostContent content={blogData.content} />
            ) : (
              <article className="max-w-none [&>*:first-child]:mt-0">
                <PortableText
                  value={blogData.content}
                  components={createPortableTextComponents()}
                />
              </article>
            )}

            <div className="mt-12">
              <SocialShare
                url={`https://profitmill.io/resources/blog/${slug}`}
                title={blogData.title}
              />
            </div>

            <div className="mt-12">
              <AuthorCard author={blogData.author} compact={false} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-[160px] lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto">
              <div className="flex flex-col gap-10">
                <div className="hidden lg:block">
                  <BlogCTACard />
                </div>
                <div className="hidden lg:block">
                  <NewsletterSignup />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SubscribeCTA />

        {blogData.relatedPosts.length > 0 && (
          <div className="mt-12">
            <MoreBlogPosts
              posts={blogData.relatedPosts}
            />
          </div>
        )}
      </div>

      <CtaSection
        title="Ready to make paid ads work for you?"
        subtitle="Book a free ad audit and our performance experts will assess your setup and show you exactly where you're leaving money on the table—and how to fix it."
        buttonText="Book your free audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/googleadsaudit"
      />
    </div>
  )
}
