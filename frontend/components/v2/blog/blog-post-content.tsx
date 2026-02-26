'use client'

interface BlogPostContentProps {
  content: string
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <article
      className="prose prose-lg max-w-none
        prose-headings:text-gray-900 prose-headings:font-semibold
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
        prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-[#006840] prose-a:underline hover:prose-a:text-[#004d2f]
        prose-blockquote:border-l-4 prose-blockquote:border-[#006840]
        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
        prose-blockquote:my-8 prose-blockquote:text-xl
        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-gray-700 prose-li:mb-2
        prose-img:rounded-lg prose-img:my-8
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}