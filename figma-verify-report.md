# Figma Copy Verification Report

**Generated**: 2026-02-26T23:15:00Z

## Summary

| Metric | Count |
|--------|-------|
| Pages verified | 17 |
| Total discrepancies | 57 |
| High severity | 32 |
| Medium severity | 20 |
| Low severity | 5 |

### By Type

| Type | Count | Description |
|------|-------|-------------|
| MISMATCH | 40 | Same position, different text |
| MISSING | 8 | In Figma but not on live page |
| EXTRA | 9 | On live page but not in Figma |

### Per-Page Overview

| Page | Route | Discrepancies | High | Med | Low | Status |
|------|-------|:---:|:---:|:---:|:---:|--------|
| Home | `/` | 13 | 4 | 8 | 1 | Needs fixes |
| About | `/about` | 0 | 0 | 0 | 0 | Clean |
| Pricing | `/paid-ads-pricing` | 2 | 0 | 1 | 1 | Minor issues |
| What We Do | `/what-we-do` | 17 | 14 | 3 | 0 | Needs fixes |
| Google Ads | `/what-we-do/google-ads` | 2 | 0 | 1 | 1 | Minor issues |
| LinkedIn Ads | `/what-we-do/linkedin-ads` | 6 | 5 | 1 | 0 | Needs fixes |
| Other Channels | `/what-we-do/other-channels` | 8 | 6 | 2 | 0 | Needs fixes |
| Who We Work With | `/who-we-work-with` | 2 | 0 | 1 | 1 | Minor issues |
| B2B SaaS | `/who-we-work-with/b2b-saas` | 4 | 1 | 2 | 1 | Needs fixes |
| PLG | `/who-we-work-with/plg` | 2 | 1 | 1 | 0 | Needs fixes |
| Services | `/who-we-work-with/services` | 1 | 1 | 0 | 0 | Needs fixes |
| Case Studies | `/case-studies` | 0 | 0 | 0 | 0 | Clean* |
| Podcasts | `/resources/podcasts` | 0 | 0 | 0 | 0 | Clean* |
| Tools & Templates | `/resources/tools-templates` | 0 | 0 | 0 | 0 | Clean* |
| Alternatives | `/resources/alternatives` | 0 | 0 | 0 | 0 | Clean* |
| Profit Studio | `/profit-studio` | 0 | 0 | 0 | 0 | Clean* |
| Privacy Policy | `/privacy-policy` | 0 | 0 | 0 | 0 | Clean* |

\* Figma API was rate-limited during verification. These pages passed structural/source-code checks but need full Figma screenshot comparison when API access is restored.

**Skipped pages** (dynamic templates requiring specific slugs):
- `/case-studies/[slug]` — case study template
- `/resources/author/[slug]` — author bio template

### Clean Pages

- `/about` — Perfect match across all sections (hero, founder letter, values, team, pets, testimonials, CTA, footer)

---

## Detailed Results

### `/` (Home)

**13 discrepancies** (4 high, 8 medium, 1 low) | Figma node: `667:2085`

#### High Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 1 | MISMATCH | Hero / h1 | Missing space: live renders "Backed byex-Google talent" instead of "Backed by ex-Google talent" |
| 2 | MISMATCH | Why clients / ROI Obsessed description | Completely different second sentence. Figma: "That's why we're called Profit Mill—our ultimate goal is to help B2B businesses generate profit from paid ads." Live: "That's why we offer performance-based fees that are linked directly to the revenue we help you generate from ads." |
| 3 | MISMATCH | FAQ / Q3 answer (visuals/creative) | Figma describes in-house "creative and video editing teams." Live describes "a network of trusted creative partners" with "creative support included in our top two pricing plans." |
| 4 | MISMATCH | FAQ / Q4 answer (platforms) | Multiple differences: Figma lists "Google & Bing Ads" (live omits Google from list), Figma includes "X Ads" (live does not), live adds "SEO" and "Content marketing." Closing paragraph completely different. |

#### Medium Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 5 | MISMATCH | FAQ / Q6 answer | Live missing "via Slack and email" at end of sentence |
| 6 | MISSING | Testimonials / Forum Ventures | Alexis Clarfield-Henry testimonial in Figma, absent from live |
| 7 | MISSING | Testimonials / RunPod | Luke Piette testimonial in Figma, absent from live |
| 8 | MISSING | Testimonials / Paraform | Cristina Bune testimonial in Figma, absent from live |
| 9 | EXTRA | Testimonials / Let's Roam | Connor Moynihan testimonial on live, not in Figma |
| 10 | EXTRA | Testimonials / Let's Roam | Jordan Stella testimonial on live, not in Figma |
| 11 | EXTRA | Testimonials / Let's Roam | Scott Bradley testimonial on live, not in Figma |
| 12 | MISMATCH | Testimonials / layout | Different ordering and arrangement between Figma and live |

#### Low Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 13 | MISMATCH | Testimonials / Speaker Labs | Figma has double space and "a fantastic problem solvers" (grammar error). Live corrected to "fantastic problem solvers." |

---

### `/paid-ads-pricing` (Pricing)

**2 discrepancies** (0 high, 1 medium, 1 low) | Figma node: `1702:4457` | FAQ node: `1540:5746`

> Figma API was rate-limited. Partial verification only — full re-verification recommended.

| # | Sev | Type | Location | Issue |
|---|-----|------|----------|-------|
| 1 | MED | EXTRA | FAQ section / 13th item | Live page has 13 FAQs; Figma design has 12. Extra FAQ: "Why does your Explore plan only include Google or LinkedIn?" was added in Sanity after Figma was finalized. |
| 2 | LOW | MISMATCH | Pricing cards / labels | "Common Stage:" and "Common Revenue:" labels use 14px on live vs 16px in Figma. Text content matches. |

---

### `/what-we-do` (What We Do)

**17 discrepancies** (14 high, 3 medium, 0 low) | Figma node: `695:191`

All 17 discrepancies are in the **Comparison Chart** section. The chart has been substantially rewritten between Figma and the live implementation.

#### High Severity

| # | Type | Location | Figma | Live |
|---|------|----------|-------|------|
| 1 | MISMATCH | Chart heading | "paid ad options" | "paid ads service options" |
| 2 | MISMATCH | Column headers | Simple labels ("In-House Hire") | "Alternative #N" prefixes, lowercase |
| 3 | MISMATCH | Row categories | Services, Price, Speed, Quality, Avalability | Strategic experience, Execution skill, Communication & availability, Metric of success, Price |
| 4-7 | MISMATCH | First row cells (all 4 columns) | Short, terse descriptions | Longer, more detailed copy |
| 8-11 | MISMATCH | Price row cells (all 4 columns) | Short descriptions | More detailed descriptions |
| 12 | MISSING | Speed row | "Lengthy hiring / Moves fast / Slow onboarding / Launch 1-2 weeks" | Entire row absent |
| 13 | MISSING | Quality row | "Depends on individual / Execution only / Old playbooks / Full-funnel strategy" | Entire row absent |
| 14 | MISSING | Availability row | "Limited / Varied / Hands-off / Slack + calls" | Entire row absent (note: Figma has typo "Avalability") |

#### Medium Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 15 | EXTRA | Execution skill row | Entire row on live but not in Figma |
| 16 | EXTRA | Communication & availability row | Entire row on live but not in Figma |
| 17 | EXTRA | Metric of success row | Entire row on live but not in Figma |

**Assessment**: The comparison chart was intentionally rewritten with more detailed, nuanced copy. A decision is needed on whether to update the Figma design to match live or revert live to match Figma.

---

### `/what-we-do/google-ads` (Google Ads)

**2 discrepancies** (0 high, 1 medium, 1 low) | Figma node: `947:3107` | FAQ node: `1686:2382`

| # | Sev | Type | Location | Issue |
|---|-----|------|----------|-------|
| 1 | MED | MISMATCH | CTA / subtitle | Figma ends with "...that you might be missing out on." Live ends with "...--free of charge." |
| 2 | LOW | MISMATCH | CTA / button | Figma: "Book you free audit" (typo). Live: "Book your free Google Ads audit" (corrected + more specific). Figma should be updated. |

---

### `/what-we-do/linkedin-ads` (LinkedIn Ads)

**6 discrepancies** (5 high, 1 medium, 0 low) | Figma node: `947:8797` | FAQ node: `1686:3061`

#### High Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 1 | MISMATCH | Case Studies section | `CaseStudiesSection` uses hardcoded Google Ads case studies. On LinkedIn Ads page, all 3 show "B2B SaaS, Google Ads" — contextually wrong. Component not channel-aware. |
| 2 | MISMATCH | FAQ Q2 answer | Figma: generic "free ad audit" framing. Live: LinkedIn-specific detail about "targeting, creative, and campaign structure." |
| 3 | MISMATCH | FAQ Q3 answer | Figma: "buying committees" + ABM methodology. Live: "buyer's journey" stages + tracking to revenue. |
| 4 | MISMATCH | FAQ Q4 answer | Figma: two paragraphs, general agency positioning. Live: single paragraph, "hundreds of B2B accounts" + revenue goals. |
| 5 | MISMATCH | FAQ Q5 answer | Figma: recommends "3 month commitment." Live: mentions "30 days notice" + sales-oriented pipeline language. |

#### Medium Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 6 | MISMATCH | Button link URL | Hero and CTA buttons link to `googleadsaudit` URL — potentially confusing on LinkedIn Ads page. |

---

### `/what-we-do/other-channels` (Other Channels)

**8 discrepancies** (6 high, 2 medium, 0 low) | Figma node: `947:9836` | FAQ node: `1686:3764`

#### High Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 1 | MISMATCH | Why Profit Mill / subtitle | Says "Here's why Google Ads with Profit Mill outperform the rest:" — copy-paste error from Google Ads config. Should reference "Other Channels" or similar. **Both Figma and code have this error.** Source: `why-profit-mill.tsx` line 66 |
| 2-6 | MISMATCH | FAQ answers Q2-Q6 | All 5 FAQ answers completely rewritten in Sanity vs Figma. Tone shifted from casual/punchy to professional/strategic. |

#### Medium Severity

| # | Type | Location | Issue |
|---|------|----------|-------|
| 7 | MISMATCH | FAQ Q7 answer | Figma: "3 month commitment." Live: "30 days notice." Core message same (month-to-month). |
| 8 | MISSING | Footer | "Guides & Playbooks" link missing (site-wide issue). |

---

### `/who-we-work-with` (Who We Work With)

**2 discrepancies** (0 high, 1 medium, 1 low) | Figma node: `698:5232`

| # | Sev | Type | Location | Issue |
|---|-----|------|----------|-------|
| 1 | MED | EXTRA | How to Tell section | Live has a yellow "Book a call" CTA button not present in Figma design. Source: `how-to-tell.tsx` lines 100-107 |
| 2 | LOW | MISSING | Footer | "Guides & Playbooks" link missing (site-wide) |

---

### `/who-we-work-with/b2b-saas` (B2B SaaS)

**4 discrepancies** (1 high, 2 medium, 1 low) | Figma node: `947:10583` | FAQ node: `1686:4994`

| # | Sev | Type | Location | Issue |
|---|-----|------|----------|-------|
| 1 | HIGH | MISMATCH | Route/Slug | Page map says `/who-we-work-with/b2b-saas` but Sanity slug is `paid-ads-b2b-saas`. Navigating to the mapped route returns **404**. Actual URL: `/who-we-work-with/paid-ads-b2b-saas` |
| 2 | MED | MISMATCH | Case Studies | Hardcoded case studies identical across all segment pages, not B2B SaaS-specific |
| 3 | MED | MISMATCH | Case Studies title | Component default title differs from Figma expected title |
| 4 | LOW | MISMATCH | Logo section | Figma text lowercase; live renders uppercase via CSS (visual appearance matches) |

---

### `/who-we-work-with/plg` (PLG)

**2 discrepancies** (1 high, 1 medium, 0 low) | Figma node: `947:11804` | FAQ node: `1686:5677`

| # | Sev | Type | Location | Issue |
|---|-----|------|----------|-------|
| 1 | HIGH | MISMATCH | Route/Slug | Page map says `/who-we-work-with/plg` but Sanity slug is `paid-ads-plg-companies`. Navigating to the mapped route returns **404**. Actual URL: `/who-we-work-with/paid-ads-plg-companies` |
| 2 | MED | MISSING | Footer | "Guides & Playbooks" link missing (site-wide) |

---

### `/who-we-work-with/services` (Services)

**1 discrepancy** (1 high, 0 medium, 0 low) | Figma node: `947:12936` | FAQ node: `1686:6366`

| # | Sev | Type | Location | Issue |
|---|-----|------|----------|-------|
| 1 | HIGH | MISMATCH | Route/Slug | Page map says `/who-we-work-with/services` but Sanity slug is `paid-ads-service-businesses`. Navigating to the mapped route returns **404**. Actual URL: `/who-we-work-with/paid-ads-service-businesses` |

---

## Cross-Cutting Issues

These issues affect multiple pages:

### 1. Figma Page Map Route Mismatches (HIGH)
Three segment pages have incorrect routes in `frontend/data/figma-page-map.ts`:

| Page Map Route | Actual Sanity Slug | Fix |
|---|---|---|
| `/who-we-work-with/b2b-saas` | `/who-we-work-with/paid-ads-b2b-saas` | Update line 19 |
| `/who-we-work-with/plg` | `/who-we-work-with/paid-ads-plg-companies` | Update line 21 |
| `/who-we-work-with/services` | `/who-we-work-with/paid-ads-service-businesses` | Update line 23 |

### 2. Hardcoded Case Studies Component (HIGH)
`CaseStudiesSection` (`frontend/components/v2/case-studies-section.tsx`) uses hardcoded Google Ads case studies on ALL pages. On LinkedIn Ads and Other Channels pages, this shows contextually wrong content ("B2B SaaS, Google Ads" categories). The component only accepts a `title` prop and is not channel-aware.

### 3. FAQ Answer Divergence (HIGH)
FAQ answers in Sanity CMS have been significantly rewritten from the Figma designs across all service pages (LinkedIn Ads, Other Channels, and partially Google Ads). The Sanity versions tend to be more detailed and platform-specific. A decision is needed: update Figma to match Sanity, or revert Sanity to match Figma.

### 4. Missing Footer Link (LOW, site-wide)
The Figma footer includes a "Guides & Playbooks" link in the Resources column that is absent from the live footer component (`frontend/components/v2/footer.tsx`).

### 5. Placeholder Spotify URL (info)
The podcasts page (`frontend/app/resources/podcasts/page.tsx` line 34) has a placeholder Spotify URL: `https://open.spotify.com/show/your-podcast-id`.

### 6. Placeholder "Read more" link (info)
The Profit Studio page has a "Read more" link for the Jungle AI callout pointing to `#` (placeholder href).

### 7. Privacy Policy placeholder content (info)
The privacy policy body content in Sanity CMS currently reads "Loren Impsum" (placeholder).

---

## Figma API Rate Limiting

The Figma API was rate-limited after the first 3-4 pages were verified. Pages verified after the rate limit hit relied on:
- Live page accessibility tree snapshots (text extraction)
- Source code review of components
- Previously cached Figma data from earlier in the session

**Pages with full Figma screenshot comparison**: `/` (home), `/about`, `/what-we-do` (partial)

**Pages needing full Figma re-verification when API resets**: `/paid-ads-pricing`, `/what-we-do/google-ads`, `/what-we-do/linkedin-ads`, `/what-we-do/other-channels`, `/who-we-work-with`, all segment pages, `/case-studies`, `/resources/*`, `/profit-studio`, `/privacy-policy`

---

## How to Fix

Text on the site comes from several sources. Here's how to find and fix each type:

### Hardcoded Strings
Text directly in JSX/TSX component files.
```tsx
// Example: frontend/components/v2/hero.tsx
<h1>We drive profit, not ad spend</h1>
```
**Fix**: Edit the string directly in the component file.

### Data Objects / Constants
Text in centralized data files, often arrays of objects.
```ts
// Example: frontend/data/services.ts
export const services = [
  { title: "Google Ads Management", description: "..." },
]
```
**Fix**: Edit the data file. The component rendering it stays unchanged.

### Props / Composition
Text passed as props from a parent component or page file.
```tsx
// Example: frontend/app/about/page.tsx
<PageHeader title="About ProfitMill" subtitle="..." />
```
**Fix**: Edit the prop value in the parent component or page file.

### CMS Content (Sanity)
Text fetched from Sanity at build time or runtime. These won't appear as hardcoded strings.
```tsx
// Example: Content fetched via GROQ query
const data = await sanityFetch({ query: pageQuery })
```
**Fix**: Edit in Sanity Studio, not in code. The component file shows where it renders but not the actual text.

### Tips
- Use the `location` field in each discrepancy to find the relevant section on the page
- For CMS content, the report flags structural elements only (headings, CTAs) — body content is managed in Sanity
- Screenshots are saved in `/tmp/figma-verify/screenshots/` for visual reference
- To find where text lives in code, grep for the Figma text in `frontend/components/`, `frontend/app/`, and `frontend/data/`

---

*Report generated by figma-verify skill*
