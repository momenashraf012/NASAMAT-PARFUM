import { useScrollReveal } from '../hooks/useScrollReveal'
import { TESTIMONIALS } from '../data/perfumes'
import { Testimonial } from '../types'

interface TestimonialCardProps extends Testimonial {
  idx: number
}

function TestimonialCard({ quote, author, location, avatar, idx }: TestimonialCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] bg-ivory-2 border border-gold-soft rounded-lg p-6 md:p-8 hover:shadow-md hover:-translate-y-2 hover:duration-300"
      style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
    >
      {/* Stars */}
      <div className="text-gold text-lg tracking-wide">★★★★★</div>

      {/* Quote */}
      <p className="font-ar-body text-base md:text-lg leading-loose text-charcoal mt-4 md:mt-6">
        {quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-hairline">
        <div className="w-10 md:w-11 h-10 md:h-11 rounded-full bg-gold-wash border border-gold-soft flex items-center justify-center font-ar-display font-bold text-gold-dark text-lg flex-shrink-0">
          {avatar}
        </div>
        <div>
          <div className="font-ar-body font-semibold text-sm md:text-base text-charcoal">
            {author}
          </div>
          <div className="font-ar-body text-xs md:text-sm text-grey-3 mt-0.5">
            {location}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const introRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section">
      <div className="wrap">
        {/* Intro */}
        <div
          ref={introRef}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="eyebrow justify-center">آراء العملاء</span>
          <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-4">
            رائحةٌ يتذكّرها الناس
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {TESTIMONIALS.map((testi, idx) => (
            <TestimonialCard key={testi.id} {...testi} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
