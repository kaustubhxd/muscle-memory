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
        'crimson': 'crimson',
        'dark-blue': '#0A131F',
        'light-gray': '#6B6B6B',
        'back': 'rgba(225, 228, 239, 1)'
      },
      spacing: {
        '17': '4.25rem', // 68px
      },
      borderRadius: {
        20: '1.25rem'
      }
    },
  },
  plugins: [],
}
