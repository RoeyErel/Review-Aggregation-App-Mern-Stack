/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '2500px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1879px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1200px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '750px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '500px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}