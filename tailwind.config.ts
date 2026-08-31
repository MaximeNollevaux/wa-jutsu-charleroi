import type { Config } from 'tailwindcss'

// Les couleurs passent par des variables CSS pour que le site bascule en theme
// clair sans renommer une seule classe : `bg-dark-800` reste `bg-dark-800`, ce
// sont les valeurs derriere qui changent (voir globals.css).
//
// L'echelle `dark` est donc SEMANTIQUE, pas litterale : dark-800 veut dire
// « fond de page », dark-400 « texte attenue », dark-600 « bordure ». En clair,
// l'echelle s'inverse et tous les rapports de contraste sont conserves.
//
// La forme `rgb(var(--x) / <alpha-value>)` est obligatoire pour que les
// variantes d'opacite continuent de marcher (`text-white/90`, `bg-primary/20`).
const variable = (nom: string) => `rgb(var(${nom}) / <alpha-value>)`

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
          DEFAULT: '#9333EA',
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6B21A8',
          900: '#581C87',
        },
        // Blanc du theme : c'est la couleur du texte principal sur le fond de
        // page. En clair, elle devient presque noire.
        white: variable('--c-white'),
        // Blanc reel, qui ne bascule jamais : reserve au texte pose sur un
        // aplat violet, ou le fond ne change pas avec le theme.
        'on-primary': '#FFFFFF',
        dark: {
          DEFAULT: variable('--c-dark-800'),
          50: variable('--c-dark-50'),
          100: variable('--c-dark-100'),
          200: variable('--c-dark-200'),
          300: variable('--c-dark-300'),
          400: variable('--c-dark-400'),
          500: variable('--c-dark-500'),
          600: variable('--c-dark-600'),
          700: variable('--c-dark-700'),
          800: variable('--c-dark-800'),
          900: variable('--c-dark-900'),
        },
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        // `font-heading` sert autant aux titres qu'aux boutons et aux
        // etiquettes en capitales : elle reste donc en sans-serif. Le serif est
        // pose sur les seuls h1 et h2, par globals.css.
        heading: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
      },
    },
  },
  plugins: [],
}

export default config
