import { useScrollReveal } from '../hooks/useScrollReveal'
import { PILLARS } from '../data/perfumes'

export function Story() {
  const figureRef = useScrollReveal<HTMLDivElement>()
  const copyRef = useScrollReveal<HTMLDivElement>(0.15)

  return (
    <section className="section" id="story">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div
            ref={figureRef}
            className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:order-2"
          >
            <div className="relative">
              <div className="font-ar-display font-bold text-8xl md:text-9xl lg:text-[280px] leading-none text-center text-gold-soft opacity-50 select-none">
                نَسَمَات
              </div>
              <div className="relative -mt-3 text-center font-ar-body text-xs md:text-sm text-grey-3 tracking-wider">
                نسمة: هواء لطيف يمرّ، ويترك أثرًا لا ينسى
              </div>
            </div>
          </div>

          <div
            ref={copyRef}
            className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:order-1"
          >
            <span className="eyebrow">قصتنا</span>

            <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mt-6 text-charcoal">
              نصنع حضورًا هادئًا
              <br />
              يسبق الكلام ويبقى بعده
            </h2>

            <p className="font-ar-body text-lg md:text-xl leading-loose text-grey mt-6">
              وُلدت ناسامات من فكرة بسيطة: عطر عربي أصيل، بصياغة حديثة، وسعر لا يطلب تنازلًا
              عن الفخامة. نعمل على بناء روائح تبدو مألوفة ومميّزة في الوقت نفسه، كأنها تعرفك
              من أول لحظة.
            </p>

            <p className="font-ar-body text-lg md:text-xl leading-loose text-grey mt-6">
              نختار العود والمسك والورد والعنبر بعناية، ثم نعيد ترتيبها في تركيبات نظيفة
              وواضحة، فيها دفء عربي وحضور محسوب. الهدف ليس فقط أن تشم العطر، بل أن تتذكره.
            </p>

            <div className="flex flex-wrap gap-7 md:gap-8 mt-10">
              {PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{ transitionDelay: `${(idx + 4) * 80}ms` }}
                >
                  <div className="font-ar-display font-bold text-lg text-gold">{pillar.ar}</div>
                  <div className="font-body text-xs tracking-widest uppercase text-grey-3 mt-1">
                    {pillar.en}
                  </div>
                </div>
              ))}
            </div>

            <div className="font-ar-display text-2xl md:text-3xl text-gold mt-12">
              أثرٌ يظلّ معك.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
