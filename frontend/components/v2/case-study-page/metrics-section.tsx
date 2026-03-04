"use client"

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
        <div className="bg-[#B6FFCE] rounded-[32px] overflow-hidden">
          <div className="py-12 px-6 md:px-8 lg:px-[120px] flex flex-col gap-12">
          {/* Metrics Cards */}
          <div className="flex flex-col md:flex-row gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.key}
                className="bg-white rounded-[10px] p-5 flex-1 flex flex-col gap-4 items-center"
              >
                <div className="text-[42px] font-bold text-[#006840] leading-[1.2] text-center">
                  {metric.title}
                </div>
                <div className="text-[18px] text-[#001109] text-center leading-[1.5]">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>

          {/* Project Highlights Title */}
          <div className="flex flex-col gap-12 items-center">
            <h2 className="text-center text-[32px] font-semibold text-[#001109] leading-[1.5]">
              Project highlights
            </h2>

            {/* Project Highlights Cards */}
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <div className="bg-[#00351F] flex-1 p-5 rounded-[10px] text-center flex items-center justify-center">
                <div className="text-[18px] text-[#CEFF00] leading-[1.5]">
                  <p>Industry:</p>
                  <p>{industry}</p>
                </div>
              </div>
              <div className="bg-[#00351F] flex-1 p-5 rounded-[10px] text-center flex items-center justify-center">
                <div className="text-[18px] text-[#CEFF00] leading-[1.5]">
                  <p>Tools:</p>
                  <p>{tools}</p>
                </div>
              </div>
              <div className="bg-[#00351F] flex-1 p-5 rounded-[10px] text-center flex items-center justify-center">
                <div className="text-[18px] text-[#CEFF00] leading-[1.5]">
                  <p>Who I worked with:</p>
                  <p>{team}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
