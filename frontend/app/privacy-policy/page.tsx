import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import PageHeader from '@/components/v2/page-header'

export const metadata: Metadata = {
  title: 'Privacy Policy - Profit Mill',
  description: 'Privacy Policy for Profit Mill',
  alternates: {
    canonical: 'https://www.profitmill.io/privacy-policy',
  },
}

async function getPrivacyPolicy() {
  const query = `*[_type == "privacyPolicy"][0]{
    title,
    content,
    lastUpdated
  }`

  try {
    const privacyPolicy = await client.fetch(query)
    return privacyPolicy
  } catch (error) {
    console.error('Error fetching privacy policy from Sanity:', error)
    return null
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#006840] pl-6 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 my-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 my-4 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
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
}

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicy()

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Privacy Policy"
        description=""
        buttonText=""
        showClutchBadge={false}
      />

      <div className="mx-auto max-w-4xl px-6 py-16">

        {privacyPolicy?.lastUpdated && (
          <p className="text-gray-600 mb-8">
            Last updated: {new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          {privacyPolicy?.content ? (
            <PortableText
              value={privacyPolicy.content}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-gray-700">
              Privacy policy content not found. Please add content in Sanity Studio.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
