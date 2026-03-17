import type { PlatformData, ToolData, ColumnDef } from '../types';

// ========== COLUMN DEFINITIONS ==========
export const columnDefinitions: ColumnDef[] = [
  {
    key: 'category',
    label: 'Category',
    definition:
      'The primary classification of the tool: ABM Platform (account-based marketing suite), Intent Data (tracks buying signals), Audience Builder (builds & syncs lists), Data Enrichment (appends firmographic/contact data), Ad Automation (automates campaign setup & targeting), Sales Intelligence (prospecting database), or Review Intent (buying signals from software review sites).',
  },
  {
    key: 'adPlatforms',
    label: 'Ad Platforms',
    definition:
      'Which paid advertising platforms (LinkedIn, Meta, Google, Reddit, X, Programmatic/DSP) the tool can push audience lists to. ✅ Full = native integration or direct sync. ⚠️ Partial = requires CSV export or a connector like LiveRamp. ❌ None = not supported.',
  },
  {
    key: 'companyLists',
    label: 'Company Lists',
    definition:
      'Can the tool output a list of target companies (account-level)? Used for LinkedIn Company Targeting, ABM display ads, or building account-based segments. ✅ Full = can generate & export company lists natively. ⚠️ Partial = limited filtering or manual export. ❌ None = not available.',
  },
  {
    key: 'contactLists',
    label: 'Contact Lists',
    definition:
      'Can the tool output a list of individual contacts (person-level) with emails, names, or phone numbers? Used for Customer Match on Google, Custom Audiences on Meta, Contact Targeting on LinkedIn, etc. ✅ Full = exports contact-level data. ⚠️ Partial = limited fields or volume. ❌ None = account-level only.',
  },
  {
    key: 'lookalikes',
    label: 'Lookalikes',
    definition:
      'Can the tool build lookalike or similar audiences from a seed list? This means finding new prospects who resemble your best customers using the tool\'s own data — separate from platform-native lookalikes (like Meta\'s). ✅ Full = built-in lookalike modeling. ⚠️ Partial = basic similarity matching. ❌ None = not available.',
  },
  {
    key: 'intentSignals',
    label: 'Intent Signals',
    definition:
      'Does the tool provide buying intent data — signals that a company or person is actively researching a topic or product category? Sources include web content consumption (Bombora), G2 product page visits, TechTarget editorial engagement, or proprietary website visitor tracking. ✅ Full = native intent data. ⚠️ Partial = via partner/add-on. ❌ None = no intent data.',
  },
  {
    key: 'audienceSync',
    label: 'Audience Sync',
    definition:
      'Can the tool automatically push and keep audience lists synced with ad platforms in real-time or on a schedule? This eliminates manual CSV uploads. ✅ Full = native auto-sync to ad platforms. ⚠️ Partial = sync via integration partner (e.g., LiveRamp) or limited platforms. ❌ None = manual export only.',
  },
  {
    key: 'resolution',
    label: 'Resolution',
    definition:
      'The granularity of the data: Account = company-level only (e.g., "Acme Corp is in-market"), Contact = individual person-level (e.g., "Jane Doe at Acme"), Both = supports both account and contact-level data. Contact-level is generally more valuable for paid ads since platforms match on personal identifiers.',
  },
  {
    key: 'priceTier',
    label: 'Price Tier',
    definition:
      'Relative cost bracket: Free = $0, $ = Under $5K/year, $$ = $5K–$25K/year, $$$ = $25K–$75K/year, $$$$ = $75K+/year. Actual pricing varies by usage, seats, and features.',
  },
  {
    key: 'priceRange',
    label: 'Est. Price Range',
    definition:
      'Estimated annual cost range based on publicly available pricing, G2/vendor disclosures, and industry benchmarks. Ranges reflect typical B2B mid-market deals. Actual pricing depends on data volume, seats, contract terms, and negotiation.',
  },
  {
    key: 'b2bFit',
    label: 'Best Fit',
    definition:
      'The company size segment this tool is best suited for: SMB = small teams with limited budget (<$5K/yr for tools), Mid-Market = growing teams with moderate budget ($5K–$50K/yr), Enterprise = large orgs with significant budget ($50K+/yr), All = serves multiple segments effectively.',
  },
];

// ========== PLATFORM AUDIENCE TYPES ==========
export const platformData: PlatformData[] = [
  {
    platform: 'Google Ads',
    logo: 'search',
    color: 'bg-blue-600',
    audienceTypes: [
      {
        name: 'Customer Match',
        description:
          'Upload hashed customer data (emails, phones, addresses) to target known users across Search, Shopping, Gmail, YouTube, and Display. Google matches your data against signed-in users. Match rates for B2B are typically 40–60% with work emails, higher with personal emails.',
        dataRequired: [
          'Email addresses (work or personal)',
          'Phone numbers (E.164 format)',
          'First name + Last name + Zip + Country (for address-based matching)',
          'Mobile device IDs (IDFA/GAID) — optional',
        ],
        minimumSize: '1,000 records minimum to upload; list must reach 100+ matched users on a network to be targetable',
        matchIdentifiers: ['Email (SHA256 hashed)', 'Phone', 'Address (name + zip + country)', 'Mobile device ID'],
        b2bNotes:
          'Work emails typically match at 40–60% (many B2B users don\'t sign into Google with work email). Tip: Append personal emails via enrichment tools (e.g., Clay, ZoomInfo) to boost match rates to 70–90%. Google automatically creates "similar audiences" from Customer Match lists — you cannot create standalone lookalikes.',
        bestFor: 'Retargeting existing customers/leads across Google properties; RLSA (bid adjustments on Search for known contacts)',
        helpUrl: 'https://support.google.com/google-ads/answer/6379332',
      },
      {
        name: 'Remarketing Lists (Website / App)',
        description:
          'Automatically build audiences from users who visited your website (via Google tag) or used your app. Can create rules-based segments (e.g., visited pricing page, spent 3+ min on site).',
        dataRequired: [
          'Google Ads remarketing tag installed on website',
          'OR Google Analytics 4 linked to Google Ads',
          'OR Firebase SDK for app remarketing',
        ],
        minimumSize: '1,000 active users in the past 30 days (Display); 1,000 for Search (RLSA)',
        matchIdentifiers: ['Google tag cookie', 'GA4 user ID', 'Firebase app user ID'],
        b2bNotes:
          'Essential for B2B — most high-intent visitors (pricing page, demo request page) don\'t convert on first visit. Combine with RLSA to bid higher on branded/competitor searches from known visitors. Membership duration up to 540 days.',
        bestFor: 'Re-engaging website visitors who didn\'t convert; building RLSA lists for Search bid adjustments',
        helpUrl: 'https://support.google.com/google-ads/answer/2453998',
      },
      {
        name: 'Similar Segments (Auto-Generated)',
        description:
          'Google automatically generates similar audiences from your Customer Match and remarketing lists. These find new users with similar characteristics to your seed audiences. You cannot create these manually — they\'re auto-generated when your seed list is large enough.',
        dataRequired: [
          'A qualifying seed audience (Customer Match or remarketing list)',
          'Seed list must have at least 1,000 members with sufficient recency',
        ],
        minimumSize: 'Auto-generated when seed list meets Google\'s quality threshold',
        matchIdentifiers: ['Google\'s proprietary signals (search history, browsing behavior, demographics)'],
        b2bNotes:
          'Quality depends heavily on your seed list quality. Best results come from high-intent seeds (e.g., closed-won customers) rather than broad lists. Google is phasing some similar audiences into optimized targeting — monitor performance closely.',
        bestFor: 'Prospecting for net-new leads who resemble your best customers or highest-intent visitors',
        helpUrl: 'https://support.google.com/google-ads/answer/7139569',
      },
    ],
  },
  {
    platform: 'LinkedIn Ads',
    logo: 'linkedin',
    color: 'bg-blue-700',
    audienceTypes: [
      {
        name: 'Company List (ABM)',
        description:
          'Upload a list of target companies to reach all LinkedIn members who work at those accounts. The gold standard for B2B account-based advertising. LinkedIn matches on company name and domain, with the best match rates of any social platform for B2B.',
        dataRequired: [
          'Company Name (required)',
          'Company Website/Domain (strongly recommended — improves match rate significantly)',
          'LinkedIn Company Page URL (optional but highest match accuracy)',
          'Industry, City, State, Country, Zip, Stock Symbol (optional — helps disambiguation)',
        ],
        minimumSize: '300+ matched companies required to serve ads',
        matchIdentifiers: ['Company Name', 'Website Domain', 'LinkedIn Company Page URL', 'Stock Symbol'],
        b2bNotes:
          'This is the #1 most-used B2B audience type across all platforms. Match rates are typically 60–85% for well-known companies, lower for SMBs/startups. Pro tip: Include the website domain — it dramatically improves matching. Combine with LinkedIn\'s job title/function/seniority layering to narrow within target accounts.',
        bestFor: 'ABM campaigns targeting specific named accounts; reaching decision-makers at target companies',
        helpUrl: 'https://www.linkedin.com/help/lms/answer/a425731',
      },
      {
        name: 'Contact List (Email Targeting)',
        description:
          'Upload a list of individual contacts with email addresses to target specific people on LinkedIn. LinkedIn matches against member profiles. Work email match rates are typically higher on LinkedIn (50–75%) than other social platforms because professionals use work emails for their LinkedIn accounts.',
        dataRequired: [
          'Email address (required — work emails match best)',
          'First Name, Last Name (recommended)',
          'Job Title, Company Name (optional — improves matching)',
          'Country, Google AAID, Apple IDFA (optional)',
        ],
        minimumSize: '300+ matched contacts required to serve ads',
        matchIdentifiers: ['Email (SHA256 hashed)', 'First Name + Last Name', 'Google AAID', 'Apple IDFA'],
        b2bNotes:
          'Work emails match significantly better on LinkedIn than on Meta or Google (where users sign up with personal emails). Best practice: Upload both work and personal emails in the same list for maximum match. LinkedIn auto-deduplicates. Refresh lists frequently as people change jobs.',
        bestFor: 'Targeting specific decision-makers by name; nurturing known leads through the funnel; event/webinar retargeting',
        helpUrl: 'https://www.linkedin.com/help/lms/answer/a425731',
      },
      {
        name: 'Lookalike Audiences',
        description:
          'LinkedIn generates a lookalike audience that finds members who are professionally similar to your source audience (company list, contact list, or website audience). Uses professional attributes like job title, skills, industry, and company size.',
        dataRequired: [
          'A source audience (Company List, Contact List, or Website Audience)',
          'Source audience must have 300+ matched members',
        ],
        minimumSize: 'Generated audience is typically 15x–20x your source; minimum 300 source members',
        matchIdentifiers: ['LinkedIn\'s professional graph (job title, skills, industry, company size, seniority)'],
        b2bNotes:
          'LinkedIn lookalikes are uniquely powerful for B2B because they\'re built on professional attributes rather than browsing behavior. A lookalike from your closed-won customer list finds people with similar job titles at similar companies. Choose source carefully — garbage in, garbage out.',
        bestFor: 'Scaling ABM beyond a finite account list; finding new prospects with similar professional profiles',
        helpUrl: 'https://www.linkedin.com/help/lms/answer/a420539',
      },
      {
        name: 'Website Retargeting (Insight Tag)',
        description:
          'Build audiences from LinkedIn members who visited specific pages on your website. Requires the LinkedIn Insight Tag. Can segment by URL, referral source, or time on site.',
        dataRequired: [
          'LinkedIn Insight Tag installed on website',
          'Specific URL rules or page groups defined in Campaign Manager',
        ],
        minimumSize: '300+ matched LinkedIn members in your website audience',
        matchIdentifiers: ['LinkedIn Insight Tag cookie matched to LinkedIn member profiles'],
        b2bNotes:
          'Extremely valuable for B2B because it combines website behavior with LinkedIn\'s professional data. You can retarget pricing page visitors with content tailored to their seniority level, or retarget blog readers with demo offers. Membership duration up to 180 days.',
        bestFor: 'Retargeting high-intent website visitors on LinkedIn; full-funnel nurturing from awareness to demo request',
        helpUrl: 'https://www.linkedin.com/help/lms/answer/a418880',
      },
    ],
  },
  {
    platform: 'Meta (Facebook & Instagram)',
    logo: 'facebook',
    color: 'bg-blue-500',
    audienceTypes: [
      {
        name: 'Custom Audience (Customer List)',
        description:
          'Upload hashed customer data to match against Facebook/Instagram users. Meta matches against its 3B+ user base. B2B match rates are typically 30–50% with work emails (most people use personal emails on Facebook), but can reach 70%+ with personal email enrichment.',
        dataRequired: [
          'Email addresses (personal emails match far better than work emails)',
          'Phone numbers',
          'First Name, Last Name',
          'City, State, Zip, Country',
          'Date of Birth, Gender (optional — improves match rate)',
          'Mobile Advertiser ID (IDFA/GAID) — optional',
        ],
        minimumSize: '100 records minimum upload; Meta recommends 1,000+ for effective delivery',
        matchIdentifiers: ['Email (SHA256)', 'Phone (SHA256)', 'MAID', 'Name + Location combo'],
        b2bNotes:
          'The biggest B2B challenge on Meta: work emails match poorly because people use personal emails for Facebook. Solution: Enrich your CRM data with personal emails (tools like Clay, ZoomInfo, Apollo) before uploading. This can boost match rates from ~35% to 70%+. Despite lower match rates, Meta\'s algorithm is excellent at finding the matched users.',
        bestFor: 'Retargeting known leads and customers across Facebook/Instagram; warming up prospects outside of work hours',
        helpUrl: 'https://www.facebook.com/business/help/170456843145568',
      },
      {
        name: 'Lookalike Audience',
        description:
          'Meta builds an audience of users who resemble your source Custom Audience. You choose the country and audience size (1%–10% of that country\'s users). 1% is closest match; 10% is broadest. Meta\'s lookalike algorithm is widely considered the most sophisticated across all ad platforms.',
        dataRequired: [
          'A source Custom Audience with 1,000+ matched users (more is better; 5K–10K ideal)',
          'Target country selection',
          'Audience percentage (1%–10%)',
        ],
        minimumSize: '1,000+ source audience members; output size depends on % and country (1% US ≈ 2.3M people)',
        matchIdentifiers: ['Meta\'s behavioral/demographic signals across Facebook, Instagram, WhatsApp, Messenger'],
        b2bNotes:
          'Even for B2B, Meta lookalikes can be surprisingly effective when seeded with high-quality data (e.g., closed-won customers with personal emails matched). Layer with interest/behavioral targeting (e.g., "business decision maker" or industry interests) to keep it B2B-focused. Start with 1%, test up to 3%.',
        bestFor: 'Scaling beyond your known audience; top-of-funnel B2B awareness campaigns on Instagram/Facebook',
        helpUrl: 'https://www.facebook.com/business/help/164749007013531',
      },
      {
        name: 'Website Custom Audience (Pixel)',
        description:
          'Build audiences from people who visited your website, tracked via the Meta Pixel. Can segment by specific pages, time spent, frequency, or events (e.g., "Add to Cart", "Lead" events). Works with Conversions API for server-side tracking.',
        dataRequired: [
          'Meta Pixel installed on website',
          'Conversions API (CAPI) recommended for improved tracking post-iOS 14.5',
          'Standard or custom events configured',
        ],
        minimumSize: '100+ matched users; 1,000+ recommended for consistent delivery',
        matchIdentifiers: ['Meta Pixel cookie', 'CAPI server events', 'fbclid (click ID)'],
        b2bNotes:
          'Useful for B2B retargeting, but smaller websites may struggle to build large enough audiences. Combine Pixel with CAPI for best match rates post-iOS 14.5. Pro tip: Create tiered audiences — 7-day, 30-day, 90-day visitors — with different ad messaging for each.',
        bestFor: 'Retargeting website visitors on Facebook/Instagram; building seed audiences for lookalikes',
        helpUrl: 'https://www.facebook.com/business/help/610516375684216',
      },
    ],
  },
  {
    platform: 'Reddit Ads',
    logo: 'message-circle',
    color: 'bg-orange-600',
    audienceTypes: [
      {
        name: 'Custom Audience (Email List)',
        description:
          'Upload SHA256-hashed email addresses to target Reddit users who match. Reddit\'s user base skews technical and developer-heavy, making it interesting for B2B tech, DevOps, cybersecurity, and developer tool companies.',
        dataRequired: [
          'Email addresses (SHA256 hashed before upload)',
          'Minimum 1,000 emails in the list',
        ],
        minimumSize: '1,000 emails minimum; Reddit recommends larger lists for better delivery',
        matchIdentifiers: ['Email (SHA256 hashed)'],
        b2bNotes:
          'Reddit match rates for B2B are generally low (20–40%) because many users use throwaway or personal emails. However, for tech/developer audiences, Reddit can reach prospects you can\'t find on LinkedIn. Best for supplementary reach, not primary targeting. Combine with subreddit interest targeting for B2B.',
        bestFor: 'Reaching technical B2B audiences (developers, IT, security) in a contextually relevant environment',
        helpUrl: 'https://business.reddithelp.com/s/article/custom-audiences',
      },
      {
        name: 'Custom Audience (Mobile Advertiser IDs)',
        description:
          'Upload mobile advertising IDs (IDFA for iOS, GAID for Android) to target Reddit mobile app users. Less common for B2B but useful for mobile-heavy developer/tech audiences.',
        dataRequired: [
          'Mobile Advertiser IDs (IDFA or GAID)',
          'Minimum 1,000 IDs',
        ],
        minimumSize: '1,000 IDs minimum',
        matchIdentifiers: ['Apple IDFA', 'Google GAID'],
        b2bNotes:
          'Limited B2B use case since mobile ad IDs are harder to acquire for business contacts. Most useful if you have a mobile app with B2B users or if an enrichment provider (like LiveRamp) can translate emails to MAIDs.',
        bestFor: 'Retargeting mobile app users who are B2B prospects; cross-device retargeting via identity resolution',
        helpUrl: 'https://business.reddithelp.com/s/article/custom-audiences',
      },
      {
        name: 'Website Retargeting (Reddit Pixel)',
        description:
          'Build audiences from Reddit users who visited your website, tracked via the Reddit Pixel. Can segment by specific URL patterns or standard events.',
        dataRequired: [
          'Reddit Pixel installed on website',
          'Event tracking configured (Page Visit, View Content, Lead, etc.)',
        ],
        minimumSize: 'Audience must reach sufficient size for Reddit to serve ads (no published minimum)',
        matchIdentifiers: ['Reddit Pixel cookie matched to logged-in Reddit users'],
        b2bNotes:
          'Useful as a supplementary retargeting channel if your target audience is active on Reddit. Best for tech, SaaS, and developer tool companies. Combine with subreddit targeting to build seed audiences, then retarget converters.',
        bestFor: 'Retargeting Reddit-active tech/developer prospects; supplementary touchpoint in multi-channel B2B campaigns',
        helpUrl: 'https://business.reddithelp.com/s/article/Reddit-Pixel',
      },
    ],
  },
  {
    platform: 'X (Twitter) Ads',
    logo: 'twitter',
    color: 'bg-gray-800',
    audienceTypes: [
      {
        name: 'Custom Audience (List Upload)',
        description:
          'Upload email addresses, X @usernames, or mobile advertising IDs to create a tailored audience. X matches against its user base. Particularly useful for B2B because you can target specific X handles of industry influencers, competitors\' followers, or known prospects.',
        dataRequired: [
          'Email addresses (plaintext or SHA256 hashed)',
          'X/Twitter @usernames',
          'Mobile Advertiser IDs (IDFA or GAID)',
          'One data type per audience (can\'t mix emails and usernames in same list)',
        ],
        minimumSize: '100 matched users minimum for the audience to become targetable',
        matchIdentifiers: ['Email', 'X @username/handle', 'Mobile Ad ID (IDFA/GAID)'],
        b2bNotes:
          'The @username targeting is unique to X and very powerful for B2B — you can build a list of handles of decision-makers in your target accounts, industry thought leaders\' followers, or conference attendees. Match rates for emails vary (30–50% for work emails). The 100-user minimum is the lowest threshold of any major platform.',
        bestFor: 'Targeting specific B2B influencers and their followers; reaching prospects in real-time industry conversations',
        helpUrl: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/custom-audiences/lists',
      },
      {
        name: 'Website Retargeting (X Pixel)',
        description:
          'Build audiences from X users who visited your website, tracked via the X Pixel (formerly Twitter Website Tag). Can segment by URL rules, referral path, or conversion events.',
        dataRequired: [
          'X Pixel installed on website',
          'Conversion events configured (Site Visit, Purchase, Download, etc.)',
        ],
        minimumSize: '100+ matched X users (lowest minimum of major platforms)',
        matchIdentifiers: ['X Pixel cookie matched to logged-in X users'],
        b2bNotes:
          'Good for retargeting people who clicked through from X posts or ads to your website. Particularly effective for thought leadership content distribution — retarget people who read your blog posts with product-focused ads. The low 100-user minimum makes it accessible for smaller B2B audiences.',
        bestFor: 'Retargeting X-referred traffic; nurturing thought leadership content readers into product interest',
        helpUrl: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/custom-audiences/web',
      },
      {
        name: 'Follower Lookalike Targeting',
        description:
          'Target users who are similar to followers of specified X accounts. This isn\'t a traditional custom audience, but X\'s native lookalike — you specify accounts and X targets users with similar interests and behaviors.',
        dataRequired: [
          'List of X @handles to use as seed (your account, competitors, industry influencers)',
          'No file upload required — done in campaign setup',
        ],
        minimumSize: 'No minimum — available for any public account',
        matchIdentifiers: ['X\'s interest graph (follows, likes, retweets, content consumption)'],
        b2bNotes:
          'Very useful for B2B prospecting — target lookalikes of industry publications, competitor accounts, or conference/event handles. Free and requires no data upload. Can layer with keyword targeting for precision. Works best when source accounts have engaged, relevant followers.',
        bestFor: 'Prospecting B2B audiences based on industry affinity; reaching followers of competitor brands or thought leaders',
        helpUrl: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/audience-targeting',
      },
    ],
  },
];

// ========== TOOLS MATRIX DATA ==========
export const toolsData: ToolData[] = [
  {
    name: '6sense',
    category: 'ABM Platform',
    website: '6sense.com',
    description:
      'Enterprise ABM platform with AI-powered predictive analytics and buyer journey orchestration. Uses proprietary intent signals, reverse IP identification, and predictive models to identify in-market accounts. Named a Forrester Wave Leader for ABM and B2B Intent Data (2024).',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'partial',
      X: 'partial',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'full',
      intentSignals: 'full',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: 'Proprietary intent (1T+ signals/week); reverse IP; Bombora partnership; AI predictive models',
    priceTier: '$$$$',
    priceRange: '$60K–$180K+/yr',
    bestFor: 'Enterprise teams running full-funnel ABM with large budgets and complex buying committees',
    topStrength: 'Best-in-class predictive analytics; Forrester Leader in ABM & Intent Data',
    b2bFit: 'Enterprise',
  },
  {
    name: 'Demandbase',
    category: 'ABM Platform',
    website: 'demandbase.com',
    description:
      'Comprehensive ABM platform combining intent data, account identification, advertising, and sales intelligence. Known for its B2B DSP (programmatic display) and account-level engagement analytics. One of the original ABM platforms.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'partial',
      X: 'partial',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'full',
      intentSignals: 'full',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: 'Proprietary intent + Bombora; reverse IP; 80M+ companies; AI-driven account scoring',
    priceTier: '$$$$',
    priceRange: '$50K–$150K+/yr',
    bestFor: 'Enterprise teams wanting an all-in-one ABM platform with built-in B2B programmatic display',
    topStrength: 'Built-in B2B DSP for programmatic; comprehensive account intelligence across the full funnel',
    b2bFit: 'Enterprise',
  },
  {
    name: 'RollWorks (NextRoll)',
    category: 'ABM Platform',
    website: 'rollworks.com',
    description:
      'Mid-market ABM platform with account-based advertising, retargeting, and sales automation. More accessible pricing than enterprise alternatives. Includes native programmatic display and cross-channel campaign orchestration.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'partial',
      Google: 'partial',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'partial',
      lookalikes: 'full',
      intentSignals: 'full',
      audienceSync: 'full',
    },
    dataResolution: 'Account',
    dataSource: 'Proprietary + Bombora; account-level signals; 300K+ data sources',
    priceTier: '$$$',
    priceRange: '$20K–$60K/yr',
    bestFor: 'Mid-market teams wanting ABM advertising without enterprise pricing; HubSpot users',
    topStrength: 'Most accessible ABM pricing; strong HubSpot integration; built-in retargeting',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'Influ2',
    category: 'ABM Platform',
    website: 'influ2.com',
    description:
      'Person-based advertising platform (not just account-based). Targets specific individuals within buying committees across programmatic display and social. Shows which specific contacts engaged with ads — unique among ABM vendors.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'none',
      intentSignals: 'partial',
      audienceSync: 'full',
    },
    dataResolution: 'Contact',
    dataSource: 'Customer CRM data + proprietary matching; person-level ad engagement tracking',
    priceTier: '$$$',
    priceRange: '$25K–$60K/yr',
    bestFor: 'B2B teams wanting person-level (not just account-level) ad targeting and engagement attribution',
    topStrength: 'Only platform showing which specific people saw and engaged with your ads',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'N.Rich',
    category: 'ABM Platform',
    website: 'nrich.ai',
    description:
      'European ABM advertising platform focused on account-based programmatic display with built-in intent-to-close analytics. Lighter-weight alternative to 6sense/Demandbase for teams focused primarily on ABM advertising.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'none',
      lookalikes: 'partial',
      intentSignals: 'full',
      audienceSync: 'full',
    },
    dataResolution: 'Account',
    dataSource: 'Proprietary + Bombora; account-level engagement tracking; European IP coverage',
    priceTier: '$$',
    priceRange: '$12K–$36K/yr',
    bestFor: 'European B2B teams wanting affordable ABM display advertising with strong EU coverage',
    topStrength: 'Best European IP coverage for ABM; accessible pricing; fast implementation',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'Bombora',
    category: 'Intent Data',
    website: 'bombora.com',
    description:
      'The dominant B2B intent data provider powering most ABM platforms. Bombora\'s Data Co-op aggregates content consumption signals from 5,000+ B2B publisher websites. Tracks "topic surge" — when a company researches a topic significantly more than baseline.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'none',
      lookalikes: 'none',
      intentSignals: 'full',
      audienceSync: 'partial',
    },
    dataResolution: 'Account',
    dataSource: 'Data Co-op: 5,000+ B2B publisher sites; consent-based content consumption tracking',
    priceTier: '$$$',
    priceRange: '$25K–$80K/yr',
    bestFor: 'Teams wanting pure intent data to power their own ABM stack or existing ad platforms',
    topStrength: 'Largest B2B intent data co-op; powers 60%+ of ABM platforms\' intent features',
    b2bFit: 'Enterprise',
  },
  {
    name: 'Intentsify',
    category: 'Intent Data',
    website: 'intentsify.io',
    description:
      'Multi-source intent data platform that aggregates signals from 5+ distinct intent sources (web, social, publications, etc.) and synthesizes them into a single "Intent Precision" score. Offers done-for-you content syndication and programmatic activation.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'partial',
      lookalikes: 'none',
      intentSignals: 'full',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: 'Aggregates 5+ intent sources; proprietary web crawling; Bombora partnership',
    priceTier: '$$$',
    priceRange: '$30K–$75K/yr',
    bestFor: 'Teams wanting multi-source intent data with built-in content syndication activation',
    topStrength: 'Multi-source intent aggregation; includes content syndication as an activation channel',
    b2bFit: 'Enterprise',
  },
  {
    name: 'Metadata.io',
    category: 'Ad Automation',
    website: 'metadata.io',
    description:
      'B2B demand generation platform that automates paid campaign execution across LinkedIn, Meta, and Google. Builds audiences from firmographic/technographic criteria, automatically experiments with creative/targeting combinations, and optimizes for pipeline (not just clicks).',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'partial',
      intentSignals: 'partial',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: '300M+ business profiles; enrichment from 15+ providers; Bombora intent integration',
    priceTier: '$$$',
    priceRange: '$40K–$80K/yr (+ ad spend)',
    bestFor: 'B2B marketing teams wanting to automate audience building and campaign optimization across LinkedIn/Meta/Google',
    topStrength: 'Autonomous audience building + multivariate testing; optimizes for pipeline not clicks',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'Clay',
    category: 'Audience Builder',
    website: 'clay.com',
    description:
      'AI-powered data enrichment and outreach platform that waterfall-enriches contacts from 100+ data providers. Clay Ads is a newer product that builds custom B2B audiences for paid advertising. Handles complex data transformations and enrichment workflows via a spreadsheet-like UI.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'partial',
      X: 'partial',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'partial',
      intentSignals: 'partial',
      audienceSync: 'partial',
    },
    dataResolution: 'Both',
    dataSource: 'Waterfall enrichment from 100+ providers; AI-powered data transformation',
    priceTier: '$$',
    priceRange: '$0–$720/mo ($0–$8.6K/yr)',
    bestFor: 'Growth teams wanting flexible, DIY audience building with waterfall enrichment across many data sources',
    topStrength: '100+ data providers in one platform; most flexible data enrichment workflows; spreadsheet-like UI',
    b2bFit: 'All',
  },
  {
    name: 'Primer',
    category: 'Audience Builder',
    website: 'sayprimer.com',
    description:
      'Purpose-built B2B audience building platform. Builds ad-ready audiences from firmographic/technographic/intent criteria and syncs them directly to LinkedIn, Meta, and Google. Designed specifically for the B2B paid media use case.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'full',
      intentSignals: 'partial',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: 'Multiple B2B data partners; enriches with personal emails + phone numbers for higher match rates',
    priceTier: '$$',
    priceRange: '$12K–$36K/yr',
    bestFor: 'B2B paid media teams wanting the simplest path from ICP criteria to ad-platform-ready audiences',
    topStrength: 'Purpose-built for B2B ads; personal email enrichment for 80%+ match rates on Meta/Google',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'G2 Buyer Intent',
    category: 'Review Intent',
    website: 'sell.g2.com',
    description:
      'Intent signals from the world\'s largest B2B software review site. Identifies companies actively researching your product category, viewing your profile, comparing you to competitors, or reading reviews in your space. Unique "hand-raiser" intent from actual buyer research behavior.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'partial',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'none',
      lookalikes: 'none',
      intentSignals: 'full',
      audienceSync: 'partial',
    },
    dataResolution: 'Account',
    dataSource: '2nd party: direct from G2.com buyer research activity; 90M+ annual visitors',
    priceTier: '$$$',
    priceRange: '$30K–$100K+/yr (bundled with G2 profile)',
    bestFor: 'B2B SaaS companies wanting to target companies actively researching their product category',
    topStrength: 'Highest-signal intent data — from actual product comparison behavior; competitor research alerts',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'ZoomInfo',
    category: 'Sales Intelligence',
    website: 'zoominfo.com',
    description:
      'The largest B2B contact and company database with 300M+ professional profiles, intent data (via Streaming Intent add-on), and integrated sales/marketing platform. Named a Gartner Customers\' Choice for ABM. Offers audience building, enrichment, and campaign orchestration.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'partial',
      Google: 'partial',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'partial',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'partial',
      intentSignals: 'full',
      audienceSync: 'partial',
    },
    dataResolution: 'Both',
    dataSource: '3rd party proprietary database; intent via Streaming Intent add-on',
    priceTier: '$$$',
    priceRange: '$15K–$40K/yr',
    bestFor: 'Teams wanting the largest contact database with integrated intent and ad syndication',
    topStrength: '300M+ contacts; only vendor named Gartner Customers\' Choice for ABM (2025)',
    b2bFit: 'All',
  },
  {
    name: 'Breeze Intelligence (Clearbit)',
    category: 'Data Enrichment',
    website: 'clearbit.com',
    description:
      'HubSpot-native data enrichment and buyer intent platform (formerly Clearbit). Provides real-time firmographic/technographic enrichment, website visitor identification, and lead scoring within HubSpot.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'partial',
      Google: 'partial',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'none',
      intentSignals: 'partial',
      audienceSync: 'partial',
    },
    dataResolution: 'Both',
    dataSource: '1st party website + proprietary enrichment; 200M+ buyer/company profiles',
    priceTier: '$$',
    priceRange: '$540–$100K+/yr (credit-based; requires HubSpot)',
    bestFor: 'HubSpot-native teams wanting enrichment-driven audience building without a separate platform',
    topStrength: 'Deepest HubSpot integration; real-time enrichment and visitor ID in native CRM workflows',
    b2bFit: 'All',
  },
  {
    name: 'Apollo.io',
    category: 'Sales Intelligence',
    website: 'apollo.io',
    description:
      'All-in-one prospecting platform with 270M+ contacts, Bombora-powered intent data, and built-in email/dialer. Most accessible intent data offering for startups and SMBs.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'none',
      intentSignals: 'partial',
      audienceSync: 'none',
    },
    dataResolution: 'Both',
    dataSource: '3rd party; 270M+ contacts + Bombora & LeadSift intent data',
    priceTier: '$',
    priceRange: '$0–$1.4K/user/yr',
    bestFor: 'Startups and SMBs wanting affordable contact + intent data for list building',
    topStrength: 'Most accessible pricing; free tier; 270M+ contacts for lead list building',
    b2bFit: 'SMB',
  },
  {
    name: 'Cognism',
    category: 'Sales Intelligence',
    website: 'cognism.com',
    description:
      'GDPR-compliant B2B contact database with phone-verified mobile numbers (Diamond Data) and Bombora-powered intent. Strongest option for European-focused teams.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'none',
      intentSignals: 'full',
      audienceSync: 'none',
    },
    dataResolution: 'Both',
    dataSource: '3rd party; Bombora intent (~70%) + proprietary; phone-verified Diamond Data',
    priceTier: '$$$',
    priceRange: '$15K–$100K+/yr',
    bestFor: 'EU/UK-focused B2B teams needing GDPR-compliant contact and intent data',
    topStrength: 'Strongest GDPR compliance; phone-verified mobile numbers with high connect rates',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'LiveRamp',
    category: 'Audience Builder',
    website: 'liveramp.com',
    description:
      'Enterprise data connectivity platform for identity resolution and audience activation. Connects 1st-party data to 500+ marketing platforms via privacy-safe identity graph. Used by many ad platforms for CRM matching.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'full',
      X: 'full',
      Programmatic: 'full',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'partial',
      intentSignals: 'none',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: 'Identity graph resolution (1st party → cookie/MAID/CTV); 500+ platform integrations',
    priceTier: '$$$',
    priceRange: '$25K–$100K+/yr',
    bestFor: 'Enterprise teams needing to activate 1st-party data across every ad platform with identity resolution',
    topStrength: 'Widest platform coverage (500+); privacy-safe identity graph; industry standard for data onboarding',
    b2bFit: 'Enterprise',
  },
  {
    name: 'Warmly',
    category: 'Data Enrichment',
    website: 'warmly.ai',
    description:
      'Website visitor identification platform that reveals both accounts and individual people visiting your site. Combines signals from Bombora, Clearbit, and 20+ data providers. Includes automated chat/email outreach for identified visitors.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'none',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'none',
      intentSignals: 'full',
      audienceSync: 'none',
    },
    dataResolution: 'Both',
    dataSource: '1st party website + Bombora 3rd party; 20+ data providers for validation',
    priceTier: '$$',
    priceRange: '$0–$25K/yr',
    bestFor: 'SMBs wanting person-level website identification + automated outreach without a full ABM platform',
    topStrength: 'Person-level (not just account) website visitor ID; free tier available',
    b2bFit: 'SMB',
  },
  {
    name: 'AudienceLab',
    category: 'Audience Builder',
    website: 'audiencelab.io',
    description:
      'Data-as-a-Service audience building platform for advertisers and agencies. Builds, enriches, and activates verified B2B and B2C audiences with claimed 95% verified accuracy across ad platforms.',
    adPlatforms: {
      LinkedIn: 'full',
      Meta: 'full',
      Google: 'full',
      Reddit: 'partial',
      X: 'partial',
      Programmatic: 'partial',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'partial',
      intentSignals: 'none',
      audienceSync: 'full',
    },
    dataResolution: 'Both',
    dataSource: 'Proprietary verified data; claims 95% data accuracy',
    priceTier: '$$',
    priceRange: 'Custom; DaaS model',
    bestFor: 'Agencies and advertisers wanting verified audience data with full ownership',
    topStrength: 'Full data ownership model; 95% claimed accuracy; agency-friendly DaaS',
    b2bFit: 'Mid-Market',
  },
  {
    name: 'TechTarget (Priority Engine)',
    category: 'Intent Data',
    website: 'techtarget.com',
    description:
      'Editorial intent data from technology-focused publisher network. Opt-in, contact-level signals from 32M+ B2B tech professionals consuming research content. Includes content syndication.',
    adPlatforms: {
      LinkedIn: 'partial',
      Meta: 'none',
      Google: 'none',
      Reddit: 'none',
      X: 'none',
      Programmatic: 'partial',
    },
    outputTypes: {
      companyLists: 'full',
      contactLists: 'full',
      lookalikes: 'none',
      intentSignals: 'full',
      audienceSync: 'partial',
    },
    dataResolution: 'Contact',
    dataSource: '2nd party editorial; opt-in signals from 32M+ B2B tech professionals',
    priceTier: '$$$$',
    priceRange: '$60K–$180K/yr',
    bestFor: 'Tech vendors selling to IT buyers, cybersecurity teams, cloud/infrastructure buyers',
    topStrength: 'Contact-level intent from editorial content; Forrester Leader + Customer Favorite',
    b2bFit: 'Enterprise',
  },
];
