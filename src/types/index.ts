export interface PerfumeSize {
  size: string
  ml: number
  priceMultiplier: number
  stock: number
}

export interface Perfume {
  id: string
  ar: string
  en?: string
  fam: string
  notes: string
  price: string
  tag?: string
  tint: string
  opacity: number
  image: string
  sizes?: PerfumeSize[]
  description?: string
  story?: string
}

export interface Value {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
}

export interface Testimonial {
  id: string
  rating: number
  quote: string
  author: string
  location: string
  avatar: string
}

export interface PillarItem {
  ar: string
  en: string
}
