import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allToolsQuery, allPlaybooksQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/utils'
import ResourceList from '@/components/resource-list'
import PageHeader from '@/components/v2/page-header'
import CtaSection from '@/components/v2/cta-section'

export const metadata: Metadata = {
  title: 'Free Paid Ads Templates for B2B Founders & Marketers | Profit Mill',
  description: 'Assess paid ads readiness, choose the right channels, optimize your funnel, and plan your budget with paid ads templates built for B2B SaaS, PLG, and service teams.',
  alternates: {
    canonical: 'https://www.profitmill.io/resources/tools-templates',
  },
}

async function getTools() {
  return await client.fetch(allToolsQuery, {}, {
    next: {
      tags: ['tools'],
      revalidate: 60
    }
  })
}

async function getPlaybooks() {
  return await client.fetch(allPlaybooksQuery, {}, {
    next: {
      tags: ['playbooks'],
      revalidate: 60
    }
  })
}

export default async function ToolsTemplatesPage() {
  const [tools, playbooks] = await Promise.all([getTools(), getPlaybooks()])

  const transformedTools = tools.map(tool => ({
    _id: tool._id,
    type: tool.type,
    title: tool.title,
    description: tool.description,
    tags: tool.tags?.join(', '),
    downloadLink: tool.downloadFile?.asset?.url ?? undefined,
    downloadButtonText: tool.downloadButtonText,
    coverImage: tool.coverImage && !(tool.coverImage as any)._upload ? urlFor(tool.coverImage).width(600).height(400).url() : undefined,
    category: tool.category,
    fileFormat: tool.fileFormat,
    fileSize: tool.fileSize ?? undefined,
    ctaText: tool.downloadButtonText || 'Download'
  }))

  const transformedPlaybooks = playbooks.map(playbook => ({
    _id: playbook._id,
    title: playbook.title,
    text: playbook.description,
    tags: playbook.tags?.join(', '),
    downloadLink: playbook.downloadFile?.asset?.url ?? undefined,
    downloadButtonText: playbook.downloadButtonText,
    coverImage: playbook.coverImage && !(playbook.coverImage as any)._upload ? urlFor(playbook.coverImage).width(600).height(400).url() : undefined,
    industry: playbook.industry,
    pageCount: playbook.pageCount ?? undefined,
    fileSize: playbook.fileSize ?? undefined,
    ctaText: playbook.downloadButtonText || 'Download'
  }))

  const allToolTags = tools.flatMap(tool => tool.tags || [])
  const uniqueToolTags = ['All', ...Array.from(new Set(allToolTags)).sort()]

  const playbookTags = playbooks.flatMap(pb => pb.tags || [])
  const uniquePlaybookTags = ['All', ...Array.from(new Set(playbookTags)).sort()]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Start and scale paid ads like a pro"
        description={`Know when and how much to invest in paid ads, what channels work best, and how to improve performance. Download our free tools and templates that answer the most pressing questions of B2B founders and marketing teams.

Want an expert to weigh in?`}
        buttonText="Get a free paid ad audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
      />

      <div id="tools">
        <ResourceList
          sectionTitle=""
          sectionSubtitle=""
          resources={transformedTools}
          cardType="withImage"
          filters={uniqueToolTags}
          showPagination={true}
          itemsPerPage={4}
        />
      </div>

      <ResourceList
        sectionTitle="Want a leg up on your competitors? Check out our industry playbooks."
        sectionSubtitle="Want to know what's working in your space? We break down real-world paid ads strategies for SaaS, PLG, and service companies—so you can skip the theory and see exactly how others are scaling (or flopping)."
        resources={transformedPlaybooks}
        cardType="withImage"
        filters={uniquePlaybookTags}
        showPagination={true}
        itemsPerPage={3}
        columns={3}
      />

      <CtaSection
        title="If you're second-guessing, get a second opinion"
        subtitle="Templates are a great start—but if you want a second set of eyes on your funnel, targeting, or budget, we've got you."
        buttonText="Book your free audit"
        buttonLink="https://app.hellobonsai.com/s/profitmill/paidadsaudit"
      />
    </div>
  )
}
