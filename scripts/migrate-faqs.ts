/**
 * FAQ Migration Script
 *
 * Generates NDJSON for importing FAQ data into Sanity.
 * Converts hardcoded FAQ content (from data/faqs.tsx and old what-we-do/faqs-section.tsx)
 * into Portable Text format suitable for the `pageFaqs` document type.
 *
 * Usage:
 *   npx tsx scripts/migrate-faqs.ts > faqs.ndjson
 *   cd studio && npx sanity dataset import ../faqs.ndjson production
 *
 * Or with a write token:
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/migrate-faqs.ts --import
 */

import { createClient } from '@sanity/client'
import { uuid } from '@sanity/uuid'

// --- Portable Text Helpers ---

function key(): string {
  return uuid().slice(0, 12)
}

/** Plain text paragraph */
function paragraph(text: string): object {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

/** Paragraph with mixed text and link spans */
function paragraphWithLinks(
  ...parts: (string | { text: string; href: string })[]
): object {
  const markDefs: object[] = []
  const children: object[] = []

  for (const part of parts) {
    if (typeof part === 'string') {
      children.push({ _type: 'span', _key: key(), text: part, marks: [] })
    } else {
      const linkKey = key()
      markDefs.push({ _type: 'link', _key: linkKey, href: part.href })
      children.push({
        _type: 'span',
        _key: key(),
        text: part.text,
        marks: [linkKey],
      })
    }
  }

  return { _type: 'block', _key: key(), style: 'normal', markDefs, children }
}

/** Bullet list items (each becomes its own block) */
function bulletItems(...items: string[]): object[] {
  return items.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }))
}

// --- FAQ Document Builder ---

interface FaqEntry {
  question: string
  answer: object[]
  defaultOpen?: boolean
}

function faqDoc(
  pageTitle: string,
  pageSlug: string,
  faqs: FaqEntry[]
): object {
  return {
    _type: 'pageFaqs',
    _id: `pageFaqs-${pageSlug}`,
    pageTitle,
    pageSlug: { _type: 'slug', current: pageSlug },
    faqs: faqs.map((faq) => ({
      _type: 'object',
      _key: key(),
      question: faq.question,
      answer: faq.answer,
      defaultOpen: faq.defaultOpen ?? false,
    })),
  }
}

// ============================================================
// FAQ DATA — Converted from hardcoded sources to Portable Text
// ============================================================

// --- HOMEPAGE FAQs ---
const homepageFaqs: FaqEntry[] = [
  {
    question: 'What is your pricing model?',
    answer: [
      paragraphWithLinks(
        'We offer three pricing packages starting at $5K/month—built to match your stage and growth goals. You can check out the details on our ',
        { text: 'Pricing page', href: '/paid-ads-pricing' },
        '.'
      ),
      paragraphWithLinks(
        "Not sure what's right for you? ",
        {
          text: 'Book a free audit',
          href: 'https://app.hellobonsai.com/s/profitmill/googleadsaudit',
        },
        " and we'll point you in the right direction."
      ),
    ],
    defaultOpen: true,
  },
  {
    question: "How do I know if I'm ready for paid ads?",
    answer: [
      paragraph(
        "You're ready if you have a validated market fit and budget to test and optimize — not just buy leads overnight. You'll also need clear messaging and a well designed landing page, but we can help you with all that."
      ),
    ],
  },
  {
    question: 'Can you help with the visuals and creative for ads?',
    answer: [
      paragraph(
        'Absolutely. While we focus on strategy and performance, we have a network of trusted creative partners to help you craft assets that actually convert. Creative support is included in our top two pricing plans.'
      ),
    ],
  },
  {
    question: 'What paid ad platforms do you support?',
    answer: [
      paragraph(
        'We support our clients with all of the paid ad platforms out there, especially the ones used extensively for B2B marketing:'
      ),
      ...bulletItems(
        'LinkedIn Ads',
        'Bing, Meta, Reddit',
        'G2, Capterra, and other B2B review channels',
        'SEO',
        'Content marketing'
      ),
      paragraph(
        "If we don't have the expertise in-house, we reach out to our extensive network of highly skilled subcontractors to accomplish your goals (eg. website redesigns, graphic creation, complex technical integrations, etc.)."
      ),
    ],
  },
  {
    question: 'What kind of businesses do you work with?',
    answer: [
      paragraph(
        "We work with B2B and B2B2C companies focused on lead generation — including PLG startups, SaaS platforms, AI companies, and professional service businesses. Whether you're in tech, healthcare, or consulting, if your goal is to turn paid ads into pipeline, we're a great fit."
      ),
      paragraph(
        "We don't work with e-commerce brands, but if that's you, we're happy to recommend someone who does."
      ),
    ],
  },
  {
    question: 'How often will you be in touch?',
    answer: [
      paragraph('You can choose from two options:'),
      ...bulletItems(
        'Regular weekly or bi-weekly meetings, depending on your needs.',
        'Async catch ups via Slack with the option for ad-hoc meetings as needed.'
      ),
      paragraph(
        "Plus we're always available to answer questions when they arise."
      ),
    ],
  },
  {
    question: 'How long until I start seeing results?',
    answer: [
      paragraph(
        "It usually takes 1–3 months to build and test a profitable ad engine. That said, you'll start seeing improvements in tracking and campaign performance within the first few weeks of working together."
      ),
      paragraph(
        "The exact timeline depends on your industry, competition, and current marketing setup—but we'll give you a clear and honest outlook from day one."
      ),
    ],
  },
]

// --- PRICING FAQs ---
const pricingFaqs: FaqEntry[] = [
  {
    question: 'How much ad spend do I need on top of your fee?',
    answer: [
      paragraph(
        'We typically recommend $3,000/month as a healthy starting spend on Google or LinkedIn. If your spend is lower than that, the data comes in too slowly to make smart decisions. Actual cost can vary depending on the level of auction competition and the estimated cost per click.'
      ),
    ],
    defaultOpen: true,
  },
  {
    question: 'Do your fees scale with ad spend?',
    answer: [
      paragraph(
        'Our fees scale in tiers that align with your ad spend range and the level of support you need.'
      ),
      paragraph(
        'Smaller budgets typically fit into our Explore plan, while higher spend ranges unlock additional services like multi-channel management, landing page creation, and advanced tracking.'
      ),
      paragraph(
        "This way, pricing stays predictable and you only move up a tier when your ad spend and service scope increase."
      ),
    ],
  },
  {
    question: 'Is there a minimum contract length?',
    answer: [
      paragraph(
        "We work month-to-month. Most clients stay with us well beyond that, but we don't lock you into long-term contracts. While we recommend committing to at least 3 months to gauge performance, you'll know if it's working within the first few weeks."
      ),
    ],
  },
  {
    question: 'Do you charge additional setup fees?',
    answer: [
      paragraph(
        'No, what you see is what you pay. No setup fees or hidden costs. Our onboarding, conversion tracking setup, and campaigns are included in your monthly retainer.'
      ),
    ],
  },
  {
    question: 'How do I know which package is right for me?',
    answer: [
      paragraph(
        "It comes down to your company stage, budget, and ambition for paid ads. Early-stage teams who are just starting paid ads usually start with Explore, while Series A+ companies go for Invest or Scale. If you're unsure, book a call and we'll point you to the right fit."
      ),
    ],
  },
  {
    question: 'What if I need to upgrade or downgrade later?',
    answer: [
      paragraph(
        'No problem. Our flexible monthly contracts let you move between packages as your budget or growth goals change.'
      ),
    ],
  },
  {
    question: 'How quickly will I see results?',
    answer: [
      paragraph(
        "You'll start gaining insights within the first 1–2 weeks of working with us. Meaningful results like qualified leads, pipeline, revenue signals usually come in 4–8 weeks depending on your sales cycle."
      ),
    ],
  },
  {
    question: 'Can you guarantee results?',
    answer: [
      paragraph(
        "We don't guarantee specific results and no serious agency should. What we do guarantee is a proven process, clear reporting, and a decade of experience running paid ads for B2B teams. Most clients know fairly quickly if it's working."
      ),
    ],
  },
  {
    question: 'Do you work with businesses of my size/industry?',
    answer: [
      paragraph(
        "We specialize in B2B business, namely SaaS, PLG, and service companies from Seed stage to Series B+. If you're an ambitious team looking to scale with paid ads, we can probably help."
      ),
    ],
  },
  {
    question: 'Why are your fees higher/lower than other agencies?',
    answer: [
      paragraph(
        "We're not the cheapest option, and we're not trying to be. Unlike freelance or junior teams, you're getting performance marketing experts with years of in-house experience. That means fewer wasted dollars, faster insights, and strategies that scale."
      ),
    ],
  },
  {
    question:
      'Do you just run ads, or can you help with creative and landing pages too?',
    answer: [
      paragraph(
        "We go beyond ad execution. Depending on your plan, we can handle everything from ad copy and creative to landing pages. You'll get strategic input throughout—and if you'd prefer to work with your own team, we're happy to collaborate or connect you with trusted experts in our network."
      ),
    ],
  },
  {
    question: 'Do you work with small businesses?',
    answer: [
      paragraph(
        "We work best for high-growth B2B and B2C2B companies—especially those with a product-led motion and clear demand signals. If you're still pre–product-market fit or don't yet have the budget to scale profitably with paid ads, it's probably too early to work with us. But if you're seeing traction and ready to capture that demand, let's talk."
      ),
    ],
  },
  {
    question:
      'Why does your Explore plan only include Google or LinkedIn? Can I start on a different channel?',
    answer: [
      paragraph(
        "After working with 1000+ ad accounts, we see the same pattern. Clients who have budget constraints need results fast to prove paid ads are worth the investment. They're looking for short-term profit over long-term growth, and the most effective way to drive ROI early is to focus on one high-intent channel—Google Ads or LinkedIn Ads—before expanding."
      ),
      paragraph(
        'Whether you start with search or social depends on your offer and audience. Either way, we help you nail the foundation first, then scale from there.'
      ),
    ],
  },
]

// --- GOOGLE ADS FAQs ---
const googleAdsFaqs: FaqEntry[] = [
  {
    question: 'What exactly does Profit Mill do for my Google Ads?',
    answer: [
      paragraph(
        "Profit Mill takes care of your Google Ads by setting up, managing, and tracking your campaigns so you spend less on unqualified leads and more on results that increase profit. Your account is in the hands of a Google expert who really knows the ropes."
      ),
    ],
    defaultOpen: true,
  },
  {
    question: 'How does the free Google Ads audit work?',
    answer: [
      paragraph(
        "We'll review your current Google Ads account (or help you get started if you don't have one) and identify opportunities to improve performance. We'll look at your targeting, keywords, ad copy, landing pages, and tracking setup. Then we'll provide you with a clear roadmap for improvement—no strings attached."
      ),
    ],
  },
  {
    question: 'How does Profit Mill make Google Ads profitable?',
    answer: [
      paragraph(
        "We focus on the full funnel—not just clicks. We optimize for profit by improving Quality Score, refining targeting, and connecting ads to landing pages that convert. Plus, we track everything so you know exactly what's driving revenue. Most agencies optimize for vanity metrics. We optimize for what matters: your bottom line."
      ),
    ],
  },
  {
    question:
      "What's different about managing Google Ads with Profit Mill compared to hiring in-house or going with a freelancer?",
    answer: [
      paragraph(
        "Unlike in-house hires who need training or freelancers who juggle multiple clients, you get dedicated Google Ads experts with platform insight from managing 1,000+ accounts. We provide strategic thinking, not just campaign management—connecting your ads to broader marketing goals for sustainable growth."
      ),
    ],
  },
  {
    question: 'Am I locked into a long-term contract?',
    answer: [
      paragraph(
        "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. You can pause or cancel anytime with 30 days notice. Our goal is to make your Google Ads so profitable that you never want to leave."
      ),
    ],
  },
]

// --- LINKEDIN ADS FAQs ---
const linkedinAdsFaqs: FaqEntry[] = [
  {
    question: 'What exactly does Profit Mill do for my LinkedIn Ads?',
    answer: [
      paragraph(
        "We run LinkedIn Ads that reach the right people, build trust over long sales cycles, and influence enterprise deals that pay off down the line. Whether you're launching a new market or targeting niche buyers, we set you up with the strategy, tracking, and optimization to stay top of mind with the prospects who matter most."
      ),
    ],
    defaultOpen: true,
  },
  {
    question: 'How does the free LinkedIn Ads audit work?',
    answer: [
      paragraph(
        "We'll review your current LinkedIn Ads account (or help you get started if you don't have one) and analyze your targeting, creative, and campaign structure. We'll look at your audience targeting, ad performance, and conversion tracking. Then we'll provide you with a clear roadmap for reaching decision-makers and driving qualified pipeline—no strings attached."
      ),
    ],
  },
  {
    question: 'How does Profit Mill make LinkedIn Ads work for B2B?',
    answer: [
      paragraph(
        "We focus on account-based marketing that targets specific companies and decision-makers, not just broad demographics. We create content that speaks to your buyer's journey, from awareness to consideration to decision. Plus, we track everything back to pipeline and revenue so you know your LinkedIn investment is paying off."
      ),
    ],
  },
  {
    question:
      "What's different about managing LinkedIn Ads with Profit Mill compared to hiring in-house or going with a freelancer?",
    answer: [
      paragraph(
        'Unlike in-house hires who need training or freelancers who juggle multiple clients, you get dedicated LinkedIn Ads experts with platform insight from managing hundreds of B2B accounts. We understand B2B sales cycles and provide strategic thinking that connects your LinkedIn efforts to broader revenue goals.'
      ),
    ],
  },
  {
    question: 'Am I locked into a long-term contract?',
    answer: [
      paragraph(
        "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. You can pause or cancel anytime with 30 days notice. Our goal is to make your LinkedIn Ads so effective at driving pipeline that you never want to leave."
      ),
    ],
  },
]

// --- OTHER CHANNELS FAQs ---
const otherChannelsFaqs: FaqEntry[] = [
  {
    question: 'Are we even ready for paid ads on other channels?',
    answer: [
      paragraph(
        "Maybe. Maybe not. We'll take a close look at your funnel, budget, and sales process to see if channels like Meta, Reddit, or Bing make sense for your goals, or if you should just double down on what's already working."
      ),
    ],
    defaultOpen: true,
  },
  {
    question:
      "We've only run Google or LinkedIn ads. Will expanding just waste budget?",
    answer: [
      paragraph(
        "Not if you do it right. We start by understanding what's working in your current channels, then test new ones strategically with smaller budgets. We only scale what proves profitable. Many companies benefit from diversifying, but timing and execution matter more than jumping into every channel at once."
      ),
    ],
  },
  {
    question: 'Why not just hire in-house or go with a freelancer?',
    answer: [
      paragraph(
        "In-house hires are expensive and often lack cross-channel expertise. Freelancers can be hit-or-miss and usually focus on tactics, not strategy. We bring years of multi-channel experience, proven frameworks, and the ability to see how all your marketing efforts work together to drive profit."
      ),
    ],
  },
  {
    question: 'Will this take a lot of our time?',
    answer: [
      paragraph(
        "No. We handle the heavy lifting—setup, management, optimization, and reporting. You'll get regular updates and we're always available for questions, but our goal is to free up your time so you can focus on running your business while we handle the ads."
      ),
    ],
  },
  {
    question: 'How does the free ad audit work?',
    answer: [
      paragraph(
        "We'll review your current advertising efforts across all channels and identify opportunities for improvement or expansion. We'll look at your targeting, creative, tracking, and overall strategy. Then we'll give you a clear roadmap for optimizing what you have and strategically adding new channels—no strings attached."
      ),
    ],
  },
  {
    question: 'How does Profit Mill make paid ads profitable?',
    answer: [
      paragraph(
        "We focus on the metrics that matter: customer lifetime value, profit margins, and sustainable growth. We optimize for revenue, not just clicks or impressions. Plus, we track everything across channels so you can see exactly what's driving real business results."
      ),
    ],
  },
  {
    question: 'Am I locked into a long-term contract?',
    answer: [
      paragraph(
        'No long-term contracts required. We work on a month-to-month basis because we believe in earning your business every month through results. You can pause or cancel anytime with 30 days notice. Our goal is to make your paid advertising so profitable across all channels that you never want to leave.'
      ),
    ],
  },
]

// ============================================================
// Build all 5 FAQ documents
// ============================================================

const documents = [
  faqDoc('Homepage FAQs', 'homepage', homepageFaqs),
  faqDoc('Pricing FAQs', 'pricing', pricingFaqs),
  faqDoc('Google Ads FAQs', 'google-ads', googleAdsFaqs),
  faqDoc('LinkedIn Ads FAQs', 'linkedin-ads', linkedinAdsFaqs),
  faqDoc('Other Channels FAQs', 'other-channels', otherChannelsFaqs),
]

// ============================================================
// Execution
// ============================================================

async function main() {
  const useImport = process.argv.includes('--import')

  if (useImport) {
    // Direct import via Sanity client (requires write token)
    const token = process.env.SANITY_API_WRITE_TOKEN
    if (!token) {
      console.error(
        'Error: SANITY_API_WRITE_TOKEN env var is required for --import mode.'
      )
      console.error(
        'Get one from https://www.sanity.io/manage/project/ce4idxlh/api#tokens'
      )
      process.exit(1)
    }

    const client = createClient({
      projectId: 'ce4idxlh',
      dataset: 'production',
      apiVersion: '2025-09-25',
      token,
      useCdn: false,
    })

    for (const doc of documents) {
      const result = await client.createOrReplace(doc as any)
      console.log(`Created: ${result._id} (${(doc as any).pageTitle})`)
    }

    console.log(`\nDone! Created ${documents.length} FAQ documents.`)
  } else {
    // Output NDJSON for `sanity dataset import`
    for (const doc of documents) {
      console.log(JSON.stringify(doc))
    }
    console.error(
      `\nGenerated ${documents.length} FAQ documents as NDJSON.`
    )
    console.error('To import:')
    console.error(
      '  npx tsx scripts/migrate-faqs.ts > faqs.ndjson'
    )
    console.error(
      '  cd studio && npx sanity dataset import ../faqs.ndjson production --replace'
    )
    console.error(
      '\nOr use --import with a write token:'
    )
    console.error(
      '  SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/migrate-faqs.ts --import'
    )
  }
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
