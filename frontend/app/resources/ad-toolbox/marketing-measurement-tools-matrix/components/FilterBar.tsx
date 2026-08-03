'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { AudienceTag, PriceTier } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedAudience: AudienceTag | 'All';
  onAudienceChange: (a: AudienceTag | 'All') => void;
  selectedPrice: PriceTier | 'All';
  onPriceChange: (p: PriceTier | 'All') => void;
  audienceOptions: (AudienceTag | 'All')[];
  resultCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedAudience,
  onAudienceChange,
  selectedPrice,
  onPriceChange,
  audienceOptions,
  resultCount,
}) => {
  const priceOptions: (PriceTier | 'All')[] = ['All', 'Free', '$', '$$', '$$$', '$$$$'];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#99a1af' }} />
        <input
          type="text"
          placeholder="Search tools, models, strengths..."
          className="w-full pl-9 pr-3 text-sm rounded-lg"
          style={{
            background: '#F5F5F5',
            border: '1px solid rgba(0,53,31,0.08)',
            color: '#001109',
            outline: 'none',
            boxShadow: 'none',
            fontSize: '14px',
            height: '32px',
            padding: '6px 12px 6px 36px',
          }}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={(e) => { e.target.style.borderColor = '#006840'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(0,53,31,0.08)'; }}
        />
      </div>

      {/* Audience Filter */}
      <div className="flex items-center gap-1.5">
        <SlidersHorizontal size={13} style={{ color: '#006840' }} />
        <select
          className="text-xs rounded-lg font-medium"
          style={{
            background: selectedAudience !== 'All' ? '#E3FFEB' : '#F5F5F5',
            border: '1px solid rgba(0,53,31,0.08)',
            color: selectedAudience !== 'All' ? '#006840' : '#4a5565',
            outline: 'none',
            boxShadow: 'none',
            height: '32px',
            padding: '4px 8px',
            appearance: 'auto' as const,
          }}
          value={selectedAudience}
          onChange={(e) => onAudienceChange(e.target.value as AudienceTag | 'All')}
        >
          {audienceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt === 'All' ? 'All Audiences' : opt}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <select
        className="text-xs rounded-lg font-medium"
        style={{
          background: selectedPrice !== 'All' ? 'rgba(255,186,10,0.1)' : '#F5F5F5',
          border: '1px solid rgba(0,53,31,0.08)',
          color: selectedPrice !== 'All' ? '#e6a609' : '#4a5565',
          outline: 'none',
          boxShadow: 'none',
          height: '32px',
          padding: '4px 8px',
          appearance: 'auto' as const,
        }}
        value={selectedPrice}
        onChange={(e) => onPriceChange(e.target.value as PriceTier | 'All')}
      >
        {priceOptions.map((opt) => (
          <option key={opt} value={opt}>{opt === 'All' ? 'All Prices' : opt}</option>
        ))}
      </select>

      {/* Result Count */}
      <span
        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
        style={{ background: '#E3FFEB', color: '#006840' }}
      >
        {resultCount} tools
      </span>
    </div>
  );
};
