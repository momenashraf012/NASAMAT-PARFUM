import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useToast } from '../hooks/useToast'
import { validateEmail } from '../utils/helpers'
import { Footer } from '../components/Footer'
import { ArrowLeft, Mail, Lock } from 'lucide-react'

export function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useUser()
  const { addToast } = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      addToast('الرجاء ملء جميع الحقول', 'error')
      return
    }

    if (!validateEmail(formData.email)) {
      addToast('البريد الإلكتروني غير صحيح', 'error')
      return
    }

    if (formData.password.length < 6) {
      addToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      addToast('كلمة المرور غير متطابقة', 'error')
      return
    }

    setIsLoading(true)

    // Simulate signup delay
    setTimeout(() => {
      const result = signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      if (result.success) {
        addToast('تم إنشاء الحساب بنجاح', 'success')
        navigate('/profile')
      } else {
        addToast(result.error || 'خطأ في إنشاء الحساب', 'error')
      }

      setIsLoading(false)
    }, 600)
  }

  return (
    <>
      <section className="min-h-screen bg-ivory py-16 md:py-20">
      <div className="wrap max-w-md mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-gold-dark hover:text-gold mb-8 font-ar-body"
        >
          <ArrowLeft size={16} />
          العودة للرئيسية
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-ar-display font-bold text-4xl text-charcoal mb-3">
            إنشاء حساب
          </h1>
          <p className="font-ar-body text-grey">
            انضم إلينا اليوم واستمتع بالتسوق
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-ar-body font-semibold text-charcoal mb-2 text-sm">
                الاسم الأول
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="محمد"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block font-ar-body font-semibold text-charcoal mb-2 text-sm">
                اسم العائلة
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="أحمد"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-ar-body font-semibold text-charcoal mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail size={18} className="absolute right-4 top-3.5 text-grey-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                disabled={isLoading}
                className="w-full pr-12 px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-ar-body font-semibold text-charcoal mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+20123456789"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-ar-body font-semibold text-charcoal mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock size={18} className="absolute right-4 top-3.5 text-grey-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full pr-12 px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-ar-body font-semibold text-charcoal mb-2">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <Lock size={18} className="absolute right-4 top-3.5 text-grey-3" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full pr-12 px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
            </div>
            <p className="font-body text-xs text-grey-3 mt-2">
              على الأقل 6 أحرف
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-charcoal py-4 rounded-sm font-ar-body font-bold hover:bg-gold-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gold-soft"></div>
          <span className="font-ar-body text-grey-3">أو</span>
          <div className="flex-1 h-px bg-gold-soft"></div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="font-ar-body text-grey mb-4">
            هل لديك حساب بالفعل؟
          </p>
          <Link
            to="/login"
            className="inline-block border border-gold-soft text-charcoal py-3 px-8 rounded-sm font-ar-body font-bold hover:bg-gold-wash transition-colors duration-300"
          >
            تسجيل الدخول
          </Link>
        </div>

        {/* Info */}
        <div className="mt-10 bg-gold-wash border border-gold-soft rounded-lg p-4">
          <p className="font-ar-body text-xs text-gold-dark text-center">
            <span className="font-bold block mb-1">معلومات أمان:</span>
            هذا تطبيق تجريبي. كلمات المرور تُحفظ محلياً فقط.
          </p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
