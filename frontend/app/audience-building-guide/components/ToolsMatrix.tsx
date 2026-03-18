'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
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

/* ── Flat SVG support icons ── */
function SupportBadge({ level }: { level: SupportLevel }) {
  if (level === 'full')
    return (
      <span title="Full support" className="inline-flex items-center justify-center w-4 h-4">
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
          <circle cx="8" cy="8" r="7" fill="#006840" />
          <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    );
  if (level === 'partial')
    return (
      <span title="Partial / via export" className="inline-flex items-center justify-center w-4 h-4">
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
          <circle cx="8" cy="8" r="7" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="5" y1="8" x2="11" y2="8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  return (
    <span title="Not supported" className="inline-flex items-center justify-center w-4 h-4">
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
        <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ── Floating tooltip (renders outside overflow container) ── */
function FloatingTooltip({
  text,
  anchor,
  onClose,
}: {
  text: string;
  anchor: { x: number; y: number };
  onClose: () => void;
}) {
  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{ left: anchor.x, top: anchor.y + 8 }}
    >
      <div
        className="bg-gray-800 text-white text-[11px] leading-relaxed px-3 py-2 rounded-lg shadow-lg max-w-[280px]"
        style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
      >
        {text}
      </div>
    </div>
  );
}

function InfoIcon({
  def,
  onShowTooltip,
  onHideTooltip,
}: {
  def: ColumnDef | undefined;
  onShowTooltip: (text: string, e: React.MouseEvent) => void;
  onHideTooltip: () => void;
}) {
  if (!def) return null;
  return (
    <span
      className="inline-flex items-center ml-1 cursor-help"
      onMouseEnter={(e) => onShowTooltip(def.definition, e)}
      onMouseLeave={onHideTooltip}
    >
      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
}

/* ── Sort helpers ── */
type SortKey =
  | 'name'
  | 'category'
  | 'companyLists'
  | 'contactLists'
  | 'lookalikes'
  | 'intentSignals'
  | 'audienceSync'
  | 'resolution'
  | 'priceTier'
  | 'priceRange'
  | 'b2bFit'
  | AdPlatform;

const supportOrder: Record<SupportLevel, number> = { full: 3, partial: 2, none: 1 };
const priceOrder: Record<string, number> = { Free: 0, $: 1, $$: 2, $$$: 3, $$$$: 4 };
const fitOrder: Record<string, number> = { SMB: 1, 'Mid-Market': 2, Enterprise: 3, All: 4 };

function parsePriceLow(range: string): number {
  const m = range.match(/\$([\d,]+)/);
  if (!m) return 0;
  return parseInt(m[1].replace(/,/g, ''), 10);
}

function SortArrow({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) {
  if (!active) {
    return (
      <svg className="w-2.5 h-2.5 inline ml-0.5 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return direction === 'asc' ? (
    <svg className="w-2.5 h-2.5 inline ml-0.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-2.5 h-2.5 inline ml-0.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ToolDetailModal({ tool, onClose }: { tool: ToolData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                  {tool.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                  {tool.b2bFit}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
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
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm leading-relaxed text-gray-600">{tool.description}</p>

          {/* Ad Platforms */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wide mb-2 text-gray-500">
              Ad Platform Support
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {adPlatforms.map((p) => (
                <div key={p} className="flex items-center gap-1.5 text-xs p-1.5 rounded bg-gray-50">
                  <SupportBadge level={tool.adPlatforms[p]} />
                  <span className="font-medium text-gray-700">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output Capabilities */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wide mb-2 text-gray-500">
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
                  <div key={key} className="flex items-center gap-1.5 text-xs p-1.5 rounded bg-gray-50">
                    <SupportBadge level={tool.outputTypes[key]} />
                    <span className="font-medium text-gray-700">{labels[key]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-[10px] font-semibold uppercase tracking-wide mb-0.5 text-gray-500">Resolution</div>
              <div className="text-sm font-bold text-gray-900">{tool.dataResolution}</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-[10px] font-semibold uppercase tracking-wide mb-0.5 text-gray-500">Price Tier</div>
              <div className="text-sm font-bold text-gray-900">{tool.priceTier}</div>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-[10px] font-semibold uppercase tracking-wide mb-0.5 text-gray-500">Estimated Price Range</div>
              <div className="text-sm font-bold text-gray-900">{tool.priceRange}</div>
            </div>
          </div>

          {/* Data Source */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wide mb-1 text-gray-500">Data Source</h4>
            <p className="text-xs text-gray-600">{tool.dataSource}</p>
          </div>

          {/* Top Strength */}
          <div className="p-3 rounded-lg border" style={{ backgroundColor: '#f0faf5', borderColor: '#d1e7dd' }}>
            <h4 className="text-[10px] font-semibold uppercase tracking-wide mb-1 flex items-center gap-1.5" style={{ color: '#006840' }}>
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
                <path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8 3.8 14l.8-4.7L1.2 6l4.7-.7z" fill="#006840" />
              </svg>
              Top Strength
            </h4>
            <p className="text-xs font-medium text-gray-700">{tool.topStrength}</p>
          </div>

          {/* Best For */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wide mb-1 text-gray-500">Best For</h4>
            <p className="text-xs text-gray-600">{tool.bestFor}</p>
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
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const showTooltip = useCallback((text: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ text, x: rect.left, y: rect.bottom });
  }, []);

  const hideTooltip = useCallback(() => setTooltip(null), []);

  const filteredAndSortedTools = useMemo(() => {
    let list = toolsData.filter((t) => {
      if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
      if (selectedPlatform !== 'All' && t.adPlatforms[selectedPlatform as AdPlatform] === 'none') return false;
      if (selectedFit !== 'All' && t.b2bFit !== selectedFit && t.b2bFit !== 'All') return false;
      return true;
    });

    if (sortKey) {
      list = [...list].sort((a, b) => {
        let cmp = 0;
        switch (sortKey) {
          case 'name':
            cmp = a.name.localeCompare(b.name);
            break;
          case 'category':
            cmp = a.category.localeCompare(b.category);
            break;
          case 'resolution':
            cmp = a.dataResolution.localeCompare(b.dataResolution);
            break;
          case 'priceTier':
            cmp = (priceOrder[a.priceTier] ?? 99) - (priceOrder[b.priceTier] ?? 99);
            break;
          case 'priceRange':
            cmp = parsePriceLow(a.priceRange) - parsePriceLow(b.priceRange);
            break;
          case 'b2bFit':
            cmp = (fitOrder[a.b2bFit] ?? 0) - (fitOrder[b.b2bFit] ?? 0);
            break;
          case 'companyLists':
          case 'contactLists':
          case 'lookalikes':
          case 'intentSignals':
          case 'audienceSync':
            cmp = (supportOrder[a.outputTypes[sortKey]] ?? 0) - (supportOrder[b.outputTypes[sortKey]] ?? 0);
            break;
          default:
            if (adPlatforms.includes(sortKey as AdPlatform)) {
              cmp =
                (supportOrder[a.adPlatforms[sortKey as AdPlatform]] ?? 0) -
                (supportOrder[b.adPlatforms[sortKey as AdPlatform]] ?? 0);
            }
            break;
        }
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return list;
  }, [selectedCategory, selectedPlatform, selectedFit, sortKey, sortDir]);

  const getDef = (key: string) => columnDefinitions.find((d) => d.key === key);

  /* Softer header style */
  const thBase = 'text-[10px] font-semibold uppercase tracking-wide select-none cursor-pointer transition-colors';
  const thStyle = { color: '#fff' };

  return (
    <div className="relative">
      {/* Floating tooltip portal */}
      {tooltip && <FloatingTooltip text={tooltip.text} anchor={{ x: tooltip.x, y: tooltip.y }} onClose={hideTooltip} />}

      {/* Intro */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2" style={{ color: '#006840' }}>
          Audience Building Tools Matrix
        </h2>
        <p className="text-sm" style={{ color: 'rgba(0,17,9,0.4)' }}>
          A researched comparison of {toolsData.length} B2B audience building tools — filterable by category, platform support, and company size. Click any column header to sort. Click any row for full details.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1 text-gray-500">Category</label>
          <select
            className="appearance-none border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
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
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1 text-gray-500">Platform</label>
          <select
            className="appearance-none border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
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
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1 text-gray-500">Company Size</label>
          <select
            className="appearance-none border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
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
        {sortKey && (
          <button
            onClick={() => { setSortKey(null); setSortDir('asc'); }}
            className="px-2.5 py-1 rounded-lg text-[10px] font-medium hover:bg-gray-100 text-gray-500"
          >
            Clear sort
          </button>
        )}
        <div className="flex gap-1">
          <button
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${viewMode === 'table' ? 'text-white' : 'hover:bg-gray-100 text-gray-500'}`}
            style={viewMode === 'table' ? { backgroundColor: '#006840' } : {}}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
          <button
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${viewMode === 'cards' ? 'text-white' : 'hover:bg-gray-100 text-gray-500'}`}
            style={viewMode === 'cards' ? { backgroundColor: '#006840' } : {}}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
        </div>
      </div>

      <p className="text-[10px] mb-3 text-gray-400">{filteredAndSortedTools.length} tools shown</p>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              {/* Main header row — ProfitMill green */}
              <tr style={{ backgroundColor: '#006840' }}>
                <th className={`${thBase} text-left px-3 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('name')}>
                  Tool <SortArrow active={sortKey === 'name'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-left px-3 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('category')}>
                  <span className="inline-flex items-center">
                    Cat.
                    <InfoIcon def={getDef('category')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'category'} direction={sortDir} />
                </th>
                {adPlatforms.map((p) => (
                  <th
                    key={p}
                    className={`${thBase} text-center px-1 py-2.5 hover:bg-white/10`}
                    style={thStyle}
                    onClick={() => toggleSort(p)}
                  >
                    <span className="inline-flex items-center">
                      {p}
                    </span>
                    <SortArrow active={sortKey === p} direction={sortDir} />
                  </th>
                ))}
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('companyLists')}>
                  <span className="inline-flex items-center">
                    Co.
                    <InfoIcon def={getDef('companyLists')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'companyLists'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('contactLists')}>
                  <span className="inline-flex items-center">
                    Con.
                    <InfoIcon def={getDef('contactLists')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'contactLists'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('lookalikes')}>
                  <span className="inline-flex items-center">
                    LA
                    <InfoIcon def={getDef('lookalikes')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'lookalikes'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('intentSignals')}>
                  <span className="inline-flex items-center">
                    Int.
                    <InfoIcon def={getDef('intentSignals')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'intentSignals'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('audienceSync')}>
                  <span className="inline-flex items-center">
                    Sync
                    <InfoIcon def={getDef('audienceSync')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'audienceSync'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('resolution')}>
                  <span className="inline-flex items-center">
                    Res.
                    <InfoIcon def={getDef('resolution')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'resolution'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('priceTier')}>
                  <span className="inline-flex items-center">
                    Price
                    <InfoIcon def={getDef('priceTier')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'priceTier'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-left px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('priceRange')}>
                  <span className="inline-flex items-center">
                    Est.
                    <InfoIcon def={getDef('priceRange')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'priceRange'} direction={sortDir} />
                </th>
                <th className={`${thBase} text-center px-2 py-2.5 hover:bg-white/10`} style={thStyle} onClick={() => toggleSort('b2bFit')}>
                  <span className="inline-flex items-center">
                    Fit
                    <InfoIcon def={getDef('b2bFit')} onShowTooltip={showTooltip} onHideTooltip={hideTooltip} />
                  </span>
                  <SortArrow active={sortKey === 'b2bFit'} direction={sortDir} />
                </th>
              </tr>

            </thead>
            <tbody>
              {filteredAndSortedTools.map((tool, idx) => (
                <tr
                  key={tool.name}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#FAFAFA' }}
                  onClick={() => setSelectedTool(tool)}
                >
                  <td className="px-3 py-2">
                    <div className="font-semibold text-xs text-gray-900">{tool.name}</div>
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
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap bg-gray-100 text-gray-600">
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
                    <span className="text-[10px] font-medium text-gray-600">{tool.dataResolution}</span>
                  </td>
                  <td className="text-center px-1 py-2">
                    <span className="text-xs font-bold text-gray-700">{tool.priceTier}</span>
                  </td>
                  <td className="px-2 py-2">
                    <span className="text-[10px] whitespace-nowrap text-gray-500">{tool.priceRange}</span>
                  </td>
                  <td className="text-center px-1 py-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap bg-gray-100 text-gray-600">
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
          {filteredAndSortedTools.map((tool) => (
            <div
              key={tool.name}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
              onClick={() => setSelectedTool(tool)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{tool.name}</h3>
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
                <span className="text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 bg-gray-100 text-gray-600">
                  {tool.category}
                </span>
              </div>

              <p className="text-[11px] text-gray-500 mb-3 line-clamp-2">{tool.description}</p>

              {/* Platform dots */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {adPlatforms.map((p) => (
                  <div key={p} className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded bg-gray-50">
                    <SupportBadge level={tool.adPlatforms[p]} />
                    <span className="font-medium text-gray-600">{p}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-gray-700">{tool.priceTier}</span>
                <span className="text-[10px] text-gray-400">{tool.priceRange}</span>
                <span className="flex-1" />
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                  {tool.b2bFit}
                </span>
                <span className="text-[10px] font-medium text-gray-400">{tool.dataResolution}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 p-3 rounded-lg flex flex-wrap gap-4 items-center text-[10px] bg-gray-50 border border-gray-200">
        <span className="font-semibold text-gray-500">Legend:</span>
        <span className="inline-flex items-center gap-1 text-gray-600">
          <svg viewBox="0 0 16 16" className="w-3 h-3"><circle cx="8" cy="8" r="7" fill="#006840" /><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          Full native support
        </span>
        <span className="inline-flex items-center gap-1 text-gray-600">
          <svg viewBox="0 0 16 16" className="w-3 h-3"><circle cx="8" cy="8" r="7" fill="none" stroke="#9CA3AF" strokeWidth="1.5" /><line x1="5" y1="8" x2="11" y2="8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" /></svg>
          Partial / via export
        </span>
        <span className="inline-flex items-center gap-1 text-gray-400">
          <svg viewBox="0 0 16 16" className="w-3 h-3"><circle cx="8" cy="8" r="7" fill="none" stroke="#E5E7EB" strokeWidth="1.5" /><line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" /><line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" /></svg>
          Not supported
        </span>
        <span className="border-l border-gray-300 pl-4 text-gray-500">
          <strong>Price:</strong> Free | $ &lt;$5K | $$ $5–25K | $$$ $25–75K | $$$$ $75K+
        </span>
      </div>

      {/* Detail Modal */}
      {selectedTool && <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
    </div>
  );
}
