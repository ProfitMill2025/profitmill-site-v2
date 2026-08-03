'use client';

import React from 'react';
import { Crosshair, BarChart3, Layers, FlaskConical } from 'lucide-react';
import { Tool, DisplayCategory } from '../types';

interface StatsBarProps {
  allTools: Tool[];
  activeCategory: DisplayCategory;
  onCategoryChange: (cat: DisplayCategory) => void;
}

const categories: { key: DisplayCategory; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'mta', label: 'MTA', icon: <Crosshair size={18} />, desc: 'Multi-Touch Attribution' },
  { key: 'mmm', label: 'MMM', icon: <BarChart3 size={18} />, desc: 'Marketing Mix Modeling' },
  { key: 'both', label: 'MTA + MMM', icon: <Layers size={18} />, desc: 'Unified Measurement' },
  { key: 'incrementality', label: 'Incrementality', icon: <FlaskConical size={18} />, desc: 'Incrementality Testing' },
];

export const StatsBar: React.FC<StatsBarProps> = ({ allTools, activeCategory, onCategoryChange }) => {
  const getCount = (cat: DisplayCategory) => {
    if (cat === 'incrementality') return allTools.filter((t) => t.hasIncrementality).length;
    return allTools.filter((t) => t.category === cat).length;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map(({ key, label, icon, desc }) => {
        const count = getCount(key);
        const isActive = activeCategory === key;
        return (
          <button
            key={key}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all"
            style={{
              background: isActive ? '#006840' : '#ffffff',
              borderColor: isActive ? '#006840' : 'rgba(0,53,31,0.1)',
              color: isActive ? '#ffffff' : '#001109',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#006840';
                e.currentTarget.style.background = '#F1FFF5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'rgba(0,53,31,0.1)';
                e.currentTarget.style.background = '#ffffff';
              }
            }}
            onClick={() => onCategoryChange(key)}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: isActive ? 'rgba(255,255,255,0.15)' : '#E3FFEB',
                color: isActive ? '#ffffff' : '#006840',
              }}
            >
              {icon}
            </div>
            <div>
              <div className="text-2xl font-bold leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>{count}</div>
              <div className="text-xs font-medium mt-0.5" style={{ opacity: 0.7 }}>{label}</div>
              <div className="text-[10px]" style={{ opacity: 0.5 }}>{desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
