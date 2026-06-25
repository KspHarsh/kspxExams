/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        },
        'sky-soft': '#F0F7FF',
        'sky-medium': '#E0EFFF',
        'lavender-mist': '#E0E7FF',
        'vibrant-indigo': '#6366F1',
        'sunshine-yellow': '#FBBF24',
        'deep-indigo': '#4338CA',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'float-sm': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'float-md': '0 20px 48px -10px rgba(99, 102, 241, 0.15)',
        'float-lg': '0 35px 80px -15px rgba(99, 102, 241, 0.25)',
        'float-xl': '0 50px 100px -20px rgba(99, 102, 241, 0.3)',
        'inner-glow': 'inset 0 0 25px rgba(255, 255, 255, 0.6)',
        'inner-glow-strong': 'inset 0 1px 1px rgba(255,255,255,0.8), inset 0 0 40px rgba(255, 255, 255, 0.4)',
        'icon-glow': '0 0 20px rgba(99, 102, 241, 0.5)',
        'icon-glow-yellow': '0 0 20px rgba(251, 191, 36, 0.5)',
        'study': '0 10px 25px -5px rgba(99, 102, 241, 0.08), 0 8px 10px -6px rgba(99, 102, 241, 0.04)',
        'card-hover': '0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04)',
        'dock': '0 15px 50px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
