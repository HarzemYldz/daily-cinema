/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'cursive'],
      },
      colors: {
        light: {
          background: '#f8fafc',
          card: 'rgba(255,255,255,0.6)',
          primary: '#2563eb',
          text: '#1f2937',
          subtext: '#4b5563',
        },
        dark: {
          background: '#0f172a',
          card: 'rgba(255,255,255,0.08)',
          primary: '#3b82f6',
          text: '#f1f5f9',
          subtext: '#94a3b8',
        },
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(31, 41, 55, 0.12), 0 1.5px 4px 0 rgba(31, 41, 55, 0.08)',
        'glass-xl': '0 8px 40px 0 rgba(31, 41, 55, 0.18), 0 2px 8px 0 rgba(31, 41, 55, 0.10)',
      },
      borderColor: {
        glass: 'rgba(255,255,255,0.18)',
      },
    },
  },
  plugins: [],
} 