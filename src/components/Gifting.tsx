import { useState } from 'react'
import { MessageSquareHeart, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type PackageType = 'box' | 'bag'

export function Gifting() {
  const [recipientName, setRecipientName] = useState('')
  const [giftMessage, setGiftMessage] = useState('')
  const [packageType, setPackageType] = useState<PackageType>('box')
  const introRef = useScrollReveal<HTMLDivElement>()
  const notePreview = giftMessage.trim() || 'اكتب رسالة قصيرة ترفق مع الهدية'

  return (
    <section className="section bg-ivory-2 border-t border-gold-soft" id="gifting">
      <div className="wrap">
        <div
          ref={introRef}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="eyebrow justify-center">الهدايا</span>
          <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-4">
            تغليف يرفع قيمة الهدية
          </h2>
          <p className="font-ar-body text-base md:text-lg leading-loose text-grey mt-6">
            صندوق بتفصيلة فخمة، كيس بتطريز عربي ذهبي، ورسالة إهداء قصيرة تجعل الهدية تبدو
            شخصية ومكتملة من أول نظرة.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <GiftCard
              image="/assets/gift-box.png"
              title="صندوق الهدية"
              subtitle="غلاف فخم بطبعة ذهبية بارزة ولمسة رسمية أنيقة"
              details="مثالي للطلبات التي تريدها أن تصل جاهزة للتقديم."
              isDark={true}
              delayIdx={0}
            />

            <GiftCard
              image="/assets/gift-bag.png"
              title="كيس الهدية"
              subtitle="كيس فاخر بخامة قوية وزخرفة عربية محسوبة"
              details="خيار خفيف وأنيق إذا كنت تفضل حضورًا أقل رسمية."
              isDark={false}
              delayIdx={1}
            />
          </div>

          <div className="rounded-2xl border border-gold-soft bg-ivory px-6 md:px-8 py-6 md:py-8 shadow-sm">
            <div className="flex items-center gap-2 text-gold-dark font-body text-xs tracking-widest uppercase">
              <MessageSquareHeart size={16} />
              رسالة إهداء
            </div>

            <h3 className="font-ar-display font-bold text-2xl md:text-3xl text-charcoal mt-4">
              أضف لمسة شخصية للهدية
            </h3>
            <p className="font-ar-body text-sm md:text-base leading-loose text-grey mt-4">
              يمكن أن ترافق الهدية بطاقة قصيرة باسم المستلم وكلمة بسيطة منك. هذه اللمسة الصغيرة
              تجعل التجربة أكثر دفئًا وخصوصية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-grey-3 mb-2 block">
                  اسم المستلم
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="مثال: أمي"
                  className="w-full rounded-sm border border-gold-soft bg-ivory-2 px-4 py-3 font-ar-body text-charcoal placeholder-grey-3 focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-grey-3 mb-2 block">
                  نوع التغليف
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'box' as const, label: 'الصندوق' },
                    { key: 'bag' as const, label: 'الكيس' },
                  ].map((option) => {
                    const active = packageType === option.key

                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setPackageType(option.key)}
                        className={`rounded-sm border px-4 py-3 font-ar-body text-sm transition-all ${
                          active
                            ? 'border-gold bg-gold-wash text-charcoal'
                            : 'border-gold-soft bg-white text-grey hover:border-gold'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-body text-xs tracking-widest uppercase text-grey-3 mb-2 block">
                نص الرسالة
              </label>
              <textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="كل عام وأنت بخير، ونسمة جميلة ترافق أيامك"
                className="w-full rounded-sm border border-gold-soft bg-ivory-2 px-4 py-3 font-ar-body text-charcoal placeholder-grey-3 focus:border-gold focus:outline-none"
                rows={4}
              />
            </div>

            <div className="mt-6 rounded-xl border border-gold-soft bg-gold-wash p-5">
              <div className="flex items-center gap-2 text-gold-dark font-body text-xs tracking-widest uppercase">
                <Sparkles size={16} />
                معاينة سريعة
              </div>
              <p className="font-ar-body text-sm text-charcoal mt-3 leading-loose">
                {recipientName ? `إلى ${recipientName}، ` : ''}
                {notePreview}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-ar-body text-sm font-semibold text-charcoal">
                  التغليف المختار
                </span>
                <span className="font-ar-body text-sm text-grey">
                  {packageType === 'box' ? 'صندوق الهدية' : 'كيس الهدية'}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  title: 'جاهز للإهداء',
                  description: 'مظهر راقٍ من أول فتح للصندوق.',
                },
                {
                  title: 'تفصيلة شخصية',
                  description: 'رسالة قصيرة تضيف معنى للهدية.',
                },
                {
                  title: 'تجربة متكاملة',
                  description: 'التغليف جزء من قيمة العطر نفسها.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-gold-soft bg-white p-4">
                  <p className="font-ar-body font-semibold text-charcoal">{item.title}</p>
                  <p className="font-ar-body text-sm leading-relaxed text-grey mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface GiftCardProps {
  image: string
  title: string
  subtitle: string
  details: string
  isDark: boolean
  delayIdx: number
}

function GiftCard({ image, title, subtitle, details, isDark, delayIdx }: GiftCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] relative rounded-2xl overflow-hidden border border-gold-soft shadow-sm hover:shadow-md hover:-translate-y-2 hover:duration-300 min-h-[420px]"
      style={{ transitionDelay: `${delayIdx * 80}ms` }}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />

      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-t from-charcoal/70 via-charcoal/25 to-transparent'
            : 'bg-gradient-to-t from-ivory/92 via-ivory/60 to-transparent'
        }`}
      ></div>

      <div className="absolute inset-x-0 top-0 px-5 py-4 flex items-center justify-between">
        <span
          className={`font-body text-[11px] tracking-[0.24em] uppercase ${
            isDark ? 'text-gold' : 'text-gold-dark'
          }`}
        >
          Packaging
        </span>
        <span
          className={`rounded-full border px-3 py-1 font-ar-body text-xs ${
            isDark ? 'border-gold-soft text-ivory' : 'border-gold-soft text-charcoal'
          }`}
        >
          {isDark ? 'Premium Box' : 'Gift Bag'}
        </span>
      </div>

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
        <p
          className={`font-ar-body text-xs md:text-sm mt-4 leading-relaxed ${
            isDark ? 'text-cream/75' : 'text-grey-3'
          }`}
        >
          {details}
        </p>
      </div>
    </div>
  )
}
