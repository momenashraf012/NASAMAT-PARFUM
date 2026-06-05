import { Perfume } from '../types'

function convertArabicToEnglish(text: string): string {
  return text.replace(/[٠-٩۰-۹]/g, (d) => {
    const code = d.charCodeAt(0)

    // Arabic-Indic digits: ٠-٩
    if (code >= 0x0660 && code <= 0x0669) {
      return String.fromCharCode(code - 0x0660 + 0x30)
    }

    // Eastern Arabic digits: ۰-۹
    if (code >= 0x06f0 && code <= 0x06f9) {
      return String.fromCharCode(code - 0x06f0 + 0x30)
    }

    return d
  })
}

export function getNumericPrice(price: string): number {
  const englishPrice = convertArabicToEnglish(price)
  return parseInt(englishPrice.replace(/[^\d]/g, ''))
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function searchPerfumes(perfumes: Perfume[], query: string): Perfume[] {
  if (!query.trim()) return perfumes

  const lowercaseQuery = query.toLowerCase()
  return perfumes.filter(
    (perfume) =>
      perfume.ar.includes(query) ||
      perfume.en?.toLowerCase().includes(lowercaseQuery) ||
      perfume.notes.includes(query) ||
      perfume.fam.toLowerCase().includes(lowercaseQuery),
  )
}

export type FilterFamily = 'all' | 'oud' | 'rose' | 'amber' | 'musk'
export type SortOption = 'newest' | 'popular' | 'price-low' | 'price-high'
export type RatingFilter = 'all' | 'above-4' | 'above-3' | 'above-2'

const FRAGRANCE_FAMILIES: Record<FilterFamily, string[]> = {
  all: [],
  oud: ['عود', 'Oud'],
  rose: ['ورد', 'Rose'],
  amber: ['عنبر', 'Amber'],
  musk: ['مسك', 'Musk'],
}

export function filterByFamily(perfumes: Perfume[], family: FilterFamily): Perfume[] {
  if (family === 'all') return perfumes

  const keywords = FRAGRANCE_FAMILIES[family]
  return perfumes.filter((perfume) =>
    keywords.some((keyword) => perfume.notes.includes(keyword) || perfume.fam.includes(keyword)),
  )
}

export function sortPerfumes(perfumes: Perfume[], sortBy: SortOption): Perfume[] {
  const sorted = [...perfumes]

  switch (sortBy) {
    case 'newest':
      return sorted
    case 'popular':
      return sorted.sort((itemA, itemB) => {
        const aIsPopular = itemA.tag === 'الأكثر مبيعًا' ? 1 : 0
        const bIsPopular = itemB.tag === 'الأكثر مبيعًا' ? 1 : 0
        return bIsPopular - aIsPopular
      })
    case 'price-low':
      return sorted.sort((itemA, itemB) => {
        const priceA = getNumericPrice(itemA.price)
        const priceB = getNumericPrice(itemB.price)
        return priceA - priceB
      })
    case 'price-high':
      return sorted.sort((itemA, itemB) => {
        const priceA = getNumericPrice(itemA.price)
        const priceB = getNumericPrice(itemB.price)
        return priceB - priceA
      })
    default:
      return sorted
  }
}

export function filterByPriceRange(perfumes: Perfume[], minPrice: number, maxPrice: number): Perfume[] {
  return perfumes.filter((perfume) => {
    const price = getNumericPrice(perfume.price)
    return price >= minPrice && price <= maxPrice
  })
}

export function applyFilters(
  perfumes: Perfume[],
  searchQuery: string,
  family: FilterFamily,
  sortBy: SortOption,
  minPrice?: number,
  maxPrice?: number,
): Perfume[] {
  let filtered = perfumes

  // Apply search
  filtered = searchPerfumes(filtered, searchQuery)

  // Apply family filter
  filtered = filterByFamily(filtered, family)

  // Apply price range filter
  if (minPrice !== undefined && maxPrice !== undefined) {
    filtered = filterByPriceRange(filtered, minPrice, maxPrice)
  }

  // Apply sorting
  filtered = sortPerfumes(filtered, sortBy)

  return filtered
}

export function calculatePrice(basePrice: string, multiplier: number): string {
  const numPrice = getNumericPrice(basePrice)
  const newPrice = Math.round(numPrice * multiplier)
  return newPrice.toLocaleString('ar-EG')
}
