'use client';

import React, { useMemo } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TargetingFeature, TooltipData, Recommendation, FunnelStage, SelectedCell } from '../types';
import { Platform } from '../types';
import { DetailPanel } from './DetailPanel';

interface MatrixProps {
  features: TargetingFeature[];
  platforms: Platform[];
  categories: string[];
  activeCategories: Set<string>;
  recommendations: Recommendation[];
  selectedCell: SelectedCell | null;
  onCellClick: (cell: SelectedCell | null) => void;
  onTooltipShow: (data: TooltipData) => void;
  onTooltipHide: () => void;
}

const funnelBorder: Record<FunnelStage, string> = {
  top: 'ring-2 ring-[#3B82F6] bg-[#3B82F6]/10',
  middle: 'ring-2 ring-[#FFBA0A] bg-[#FFBA0A]/10',
  bottom: 'ring-2 ring-[#006840] bg-[#006840]/10',
};

export const Matrix: React.FC<MatrixProps> = ({
  features,
  platforms,
  categories,
  activeCategories,
  recommendations,
  selectedCell,
  onCellClick,
  onTooltipShow,
  onTooltipHide,
}) => {
  const recMap = useMemo(() => {
    const m = new Map<string, Recommendation>();
    for (const r of recommendations) {
      m.set(`${r.featureId}__${r.platformId}`, r);
    }
    return m;
  }, [recommendations]);

  const filteredCategories = categories.filter((c) => activeCategories.has(c));

  const handleMouseEnter = (
    e: React.MouseEvent,
    feature: TargetingFeature,
    platform: Platform,
  ) => {
    const pd = feature.platforms[platform.id];
    if (!pd) return;
    const rec = recMap.get(`${feature.id}__${platform.id}`);
    onTooltipShow({
      platformData: pd,
      featureName: feature.name,
      platformName: platform.name,
      recommendation: rec,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCellClick = (featureId: string, platformId: string) => {
    if (selectedCell && selectedCell.featureId === featureId && selectedCell.platformId === platformId) {
      onCellClick(null);
    } else {
      onCellClick({ featureId, platformId });
    }
  };

  const isSelected = (featureId: string, platformId: string) =>
    selectedCell?.featureId === featureId && selectedCell?.platformId === platformId;

  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid #E0EBE5' }}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ borderBottom: '2px solid #006840' }}>
            <th
              className="sticky left-0 z-10 min-w-[220px] text-left px-4 py-3 uppercase tracking-wider text-xs font-semibold"
              style={{ backgroundColor: '#FFFFFF', color: '#00351F' }}
            >
              Targeting Feature
            </th>
            {platforms.map((p) => (
              <th key={p.id} className="text-center min-w-[120px] px-3 py-3" style={{ backgroundColor: '#FFFFFF' }}>
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#00351F' }}>{p.shortName}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((cat) => {
            const catFeatures = features.filter((f) => f.category === cat);
            return (
              <React.Fragment key={cat}>
                <tr className="category-row">
                  <td
                    colSpan={platforms.length + 1}
                    className="font-bold text-xs uppercase tracking-wider py-2.5 px-4 sticky left-0"
                    style={{ color: '#006840', backgroundColor: '#F5F9F7', borderBottom: '2px solid rgba(0,104,64,0.2)' }}
                  >
                    {cat}
                  </td>
                </tr>
                {catFeatures.map((feature) => (
                  <React.Fragment key={feature.id}>
                    <tr className="feature-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td
                        className="sticky left-0 z-10 text-sm font-medium pr-4 px-4 py-2.5"
                        style={{ backgroundColor: '#FFFFFF', color: '#001109' }}
                      >
                        {feature.name}
                      </td>
                      {platforms.map((platform) => {
                        const pd = feature.platforms[platform.id];
                        if (!pd) return <td key={platform.id} />;
                        const rec = recMap.get(`${feature.id}__${platform.id}`);
                        const avail = pd.availability;
                        const cellSelected = isSelected(feature.id, platform.id);
                        return (
                          <td
                            key={platform.id}
                            className={`text-center cursor-pointer transition-all duration-200 ${
                              rec ? funnelBorder[rec.funnelStage] + ' rounded-lg' : ''
                            } ${
                              cellSelected
                                ? 'bg-[#B6FFCE]/30 ring-2 ring-[#006840] rounded-lg cell-selected'
                                : ''
                            }`}
                            style={{ padding: '8px 12px' }}
                            onMouseEnter={(e) => handleMouseEnter(e, feature, platform)}
                            onMouseMove={(e) => handleMouseEnter(e, feature, platform)}
                            onMouseLeave={onTooltipHide}
                            onClick={() => handleCellClick(feature.id, platform.id)}
                          >
                            {avail === 'full' ? (
                              <CheckCircle size={18} className="inline-block" style={{ color: '#006840' }} />
                            ) : avail === 'limited' ? (
                              <AlertCircle size={18} className="inline-block" style={{ color: '#FFBA0A' }} />
                            ) : (
                              <XCircle size={18} className="inline-block" style={{ color: 'rgba(0,17,9,0.15)' }} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    {/* Accordion detail panel */}
                    {selectedCell && selectedCell.featureId === feature.id && (
                      <tr className="detail-accordion">
                        <td colSpan={platforms.length + 1} className="p-0" style={{ backgroundColor: '#F5F9F7' }}>
                          <DetailPanel
                            feature={feature}
                            platformId={selectedCell.platformId}
                            platforms={platforms}
                            recommendation={recMap.get(`${feature.id}__${selectedCell.platformId}`)}
                            onClose={() => onCellClick(null)}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
