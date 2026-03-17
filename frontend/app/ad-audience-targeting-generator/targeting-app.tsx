'use client';

import React, { useState, useCallback } from 'react';
import { Recommendation, RecommendationResult, TooltipData, SelectedCell } from './types';
import { platforms } from './data/platforms';
import { features, categories } from './data/features';
import { Matrix } from './components/Matrix';
import { Tooltip } from './components/Tooltip';
import { CategoryFilter } from './components/CategoryFilter';
import { RecommendationPanel } from './components/RecommendationPanel';
import { FunnelLegend } from './components/FunnelLegend';

export default function TargetingApp() {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(categories),
  );
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [summary, setSummary] = useState('');
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);

  const handleToggleCategory = useCallback((cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setActiveCategories(new Set(categories));
  }, []);

  const handleTooltipShow = useCallback((data: TooltipData) => {
    setTooltipData(data);
  }, []);

  const handleTooltipHide = useCallback(() => {
    setTooltipData(null);
  }, []);

  const handleRecommendations = useCallback((result: RecommendationResult) => {
    setRecommendations(result.recommendations);
    setSummary(result.summary);
  }, []);

  const handleClearRecs = useCallback(() => {
    setRecommendations([]);
    setSummary('');
  }, []);

  const handleCellClick = useCallback((cell: SelectedCell | null) => {
    setSelectedCell(cell);
  }, []);

  return (
    <>
      <div
        className="flex flex-col gap-4 px-6 pb-12"
        style={{ maxWidth: '1440px', margin: '0 auto', fontFamily: "'Sora', sans-serif" }}
      >
        {/* Header */}
        <div className="mb-1">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: '#006840', fontFamily: "'Sora', sans-serif" }}
          >
            Ad Audience Targeting Generator
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(0,17,9,0.4)' }}>
            Compare targeting capabilities across Google Ads, LinkedIn, Reddit, Meta &amp; X
          </p>
        </div>

        {/* AI Recommender */}
        <RecommendationPanel
          recommendations={recommendations}
          summary={summary}
          onRecommendations={handleRecommendations}
          onClear={handleClearRecs}
        />

        {/* Category Filters */}
        <CategoryFilter
          categories={categories}
          activeCategories={activeCategories}
          onToggle={handleToggleCategory}
          onSelectAll={handleSelectAll}
        />

        {/* Legend */}
        <FunnelLegend showFunnel={recommendations.length > 0} />

        {/* Matrix */}
        <Matrix
          features={features}
          platforms={platforms}
          categories={categories}
          activeCategories={activeCategories}
          recommendations={recommendations}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          onTooltipShow={handleTooltipShow}
          onTooltipHide={handleTooltipHide}
        />

        {/* Tooltip portal */}
        <Tooltip data={tooltipData} />
      </div>

      {/* Inline styles (matching the pattern from the existing matrix-app.tsx) */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Profit Mill Targeting Matrix Styles ──────────────────────── */

        /* Smooth transitions for matrix cells */
        .ad-audience-targeting-generator td {
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }

        /* Sticky column background */
        th.sticky,
        td.sticky {
          z-index: 10;
        }

        /* Table header sticky */
        table th {
          position: sticky;
          top: 0;
          z-index: 20;
          background-color: #FFFFFF;
        }

        table td:first-child,
        table th:first-child {
          z-index: 10;
        }

        table th:first-child {
          z-index: 30;
        }

        /* Accordion animation */
        .detail-accordion {
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            max-height: 600px;
            transform: translateY(0);
          }
        }

        /* Selected cell pulse */
        .cell-selected {
          animation: selectPulse 0.3s ease-out;
        }

        @keyframes selectPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        /* Tooltip smooth appear */
        .tooltip-card {
          animation: tooltipFade 0.15s ease-out;
        }

        @keyframes tooltipFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Category row styling */
        .category-row td {
          background-color: #F5F9F7;
          border-bottom: 2px solid #006840;
        }

        /* Hover row highlight */
        .feature-row:hover {
          background-color: #F5F9F7;
        }

        /* Custom scrollbar styling */
        .ad-audience-targeting-generator ::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .ad-audience-targeting-generator ::-webkit-scrollbar-track {
          background: #F5F9F7;
          border-radius: 3px;
        }

        .ad-audience-targeting-generator ::-webkit-scrollbar-thumb {
          background: #B6FFCE;
          border-radius: 3px;
        }

        .ad-audience-targeting-generator ::-webkit-scrollbar-thumb:hover {
          background: #006840;
        }

        /* Input focus state */
        .ad-audience-targeting-generator input:focus,
        .ad-audience-targeting-generator textarea:focus {
          outline: none;
          border-color: #006840 !important;
          box-shadow: 0 0 0 2px rgba(0, 104, 64, 0.15) !important;
        }
      `}} />
    </>
  );
}
