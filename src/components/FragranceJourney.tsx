import { useScrollReveal } from '../hooks/useScrollReveal'

interface JourneyStep {
  stage: string
  title: string
  description: string
  examples: string
}

const JOURNEY: JourneyStep[] = [
  {
    stage: '01',
    title: 'البداية',
    description: 'الافتتاح الأول الذي يجذبك فورًا، غالبًا بخفة أو لمعان أو حضور متوهج.',
    examples: 'عود نقي، ورد مشرق، لمسة حمضية أو بخورية',
  },
  {
    stage: '02',
    title: 'القلب',
    description: 'الطبقة التي تمنح العطر شخصيته الأساسية، وتجعله أكثر دفئًا ووضوحًا.',
    examples: 'مُسك ناعم، ورد دمشقي، عنبر دافئ',
  },
  {
    stage: '03',
    title: 'الأثر',
    description: 'ما يبقى على البشرة والملابس بعد مرور الوقت: هادئ، ثابت، وراقٍ.',
    examples: 'عنبر، خشب أرز، باتشولي، مسك نظيف',
  },
]

export function FragranceJourney() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section bg-ivory-2 border-y border-gold-soft" id="journey">
      <div className="wrap">
        <div
          ref={headerRef}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] max-w-2xl mx-auto text-center mb-10 md:mb-16"
        >
          <span className="eyebrow centered">الرحلة العطرية</span>
          <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-4 leading-tight">
            كيف يتكوّن الأثر من أول رشة؟
          </h2>
          <p className="font-ar-body text-base md:text-lg leading-loose text-grey mt-6">
            كل عطر عند ناسامات يُبنى على ثلاث طبقات متتابعة: بداية، قلب، وأثر. بهذه الطريقة
            تظل الرائحة متوازنة، واضحة، ومريحة من أول لحظة حتى نهاية اليوم.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {JOURNEY.map((step, idx) => (
            <JourneyCard key={step.stage} step={step} delay={idx * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function JourneyCard({ step, delay }: { step: JourneyStep; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>(0.15)

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] rounded-lg border border-gold-soft bg-ivory px-6 py-7 shadow-xs"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-body text-xs tracking-[0.28em] uppercase text-gold-dark">
          {step.stage}
        </span>
        <span className="h-px flex-1 mx-4 bg-gold-soft"></span>
      </div>
      <h3 className="font-ar-display font-bold text-2xl text-charcoal">{step.title}</h3>
      <p className="font-ar-body text-base leading-loose text-grey mt-4">{step.description}</p>
      <div className="mt-6 pt-5 border-t border-gold-soft">
        <p className="font-body text-xs tracking-widest uppercase text-grey-3">أمثلة</p>
        <p className="font-ar-body text-sm leading-relaxed text-charcoal mt-2">{step.examples}</p>
      </div>
    </div>
  )
}
