/**
 * Design System Color Palette
 *
 * This file defines the color palette used throughout the application.
 * All colors are based on Tailwind CSS default colors.
 */

export const colors = {
  // Primary brand color
  primary: {
    light: "purple-200", // Light backgrounds, icons
    DEFAULT: "purple-600", // Primary buttons, headings
    dark: "purple-700", // Active/pressed states
  },

  // Neutral colors
  neutral: {
    50: "gray-50", // Subtle backgrounds, hover states
    300: "gray-300", // Borders, dividers
    400: "gray-400", // Placeholders, disabled text
    500: "gray-500", // Captions, secondary text
    600: "gray-600", // Subheadings, secondary content
    700: "gray-700", // Labels, form labels
    900: "gray-900", // Body text, primary content
  },

  // Semantic colors
  error: {
    DEFAULT: "red-500", // Error text, error borders
  },

  // Base colors
  white: "white", // Backgrounds, contrast text
  black: "black", // Rarely used, for maximum contrast

  // Special hex values (for React Native components that need hex)
  hex: {
    // Primary colors
    purple200: "#e9d5ff",
    purple600: "#9333ea",
    purple700: "#7c3aed",
    purple800: "#6b21a8",
    purple900: "#4c1d95",

    // Neutral colors
    placeholder: "#9CA3AF", // gray-400 equivalent
    white: "#ffffff",

    // Semantic colors
    error: "#ef4444", // red-500 equivalent
  },
} as const;

/**
 * Color usage guidelines:
 *
 * Primary:
 * - Use primary.DEFAULT for main buttons, headings, and key UI elements
 * - Use primary.dark for active/pressed states
 * - Use primary.light for subtle backgrounds and decorative elements
 *
 * Neutral:
 * - 900: Body text, primary content
 * - 700: Form labels, important secondary text
 * - 600: Subheadings, less important content
 * - 500: Captions, tertiary text
 * - 400: Placeholders, disabled states
 * - 300: Borders, dividers, separators
 * - 50: Subtle backgrounds, hover states
 *
 * Error:
 * - Use for validation errors, error messages, and destructive actions
 */
