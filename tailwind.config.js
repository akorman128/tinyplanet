/** @type {import('tailwindcss').Config} */
import { colors } from "./design-system/colors";
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
          light: colors.hex.purple200,
          DEFAULT: colors.hex.purple600,
          dark: colors.hex.purple700,
        },
        purple: {
          200: colors.hex.purple200,
          400: colors.hex.purple400,
          500: colors.hex.purple500,
          600: colors.hex.purple600,
          700: colors.hex.purple700,
          800: colors.hex.purple800,
          900: colors.hex.purple900,
        },
      },
    },
  },
  plugins: [],
};
