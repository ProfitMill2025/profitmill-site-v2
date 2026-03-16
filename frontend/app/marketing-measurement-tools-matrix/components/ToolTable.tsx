'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, ExternalLink, MapPin, Calendar, X } from 'lucide-react';
import { Tool, DisplayCategory, PriceTier, SupportLevel } from '../types';
import { audienceColumnsByCategory, modelColumnsByCategory, formatPriceUSD } from '../utils/columns';
import { StatusDot, PriceTierBadge, PriceUSD, AudienceBadge, ModelChip, PriceBadge, ToolLink } from '../utils/design';

// ── Sort types ──
type SortColType = 'audience' | 'model' | 'tier' | 'price';

interface SortLevel {
  key: string;
  type: SortColType;
  dir: 'asc' | 'desc';
}

const tierOrder: Record<PriceTier, number> = { 'Free': 0, '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };

// Fixed column widths in px — ensures all groups align perfectly
const COL_W = { check: 36, name: 180, dot: 44, tier: 50, usd: 70, strength: 200 };

// For incrementality tab, compute model support dynamically
function getModelValue(tool: Tool, colKey: string, category: DisplayCategory): SupportLevel {
  if (category === 'incrementality') {
    if (colKey === 'has-mta') return tool.offersMTA ? 'full' : 'none';
    if (colKey === 'has-mmm') return tool.offersMMM ? 'full' : 'none';
    if (colKey === 'incr-type') return tool.hasIncrementality ? 'full' : 'none';
    if (colKey === 'scenario') return tool.modelSupport['scenario'] || 'none';
    if (colKey === 'geolift') return tool.modelSupport['geolift'] || 'none';
    return tool.modelSupport[colKey] || 'none';
  }
  return tool.modelSupport[colKey] || 'none';
}

function compareSingleLevel(a: Tool, b: Tool, level: SortLevel, category: DisplayCategory): number {
  const { key, type, dir } = level;
  let valA = 0;
  let valB = 0;

  if (type === 'audience') {
    valA = a.audienceTags.includes(key as any) ? 1 : 0;
    valB = b.audienceTags.includes(key as any) ? 1 : 0;
  } else if (type === 'model') {
    const sA = getModelValue(a, key, category);
    const sB = getModelValue(b, key, category);
    valA = sA === 'full' ? 2 : sA === 'partial' ? 1 : 0;
    valB = sB === 'full' ? 2 : sB === 'partial' ? 1 : 0;
  } else if (type === 'tier') {
    valA = tierOrder[a.priceTier] ?? 0;
    valB = tierOrder[b.priceTier] ?? 0;
  } else if (type === 'price') {
    valA = a.priceUSD ?? 999999;
    valB = b.priceUSD ?? 999999;
  }

  const diff = valA - valB;
  return dir === 'asc' ? diff : -diff;
}

function multiLevelSort(a: Tool, b: Tool, stack: SortLevel[], category: DisplayCategory): number {
  for (const level of stack) {
    const result = compareSingleLevel(a, b, level, category);
    if (result !== 0) return result;
  }
  return 0;
}

interface ToolTableProps {
  tools: Tool[];
  category: DisplayCategory;
  selectedTools: Set<string>;
  onToggleSelect: (name: string) => void;
}

export const ToolTable: React.FC<ToolTableProps> = ({ tools, category, selectedTools, onToggleSelect }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortStack, setSortStack] = useState<SortLevel[]>([]);

  const audienceCols = audienceColumnsByCategory[category];
  const modelCols = modelColumnsByCategory[category];
  const totalCols = 2 + audienceCols.length + modelCols.length + 3;

  const handleColumnSort = useCallback((key: string, type: SortColType) => {
    setSortStack((prev) => {
      const existingIdx = prev.findIndex((s) => s.key === key && s.type === type);
      if (existingIdx >= 0) {
        const updated = [...prev];
        const current = updated[existingIdx];
        updated[existingIdx] = { ...current, dir: current.dir === 'desc' ? 'asc' : 'desc' };
        return updated;
      }
      const defaultDir: 'asc' | 'desc' = (type === 'price' || type === 'tier') ? 'asc' : 'desc';
      return [...prev, { key, type, dir: defaultDir }];
    });
  }, []);

  const removeSortLevel = useCallback((idx: number) => {
    setSortStack((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clearSort = useCallback(() => setSortStack([]), []);

  const getSortInfo = useCallback((key: string, type: SortColType) => {
    const idx = sortStack.findIndex((s) => s.key === key && s.type === type);
    if (idx < 0) return null;
    return { rank: idx + 1, dir: sortStack[idx].dir };
  }, [sortStack]);

  const sortedTools = useMemo(() => {
    if (sortStack.length === 0) return tools;
    const sorted = [...tools];
    sorted.sort((a, b) => multiLevelSort(a, b, sortStack, category));
    return sorted;
  }, [tools, sortStack, category]);

  const grouped: Record<string, Tool[]> = useMemo(() => {
    if (sortStack.length > 0) return { '': sortedTools };
    if (category === 'mta' || category === 'mmm') {
      return sortedTools.reduce((acc: Record<string, Tool[]>, t: Tool) => {
        const key = t.subcategory || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
      }, {} as Record<string, Tool[]>);
    }
    if (category === 'incrementality') return { 'Incrementality Testing': sortedTools };
    return { 'Unified Measurement Platforms': sortedTools };
  }, [sortedTools, sortStack, category]);

  if (tools.length === 0) {
    return (
      <div className="text-center py-16" style={{ color: '#6a7282' }}>
        <div className="text-4xl mb-3 opacity-30">🔍</div>
        <p className="text-lg font-medium" style={{ fontFamily: "'Sora', sans-serif" }}>No tools match your filters</p>
        <p className="text-sm mt-1">Try broadening your search or removing filters</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Legend + Sort bar — stacked left-aligned */}
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-6 px-3 py-2 rounded-lg text-xs w-fit"
          style={{ background: '#F5F5F5', color: '#4a5565' }}
        >
          <span className="font-semibold uppercase tracking-wider" style={{ color: '#99a1af' }}>Legend:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#008751' }} /> Supported
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#FFBA0A' }} /> Partial
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#e5e7eb' }} /> N/A
          </span>
        </div>

        {sortStack.length > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit flex-wrap"
            style={{ background: '#F1FFF5', borderColor: 'rgba(0,104,64,0.15)' }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#008751' }}>Sort:</span>
            {sortStack.map((s, i) => {
              const label = s.type === 'audience'
                ? audienceCols.find((c) => c.key === s.key)?.short || s.key
                : s.type === 'model'
                  ? modelCols.find((c) => c.key === s.key)?.short || s.key
                  : s.type === 'tier' ? 'Tier' : 'USD';
              return (
                <span
                  key={`${s.type}-${s.key}`}
                  className="inline-flex items-center gap-0.5 pl-1.5 pr-0.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                  style={{ background: '#006840' }}
                >
                  {i + 1}. {label} {s.dir === 'asc' ? '↑' : '↓'}
                  <button
                    className="ml-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    onClick={() => removeSortLevel(i)}
                    title="Remove this sort"
                  >
                    <X size={8} />
                  </button>
                </span>
              );
            })}
            <button
              className="text-[10px] underline ml-1"
              style={{ color: '#006840' }}
              onClick={clearSort}
            >
              Clear all
            </button>
          </div>
        )}

        {sortStack.length === 0 && (
          <div className="text-[11px] px-1" style={{ color: '#99a1af' }}>
            Click column headers to sort · Click multiple to stack sorts
          </div>
        )}
      </div>

      {Object.entries(grouped).map(([groupName, groupTools]) => (
        <div key={groupName || 'sorted'} className="pm-group-card">
          {groupName && (
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,53,31,0.06)' }}>
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4a5565', fontFamily: "'Sora', sans-serif" }}>
                {groupName}
              </h3>
              <span
                className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: '#E3FFEB', color: '#006840' }}
              >
                {groupTools.length}
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table style={{ tableLayout: 'fixed', width: `${COL_W.check + COL_W.name + audienceCols.length * COL_W.dot + modelCols.length * COL_W.dot + COL_W.tier + COL_W.usd + COL_W.strength}px`, borderCollapse: 'collapse' }}>
              <colgroup>
                <col style={{ width: `${COL_W.check}px` }} />
                <col style={{ width: `${COL_W.name}px` }} />
                {audienceCols.map((c) => <col key={`ac-${c.key}`} style={{ width: `${COL_W.dot}px` }} />)}
                {modelCols.map((c) => <col key={`mc-${c.key}`} style={{ width: `${COL_W.dot}px` }} />)}
                <col style={{ width: `${COL_W.tier}px` }} />
                <col style={{ width: `${COL_W.usd}px` }} />
                <col style={{ width: `${COL_W.strength}px` }} />
              </colgroup>
              <thead>
                {/* Column Group Headers */}
                <tr style={{ borderBottom: '1px solid rgba(0,53,31,0.06)' }}>
                  <th className="sticky-col bg-white" colSpan={2} style={{ padding: '4px 6px' }}></th>
                  <th
                    colSpan={audienceCols.length}
                    className="text-center text-[10px] font-bold uppercase tracking-widest py-1.5"
                    style={{ background: '#F1FFF5', color: '#006840', borderLeft: '1px solid rgba(0,53,31,0.06)', borderRight: '1px solid rgba(0,53,31,0.06)', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}
                  >
                    Audience
                  </th>
                  <th
                    colSpan={modelCols.length}
                    className="text-center text-[10px] font-bold uppercase tracking-widest py-1.5"
                    style={{ background: 'rgba(0,104,64,0.03)', color: '#00351F', borderRight: '1px solid rgba(0,53,31,0.06)', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}
                  >
                    Models
                  </th>
                  <th
                    colSpan={2}
                    className="text-center text-[10px] font-bold uppercase tracking-widest py-1.5"
                    style={{ background: 'rgba(255,186,10,0.06)', color: '#e6a609', borderRight: '1px solid rgba(0,53,31,0.06)', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}
                  >
                    Price
                  </th>
                  <th className="bg-white" style={{ padding: '4px 6px' }}></th>
                </tr>

                {/* Individual Column Headers */}
                <tr style={{ borderBottom: '1px solid rgba(0,53,31,0.1)' }}>
                  <th className="sticky-col bg-white px-2" style={{ padding: '4px 6px' }}></th>
                  <th className="sticky-col-name bg-white text-xs font-semibold" style={{ color: '#4a5565', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}>Tool</th>

                  {audienceCols.map((col) => {
                    const sortInfo = getSortInfo(col.key, 'audience');
                    return (
                      <th
                        key={col.key}
                        className="text-center px-0.5 cursor-pointer select-none transition-colors group/col"
                        style={{ background: sortInfo ? 'rgba(0,104,64,0.08)' : '#F1FFF5', padding: '4px 6px' }}
                        onClick={() => handleColumnSort(col.key, 'audience')}
                      >
                        <div className="flex flex-col items-center gap-0.5 relative">
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: col.color }} />
                          <span className="text-[10px] font-medium" style={{ color: '#6a7282' }}>{col.short}</span>
                          {sortInfo && <SortIndicator rank={sortInfo.rank} dir={sortInfo.dir} />}
                          <Tooltip text={col.label} />
                        </div>
                      </th>
                    );
                  })}

                  {modelCols.map((col) => {
                    const sortInfo = getSortInfo(col.key, 'model');
                    return (
                      <th
                        key={col.key}
                        className="text-center px-0.5 cursor-pointer select-none transition-colors group/col"
                        style={{ background: sortInfo ? 'rgba(0,104,64,0.08)' : 'rgba(0,104,64,0.03)', padding: '4px 6px' }}
                        onClick={() => handleColumnSort(col.key, 'model')}
                      >
                        <div className="flex flex-col items-center gap-0.5 relative">
                          <span className="text-[10px] font-medium" style={{ color: '#6a7282' }}>{col.short}</span>
                          {sortInfo && <SortIndicator rank={sortInfo.rank} dir={sortInfo.dir} />}
                          <Tooltip text={col.label} />
                        </div>
                      </th>
                    );
                  })}

                  <th
                    className="text-center px-0.5 cursor-pointer select-none transition-colors group/col"
                    style={{ background: getSortInfo('tier', 'tier') ? 'rgba(0,104,64,0.08)' : 'rgba(255,186,10,0.06)', padding: '4px 6px' }}
                    onClick={() => handleColumnSort('tier', 'tier')}
                  >
                    <div className="flex flex-col items-center gap-0.5 relative">
                      <span className="text-[10px] font-medium" style={{ color: '#6a7282' }}>Tier</span>
                      {getSortInfo('tier', 'tier') && (
                        <SortIndicator rank={getSortInfo('tier', 'tier')!.rank} dir={getSortInfo('tier', 'tier')!.dir} />
                      )}
                      <Tooltip text="Price Tier" />
                    </div>
                  </th>

                  <th
                    className="text-center px-0.5 cursor-pointer select-none transition-colors group/col"
                    style={{ background: getSortInfo('price', 'price') ? 'rgba(0,104,64,0.08)' : 'rgba(255,186,10,0.06)', padding: '4px 6px' }}
                    onClick={() => handleColumnSort('price', 'price')}
                  >
                    <div className="flex flex-col items-center gap-0.5 relative">
                      <span className="text-[10px] font-medium" style={{ color: '#6a7282' }}>USD/yr</span>
                      {getSortInfo('price', 'price') && (
                        <SortIndicator rank={getSortInfo('price', 'price')!.rank} dir={getSortInfo('price', 'price')!.dir} />
                      )}
                      <Tooltip text="Annual Price in USD" />
                    </div>
                  </th>

                  <th className="text-xs font-semibold bg-white" style={{ color: '#4a5565', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}>
                    Top Strength
                  </th>
                </tr>
              </thead>

              <tbody>
                {groupTools.map((tool) => {
                  const isExpanded = expandedRow === tool.name;
                  const isSelected = selectedTools.has(tool.name);

                  return (
                    <React.Fragment key={tool.name}>
                      <tr
                        className="cursor-pointer transition-colors"
                        style={{
                          borderBottom: '1px solid rgba(0,53,31,0.05)',
                          background: isSelected ? 'rgba(0,104,64,0.04)' : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'rgba(0,104,64,0.02)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'transparent';
                        }}
                        onClick={() => setExpandedRow(isExpanded ? null : tool.name)}
                      >
                        <td className="sticky-col bg-inherit px-2" style={{ padding: '4px 6px' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => { e.stopPropagation(); onToggleSelect(tool.name); }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ borderColor: '#006840', width: '14px', height: '14px', accentColor: '#006840', cursor: 'pointer' }}
                          />
                        </td>

                        <td className="sticky-col-name bg-inherit overflow-hidden" style={{ padding: '4px 6px' }}>
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="font-bold text-sm truncate" style={{ color: '#001109' }}>
                              {tool.name}
                              {tool.deprecated && <span className="ml-1 text-[9px] font-normal px-1 py-0.5 rounded bg-red-100 text-red-600">DEPRECATED</span>}
                            </span>
                            {isExpanded
                              ? <ChevronUp size={12} className="shrink-0" style={{ color: '#99a1af' }} />
                              : <ChevronDown size={12} className="shrink-0" style={{ color: '#99a1af' }} />
                            }
                          </div>
                        </td>

                        {audienceCols.map((col) => (
                          <td key={col.key} className="text-center px-1" style={{ padding: '4px 6px' }}>
                            <StatusDot
                              status={tool.audienceTags.includes(col.key as any) ? 'full' : 'none'}
                              size="sm"
                            />
                          </td>
                        ))}

                        {modelCols.map((col) => (
                          <td key={col.key} className="text-center px-1" style={{ padding: '4px 6px' }}>
                            <StatusDot
                              status={getModelValue(tool, col.key, category)}
                              size="sm"
                            />
                          </td>
                        ))}

                        <td className="text-center px-1" style={{ padding: '4px 6px' }}>
                          <PriceTierBadge tier={tool.priceTier} />
                        </td>

                        <td className="text-center px-1" style={{ padding: '4px 6px' }}>
                          <PriceUSD usd={tool.priceUSD} tier={tool.priceTier} />
                        </td>

                        <td className="overflow-hidden" style={{ padding: '4px 6px' }}>
                          <div className="text-xs truncate" style={{ color: '#4a5565' }}>
                            {tool.strengths[0]}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Detail Row */}
                      {isExpanded && (
                        <tr style={{ background: '#F5F5F5' }}>
                          <td colSpan={totalCols} className="p-0" style={{ padding: 0 }}>
                            <div className="px-6 py-5">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <DetailSection title="Website">
                                  <ToolLink url={tool.url} />
                                </DetailSection>

                                <DetailSection title="Founded">
                                  <div className="flex items-center gap-1.5 text-sm" style={{ color: '#001109' }}>
                                    <Calendar size={13} style={{ color: '#008751' }} />
                                    {tool.founded || 'Unknown'}
                                  </div>
                                </DetailSection>

                                <DetailSection title="Headquarters">
                                  <div className="flex items-center gap-1.5 text-sm" style={{ color: '#001109' }}>
                                    <MapPin size={13} style={{ color: '#008751' }} />
                                    {tool.hq || 'Unknown'}
                                  </div>
                                </DetailSection>

                                <DetailSection title="Best For">
                                  <p className="text-sm" style={{ color: '#001109' }}>{tool.bestFor}</p>
                                </DetailSection>

                                <DetailSection title="Pricing">
                                  <PriceBadge tier={tool.priceTier} label={tool.priceLabel} size="sm" />
                                </DetailSection>

                                <DetailSection title="Audience">
                                  <div className="flex flex-wrap gap-1.5">
                                    {tool.audienceTags.map((tag) => (
                                      <AudienceBadge key={tag} tag={tag} size="sm" />
                                    ))}
                                  </div>
                                </DetailSection>

                                <DetailSection title="Attribution Models">
                                  <div className="flex flex-wrap gap-1.5">
                                    {tool.models.map((mod) => (
                                      <ModelChip key={mod} model={mod} />
                                    ))}
                                  </div>
                                </DetailSection>

                                {(category === 'both' || category === 'incrementality') && tool.mtaDetail && (
                                  <DetailSection title="MTA Capability" accentColor="#006840">
                                    <p className="text-sm">{tool.mtaDetail}</p>
                                  </DetailSection>
                                )}
                                {(category === 'both' || category === 'incrementality') && tool.mmmDetail && (
                                  <DetailSection title="MMM Capability" accentColor="#008751">
                                    <p className="text-sm">{tool.mmmDetail}</p>
                                  </DetailSection>
                                )}

                                <div className="md:col-span-3">
                                  <DetailSection title="Notable Strengths">
                                    <div className="flex flex-wrap gap-2">
                                      {tool.strengths.map((s) => (
                                        <span
                                          key={s}
                                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border"
                                          style={{ background: 'white', borderColor: 'rgba(0,53,31,0.08)', color: '#001109' }}
                                        >
                                          <span style={{ color: '#008751' }}>✦</span> {s}
                                        </span>
                                      ))}
                                    </div>
                                  </DetailSection>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Instant Tooltip (no delay, appears on hover immediately) ──
const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50 text-[10px] font-normal hidden group-hover/col:block"
    style={{ background: '#1f2937', color: '#ffffff' }}
  >
    {text}
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
      style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid #1f2937' }}
    />
  </div>
);

// ── Sort Indicator ──
const SortIndicator: React.FC<{ rank: number; dir: 'asc' | 'desc' }> = ({ rank, dir }) => (
  <div className="flex items-center gap-0 mt-0.5">
    <span
      className="text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none text-white"
      style={{ background: '#006840' }}
    >
      {rank}
    </span>
    {dir === 'asc'
      ? <ArrowUp size={8} style={{ color: '#006840' }} />
      : <ArrowDown size={8} style={{ color: '#006840' }} />
    }
  </div>
);

// ── Detail Section helper ──
const DetailSection: React.FC<{
  title: string;
  accentColor?: string;
  children: React.ReactNode;
}> = ({ title, accentColor, children }) => (
  <div>
    <div
      className="text-xs font-bold uppercase tracking-wider mb-2"
      style={{ color: accentColor || '#6a7282', fontFamily: "'Sora', sans-serif" }}
    >
      {title}
    </div>
    {children}
  </div>
);


