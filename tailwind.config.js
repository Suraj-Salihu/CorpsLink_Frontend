/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'nysc-green': '#586126',
        'khaki-beige': '#C2B280',
        'dark-khaki': '#8B7D3A',
        'off-white': '#F7F6F2',
        'text-dark': '#2E2E2E',
        'text-muted': '#6B6B6B',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'pulse': 'pulse 2s infinite',
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}