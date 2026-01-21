import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#fcfaf4',
          50: '#fefdfb',
          100: '#fcfaf4',
          200: '#f8f4e8',
        },
        forest: {
          DEFAULT: '#2d5016',
          50: '#f0f5ec',
          100: '#dce8d1',
          200: '#b9d2a3',
          300: '#8fb76a',
          400: '#699841',
          500: '#4a7a2a',
          600: '#2d5016',
          700: '#234013',
          800: '#1a3010',
          900: '#12200a',
        },
        gold: {
          DEFAULT: '#d4af37',
          50: '#faf6e9',
          100: '#f5edcf',
          200: '#ebdb9f',
          300: '#e1c970',
          400: '#d7b740',
          500: '#d4af37',
          600: '#b8972f',
          700: '#9c7f27',
          800: '#80671f',
          900: '#644f17',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
