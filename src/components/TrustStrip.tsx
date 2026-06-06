import { Gift, ShieldCheck, Sparkles, Truck } from 'lucide-react'

interface TrustStripProps {
  className?: string
}

const trustPoints = [
  {
    icon: Truck,
    title: 'شحن مجاني',
    description: 'فوق 1500 جنيه على الطلبات المؤهلة',
  },
  {
    icon: Gift,
    title: 'تغليف هدية',
    description: 'مُجهز لتقديمه مباشرة كهدية',
  },
  {
    icon: ShieldCheck,
    title: 'دفع آمن',
    description: 'تجربة شراء واضحة ومطمئنة',
  },
  {
    icon: Sparkles,
    title: 'اختيار منسق',
    description: 'عطور عربية مختارة بروح موحدة',
  },
]

export function TrustStrip({ className = '' }: TrustStripProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {trustPoints.map((point) => {
          const Icon = point.icon

          return (
            <div
              key={point.title}
              className="flex items-start gap-3 rounded-lg border border-gold-soft bg-ivory-2 px-4 py-4 shadow-xs"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-wash text-gold-dark">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-ar-body font-semibold text-sm md:text-base text-charcoal">
                  {point.title}
                </p>
                <p className="font-ar-body text-xs md:text-sm leading-relaxed text-grey mt-1">
                  {point.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
