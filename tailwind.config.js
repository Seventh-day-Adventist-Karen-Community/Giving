/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.7rem',
      },
      height: {
        '22':'5.5rem',
        '25':'6.2rem',
        '26':'6.5rem',
        '27':'6.8rem',
        '108': '28rem',
        '128': '32rem',
        '30vh': '30vh',
        '50vh': '50vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '30%': '30%',
        '50%': '50%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%',
      },
      width:{
        '30%': '30%',
        '50%': '50%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%',
      },
      borderWidth:{
        1: '1px'
      },
      maxWidth:{
        '10': '2rem',
        '20': '4rem',
        '30': '8rem',
        '40': '16rem',
      },
      colors:{
        maroon:{
          50:'#ff949430',
          100: '#FF9494',
          200:'#FF6666',
          300:'#FF3939',
          400:'#FF0B0B',
          500:'#DC0000',
          600:'#AE0000',
          700:'#AE3939',
          800:'#AE0B0B',
          900:'#800000'
        },
        slate:{
          930: 'rgb(2, 6, 28)',
          950: 'rgb(2, 6, 23)',
        },
        zinc:{
          950: 'rgb(9, 9, 11)',
        },
        neutral:{
          950: 'rgb(10, 10, 10)',
        },
        stone:{
          950: 'rgb(10, 12, 9)',
        },
        gray:{
          900: '#2b2f33',
          910: '#31363b',
          920: '#282c30',
          930: '#171a1c',
          950: '#1d2125',
        },
      }
    },
  },
  plugins: [],
}