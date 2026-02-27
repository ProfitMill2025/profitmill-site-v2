interface TestimonialsSectionProps {
  title?: string
  description?: string
}

export default function TestimonialsSection({
  title = "Don't just take our word for it",
  description = "Hear what our clients have to say:"
}: TestimonialsSectionProps) {
  return (
    <div className="relative bg-white">
      {/* Background pattern - positioned further right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Diagonal line from top-left to bottom-right */}
          <line
            x1="700"
            y1="0"
            x2="1100"
            y2="1000"
            stroke="#006840"
            strokeWidth="0.5"
          />

          {/* Diagonal line from top-right to bottom-left */}
          <line
            x1="1100"
            y1="0"
            x2="700"
            y2="1000"
            stroke="#006840"
            strokeWidth="0.5"
          />

          {/* Horizontal line through center */}
          <line
            x1="700"
            y1="500"
            x2="1100"
            y2="500"
            stroke="#006840"
            strokeWidth="0.5"
          />

          {/* Vertical line through center */}
          <line
            x1="900"
            y1="0"
            x2="900"
            y2="1000"
            stroke="#006840"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Main section with padding */}
      <section className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        {/* Main content */}
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold text-[#001109] mb-10 text-center">
            {title}
          </h2>
          <p className="text-lg text-[#001109] mb-12 text-center">
            {description}
          </p>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First testimonial - Michael Harding */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                10x better than any other agency
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Amazing contractor for Google Ads. They will help you scale your startup from thousands of dollars to millions. Peter is truly a superstar and 10x better than any other agency.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Michael Harding, CEO &amp; Founder at Let&apos;s Roam
              </footer>
            </div>

            {/* Second testimonial - Shawn Watts */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Profit Mill Turned Google Ads around in just a month.
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;We dabbled with Google Ads for two and a half years and received very few quality leads and a lot of spam leads. Profit Mill turned that around in just a month, generating a healthy volume of inbound leads that actually turned into customers! With our work together, we&apos;ve now doubled our monthly investment into Google Ads and are super excited to keep working with them.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Shawn Watts, CEO &amp; Founder at Corfix
              </footer>
            </div>

            {/* Third testimonial - Nicola Ciardiello-Hardy */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                We were impressed with Profit Mill&apos;s depth of knowledge, the time they spent with our team, and their dedication to our success.
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Profit Mill&apos;s project management was amazing. The team delivered on time and reconciled well to our needs. We were impressed with Profit Mill&apos;s depth of knowledge, the time they spent with our team, and their dedication to our success.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Nicola Ciardiello-Hardy, VP of Marketing at Easyjet Holidays
              </footer>
            </div>

            {/* Fourth testimonial - Luke Piestz */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                If you&apos;re looking for someone who can handle both the technical side and provide real strategic value, I can&apos;t recommend Profit Mill enough.
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Working with Peter at Profit Mill has been a game-changer for our ad campaigns. He really knows his stuff when it comes to Google Ads and brought a strategic approach that actually delivered results. What impressed me most was when we hit those analytics attribution problems — Peter immediately connected us with experts who diagnosed and fixed everything.&quot;
              </blockquote>
              <blockquote className="text-[#001109] mb-4">
                &quot;What sets Peter apart is how he applies his broad experience to one specific situation. He doesn&apos;t just run campaigns — he offers practical advice that&apos;s helped us see the bigger marketing picture. He&apos;s super responsive, easy to work with, and genuinely seems to care about our success.&quot;
              </blockquote>
              <blockquote className="text-[#001109] mb-4">
                &quot;If you&apos;re looking for someone who can handle both the technical side and provide real strategic value, I can&apos;t recommend Peter and Profit Mill enough. They&apos;ve made a huge difference for our business.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Luke Piestz, Head of Growth &amp; Marketing at BuzzRail
              </footer>
            </div>

            {/* Fifth testimonial - Eli Gladstone */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Ended up with a profitable and scalable system in the first year
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Can&apos;t recommend working with Profit Mill enough! The results have been even better than we could have imagined. We relaunched Google Ads with them and ended up with a profitable and scalable system in the first year! They do so much more than just paid ads - they&apos;ve helped us think strategically about different ways to scale our business, technically optimize our systems, and generally just been fantastic problem solvers. It feels like they&apos;re a member of the team. I feel really lucky to have them in our corner!&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Eli Gladstone, Co-Founder &amp; CEO at Speaker Labs
              </footer>
            </div>

            {/* Sixth testimonial - Cristina Burne */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Always on time, always thorough, Profit Mill consistently pushed us to do more and think bigger.
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Always on time, always thorough, Profit Mill consistently pushed us to do more and think bigger. Their responses were quick, their guidance productive, and they operated like an embedded part of our team, not an external agency. Their willingness to iterate and learn with us stood out. As an early stage startup, our priorities shifted constantly, and things were often chaotic. Profit Mill stayed flexible, adapted quickly, and never made us feel like we were asking for too much. That kind of partnership is rare.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Cristina Burne, Head of Marketing at Paraform
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
