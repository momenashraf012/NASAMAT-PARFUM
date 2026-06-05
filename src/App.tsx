import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { CollectionPage } from './pages/CollectionPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderConfirmation } from './pages/OrderConfirmation'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { WishlistPage } from './pages/WishlistPage'
import { SEO, StructuredData } from './components/SEO'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { WishlistProvider } from './context/WishlistContext'
import { CouponProvider } from './context/CouponContext'
import { ReviewsProvider } from './context/ReviewsContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  useEffect(() => {
    // Set dir attribute for RTL support
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
  }, [])

  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <CouponProvider>
              <ReviewsProvider>
                <SEO />
                <StructuredData />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<CollectionPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                </Routes>
              </ReviewsProvider>
            </CouponProvider>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
