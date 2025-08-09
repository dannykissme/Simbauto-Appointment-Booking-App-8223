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
          50: '#fff2f0',
          100: '#ffe1dc',
          200: '#ffc9be',
          300: '#ffa494',
          400: '#ff8a6e',
          500: '#FF6D4D', // Main primary color
          600: '#f14a27',
          700: '#cb371a',
          800: '#a73118',
          900: '#8a2e1a',
        }
      },
    },
  },
  plugins: [],
}