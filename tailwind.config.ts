import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B68A35',
          dark: '#8C6A26',
          soft: '#D9CDB5',
          wash: '#EFE7D5',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          2: '#262626',
          3: '#333333',
        },
        ivory: {
          DEFAULT: '#F7F3EC',
          2: '#FBF9F4',
          3: '#EFE9DD',
        },
        cream: '#E8E2D6',
        grey: {
          DEFAULT: '#595959',
          2: '#888888',
          3: '#B8B0A2',
        },
      },
      fontFamily: {
        'ar-display': ["'Amiri'", "'Times New Roman'", 'serif'],
        'ar-body': ["'Cairo'", "'Segoe UI'", 'sans-serif'],
        'display': ["'Playfair Display'", "'Georgia'", 'serif'],
        'body': ["'Montserrat'", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: 'clamp(48px, 7vw, 88px)',
        h1: 'clamp(36px, 5vw, 56px)',
        h2: 'clamp(28px, 3.4vw, 40px)',
        h3: '24px',
        title: '20px',
        body: '16px',
        small: '14px',
        caption: '12px',
        overline: '12px',
      },
      letterSpacing: {
        overline: '0.22em',
        label: '0.08em',
      },
      lineHeight: {
        tight: '1.12',
        snug: '1.3',
        body: '1.65',
      },
      spacing: {
        's1': '4px',
        's2': '8px',
        's3': '12px',
        's4': '16px',
        's5': '24px',
        's6': '32px',
        's7': '48px',
        's8': '64px',
        's9': '96px',
        's10': '128px',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        pill: '999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(26,26,26,0.05)',
        sm: '0 2px 8px rgba(26,26,26,0.06)',
        md: '0 8px 28px rgba(26,26,26,0.10)',
        lg: '0 20px 60px rgba(26,26,26,0.14)',
        gold: '0 6px 20px rgba(182,138,53,0.22)',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        fast: '160ms',
        DEFAULT: '260ms',
        slow: '480ms',
      },
      animation: {
        'scroll-reveal': 'scroll-reveal 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'float': 'float 5.5s cubic-bezier(0.22, 0.61, 0.36, 1) infinite',
      },
      keyframes: {
        'scroll-reveal': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
