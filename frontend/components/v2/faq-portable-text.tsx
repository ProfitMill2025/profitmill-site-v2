import { PortableText, PortableTextComponents } from '@portabletext/react'

const faqPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 ml-4 mb-3 last:mb-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 ml-4 mb-3 last:mb-0">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-[#ffba0a] font-medium hover:opacity-80 transition-opacity"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FaqPortableText({ value }: { value: any[] }) {
  return <PortableText value={value} components={faqPortableTextComponents} />
}
