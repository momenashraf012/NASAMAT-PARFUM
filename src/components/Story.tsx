import { useScrollReveal } from '../hooks/useScrollReveal'
import { PILLARS } from '../data/perfumes'

export function Story() {
  const ref1 = useScrollReveal<HTMLDivElement>()
  const ref2 = useScrollReveal<HTMLDivElement>(0.15)

  return (
    <section className="section" id="story">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Story Figure */}
          <div
            ref={ref1}
            className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:order-2"
          >
            <div className="relative">
              <div className="font-ar-display font-bold text-8xl md:text-9xl lg:text-[280px] leading-none text-center text-gold-soft opacity-50 select-none">
                نَسَمَات
              </div>
              <div className="relative -mt-3 text-center font-ar-body text-xs md:text-sm text-grey-3 tracking-wider">
                نَسَمَات · جمع «نَسمة» — الهواء اللطيف الذي يمرّ فيترك أثرًا
              </div>
            </div>
          </div>

          {/* Story Copy */}
          <div
            ref={ref2}
            className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:order-1"
          >
            <span className="eyebrow">قصّتنا</span>

            <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl leading-relaxed mt-6 text-charcoal">
              من قلب العطر العربي… فخامةٌ في متناولك
            </h2>

            <p className="font-ar-body text-lg md:text-xl leading-loose text-grey mt-6">
              وُلدت نَسَمَات من فكرة بسيطة: أن يكون العطر العربي الأصيل — بثرائه وعمقه — في
              متناول الجميع، دون مبالغة في السعر ولا في الادّعاء. نختار مكوّناتنا من العود
              والمسك والورد والعنبر، ونصوغها بتغليفٍ نظيفٍ عصري يليق بحضورك.
            </p>

            <p className="font-ar-body text-lg md:text-xl leading-loose text-grey mt-6">
              نتحدّث إليك كضيفٍ في بيتنا، لا كزبون. والعطر عندنا ليس منتجًا يُباع، بل نَسمة
              تمرّ فتترك أثرًا يُعرَف بك.
            </p>

            {/* Pillars */}
            <div className="flex flex-wrap gap-7 md:gap-8 mt-10">
              {PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)]`}
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
              رائحةٌ تُعرَف بها.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
