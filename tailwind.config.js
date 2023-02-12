/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],  
  theme: {
    extend: {
      colors:{
        "off-white" : '#f5f5f5',
        'ant-blue' : '#4096ff',
        'crimson': 'crimson'
      }
    },
  },
  plugins: [],
}
