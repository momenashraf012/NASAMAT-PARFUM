import { createContext, useContext, useState } from 'react'

export interface Coupon {
  code: string
  discount: number // Percentage
  minAmount: number // Minimum order amount
  description: string
  isActive: boolean
  expiryDate: string
}

interface CouponContextType {
  coupons: Coupon[]
  appliedCoupon: Coupon | null
  applyCoupon: (code: string) => { success: boolean; error?: string; coupon?: Coupon }
  removeCoupon: () => void
  validateCoupon: (code: string, amount: number) => { valid: boolean; error?: string }
}

const CouponContext = createContext<CouponContextType | undefined>(undefined)

// Sample coupons
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    minAmount: 100,
    description: 'Welcome - 10% off',
    isActive: true,
    expiryDate: '2026-12-31',
  },
  {
    code: 'SUMMER20',
    discount: 20,
    minAmount: 500,
    description: 'Summer Sale - 20% off',
    isActive: true,
    expiryDate: '2026-08-31',
  },
  {
    code: 'VIP30',
    discount: 30,
    minAmount: 1000,
    description: 'VIP Member - 30% off',
    isActive: true,
    expiryDate: '2026-12-31',
  },
  {
    code: 'SAVE50',
    discount: 50,
    minAmount: 2000,
    description: 'Mega Deal - 50% off',
    isActive: true,
    expiryDate: '2026-07-31',
  },
]

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

  const validateCoupon = (code: string, amount: number) => {
    const coupon = AVAILABLE_COUPONS.find((c) => c.code === code)

    if (!coupon) {
      return { valid: false, error: 'الكود غير صحيح' }
    }

    if (!coupon.isActive) {
      return { valid: false, error: 'الكود غير فعّال' }
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return { valid: false, error: 'الكود انتهت صلاحيته' }
    }

    if (amount < coupon.minAmount) {
      return {
        valid: false,
        error: `الحد الأدنى للطلب: ${coupon.minAmount} جنيه`,
      }
    }

    return { valid: true }
  }

  const applyCoupon = (code: string) => {
    const coupon = AVAILABLE_COUPONS.find((c) => c.code === code)

    if (!coupon) {
      return { success: false, error: 'الكود غير صحيح' }
    }

    if (!coupon.isActive) {
      return { success: false, error: 'الكود غير فعّال' }
    }

    setAppliedCoupon(coupon)
    return { success: true, coupon }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  return (
    <CouponContext.Provider
      value={{
        coupons: AVAILABLE_COUPONS,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        validateCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  )
}

export function useCoupon() {
  const context = useContext(CouponContext)
  if (!context) {
    throw new Error('useCoupon must be used within CouponProvider')
  }
  return context
}
