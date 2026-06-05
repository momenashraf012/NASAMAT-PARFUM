import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCoupon } from '../context/CouponContext'
import { useToast } from '../hooks/useToast'
import { Footer } from '../components/Footer'
import { getNumericPrice } from '../utils/helpers'
import { ArrowLeft, X, Check } from 'lucide-react'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, cartTotal, clearCart } = useCart()
  const { appliedCoupon, applyCoupon, removeCoupon, validateCoupon } = useCoupon()
  const { addToast } = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
  })

  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')

  const subtotal = cartTotal
  const tax = Math.round(subtotal * 0.15)
  const shipping = subtotal > 500 ? 0 : 50
  const discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount / 100)) : 0
  const total = subtotal + tax + shipping - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApplyCoupon = () => {
    setCouponError('')

    const validation = validateCoupon(couponCode, subtotal)
    if (!validation.valid) {
      setCouponError(validation.error || 'خطأ في الكود')
      addToast(validation.error || 'خطأ في الكود', 'error')
      return
    }

    const result = applyCoupon(couponCode)
    if (result.success) {
      setCouponCode('')
      addToast(`تم تطبيق الكود بنجاح - خصم ${result.coupon?.discount}%`, 'success')
    } else {
      setCouponError(result.error || 'فشل تطبيق الكود')
      addToast(result.error || 'فشل تطبيق الكود', 'error')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate order
    const orderId = `NAM-${Date.now()}`
    const orderData = {
      id: orderId,
      date: new Date().toLocaleString('ar-SA'),
      items,
      subtotal,
      tax,
      shipping,
      discount,
      appliedCoupon: appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : null,
      total,
      customer: formData,
      status: 'confirmed',
    }

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('nasamat_orders') || '[]')
    orders.push(orderData)
    localStorage.setItem('nasamat_orders', JSON.stringify(orders))

    // Clear cart
    clearCart()

    // Redirect to confirmation
    navigate(`/order-confirmation/${orderId}`)
  }

  if (items.length === 0) {
    return (
      <>
        <section className="min-h-screen bg-ivory py-20">
          <div className="wrap">
            <p className="font-ar-body text-grey-3 mb-6">السلة فارغة</p>
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-gold-dark hover:text-gold"
            >
              <ArrowLeft size={16} />
              العودة إلى السلة
            </button>
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
        <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal mb-12">
          إتمام الشراء
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                معلومات الشخصية
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="الاسم الأول"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="اسم العائلة"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                عنوان التوصيل
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="العنوان"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="المدينة"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="المحافظة"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <input
                  type="text"
                  name="zipCode"
                  placeholder="الرمز البريدي"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                طريقة التوصيل
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gold-soft rounded-sm cursor-pointer hover:bg-gold-wash transition-colors">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-ar-body font-semibold text-charcoal">التوصيل العادي</p>
                    <p className="font-ar-body text-xs text-grey mt-1">من 3-5 أيام عمل</p>
                  </div>
                  <span className="font-ar-body font-semibold">50 جنيه</span>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gold-soft rounded-sm cursor-pointer hover:bg-gold-wash transition-colors">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-ar-body font-semibold text-charcoal">التوصيل السريع</p>
                    <p className="font-ar-body text-xs text-grey mt-1">من 1-2 يوم عمل</p>
                  </div>
                  <span className="font-ar-body font-semibold">100 جنيه</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                طريقة الدفع
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gold-soft rounded-sm cursor-pointer hover:bg-gold-wash transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="font-ar-body font-semibold">بطاقة ائتمان / خصم</span>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gold-soft rounded-sm cursor-pointer hover:bg-gold-wash transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="font-ar-body font-semibold">دفع عند الاستلام</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gold-soft rounded-lg p-6 sticky top-20 space-y-4">
              <h3 className="font-ar-display font-bold text-xl text-charcoal">ملخص الطلب</h3>

              <div className="max-h-64 overflow-y-auto space-y-3 py-4 border-y border-gold-soft">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-ar-body font-semibold text-sm text-charcoal">
                        {item.perfume.ar}
                      </p>
                      <p className="font-body text-xs text-grey-3">
                        {item.selectedSize.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-ar-body font-semibold text-sm whitespace-nowrap">
                      {(
                        Math.round(getNumericPrice(item.perfume.price) * item.selectedSize.priceMultiplier) *
                        item.quantity
                      ).toLocaleString('ar-EG')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="space-y-3 py-4 border-b border-gold-soft">
                {appliedCoupon ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-300 rounded-sm p-3">
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-ar-body text-sm text-green-700 font-semibold">
                        {appliedCoupon.code}
                      </p>
                      <p className="font-ar-body text-xs text-green-600">
                        خصم {appliedCoupon.discount}%
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeCoupon()
                        addToast('تم إزالة الكود', 'info')
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="أدخل كود الخصم"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError('')
                        }}
                        className="flex-1 px-3 py-2 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-sm text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                        className="px-4 py-2 bg-gold text-charcoal rounded-sm font-ar-body font-semibold text-sm hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        تطبيق
                      </button>
                    </div>
                    {couponError && (
                      <p className="font-ar-body text-xs text-red-600">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3 py-4 border-b border-gold-soft">
                <div className="flex justify-between">
                  <span className="font-ar-body text-grey">المجموع الفرعي</span>
                  <span className="font-ar-body font-semibold">
                    {subtotal.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-ar-body text-grey">الضريبة</span>
                  <span className="font-ar-body font-semibold">
                    {tax.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-ar-body text-grey">الشحن</span>
                  <span className="font-ar-body font-semibold">
                    {shipping === 0 ? 'مجاني' : `${shipping} جنيه`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-ar-body text-green-600">الخصم</span>
                    <span className="font-ar-body font-semibold">
                      -{discount.toLocaleString('ar-EG')} جنيه
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <span className="font-ar-display font-bold text-lg">الإجمالي</span>
                <span className="font-ar-display font-bold text-2xl text-gold">
                  {total.toLocaleString('ar-EG')} جنيه
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-charcoal py-4 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors duration-300 mt-6"
              >
                تأكيد الطلب
              </button>

              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="w-full border border-gold-soft text-charcoal py-4 rounded-sm font-ar-body font-bold hover:bg-gold-wash transition-colors duration-300"
              >
                العودة إلى السلة
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <Footer />
    </>
  )
}
