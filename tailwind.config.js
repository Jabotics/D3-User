/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'calss',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '992px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1366px',
        // => @media (min-width: 1536px) { ... }
      },
      container: {
        center: true,
      },
      colors:{
        'blue': '#1fb6ff',
      },

    },
  },

  plugins: [],
}
// module.exports = {
//   darkMode: 'calss',
// }

