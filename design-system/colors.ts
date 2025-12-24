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
    gray50: "gray-50", // Subtle backgrounds, hover states
    gray300: "gray-300", // Borders, dividers
    gray400: "gray-400", // Placeholders, disabled text
    gray500: "gray-500", // Captions, secondary text
    gray600: "gray-600", // Subheadings, secondary content
    gray700: "gray-700", // Labels, form labels
    gray900: "gray-900", // Body text, primary content
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
    // Primary colors - blue-purple palette
    purple200: "#c7d2fe",
    purple600: "#6b61f3", // Main brand color
    purple700: "#5a52d5",
    purple800: "#4a44b8",
    purple900: "#3a369a",

    // Neutral colors
    gray300: "#d1d5db", // gray-300
    gray500: "#6b7280", // gray-500
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
