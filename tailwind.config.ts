import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaffea',
          100: '#d0ffd0',
          200: '#a2f9a2',
          300: '#6df26d',
          400: '#3de93d',
          500: '#17cc17',
          600: '#0ea30e',
          700: '#0e800e',
          800: '#116411',
          900: '#0f5310',
          950: '#052e07',
        },
        danger: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        warning: {
          50: '#fff8ed',
          100: '#ffeed3',
          200: '#fddaa5',
          300: '#fbc16d',
          400: '#f9a23d',
          500: '#f7821f',
          600: '#e86413',
          700: '#c14a12',
          800: '#9a3a16',
          900: '#7c3015',
          950: '#431408',
        },
        info: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bce4ff',
          300: '#8fd4ff',
          400: '#59bbff',
          500: '#3399ff',
          600: '#1a7df5',
          700: '#1466e1',
          800: '#1654b6',
          900: '#17498f',
          950: '#102d57',
        },
      },
    },
  },
  plugins: [],
};

export default config; 