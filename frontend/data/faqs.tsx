export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
  defaultOpen?: boolean;
}

export const homepageFaqs: FaqItem[] = [
  {
    question: "What is your pricing model?",
    answer: (
      <div className="space-y-4">
        <p>
          We offer three pricing packages starting at $3K/month—built to match your stage and growth goals. You can check out the details on our{' '}
          <a href="/paid-ads-pricing" className="text-[#ffba0a] font-medium hover:opacity-80 transition-opacity">Pricing page</a>.
        </p>
        <p>
          Not sure what&apos;s right for you? <a href="https://app.hellobonsai.com/s/profitmill/googleadsaudit" className="text-[#ffba0a] font-medium hover:opacity-80 transition-opacity">Book a free audit</a> and we&apos;ll point you in the right direction.
        </p>
      </div>
    ),
    defaultOpen: true,
  },
  {
    question: "How do I know if I'm ready for paid ads?",
    answer: "You're ready if you have a validated market fit and budget to test and optimize — not just buy leads overnight. You'll also need clear messaging and a well designed landing page, but we can help you with all that.",
  },
  {
    question: "Can you help with the visuals and creative for ads?",
    answer: "Absolutely. While we focus on strategy and performance, we have a network of trusted creative partners to help you craft assets that actually convert. Creative support is included in our top two pricing plans.",
  },
  {
    question: "What paid ad platforms do you support?",
    answer: (
      <div className="space-y-4">
        <p>
          We support our clients with all of the paid ad platforms out there, especially the ones used extensively for B2B marketing:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>LinkedIn Ads</li>
          <li>Bing, Meta, Reddit</li>
          <li>G2, Capterra, and other B2B review channels</li>
          <li>SEO</li>
          <li>Content marketing</li>
        </ul>
        <p>
          If we don&apos;t have the expertise in-house, we reach out to our extensive network of highly skilled subcontractors to accomplish your goals (eg. website redesigns, graphic creation, complex technical integrations, etc.).
        </p>
      </div>
    ),
  },
  {
    question: "What kind of businesses do you work with?",
    answer: (
      <div className="space-y-4">
        <p>
          We work with B2B and B2B2C companies focused on lead generation — including PLG startups, SaaS platforms, AI companies, and professional service businesses. Whether you&apos;re in tech, healthcare, or consulting, if your goal is to turn paid ads into pipeline, we&apos;re a great fit.
        </p>
        <p>
          We don&apos;t work with e-commerce brands, but if that&apos;s you, we&apos;re happy to recommend someone who does.
        </p>
      </div>
    ),
  },
  {
    question: "How often will you be in touch?",
    answer: (
      <div className="space-y-4">
        <p>You can choose from two options:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Regular weekly or bi-weekly meetings, depending on your needs.</li>
          <li>Async catch ups via Slack with the option for ad-hoc meetings as needed.</li>
        </ul>
        <p>Plus we&apos;re always available to answer questions when they arise.</p>
      </div>
    ),
  },
  {
    question: "How long until I start seeing results?",
    answer: (
      <div className="space-y-4">
        <p>
          It usually takes 1–3 months to build and test a profitable ad engine. That said, you&apos;ll start seeing improvements in tracking and campaign performance within the first few weeks of working together.
        </p>
        <p>
          The exact timeline depends on your industry, competition, and current marketing setup—but we&apos;ll give you a clear and honest outlook from day one.
        </p>
      </div>
    ),
  },
];

export const pricingFaqs: FaqItem[] = [
  {
    question: "How much ad spend do I need on top of your fee?",
    answer: "We typically recommend $3,000/month as a healthy starting spend on Google or LinkedIn. If your spend is lower than that, the data comes in too slowly to make smart decisions. Actual cost can vary depending on the level of auction competition and the estimated cost per click.",
    defaultOpen: true,
  },
  {
    question: "Do your fees scale with ad spend?",
    answer: (
      <div className="space-y-4">
        <p>
          Our fees scale in tiers that align with your ad spend range and the level of support you need.
        </p>
        <p>
          Smaller budgets typically fit into our Explore plan, while higher spend ranges unlock additional services like multi-channel management, landing page creation, and advanced tracking.
        </p>
        <p>
          This way, pricing stays predictable and you only move up a tier when your ad spend and service scope increase.
        </p>
      </div>
    ),
  },
  {
    question: "Is there a minimum contract length?",
    answer: "We work month-to-month. Most clients stay with us well beyond that, but we don't lock you into long-term contracts. While we recommend committing to at least 3 months to gauge performance, you'll know if it's working within the first few weeks.",
  },
  {
    question: "Do you charge additional setup fees?",
    answer: "No, what you see is what you pay. No setup fees or hidden costs. Our onboarding, conversion tracking setup, and campaigns are included in your monthly retainer.",
  },
  {
    question: "How do I know which package is right for me?",
    answer: "It comes down to your company stage, budget, and ambition for paid ads. Early-stage teams who are just starting paid ads usually start with Explore, while Series A+ companies go for Invest or Scale. If you're unsure, book a call and we'll point you to the right fit.",
  },
  {
    question: "What if I need to upgrade or downgrade later?",
    answer: "No problem. Our flexible monthly contracts let you move between packages as your budget or growth goals change.",
  },
  {
    question: "How quickly will I see results?",
    answer: "You'll start gaining insights within the first 1–2 weeks of working with us. Meaningful results like qualified leads, pipeline, revenue signals usually come in 4–8 weeks depending on your sales cycle.",
  },
  {
    question: "Can you guarantee results?",
    answer: "We don't guarantee specific results and no serious agency should. What we do guarantee is a proven process, clear reporting, and a decade of experience running paid ads for B2B teams. Most clients know fairly quickly if it's working.",
  },
  {
    question: "Do you work with businesses of my size/industry?",
    answer: "We specialize in B2B business, namely SaaS, PLG, and service companies from Seed stage to Series B+. If you're an ambitious team looking to scale with paid ads, we can probably help.",
  },
  {
    question: "Why are your fees higher/lower than other agencies?",
    answer: "We're not the cheapest option, and we're not trying to be. Unlike freelance or junior teams, you're getting performance marketing experts with years of in-house experience. That means fewer wasted dollars, faster insights, and strategies that scale.",
  },
  {
    question: "Do you just run ads, or can you help with creative and landing pages too?",
    answer: "We go beyond ad execution. Depending on your plan, we can handle everything from ad copy and creative to landing pages. You'll get strategic input throughout—and if you'd prefer to work with your own team, we're happy to collaborate or connect you with trusted experts in our network.",
  },
  {
    question: "Do you work with small businesses?",
    answer: "We work best for high-growth B2B and B2C2B companies—especially those with a product-led motion and clear demand signals. If you're still pre–product-market fit or don't yet have the budget to scale profitably with paid ads, it's probably too early to work with us. But if you're seeing traction and ready to capture that demand, let's talk.",
  },
  {
    question: "Why does your Explore plan only include Google or LinkedIn? Can I start on a different channel?",
    answer: (
      <div className="space-y-4">
        <p>
          After working with 1000+ ad accounts, we see the same pattern. Clients who have budget constraints need results fast to prove paid ads are worth the investment. They&apos;re looking for short-term profit over long-term growth, and the most effective way to drive ROI early is to focus on one high-intent channel—Google Ads or LinkedIn Ads—before expanding.
        </p>
        <p>
          Whether you start with search or social depends on your offer and audience. Either way, we help you nail the foundation first, then scale from there.
        </p>
      </div>
    ),
  },
];

export const b2bSaasFaqs: FaqItem[] = [
  {
    question: "What's the typical CAC for a SaaS business?",
    answer: "B2B SaaS businesses can expect their CAC to be anywhere between 6 to 12 months.",
    defaultOpen: true,
  },
  {
    question: "What CRM integration do you support for offline conversion tracking?",
    answer: "In short: we support all of them! Some CRM integrations are easier than others, but ultimately we'll find a way to make it work.",
  },
  {
    question: "How do you figure out the right budget for testing my paid ads?",
    answer: "We take a close look at your revenue goals and work backwards to decide on a budget that makes sense. This way, you get enough data to see what works without throwing money away on guesswork.",
  },
  {
    question: "How can I track the return on my ad spend?",
    answer: "We get a full overview of the entire lead-to-sale journey by integrating directly with your CRM. This gives a clear picture of where your ad spend is turning into actual customers.",
  },
  {
    question: "What kind of support do you provide once my ad campaigns are live?",
    answer: "You'll get real-time help over Slack so you're never left wondering what to do next. Plus, our team is ready to adjust the campaigns based on what we see, helping keep your ads on track.",
  },
  {
    question: "How quickly can I see improvement in my ad performance with your help?",
    answer: "We can get your campaign up and running in just 1-2 weeks. From there, you'll start seeing early signals like clicks and responses, making it easier to know which parts of your ad strategy need a tweak.",
  },
];
