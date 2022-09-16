/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        starbucks: '#00704A',
      },
      fontFamily: {
        price: 'DS-Digital',
      },
    },
  },
  plugins: [],
}
