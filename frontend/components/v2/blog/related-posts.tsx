'use client'

import Image from 'next/image'
import Link from 'next/link'

interface RelatedPost {
  id: string
  title: string
  excerpt: string
  readTime: string
  thumbnail: string
  slug: string
  category?: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Related Articles</h3>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/resources/blog/${post.slug}`}
            className="block group"
          >
            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="relative w-full h-40 bg-gray-100">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.category && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 rounded">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#006840] transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.readTime} read</span>
                  <span className="text-[#006840] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View all link */}
      <Link
        href="/resources/blog"
        className="inline-flex items-center text-[#006840] font-medium hover:underline"
      >
        View all articles
        <span className="ml-2">→</span>
      </Link>
    </div>
  )
}