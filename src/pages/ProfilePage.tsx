import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { Footer } from '../components/Footer'
import { LogOut, Edit2, Check, X } from 'lucide-react'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, updateProfile, getOrderHistory } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(
    user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          zipCode: user.zipCode || '',
        }
      : {},
  )

  if (!user) {
    return (
      <>
        <section className="min-h-screen bg-ivory py-20">
        <div className="wrap text-center">
          <p className="font-ar-body text-grey-3 mb-6">يجب تسجيل الدخول أولاً</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gold text-charcoal px-8 py-4 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors"
          >
            تسجيل الدخول
          </button>
        </div>
      </section>
      <Footer />
      </>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const orders = getOrderHistory()

  return (
    <>
      <section className="min-h-screen bg-ivory py-16 md:py-20">
      <div className="wrap">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-ar-display font-bold text-4xl md:text-5xl text-charcoal">
            ملفي الشخصي
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-sm font-ar-body font-bold hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gold-soft rounded-lg p-6 sticky top-20 space-y-6">
              {/* User Info */}
              <div>
                <div className="w-16 h-16 rounded-full bg-gold-wash border border-gold flex items-center justify-center mx-auto mb-4">
                  <span className="font-ar-display font-bold text-3xl text-gold">
                    {user.firstName[0]}
                  </span>
                </div>
                <h2 className="font-ar-display font-bold text-xl text-charcoal text-center mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="font-ar-body text-sm text-grey text-center">{user.email}</p>
              </div>

              {/* Stats */}
              <div className="border-t border-gold-soft pt-6 space-y-4">
                <div className="text-center pb-4 border-b border-gold-soft">
                  <p className="font-body text-xs text-grey-3 mb-1">عدد الطلبات</p>
                  <p className="font-ar-display font-bold text-3xl text-gold">{orders.length}</p>
                </div>

                <div className="text-center">
                  <p className="font-body text-xs text-grey-3 mb-1">تاريخ التسجيل</p>
                  <p className="font-ar-body text-sm text-charcoal">
                    {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                className="w-full flex items-center justify-center gap-2 border border-gold-soft text-charcoal py-3 rounded-sm font-ar-body font-bold hover:bg-gold-wash transition-colors"
              >
                <Edit2 size={16} />
                {isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-ar-display font-bold text-2xl text-charcoal">
                  البيانات الشخصية
                </h2>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 bg-gold text-charcoal px-4 py-2 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors"
                    >
                      <Check size={16} />
                      حفظ
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1 bg-grey-3 text-ivory px-4 py-2 rounded-sm font-ar-body font-bold hover:bg-grey transition-colors"
                    >
                      <X size={16} />
                      إلغاء
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="الاسم الأول"
                    className="px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="اسم العائلة"
                    className="px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="رقم الهاتف"
                    className="md:col-span-2 px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="العنوان"
                    className="md:col-span-2 px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="المدينة"
                    className="px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="المحافظة"
                    className="px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-body text-xs text-grey-3 mb-1">الاسم الأول</p>
                      <p className="font-ar-body text-charcoal">{user.firstName}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-grey-3 mb-1">اسم العائلة</p>
                      <p className="font-ar-body text-charcoal">{user.lastName}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-body text-xs text-grey-3 mb-1">البريد الإلكتروني</p>
                    <p className="font-ar-body text-charcoal">{user.email}</p>
                  </div>

                  <div>
                    <p className="font-body text-xs text-grey-3 mb-1">رقم الهاتف</p>
                    <p className="font-ar-body text-charcoal">{user.phone}</p>
                  </div>

                  {user.address && (
                    <>
                      <div>
                        <p className="font-body text-xs text-grey-3 mb-1">العنوان</p>
                        <p className="font-ar-body text-charcoal">{user.address}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-body text-xs text-grey-3 mb-1">المدينة</p>
                          <p className="font-ar-body text-charcoal">{user.city}</p>
                        </div>
                        <div>
                          <p className="font-body text-xs text-grey-3 mb-1">المحافظة</p>
                          <p className="font-ar-body text-charcoal">{user.state}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="bg-white border border-gold-soft rounded-lg p-6 md:p-8">
              <h2 className="font-ar-display font-bold text-2xl text-charcoal mb-6">
                سجل الطلبات
              </h2>

              {orders.length === 0 ? (
                <p className="font-ar-body text-grey-3 text-center py-8">
                  لا توجد طلبات بعد
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gold-soft rounded-lg p-4 hover:bg-gold-wash transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="font-body text-xs text-grey-3 mb-1">رقم الطلب</p>
                          <p className="font-ar-body font-semibold text-charcoal">{order.id}</p>
                          <p className="font-ar-body text-xs text-grey mt-1">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-body text-xs text-grey-3 mb-1">الإجمالي</p>
                          <p className="font-ar-display font-bold text-lg text-gold">
                            {order.total.toLocaleString('ar-EG')} جنيه
                          </p>
                          <p className="font-ar-body text-xs text-grey mt-1">
                            {order.items.length} عطر
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
