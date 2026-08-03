export type Category = 'mta' | 'mmm' | 'both';
export type DisplayCategory = Category | 'incrementality';
export type SupportLevel = 'full' | 'partial' | 'none';
export type PriceTier = 'Free' | '$' | '$$' | '$$$' | '$$$$';

export type AudienceTag =
  | 'B2B / Lead Gen'
  | 'E-commerce / DTC'
  | 'Enterprise'
  | 'SaaS'
  | 'SMB'
  | 'Privacy-First'
  | 'Mobile'
  | 'Shopify'
  | 'Adobe Ecosystem'
  | 'CPG / Retail'
  | 'Data Science Team'
  | 'Performance Marketing'
  | 'Multi-National';

export interface Tool {
  name: string;
  url: string;
  category: Category;
  subcategory?: string;
  audienceTags: AudienceTag[];
  models: string[];
  modelSupport: Record<string, SupportLevel>;
  priceTier: PriceTier;
  priceLabel: string;
  priceUSD: number | null;
  strengths: string[];
  bestFor: string;
  founded?: string;
  hq?: string;
  hasIncrementality?: boolean;
  offersMTA?: boolean;
  offersMMM?: boolean;
  mtaDetail?: string;
  mmmDetail?: string;
  deprecated?: boolean;
}
