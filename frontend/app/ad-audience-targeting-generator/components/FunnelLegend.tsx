'use client';

import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface FunnelLegendProps {
  showFunnel: boolean;
}

export const FunnelLegend: React.FC<FunnelLegendProps> = ({ showFunnel }) => {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs items-center" style={{ color: 'rgba(0,17,9,0.6)' }}>
      <span className="flex items-center gap-1.5">
        <CheckCircle size={14} style={{ color: '#006840' }} /> Full Support
      </span>
      <span className="flex items-center gap-1.5">
        <AlertCircle size={14} style={{ color: '#FFBA0A' }} /> Limited
      </span>
      <span className="flex items-center gap-1.5">
        <XCircle size={14} style={{ color: 'rgba(0,17,9,0.15)' }} /> Not Available
      </span>

      {showFunnel && (
        <>
          <span className="h-4" style={{ borderLeft: '1px solid #E0EBE5' }} />
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm ring-2 ring-[#3B82F6] bg-[#3B82F6]/15" /> Top of Funnel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm ring-2 ring-[#FFBA0A] bg-[#FFBA0A]/15" /> Mid Funnel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm ring-2 ring-[#006840] bg-[#006840]/15" /> Bottom of Funnel
          </span>
        </>
      )}

      <span className="ml-auto" style={{ color: 'rgba(0,17,9,0.3)', fontSize: '10px' }}>Click any cell for detailed breakdown</span>
    </div>
  );
};
