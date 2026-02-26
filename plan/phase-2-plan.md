# Plan: Create profitmill-v2-site

> **Reference**: The source project is at `/Users/benjaminharris/Projects/sanity-demo`. When executing phases below, refer to that repo for original files, patterns, and examples.

## Context

The current `sanity-demo` project has v2 pages under `/app/v2/` with an embedded Sanity Studio. The goal is to extract the v2 site into a standalone Next.js project called `profitmill-v2-site` that:
- Connects to a **new Sanity project** (`ce4idxlh` / `production` dataset) — migrated from the original `wkr9mx2c`
- Uses the `esupport-v3-demo` Sanity connection architecture (no embedded studio)
- Promotes v2 routes to root (e.g., `/v2/about` → `/about`)
- Leaves `sanity-demo` completely untouched

---

## Phase 1: Project Initialization ✅

**Location:** `/Users/benjaminharris/Projects/profitmill-v2-site`

```bash
npx create-next-app@latest profitmill-v2-site \
  --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --turbopack
```

**Install dependencies** (matching sanity-demo versions for compatibility):

```bash
# Sanity (esupport-v3-demo pattern — no `sanity` package)
npm install next-sanity@^9.8.8 @sanity/client @sanity/image-url@^1.1.0 @portabletext/react

# UI libraries (used by v2 components)
npm install @radix-ui/react-accordion@^1.2.1 @radix-ui/react-dialog@^1.1.2 \
  @radix-ui/react-dropdown-menu@^2.1.16 @radix-ui/react-slot@^1.1.0
npm install class-variance-authority@^0.7.0 clsx@^2.1.1 tailwind-merge@^2.5.4 tailwindcss-animate@^1.0.7
npm install gsap@^3.12.5 lucide-react@^0.454.0 embla-carousel-react@^8.5.1
npm install @next/third-parties@^15.3.0 server-only

# Dev dependencies
npm install -D @tailwindcss/typography@^0.5.15
```

**Not installing** (not needed without studio): `sanity`, `@sanity/vision`, `styled-components`, `cloudinary`

---

## Phase 2: Sanity Connection Layer ✅

Created `sanity/lib/` following the esupport-v3-demo pattern, connecting to `ce4idxlh`.

### Files created:

| File | Purpose | Status |
|------|---------|--------|
| `sanity/lib/api.ts` | Config exports (projectId, dataset, apiVersion, studioUrl) | ✅ |
| `sanity/lib/token.ts` | Server-only token export with `import 'server-only'` | ✅ |
| `sanity/lib/client.ts` | Main client with CDN + stega + published perspective | ✅ |
| `sanity/lib/live.ts` | `defineLive` → exports `sanityFetch` and `SanityLive` | ✅ |
| `sanity/lib/utils.ts` | `urlFor()` image builder + `resolveOpenGraphImage()` + `linkResolver()` | ✅ |
| `sanity/lib/types.ts` | `DereferencedLink` type for GROQ-dereferenced links | ✅ |
| `sanity/lib/queries.ts` | All GROQ queries | ✅ |

---

## Phase 3: Copy Files from sanity-demo — ✅ MOSTLY COMPLETE

### 3a. Components ✅
| Source | Destination | Status |
|--------|-------------|--------|
| `components/v2/**` | `components/v2/**` | ✅ Entire directory, all subdirs |
| `components/ui/**` | `components/ui/**` | ✅ accordion, button, card, carousel, sheet, dropdown-menu |
| `components/portable-text.tsx` | `components/portable-text.tsx` | ✅ |
| `components/resource-list.tsx` | `components/resource-list.tsx` | ✅ |

### 3b. Pages (v2 → root routes) ✅
| Source (`app/v2/...`) | Destination (`app/...`) | Status |
|------------------------|-------------------------|--------|
| `app/v2/page.tsx` | `app/page.tsx` | ✅ |
| `app/v2/about/page.tsx` | `app/about/page.tsx` | ✅ |
| `app/v2/case-studies/page.tsx` | `app/case-studies/page.tsx` | ✅ |
| `app/v2/case-studies/[slug]/page.tsx` | `app/case-studies/[slug]/page.tsx` | ✅ |
| `app/v2/paid-ads-pricing/page.tsx` | `app/paid-ads-pricing/page.tsx` | ✅ |
| `app/v2/privacy-policy/page.tsx` | `app/privacy-policy/page.tsx` | ✅ |
| `app/v2/profit-studio/page.tsx` | `app/profit-studio/page.tsx` | ✅ |
| `app/v2/terms-conditions/page.tsx` | `app/terms-conditions/page.tsx` | ✅ |
| `app/v2/what-we-do/page.tsx` | `app/what-we-do/page.tsx` | ✅ |
| `app/v2/what-we-do/[slug]/page.tsx` | `app/what-we-do/[slug]/page.tsx` | ✅ |
| `app/v2/who-we-work-with/page.tsx` | `app/who-we-work-with/page.tsx` | ✅ |
| `app/v2/who-we-work-with/[slug]/page.tsx` | `app/who-we-work-with/[slug]/page.tsx` | ✅ |
| `app/v2/resources/blog/page.tsx` | `app/resources/blog/page.tsx` | ✅ |
| `app/v2/resources/blog/[slug]/page.tsx` | `app/resources/blog/[slug]/page.tsx` | ✅ |
| `app/v2/resources/podcasts/page.tsx` | `app/resources/podcasts/page.tsx` | ✅ |
| `app/v2/resources/tools-templates/page.tsx` | `app/resources/tools-templates/page.tsx` | ✅ |
| `app/v2/resources/author/[slug]/page.tsx` | `app/resources/author/[slug]/page.tsx` | ✅ |
| `app/v2/resources/alternatives/page.tsx` | `app/resources/alternatives/page.tsx` | ✅ |

### 3c. Data, Types, Lib ✅
| Source | Destination | Status |
|--------|-------------|--------|
| `data/faqs.tsx` | `data/faqs.tsx` | ✅ |
| `types/index.ts` | `types/index.ts` | ✅ |
| `lib/utils.ts` | `lib/utils.ts` (cn utility) | ✅ |
| `lib/attio.ts` | `lib/attio.ts` (newsletter API) | ✅ |
| `lib/rate-limit.ts` | `lib/rate-limit.ts` (newsletter API) | ✅ |

### 3d. API Routes ✅
| Source | Destination | Status |
|--------|-------------|--------|
| `app/api/newsletter/subscribe/route.ts` | `app/api/newsletter/subscribe/route.ts` | ✅ |
| `app/api/revalidate/route.ts` | `app/api/revalidate/route.ts` | ✅ (enhanced for blogPost + whoWeWorkWith types, Next.js 16 revalidateTag API) |
| `app/api/draft-mode/enable/route.ts` | `app/api/draft-mode/enable/route.ts` | ✅ |

### 3e. Assets ✅
| Source | Destination | Status |
|--------|-------------|--------|
| `public/**` | `public/**` | ✅ |
| `app/fonts/**` | `app/fonts/**` | ✅ |

---

## Phase 4: Configuration Files ✅

### Copied/created:
- ✅ `tailwind.config.ts` — custom color palette, typography plugin
- ✅ `postcss.config.mjs`
- ✅ `app/globals.css` — CSS custom properties
- ✅ `next.config.ts` — image remotes for `cdn.sanity.io` and `res.cloudinary.com`
- ✅ `tsconfig.json` — strict mode, path aliases
- ✅ `sanity.cli.ts` — frontend typegen config pointing to `../sanity.schema.json`

### `.env.local` ✅:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="ce4idxlh"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-09-25"
NEXT_PUBLIC_SANITY_STUDIO_URL="http://localhost:3333"
SANITY_API_READ_TOKEN="<configured>"
ATTIO_TOKEN="<configured>"
ATTIO_NEWSLETTER_LIST_ID="7ffa6254-e0f1-4a11-8a7f-b9d545e646ab"
```

---

## Phase 5: Root Layout ✅

Combined sanity-demo's root layout (GTM, consent scripts, metadata) with the v2 layout (NavbarV2, Footer, fonts) into a single `app/layout.tsx`:

- `<html>`, `<head>` with Google Consent Mode v2 + Usercentrics CMP scripts
- `<GoogleTagManager gtmId="GTM-MXZKWRS6" />`
- `<body>` with Inter + Sora fonts, `overflow-x-hidden`
- NavbarV2 + `<main>{children}</main>` + Footer
- Default metadata pointing to `https://www.profitmill.io`
- SanityLive for visual editing + Vercel Speed Insights

---

## Phase 6: Import & Link Updates ✅

### 6a. `urlFor` import path change ✅
Pages importing `@/sanity/lib/image` → changed to `@/sanity/lib/utils`

### 6b. Remove `/v2/` from all internal links ✅
No `/v2/` href links remain in the codebase (verified via grep).
Component import paths use `@/components/v2/` which is the actual directory name — correct as-is.

### 6c. Update metadata on all pages ✅
- Removed `robots: { index: false, follow: false }` (v2 staging protection)
- Updated `canonical` URLs: removed `/v2` prefix
- SEO titles/descriptions kept as-is

---

## Phase 6.5: Sanity Project Migration ✅ (NEW)

The original demo studio schema (`page`, `post`, `person`, `settings`) did not match the extended types used by the frontend (`blogPost`, `author`, `caseStudy`, `whoWeWorkWith`, `tool`, `playbook`, `podcast`, `privacyPolicy`, `terms`). A new Sanity project was created and data migrated.

### Steps completed:
1. ✅ Created new Sanity project `ce4idxlh` (personal account, to be transferred to org later)
2. ✅ Copied 9 extended schema types from `sanity-demo/sanity/schemaTypes/` into `studio/src/schemaTypes/documents/`
3. ✅ Removed old demo schema types (`page`, `post`, `person`, `settings`, object types)
4. ✅ Updated `studio/src/schemaTypes/index.ts` with new type imports
5. ✅ Updated `studio/sanity.config.ts` — new project title, presentation tool routes for blogPost/caseStudy/whoWeWorkWith
6. ✅ Updated `studio/src/structure/index.ts` — removed settings singleton reference
7. ✅ Installed `lucide-react` in studio (required by schema icon imports)
8. ✅ Updated `studio/.env` with new project ID
9. ✅ Exported data from old project `wkr9mx2c` (32 documents, 46 assets) — read-only, no impact to original
10. ✅ Imported data into new project `ce4idxlh`
11. ✅ Generated new API read token for `ce4idxlh` and configured in `frontend/.env.local`
12. ✅ Regenerated `sanity.schema.json` and `frontend/sanity.types.ts` from new studio schema (37 schema types, 17 query types)

---

## Phase 6.6: TypeScript Error Fixes ✅ (NEW)

Fixed all 12 TypeScript errors that existed after migration:

1. ✅ `sanity/lib/utils.ts:1` — Removed unused `Link` type import (not in generated types), updated `linkResolver` to use `DereferencedLink` only
2. ✅ `app/resources/tools-templates/page.tsx:44,58` — `downloadLink` null coalescing (`?? undefined`)
3. ✅ `app/resources/tools-templates/page.tsx:49,63` — `fileSize` null coalescing (`?? undefined`)
4. ✅ `app/resources/tools-templates/page.tsx:62` — `pageCount` null coalescing (`?? undefined`)
5. ✅ `app/who-we-work-with/[slug]/page.tsx:37` — `segment.hero?.description` optional chaining for metadata
6. ✅ `app/who-we-work-with/[slug]/page.tsx:67-72` — Wrapped `SegmentHero` in `{segment.hero && ...}` guard
7. ✅ `app/who-we-work-with/[slug]/page.tsx:73` — `logoUrl` null filtering with type predicate
8. ✅ `app/who-we-work-with/[slug]/page.tsx:80,88,90` — Array props defaulting to `|| []`

**Result: `npx tsc --noEmit` passes with zero errors.**

---

## Phase 7: What NOT to Copy ✅

- `sanity.config.ts`, `sanity.cli.ts` — studio config (studio has its own)
- `sanity/schemaTypes/`, `sanity/structure.ts` — studio schemas (copied extended types separately)
- `app/studio/` — embedded studio route
- `middleware.ts` — v2 route blocking (not needed)
- `app/(user-facing)/` — old v1 routes
- `components/landing-page/`, `components/navbar.tsx`, `components/footer.tsx` — v1 components
- `scripts/`, `data/*.ndjson` — migration/seed data
- `lib/cloudinary.ts` — server-side upload utility
- `copy-comparison-reports/`, `DEPLOYMENT-CHECKLIST.md`, PDFs

---

## Verification — ✅ MOSTLY COMPLETE

1. ✅ `npm run build` — compiles without errors, 39 pages generated (incl. sitemap.xml, API routes)
2. ⬜ `npm run dev` — manually verify homepage loads at `localhost:3000`
3. ⬜ Navigate to `/case-studies`, `/about`, `/what-we-do` — verify Sanity data loads
4. ⬜ Check `/resources/blog` — verify blog posts render with images
5. ⬜ Test newsletter signup form submission
6. ✅ Verify no `/v2/` links remain: confirmed via grep
7. ⬜ Verify no broken imports: check browser console for errors

---

## Remaining Work

### Must Do
| Task | Priority | Status |
|------|----------|--------|
| Copy `app/api/newsletter/subscribe/route.ts` from sanity-demo | High | ✅ |
| Copy `app/api/revalidate/route.ts` from sanity-demo | High | ✅ (enhanced for all content types) |
| Create `app/sitemap.ts` with all static + dynamic routes | Medium | ✅ |
| Update `sitemapData` query for new schema types (blogPost, caseStudy, whoWeWorkWith) | Medium | ✅ |
| Add `caseStudySlugsQuery` to queries.ts | Medium | ✅ |
| Add CORS origin `http://localhost:3000` on new Sanity project (manage.sanity.io) | High | ❌ (manual) |
| Manual smoke test of all pages in dev mode | Medium | ⬜ |

### Nice to Have
| Task | Priority | Status |
|------|----------|--------|
| Transfer Sanity project `ce4idxlh` from personal account to organization | Low | ⬜ |
| Configure production studio URL in env vars | Low | ⬜ |
| Deploy studio to Sanity hosting (`sanity deploy`) | Low | ⬜ |
| Set up Vercel deployment with env vars | Low | ⬜ |
| Clean up `sanity-export.tar.gz` from project root | Low | ⬜ |
