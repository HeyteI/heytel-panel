/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/**/*.html', 
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#732DDD"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}