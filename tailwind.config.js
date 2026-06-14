/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pear:         '#BCFF00',
        'rich-black': '#061414',
        laurel:       '#96998C',
        celeste:      '#D2D3CE',
        'ceiling-white': '#E9EBE6',
      },
      fontFamily: {
        titillum: ['Titillium Web', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

