/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F172A',
          secondary: '#111827',
        },
        accent: {
          primary: '#6366F1',
          secondary: '#22D3EE',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
        border: {
          dark: '#1E293B',
        },
        sentiment: {
          positive: '#22C55E',
          negative: '#EF4444',
          neutral: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}
