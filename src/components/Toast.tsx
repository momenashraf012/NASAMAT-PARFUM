import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, message, type, duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-gold',
  }[type]

  const textColor = type === 'info' ? 'text-charcoal' : 'text-ivory'

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-5 py-4 rounded-sm shadow-lg transition-all duration-300 ${bgColor} ${textColor} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="font-ar-body text-sm md:text-base flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose(id)
        }}
        className="flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity"
        aria-label="إغلاق"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  )
}
