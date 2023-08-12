/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '375px',
        'desktop': '1440px',
      },
      colors: {
        'very-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)',
      },
      fontSize: {
        'body': '18px',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      fontWeight: {
        'normal': 400,
        'medium': 500,
        'bold': 700,
      },
    },
  },
  plugins: [],
}
