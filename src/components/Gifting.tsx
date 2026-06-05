import { useScrollReveal } from '../hooks/useScrollReveal'

export function Gifting() {
  const introRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section bg-ivory-2 border-t border-gold-soft" id="gifting">
      <div className="wrap">
        {/* Intro */}
        <div
          ref={introRef}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="eyebrow justify-center">الهدايا</span>
          <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-4">
            تُغلَّف لتُهدى
          </h2>
          <p className="font-ar-body text-base md:text-lg leading-loose text-grey mt-6">
            صندوقٌ بلمسةٍ فحمية وكيسٌ بزخرفةٍ ذهبية محفورة — تغليف نَسَمَات هدية في حدّ ذاته،
            يأتي مجّانًا مع كل طلب.
          </p>
        </div>

        {/* Gift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Gift Box */}
          <GiftCard
            image="/assets/gift-box.png"
            title="صندوق الهدية"
            subtitle="غطاءٌ فحمي بطبعةٍ ذهبية بارزة"
            isDark={true}
            delayIdx={0}
          />

          {/* Gift Bag */}
          <GiftCard
            image="/assets/gift-bag.png"
            title="كيس الهدية"
            subtitle="عاجيٌّ بزخرفةٍ عربية ذهبية محفورة"
            isDark={false}
            delayIdx={1}
          />
        </div>
      </div>
    </section>
  )
}

interface GiftCardProps {
  image: string
  title: string
  subtitle: string
  isDark: boolean
  delayIdx: number
}

function GiftCard({ image, title, subtitle, isDark, delayIdx }: GiftCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] relative rounded-lg overflow-hidden border border-gold-soft shadow-sm hover:shadow-md hover:-translate-y-2 hover:duration-300 min-h-[420px]"
      style={{ transitionDelay: `${delayIdx * 80}ms` }}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-t from-charcoal/62 to-transparent'
            : 'bg-gradient-to-t from-ivory/92 to-transparent'
        }`}
      ></div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-7 py-6 md:py-7">
        <h3
          className={`font-ar-display font-bold text-2xl md:text-3xl ${
            isDark ? 'text-ivory' : 'text-charcoal'
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-ar-body text-sm md:text-base mt-1.5 ${
            isDark ? 'text-cream/85' : 'text-grey'
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}
