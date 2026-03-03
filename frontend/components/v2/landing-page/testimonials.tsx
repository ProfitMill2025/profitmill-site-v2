import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

interface Testimonial {
  heading: string
  quote: string | readonly string[]
  name: string
  company: string
}

function TestimonialCard({ heading, quote, name, company }: Testimonial) {
  return (
    <div className="bg-[#f1fff5] flex flex-col gap-[16px] px-[30px] py-[20px] rounded-[10px] w-full h-full">
      <div className="flex flex-col md:flex-row gap-[32px] w-full flex-1">
        <div className="flex-1">
          <p className="font-semibold text-[24px] text-[#006840] leading-[1.5]">
            {heading}
          </p>
        </div>
        <div className="flex-1">
          {Array.isArray(quote) ? (
            <div className="text-[16px] text-[#001109] leading-[1.5]">
              {quote.map((paragraph, i) => (
                <p
                  key={i}
                  className={i === 0 ? 'mb-0' : 'mt-6 mb-0'}
                  style={i === 0 ? { textIndent: '-7.2px' } : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p
              className="text-[16px] text-[#001109] leading-[1.5]"
              style={{ textIndent: '-7.2px' }}
            >
              {quote}
            </p>
          )}
        </div>
      </div>
      <p className="text-[14px] text-[#006840] leading-[1.5]">
        {' '}- {name} at{' '}
        <span className="underline">{company}</span>
      </p>
    </div>
  )
}

const testimonials = {
  michael: {
    heading: '10x better than any other agency',
    quote: '\u201cAmazing contractor for Google Ads. They will help you scale your startup from thousands of dollars to millions. Peter is truly a superstar and 10x better than any other agency.\u201d',
    name: 'Michael Harding, CEO & Founder',
    company: "Let\u2019s Roam",
  },
  alexis: {
    heading: "We were impressed with Profit Mill\u2019s depth of knowledge, the time they spent with our team, and their dedication to our success.",
    quote: "\u201cProfit Mill\u2019s project management was amazing. The team delivered on time and responded well to our needs. We were impressed with Profit Mill\u2019s depth of knowledge, the time they spent with our team, and their dedication to our success.\u201d",
    name: 'Alexis Clarfield-Henry, VP of Marketing',
    company: 'Forum Ventures',
  },
  shawn: {
    heading: 'Profit Mill Turned Google Ads around in just a month.',
    quote: "\u201cWe dabbled with Google Ads for two and a half years and received very few quality leads and a lot of spam leads. Profit Mill turned that around in just a month, generating a healthy volume of inbound leads that actually turned into customers! 6 months into our work together, we\u2019ve now doubled our monthly investment into Google Ads and are super excited to keep working with them.\u201d",
    name: 'Shawn Watts, CEO & Founder',
    company: 'Corfix',
  },
  luke: {
    heading: "If you\u2019re looking for someone who can handle both the technical side and provide real strategic value, I can\u2019t recommend Profit Mill enough.",
    quote: [
      "\u201cWorking with Peter at Profit Mill has been a game-changer for our ad campaigns. He really knows his stuff when it comes to Google ads and brought a strategic approach that actually delivered results. What impressed me most was when we hit those analytics attribution problems \u2013 Peter immediately connected us with experts who diagnosed and fixed everything.",
      "What sets Peter apart is how he applies his broad experience to our specific situation. He doesn\u2019t just run campaigns \u2013 he offers practical advice that\u2019s helped us see the bigger marketing picture. He\u2019s super responsive, easy to work with, and genuinely seems to care about our success.",
      "If you\u2019re looking for someone who can handle both the technical side and provide real strategic value, I can\u2019t recommend Peter and Profit Mill enough. They\u2019ve made a huge difference for our business.\u201d",
    ],
    name: 'Luke Piette, Head of Growth & Marketing',
    company: 'RunPod',
  },
  eli: {
    heading: 'Ended up with a profitable and scalable system in the first year',
    quote: "\u201cCan\u2019t recommend working with Profit Mill enough! The results have been even better than we could have imagined. We relaunched Google Ads with them and ended up with a profitable and scalable system in the first year! They do so much more than just paid ads \u2013 they\u2019ve helped us think strategically about different ways to scale our business,  technically optimize our systems, and generally just been a fantastic problem solvers. It feels like they\u2019re a member of the team. I feel really lucky to have them in our corner!\u201d",
    name: 'Eli Gladstone, Co-Founder & CEO',
    company: 'Speaker Labs',
  },
  cristina: {
    heading: 'Always on time, always thorough. Profit Mill consistently pushed us to do more and think bigger.',
    quote: "\u201cAlways on time, always thorough. Profit Mill consistently pushed us to do more and think bigger. Their responses were quick, their guidance proactive, and they operated like an embedded part of our team, not an external agency. Their willingness to iterate and learn with us stood out. As an early-stage startup, our priorities shifted constantly, and things were often chaotic. Profit Mill stayed flexible, adapted quickly, and never made us feel like we were asking for too much. That kind of partnership is rare.\u201d",
    name: 'Cristina Bune, Head of Marketing',
    company: 'Paraform',
  },
} as const

interface TestimonialsSectionProps {
  title?: string
  description?: string
}

export default function TestimonialsSection({
  title = "Don\u2019t just take our word for it",
  description = 'Hear what our clients have to say:',
}: TestimonialsSectionProps) {
  return (
    <section
      className={`${sora.className} bg-white flex flex-col items-center gap-[48px] px-4 md:px-8 lg:px-[120px] pt-[48px] pb-[80px]`}
    >
      {/* Header */}
      <div className="flex flex-col gap-[24px] w-full">
        <h2 className="font-bold text-[42px] text-[#001109] text-center leading-[1.2]">
          {title}
        </h2>
        <p className="text-[18px] text-[#001109] text-center leading-[1.5]">
          {description}
        </p>
      </div>

      {/* Testimonials */}
      <div className="flex flex-col gap-[24px] w-full">
        {/* Row 1: Full width - Michael Harding */}
        <TestimonialCard {...testimonials.michael} />

        {/* Row 2: Two columns - Alexis + Shawn */}
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[32px] w-full">
          <div className="flex-1">
            <TestimonialCard {...testimonials.alexis} />
          </div>
          <div className="flex-1">
            <TestimonialCard {...testimonials.shawn} />
          </div>
        </div>

        {/* Row 3: Full width - Luke Piette */}
        <TestimonialCard {...testimonials.luke} />

        {/* Row 4: Two columns - Eli + Cristina */}
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[32px] w-full">
          <div className="flex-1">
            <TestimonialCard {...testimonials.eli} />
          </div>
          <div className="flex-1">
            <TestimonialCard {...testimonials.cristina} />
          </div>
        </div>
      </div>
    </section>
  )
}
