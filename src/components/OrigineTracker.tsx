'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { memoriserOrigineVisite } from '@/lib/attribution'

/**
 * Memorise l'origine de la visite a chaque changement de page.
 *
 * `usePathname` et pas `useSearchParams` : ce dernier force toute la page dans
 * une frontiere Suspense et fait basculer le rendu cote client, ce qu'on ne veut
 * pas payer sur un site vitrine. Le hook relit `window.location.href` lui-meme,
 * ce qui couvre les parametres de campagne — ils sont sur l'URL d'entree.
 */
export function OrigineTracker() {
  const pathname = usePathname()

  useEffect(() => {
    memoriserOrigineVisite()
  }, [pathname])

  return null
}
