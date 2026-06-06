import { useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useReviews } from '../context/ReviewsContext'
import { useToast } from '../hooks/useToast'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PERFUMES } from '../data/perfumes'
import { Perfume } from '../types'
import { applyFilters, FilterFamily, SortOption } from '../utils/helpers'
import { TrustStrip } from './TrustStrip'

interface ProductCardProps {
  perfume: Perfume
  delayIdx: number
}

function ProductCard({ perfume, delayIdx }: ProductCardProps) {
  const navigate = useNavigate()
  const ref = useScrollReveal<HTMLDivElement>()
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const defaultSize = perfume.sizes?.[0]

  const handleCardClick = () => {
    navigate(`/product/${perfume.id}`)
  }

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (!defaultSize || defaultSize.stock === 0) {
      addToast('هذا العطر غير متوفر بالحجم الأساسي حاليًا', 'info')
      return
    }

    addToCart(perfume, defaultSize, 1)
    addToast(`تمت إضافة ${perfume.ar} إلى السلة`, 'success')
  }

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] bg-ivory-2 border border-gold-soft rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-2 hover:duration-300 flex flex-col text-start cursor-pointer group"
      style={{ transitionDelay: `${delayIdx * 80}ms` }}
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#25221e] to-[#141210]">
        {perfume.tag && (
          <span className="absolute top-3.5 right-3.5 z-10 font-body font-semibold text-xs md:text-sm tracking-wider uppercase bg-gold text-charcoal px-3 py-1 rounded-full pointer-events-none">
            {perfume.tag}
          </span>
        )}
        <img
          src={perfume.image}
          alt={`عطر ${perfume.ar}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: 'center 30%' }}
          loading="lazy"
        />
        <div
          className="absolute inset-0 z-5 mix-blend-color pointer-events-none"
          style={{
            backgroundColor: perfume.tint,
            opacity: perfume.opacity,
          }}
        ></div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-ar-display font-bold text-xl md:text-2xl text-charcoal">
          {perfume.ar}
        </h3>

        <div className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mt-1">
          {perfume.fam}
        </div>

        <p className="font-ar-body text-sm md:text-base leading-relaxed text-grey mt-3">
          {perfume.notes}
        </p>

        <div className="flex items-center justify-between mt-5 md:mt-6 pt-5 md:pt-6 border-t border-hairline">
          <div>
            <div className="font-body font-semibold text-base md:text-lg text-charcoal">
              {perfume.price}
              <span className="text-grey-3 font-normal text-xs md:text-sm ml-2">
                جنيه · 50ml
              </span>
            </div>
            <p className="font-ar-body text-xs text-grey-3 mt-1">
              جاهز للتجربة اليومية أو كهدية أنيقة
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 rounded-full border border-gold-soft bg-ivory px-4 py-2 font-ar-body text-xs md:text-sm font-semibold text-charcoal transition-colors duration-300 hover:bg-gold-wash hover:border-gold"
            >
              <ShoppingBag size={14} />
              أضف للسلة
            </button>
            <div className="font-ar-body font-bold text-xs md:text-sm text-gold-dark inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-gold">
              عرض <ArrowLeft size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Collection() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const { getAverageRating } = useReviews()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFamily, setSelectedFamily] = useState<FilterFamily>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000)
  const [minRating, setMinRating] = useState(0)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const filteredPerfumes = useMemo(() => {
    let result = applyFilters(PERFUMES, searchQuery, selectedFamily, sortBy, minPrice, maxPrice)

    if (minRating > 0) {
      result = result.filter((perfume) => getAverageRating(perfume.id) >= minRating)
    }

    return result
  }, [searchQuery, selectedFamily, sortBy, minPrice, maxPrice, minRating, getAverageRating])

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedFamily('all')
    setSortBy('newest')
    setMinPrice(0)
    setMaxPrice(2000)
    setMinRating(0)
  }

  const hasActiveFilters =
    searchQuery || selectedFamily !== 'all' || sortBy !== 'newest' || minPrice > 0 || maxPrice < 2000 || minRating > 0

  return (
    <section className="section" id="collection">
      <div className="wrap">
        <div
          ref={headerRef}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 md:mb-16"
        >
          <div>
            <span className="eyebrow">المجموعة</span>
            <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-4">
              عطور ناسامات
            </h2>
            <p className="font-ar-body text-sm md:text-base leading-relaxed text-grey mt-4 max-w-2xl">
              اختيار هادئ وواضح، مع تفاصيل ثقة تجعل قرار الشراء أسهل من أول نظرة.
            </p>
          </div>
          <a
            href="#collection"
            className="font-ar-body font-semibold text-gold-dark inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
          >
            عرض الكل <ArrowLeft size={16} />
          </a>
        </div>

        <TrustStrip className="mb-10 md:mb-12" />

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-3 pointer-events-none"
            />
            <input
              type="text"
              placeholder="ابحث عن عطر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-10 pl-4 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-sm md:text-base text-charcoal placeholder-grey-3 transition-all duration-300 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              aria-label="بحث عن عطر"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center flex-wrap">
            <div className="flex items-center gap-2">
              <label className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3">
                العائلة:
              </label>
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value as FilterFamily)}
                className="py-2 px-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-sm text-charcoal transition-all duration-300 focus:outline-none focus:border-gold"
                aria-label="فلترة حسب عائلة العطر"
              >
                <option value="all">الكل</option>
                <option value="oud">عود</option>
                <option value="rose">ورد</option>
                <option value="amber">عنبر</option>
                <option value="musk">مسك</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3">
                ترتيب:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="py-2 px-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-sm text-charcoal transition-all duration-300 focus:outline-none focus:border-gold"
                aria-label="ترتيب النتائج"
              >
                <option value="newest">الأحدث</option>
                <option value="popular">الأكثر مبيعًا</option>
                <option value="price-low">السعر: من الأقل</option>
                <option value="price-high">السعر: من الأعلى</option>
              </select>
            </div>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 py-2 px-3 bg-ivory-2 border border-gold-soft rounded-sm text-charcoal hover:bg-gold-wash transition-colors duration-300 font-ar-body text-sm"
            >
              فلاتر متقدمة
              <ChevronDown
                size={16}
                className={`transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
              />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 py-2 px-3 text-gold-dark hover:text-gold transition-colors duration-300 font-ar-body text-sm"
                aria-label="مسح المرشحات"
              >
                <X size={16} />
                مسح المرشحات
              </button>
            )}
          </div>

          {showAdvancedFilters && (
            <div className="bg-ivory-2 border border-gold-soft rounded-lg p-6 space-y-6">
              <div>
                <p className="font-ar-body font-semibold text-charcoal mb-3">نطاق السعر</p>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="font-ar-body text-xs text-grey-3 mb-1 block">من</label>
                      <input
                        type="number"
                        min="0"
                        max="2000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value) || 0, maxPrice))}
                        className="w-full px-3 py-2 bg-white border border-gold-soft rounded-sm font-ar-body text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-ar-body text-xs text-grey-3 mb-1 block">إلى</label>
                      <input
                        type="number"
                        min="0"
                        max="2000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value) || 2000, minPrice))}
                        className="w-full px-3 py-2 bg-white border border-gold-soft rounded-sm font-ar-body text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice))}
                    className="w-full h-2 bg-gold-soft rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="font-ar-body text-sm text-grey">
                    {minPrice} - {maxPrice} جنيه
                  </p>
                </div>
              </div>

              <div>
                <p className="font-ar-body font-semibold text-charcoal mb-3">التقييم</p>
                <div className="space-y-2">
                  {[
                    { value: 0, label: 'الكل' },
                    { value: 2, label: '★★ وأعلى' },
                    { value: 3, label: '★★★ وأعلى' },
                    { value: 4, label: '★★★★ وأعلى' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === option.value}
                        onChange={() => setMinRating(option.value)}
                        className="w-4 h-4 cursor-pointer accent-gold"
                      />
                      <span className="font-ar-body text-sm text-charcoal">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="font-ar-body text-xs md:text-sm text-grey-3">
            {filteredPerfumes.length} من {PERFUMES.length} عطر
          </p>
        </div>

        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {filteredPerfumes.map((perfume, idx) => (
              <ProductCard key={perfume.id} perfume={perfume} delayIdx={idx % 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-ar-body text-base md:text-lg text-grey-3 mb-4">
              لم نجد عطرًا يطابق بحثك
            </p>
            <button
              onClick={clearSearch}
              className="font-ar-body font-semibold text-gold-dark hover:text-gold transition-colors duration-300"
            >
              مسح المرشحات
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
