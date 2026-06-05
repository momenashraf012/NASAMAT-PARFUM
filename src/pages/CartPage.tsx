import { useCart } from '../context/CartContext'
import { Footer } from '../components/Footer'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { calculatePrice, getNumericPrice } from '../utils/helpers'

export function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  const subtotal = cartTotal
  const tax = Math.round(subtotal * 0.15) // 15% ضريبة
  const shipping = subtotal > 500 ? 0 : 50 // شحن مجاني فوق 500
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <>
        <section className="min-h-screen bg-ivory py-20">
          <div className="wrap">
            {/* Header */}
            <div className="mb-16">
              <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal">
                سلتك
              </h1>
              <p className="font-ar-body text-grey mt-3">
                السلة فارغة حالياً
              </p>
            </div>

            {/* Empty State */}
            <div className="text-center py-20">
              <ShoppingBag size={64} className="mx-auto text-gold-soft mb-6" />
              <p className="font-ar-body text-lg text-grey-3 mb-8">
                لم تضف أي عطور إلى سلتك بعد
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gold text-charcoal px-8 py-4 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-all duration-300"
              >
                تصفح العطور <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <section className="bg-ivory py-16 md:py-20">
      <div className="wrap">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal mb-2">
            سلتك
          </h1>
          <p className="font-ar-body text-grey">
            {items.length} عطر في السلة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => {
                const price = getNumericPrice(item.perfume.price)
                const adjustedPrice = Math.round(price * item.selectedSize.priceMultiplier)
                const itemTotal = adjustedPrice * item.quantity

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gold-soft rounded-lg p-6 flex gap-6"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-b from-[#25221e] to-[#141210]">
                      <img
                        src={item.perfume.image}
                        alt={item.perfume.ar}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-ar-display font-bold text-xl text-charcoal">
                          {item.perfume.ar}
                        </h3>
                        <p className="font-body text-xs tracking-widest uppercase text-grey-3 mt-1">
                          {item.selectedSize.size}
                        </p>
                        <p className="font-ar-body text-sm text-grey mt-2">
                          {item.perfume.fam}
                        </p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.perfume.id,
                              item.selectedSize.ml,
                              item.quantity - 1,
                            )
                          }
                          className="w-8 h-8 rounded-sm bg-ivory-2 border border-gold-soft flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-ar-body font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.perfume.id,
                              item.selectedSize.ml,
                              item.quantity + 1,
                            )
                          }
                          className="w-8 h-8 rounded-sm bg-ivory-2 border border-gold-soft flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() =>
                          removeFromCart(item.perfume.id, item.selectedSize.ml)
                        }
                        className="text-grey-3 hover:text-red-600 transition-colors"
                        aria-label="حذف من السلة"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div className="text-right">
                        <p className="font-body font-semibold text-sm text-grey-3 mb-1">
                          {calculatePrice(item.perfume.price, item.selectedSize.priceMultiplier)}
                          <span className="text-xs ml-1">جنيه</span>
                        </p>
                        <p className="font-ar-body font-bold text-xl text-charcoal">
                          {itemTotal.toLocaleString('ar-EG')}
                          <span className="text-xs ml-1">جنيه</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gold-soft rounded-lg p-6 sticky top-20 space-y-4">
              <h3 className="font-ar-display font-bold text-xl text-charcoal">ملخص الطلب</h3>

              <div className="space-y-3 py-4 border-y border-gold-soft">
                <div className="flex justify-between items-center">
                  <span className="font-ar-body text-grey">المجموع الفرعي</span>
                  <span className="font-ar-body font-semibold">
                    {subtotal.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-ar-body text-grey">الضريبة (15%)</span>
                  <span className="font-ar-body font-semibold">
                    {tax.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-ar-body text-grey">الشحن</span>
                  <span className="font-ar-body font-semibold">
                    {shipping === 0 ? 'مجاني' : `${shipping} جنيه`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="font-ar-display font-bold text-lg">الإجمالي</span>
                <span className="font-ar-display font-bold text-2xl text-gold">
                  {total.toLocaleString('ar-EG')} جنيه
                </span>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-gold text-charcoal py-4 rounded-sm font-ar-body font-bold text-center hover:bg-gold-dark transition-colors duration-300 mt-6"
              >
                متابعة الشراء
              </Link>

              <Link
                to="/"
                className="block w-full border border-gold-soft text-charcoal py-4 rounded-sm font-ar-body font-bold text-center hover:bg-gold-wash transition-colors duration-300"
              >
                متابعة التسوق
              </Link>

              {shipping === 0 && (
                <div className="bg-gold-wash border border-gold-soft rounded-sm p-3 text-center">
                  <p className="font-ar-body text-xs text-gold-dark">
                    ✓ شحن مجاني على هذا الطلب
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
