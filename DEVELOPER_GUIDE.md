# Developer Quick Reference Guide

## 🚀 Getting Started (5 minutes)

```bash
# 1. Navigate to project
cd project-12

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open browser to http://localhost:5173
```

## 📁 File Organization

### Adding a New Page
```tsx
// src/pages/Products.tsx
export default function Products() {
  return <main>{/* page content */}</main>
}
```

### Adding a New Component
```tsx
// src/components/ProductCard.tsx
import { useScrollReveal } from '../hooks/useScrollReveal'

export function ProductCard() {
  const ref = useScrollReveal()
  
  return (
    <div ref={ref} className="opacity-0 translate-y-7 transition-all">
      {/* component JSX */}
    </div>
  )
}
```

### Adding Data/Constants
```typescript
// src/data/new-data.ts
export interface Item {
  id: string
  title: string
}

export const ITEMS: Item[] = [
  { id: '1', title: 'Item 1' }
]
```

### Adding Custom Hooks
```typescript
// src/hooks/useCustom.ts
import { useEffect } from 'react'

export function useCustomHook() {
  useEffect(() => {
    // hook logic
  }, [])
  
  return { /* return value */ }
}
```

## 🎨 Styling Patterns

### Tailwind + Custom Animations
```tsx
<div className="animate-scroll-reveal opacity-0 translate-y-7">
  Content
</div>
```

### Using Design Tokens
```tsx
// Colors
<div className="bg-gold text-charcoal border-gold-soft">

// Typography
<h1 className="font-ar-display font-bold text-h1 text-charcoal">

// Spacing
<div className="mt-6 px-5 py-4">

// Animations
<div className="transition-all duration-300 hover:shadow-md">
```

### Responsive Design
```tsx
<div className="
  grid grid-cols-1           // Mobile: 1 column
  md:grid-cols-2             // Tablet: 2 columns
  lg:grid-cols-3             // Desktop: 3 columns
  gap-6 lg:gap-8             // Different gaps
">
```

### RTL Support
```tsx
// Tailwind automatically handles RTL with the dir attribute
<div className="text-right">  // Becomes text-left in RTL
<div className="ml-4">        // Becomes mr-4 in RTL
```

## 🔧 Common Tasks

### Update Product Data
```typescript
// src/data/perfumes.ts
export const PERFUMES: Perfume[] = [
  {
    id: 'new-id',
    ar: 'اسم العطر',
    en: 'Perfume Name',
    fam: 'Eau de Parfum',
    notes: 'المكونات',
    price: '١٢٠٠',
    tag: 'جديد',
    tint: '#B68A35',
    opacity: 0.34,
    image: '/assets/bottle-shot.png',
  }
]
```

### Add New Route (with React Router)
```tsx
// Install: npm install react-router-dom

// src/main.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </BrowserRouter>
)
```

### Add Form Validation
```tsx
import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.includes('@')) {
      setError('بريد إلكتروني صحيح')
      return
    }
    
    // Process form
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
```

### Fetch API Data
```tsx
import { useEffect, useState } from 'react'

export function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="grid gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 🎯 Component Best Practices

### Type All Props
```tsx
interface ProductCardProps {
  id: string
  title: string
  price: number
  onAdd?: (id: string) => void
}

export function ProductCard({ id, title, price, onAdd }: ProductCardProps) {
  return <div>{/* ... */}</div>
}
```

### Extract Styles to Utility Classes
```tsx
// ❌ Avoid
className="px-4 py-3 bg-gold text-charcoal rounded hover:bg-gold-dark"

// ✅ Better - Create @layer components in index.css
@layer components {
  .btn-primary {
    @apply px-4 py-3 bg-gold text-charcoal rounded hover:bg-gold-dark transition-colors;
  }
}

// Then use
className="btn-primary"
```

### Use Composition Over Props
```tsx
// ❌ Avoid
<Card variant="dark" corners="rounded-full" shadow="large">

// ✅ Better
<Card className="bg-charcoal rounded-full shadow-lg">
```

### Keep Components Small
- Max ~200 lines per component
- Extract sub-components when needed
- Keep JSX clean and readable

## 📊 TypeScript Best Practices

### Use Interfaces for Props
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <button {...props} />
}
```

### Use Union Types for Variants
```typescript
type Theme = 'light' | 'dark'
type Size = 'small' | 'medium' | 'large'

interface ButtonProps {
  theme: Theme
  size: Size
}
```

### Use Utility Types
```typescript
// Pick specific properties
type ButtonBase = Pick<HTMLButtonElement, 'className' | 'onClick'>

// Omit specific properties
type ComponentProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>

// Make properties optional
type PartialPerfume = Partial<Perfume>

// Make properties required
type RequiredPerfume = Required<Perfume>
```

## 🧪 Testing Components

### Install Testing Library
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

### Simple Component Test
```tsx
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('العطور')).toBeInTheDocument()
  })
})
```

## 🐛 Debugging Tips

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Profile component renders

### Browser Console
```javascript
// Check if Tailwind is loaded
document.querySelector('.animate-scroll-reveal')

// Test styles
getComputedStyle(element).backgroundColor
```

### Vite Debug
```bash
npm run dev -- --debug
```

## 🚀 Performance Optimization

### Image Optimization
```tsx
// Use native lazy loading
<img src="/assets/bottle.png" loading="lazy" alt="..." />

// Responsive images
<picture>
  <source srcSet="/assets/bottle-small.png" media="(max-width: 640px)" />
  <img src="/assets/bottle.png" alt="..." />
</picture>
```

### Code Splitting with React.lazy
```tsx
import { lazy, Suspense } from 'react'

const Products = lazy(() => import('./pages/Products'))

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Products />
    </Suspense>
  )
}
```

### Memoization
```tsx
import { memo } from 'react'

// Prevent unnecessary re-renders
export const ProductCard = memo(function ProductCard({ product }: Props) {
  return <div>{/* ... */}</div>
})
```

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run type-check       # Check TypeScript
npm run lint             # Run ESLint

# Maintenance
npm update               # Update dependencies
npm audit fix            # Fix security issues
npm clean-install        # Fresh install
```

## 🔗 Useful Resources

- [React Docs](https://react.dev) - Official React documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TS guide
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility CSS
- [Vite Docs](https://vitejs.dev) - Build tool
- [Lucide Icons](https://lucide.dev) - Icon library

## 💡 Pro Tips

1. **Use `className` from `clsx` for conditional styles**
   ```tsx
   import clsx from 'clsx'
   className={clsx('base-class', isActive && 'active-class')}
   ```

2. **Create a custom hook for scroll animations**
   - Already done: `useScrollReveal`
   - Apply to any element with `ref={useScrollReveal()}`

3. **Keep data in `src/data/` directory**
   - Makes updates easy
   - Centralizes content
   - Easy to migrate to API later

4. **Use `@apply` for repeated Tailwind patterns**
   ```css
   @layer components {
     .card {
       @apply bg-ivory rounded-lg p-6 border border-gold-soft;
     }
   }
   ```

5. **Always provide fallback content for async operations**
   ```tsx
   {loading && <LoadingSpinner />}
   {error && <ErrorMessage message={error} />}
   {data && <Content data={data} />}
   ```

## 📞 Quick Support

For common issues:

| Issue | Solution |
|-------|----------|
| Module not found | Clear `node_modules` and reinstall |
| Styles not applying | Check Tailwind config, restart dev server |
| TypeScript errors | Run `npm run type-check` to see all errors |
| Hot reload not working | Check browser console, restart `npm run dev` |
| Images not showing | Verify image path starts with `/assets/` |

---

**Happy coding! 🎉**
