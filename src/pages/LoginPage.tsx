import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useToast } from '../hooks/useToast'
import { Footer } from '../components/Footer'
import { ArrowLeft, Mail, Lock } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()
  const { addToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      addToast('الرجاء ملء جميع الحقول', 'error')
      return
    }

    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      const result = login(email, password)

      if (result.success) {
        addToast('تم تسجيل الدخول بنجاح', 'success')
        navigate('/profile')
      } else {
        addToast(result.error || 'خطأ في تسجيل الدخول', 'error')
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
            تسجيل الدخول
          </h1>
          <p className="font-ar-body text-grey">
            ادخل بيانات حسابك للمتابعة
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block font-ar-body font-semibold text-charcoal mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail size={18} className="absolute right-4 top-3.5 text-grey-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
                className="w-full pr-12 px-4 py-3 bg-ivory-2 border border-gold-soft rounded-sm font-ar-body text-charcoal placeholder-grey-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
            </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gold-soft"></div>
          <span className="font-ar-body text-grey-3">أو</span>
          <div className="flex-1 h-px bg-gold-soft"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="font-ar-body text-grey mb-4">
            ليس لديك حساب؟
          </p>
          <Link
            to="/signup"
            className="inline-block border border-gold-soft text-charcoal py-3 px-8 rounded-sm font-ar-body font-bold hover:bg-gold-wash transition-colors duration-300"
          >
            إنشاء حساب جديد
          </Link>
        </div>

        {/* Demo Info */}
        <div className="mt-10 bg-gold-wash border border-gold-soft rounded-lg p-4">
          <p className="font-ar-body text-xs text-gold-dark text-center">
            <span className="font-bold block mb-2">حساب تجريبي:</span>
            البريد: test@example.com<br />
            كلمة المرور: password
          </p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
