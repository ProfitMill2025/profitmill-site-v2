'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SupportLevel, PriceTier, AudienceTag } from '../types';

// ── Category tokens ──
export const categoryTokens = {
  mta: { bg: '#E3FFEB', border: '#006840', text: '#006840' },
  mmm: { bg: '#FFF3E0', border: '#e16b4c', text: '#e16b4c' },
  both: { bg: '#E0F0FF', border: '#0066cc', text: '#0066cc' },
  incrementality: { bg: '#FDF2F8', border: '#9333ea', text: '#9333ea' },
};

// ── Price tier config ──
export const priceTierConfig: Record<PriceTier, { bg: string; text: string; border: string }> = {
  'Free': { bg: '#E3FFEB', text: '#006840', border: '#006840' },
  '$': { bg: '#E3FFEB', text: '#008751', border: '#008751' },
  '$$': { bg: '#E0F0FF', text: '#0066cc', border: '#0066cc' },
  '$$$': { bg: 'rgba(255,186,10,0.1)', text: '#c88800', border: '#FFBA0A' },
  '$$$$': { bg: '#FEE2E2', text: '#dc2626', border: '#dc2626' },
};

// ── Audience config ──
const audienceConfig: Record<string, { color: string }> = {
  'B2B / Lead Gen': { color: '#006840' },
  'E-commerce / DTC': { color: '#e16b4c' },
  'Enterprise': { color: '#6b21a8' },
  'SaaS': { color: '#0e7490' },
  'SMB': { color: '#059669' },
  'Privacy-First': { color: '#1e40af' },
  'Mobile': { color: '#dc2626' },
  'Shopify': { color: '#5e8e3e' },
  'Adobe Ecosystem': { color: '#cc0000' },
  'CPG / Retail': { color: '#d97706' },
  'Data Science Team': { color: '#7c3aed' },
  'Performance Marketing': { color: '#0284c7' },
  'Multi-National': { color: '#4f46e5' },
};

// ── Status Dot (green = full, amber = partial, gray = N/A) ──
export const StatusDot: React.FC<{
  status: SupportLevel;
  size?: 'sm' | 'md';
}> = ({ status, size = 'sm' }) => {
  const s = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const color =
    status === 'full' ? '#008751' :
    status === 'partial' ? '#FFBA0A' :
    '#e5e7eb';

  return (
    <span
      className={`${s} rounded-full inline-block`}
      style={{ background: color }}
    />
  );
};

// ── Price Tier Badge ──
export const PriceTierBadge: React.FC<{ tier: PriceTier }> = ({ tier }) => {
  const cfg = priceTierConfig[tier];
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
    >
      {tier}
    </span>
  );
};

// ── Price USD display ──
export const PriceUSD: React.FC<{ usd: number | null; tier: PriceTier }> = ({ usd, tier }) => {
  const cfg = priceTierConfig[tier];
  if (usd === null) return <span className="text-[11px] font-medium" style={{ color: '#99a1af' }}>Custom</span>;
  if (usd === 0) return <span className="text-[11px] font-bold" style={{ color: cfg.text }}>Free</span>;
  const formatted = usd >= 1000 ? `$${Math.round(usd / 1000)}K` : `$${usd}`;
  return <span className="text-[11px] font-bold" style={{ color: cfg.text }}>{formatted}</span>;
};

// ── Audience Badge ──
export const AudienceBadge: React.FC<{ tag: AudienceTag; size?: 'sm' | 'md' }> = ({ tag, size = 'sm' }) => {
  const cfg = audienceConfig[tag] || { color: '#6a7282' };
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${textSize} font-medium`}
      style={{ background: `${cfg.color}10`, color: cfg.color, border: `1px solid ${cfg.color}30` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {tag}
    </span>
  );
};

// ── Model Chip ──
export const ModelChip: React.FC<{ model: string }> = ({ model }) => (
  <span
    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border"
    style={{ borderColor: 'rgba(0,53,31,0.1)', color: '#001109', background: 'white' }}
  >
    {model}
  </span>
);

// ── Price Badge (for detail panel) ──
export const PriceBadge: React.FC<{ tier: PriceTier; label: string; size?: 'sm' | 'md' }> = ({ tier, label, size = 'sm' }) => {
  const cfg = priceTierConfig[tier];
  return (
    <div className="flex items-center gap-2">
      <PriceTierBadge tier={tier} />
      <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium`} style={{ color: '#001109' }}>
        {label}
      </span>
    </div>
  );
};

// ── Tool Link ──
export const ToolLink: React.FC<{ url: string }> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
    style={{ color: '#006840' }}
  >
    {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
    <ExternalLink size={12} />
  </a>
);
