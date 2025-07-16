import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Clearance-specific colors
        clearance: {
          public: '#10b981',    // green
          secret: '#3b82f6',    // blue
          topsecret: '#8b5cf6', // purple
          sci: '#ec4899',       // pink
        },
        // Custom semantic colors (optional - can use these instead of CSS variables)
        background: '#ffffff',
        foreground: '#111827',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#f3f4f6',
          foreground: '#111827',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        handwriting: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config