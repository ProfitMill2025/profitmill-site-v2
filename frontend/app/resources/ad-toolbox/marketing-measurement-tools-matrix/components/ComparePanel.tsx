'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Tool, DisplayCategory, SupportLevel } from '../types';
import { audienceColumnsByCategory, modelColumnsByCategory, formatPriceUSD } from '../utils/columns';
import { StatusDot, PriceTierBadge } from '../utils/design';

interface ComparePanelProps {
  tools: Tool[];
  category: DisplayCategory;
  onRemove: (name: string) => void;
  onClose: () => void;
}

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

export const ComparePanel: React.FC<ComparePanelProps> = ({ tools, category, onRemove, onClose }) => {
  const audienceCols = audienceColumnsByCategory[category];
  const modelCols = modelColumnsByCategory[category];

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(0,53,31,0.1)', background: '#ffffff' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#006840' }}>
        <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Comparing {tools.length} Tools</h3>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,53,31,0.08)' }}>
              <th className="min-w-[160px] text-xs" style={{ color: '#4a5565', background: '#F5F5F5', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}>Dimension</th>
              {tools.map((t) => (
                <th key={t.name} className="text-center min-w-[100px]" style={{ background: '#F5F5F5', padding: '4px 6px' }}>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold" style={{ color: '#001109' }}>{t.name}</span>
                    <button
                      className="text-[10px] underline"
                      style={{ color: '#006840' }}
                      onClick={() => onRemove(t.name)}
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price row */}
            <tr style={{ borderBottom: '1px solid rgba(0,53,31,0.05)' }}>
              <td className="text-xs font-semibold" style={{ color: '#4a5565', padding: '4px 6px' }}>Price Tier</td>
              {tools.map((t) => (
                <td key={t.name} className="text-center" style={{ padding: '4px 6px' }}><PriceTierBadge tier={t.priceTier} /></td>
              ))}
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(0,53,31,0.05)' }}>
              <td className="text-xs font-semibold" style={{ color: '#4a5565', padding: '4px 6px' }}>USD/yr</td>
              {tools.map((t) => (
                <td key={t.name} className="text-center text-xs font-medium" style={{ color: '#4a5565', padding: '4px 6px' }}>
                  {formatPriceUSD(t.priceUSD)}
                </td>
              ))}
            </tr>

            {/* Section: Audience */}
            <tr>
              <td colSpan={tools.length + 1} className="text-[10px] font-bold uppercase tracking-widest py-1.5" style={{ background: '#F1FFF5', color: '#006840', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}>
                Audience
              </td>
            </tr>
            {audienceCols.map((col) => (
              <tr key={col.key} style={{ borderBottom: '1px solid rgba(0,53,31,0.03)' }}>
                <td className="text-xs" style={{ color: '#4a5565', padding: '4px 6px' }}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                    {col.label}
                  </span>
                </td>
                {tools.map((t) => (
                  <td key={t.name} className="text-center" style={{ padding: '4px 6px' }}>
                    <StatusDot status={t.audienceTags.includes(col.key as any) ? 'full' : 'none'} size="sm" />
                  </td>
                ))}
              </tr>
            ))}

            {/* Section: Models */}
            <tr>
              <td colSpan={tools.length + 1} className="text-[10px] font-bold uppercase tracking-widest py-1.5" style={{ background: 'rgba(0,104,64,0.03)', color: '#00351F', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}>
                Models
              </td>
            </tr>
            {modelCols.map((col) => (
              <tr key={col.key} style={{ borderBottom: '1px solid rgba(0,53,31,0.03)' }}>
                <td className="text-xs" style={{ color: '#4a5565', padding: '4px 6px' }}>{col.label}</td>
                {tools.map((t) => (
                  <td key={t.name} className="text-center" style={{ padding: '4px 6px' }}>
                    <StatusDot status={getModelValue(t, col.key, category)} size="sm" />
                  </td>
                ))}
              </tr>
            ))}

            {/* Section: Strengths */}
            <tr>
              <td colSpan={tools.length + 1} className="text-[10px] font-bold uppercase tracking-widest py-1.5" style={{ background: '#F5F5F5', color: '#4a5565', fontFamily: "'Sora', sans-serif", padding: '4px 6px' }}>
                Top Strengths
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 6px' }}></td>
              {tools.map((t) => (
                <td key={t.name} className="text-xs align-top p-2" style={{ color: '#001109', padding: '4px 6px' }}>
                  <ul className="list-disc pl-3 space-y-0.5">
                    {t.strengths.slice(0, 3).map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
