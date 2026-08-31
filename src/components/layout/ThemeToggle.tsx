'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

type Theme = 'dark' | 'light'

/**
 * Bascule clair / sombre.
 *
 * Le theme est deja pose sur <html> par le script inline du layout, avant le
 * premier rendu — ce composant ne fait que l'afficher et le changer. D'ou le
 * `monte` : tant que React n'a pas repris la main, on ne connait pas le theme
 * cote serveur, et afficher la mauvaise icone une fraction de seconde est plus
 * genant que de n'en afficher aucune.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [monte, setMonte] = useState(false)

  useEffect(() => {
    const actuel = document.documentElement.getAttribute('data-theme')
    setTheme(actuel === 'light' ? 'light' : 'dark')
    setMonte(true)
  }, [])

  function basculer() {
    const suivant: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', suivant)
    setTheme(suivant)
    try {
      window.localStorage.setItem('wj-theme', suivant)
    } catch {
      // Stockage indisponible (navigation privee stricte) : le choix ne survit
      // pas au rechargement, mais la bascule fonctionne quand meme.
    }
  }

  const versClair = theme === 'dark'

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={versClair ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={versClair ? 'Thème clair' : 'Thème sombre'}
      className={`inline-flex items-center justify-center w-9 h-9 border border-dark-600 text-dark-300 hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-800 ${className}`}
    >
      {monte ? (
        versClair ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )
      ) : (
        <span className="w-5 h-5" aria-hidden />
      )}
    </button>
  )
}
