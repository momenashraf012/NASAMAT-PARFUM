import * as Dialog from '@radix-ui/react-dialog'
import { X, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Perfume, PerfumeSize } from '../types'
import { calculatePrice } from '../utils/helpers'
import { useCart } from '../context/CartContext'
import { useToast } from '../hooks/useToast'

interface ProductQuickViewProps {
  perfume: Perfume | null
  isOpen: boolean
  onClose: () => void
}

export function ProductQuickView({ perfume, isOpen, onClose }: ProductQuickViewProps) {
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState<PerfumeSize | null>(
    perfume?.sizes ? perfume.sizes[0] : null,
  )
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToast } = useToast()

  if (!perfume) return null

  const currentPrice = selectedSize
    ? calculatePrice(perfume.price, selectedSize.priceMultiplier)
    : perfume.price

  const isOutOfStock = selectedSize && selectedSize.stock === 0

  const handleAddToCart = () => {
    if (!selectedSize) return

    addToCart(perfume, selectedSize, quantity)
    addToast(`تم إضافة ${perfume.ar} إلى السلة`, 'success')
    setQuantity(1)
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-lg bg-ivory p-6 md:p-10 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xs aspect-[420/620] rounded-lg overflow-hidden bg-gradient-to-b from-[#25221e] to-[#141210]">
                <img
                  src={perfume.image}
                  alt={perfume.ar}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 mix-blend-color pointer-events-none"
                  style={{
                    backgroundColor: perfume.tint,
                    opacity: perfume.opacity,
                  }}
                ></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              {/* Header */}
              <div className="mb-6">
                <h3 className="font-ar-display font-bold text-3xl md:text-4xl text-charcoal mb-2">
                  {perfume.ar}
                </h3>
                {perfume.en && (
                  <p className="font-body text-sm md:text-base tracking-widest uppercase text-grey">
                    {perfume.en}
                  </p>
                )}
              </div>

              {/* Family */}
              <div className="mb-6">
                <p className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mb-1">
                  النوع
                </p>
                <p className="font-ar-body text-sm md:text-base text-charcoal">{perfume.fam}</p>
              </div>

              {/* Description */}
              {perfume.description && (
                <div className="mb-6">
                  <p className="font-ar-body text-sm md:text-base leading-relaxed text-grey">
                    {perfume.description}
                  </p>
                </div>
              )}

              {/* Notes */}
              <div className="mb-6">
                <p className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mb-2">
                  المكوّنات
                </p>
                <p className="font-ar-body text-sm md:text-base text-charcoal">{perfume.notes}</p>
              </div>

              {/* Story */}
              {perfume.story && (
                <div className="mb-6 pb-6 border-b border-gold-soft">
                  <p className="font-ar-body text-sm leading-relaxed text-grey italic">
                    «{perfume.story}»
                  </p>
                </div>
              )}

              {/* Size Selection */}
              {perfume.sizes && perfume.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mb-3">
                    الحجم
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {perfume.sizes.map((size) => (
                      <button
                        key={size.ml}
                        onClick={() => setSelectedSize(size)}
                        disabled={size.stock === 0}
                        className={`px-4 py-3 rounded-sm font-ar-body font-semibold text-sm md:text-base transition-all duration-300 border ${
                          selectedSize?.ml === size.ml
                            ? 'bg-gold text-charcoal border-gold'
                            : 'bg-ivory-2 text-charcoal border-gold-soft hover:border-gold'
                        } ${size.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>

                  {/* Stock Status */}
                  {selectedSize && (
                    <div className="mt-3">
                      <p
                        className={`font-ar-body text-xs md:text-sm ${
                          isOutOfStock ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {isOutOfStock
                          ? 'غير متوفر حاليًا'
                          : `متوفر: ${selectedSize.stock} قطعة`}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mb-3">
                  الكمية
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-sm bg-ivory-2 border border-gold-soft flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
                    aria-label="تقليل"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-ar-body font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-sm bg-ivory-2 border border-gold-soft flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
                    aria-label="زيادة"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="space-y-3 pt-6 border-t border-gold-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs md:text-sm tracking-widest uppercase text-grey-3 mb-1">
                      السعر
                    </p>
                    <p className="font-body font-semibold text-lg md:text-xl text-charcoal">
                      {currentPrice}
                      <span className="text-grey-3 font-normal text-xs md:text-sm ml-2">
                        جنيه
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || false}
                    className={`px-6 py-3 rounded-sm font-ar-body font-bold text-sm md:text-base transition-all duration-300 ${
                      isOutOfStock
                        ? 'bg-grey-3 text-ivory cursor-not-allowed opacity-50'
                        : 'bg-gold text-charcoal hover:bg-gold-dark hover:text-ivory hover:-translate-y-0.5 shadow-gold'
                    }`}
                  >
                    أضف إلى الحقيبة
                  </button>
                </div>
                <button
                  onClick={() => {
                    onClose()
                    navigate(`/product/${perfume.id}`)
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-gold-soft text-charcoal py-3 rounded-sm font-ar-body font-bold hover:bg-gold-wash transition-colors"
                >
                  عرض التفاصيل
                  <ArrowLeft size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
