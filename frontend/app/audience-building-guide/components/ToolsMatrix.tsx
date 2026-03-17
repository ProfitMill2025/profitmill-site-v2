'use client';

import React, { useState, useMemo } from 'react';
import { toolsData, columnDefinitions } from '../utils/data';
import type { ToolData, ToolCategory, SupportLevel, AdPlatform, ColumnDef } from '../types';

const categories: ToolCategory[] = [
  'ABM Platform',
  'Intent Data',
  'Audience Builder',
  'Data Enrichment',
  'Ad Automation',
  'Sales Intelligence',
  'Review Intent',
];

const adPlatforms: AdPlatform[] = ['LinkedIn', 'Meta', 'Google', 'Reddit', 'X', 'Programmatic'];

const outputKeys = ['companyLists', 'contactLists', 'lookalikes', 'intentSignals', 'audienceSync'] as const;

const categoryColors: Record<string, string> = {
  'ABM Platform': '#006840',
  'Intent Data': '#7C3AED',
  'Audience Builder': '#0A66C2',
  'Data Enrichment': '#D97706',
  'Ad Automation': '#DC2626',
  'Sales Intelligence': '#0891B2',
  'Review Intent': '#DB2777',
};

function SupportBadge({ level }: { level: SupportLevel }) {
  if (level === 'full') return <span title="Full support" className="text-xs">✅</span>;
  if (level === 'partial') return <span title="Partial / via export" className="text-xs">⚠️</span>;
  return <span title="Not supported" className="text-xs opacity-30">❌</span>;
}

function Tooltip({ def }: { def: ColumnDef | undefined }) {
  if (!def) return null;
  return (
    <span className="pm-tooltip">
      <svg className="w-3 h-3 inline ml-1 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="pm-tooltip-text">{def.definition}</span>
    </span>
  );
}

function ToolDetailModal({ tool, onClose }: { tool: ToolData; onClose: () => void }) {
  const catColor = categoryColors[tool.category] || '#006840';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
                  style={{ backgroundColor: catColor }}
                >
                  {tool.category}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: '#B6FFCE', color: '#00351F' }}
                >
                  {tool.b2bFit}
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: '#001109' }}>{tool.name}</h3>
              <a
                href={`https://${tool.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:underline"
                style={{ color: '#006840' }}
              >
                {tool.website} ↗
              </a>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm leading-relaxed">{tool.description}</p>

          {/* Ad Platforms */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#006840' }}>
              Ad Platform Support
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {adPlatforms.map((p) => (
                <div key={p} className="flex items-center gap-1.5 text-xs p-1.5 rounded" style={{ backgroundColor: '#F8FFF5' }}>
                  <SupportBadge level={tool.adPlatforms[p]} />
                  <span className="font-medium">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output Capabilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#006840' }}>
              Output Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {outputKeys.map((key) => {
                const labels: Record<string, string> = {
                  companyLists: 'Company Lists',
                  contactLists: 'Contact Lists',
                  lookalikes: 'Lookalikes',
                  intentSignals: 'Intent Signals',
                  audienceSync: 'Audience Sync',
                };
                return (
                  <div key={key} className="flex items-center gap-1.5 text-xs p-1.5 rounded" style={{ backgroundColor: '#F8FFF5' }}>
                    <SupportBadge level={tool.outputTypes[key]} />
                    <span className="font-medium">{labels[key]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FFF5', border: '1px solid #B6FFCE' }}>
              <div className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#006840' }}>Resolution</div>
              <div className="text-sm font-bold" style={{ color: '#001109' }}>{tool.dataResolution}</div>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FFF5', border: '1px solid #B6FFCE' }}>
              <div className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#006840' }}>Price Tier</div>
              <div className="text-sm font-bold" style={{ color: '#001109' }}>{tool.priceTier}</div>
            </div>
            <div className="col-span-2 p-3 rounded-lg" style={{ backgroundColor: '#FFF9E6', border: '1px solid #FFBA0A' }}>
              <div className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#7A5800' }}>Estimated Price Range</div>
              <div className="text-sm font-bold" style={{ color: '#001109' }}>{tool.priceRange}</div>
            </div>
          </div>

          {/* Data Source */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>Data Source</h4>
            <p className="text-xs">{tool.dataSource}</p>
          </div>

          {/* Top Strength */}
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#F0FFF4', border: '1px solid #006840' }}>
            <h4 className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>
              ⭐ Top Strength
            </h4>
            <p className="text-xs font-medium">{tool.topStrength}</p>
          </div>

          {/* Best For */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>Best For</h4>
            <p className="text-xs">{tool.bestFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToolsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedFit, setSelectedFit] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<ToolData | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredTools = useMemo(() => {
    return toolsData.filter((t) => {
      if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
      if (selectedPlatform !== 'All' && t.adPlatforms[selectedPlatform as AdPlatform] === 'none') return false;
      if (selectedFit !== 'All' && t.b2bFit !== selectedFit && t.b2bFit !== 'All') return false;
      return true;
    });
  }, [selectedCategory, selectedPlatform, selectedFit]);

  const getDef = (key: string) => columnDefinitions.find((d) => d.key === key);

  return (
    <div>
      {/* Intro */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2" style={{ color: '#001109' }}>
          Audience Building Tools Matrix
        </h2>
        <p className="text-sm opacity-70">
          A researched comparison of {toolsData.length} B2B audience building tools — filterable by category, platform support, and company size. Click any row for full details.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1" style={{ color: '#006840' }}>Category</label>
          <select
            className="appearance-none border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1" style={{ color: '#006840' }}>Platform</label>
          <select
            className="appearance-none border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="All">All Platforms</option>
            {adPlatforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1" style={{ color: '#006840' }}>Company Size</label>
          <select
            className="appearance-none border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedFit}
            onChange={(e) => setSelectedFit(e.target.value)}
          >
            <option value="All">All Sizes</option>
            <option value="SMB">SMB</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div className="flex-1" />
        <div className="flex gap-1">
          <button
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${viewMode === 'table' ? '' : 'hover:bg-gray-100 bg-transparent'}`}
            style={viewMode === 'table' ? { backgroundColor: '#006840', color: '#fff', borderColor: '#006840' } : {}}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
          <button
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${viewMode === 'cards' ? '' : 'hover:bg-gray-100 bg-transparent'}`}
            style={viewMode === 'cards' ? { backgroundColor: '#006840', color: '#fff', borderColor: '#006840' } : {}}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
        </div>
      </div>

      <p className="text-[10px] mb-3 opacity-50">{filteredTools.length} tools shown</p>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#001109' }}>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-left px-3 py-2">
                  Tool
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-left px-3 py-2">
                  Category
                  <Tooltip def={getDef('category')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2" colSpan={6}>
                  Ad Platforms
                  <Tooltip def={getDef('adPlatforms')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Co. Lists
                  <Tooltip def={getDef('companyLists')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Contacts
                  <Tooltip def={getDef('contactLists')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Lookalikes
                  <Tooltip def={getDef('lookalikes')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Intent
                  <Tooltip def={getDef('intentSignals')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Sync
                  <Tooltip def={getDef('audienceSync')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Resolution
                  <Tooltip def={getDef('resolution')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Price
                  <Tooltip def={getDef('priceTier')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-left px-3 py-2">
                  Est. Range
                  <Tooltip def={getDef('priceRange')} />
                </th>
                <th className="text-white text-[10px] font-semibold uppercase tracking-wide text-center px-1 py-2">
                  Fit
                  <Tooltip def={getDef('b2bFit')} />
                </th>
              </tr>
              {/* Platform sub-headers */}
              <tr style={{ backgroundColor: '#00351F' }}>
                <th colSpan={2} className="px-3 py-1"></th>
                {adPlatforms.map((p) => (
                  <th key={p} className="text-center text-white text-[9px] font-medium px-1 py-1">{p}</th>
                ))}
                <th colSpan={9} className="px-1 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool, idx) => (
                <tr
                  key={tool.name}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#F8FFF5' }}
                  onClick={() => setSelectedTool(tool)}
                >
                  <td className="px-3 py-2">
                    <div className="font-semibold text-xs" style={{ color: '#001109' }}>{tool.name}</div>
                    <a
                      href={`https://${tool.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] hover:underline"
                      style={{ color: '#006840' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {tool.website}
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: categoryColors[tool.category] || '#006840' }}
                    >
                      {tool.category}
                    </span>
                  </td>
                  {adPlatforms.map((p) => (
                    <td key={p} className="text-center px-1 py-2">
                      <SupportBadge level={tool.adPlatforms[p]} />
                    </td>
                  ))}
                  <td className="text-center px-1 py-2"><SupportBadge level={tool.outputTypes.companyLists} /></td>
                  <td className="text-center px-1 py-2"><SupportBadge level={tool.outputTypes.contactLists} /></td>
                  <td className="text-center px-1 py-2"><SupportBadge level={tool.outputTypes.lookalikes} /></td>
                  <td className="text-center px-1 py-2"><SupportBadge level={tool.outputTypes.intentSignals} /></td>
                  <td className="text-center px-1 py-2"><SupportBadge level={tool.outputTypes.audienceSync} /></td>
                  <td className="text-center px-1 py-2">
                    <span className="text-[10px] font-medium">{tool.dataResolution}</span>
                  </td>
                  <td className="text-center px-1 py-2">
                    <span className="text-xs font-bold" style={{ color: '#006840' }}>{tool.priceTier}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-[10px] whitespace-nowrap">{tool.priceRange}</span>
                  </td>
                  <td className="text-center px-1 py-2">
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap"
                      style={{ backgroundColor: '#B6FFCE', color: '#00351F' }}
                    >
                      {tool.b2bFit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card View */
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredTools.map((tool) => {
            const catColor = categoryColors[tool.category] || '#006840';
            return (
              <div
                key={tool.name}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                style={{ borderColor: '#e5e7eb' }}
                onClick={() => setSelectedTool(tool)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: '#001109' }}>{tool.name}</h3>
                    <a
                      href={`https://${tool.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] hover:underline"
                      style={{ color: '#006840' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {tool.website} ↗
                    </a>
                  </div>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-semibold text-white flex-shrink-0"
                    style={{ backgroundColor: catColor }}
                  >
                    {tool.category}
                  </span>
                </div>

                <p className="text-[11px] opacity-70 mb-3 line-clamp-2">{tool.description}</p>

                {/* Platform dots */}
                <div className="flex gap-1.5 mb-3">
                  {adPlatforms.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: '#F8FFF5' }}
                    >
                      <SupportBadge level={tool.adPlatforms[p]} />
                      <span className="font-medium">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold" style={{ color: '#006840' }}>{tool.priceTier}</span>
                  <span className="text-[10px] opacity-60">{tool.priceRange}</span>
                  <span className="flex-1" />
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: '#B6FFCE', color: '#00351F' }}
                  >
                    {tool.b2bFit}
                  </span>
                  <span className="text-[10px] font-medium opacity-60">{tool.dataResolution}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 p-3 rounded-lg flex flex-wrap gap-4 text-[10px]" style={{ backgroundColor: '#F8FFF5', border: '1px solid #B6FFCE' }}>
        <span className="font-semibold" style={{ color: '#006840' }}>Legend:</span>
        <span>✅ Full native support</span>
        <span>⚠️ Partial / via export or partner</span>
        <span className="opacity-50">❌ Not supported</span>
        <span className="border-l pl-4" style={{ borderColor: '#B6FFCE' }}>
          <strong>Price:</strong> Free | $ &lt;$5K | $$ $5–25K | $$$ $25–75K | $$$$ $75K+
        </span>
      </div>

      {/* Detail Modal */}
      {selectedTool && <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
    </div>
  );
}
