'use client'

import { useState, useMemo } from 'react'
import { GitCompare } from 'lucide-react'
import { DisplayCategory, AudienceTag, PriceTier } from './types'
import { tools as allToolsData } from './utils/data'
import { FilterBar } from './components/FilterBar'
import { ToolTable } from './components/ToolTable'
import { ComparePanel } from './components/ComparePanel'
import { StatsBar } from './components/StatsBar'

export default function MatrixApp() {
  const [activeCategory, setActiveCategory] = useState<DisplayCategory>('mta')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAudience, setSelectedAudience] = useState<AudienceTag | 'All'>('All')
  const [selectedPrice, setSelectedPrice] = useState<PriceTier | 'All'>('All')
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set())
  const [showCompare, setShowCompare] = useState(false)

  const audienceOptions = useMemo(() => {
    const catTools =
      activeCategory === 'incrementality'
        ? allToolsData.filter((t) => t.hasIncrementality)
        : allToolsData.filter((t) => t.category === activeCategory)
    const tags = new Set<AudienceTag>()
    catTools.forEach((t) => t.audienceTags.forEach((tag) => tags.add(tag)))
    const sorted = Array.from(tags).sort()
    return ['All' as const, ...sorted]
  }, [activeCategory])

  const filteredTools = useMemo(() => {
    return allToolsData.filter((t) => {
      if (activeCategory === 'incrementality') {
        if (!t.hasIncrementality) return false
      } else {
        if (t.category !== activeCategory) return false
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const searchable = [t.name, t.bestFor, ...t.models, ...t.strengths, ...t.audienceTags]
          .join(' ')
          .toLowerCase()
        if (!searchable.includes(q)) return false
      }
      if (selectedAudience !== 'All' && !t.audienceTags.includes(selectedAudience)) return false
      if (selectedPrice !== 'All' && t.priceTier !== selectedPrice) return false
      return true
    })
  }, [activeCategory, searchQuery, selectedAudience, selectedPrice])

  const compareTools = useMemo(() => {
    return allToolsData.filter((t) => selectedTools.has(t.name))
  }, [selectedTools])

  const handleToggleSelect = (name: string) => {
    setSelectedTools((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const handleCategoryChange = (cat: DisplayCategory) => {
    setActiveCategory(cat)
    setSelectedAudience('All')
    setSelectedPrice('All')
    setSearchQuery('')
  }

  return (
    <div
      className="min-h-screen flex flex-col gap-5 p-4 pb-8"
      style={{ background: '#ffffff', maxWidth: '1440px', margin: '0 auto' }}
    >
      {/* Header */}
      <div className="pb-2" style={{ borderBottom: '2px solid #006840' }}>
        <h1
          className="text-xl font-bold"
          style={{ color: '#001109', fontFamily: "'Sora', sans-serif" }}
        >
          Marketing Measurement Tools Matrix
        </h1>
        <p className="text-xs mt-0.5" style={{ color: '#6a7282' }}>
          Compare MTA, MMM, unified & incrementality platforms across audiences, models, and pricing
        </p>
      </div>

      <StatsBar
        allTools={allToolsData}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedAudience={selectedAudience}
        onAudienceChange={setSelectedAudience}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
        audienceOptions={audienceOptions}
        resultCount={filteredTools.length}
      />

      {selectedTools.size > 0 && (
        <div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ background: '#006840' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#008751'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#006840'
            }}
            onClick={() => setShowCompare(!showCompare)}
          >
            <GitCompare size={16} />
            {showCompare ? 'Hide' : 'Compare'} {selectedTools.size} Selected
          </button>
        </div>
      )}

      {showCompare && compareTools.length > 0 && (
        <ComparePanel
          tools={compareTools}
          category={activeCategory}
          onRemove={(name) => handleToggleSelect(name)}
          onClose={() => {
            setSelectedTools(new Set())
            setShowCompare(false)
          }}
        />
      )}

      <ToolTable
        key={activeCategory}
        tools={filteredTools}
        category={activeCategory}
        selectedTools={selectedTools}
        onToggleSelect={handleToggleSelect}
      />

      {/* Embedded styles for scrollbars, checkboxes, and transitions */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pm-group-card {
              border-radius: 0.75rem;
              border: 1px solid rgba(0, 53, 31, 0.08);
              overflow: hidden;
              background: #ffffff;
            }
            .sticky-col {
              position: sticky;
              left: 0;
              z-index: 10;
            }
            .sticky-col-name {
              position: sticky;
              left: 32px;
              z-index: 10;
            }
            tr {
              transition: background-color 0.1s ease;
            }
            .overflow-x-auto::-webkit-scrollbar {
              height: 4px;
            }
            .overflow-x-auto::-webkit-scrollbar-thumb {
              background: rgba(0, 104, 64, 0.15);
              border-radius: 4px;
            }
            .overflow-x-auto::-webkit-scrollbar-track {
              background: transparent;
            }
          `,
        }}
      />
    </div>
  )
}
