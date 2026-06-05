import { createContext, useContext, useState, useEffect } from 'react'
import { Perfume } from '../types'

interface WishlistContextType {
  items: Perfume[]
  addToWishlist: (perfume: Perfume) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Perfume[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('nasamat_wishlist')
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Failed to load wishlist:', error)
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('nasamat_wishlist', JSON.stringify(items))
  }, [items])

  const addToWishlist = (perfume: Perfume) => {
    if (!items.find((item) => item.id === perfume.id)) {
      setItems([...items, perfume])
    }
  }

  const removeFromWishlist = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  const clearWishlist = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
