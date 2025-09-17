/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          ink: '#1f2937',
          jade: '#0f766e',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        song: ['"Noto Serif SC"', 'serif'],
        modern: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
