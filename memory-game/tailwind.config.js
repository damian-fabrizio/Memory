/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
    "./index.html"    
  ],
  theme: {
    extend: {
      colors: {
        customBackg: '#151122',
        customTitle: '#a08ce3',
        customGrid: '#251e3c',
        customHover1: '#2f274d',
      }
      
    },
  },
  plugins: [],
}

