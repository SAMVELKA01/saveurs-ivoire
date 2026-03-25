/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        terre:  "#C85A1E",
        or:     "#D4A017",
        foret:  "#2D5A27",
        nuit:   "#1A1208",
        creme:  "#FDF8F2",
        sable:  "#F0E6D6",
        miel:   "#B89A6A",
        piment: "#9B2615",
      }
    },
  },
  plugins: [],
}