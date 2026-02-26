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
            {/* First testimonial */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg md:col-span-2">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <h3 className="text-xl font-semibold text-emerald-800">
                  Turned Google Ads around in just a month.
                </h3>
                <blockquote className="text-[#001109]">
                  &quot;We dabbled with Google Ads for two and a half years and received very few quality leads and a lot of spam leads. Peter turned that around in just a month, generating a healthy volume of inbound leads that actually turned into customers! 6 months into our work together, we&apos;ve now doubled our monthly investment into Google Ads and are super excited to keep working with him.&quot;
                </blockquote>
              </div>
              <footer className="text-sm text-emerald-700">
                - Shawn Watts, CEO &amp; Founder at Corfix
              </footer>
            </div>
  
            {/* Second testimonial */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Made Google ads the most profitable and largest revenue driving stream
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Peter is an expert at what he does and brings incredible insights and execution to every team he helps out with. He has made our Google ads the most profitable and largest revenue driving stream in our organization.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Connor Moynihan, Former Social Media Manager at Let&apos;s Roam
              </footer>
            </div>

            {/* Third testimonial */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Achieved growth we&apos;d never thought possible
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;They were instrumental at my last company in helping us scale our ad spend multiple times over. Their strategic insights, coupled with a hands-on approach to campaign management, allowed us to achieve growth that we had never thought possible.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Jordan Stella, Former VP of Marketing at Let&apos;s Roam
              </footer>
            </div>
  
            {/* Fourth testimonial */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg md:col-span-2">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <h3 className="text-xl font-semibold text-emerald-800">
                  10x better than any other agency
                </h3>
                <blockquote className="text-[#001109]">
                  &quot;Amazing contractor for google ads. He will help you scale your startup from thousands of dollars to millions. Peter is truly a superstar and 10x better than any other agency.&quot;
                </blockquote>
              </div>
              <footer className="text-sm text-emerald-700">
                - Michael Harding, CEO &amp; Founder at Let&apos;s Roam
              </footer>
            </div>
  
            {/* Fifth testimonial */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                A game changer for our organization
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Working with Peter was a game changer for our organization. With his help, we were not only able to drive incremental leads for our sales staff but he also provided guidance and strategic direction for increasing our conversions. He always brought fresh ideas to the table while rooting every decision in data backed insights. I would highly recommend working with him and his team.&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Scott Bradley, Former Head of Sales at Let&apos;s Roam
              </footer>
            </div>
  
            {/* Sixth testimonial */}
            <div className="bg-[#F1FFF5] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Ended up with a profitable and scalable system in the first year
              </h3>
              <blockquote className="text-[#001109] mb-4">
                &quot;Can&apos;t recommend working with Peter enough! The results have been even better than we could have imagined. We relaunched Google ads with him and ended up with a profitable and scalable system in the first year! He does so much more than just paid ads - he&apos;s helped us think strategically about different ways to scale our business, he&apos;s helped us technically optimize our systems, and he&apos;s generally just been a fantastic problem solver. It feels like he&apos;s a member of the team. I feel really lucky to have him in our corner!&quot;
              </blockquote>
              <footer className="text-sm text-emerald-700">
                - Eli Gladstone, Co-Founder &amp; CEO at Speaker Labs
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
  
  