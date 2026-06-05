import { useState, useEffect } from 'react'
import { Search, User, ShoppingBag, Heart, Menu, X, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useWishlist } from '../context/WishlistContext'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const navLinks = [
    { href: '/collection', label: 'العطور' },
    { href: '/#notes', label: 'المكوّنات' },
    { href: '/#gifting', label: 'الهدايا' },
    { href: '/#story', label: 'قصتنا' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    if (window.innerWidth <= 760) {
      setMenuOpen(false)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-ivory transition-all duration-500 ${
        headerScrolled
          ? 'bg-ivory/85 backdrop-blur-xl border-b border-gold-soft shadow-xs'
          : 'border-b border-transparent'
      }`}
    >
      <div className="wrap">
        <div className="h-20 md:h-20 flex items-center justify-between">
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-4 lg:gap-7 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-ar-body font-semibold text-sm md:text-base text-charcoal relative pb-1 transition-colors duration-300 hover:text-gold-dark group"
                onClick={handleNavClick}
              >
                {link.label}
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            ))}
          </nav>

          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-center gap-1 mx-4 flex-shrink-0"
            aria-label="نَسَمَات"
          >
            <span className="font-ar-display font-bold text-gold text-2xl md:text-3xl leading-none">
              نَسَمَات
            </span>
            <span className="font-body font-medium text-xs md:text-sm tracking-widest text-gold">
              NASAMAT
            </span>
          </Link>

          {/* Header Actions */}
          <div className="flex gap-4 items-center">
            <button className="text-charcoal hover:text-gold-dark transition-colors" aria-label="بحث">
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className="relative text-charcoal hover:text-gold-dark transition-colors inline-flex"
              aria-label="المفضلة"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-charcoal hover:text-gold-dark transition-colors"
                aria-label="حسابي"
              >
                <User size={20} />
              </button>

              {userMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gold-soft rounded-lg shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gold-soft">
                        <p className="font-ar-body font-semibold text-charcoal text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="font-ar-body text-xs text-grey">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 font-ar-body text-charcoal hover:bg-gold-wash transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        ملفي الشخصي
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                          navigate('/')
                        }}
                        className="w-full text-right px-4 py-2 font-ar-body text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        تسجيل الخروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 font-ar-body text-charcoal hover:bg-gold-wash transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        تسجيل الدخول
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 font-ar-body text-charcoal hover:bg-gold-wash transition-colors border-t border-gold-soft"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        إنشاء حساب
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="relative text-charcoal hover:text-gold-dark transition-colors inline-flex"
              aria-label="الحقيبة"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-charcoal hover:text-gold-dark transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-4 pb-6 border-t border-gold-soft">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-ar-body font-semibold text-charcoal hover:text-gold-dark transition-colors"
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 pt-4 border-t border-gold-soft">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex-1 text-center font-ar-body font-semibold text-charcoal hover:text-gold-dark transition-colors"
                    onClick={handleNavClick}
                  >
                    ملفي
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                      navigate('/')
                    }}
                    className="flex-1 text-center font-ar-body font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex-1 text-center font-ar-body font-semibold text-charcoal hover:text-gold-dark transition-colors"
                    onClick={handleNavClick}
                  >
                    دخول
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 text-center font-ar-body font-semibold text-charcoal hover:text-gold-dark transition-colors"
                    onClick={handleNavClick}
                  >
                    حساب جديد
                  </Link>
                </>
              )}
              <Link to="/wishlist" className="relative text-charcoal hover:text-gold-dark" aria-label="المفضلة" onClick={handleNavClick}>
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-charcoal hover:text-gold-dark" aria-label="الحقيبة" onClick={handleNavClick}>
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
