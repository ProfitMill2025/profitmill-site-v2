import { DisplayCategory } from '../types';

export interface ColumnDef {
  key: string;
  short: string;
  label: string;
  color?: string;
}

// ── Universal audience columns — identical across ALL tabs for alignment ──
export const universalAudienceCols: ColumnDef[] = [
  { key: 'B2B / Lead Gen', short: 'B2B', label: 'B2B / Lead Generation', color: '#006840' },
  { key: 'E-commerce / DTC', short: 'DTC', label: 'E-commerce / Direct-to-Consumer', color: '#e16b4c' },
  { key: 'Enterprise', short: 'Ent', label: 'Enterprise', color: '#6b21a8' },
  { key: 'SaaS', short: 'SaaS', label: 'Software as a Service', color: '#0e7490' },
  { key: 'SMB', short: 'SMB', label: 'Small & Medium Business', color: '#059669' },
  { key: 'Privacy-First', short: 'Priv', label: 'Privacy-First / Cookieless', color: '#1e40af' },
  { key: 'Mobile', short: 'Mob', label: 'Mobile App', color: '#dc2626' },
  { key: 'Shopify', short: 'Shop', label: 'Shopify Ecosystem', color: '#5e8e3e' },
  { key: 'Adobe Ecosystem', short: 'Adobe', label: 'Adobe Ecosystem', color: '#cc0000' },
  { key: 'CPG / Retail', short: 'CPG', label: 'Consumer Packaged Goods / Retail', color: '#d97706' },
  { key: 'Data Science Team', short: 'DS', label: 'Data Science Team Required', color: '#7c3aed' },
  { key: 'Performance Marketing', short: 'Perf', label: 'Performance Marketing', color: '#0284c7' },
  { key: 'Multi-National', short: 'Intl', label: 'Multi-National / Global', color: '#4f46e5' },
];

// ── MTA model columns ──
const mtaModelCols: ColumnDef[] = [
  { key: 'first-touch', short: 'First', label: 'First-Touch Attribution' },
  { key: 'last-touch', short: 'Last', label: 'Last-Touch Attribution' },
  { key: 'linear', short: 'Lin', label: 'Linear Attribution' },
  { key: 'time-decay', short: 'TD', label: 'Time-Decay Attribution' },
  { key: 'position', short: 'Pos', label: 'Position-Based (U/W-Shaped)' },
  { key: 'full-path', short: 'Full', label: 'Full-Path Attribution' },
  { key: 'custom-algo', short: 'Algo', label: 'Custom / Algorithmic' },
  { key: 'data-driven', short: 'ML', label: 'Data-Driven / Machine Learning' },
  { key: 'account-level', short: 'Acct', label: 'Account-Level Attribution (B2B)' },
];

// ── MMM model columns ──
const mmmModelCols: ColumnDef[] = [
  { key: 'bayesian', short: 'Bayes', label: 'Bayesian Modeling' },
  { key: 'econometric', short: 'Econ', label: 'Econometric / Regression' },
  { key: 'ai-ml', short: 'AI/ML', label: 'AI / Machine Learning' },
  { key: 'scenario', short: 'Plan', label: 'Scenario Planning / Budget Optimization' },
  { key: 'geolift', short: 'Geo', label: 'Geo-Lift / Geo-Level Testing' },
];

// ── Unified MTA+MMM model columns ──
const bothModelCols: ColumnDef[] = [
  { key: 'mta-suite', short: 'MTA', label: 'Multi-Touch Attribution Suite' },
  { key: 'mmm-suite', short: 'MMM', label: 'Marketing Mix Modeling Suite' },
  { key: 'incrementality', short: 'Incr', label: 'Incrementality Testing' },
  { key: 'scenario', short: 'Plan', label: 'Scenario Planning / Budget Optimization' },
];

// ── Incrementality tab model columns ──
const incrModelCols: ColumnDef[] = [
  { key: 'has-mta', short: 'MTA', label: 'Offers Multi-Touch Attribution' },
  { key: 'has-mmm', short: 'MMM', label: 'Offers Marketing Mix Modeling' },
  { key: 'incr-type', short: 'Incr', label: 'Incrementality Testing' },
  { key: 'scenario', short: 'Plan', label: 'Scenario Planning' },
  { key: 'geolift', short: 'Geo', label: 'Geo-Lift / Geo Experiments' },
];

export const audienceColumnsByCategory: Record<DisplayCategory, ColumnDef[]> = {
  mta: universalAudienceCols,
  mmm: universalAudienceCols,
  both: universalAudienceCols,
  incrementality: universalAudienceCols,
};

export const modelColumnsByCategory: Record<DisplayCategory, ColumnDef[]> = {
  mta: mtaModelCols,
  mmm: mmmModelCols,
  both: bothModelCols,
  incrementality: incrModelCols,
};

export const formatPriceUSD = (usd: number | null): string => {
  if (usd === null) return 'Custom';
  if (usd === 0) return 'Free';
  if (usd >= 1000) return `$${Math.round(usd / 1000)}K`;
  return `$${usd}`;
};
