export type FunnelStage = 'top' | 'middle' | 'bottom';
export type Availability = 'full' | 'limited' | 'none';

export interface Platform {
  id: string;
  name: string;
  shortName: string;
}

export interface PlatformData {
  availability: Availability;
  description: string;
  link: string;
}

export interface TargetingFeature {
  id: string;
  name: string;
  category: string;
  platforms: Record<string, PlatformData>;
}

export interface FeatureDetail {
  detailedDescription: string;
  limitedExplanation?: string;
}

export interface SelectedCell {
  featureId: string;
  platformId: string;
}

export interface Recommendation {
  featureId: string;
  platformId: string;
  funnelStage: FunnelStage;
  reasoning: string;
}

export interface RecommendationResult {
  recommendations: Recommendation[];
  summary: string;
}

export interface TooltipData {
  platformData: PlatformData;
  featureName: string;
  platformName: string;
  recommendation?: Recommendation;
  x: number;
  y: number;
}
