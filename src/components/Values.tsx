import { Leaf, Truck, Star, LucideIcon } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ValueItem {
  icon: LucideIcon
  title: string
  subtitle: string
}

const values: ValueItem[] = [
  {
    icon: Leaf,
    title: 'مكوّنات عربية أصيلة',
    subtitle: 'Oud · Musk · Rose · Amber',
  },
  {
    icon: Truck,
    title: 'شحن مجّاني فوق ١٥٠٠ج',
    subtitle: 'Across Egypt & the Gulf',
  },
  {
    icon: Star,
    title: 'فخامة في متناولك',
    subtitle: 'Luxury within reach',
  },
]

interface ValueCardProps extends ValueItem {
  idx: number
}

function ValueCard({ icon: Icon, title, subtitle, idx }: ValueCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-4 md:px-6 ${
        idx > 0 ? 'border-t md:border-t-0 md:border-r border-gold-soft' : ''
      }`}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <span className="text-gold flex-shrink-0">
        <Icon size={26} />
      </span>
      <div className="text-center md:text-right">
        <div className="font-ar-body font-semibold text-sm md:text-base text-charcoal">
          {title}
        </div>
        <div className="font-body text-xs md:text-sm tracking-wider text-grey-3 mt-1 ltr">
          {subtitle}
        </div>
      </div>
    </div>
  )
}

export function Values() {
  return (
    <section className="border-y border-gold-soft bg-ivory-2">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {values.map((value, idx) => (
            <ValueCard key={idx} {...value} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
