'use client';

import React from 'react';
import {
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle,
  X,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { TargetingFeature, Platform, Recommendation, FunnelStage } from '../types';
import { getFeatureDetail } from '../data/feature-details';

const funnelLabel: Record<FunnelStage, string> = {
  top: '🔵 Top of Funnel — Awareness',
  middle: '🟡 Mid Funnel — Consideration',
  bottom: '🟢 Bottom of Funnel — Conversion',
};

const funnelColor: Record<FunnelStage, string> = {
  top: 'bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6]',
  middle: 'bg-[#FFBA0A]/10 border-[#FFBA0A] text-[#7A5D00]',
  bottom: 'bg-[#006840]/10 border-[#006840] text-[#006840]',
};

interface DetailPanelProps {
  feature: TargetingFeature;
  platformId: string;
  platforms: Platform[];
  recommendation?: Recommendation;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  feature,
  platformId,
  platforms,
  recommendation,
  onClose,
}) => {
  const platform = platforms.find((p) => p.id === platformId);
  const pd = feature.platforms[platformId];
  if (!pd || !platform) return null;

  const detail = getFeatureDetail(feature.id, platformId);
  const avail = pd.availability;

  return (
    <div className="p-5" style={{ borderTop: '2px solid rgba(0,104,64,0.2)' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base font-bold" style={{ color: '#00351F' }}>
              {platform.name} — {feature.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  avail === 'full'
                    ? 'bg-[#006840]/10 text-[#006840]'
                    : avail === 'limited'
                      ? 'bg-[#FFBA0A]/15 text-[#7A5D00]'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {avail === 'full' ? (
                  <><CheckCircle size={12} /> Full Support</>
                ) : avail === 'limited' ? (
                  <><AlertCircle size={12} /> Limited</>
                ) : (
                  <><XCircle size={12} /> Not Available</>
                )}
              </span>
            </div>
          </div>
        </div>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      {/* Funnel recommendation if present */}
      {recommendation && (
        <div className={`border rounded-lg px-4 py-3 mb-4 ${funnelColor[recommendation.funnelStage]}`}>
          <p className="text-xs font-bold mb-1">{funnelLabel[recommendation.funnelStage]}</p>
          <p className="text-xs opacity-80">{recommendation.reasoning}</p>
        </div>
      )}

      {/* Description */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Info size={14} style={{ color: '#006840' }} />
          <h4 className="text-sm font-semibold" style={{ color: '#00351F' }}>Overview</h4>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,17,9,0.7)' }}>
          {pd.description}
        </p>
      </div>

      {/* Detailed description from feature-details */}
      {detail?.detailedDescription && (
        <div className="mb-4 rounded-lg p-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0EBE5' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: '#00351F' }}>Detailed Breakdown</h4>
          <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(0,17,9,0.7)' }}>
            {detail.detailedDescription}
          </div>
        </div>
      )}

      {/* Limited explanation */}
      {avail === 'limited' && detail?.limitedExplanation && (
        <div className="mb-4 rounded-lg p-4" style={{ backgroundColor: 'rgba(255,186,10,0.06)', border: '1px solid rgba(255,186,10,0.3)' }}>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle size={14} style={{ color: '#FFBA0A' }} />
            <h4 className="text-sm font-semibold" style={{ color: '#7A5D00' }}>Why is this marked &quot;Limited&quot;?</h4>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(0,17,9,0.7)' }}>
            {detail.limitedExplanation}
          </div>
        </div>
      )}

      {/* Documentation link */}
      <a
        href={pd.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
        style={{ color: '#006840' }}
      >
        View Official Documentation <ExternalLink size={14} />
      </a>
    </div>
  );
};
