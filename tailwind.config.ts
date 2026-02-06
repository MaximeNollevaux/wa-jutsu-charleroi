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
        primary: {
          DEFAULT: '#FF1800',
          50: '#FFE5E2',
          100: '#FFCCC7',
          200: '#FF9A91',
          300: '#FF685B',
          400: '#FF3625',
          500: '#FF1800',
          600: '#CC1300',
          700: '#990E00',
          800: '#660A00',
          900: '#330500',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#C4C4C4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#2F2F2F',
          700: '#1A1A1A',
          800: '#0A0A0A',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
      },
    },
  },
  plugins: [],
}

export default config
