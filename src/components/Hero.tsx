import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArrowLeft } from 'lucide-react'

export function Hero() {
  const copyRef = useScrollReveal<HTMLDivElement>()
  const imageRef = useScrollReveal<HTMLDivElement>(0.2)

  return (
    <section className="hero relative bg-ivory overflow-hidden" id="hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-wash to-transparent opacity-70 pointer-events-none"></div>

      <div className="wrap relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center min-h-screen lg:min-h-[760px]">
          {/* Copy Section */}
          <div
            ref={copyRef}
            className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] max-w-2xl lg:col-span-1"
          >
            <span className="eyebrow inline-block">عطور عربية فاخرة</span>

            <h1 className="font-ar-display font-bold text-4xl md:text-5xl lg:text-7xl leading-tight mt-6 text-charcoal">
              أثرٌ يبقى<br />
              <span className="text-gold">بعد رحيلك</span>
            </h1>

            <p className="font-ar-body text-lg md:text-xl leading-loose text-grey mt-8 max-w-xl">
              من قلب العطر العربي الأصيل — العود والمسك والورد والعنبر — نُقدّم فخامةً
              هادئة، حضورٌ يُعرَف بك ويبقى في الذاكرة.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href="#collection"
                className="bg-gold text-charcoal px-8 py-4 rounded-sm font-ar-body font-bold text-sm md:text-base inline-flex items-center gap-2 transition-all duration-300 hover:bg-gold-dark hover:text-ivory hover:-translate-y-0.5 shadow-gold active:scale-98"
              >
                تسوّق العطور <ArrowLeft size={16} />
              </a>
              <a
                href="#story"
                className="bg-transparent text-charcoal border border-border-strong px-8 py-4 rounded-sm font-ar-body font-bold text-sm md:text-base inline-flex items-center gap-2 transition-all duration-300 hover:border-gold hover:text-gold-dark hover:bg-gold-wash"
              >
                اكتشف القصة
              </a>
            </div>

            <div className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mt-12">
              AUTHENTIC ARABIC PERFUMES · LUXURY WITHIN REACH
            </div>
          </div>

          {/* Hero Media */}
          <div
            ref={imageRef}
            className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] [transition-delay:160ms] relative justify-self-center lg:col-span-1"
          >
            {/* Hero Frame */}
            <div className="relative w-64 md:w-96 lg:w-full max-w-xs md:max-w-md aspect-[420/620] rounded-[200px_200px_12px_12px] overflow-hidden border border-gold-soft shadow-lg bg-gradient-to-b from-[#2a2724] to-[#15130f]">
              <img
                src="/assets/bottle-shot.png"
                alt="عطر نَسَمَات"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: 'center 28%' }}
                loading="eager"
              />
            </div>

            {/* Hero Seal */}
            <div className="absolute -right-4 md:-right-6 top-10 w-20 md:w-24 h-20 md:h-24 rounded-full border border-gold bg-ivory-2 flex items-center justify-center shadow-sm font-ar-display font-bold text-gold text-3xl md:text-4xl z-10">
              ن
            </div>

            {/* Hero Badge */}
            <div className="absolute -left-8 md:-left-6 bottom-12 md:bottom-14 bg-ivory-2 border border-gold-soft rounded-lg px-5 py-4 shadow-md text-center min-w-32 z-10 animate-float">
              <div className="font-ar-display font-bold text-gold text-3xl md:text-4xl leading-none">
                ٥٠ml
              </div>
              <div className="font-ar-body text-xs md:text-sm text-grey mt-1.5">
                Eau de Parfum
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
