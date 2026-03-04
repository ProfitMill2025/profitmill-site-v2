# Figma Verification Methodology

## Core Principle

**Never read text from screenshots when exact text is available.**

This methodology uses text extraction over OCR to eliminate character confusion errors (e.g., "$3K" misread from "$5K"). Screenshots are only used for opaque `<instance>` nodes that don't expose text in metadata.

| Data Source | Tool | Accuracy |
|-------------|------|----------|
| Figma `<text>` nodes via `get_metadata` | Exact text in `name` attribute | 100% |
| Figma FAQ pages via `get_metadata` | Exact expanded FAQ answers | 100% |
| Chrome DevTools `take_snapshot` | Exact text from a11y tree | 100% |
| Sanity CMS API query | Exact CMS content | 100% |
| Figma `<instance>` screenshots | Visual reading (section-level only) | ~95% |

## Tools & Their Roles

### 1. `get_metadata` (PRIMARY — Exact Text Extraction)
- Returns the page node tree with IDs, names, types, positions
- `<text>` node `name` attributes contain the **exact visible text** — 100% accurate
- `<frame>` nodes — expand recursively, extract nested `<text>` nodes
- `<instance>` nodes — these are **opaque**, record their IDs for screenshots
- Nodes with `hidden="true"` are not visible — skip them
- Use this FIRST to extract ~60-70% of page text without any screenshots

### 2. `get_screenshot` (SECONDARY — Opaque Instances Only)
- Screenshot individual `<instance>` nodes at section level (~1360x600px)
- **Never screenshot full pages** — text becomes unreadable at full-page scale
- This is 10-15x more readable than a full-page screenshot
- Only use for `<instance>` nodes that don't expose text in metadata

### 3. Chrome DevTools `take_snapshot` (Site Text Extraction)
- Returns exact text from the accessibility tree — headings, paragraphs, buttons, links, list items
- Compare against `http://localhost:3000` (NOT production — production is the old site)
- 100% accurate text extraction, eliminates OCR errors on the site side

### 4. Sanity CMS API (Dynamic Content)
- Query FAQ and CMS content directly via REST API
- More accurate than expanding accordions in the browser
- Sanity project: `ce4idxlh`, dataset: `production`

### 5. `get_design_context` (DO NOT USE for verification)
- Returns all variant types for shared components — variant pollution makes it unreliable
- **Never use this tool during verification workflows**

## Reference Files

### `frontend/data/figma-page-map.ts`
- Maps every site route to its Figma node ID and page name
- Includes **dedicated FAQ page entries** with their own node IDs (e.g., `667:4495` for homepage FAQ)
- FAQ pages in Figma show all answers **fully expanded** — exact text available via metadata

### `frontend/data/faqs.tsx`
- Contains **hardcoded fallback** FAQ content for homepage, pricing, and sub-pages
- **WARNING**: This data can be stale — the homepage pulls FAQs from Sanity CMS, not this file
- Only relevant for pages that don't pull from Sanity

## Verification Workflow

### Step 1: Extract Figma Text (Metadata-First)

**1a. Get page structure and direct text:**
```
get_metadata(pageNodeId)
```
- All `<text>` nodes → exact text is in the `name` attribute. Record every one.
- All `<frame>` nodes → expand recursively, extract nested `<text>` nodes.
- All `<instance>` nodes → these are OPAQUE. Record their node IDs for Step 1b.
- Skip nodes with `hidden="true"`.

**1b. Screenshot opaque `<instance>` nodes only:**
```
For each <instance> node at the section level:
  get_screenshot(instanceNodeId)
```
- Read text from these section screenshots carefully.

**1c. Get FAQ text from dedicated FAQ pages (if applicable):**
```
If the page has a FAQ Node ID in figma-page-map.ts:
  get_metadata(faqNodeId)
```
- Dedicated FAQ pages show all answers fully expanded.
- All `<text>` nodes contain exact question and answer text.

### Step 2: Extract Site Text

**2a. Chrome DevTools accessibility snapshot:**
```
navigate_page(url: "http://localhost:3000/{route}")
take_snapshot()
```
- Returns exact text from the a11y tree.
- For accordion/FAQ content: use Sanity query (Step 2b) instead of expanding in browser.

**2b. Sanity CMS query for dynamic content:**

For pages with CMS-managed FAQs:
```bash
curl -s "https://ce4idxlh.api.sanity.io/v2025-09-25/data/query/production?query=*[_type==\"pageFaqs\"%26%26pageSlug.current==\"{PAGE_SLUG}\"][0]{faqs[]{question,answer}}" | python3 -m json.tool
```

For segment pages (b2b-saas, plg, services) with full CMS content:
```bash
curl -s "https://ce4idxlh.api.sanity.io/v2025-09-25/data/query/production?query=*[_type==\"whoWeWorkWith\"%26%26slug.current==\"{SLUG}\"][0]{headline,description,buttonText,logoSectionTitle,logos[]{name},benefits{title,description,items[]{title,description}},comparison{mainTitle,problemsTitle,problems[],solutionsTitle,solutions[],ctaButtonText},faqs[]{question,answer},cta{title,subtitle,buttonText}}" | python3 -m json.tool
```

**2c. Source code (for hardcoded content):**
- Read component source files to catch stale hardcoded fallbacks
- Only needed when text doesn't come from Sanity

### Step 3: Compare — Section by Section

For each section on the page:

1. **Metadata text vs a11y snapshot** → direct string comparison (100% accurate)
2. **Instance screenshots vs a11y snapshot** → visual comparison at section level
3. **Sanity CMS vs Figma metadata** → catches CMS drift from design
4. **Source code vs Figma** → catches stale hardcoded fallbacks

### Step 4: Classify Findings

| Status | Meaning |
|--------|---------|
| **MATCH** | Identical text |
| **MISMATCH** | Same section, different wording — include both versions and source location |
| **MISSING_FROM_SITE** | In Figma but not on live site |
| **MISSING_FROM_FIGMA** | On live site but not in Figma design |
| **CMS_DRIFT** | Sanity CMS content differs from Figma (Figma is source of truth) |
| **STALE_FALLBACK** | Hardcoded fallback data doesn't match Figma or Sanity |

### Step 5: Fix Discrepancies

**Figma is always the source of truth.** When fixing:

- **Code mismatches** → Edit the component file directly
- **CMS drift** → Patch Sanity via API using write token from `frontend/.env.local`
- **Stale fallbacks** → Update the hardcoded data file (only if the page actually uses it)

## What NOT To Do

- Do NOT use `get_design_context` — variant pollution makes it unreliable
- Do NOT screenshot full Figma pages — text becomes unreadable
- Do NOT read text from screenshots when `get_metadata` gives exact text
- Do NOT compare against profitmill.io — that's the old production site
- Do NOT report discrepancies without verification from at least two sources
- Do NOT assume testimonials/case studies must match Figma — they're CMS-managed, flag but note
- Do NOT assume collapsed accordion content is missing — query Sanity directly
- Do NOT update `faqs.tsx` for pages that pull from Sanity CMS — update Sanity directly
