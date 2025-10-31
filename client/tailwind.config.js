/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FFCC00', // You can adjust this hex code
        'brand-gray': {
          DEFAULT: '#F4F4F4',
          light: '#FAFAFA',
          dark: '#E0E0E0',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // We'll need this for the form styles
  ],
}