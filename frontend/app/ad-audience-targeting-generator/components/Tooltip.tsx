'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { TooltipData, FunnelStage } from '../types';

interface TooltipProps {
  data: TooltipData | null;
}

const funnelLabel: Record<FunnelStage, string> = {
  top: 'Top of Funnel',
  middle: 'Mid Funnel',
  bottom: 'Bottom of Funnel',
};

const funnelBadge: Record<FunnelStage, string> = {
  top: 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30',
  middle: 'bg-[#FFBA0A]/15 text-[#7A5D00] border-[#FFBA0A]/30',
  bottom: 'bg-[#006840]/15 text-[#006840] border-[#006840]/30',
};

export const Tooltip: React.FC<TooltipProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  useEffect(() => {
    if (!data || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = data.x + 14;
    let top = data.y + 14;

    if (left + rect.width > vw - 8) left = data.x - rect.width - 14;
    if (top + rect.height > vh - 8) top = data.y - rect.height - 14;
    if (left < 8) left = 8;
    if (top < 8) top = 8;

    setPos({ left, top });
  }, [data]);

  if (!data) return null;

  const { platformData, featureName, platformName, recommendation } = data;
  const avail = platformData.availability;

  return (
    <div
      ref={ref}
      className="tooltip-card fixed z-50 w-72 shadow-lg rounded-lg pointer-events-none"
      style={{ left: pos.left, top: pos.top, backgroundColor: '#FFFFFF', border: '1px solid #E0EBE5' }}
    >
      <div className="p-3 gap-1.5 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs" style={{ color: '#00351F' }}>{platformName}</span>
          <span
            className={`inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-full ${
              avail === 'full'
                ? 'bg-[#006840]/10 text-[#006840]'
                : avail === 'limited'
                  ? 'bg-[#FFBA0A]/15 text-[#7A5D00]'
                  : 'bg-red-50 text-red-600'
            }`}
            style={{ fontSize: '10px' }}
          >
            {avail === 'full' ? (
              <><CheckCircle size={10} /> Available</>
            ) : avail === 'limited' ? (
              <><AlertCircle size={10} /> Limited</>
            ) : (
              <><XCircle size={10} /> Not Available</>
            )}
          </span>
        </div>

        <p className="font-semibold" style={{ fontSize: '11px', color: '#006840' }}>{featureName}</p>

        <p className="leading-relaxed" style={{ fontSize: '11px', color: 'rgba(0,17,9,0.6)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {platformData.description}
        </p>

        {recommendation && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`font-semibold px-1.5 py-0.5 rounded-full border ${funnelBadge[recommendation.funnelStage]}`} style={{ fontSize: '10px' }}>
              {funnelLabel[recommendation.funnelStage]}
            </span>
          </div>
        )}

        <p style={{ fontSize: '10px', color: 'rgba(0,104,64,0.5)', marginTop: '2px' }}>Click to expand details</p>
      </div>
    </div>
  );
};
