# نَسَمَات (Nasamat) - Luxury Arabic Perfume Landing Page

A modern, responsive, and performant React + TypeScript application showcasing a luxury Arabic perfume brand.

## 🎨 Features

- **Modern Stack**: React 18 + TypeScript + Vite + Tailwind CSS
- **RTL Support**: Native Arabic (RTL) support with proper typography
- **Component-Based**: Modular, reusable components
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Animations**: Smooth scroll-reveal animations and hover effects
- **Performance**: Optimized for web vitals and fast loading
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- **TypeScript**: Full type safety across the application

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Announcement.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Values.tsx
│   ├── Story.tsx
│   ├── Notes.tsx
│   ├── Collection.tsx
│   ├── Gifting.tsx
│   ├── Testimonials.tsx
│   ├── Newsletter.tsx
│   └── Footer.tsx
├── pages/
│   └── Home.tsx         # Main page
├── data/
│   └── perfumes.ts      # Product data and constants
├── hooks/
│   └── useScrollReveal.ts # Custom animation hook
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css

public/
├── assets/
│   ├── bottle-shot.png
│   ├── gift-box.png
│   ├── gift-bag.png
│   └── poster-hero.png

Configuration Files:
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd project-12

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Key Technologies

- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast bundler and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Intersection Observer API**: Performant scroll animations

## 📱 Responsive Breakpoints

- **Mobile**: Default styles
- **Tablet**: 768px (md breakpoint)
- **Desktop**: 1024px (lg breakpoint)

## 🌍 Internationalization

The application is built with Arabic-first, RTL-native support:
- All typography uses proper Arabic fonts (Amiri, Cairo)
- Layout respects RTL text direction
- Arabic diacritics are properly rendered
- English labels appear alongside Arabic text

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## 🎨 Design System

### Color Palette
- **Gold**: #B68A35 (Primary accent)
- **Charcoal**: #1A1A1A (Dark backgrounds)
- **Ivory**: #F7F3EC (Light backgrounds)
- **Grey**: #595959 (Secondary text)

### Typography
- **Arabic Display**: Amiri
- **Arabic Body**: Cairo
- **Latin Display**: Playfair Display
- **Latin Body**: Montserrat

## 📊 Performance

- Optimized images with proper sizing
- Lazy loading via Intersection Observer
- CSS animations use transforms for 60fps
- Tree-shaking enabled in production build
- Minimal JavaScript bundle size

## 🔄 Development Workflow

1. **Development**: `npm run dev` starts hot-reload dev server
2. **Type Checking**: `npm run type-check` validates TypeScript
3. **Linting**: `npm run lint` checks code quality
4. **Building**: `npm run build` creates optimized production bundle

## 🎪 Component Features

### Header
- Sticky navigation with scroll shadow
- Mobile menu toggle
- Logo lockup
- Icon buttons for search, account, cart

### Hero
- Full-height section with image
- Scroll-reveal animations
- CTA buttons with hover effects
- Floating badge animation

### Collection
- Dynamic product grid
- Hover effects with lift and scale
- Color-coded scent tints
- Price and add-to-cart buttons

### Newsletter
- Email signup form
- Success message feedback
- Input focus states

### Footer
- Multi-column layout
- Social media links
- Navigation links
- Brand information

## 🛠️ Customization

### Add New Perfume
Edit `src/data/perfumes.ts`:
```typescript
{
  id: 'unique-id',
  ar: 'اسم عربي',
  en: 'English Name',
  fam: 'Eau de Parfum',
  notes: 'ingredient notes',
  price: 'price in arabic numerals',
  tag: 'optional tag',
  tint: '#HEX_COLOR',
  opacity: 0.34,
  image: '/assets/bottle-shot.png',
}
```

### Modify Colors
Edit `tailwind.config.ts` color palette:
```typescript
colors: {
  gold: {
    DEFAULT: '#B68A35',
    dark: '#8C6A26',
    // ...
  },
  // ...
}
```

### Update Copy
Edit component files directly or move text to a dedicated translations file.

## 🚀 Deployment

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### Vercel
```bash
npm run build
# Vercel auto-detects the build output
```

### GitHub Pages
Configure `vite.config.ts` with base path and push to `gh-pages` branch.

## 📄 License

Created for Nasamat Luxury Arabic Perfumes. All rights reserved.

## 🤝 Support

For issues or questions, refer to the component documentation in the code or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
