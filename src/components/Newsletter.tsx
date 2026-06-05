import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../hooks/useToast'
import { validateEmail } from '../utils/helpers'
import { ToastContainer } from './Toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribedEmails, setSubscribedEmails] = useState<Set<string>>(new Set())
  const ref = useScrollReveal<HTMLDivElement>()
  const { toasts, addToast, removeToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()

    // Validation
    if (!trimmedEmail) {
      addToast('الرجاء إدخال بريدك الإلكتروني', 'error')
      return
    }

    if (!validateEmail(trimmedEmail)) {
      addToast('الرجاء إدخال بريد إلكتروني صحيح', 'error')
      return
    }

    // Check for duplicate in session
    if (subscribedEmails.has(trimmedEmail)) {
      addToast('هذا البريد مشترك بالفعل', 'info')
      return
    }

    // Submit
    setIsSubmitting(true)
    setTimeout(() => {
      setSubscribedEmails((prev) => new Set([...prev, trimmedEmail]))
      setEmail('')
      setIsSubmitting(false)
      addToast('شكرًا لك — لقد تم تسجيلك بنجاح', 'success')
    }, 600)
  }

  return (
    <section className="section bg-charcoal text-cream relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_-20%,rgba(182,138,53,0.16),transparent_60%)] pointer-events-none"></div>

      <div className="wrap relative">
        <div
          ref={ref}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] text-center max-w-2xl mx-auto"
        >
          <span className="eyebrow justify-center text-gold">انضمّ إلينا</span>

          <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-ivory mt-4">
            كُن أول من يعرف
          </h2>

          <p className="font-ar-body text-base md:text-lg leading-loose text-grey-3 mt-6">
            اشترك لتصلك إصداراتنا الجديدة وعروضنا الخاصة أولًا بأول — نَسمةٌ في بريدك، دون
            إزعاج.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mt-10 max-w-md mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 font-ar-body text-sm md:text-base px-5 py-4 bg-charcoal-2 border border-charcoal-3 rounded-sm text-ivory placeholder-grey-2 transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(182,138,53,0.22)] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="البريد الإلكتروني"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold text-charcoal px-8 py-4 rounded-sm font-ar-body font-bold text-sm md:text-base whitespace-nowrap transition-all duration-300 hover:bg-gold-dark hover:text-ivory hover:-translate-y-0.5 shadow-gold active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gold disabled:hover:text-charcoal disabled:hover:translate-y-0"
            >
              {isSubmitting ? 'جاري...' : 'اشترك'}
            </button>
          </form>

          {/* Fine Print */}
          <div className="font-body text-xs md:text-sm tracking-wider text-grey-2 mt-8">
            نحترم خصوصيتك · يمكنك إلغاء الاشتراك في أي وقت
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts.map((toast) => ({
          id: toast.id,
          message: toast.message,
          type: toast.type,
          duration: toast.duration,
          onClose: removeToast,
        }))}
        onClose={removeToast}
      />
    </section>
  )
}
