/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif SC"', 'serif'],
        sans: ['"LXGW WenKai Screen"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f5f5f3',
          100: '#e7e3dd',
          200: '#d6cfc3',
          300: '#c3b6a3',
          400: '#a38f73',
          500: '#8c7454',
          600: '#735c3e',
          700: '#5a4630',
          800: '#463726',
          900: '#2a2117',
        },
      },
      boxShadow: {
        scroll: 'inset 0 1px 0 rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [],
}
