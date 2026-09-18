/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titanium: {
          dark: '#0a0c10',
          darker: '#060709',
          card: '#12151d',
          border: 'rgba(255, 255, 255, 0.08)',
          silver: '#e3e4e9',
          gray: '#78797e',
          black: '#1c1d22',
          green: '#3d4e46',
          gold: '#d8b8b0',
        },
        galaxy: {
          cyan: '#00f0ff',
          indigo: '#6366f1',
          amber: '#f59e0b',
          blue: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
