/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./design-system/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6b61f3",
          DEFAULT: "#4b44aa",
          dark: "#403a92",
        },
        purple: {
          200: "#6b61f3",
          400: "#6057db",
          500: "#564ec2",
          600: "#4b44aa",
          700: "#403a92",
          800: "#36317a",
          900: "#2b2761",
        },
      },
    },
  },
  plugins: [],
}

