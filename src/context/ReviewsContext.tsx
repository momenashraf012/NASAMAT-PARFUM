import { createContext, useContext, useState, useEffect } from 'react'

export interface Review {
  id: string
  perfumeId: string
  userName: string
  rating: number // 1-5
  comment: string
  date: string
  helpful: number
}

interface ReviewsContextType {
  reviews: Review[]
  addReview: (perfumeId: string, userName: string, rating: number, comment: string) => void
  getPerfumeReviews: (perfumeId: string) => Review[]
  getAverageRating: (perfumeId: string) => number
  markHelpful: (reviewId: string) => void
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'REV-1',
    perfumeId: 'oud-royal',
    userName: 'أحمد',
    rating: 5,
    comment: 'عطر رائع جداً، ثابت طول اليوم',
    date: '2026-05-20',
    helpful: 12,
  },
  {
    id: 'REV-2',
    perfumeId: 'oud-royal',
    userName: 'سارة',
    rating: 4,
    comment: 'جميل لكن تخيل السعر أغلى قليلاً',
    date: '2026-05-15',
    helpful: 8,
  },
  {
    id: 'REV-3',
    perfumeId: 'rose-damascus',
    userName: 'فاطمة',
    rating: 5,
    comment: 'أنوثة راقية، أنصح به للجميع',
    date: '2026-05-10',
    helpful: 15,
  },
]

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)

  useEffect(() => {
    localStorage.setItem('nasamat_reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (perfumeId: string, userName: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `REV-${Date.now()}`,
      perfumeId,
      userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    }
    setReviews([...reviews, newReview])
  }

  const getPerfumeReviews = (perfumeId: string) => {
    return reviews.filter((r) => r.perfumeId === perfumeId)
  }

  const getAverageRating = (perfumeId: string) => {
    const perfumeReviews = getPerfumeReviews(perfumeId)
    if (perfumeReviews.length === 0) return 0
    const total = perfumeReviews.reduce((sum, r) => sum + r.rating, 0)
    return Math.round((total / perfumeReviews.length) * 10) / 10
  }

  const markHelpful = (reviewId: string) => {
    setReviews(
      reviews.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r)),
    )
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getPerfumeReviews,
        getAverageRating,
        markHelpful,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (!context) {
    throw new Error('useReviews must be used within ReviewsProvider')
  }
  return context
}
