'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategories: Set<string>;
  onToggle: (category: string) => void;
  onSelectAll: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategories,
  onToggle,
  onSelectAll,
}) => {
  const allActive = activeCategories.size === categories.length;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        className="text-xs font-semibold px-3 py-1.5 rounded-md transition-all"
        style={{
          backgroundColor: allActive ? '#006840' : '#FFFFFF',
          color: allActive ? '#FFFFFF' : '#006840',
          border: allActive ? '1px solid #006840' : '1px solid #E0EBE5',
        }}
        onClick={onSelectAll}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className="text-xs font-medium px-3 py-1.5 rounded-md transition-all"
          style={{
            backgroundColor: activeCategories.has(cat) ? '#006840' : '#FFFFFF',
            color: activeCategories.has(cat) ? '#FFFFFF' : 'rgba(0,17,9,0.6)',
            border: activeCategories.has(cat) ? '1px solid #006840' : '1px solid #E0EBE5',
          }}
          onClick={() => onToggle(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
