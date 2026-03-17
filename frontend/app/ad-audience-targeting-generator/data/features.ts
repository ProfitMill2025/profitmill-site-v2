import { TargetingFeature } from '../types';

export const categories = [
  'Search & Keywords',
  'Demographics',
  'Interests & Behavior',
  'Professional & B2B',
  'Retargeting & Custom Audiences',
  'Placement & Context',
];

export const features: TargetingFeature[] = [
  // ═══════════════════════════════════════════
  // SEARCH & KEYWORDS
  // ═══════════════════════════════════════════
  {
    id: 'search-keywords',
    name: 'Search Keyword Targeting',
    category: 'Search & Keywords',
    platforms: {
      google: {
        availability: 'full',
        description: 'Bid on keywords users search for in Google. Supports exact match, phrase match, and broad match types for granular control over which searches trigger your ads.',
        link: 'https://support.google.com/google-ads/answer/7478529',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not offer search keyword bidding. Users do not search on LinkedIn the way they do on Google.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'limited',
        description: 'Reddit supports keyword targeting that matches ads to posts and comments containing specified keywords. Not traditional search-intent keyword bidding.',
        link: 'https://www.business.reddit.com/advertise/targeting/keyword',
      },
      meta: {
        availability: 'none',
        description: 'Meta does not support search keyword targeting. Discovery is driven by interest and behavioral signals instead.',
        link: 'https://www.facebook.com/business/help/633474486707199',
      },
      x: {
        availability: 'full',
        description: 'Target users based on keywords they have searched for or included in their tweets. Supports both search keyword and timeline keyword targeting.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/keyword-targeting',
      },
    },
  },
  {
    id: 'contextual-keywords',
    name: 'Contextual Keyword Targeting',
    category: 'Search & Keywords',
    platforms: {
      google: {
        availability: 'full',
        description: 'Display and YouTube campaigns can target pages or videos that contain specific keywords. Your ads appear alongside relevant content across the Google Display Network.',
        link: 'https://support.google.com/google-ads/answer/1726458',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not offer contextual keyword targeting on content pages.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'full',
        description: 'Target posts and conversations containing specific keywords. Ads appear in context alongside relevant discussions, making them feel native to the conversation.',
        link: 'https://www.business.reddit.com/advertise/targeting/keyword',
      },
      meta: {
        availability: 'none',
        description: 'Meta does not use contextual keyword matching. Ad delivery is based on user profiles and behaviors, not page content.',
        link: 'https://www.facebook.com/business/help/633474486707199',
      },
      x: {
        availability: 'full',
        description: 'Timeline keyword targeting places your ads near tweets containing specified keywords, allowing contextual relevance in the feed.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/keyword-targeting',
      },
    },
  },
  {
    id: 'topic-targeting',
    name: 'Topic Targeting',
    category: 'Search & Keywords',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target entire categories of web content by topic (e.g., "Fitness," "Finance"). Your Display and YouTube ads appear on pages or videos classified under selected topics.',
        link: 'https://support.google.com/google-ads/answer/2497832',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not offer topic-based content targeting. Targeting is audience-attribute based (job title, company, etc.).',
        link: 'https://www.linkedin.com/help/lms/answer/a422631',
      },
      reddit: {
        availability: 'full',
        description: 'Reddit organizes content into subreddit communities by topic. While not labeled "topic targeting," community targeting effectively serves this purpose.',
        link: 'https://www.business.reddit.com/advertise/targeting/community-and-interest',
      },
      meta: {
        availability: 'limited',
        description: 'Meta groups interests into topic categories for targeting, but this is interest-based rather than content-based topic targeting.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'full',
        description: 'Conversation Topics targeting lets you reach people who have engaged with specific conversation themes, covering 10,000+ topics across 25 categories.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/conversation-targeting',
      },
    },
  },
  {
    id: 'negative-keywords',
    name: 'Negative Keywords',
    category: 'Search & Keywords',
    platforms: {
      google: {
        availability: 'full',
        description: 'Exclude specific keywords so your ads do not show for irrelevant searches. Essential for controlling spend and ensuring ad relevance in search campaigns.',
        link: 'https://support.google.com/google-ads/answer/2453972',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn allows forecasted audience exclusions and some keyword exclusions for content, but does not support traditional negative keyword lists.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'full',
        description: 'Exclude specific keywords to prevent your ads from appearing alongside unwanted content or conversations on Reddit.',
        link: 'https://www.business.reddit.com/advertise/targeting/keyword',
      },
      meta: {
        availability: 'limited',
        description: 'Meta offers brand safety controls and inventory filters rather than traditional negative keywords. You can exclude certain content categories.',
        link: 'https://www.facebook.com/business/help/1438478636941047',
      },
      x: {
        availability: 'full',
        description: 'Exclude keywords from your targeting to prevent your ads from appearing near tweets or searches containing those terms.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/keyword-targeting',
      },
    },
  },
  {
    id: 'in-market-intent',
    name: 'In-Market / Intent Audiences',
    category: 'Search & Keywords',
    platforms: {
      google: {
        availability: 'full',
        description: 'Reach users actively researching or comparing products/services in your category. Google detects purchase intent from search behavior, site visits, and content consumption.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn offers buyer intent data through integrations with Bombora and LinkedIn\'s own signals, primarily for B2B products and services.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not provide predefined in-market or intent audience segments. Keyword and community targeting can serve as intent proxies.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'limited',
        description: 'Meta identifies purchase-intent signals through behavioral targeting (e.g., users who recently searched for cars), though less granular than Google\'s in-market segments.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not provide in-market or intent-based audience segments. Keyword and conversation targeting can indicate interest but not purchase intent.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },

  // ═══════════════════════════════════════════
  // DEMOGRAPHICS
  // ═══════════════════════════════════════════
  {
    id: 'age-targeting',
    name: 'Age Targeting',
    category: 'Demographics',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target users by age ranges: 18-24, 25-34, 35-44, 45-54, 55-64, 65+, and Unknown. Available across Search, Display, and YouTube campaigns.',
        link: 'https://support.google.com/google-ads/answer/2580383',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn offers age targeting but only in broad ranges. Age data is inferred from graduation year and is less precise than other platforms.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'limited',
        description: 'Reddit offers broad age group targeting (18-24, 25-34, 35-54, 55+). Limited granularity compared to other platforms since Reddit does not require age at signup.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Precise age targeting from age 13+ (18+ for many ad types) with year-by-year granularity. Users self-report their birthday on Facebook/Instagram.',
        link: 'https://www.facebook.com/business/help/717368264947302',
      },
      x: {
        availability: 'full',
        description: 'Target by age ranges including 13-17 (limited), 18-24, 25-34, 35-49, 50+. Age is inferred from user signals and profile data.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/geo-gender-and-language-targeting',
      },
    },
  },
  {
    id: 'gender-targeting',
    name: 'Gender Targeting',
    category: 'Demographics',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target by Male, Female, or Unknown gender. Available across all campaign types. Gender is inferred from Google account data and browsing behavior.',
        link: 'https://support.google.com/google-ads/answer/2580383',
      },
      linkedin: {
        availability: 'full',
        description: 'Target by gender as self-reported in LinkedIn profiles. Available as a demographic filter layered on top of other targeting criteria.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'limited',
        description: 'Reddit offers gender targeting but with limited accuracy since gender is not required at registration and is largely inferred from behavior.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target by gender as self-reported in user profiles. Highly accurate since Facebook collects this data during account creation.',
        link: 'https://www.facebook.com/business/help/717368264947302',
      },
      x: {
        availability: 'full',
        description: 'Target by gender inferred from user profile data and behavioral signals on the platform.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/geo-gender-and-language-targeting',
      },
    },
  },
  {
    id: 'location-geo',
    name: 'Location / Geo Targeting',
    category: 'Demographics',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target by country, state/region, city, postal code, or radius around a location. Options to target people in, searching for, or regularly visiting a location.',
        link: 'https://support.google.com/google-ads/answer/1722043',
      },
      linkedin: {
        availability: 'full',
        description: 'Target by continent, country, state/region, metro area, or city. Location is based on the user\'s profile location and IP-based signals.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'full',
        description: 'Target by country, state/region, metro area (DMA), and city. Geolocation is determined by IP address and user-set location preferences.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target by country, state, city, postal code, DMA, or address with radius. Can target people living in, recently in, or traveling to a location.',
        link: 'https://www.facebook.com/business/help/202297959811696',
      },
      x: {
        availability: 'full',
        description: 'Target by country, state/region, metro area, city, or postal code. Location determined from profile, IP, and device GPS signals.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/geo-gender-and-language-targeting',
      },
    },
  },
  {
    id: 'language-targeting',
    name: 'Language Targeting',
    category: 'Demographics',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target users based on their Google interface language setting, browser language, or the language of pages they browse. Supports 40+ languages.',
        link: 'https://support.google.com/google-ads/answer/1722078',
      },
      linkedin: {
        availability: 'full',
        description: 'Target members based on the language of their LinkedIn profile. Supports 20+ languages for campaign targeting.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'limited',
        description: 'Reddit supports targeting by language preferences, though the majority of Reddit content is in English. Fewer language options than other platforms.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target users by language preference set in their profile. Useful for reaching multilingual audiences in the same geographic area.',
        link: 'https://www.facebook.com/business/help/1024084489118213',
      },
      x: {
        availability: 'full',
        description: 'Target users by the language of their profile and the language they tweet in. Supports 20+ languages.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/geo-gender-and-language-targeting',
      },
    },
  },
  {
    id: 'household-income',
    name: 'Household Income',
    category: 'Demographics',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target by household income tiers (top 10%, 11-20%, 21-30%, etc.). Available in select countries using aggregated data from public sources like census data.',
        link: 'https://support.google.com/google-ads/answer/2580383',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not offer direct income targeting. Company size and seniority can serve as proxies for income level.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support household income targeting. Community-based targeting can serve as an indirect proxy for certain income segments.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'limited',
        description: 'Meta offers income-based targeting through partner data and behavioral signals in some markets, but availability varies by country and has been reduced over time.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not offer household income targeting. Interest and follower-based targeting can serve as indirect proxies.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'education-level',
    name: 'Education Level',
    category: 'Demographics',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not offer education-level targeting. Other demographic dimensions (age, income) are available.',
        link: 'https://support.google.com/google-ads/answer/2580383',
      },
      linkedin: {
        availability: 'full',
        description: 'Target by degree type (Bachelor\'s, Master\'s, PhD, etc.), field of study, and specific schools/universities. Highly accurate since users self-report education.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support education-level targeting. Users rarely provide education info on their profiles.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target users by education level (high school, college, grad school), specific schools, and fields of study as reported on their Facebook profile.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not support education-level demographic targeting.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },

  // ═══════════════════════════════════════════
  // INTERESTS & BEHAVIOR
  // ═══════════════════════════════════════════
  {
    id: 'interest-categories',
    name: 'Interest Categories',
    category: 'Interests & Behavior',
    platforms: {
      google: {
        availability: 'full',
        description: 'Affinity audiences target users based on long-term interests and habits (e.g., "Outdoor Enthusiasts," "Foodies"). Hundreds of predefined categories available.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target members based on inferred professional and personal interests (e.g., "Artificial Intelligence," "Cloud Computing"). Derived from content engagement and group memberships.',
        link: 'https://www.linkedin.com/help/lms/answer/a422631',
      },
      reddit: {
        availability: 'full',
        description: 'Interest targeting reaches users who have engaged with content in predefined interest categories. Interests are derived from subreddit activity and content interaction.',
        link: 'https://www.business.reddit.com/advertise/targeting/community-and-interest',
      },
      meta: {
        availability: 'full',
        description: 'Detailed targeting by interests inferred from pages liked, content engaged with, and declared preferences. Thousands of interest categories across hobbies, entertainment, shopping, etc.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'full',
        description: 'Reach users who have shown interest in specific categories based on who they follow, what they tweet about, and content they engage with. 25+ top-level categories.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/interest-and-follower-targeting',
      },
    },
  },
  {
    id: 'behavioral-targeting',
    name: 'Behavioral Targeting',
    category: 'Interests & Behavior',
    platforms: {
      google: {
        availability: 'full',
        description: 'Custom segments let you target users based on recent search behavior, apps used, and places visited. Combines behavioral signals for high-intent audiences.',
        link: 'https://support.google.com/google-ads/answer/9805516',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn offers some behavioral signals like recent job changes, company growth, and content engagement patterns, but it is less behaviorally rich than consumer platforms.',
        link: 'https://www.linkedin.com/help/lms/answer/a422631',
      },
      reddit: {
        availability: 'limited',
        description: 'Reddit\'s behavioral targeting is primarily through community and keyword engagement. Direct behavioral segments (purchase, travel, etc.) are limited.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Extensive behavioral targeting including purchase behavior, device usage, travel patterns, and digital activities. Combines on-platform and partner data for rich segments.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'limited',
        description: 'Behavioral targeting is available through engagement patterns (retweets, likes, follows) and conversation participation, but dedicated behavioral segments are limited.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'affinity-lifestyle',
    name: 'Affinity / Lifestyle Audiences',
    category: 'Interests & Behavior',
    platforms: {
      google: {
        availability: 'full',
        description: 'Predefined affinity segments like "Luxury Shoppers," "Green Living Enthusiasts," and "Live Event Goers." Based on long-term browsing and content consumption patterns.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not offer lifestyle or affinity audience categories. Professional interest and job-based targeting serve different intent.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'limited',
        description: 'While Reddit does not label them "affinity audiences," community-based targeting effectively identifies lifestyle groups (e.g., r/VanLife, r/PersonalFinance).',
        link: 'https://www.business.reddit.com/advertise/targeting/community-and-interest',
      },
      meta: {
        availability: 'full',
        description: 'Meta\'s detailed targeting includes lifestyle categories like "Away from family," "New relationship," "Works from home," and hundreds of behavioral lifestyle segments.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not offer dedicated affinity or lifestyle audience segments. Interest and conversation targeting provide partial coverage.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'life-events',
    name: 'Life Events Targeting',
    category: 'Interests & Behavior',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target users experiencing major life events like "Recently married," "Recently moved," "About to graduate," or "New business owner." Powerful for timely, relevant ads.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn detects professional life events like "Recently promoted," "Started new job," or "New company founder" from profile changes.',
        link: 'https://www.linkedin.com/help/lms/answer/a422631',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not offer life events targeting. Users may discuss life events in communities, but there are no structured audience segments for them.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target users based on life milestones like "Newly engaged," "Newlywed," "Expecting parents," "Recently moved." Derived from profile updates and behavioral signals.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not offer dedicated life events audience segments.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'purchase-behavior',
    name: 'Purchase Behavior',
    category: 'Interests & Behavior',
    platforms: {
      google: {
        availability: 'limited',
        description: 'Google uses signals like search history and Shopping behavior to infer purchase intent, but does not expose granular purchase behavior segments directly.',
        link: 'https://support.google.com/google-ads/answer/9805516',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not track or expose consumer purchase behavior for targeting. B2B purchase intent is available through buyer intent signals.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support purchase behavior targeting. Community and keyword targeting can identify users in research/purchase phases indirectly.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target users based on purchase history and spending habits using partner data. Categories include "Engaged Shoppers," purchase recency, and product category buyers.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not offer purchase behavior targeting segments.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },

  // ═══════════════════════════════════════════
  // PROFESSIONAL & B2B
  // ═══════════════════════════════════════════
  {
    id: 'job-title',
    name: 'Job Title Targeting',
    category: 'Professional & B2B',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not offer job title targeting. Audience segments and in-market audiences provide some professional-adjacent targeting.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target specific job titles like "Marketing Manager," "Software Engineer," or "CFO." LinkedIn\'s most precise B2B targeting option, drawn from self-reported profile data.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support job title targeting. Professional subreddits can serve as proxies for reaching specific roles.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'limited',
        description: 'Meta offers job title targeting through self-reported profile data, but accuracy is lower than LinkedIn since work info is optional and less frequently updated.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not offer job title targeting. Bio keyword analysis is not available as a targeting option.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'job-function',
    name: 'Job Function / Role',
    category: 'Professional & B2B',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not support job function targeting.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target by broad job functions like "Marketing," "Engineering," "Finance," "Human Resources." Useful when job titles vary but functions are consistent.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support job function targeting.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'limited',
        description: 'Meta offers some job function targeting through employer and work-related interest categories, but it is far less granular than LinkedIn.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not support job function or role-based targeting.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'industry-targeting',
    name: 'Industry Targeting',
    category: 'Professional & B2B',
    platforms: {
      google: {
        availability: 'limited',
        description: 'Google does not offer direct industry targeting, but custom segments and in-market audiences can approximate industry-specific reach.',
        link: 'https://support.google.com/google-ads/answer/9805516',
      },
      linkedin: {
        availability: 'full',
        description: 'Target users by the industry of their current company (e.g., "SaaS," "Financial Services," "Healthcare"). Based on company profile classifications.',
        link: 'https://www.linkedin.com/help/lms/answer/a768089',
      },
      reddit: {
        availability: 'limited',
        description: 'No direct industry targeting, but industry-focused subreddits (r/SaaS, r/Healthcare) can serve as effective proxies.',
        link: 'https://www.business.reddit.com/advertise/targeting/community-and-interest',
      },
      meta: {
        availability: 'limited',
        description: 'Meta offers employer-based industry targeting but it is self-reported and less reliable. Interest-based industry categories are also available.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not offer industry-based audience targeting.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'company-name',
    name: 'Company Name Targeting',
    category: 'Professional & B2B',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not support targeting employees of specific companies.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target employees of specific companies by name (e.g., "Google," "Salesforce"). Ideal for account-based marketing (ABM). Supports uploading company lists.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support company-name-based targeting.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'limited',
        description: 'Meta allows targeting by employer name as a self-reported profile field, but accuracy and coverage are lower than LinkedIn.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'none',
        description: 'X does not support targeting by company or employer name.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'company-size',
    name: 'Company Size',
    category: 'Professional & B2B',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not support company size targeting.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target by company headcount ranges (1-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10000+). Perfect for segmenting SMB vs. enterprise audiences.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support company size targeting.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'none',
        description: 'Meta does not offer direct company size targeting.',
        link: 'https://www.facebook.com/business/help/633474486707199',
      },
      x: {
        availability: 'none',
        description: 'X does not offer company size targeting.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'seniority-level',
    name: 'Seniority Level',
    category: 'Professional & B2B',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not support seniority-based targeting.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target by seniority levels: Unpaid, Training, Entry, Senior, Manager, Director, VP, CXO, Owner/Partner. Critical for reaching decision-makers in B2B sales.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not support seniority-level targeting.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'none',
        description: 'Meta does not support seniority-level targeting.',
        link: 'https://www.facebook.com/business/help/633474486707199',
      },
      x: {
        availability: 'none',
        description: 'X does not support seniority-level targeting.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },

  // ═══════════════════════════════════════════
  // RETARGETING & CUSTOM AUDIENCES
  // ═══════════════════════════════════════════
  {
    id: 'website-retargeting',
    name: 'Website Visitor Retargeting',
    category: 'Retargeting & Custom Audiences',
    platforms: {
      google: {
        availability: 'full',
        description: 'Place a Google tag on your site to build audiences of past visitors. Segment by pages visited, time on site, or conversion events. Works across Search, Display, and YouTube.',
        link: 'https://support.google.com/google-ads/answer/2453998',
      },
      linkedin: {
        availability: 'full',
        description: 'Install the LinkedIn Insight Tag to retarget website visitors. Segment by pages visited or conversion events. Part of LinkedIn Matched Audiences.',
        link: 'https://www.linkedin.com/help/lms/answer/a420433',
      },
      reddit: {
        availability: 'full',
        description: 'Use the Reddit Pixel to track and retarget website visitors. Build audiences based on page visits and conversion events.',
        link: 'https://www.business.reddit.com/advertise/targeting/custom#website-retargeting',
      },
      meta: {
        availability: 'full',
        description: 'The Meta Pixel tracks website visitors for retargeting. Build custom audiences based on specific pages visited, actions taken, or time spent. Extremely granular segmentation.',
        link: 'https://www.facebook.com/business/help/610516375684216',
      },
      x: {
        availability: 'full',
        description: 'Install the X Pixel to track website visitors and create retargeting audiences. Segment by page visits, purchases, or other conversion events.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/custom-audiences/website-activity',
      },
    },
  },
  {
    id: 'customer-list',
    name: 'Customer List Upload',
    category: 'Retargeting & Custom Audiences',
    platforms: {
      google: {
        availability: 'full',
        description: 'Upload customer email lists, phone numbers, or mailing addresses via Customer Match. Google matches against signed-in users across Search, Shopping, YouTube, and Gmail.',
        link: 'https://support.google.com/google-ads/answer/6379332',
      },
      linkedin: {
        availability: 'full',
        description: 'Upload email lists or company lists for matched audiences. Also supports CRM integration through partners for automated list syncing.',
        link: 'https://www.linkedin.com/help/lms/answer/a421822',
      },
      reddit: {
        availability: 'full',
        description: 'Upload email lists to create custom audiences. Reddit matches hashed email addresses against its user base for targeting.',
        link: 'https://www.business.reddit.com/advertise/targeting/custom#customer-lists',
      },
      meta: {
        availability: 'full',
        description: 'Upload customer files with emails, phone numbers, names, or other identifiers. Meta matches against its users to build custom audiences. Supports automatic CRM syncing.',
        link: 'https://www.facebook.com/business/help/341425252616329',
      },
      x: {
        availability: 'full',
        description: 'Upload email lists or X usernames (@handles) as tailored audiences. Supports CRM list uploads and integration with data partners.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/custom-audiences/lists',
      },
    },
  },
  {
    id: 'lookalike-audiences',
    name: 'Lookalike / Similar Audiences',
    category: 'Retargeting & Custom Audiences',
    platforms: {
      google: {
        availability: 'full',
        description: 'Google\'s optimized targeting and audience expansion find new users similar to your converters. Performance Max campaigns use AI-driven audience signals for similar reach.',
        link: 'https://support.google.com/google-ads/answer/13541369',
      },
      linkedin: {
        availability: 'full',
        description: 'Create lookalike audiences from any matched audience or website audience. LinkedIn finds members with similar professional attributes to your seed audience.',
        link: 'https://www.linkedin.com/help/lms/answer/a1631056',
      },
      reddit: {
        availability: 'full',
        description: 'Build lookalike audiences based on your custom audience lists or pixel data. Reddit identifies users with similar interests and behaviors.',
        link: 'https://www.business.reddit.com/advertise/targeting/custom#lookalikes',
      },
      meta: {
        availability: 'full',
        description: 'Lookalike audiences are one of Meta\'s most powerful features. Create 1-10% lookalikes from any custom audience. The algorithm finds users with the highest similarity to your best customers.',
        link: 'https://www.facebook.com/business/help/164749007013531',
      },
      x: {
        availability: 'full',
        description: 'Create lookalike audiences from your tailored audiences to find users with similar characteristics and behaviors on the platform.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/audience-expansion',
      },
    },
  },
  {
    id: 'engagement-retargeting',
    name: 'Engagement Retargeting',
    category: 'Retargeting & Custom Audiences',
    platforms: {
      google: {
        availability: 'full',
        description: 'Retarget users who have engaged with your YouTube videos, Display ads, or Google Business profile. Build audiences based on views, clicks, or channel subscriptions.',
        link: 'https://support.google.com/google-ads/answer/2453998',
      },
      linkedin: {
        availability: 'full',
        description: 'Retarget users who have interacted with your LinkedIn Ads, Company Page, or Lead Gen Forms. Segment by engagement type and recency.',
        link: 'https://www.linkedin.com/help/lms/answer/a427551',
      },
      reddit: {
        availability: 'limited',
        description: 'Reddit offers some engagement-based retargeting options, but these are more limited compared to other platforms.',
        link: 'https://www.business.reddit.com/advertise/targeting/custom#reddit-engagement',
      },
      meta: {
        availability: 'full',
        description: 'Retarget anyone who engaged with your Facebook Page, Instagram profile, ads, events, or Instant Experiences. Extremely granular with engagement type and timeframe filters.',
        link: 'https://www.facebook.com/business/help/1090330204367211',
      },
      x: {
        availability: 'full',
        description: 'Retarget users who have engaged with your tweets, profile, or ads. Build audiences from impressions, engagements, video views, or link clicks.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/post-engager-targeting',
      },
    },
  },
  {
    id: 'video-retargeting',
    name: 'Video Viewer Retargeting',
    category: 'Retargeting & Custom Audiences',
    platforms: {
      google: {
        availability: 'full',
        description: 'Build audiences from YouTube video views, channel visits, or specific engagement actions (liked, commented, shared). Segment by view duration (25%, 50%, 75%, 100%).',
        link: 'https://support.google.com/google-ads/answer/2545661',
      },
      linkedin: {
        availability: 'full',
        description: 'Retarget users who have watched your LinkedIn video ads. Segment by percentage of video viewed (25%, 50%, 75%, 97%).',
        link: 'https://www.linkedin.com/help/lms/answer/a427086',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not currently support video viewer retargeting as a standalone audience builder.',
        link: 'https://www.business.reddit.com/advertise/targeting/custom#reddit-engagement',
      },
      meta: {
        availability: 'full',
        description: 'Create audiences from video views across Facebook and Instagram. Segment by watch time (3s, 10s, 25%, 50%, 75%, 95%) for precise funnel targeting.',
        link: 'https://www.facebook.com/business/help/1099865760056389',
      },
      x: {
        availability: 'full',
        description: 'Retarget users who have viewed your video ads on X. Useful for building sequential messaging funnels.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/post-engager-targeting',
      },
    },
  },

  // ═══════════════════════════════════════════
  // PLACEMENT & CONTEXT
  // ═══════════════════════════════════════════
  {
    id: 'site-app-placements',
    name: 'Specific Site / App Placements',
    category: 'Placement & Context',
    platforms: {
      google: {
        availability: 'full',
        description: 'Hand-pick specific websites, YouTube channels, YouTube videos, or apps on the Display Network where you want your ads to appear. Full control over ad environment.',
        link: 'https://support.google.com/google-ads/answer/2470108',
      },
      linkedin: {
        availability: 'none',
        description: 'LinkedIn does not support specific site or app placement targeting. Ads appear within the LinkedIn platform only.',
        link: 'https://www.linkedin.com/help/lms/answer/a423409',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit ads appear on Reddit only. There is no external placement network. Subreddit targeting is the placement equivalent.',
        link: 'https://www.business.reddit.com/advertise/targeting/community-and-interest',
      },
      meta: {
        availability: 'full',
        description: 'Choose specific placements across Facebook Feed, Instagram Feed, Stories, Reels, Messenger, and Meta\'s Audience Network partner apps and websites.',
        link: 'https://www.facebook.com/business/help/407108559393196',
      },
      x: {
        availability: 'none',
        description: 'X does not support external site or app placement targeting. Ads appear on the X platform (Home Timeline, Search, Profiles).',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'community-targeting',
    name: 'Community / Group Targeting',
    category: 'Placement & Context',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not have community or group-based targeting.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'limited',
        description: 'Target members of specific LinkedIn Groups. Coverage depends on group size and membership. Less commonly used than other LinkedIn targeting options.',
        link: 'https://www.linkedin.com/help/lms/answer/a422631',
      },
      reddit: {
        availability: 'full',
        description: 'Target specific subreddit communities (e.g., r/Startups, r/Marketing). Reddit\'s signature targeting feature—reach highly engaged niche communities directly.',
        link: 'https://www.business.reddit.com/advertise/targeting/community-and-interest',
      },
      meta: {
        availability: 'none',
        description: 'Meta does not offer Facebook Group targeting for ads. Group content is generally treated as private for ad targeting purposes.',
        link: 'https://www.facebook.com/business/help/633474486707199',
      },
      x: {
        availability: 'none',
        description: 'X does not offer community or group-based targeting (X Communities are not targetable in ads).',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting',
      },
    },
  },
  {
    id: 'follower-lookalikes',
    name: 'Follower / Page Lookalikes',
    category: 'Placement & Context',
    platforms: {
      google: {
        availability: 'none',
        description: 'Google Ads does not have a follower-based lookalike targeting feature.',
        link: 'https://support.google.com/google-ads/answer/2497941',
      },
      linkedin: {
        availability: 'full',
        description: 'Target followers of your Company Page or use Company Page followers as a seed for lookalike audiences.',
        link: 'https://www.linkedin.com/help/lms/answer/a1631056',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not offer follower-based targeting or lookalikes.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target people who like your Facebook Page or create lookalike audiences from your page fans. Connection-based targeting also includes friends of fans.',
        link: 'https://www.facebook.com/business/help/633474486707199',
      },
      x: {
        availability: 'full',
        description: 'Follower look-alikes target users similar to the followers of any specified @handle. A powerful way to reach audiences interested in competitors or industry leaders.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/interest-and-follower-targeting',
      },
    },
  },
  {
    id: 'event-moment',
    name: 'Event / Moment Targeting',
    category: 'Placement & Context',
    platforms: {
      google: {
        availability: 'limited',
        description: 'Google offers some seasonal and event-based audience segments, but lacks a dedicated real-time event targeting feature.',
        link: 'https://support.google.com/google-ads/answer/1704368',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn allows targeting of event attendees for LinkedIn Events you host, but does not offer broad event-moment targeting.',
        link: 'https://www.linkedin.com/help/lms/answer/a421211',
      },
      reddit: {
        availability: 'none',
        description: 'Reddit does not have a specific event or moment targeting feature.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'limited',
        description: 'Meta allows targeting based on event RSVPs and event-related interests. You can target people who responded to your Facebook Events.',
        link: 'https://www.facebook.com/business/help/182371508761821',
      },
      x: {
        availability: 'full',
        description: 'X excels at real-time event and moment targeting. Target conversations around live events, trending topics, sports, award shows, and cultural moments as they happen.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/conversation-targeting',
      },
    },
  },
  {
    id: 'device-os',
    name: 'Device & OS Targeting',
    category: 'Placement & Context',
    platforms: {
      google: {
        availability: 'full',
        description: 'Target by device type (desktop, mobile, tablet), operating system (iOS, Android, Windows), device models, carriers, and Wi-Fi connections. Full bid adjustments by device.',
        link: 'https://support.google.com/google-ads/answer/2732132',
      },
      linkedin: {
        availability: 'limited',
        description: 'LinkedIn supports basic device targeting (desktop vs. mobile) but does not offer OS, device model, or carrier-level targeting.',
        link: 'https://www.linkedin.com/help/linkedin/answer/a424655',
      },
      reddit: {
        availability: 'full',
        description: 'Target by device type (desktop, mobile), operating system (iOS, Android), and carrier. Useful for app install campaigns and platform-specific promotions.',
        link: 'https://www.business.reddit.com/advertise/targeting',
      },
      meta: {
        availability: 'full',
        description: 'Target by device type, OS (iOS, Android), OS version, specific device models, and network connection type (Wi-Fi, 2G/3G/4G/5G). Very granular device targeting.',
        link: 'https://www.facebook.com/business/help/717368264947302',
      },
      x: {
        availability: 'full',
        description: 'Target by platform (iOS, Android, desktop), device model, carrier, and new device users. Supports targeting users on specific device types.',
        link: 'https://business.x.com/en/help/campaign-setup/campaign-targeting/device-carrier-and-new-mobile-user-targeting',
      },
    },
  },
];
