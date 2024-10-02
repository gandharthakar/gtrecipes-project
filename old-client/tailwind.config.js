/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  prefix: "twgtr-",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'theme-color-1': "#0B3954",
        "theme-color-2": "#087E8B",
        'theme-color-2-hover-dark': "#076c77",
        "theme-color-3": "#BFD7EA",
        "theme-color-4": "#FF5A5F",
        "theme-color-4-hover-dark": "#df5054",
        "theme-color-5": "#C81D25"
      },
      fontFamily: {
        open_sans: ['Open Sans', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      gridTemplateColumns: {
        'contact-desktop': '550px 1fr',
        'contact-tablet': '450px 1fr',
      }
    },
  },
  plugins: [],
}

