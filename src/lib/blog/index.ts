import type { Article } from './types'

export type { Article } from './types'

/**
 * Articles lies, pour le maillage interne.
 *
 * Les articles en dur declaraient leurs voisins a la main (`related`). Synara
 * One ne porte pas ce champ : le maillage se recalcule donc depuis ce que One
 * sert, avec une regle unique plutot qu'une liste a tenir a jour article par
 * article.
 *   1. meme categorie : +3 ;
 *   2. chaque mot-cle partage : +2 ;
 *   3. chaque mot significatif (> 3 lettres) partage entre les mots-cles : +1 ;
 *   4. a score egal, le plus recent d'abord.
 * Si les scores ne remplissent pas la liste, on complete avec les plus recents :
 * un article ne finit jamais en cul-de-sac.
 */
export function getRelated(article: Article, limit = 3, liste: Article[]): Article[] {
  const motsCles = new Set(article.keywords.map((k) => k.toLowerCase().trim()))
  const mots = new Set(
    article.keywords.flatMap((k) =>
      k.toLowerCase().split(/[^a-z0-9à-ÿ]+/i).filter((m) => m.length > 3)
    )
  )

  const autres = liste.filter((a) => a.slug !== article.slug)
  const notes = autres.map((a) => {
    let score = a.category === article.category ? 3 : 0
    const sesMotsCles = a.keywords.map((k) => k.toLowerCase().trim())
    score += 2 * sesMotsCles.filter((k) => motsCles.has(k)).length
    const sesMots = new Set(
      sesMotsCles.flatMap((k) => k.split(/[^a-z0-9à-ÿ]+/i).filter((m) => m.length > 3))
    )
    sesMots.forEach((m) => {
      if (mots.has(m)) score += 1
    })
    return { a, score }
  })

  return notes
    .sort((x, y) =>
      y.score !== x.score ? y.score - x.score : y.a.publishedAt.localeCompare(x.a.publishedAt)
    )
    .slice(0, limit)
    .map((n) => n.a)
}

/** Image venue de One : adresse absolue, hors de l'optimiseur d'images. */
export function estImageDistante(src: string): boolean {
  return /^https?:\/\//.test(src)
}

/** Adresse absolue d'une image, pour Open Graph et le JSON-LD. */
export function urlAbsolueImage(src: string, baseUrl: string): string {
  return estImageDistante(src) ? src : `${baseUrl}${src}`
}

/** Format long en francais, pour l'affichage. Le JSON-LD garde l'ISO. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-BE', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
