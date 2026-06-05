import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { getNumericPrice } from '../utils/helpers'
import { CheckCircle, Download, Home } from 'lucide-react'

interface Order {
  id: string
  date: string
  items: any[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
  }
}

export function OrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('nasamat_orders') || '[]')
    const foundOrder = orders.find((o: Order) => o.id === orderId)
    if (foundOrder) {
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <>
        <section className="min-h-screen bg-ivory py-20">
        <div className="wrap text-center">
          <p className="font-ar-body text-grey-3 mb-6">لم نتمكن من العثور على الطلب</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold text-charcoal px-8 py-4 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </section>
      <Footer />
      </>
    )
  }

  const expectedDelivery = new Date()
  expectedDelivery.setDate(expectedDelivery.getDate() + 5)

  return (
    <>
      <section className="min-h-screen bg-ivory py-16 md:py-20">
      <div className="wrap">
        {/* Success Message */}
        <div className="text-center mb-16">
          <CheckCircle size={64} className="mx-auto text-gold mb-6" />
          <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal mb-4">
            شكراً لك!
          </h1>
          <p className="font-ar-body text-lg text-grey max-w-2xl mx-auto">
            لقد تم استلام طلبك بنجاح. سيصل إليك تأكيد بريدي قريباً على{' '}
            <span className="font-semibold">{order.customer.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Number */}
            <div className="bg-gold-wash border border-gold rounded-lg p-6 md:p-8">
              <p className="font-body text-xs tracking-widest uppercase text-gold-dark mb-2">
                رقم الطلب
              </p>
              <p className="font-ar-display font-bold text-3xl md:text-4xl text-charcoal">
                {order.id}
              </p>
              <p className="font-ar-body text-grey mt-4">
                تاريخ الطلب: {order.date}
              </p>
            </div>

            {/* Delivery Information */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                معلومات التوصيل
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-grey-3 mb-2">
                    تم الشحن إلى
                  </p>
                  <div className="font-ar-body text-charcoal space-y-1">
                    <p className="font-semibold">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                    <p>{order.customer.address}</p>
                    <p>
                      {order.customer.city}, {order.customer.state}
                    </p>
                    <p>{order.customer.phone}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold-soft">
                  <p className="font-body text-xs tracking-widest uppercase text-grey-3 mb-2">
                    التاريخ المتوقع للوصول
                  </p>
                  <p className="font-ar-display font-bold text-lg text-gold">
                    {expectedDelivery.toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                تفاصيل الطلب
              </h2>

              <div className="space-y-4">
                {order.items.map((item: any) => {
                  const price = getNumericPrice(item.perfume.price)
                  const adjustedPrice = Math.round(price * item.selectedSize.priceMultiplier)
                  const itemTotal = adjustedPrice * item.quantity

                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center pb-4 border-b border-gold-soft last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-ar-body font-semibold text-charcoal">
                          {item.perfume.ar}
                        </p>
                        <p className="font-body text-xs text-grey-3 mt-1">
                          {item.selectedSize.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-ar-body font-semibold">
                        {itemTotal.toLocaleString('ar-EG')} جنيه
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gold-soft rounded-lg p-6 sticky top-20 space-y-4">
              <h3 className="font-ar-display font-bold text-xl text-charcoal">ملخص الطلب</h3>

              <div className="space-y-3 py-4 border-y border-gold-soft">
                <div className="flex justify-between">
                  <span className="font-ar-body text-grey">المجموع الفرعي</span>
                  <span className="font-ar-body font-semibold">
                    {order.subtotal.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-ar-body text-grey">الضريبة</span>
                  <span className="font-ar-body font-semibold">
                    {order.tax.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-ar-body text-grey">الشحن</span>
                  <span className="font-ar-body font-semibold">
                    {order.shipping === 0 ? 'مجاني' : `${order.shipping} جنيه`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <span className="font-ar-display font-bold">الإجمالي</span>
                <span className="font-ar-display font-bold text-2xl text-gold">
                  {order.total.toLocaleString('ar-EG')} جنيه
                </span>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 bg-ivory-2 border border-gold-soft text-charcoal py-3 rounded-sm font-ar-body font-semibold hover:bg-gold-wash transition-colors duration-300"
              >
                <Download size={16} />
                طباعة الطلب
              </button>

              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal py-3 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors duration-300"
              >
                <Home size={16} />
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-16 bg-gold-wash border border-gold rounded-lg p-6 md:p-8">
          <h3 className="font-ar-display font-bold text-2xl text-charcoal mb-4">الخطوات التالية</h3>
          <ul className="space-y-3 font-ar-body text-charcoal">
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✓</span>
              <span>ستصل رسالة بريد إلكتروني تأكيدية بتفاصيل طلبك</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✓</span>
              <span>سيتم شحن طلبك خلال 24 ساعة</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✓</span>
              <span>ستصل رسالة تتبع الشحنة عند الإرسال</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✓</span>
              <span>يتوقع وصول الطلب في خلال 5 أيام عمل</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
