import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { authorQuery, authorSlugsQuery } from '@/sanity/lib/queries'
import AuthorHeader from '@/components/v2/resources/author/author-header'
import AuthorBio from '@/components/v2/resources/author/author-bio'
import MoreBlogPosts from '@/components/v2/blog/more-blog-posts'
import SubscribeCTA from '@/components/v2/blog/subscribe-cta'
import CtaSection from '@/components/v2/cta-section'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getAuthor(slug: string) {
  const author = await client.fetch(
    authorQuery,
    { slug },
    { next: { revalidate: 60 } }
  )
  return author
}

export async function generateStaticParams() {
  const slugs = await client.fetch(authorSlugsQuery)

  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  try {
    const author = await getAuthor(slug)

    if (!author) {
      return {
        title: 'Author Not Found - Profit Mill',
        description: 'The requested author page could not be found.',
      }
    }

    const authorImageUrl = author.profileImage
      ? urlFor(author.profileImage).width(800).height(800).url()
      : null

    return {
      title: `${author.name} - ${author.title} | Profit Mill`,
      description: author.bio || `Read articles by ${author.name}, ${author.title} at Profit Mill.`,
      openGraph: {
        title: `${author.name} - ${author.title}`,
        description: author.bio || `Read articles by ${author.name}, ${author.title} at Profit Mill.`,
        type: 'profile',
        images: authorImageUrl ? [
          {
            url: authorImageUrl,
            width: 800,
            height: 800,
            alt: author.name,
          }
        ] : [],
      },
      twitter: {
        card: 'summary',
        title: `${author.name} - ${author.title}`,
        description: author.bio || `Read articles by ${author.name}, ${author.title} at Profit Mill.`,
        images: authorImageUrl ? [authorImageUrl] : [],
      },
      alternates: {
        canonical: `https://www.profitmill.io/resources/author/${slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Author - Profit Mill',
      description: 'Author page',
    }
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let author: Awaited<ReturnType<typeof getAuthor>> = null

  try {
    author = await getAuthor(slug)
  } catch (error) {
    console.error('Error fetching author:', error)
    notFound()
  }

  if (!author) {
    notFound()
  }

  const authorData = {
    name: author.name,
    title: author.title ?? undefined,
    bio: author.bio ?? undefined,
    profileImage: author.profileImage
      ? urlFor(author.profileImage).width(400).height(400).url()
      : undefined,
    linkedinUrl: author.linkedinUrl ?? undefined,
    twitterUrl: author.twitterUrl ?? undefined,
    email: author.email ?? undefined,
    blogPosts: author.blogPosts?.map((post) => ({
      id: post._id,
      title: post.title,
      subtitle: post.subtitle ?? undefined,
      slug: post.slug.current,
      publishedAt: post.publishedAt,
      heroImage: post.heroImage ? urlFor(post.heroImage).width(600).url() : undefined,
      categories: post.categories ?? undefined,
      tags: post.tags ?? undefined,
      featured: post.featured ?? undefined,
    })) || [],
  }

  return (
    <div className="min-h-screen bg-white">
      <AuthorHeader authorName={authorData.name} />

      <AuthorBio
        author={{
          name: authorData.name,
          bio: authorData.bio,
          profileImage: authorData.profileImage,
          linkedinUrl: authorData.linkedinUrl,
        }}
      />

      {authorData.blogPosts.length > 0 && (
        <div className="mx-auto px-4 md:px-8 py-12 md:py-16">
          <MoreBlogPosts
            posts={authorData.blogPosts}
            title={`Articles by ${authorData.name.split(' ')[0]}`}
          />
        </div>
      )}

      <div className="mx-auto px-4 md:px-8">
        <SubscribeCTA />
      </div>

      <CtaSection />
    </div>
  )
}
