/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terrablend: {
          green: '#2E7D32',
          'green-light': '#4CAF50',
          'green-dark': '#1B5E20',
          brown: '#4E342E',
          'brown-light': '#795548',
          nasablue: '#0B3D91',
          'nasablue-light': '#1E56B3',
          'nasablue-dark': '#062359',
          amber: '#FF8F00',
          'amber-light': '#FFB300',
          bg: '#F4F7F4',
          card: '#FFFFFF',
          border: '#E0E7E0',
          muted: '#617161',
        },
      },
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(46, 125, 50, 0.08), 0 4px 16px -2px rgba(11, 61, 145, 0.05)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 30px -4px rgba(46, 125, 50, 0.15)',
      },
    },
  },
  plugins: [],
}
