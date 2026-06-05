import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../hooks/useToast'
import { Footer } from '../components/Footer'
import { Trash2, ShoppingBag, Heart } from 'lucide-react'

export function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = (item: any) => {
    if (item.sizes && item.sizes.length > 0) {
      addToCart(item, item.sizes[0], 1)
      addToast(`تم إضافة ${item.ar} إلى السلة`, 'success')
    }
  }

  if (items.length === 0) {
    return (
      <>
        <section className="min-h-screen bg-ivory py-20">
        <div className="wrap">
          <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal mb-12">
            المفضلة
          </h1>

          <div className="text-center py-20">
            <Heart size={64} className="mx-auto text-gold-soft mb-6" />
            <p className="font-ar-body text-lg text-grey-3 mb-8">
              لا توجد عطور في قائمة المفضلة
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gold text-charcoal px-8 py-4 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors"
            >
              تصفح العطور
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
      <section className="min-h-screen bg-ivory py-16 md:py-20">
      <div className="wrap">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal">
            المفضلة
          </h1>
          {items.length > 0 && (
            <button
              onClick={() => {
                clearWishlist()
                addToast('تم مسح المفضلة', 'info')
              }}
              className="text-red-600 hover:text-red-700 font-ar-body text-sm"
            >
              مسح الكل
            </button>
          )}
        </div>

        <p className="font-ar-body text-grey mb-8">
          {items.length} عطر في قائمة المفضلة
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gold-soft rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#25221e] to-[#141210]">
                {item.tag && (
                  <span className="absolute top-3 right-3 bg-gold text-charcoal text-xs font-bold px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.ar}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div
                  className="absolute inset-0 mix-blend-color"
                  style={{ backgroundColor: item.tint, opacity: item.opacity }}
                ></div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-ar-display font-bold text-xl text-charcoal mb-2">
                  {item.ar}
                </h3>
                <p className="font-ar-body text-sm text-grey mb-4">{item.notes}</p>

                <p className="font-ar-display font-bold text-lg text-gold mb-6">
                  {item.price}
                  <span className="text-xs ml-1">جنيه</span>
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold text-charcoal py-3 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors"
                  >
                    <ShoppingBag size={16} />
                    أضف
                  </button>
                  <button
                    onClick={() => {
                      removeFromWishlist(item.id)
                      addToast('تم الحذف من المفضلة', 'info')
                    }}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-sm hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Link to Details */}
                <Link
                  to={`/product/${item.id}`}
                  className="block mt-4 text-center text-gold-dark hover:text-gold font-ar-body text-sm transition-colors"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
