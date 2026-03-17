// === Platform Audience Types ===

export interface AudienceType {
  name: string;
  description: string;
  dataRequired: string[];
  minimumSize: string;
  matchIdentifiers: string[];
  b2bNotes: string;
  bestFor: string;
  helpUrl?: string; // Official platform documentation link
}

export interface PlatformData {
  platform: string;
  logo: string; // lucide icon name
  color: string;
  audienceTypes: AudienceType[];
}

// === Tools Matrix ===

export type SupportLevel = 'full' | 'partial' | 'none';
export type PriceTier = 'free' | '$' | '$$' | '$$$' | '$$$$';
export type ToolCategory =
  | 'ABM Platform'
  | 'Intent Data'
  | 'Audience Builder'
  | 'Data Enrichment'
  | 'Ad Automation'
  | 'Sales Intelligence'
  | 'Review Intent';

export type AdPlatform = 'LinkedIn' | 'Meta' | 'Google' | 'Reddit' | 'X' | 'Programmatic';

export interface ToolData {
  name: string;
  category: ToolCategory;
  website: string;
  description: string;
  adPlatforms: Record<AdPlatform, SupportLevel>;
  outputTypes: {
    companyLists: SupportLevel;
    contactLists: SupportLevel;
    lookalikes: SupportLevel;
    intentSignals: SupportLevel;
    audienceSync: SupportLevel;
  };
  dataResolution: 'Account' | 'Contact' | 'Both';
  dataSource: string;
  priceTier: PriceTier;
  priceRange: string;
  bestFor: string;
  topStrength: string;
  b2bFit: 'SMB' | 'Mid-Market' | 'Enterprise' | 'All';
}

// === Column Definitions ===
export interface ColumnDef {
  key: string;
  label: string;
  definition: string;
}
