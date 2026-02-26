import { CSSProperties } from 'react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { sanityFetch } from "@/sanity/lib/live"
import { allCaseStudiesQuery } from '@/sanity/lib/queries'

interface CaseStudy {
  _id: string
  title: string
  slug: {
    current: string
  }
}

const gridBackgroundStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(#006840 1px, transparent 1px),
    linear-gradient(90deg, #006840 1px, transparent 1px)
  `,
  backgroundSize: '80px 80px',
  opacity: 1
}

export default async function CaseStudyCarousel() {
  const { data: caseStudies } = await sanityFetch({ 
    query: allCaseStudiesQuery
  });

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section id="case-studies" className="bg-[#003B2D] py-16 overflow-hidden relative">
      <div className="absolute left-0 top-0 w-[960px] h-[640px] z-0 border border-[#004D2C]">
        <div className="w-full h-full" style={gridBackgroundStyle} />
      </div>

      <div className="container mx-auto px-4 mb-16 relative z-10 text-center">
        <h2 className="text-white text-5xl font-semibold">My work in the numbers</h2>
      </div>

      <Carousel opts={{ align: "center", loop: true }} className="w-full relative z-10">
        <CarouselContent className="-ml-4">
          {caseStudies.map((study: CaseStudy) => (
            <CarouselItem key={study._id} className="pl-4 basis-[75%] md:basis-1/3 lg:basis-1/4 py-6">
              <div className="bg-[#004D2C] p-10 rounded-lg h-full transform hover:scale-[1.02] transition-transform">
                <div className="text-xs text-[#BDFFD9] uppercase tracking-wider mb-4">
                  CASE STUDY
                </div>
                <h3 className="text-white text-2xl font-normal mb-8 leading-tight min-h-[120px]">
                  {study.title}
                </h3>
                <Link
                  href={`/case-studies/${study.slug.current}`}
                  className="inline-block border border-[#FFBA0A] text-[#FFBA0A] px-6 py-2 hover:bg-[#FFBA0A] hover:text-[#003B2D] transition-colors"
                >
                  read MORE
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-center gap-4">
            <CarouselPrevious className="static h-12 w-12 rounded-none bg-[#BDFFD9] hover:bg-[#BDFFD9]/80 text-[#003B2D]" />
            <CarouselNext className="static h-12 w-12 rounded-none bg-[#BDFFD9] hover:bg-[#BDFFD9]/80 text-[#003B2D]" />
          </div>
        </div>
      </Carousel>
    </section>
  )
}