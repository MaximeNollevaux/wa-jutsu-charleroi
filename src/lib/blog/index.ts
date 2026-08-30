import type { Article } from './types'
import { article as artMartialEnfant } from './articles/art-martial-enfant-charleroi'
import { article as debuterAdulte } from './articles/debuter-adulte'
import { article as premierCours } from './articles/premier-cours'
import { article as rentree2026 } from './articles/rentree-2026'
import { article as sansCompetition } from './articles/sans-competition'
import { article as waJutsuOuJuJitsu } from './articles/wa-jutsu-ou-ju-jitsu'

export type { Article, Block, FaqEntry } from './types'

/** Tries du plus recent au plus ancien, a slug egal l'ordre est stable. */
const all: Article[] = [
  rentree2026,
  artMartialEnfant,
  waJutsuOuJuJitsu,
  premierCours,
  debuterAdulte,
  sansCompetition,
]

export const articles: Article[] = [...all].sort((a, b) =>
  a.publishedAt === b.publishedAt
    ? a.slug.localeCompare(b.slug)
    : b.publishedAt.localeCompare(a.publishedAt)
)

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

/**
 * Articles lies, dans l'ordre declare par l'auteur. Un slug qui ne correspond a
 * rien est ignore silencieusement : renommer un article ne doit pas casser le
 * build des cinq autres.
 */
export function getRelated(article: Article, limit = 3): Article[] {
  const explicit = (article.related ?? [])
    .map(getArticle)
    .filter((a): a is Article => Boolean(a) && a!.slug !== article.slug)

  if (explicit.length >= limit) return explicit.slice(0, limit)

  // Completer avec les articles les plus recents qui ne sont pas deja listes.
  const seen = new Set([article.slug, ...explicit.map((a) => a.slug)])
  const fillers = articles.filter((a) => !seen.has(a.slug))
  return [...explicit, ...fillers].slice(0, limit)
}

export function getCategories(): string[] {
  return Array.from(new Set(articles.map((a) => a.category)))
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
