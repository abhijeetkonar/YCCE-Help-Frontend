/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BB86FC',
        secondary: '#03DAC6',
        block: '#2A2A2A',
      },
    },
  },
  plugins: [],
}

