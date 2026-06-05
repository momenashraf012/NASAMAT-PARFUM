import { createContext, useContext, useState, useEffect } from 'react'
import { Perfume, PerfumeSize } from '../types'
import { getNumericPrice } from '../utils/helpers'

export interface CartItem {
  id: string
  perfume: Perfume
  selectedSize: PerfumeSize
  quantity: number
  addedAt: Date
}

interface CartContextType {
  items: CartItem[]
  addToCart: (perfume: Perfume, size: PerfumeSize, quantity: number) => void
  removeFromCart: (id: string, sizeId: number) => void
  updateQuantity: (id: string, sizeId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nasamat_cart')
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        setItems(parsed)
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('nasamat_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (perfume: Perfume, size: PerfumeSize, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.perfume.id === perfume.id && item.selectedSize.ml === size.ml,
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.perfume.id === perfume.id && item.selectedSize.ml === size.ml
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [
        ...prevItems,
        {
          id: `${perfume.id}-${size.ml}-${Date.now()}`,
          perfume,
          selectedSize: size,
          quantity,
          addedAt: new Date(),
        },
      ]
    })
  }

  const removeFromCart = (id: string, sizeId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.perfume.id === id && item.selectedSize.ml === sizeId)),
    )
  }

  const updateQuantity = (id: string, sizeId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, sizeId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.perfume.id === id && item.selectedSize.ml === sizeId
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((total, item) => {
    const price = getNumericPrice(item.perfume.price)
    const adjustedPrice = Math.round(price * item.selectedSize.priceMultiplier)
    return total + adjustedPrice * item.quantity
  }, 0)

  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
