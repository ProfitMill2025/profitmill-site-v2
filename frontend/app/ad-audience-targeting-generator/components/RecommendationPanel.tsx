'use client';

import React, { useState } from 'react';
import { Sparkles, Globe, FileText, Users, ChevronDown, ChevronUp, X, Plus, Minus, Loader2 } from 'lucide-react';
import { Recommendation, RecommendationResult } from '../types';
import { generateRecommendations, scrapeWebsite } from '../utils/recommendation-engine';

interface RecommendationPanelProps {
  recommendations: Recommendation[];
  summary: string;
  onRecommendations: (result: RecommendationResult) => void;
  onClear: () => void;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  recommendations,
  summary,
  onRecommendations,
  onClear,
}) => {
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [competitors, setCompetitors] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [error, setError] = useState('');

  const addCompetitor = () => {
    if (competitors.length < 5) {
      setCompetitors([...competitors, '']);
    }
  };

  const removeCompetitor = (index: number) => {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((_, i) => i !== index));
    } else {
      setCompetitors(['']);
    }
  };

  const updateCompetitor = (index: number, value: string) => {
    const updated = [...competitors];
    updated[index] = value;
    setCompetitors(updated);
  };

  const handleGenerate = async () => {
    if (!website.trim() && !description.trim()) {
      setError('Please enter a website URL or business description.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      let scrapedText = '';
      const competitorTexts: string[] = [];

      // Try to scrape the main website
      if (website.trim()) {
        try {
          let url = website.trim();
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          scrapedText = (await scrapeWebsite(url)).slice(0, 3000);
        } catch {
          // Fine, continue without scraped text
        }
      }

      // Try to scrape competitor websites
      const validCompetitors = competitors.filter((c) => c.trim());
      for (const comp of validCompetitors) {
        try {
          let url = comp.trim();
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          const text = await scrapeWebsite(url);
          if (text) {
            competitorTexts.push(text.slice(0, 2000));
          }
        } catch {
          // Fine, skip this competitor
        }
      }

      const result = generateRecommendations(
        website,
        description,
        scrapedText,
        validCompetitors,
        competitorTexts,
      );
      onRecommendations(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const hasRecs = recommendations.length > 0;

  return (
    <div className="rounded-lg shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0EBE5' }}>
      <div className="p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-2 text-left"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#006840' }}>
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: '#00351F' }}>Targeting Recommender</span>
            {expanded ? <ChevronUp size={14} style={{ color: '#006840' }} /> : <ChevronDown size={14} style={{ color: '#006840' }} />}
          </button>
          {hasRecs && (
            <button
              className="inline-flex items-center gap-1 text-xs transition-colors hover:opacity-80"
              style={{ color: 'rgba(0,17,9,0.5)' }}
              onClick={onClear}
            >
              <X size={12} /> Clear results
            </button>
          )}
        </div>

        {expanded && (
          <>
            <p className="text-xs" style={{ color: 'rgba(0,17,9,0.5)' }}>
              Enter your website, competitors, and a business description to get personalized targeting recommendations with funnel stage mapping.
            </p>

            {/* Input form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Your website */}
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: '#00351F' }}>Your Website</label>
                <div className="flex items-center gap-2 rounded-md px-3 py-2 transition-all" style={{ border: '1px solid #E0EBE5', backgroundColor: '#FFFFFF' }}>
                  <Globe size={14} className="flex-shrink-0" style={{ color: 'rgba(0,104,64,0.4)' }} />
                  <input
                    type="text"
                    className="grow text-sm border-none outline-none bg-transparent"
                    placeholder="e.g., profitmill.io"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                </div>
              </div>

              {/* Business description */}
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: '#00351F' }}>Business Description</label>
                <div className="flex items-center gap-2 rounded-md px-3 py-2 transition-all" style={{ border: '1px solid #E0EBE5', backgroundColor: '#FFFFFF' }}>
                  <FileText size={14} className="flex-shrink-0" style={{ color: 'rgba(0,104,64,0.4)' }} />
                  <input
                    type="text"
                    className="grow text-sm border-none outline-none bg-transparent"
                    placeholder="e.g., B2B SaaS marketing agency"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                </div>
              </div>
            </div>

            {/* Competitors */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: '#00351F' }}>
                  <Users size={12} style={{ color: '#006840' }} /> Competitors
                </label>
                {competitors.length < 5 && (
                  <button
                    className="font-semibold flex items-center gap-0.5 transition-colors hover:opacity-80"
                    style={{ fontSize: '10px', color: '#006840' }}
                    onClick={addCompetitor}
                  >
                    <Plus size={10} /> Add competitor
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {competitors.map((comp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all flex-1 min-w-[180px]"
                    style={{ border: '1px solid #E0EBE5', backgroundColor: '#FFFFFF' }}
                  >
                    <Globe size={12} className="flex-shrink-0" style={{ color: 'rgba(0,104,64,0.3)' }} />
                    <input
                      type="text"
                      className="grow text-sm border-none outline-none bg-transparent min-w-0"
                      placeholder={`Competitor ${i + 1} URL`}
                      value={comp}
                      onChange={(e) => updateCompetitor(i, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                      className="flex-shrink-0 transition-colors hover:text-red-500"
                      style={{ color: 'rgba(0,17,9,0.3)' }}
                      onClick={() => removeCompetitor(i)}
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate button + Powered by Tasklet */}
            <div className="flex flex-col">
              <button
                className={`self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-all ${
                  loading
                    ? 'cursor-not-allowed'
                    : 'hover:opacity-90 active:scale-[0.98]'
                }`}
                style={{
                  backgroundColor: loading ? 'rgba(0,104,64,0.5)' : '#006840',
                  color: '#FFFFFF',
                }}
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} /> Generate Recommendations
                  </>
                )}
              </button>
              <a
                href="https://tasklet.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs mt-2"
                style={{ color: '#6a7282' }}
              >
                <span>AI recommendations powered by</span>
                <span className="font-semibold" style={{ color: '#006840' }}>Tasklet</span>
              </a>
            </div>

            {error && (
              <div className="text-xs rounded-md px-3 py-2" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C' }}>
                {error}
              </div>
            )}

            {/* Summary */}
            {hasRecs && summary && (
              <div className="rounded-lg px-4 py-3" style={{ backgroundColor: '#F5F9F7', border: '1px solid #E0EBE5' }}>
                <p className="font-bold text-xs mb-1" style={{ color: '#006840' }}>📊 Strategy Summary</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,17,9,0.7)' }}>{summary}</p>
              </div>
            )}

            {/* Quick stats */}
            {hasRecs && (
              <div className="flex gap-5 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
                  <span className="font-bold" style={{ color: '#3B82F6' }}>{recommendations.filter((r) => r.funnelStage === 'top').length}</span>
                  <span style={{ color: 'rgba(0,17,9,0.5)' }}>top-of-funnel</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FFBA0A' }} />
                  <span className="font-bold" style={{ color: '#7A5D00' }}>{recommendations.filter((r) => r.funnelStage === 'middle').length}</span>
                  <span style={{ color: 'rgba(0,17,9,0.5)' }}>mid-funnel</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#006840' }} />
                  <span className="font-bold" style={{ color: '#006840' }}>{recommendations.filter((r) => r.funnelStage === 'bottom').length}</span>
                  <span style={{ color: 'rgba(0,17,9,0.5)' }}>bottom-funnel</span>
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
