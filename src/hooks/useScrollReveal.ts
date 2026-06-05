import { useEffect, useRef, RefObject } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Fallback: show content immediately if needed
    const revealAll = () => {
      element.classList.add('opacity-100')
      element.classList.remove('opacity-0', 'translate-y-7')
    }

    // Try IntersectionObserver first
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealAll()
              io.unobserve(entry.target)
            }
          })
        },
        {
          threshold,
          rootMargin: '0px 0px -8% 0px',
        }
      )

      io.observe(element)

      // Safety timeout: if IO never fires, reveal anyway
      const timeout = setTimeout(revealAll, 700)

      return () => {
        io.unobserve(element)
        clearTimeout(timeout)
      }
    } else {
      revealAll()
    }
  }, [threshold])

  return ref
}
