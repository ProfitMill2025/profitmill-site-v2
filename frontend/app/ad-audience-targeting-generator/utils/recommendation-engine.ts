import { Recommendation, FunnelStage } from '../types';
import { features } from '../data/features';

// ── Website scraping via API route ──────────────────────────────────

async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await fetch('/api/scrape-website', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    if (!response.ok) return ''
    const data = await response.json()
    return [data.pageTitle, data.metaDescription, data.textContent].filter(Boolean).join(' ')
  } catch {
    return ''
  }
}

// ── Business classification ─────────────────────────────────────────

interface BusinessProfile {
  b2b: number;
  b2c: number;
  tech: number;
  ecommerce: number;
  local: number;
  professional: number;
  education: number;
  media: number;
  finance: number;
  health: number;
  hasCompetitors: boolean;
  competitorOverlap: number;
}

const signalMap: Record<string, string[]> = {
  b2b: [
    'enterprise', 'business', 'team', 'company', 'organization', 'solution',
    'platform', 'saas', 'crm', 'erp', 'b2b', 'corporate', 'workplace',
    'productivity', 'workflow', 'automation', 'integration', 'vendor',
    'procurement', 'supply chain', 'roi', 'dashboard', 'analytics',
    'compliance', 'stakeholder', 'pipeline', 'onboarding',
  ],
  b2c: [
    'shop', 'buy', 'store', 'consumer', 'lifestyle', 'personal', 'home',
    'family', 'beauty', 'fitness', 'fashion', 'food', 'travel', 'pet',
    'gift', 'entertainment', 'hobby', 'recipe', 'wellness', 'self-care',
    'subscription', 'membership', 'deal', 'discount',
  ],
  tech: [
    'software', 'api', 'developer', 'code', 'cloud', 'data', 'tech',
    'startup', 'digital', 'app', 'ai', 'machine learning', 'devops',
    'cybersecurity', 'infrastructure', 'open source', 'github', 'sdk',
    'microservice', 'container', 'kubernetes', 'deploy',
  ],
  ecommerce: [
    'shop', 'product', 'buy', 'cart', 'shipping', 'catalog', 'price',
    'deal', 'order', 'checkout', 'ecommerce', 'e-commerce', 'retail',
    'marketplace', 'shopify', 'woocommerce', 'inventory', 'warehouse',
    'fulfillment', 'dropship',
  ],
  local: [
    'location', 'near', 'visit', 'clinic', 'restaurant', 'store',
    'office', 'appointment', 'local', 'walk-in', 'in-person',
    'neighborhood', 'downtown', 'delivery area', 'service area',
    'branch', 'franchise',
  ],
  professional: [
    'consulting', 'agency', 'firm', 'advisory', 'expertise', 'strategy',
    'legal', 'accounting', 'tax', 'audit', 'law', 'architect',
    'engineering firm', 'management consulting', 'staffing', 'recruiting',
    'hr', 'human resources', 'outsourcing',
  ],
  education: [
    'course', 'learn', 'training', 'certification', 'degree', 'university',
    'education', 'school', 'class', 'tutorial', 'bootcamp', 'curriculum',
    'instructor', 'student', 'enroll', 'lms', 'e-learning', 'edtech',
    'workshop', 'webinar', 'academy',
  ],
  media: [
    'content', 'blog', 'news', 'media', 'publish', 'magazine', 'podcast',
    'video', 'streaming', 'creator', 'influencer', 'social media',
    'newsletter', 'editorial', 'journalism', 'broadcast',
  ],
  finance: [
    'finance', 'banking', 'investment', 'insurance', 'fintech', 'payment',
    'loan', 'credit', 'mortgage', 'wealth', 'trading', 'crypto',
    'blockchain', 'defi', 'neobank', 'budget', 'savings',
  ],
  health: [
    'health', 'medical', 'healthcare', 'pharma', 'clinical', 'patient',
    'doctor', 'hospital', 'therapy', 'dental', 'mental health',
    'telehealth', 'wellness', 'nutrition', 'supplement', 'biotech',
  ],
};

function classifyText(text: string): Record<string, number> {
  const combined = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [key, keywords] of Object.entries(signalMap)) {
    let count = 0;
    for (const kw of keywords) {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = combined.match(regex);
      if (matches) count += matches.length;
    }
    scores[key] = count;
  }

  return scores;
}

function classifyBusiness(
  url: string,
  description: string,
  scrapedText: string,
  competitorUrls: string[],
  competitorTexts: string[],
): BusinessProfile {
  // Classify main business
  const mainText = `${url} ${description} ${scrapedText}`;
  const mainScores = classifyText(mainText);

  // Classify competitors
  const competitorScores: Record<string, number> = {};
  const allCompetitorText = competitorUrls.join(' ') + ' ' + competitorTexts.join(' ');
  if (allCompetitorText.trim()) {
    const compScores = classifyText(allCompetitorText);
    for (const [key, val] of Object.entries(compScores)) {
      competitorScores[key] = val;
    }
  }

  // Merge: boost main categories where competitors also score high (validates the market)
  // Also boost competitor-specific signals for conquest targeting
  const mergedScores: Record<string, number> = {};
  for (const key of Object.keys(signalMap)) {
    const main = mainScores[key] || 0;
    const comp = competitorScores[key] || 0;
    // Competitor overlap boosts confidence in the category
    mergedScores[key] = main + comp * 0.3;
  }

  // Normalize
  const max = Math.max(...Object.values(mergedScores), 1);
  const profile: BusinessProfile = {
    b2b: (mergedScores.b2b || 0) / max,
    b2c: (mergedScores.b2c || 0) / max,
    tech: (mergedScores.tech || 0) / max,
    ecommerce: (mergedScores.ecommerce || 0) / max,
    local: (mergedScores.local || 0) / max,
    professional: (mergedScores.professional || 0) / max,
    education: (mergedScores.education || 0) / max,
    media: (mergedScores.media || 0) / max,
    finance: (mergedScores.finance || 0) / max,
    health: (mergedScores.health || 0) / max,
    hasCompetitors: competitorUrls.length > 0,
    competitorOverlap: allCompetitorText.trim() ? 0.8 : 0,
  };

  return profile;
}

// ── Recommendation rules ────────────────────────────────────────────

interface Rule {
  featureId: string;
  platformId: string;
  funnelStage: FunnelStage;
  reasoning: string;
  score: (p: BusinessProfile) => number;
}

const rules: Rule[] = [
  // ── ALWAYS RECOMMEND (universal) ──
  { featureId: 'website-retargeting', platformId: 'google', funnelStage: 'bottom', reasoning: 'Essential for converting website visitors across the Google network', score: () => 0.9 },
  { featureId: 'website-retargeting', platformId: 'meta', funnelStage: 'bottom', reasoning: 'Re-engage website visitors on Facebook and Instagram', score: () => 0.85 },
  { featureId: 'lookalike-audiences', platformId: 'meta', funnelStage: 'middle', reasoning: 'Expand reach to users similar to your best customers', score: () => 0.8 },
  { featureId: 'customer-list', platformId: 'google', funnelStage: 'bottom', reasoning: 'Target existing customers and similar users across Google', score: () => 0.75 },
  { featureId: 'location-geo', platformId: 'google', funnelStage: 'middle', reasoning: 'Ensure ads reach the right geographic markets', score: () => 0.7 },

  // ── COMPETITOR CONQUEST ── (boosted when competitors provided)
  { featureId: 'search-keywords', platformId: 'google', funnelStage: 'bottom', reasoning: 'Bid on competitor brand keywords to capture their search traffic', score: (p) => p.hasCompetitors ? 0.95 : 0.5 },
  { featureId: 'follower-lookalikes', platformId: 'x', funnelStage: 'top', reasoning: 'Target followers of competitor accounts to steal share of voice', score: (p) => p.hasCompetitors ? 0.85 : p.tech * 0.7 },
  { featureId: 'follower-lookalikes', platformId: 'linkedin', funnelStage: 'top', reasoning: 'Reach professionals following competitor company pages', score: (p) => p.hasCompetitors ? (p.b2b > 0.3 ? 0.8 : 0.5) : p.b2b * 0.65 },
  { featureId: 'community-targeting', platformId: 'reddit', funnelStage: 'top', reasoning: 'Target subreddits where competitor products are discussed', score: (p) => p.hasCompetitors ? 0.75 : p.tech * 0.9 + p.b2b * 0.2 },
  { featureId: 'contextual-keywords', platformId: 'reddit', funnelStage: 'middle', reasoning: 'Target discussions mentioning competitor names and product categories', score: (p) => p.hasCompetitors ? 0.8 : p.tech * 0.8 },
  { featureId: 'negative-keywords', platformId: 'google', funnelStage: 'bottom', reasoning: 'Protect budget by excluding irrelevant competitor terms and branded searches', score: (p) => p.hasCompetitors ? 0.7 : 0.5 },

  // ── B2B HEAVY ──
  { featureId: 'job-title', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Reach specific decision-makers by their exact title', score: (p) => p.b2b * 0.95 + p.professional * 0.3 },
  { featureId: 'seniority-level', platformId: 'linkedin', funnelStage: 'bottom', reasoning: 'Target C-suite and senior leadership for enterprise deals', score: (p) => p.b2b * 0.9 + p.professional * 0.4 },
  { featureId: 'company-size', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Segment by company size to match your ideal customer profile', score: (p) => p.b2b * 0.88 },
  { featureId: 'company-name', platformId: 'linkedin', funnelStage: 'bottom', reasoning: 'Account-based marketing to your target account list', score: (p) => p.b2b * 0.85 },
  { featureId: 'industry-targeting', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Focus spend on industries where your solution fits best', score: (p) => p.b2b * 0.82 + p.professional * 0.3 },
  { featureId: 'job-function', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Reach functional teams regardless of specific title variations', score: (p) => p.b2b * 0.8 },
  { featureId: 'in-market-intent', platformId: 'google', funnelStage: 'bottom', reasoning: 'Reach users actively researching business solutions', score: (p) => p.b2b * 0.85 },
  { featureId: 'in-market-intent', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'LinkedIn buyer intent signals identify active B2B researchers', score: (p) => p.b2b * 0.7 },
  { featureId: 'website-retargeting', platformId: 'linkedin', funnelStage: 'bottom', reasoning: 'Re-engage professional visitors who explored your B2B solution', score: (p) => p.b2b * 0.85 },
  { featureId: 'lookalike-audiences', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Find professionals similar to your existing B2B customers', score: (p) => p.b2b * 0.75 },

  // ── TECH / SAAS ──
  { featureId: 'interest-categories', platformId: 'reddit', funnelStage: 'top', reasoning: 'Reach technology and developer interest segments on Reddit', score: (p) => p.tech * 0.75 },
  { featureId: 'topic-targeting', platformId: 'x', funnelStage: 'top', reasoning: 'Join tech conversations and trending developer topics', score: (p) => p.tech * 0.7 },
  { featureId: 'search-keywords', platformId: 'x', funnelStage: 'middle', reasoning: 'Target users searching for tech solutions on X', score: (p) => p.tech * 0.65 },

  // ── B2C / CONSUMER ──
  { featureId: 'interest-categories', platformId: 'meta', funnelStage: 'top', reasoning: 'Reach consumers by lifestyle interests on Facebook and Instagram', score: (p) => p.b2c * 0.9 },
  { featureId: 'behavioral-targeting', platformId: 'meta', funnelStage: 'middle', reasoning: 'Target based on consumer purchase behavior and digital activities', score: (p) => p.b2c * 0.85 },
  { featureId: 'affinity-lifestyle', platformId: 'meta', funnelStage: 'top', reasoning: 'Reach lifestyle segments that match your brand personality', score: (p) => p.b2c * 0.8 },
  { featureId: 'affinity-lifestyle', platformId: 'google', funnelStage: 'top', reasoning: 'Target affinity audiences with aligned consumer interests', score: (p) => p.b2c * 0.75 },
  { featureId: 'life-events', platformId: 'meta', funnelStage: 'middle', reasoning: 'Reach consumers during key life moments (moving, wedding, new baby)', score: (p) => p.b2c * 0.7 },
  { featureId: 'life-events', platformId: 'google', funnelStage: 'middle', reasoning: 'Target users experiencing relevant life milestones', score: (p) => p.b2c * 0.65 },
  { featureId: 'engagement-retargeting', platformId: 'meta', funnelStage: 'bottom', reasoning: 'Re-engage users who interacted with your social content', score: (p) => p.b2c * 0.85 },
  { featureId: 'video-retargeting', platformId: 'meta', funnelStage: 'middle', reasoning: 'Build sequential messaging from video ad viewers', score: (p) => p.b2c * 0.7 },
  { featureId: 'interest-categories', platformId: 'x', funnelStage: 'top', reasoning: 'Reach consumers with relevant interests on X', score: (p) => p.b2c * 0.6 },

  // ── ECOMMERCE ──
  { featureId: 'purchase-behavior', platformId: 'meta', funnelStage: 'bottom', reasoning: 'Target active online shoppers and category buyers', score: (p) => p.ecommerce * 0.95 },
  { featureId: 'in-market-intent', platformId: 'google', funnelStage: 'bottom', reasoning: 'Reach users actively shopping in your product category', score: (p) => p.ecommerce * 0.9 },
  { featureId: 'site-app-placements', platformId: 'google', funnelStage: 'middle', reasoning: 'Place display ads on relevant shopping and review sites', score: (p) => p.ecommerce * 0.7 },
  { featureId: 'customer-list', platformId: 'meta', funnelStage: 'bottom', reasoning: 'Retarget past purchasers with new products and upsells', score: (p) => p.ecommerce * 0.85 },

  // ── LOCAL ──
  { featureId: 'location-geo', platformId: 'google', funnelStage: 'bottom', reasoning: 'Target customers within your service area with precision', score: (p) => p.local * 0.95 },
  { featureId: 'location-geo', platformId: 'meta', funnelStage: 'middle', reasoning: 'Reach local audiences on Facebook and Instagram', score: (p) => p.local * 0.9 },
  { featureId: 'device-os', platformId: 'google', funnelStage: 'bottom', reasoning: 'Target mobile users searching for local businesses', score: (p) => p.local * 0.6 },

  // ── PROFESSIONAL SERVICES ──
  { featureId: 'industry-targeting', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Target industries you specialize in serving', score: (p) => p.professional * 0.8 },

  // ── EDUCATION ──
  { featureId: 'education-level', platformId: 'linkedin', funnelStage: 'middle', reasoning: 'Target users by current education level for advanced programs', score: (p) => p.education * 0.85 },
  { featureId: 'education-level', platformId: 'meta', funnelStage: 'top', reasoning: 'Reach potential students by education background', score: (p) => p.education * 0.8 },
  { featureId: 'age-targeting', platformId: 'meta', funnelStage: 'top', reasoning: 'Target age groups most likely to pursue education', score: (p) => p.education * 0.75 },

  // ── FINANCE ──
  { featureId: 'household-income', platformId: 'google', funnelStage: 'middle', reasoning: 'Target income brackets relevant to your financial products', score: (p) => p.finance * 0.85 },
  { featureId: 'interest-categories', platformId: 'meta', funnelStage: 'top', reasoning: 'Reach users interested in personal finance and investing', score: (p) => p.finance * 0.7 },

  // ── HEALTH ──
  { featureId: 'age-targeting', platformId: 'meta', funnelStage: 'middle', reasoning: 'Target age groups relevant to your health products/services', score: (p) => p.health * 0.7 },
  { featureId: 'topic-targeting', platformId: 'google', funnelStage: 'middle', reasoning: 'Show display ads on health-related content', score: (p) => p.health * 0.65 },

  // ── MEDIA / CONTENT ──
  { featureId: 'topic-targeting', platformId: 'x', funnelStage: 'top', reasoning: 'Target conversations around your content topics', score: (p) => p.media * 0.85 },
  { featureId: 'event-moment', platformId: 'x', funnelStage: 'top', reasoning: 'Ride trending moments and cultural events for visibility', score: (p) => p.media * 0.75 },
  { featureId: 'engagement-retargeting', platformId: 'x', funnelStage: 'middle', reasoning: 'Retarget users who engaged with your content', score: (p) => p.media * 0.8 },
];

// ── Generate summary ────────────────────────────────────────────────

function generateSummary(profile: BusinessProfile, recCount: number, competitorCount: number): string {
  const traits: string[] = [];
  if (profile.b2b > 0.4) traits.push('B2B');
  if (profile.b2c > 0.4) traits.push('B2C');
  if (profile.tech > 0.4) traits.push('technology');
  if (profile.ecommerce > 0.4) traits.push('e-commerce');
  if (profile.local > 0.4) traits.push('local');
  if (profile.professional > 0.4) traits.push('professional services');
  if (profile.education > 0.4) traits.push('education');
  if (profile.finance > 0.4) traits.push('finance');
  if (profile.health > 0.4) traits.push('health');
  if (profile.media > 0.4) traits.push('media/content');

  const traitStr = traits.length > 0 ? traits.join(', ') : 'general';

  const platforms: string[] = [];
  if (profile.b2b > 0.4 || profile.professional > 0.4) platforms.push('LinkedIn for professional targeting');
  if (profile.b2c > 0.4 || profile.ecommerce > 0.4) platforms.push('Meta for consumer reach');
  if (profile.tech > 0.4) platforms.push('Reddit for tech community engagement');
  platforms.push('Google for search intent capture');
  if (profile.media > 0.4) platforms.push('X for conversation-based reach');

  const competitorNote = competitorCount > 0
    ? ` We've also factored in ${competitorCount} competitor${competitorCount > 1 ? 's' : ''} to include conquest targeting strategies like competitor keyword bidding, follower lookalikes, and community infiltration.`
    : '';

  return `Based on your ${traitStr} business profile, we recommend ${recCount} targeting combinations across multiple platforms.${competitorNote} Focus on ${platforms.slice(0, 3).join(', ')}. Use the funnel indicators to build a full-funnel strategy — start with awareness (blue) to fill the top, nurture with consideration (amber), and close with conversion (green) tactics.`;
}

// ── Main exports ─────────────────────────────────────────────────────

export { scrapeWebsite };

export function generateRecommendations(
  url: string,
  description: string,
  scrapedText: string = '',
  competitorUrls: string[] = [],
  competitorTexts: string[] = [],
): { recommendations: Recommendation[]; summary: string } {
  const profile = classifyBusiness(url, description, scrapedText, competitorUrls, competitorTexts);

  const scored = rules
    .map((rule) => ({
      ...rule,
      computedScore: rule.score(profile),
    }))
    .filter((r) => r.computedScore > 0.1)
    .filter((r) => {
      const feature = features.find((f) => f.id === r.featureId);
      if (!feature) return false;
      const pd = feature.platforms[r.platformId];
      return pd && pd.availability !== 'none';
    })
    .sort((a, b) => b.computedScore - a.computedScore);

  const seen = new Set<string>();
  const deduped = scored.filter((r) => {
    const key = `${r.featureId}__${r.platformId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const selected = deduped.slice(0, 25);

  const recommendations: Recommendation[] = selected.map((r) => ({
    featureId: r.featureId,
    platformId: r.platformId,
    funnelStage: r.funnelStage,
    reasoning: r.reasoning,
  }));

  return {
    recommendations,
    summary: generateSummary(profile, recommendations.length, competitorUrls.length),
  };
}
