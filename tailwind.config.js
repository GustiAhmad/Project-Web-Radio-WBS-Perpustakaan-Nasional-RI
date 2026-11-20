/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        perpusnas: {
          blue: {
            DEFAULT: '#0B3B60',
            dark: '#07243B',
            light: '#E8F1F8',
          },
          gold: {
            DEFAULT: '#D4A017',
            light: '#FFF9E6',
          },
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            600: '#475569',
            900: '#0F172A',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
