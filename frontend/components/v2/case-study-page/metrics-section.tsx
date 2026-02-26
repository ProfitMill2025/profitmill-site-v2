"use client"
import { Card } from '@/components/ui/card'

interface MetricItem {
  title?: string
  description?: string
}

interface ProjectHighlights {
  metric1?: MetricItem
  metric2?: MetricItem
  metric3?: MetricItem
  metric4?: MetricItem
  metric5?: MetricItem
}

interface MetricsSectionProps {
  projectHighlights?: ProjectHighlights
  industry?: string
  tools?: string
  team?: string
}

export default function MetricsSection({
  projectHighlights = {},
  industry,
  tools,
  team,
}: MetricsSectionProps) {
  const metrics = Object.entries(projectHighlights)
    .filter(([_, metric]) => metric?.title && metric?.description)
    .map(([key, metric]) => ({ key, ...(metric as MetricItem) }))

  return (
    <section className="pt-8 md:pt-12 pb-8 md:pb-12">
      <div className="mx-auto px-4 md:px-8">
        <div className="bg-[#BDFFD9] rounded-[32px] md:rounded-[32px] lg:rounded-[32px] overflow-hidden">
          <div className="pt-12 md:pt-16 pb-12 md:pb-16 px-6 md:px-8 lg:px-[120px]">
          {/* Metrics Cards */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4">
            {metrics.map((metric) => (
              <Card key={metric.key} className="w-full md:w-[174px] p-6 border-0 shadow-none">
                <div className="flex flex-row md:flex-col items-center md:text-center md:gap-0">
                  <div className="text-3xl lg:text-4xl font-bold text-[#006840] w-1/2 md:w-auto md:mb-2 text-center md:text-center">
                    {metric.title}
                  </div>
                  <div className="text-xs lg:text-sm w-1/2 md:w-auto text-left md:text-center">
                    {metric.description}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Project Highlights Title */}
          <h2 className="text-center text-2xl font-bold mt-8">Project Highlights</h2>

          {/* Project Highlights Cards */}
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <div className="bg-[#003B2D] w-full md:flex-1 lg:max-w-[350px] px-4 py-4 rounded-md text-center shadow-lg">
              <div className="text-sm font-light text-[#CEFF00]">Industry</div>
              <div className="text-[#CEFF00] font-light">{industry}</div>
            </div>
            <div className="bg-[#003B2D] w-full md:flex-1 lg:max-w-[350px] px-4 py-4 rounded-md text-center shadow-lg">
              <div className="text-sm font-light text-[#CEFF00]">Tool</div>
              <div className="text-[#CEFF00] font-light">{tools}</div>
            </div>
            <div className="bg-[#003B2D] w-full md:flex-1 lg:max-w-[350px] px-4 py-4 rounded-md text-center shadow-lg">
              <div className="text-sm font-light text-[#CEFF00]">Team</div>
              <div className="text-[#CEFF00] font-light">{team}</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
