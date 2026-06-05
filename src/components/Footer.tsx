import { Instagram, Rss, MessageCircle } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Rss, href: '#', label: 'TikTok' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ]

  const shopLinks = [
    { label: 'كل العطور', href: '#collection' },
    { label: 'الأكثر مبيعًا', href: '#collection' },
    { label: 'الإصدارات الجديدة', href: '#collection' },
    { label: 'الهدايا', href: '#gifting' },
  ]

  const helpLinks = [
    { label: 'الشحن والتوصيل', href: '#' },
    { label: 'الإرجاع والاستبدال', href: '#' },
    { label: 'تواصل معنا', href: '#' },
    { label: 'الأسئلة الشائعة', href: '#' },
  ]

  const brandLinks = [
    { label: 'قصتنا', href: '#story' },
    { label: 'المكوّنات', href: '#notes' },
    { label: 'المتاجر', href: '#' },
    { label: 'سياسة الخصوصية', href: '#' },
  ]

  return (
    <footer className="bg-charcoal text-grey-3 border-t border-charcoal-3 py-12 md:py-16">
      <div className="wrap">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start gap-1 mb-6">
              <span className="font-ar-display font-bold text-gold text-2xl md:text-3xl">
                نَسَمَات
              </span>
              <span className="font-body font-medium text-xs md:text-sm tracking-widest text-gold">
                NASAMAT
              </span>
            </div>

            <p className="font-ar-body text-sm md:text-base leading-relaxed text-grey-3 max-w-sm">
              عطور عربية فاخرة بسعرٍ في متناولك. أثرٌ يبقى بعد رحيلك — من القاهرة إلى الخليج.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon
                return (
                  <a
                    key={idx}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full border border-charcoal-3 flex items-center justify-center text-grey-3 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-ar-body font-bold text-sm md:text-base text-ivory mb-5">
              تسوّق
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {shopLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="font-ar-body text-sm md:text-base text-grey-3 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-ar-body font-bold text-sm md:text-base text-ivory mb-5">
              المساعدة
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {helpLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="font-ar-body text-sm md:text-base text-grey-3 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Links */}
          <div>
            <h4 className="font-ar-body font-bold text-sm md:text-base text-ivory mb-5">
              البراند
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {brandLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="font-ar-body text-sm md:text-base text-grey-3 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 md:pt-10 border-t border-charcoal-3">
          <p className="font-ar-body text-xs md:text-sm text-grey-2">
            © ٢٠٢٦ نَسَمَات. جميع الحقوق محفوظة.
          </p>
          <p className="font-body text-xs md:text-sm tracking-wider text-grey-2">
            AUTHENTIC ARABIC PERFUMES · LUXURY WITHIN REACH
          </p>
        </div>
      </div>
    </footer>
  )
}
