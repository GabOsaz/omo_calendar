/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#439ADE',
        secondary: '#F6FBFF',
        headingDark: '#010C15',
        equityColor: '#50F4FE',
        complementary: '#FCBF49',
        complementaryLight: '#FFF1D7',
        myBlue: {
          50: '#FBFDFE',
          100: '#E4EFF9',
          300: '#4063E1',
          400: '#0054F6',
          500: '#4FC0FF'
        },
        myGreen: {
          200: '#43F226',
          300: '#ADFF87',
          400: '#95EB6D'
        },
        myRed: {
          300: '#FFBEAF',
          400: '#FE5050',
          500: '#FF7168',
          600: '#D80027',
        },
        myGray: {
          100: '#F6F6F6',
          200: '#FAFAFA'
        },
        myYellow: {
          200: '#F9A323',
          300: '#FFD6A6',
          400: '#E48752'
        },
        myBlack: {
          300: '#252525'
        }
      }
    },
  },
  plugins: [],
}