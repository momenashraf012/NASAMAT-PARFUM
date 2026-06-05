import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Minus, Plus, Share2, Star } from 'lucide-react'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { PERFUMES } from '../data/perfumes'
import { useCart } from '../context/CartContext'
import { useReviews } from '../context/ReviewsContext'
import { useToast } from '../hooks/useToast'
import { useWishlist } from '../context/WishlistContext'

export function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const perfume = PERFUMES.find((p) => p.id === id)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { getPerfumeReviews, getAverageRating, addReview } = useReviews()
  const { addToast } = useToast()

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(perfume?.sizes?.[0])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
    userName: '',
  })

  if (!perfume) {
    return (
      <>
        <Announcement />
        <Header />
        <main id="top" className="bg-ivory">
          <section className="min-h-screen py-20">
            <div className="wrap text-center">
              <p className="font-ar-body text-grey-3">لم نجد هذا المنتج</p>
              <button
                onClick={() => navigate('/collection')}
                className="mt-4 inline-flex items-center gap-2 text-gold-dark hover:text-gold"
              >
                <ArrowLeft size={16} />
                العودة إلى المجموعة
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  const isWishlisted = isInWishlist(perfume.id)
  const reviews = getPerfumeReviews(perfume.id)
  const avgRating = getAverageRating(perfume.id)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart(perfume, selectedSize, quantity)
    addToast(`تم إضافة ${perfume.ar} إلى السلة`, 'success')
    setQuantity(1)
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(perfume.id)
      addToast('تم الحذف من المفضلة', 'info')
    } else {
      addToWishlist(perfume)
      addToast('تم الإضافة للمفضلة', 'success')
    }
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reviewForm.userName || !reviewForm.comment) {
      addToast('الرجاء ملء جميع الحقول', 'error')
      return
    }

    addReview(perfume.id, reviewForm.userName, reviewForm.rating, reviewForm.comment)
    addToast('شكراً على تقييمك', 'success')
    setReviewForm({ rating: 5, comment: '', userName: '' })
    setShowReviewForm(false)
  }

  return (
    <>
      <Announcement />
      <Header />
      <main id="top" className="bg-ivory">
        <section className="min-h-screen py-16 md:py-20">
          <div className="wrap">
            <button
              onClick={() => navigate('/collection')}
              className="mb-10 inline-flex items-center gap-2 font-ar-body text-gold-dark transition-colors hover:text-gold"
            >
              <ArrowLeft size={16} />
              العودة إلى المجموعة
            </button>

            <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-2">
              <div>
                <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-b from-[#25221e] to-[#141210]">
                  <img
                    src={perfume.image}
                    alt={perfume.ar}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-color"
                    style={{ backgroundColor: perfume.tint, opacity: perfume.opacity }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="mb-2 font-ar-display text-4xl font-bold text-charcoal md:text-5xl">
                    {perfume.ar}
                  </h1>
                  {perfume.en && (
                    <p className="font-body text-sm tracking-widest uppercase text-grey">
                      {perfume.en}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(avgRating) ? 'fill-gold text-gold' : 'text-grey-3'}
                      />
                    ))}
                  </div>
                  <span className="font-ar-body text-sm text-grey">
                    {avgRating} ({reviews.length} تقييم)
                  </span>
                </div>

                {perfume.description && (
                  <p className="font-ar-body text-lg leading-relaxed text-grey">
                    {perfume.description}
                  </p>
                )}

                {perfume.story && (
                  <div className="rounded-lg border border-gold-soft bg-gold-wash p-4">
                    <p className="font-ar-body text-sm italic text-gold-dark">«{perfume.story}»</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 font-body text-xs text-grey-3">النوع</p>
                    <p className="font-ar-body font-semibold text-charcoal">{perfume.fam}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-body text-xs text-grey-3">المكوِّنات</p>
                    <p className="font-ar-body font-semibold text-charcoal">{perfume.notes}</p>
                  </div>
                </div>

                {perfume.sizes && (
                  <div>
                    <p className="mb-3 font-ar-body font-semibold text-charcoal">الحجم</p>
                    <div className="flex flex-wrap gap-3">
                      {perfume.sizes.map((size) => (
                        <button
                          key={size.ml}
                          onClick={() => setSelectedSize(size)}
                          disabled={size.stock === 0}
                          className={`rounded-sm px-4 py-2 font-ar-body font-semibold transition-all ${
                            selectedSize?.ml === size.ml
                              ? 'bg-gold text-charcoal'
                              : 'border border-gold-soft bg-ivory-2 text-charcoal hover:border-gold'
                          } ${size.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                          {size.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gold-soft pt-4">
                  <p className="mb-1 font-body text-xs text-grey-3">السعر</p>
                  <p className="font-ar-display text-3xl font-bold text-gold">
                    {perfume.price}
                    <span className="ml-2 text-sm">جنيه</span>
                  </p>
                </div>

                {selectedSize && (
                  <p
                    className={`font-ar-body text-sm ${
                      selectedSize.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {selectedSize.stock > 0 ? `متوفر: ${selectedSize.stock} قطعة` : 'غير متوفر'}
                  </p>
                )}

                <div className="space-y-3 pt-4">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold-soft bg-ivory-2 transition-colors hover:bg-gold hover:text-charcoal"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-ar-body font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold-soft bg-ivory-2 transition-colors hover:bg-gold hover:text-charcoal"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedSize || selectedSize.stock === 0}
                      className="flex-1 rounded-sm bg-gold py-3 font-ar-body font-bold text-charcoal transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      أضف إلى السلة
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleWishlist}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-3 font-ar-body font-bold transition-colors ${
                        isWishlisted
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'border border-gold-soft bg-ivory-2 text-charcoal hover:bg-gold-wash'
                      }`}
                    >
                      <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                      {isWishlisted ? 'في المفضلة' : 'أضف للمفضلة'}
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-gold-soft bg-ivory-2 py-3 font-ar-body font-bold text-charcoal transition-colors hover:bg-gold-wash">
                      <Share2 size={16} />
                      مشاركة
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gold-soft pt-12">
              <h2 className="mb-8 font-ar-display text-3xl font-bold text-charcoal">التقييمات</h2>

              {!showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mb-8 rounded-sm bg-gold px-6 py-3 font-ar-body font-bold text-charcoal transition-colors hover:bg-gold-dark"
                >
                  أضف تقييمك
                </button>
              )}

              {showReviewForm && (
                <form
                  onSubmit={handleAddReview}
                  className="mb-8 space-y-4 rounded-lg border border-gold-soft bg-ivory-2 p-6"
                >
                  <input
                    type="text"
                    placeholder="اسمك"
                    value={reviewForm.userName}
                    onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                    className="w-full rounded-sm border border-gold-soft bg-white px-4 py-3 font-ar-body focus:border-gold focus:outline-none"
                  />
                  <div>
                    <p className="mb-2 font-ar-body font-semibold">التقييم</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating })}
                          className="p-2"
                        >
                          <Star
                            size={24}
                            className={
                              rating <= reviewForm.rating
                                ? 'fill-gold text-gold'
                                : 'text-grey-3'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="تقييمك"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full rounded-sm border border-gold-soft bg-white px-4 py-3 font-ar-body focus:border-gold focus:outline-none"
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 rounded-sm bg-gold py-3 font-ar-body font-bold text-charcoal transition-colors hover:bg-gold-dark"
                    >
                      إرسال
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 rounded-sm border border-gold-soft bg-ivory-2 py-3 font-ar-body font-bold text-charcoal transition-colors hover:bg-gold-wash"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="py-8 text-center font-ar-body text-grey-3">لا توجد تقييمات بعد</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="space-y-3 rounded-lg border border-gold-soft bg-white p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-ar-body font-semibold text-charcoal">{review.userName}</p>
                          <div className="mt-1 flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating ? 'fill-gold text-gold' : 'text-grey-3'
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="font-body text-xs text-grey-3">{review.date}</p>
                      </div>
                      <p className="font-ar-body text-grey">{review.comment}</p>
                      <button className="font-ar-body text-xs text-gold hover:text-gold-dark">
                        هل كان مفيداً؟ ({review.helpful})
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
