/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#EEEEEE',
        'second':'#686D76',
        'abubua':'#373A40',
        'oreng':'#DC5F00',
      }
    },
  },
  plugins: [],
}

