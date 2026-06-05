# React App Setup & Installation Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd project-12
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

## 📋 Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)

To check versions:
```bash
node --version
npm --version
```

## 📦 Project Structure After Setup

```
project-12/
├── node_modules/              # Dependencies (created by npm install)
├── public/                     # Static assets
│   └── assets/
│       ├── bottle-shot.png
│       ├── gift-box.png
│       ├── gift-bag.png
│       └── poster-hero.png
├── src/                        # Source code
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── data/                   # Constants and data
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── dist/                       # Production build (created after npm run build)
├── index.html                  # HTML entry point
├── package.json
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── ... (other config files)
```

## 🔧 Available Commands

### Development
```bash
npm run dev
```
Starts hot-reload development server at `http://localhost:5173`

### Type Checking
```bash
npm run type-check
```
Validates all TypeScript code without emitting files.

### Linting
```bash
npm run lint
```
Checks code quality using ESLint.

### Build
```bash
npm run build
```
Creates optimized production bundle in `dist/` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally before deploying.

## 🌐 Deployment

### Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel
```bash
npm install -g vercel
vercel
```
Vercel will auto-detect the setup and deploy.

### GitHub Pages
1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/', // your repo name
  // ... rest of config
})
```

2. Build and push:
```bash
npm run build
```

### Standard Web Host (cPanel, etc.)
1. Run `npm run build`
2. Upload the `dist/` folder contents to your web server
3. Configure your server to serve `index.html` for all routes

## 🎨 Customization

### Modify Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  gold: {
    DEFAULT: '#B68A35',
    dark: '#8C6A26',
    // ...
  },
}
```

### Add Products
Edit `src/data/perfumes.ts` and add to the `PERFUMES` array:
```typescript
{
  id: 'new-perfume',
  ar: 'اسم العطر',
  fam: 'Eau de Parfum',
  notes: 'المكونات',
  price: '١٠٠٠',
  tag: 'جديد',
  tint: '#HEX_COLOR',
  opacity: 0.34,
  image: '/assets/bottle-shot.png',
}
```

### Change Copy/Text
Edit the component files directly in `src/components/`.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already taken:
```bash
npm run dev -- --port 3000
```

### Node Modules Issues
If you get strange errors:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
Check Node version:
```bash
node --version  # Should be v16+
npm run build
```

### Hot Reload Not Working
Try clearing cache:
```bash
rm -rf dist node_modules/.vite
npm run dev
```

## 📚 Documentation

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 🎯 Browser Support

The app works on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✨ Performance Tips

1. **Image Optimization**: Use WebP format when possible
2. **Code Splitting**: Components are naturally code-split
3. **Lazy Loading**: Images load naturally via browser
4. **Bundle Size**: Keep dependencies minimal

## 🔒 Environment Variables

Create a `.env` file for sensitive data:
```
VITE_API_URL=https://api.example.com
VITE_PUBLIC_KEY=your_public_key
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📞 Support

For issues:
1. Check the README.md for feature overview
2. Review component comments
3. Check console for errors: Press F12 in browser
4. Review network tab for asset loading issues

---

**Happy coding! 🚀**
