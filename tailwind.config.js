// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#548241',
          light: '#6a9c54',    // Lighter shade
          dark: '#3e6130',     // Darker shade
          50: '#f3f7f1',
          100: '#dce7d7',
          200: '#b8d1ae',
          300: '#94b986',
          400: '#70a25e',
          500: '#548241',      // Our main color
          600: '#436834',
          700: '#324e27',
          800: '#21341a',
          900: '#111a0d',
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideUp: 'slideUp 1s ease-out forwards',
        slideDown: 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}