// Articles ecrits dans Synara One, fondus dans le blog du site.
//
// One est desormais la plume : la routine SEO y publie. Les articles en dur du
// depot restent en ligne tant qu'un article de One ne reprend pas leur slug —
// on ne vide jamais le blog d'un coup, et aucune adresse deja indexee ne tombe.
//
// Le build ne depend pas de One : toute erreur, tout delai depasse, toute
// reponse non-OK retombe en silence sur les articles du depot.

import type { Article } from './types'
import { articles as articlesDuDepot } from './index'

// Adresse fixe : une variable d'environnement absente du docker-compose ne
// serait lue qu'au poste, jamais en production.
const ONE = 'https://one.synara.be'

const SITE = 'wa-jutsu-charleroi.be'

/** Image du blog quand One n'en fournit pas : jamais d'image cassee. */
export const IMAGE_ARTICLE_PAR_DEFAUT = '/images/hero-training-2026.webp'

type ArticleOne = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content_md: string | null
  keywords: string[] | null
  category: string | null
  cover_image_url: string | null
  cover_alt: string | null
  meta_title: string | null
  meta_description: string | null
  published_at: string | null
  updated_at: string
}

/** Date courte AAAA-MM-JJ : c'est le format des articles du depot. */
function jour(iso: string | null | undefined): string | undefined {
  return iso ? iso.slice(0, 10) : undefined
}

function depuisOne(a: ArticleOne): Article {
  const md = a.content_md || ''
  const publie = jour(a.published_at) || jour(a.updated_at) || ''
  return {
    slug: a.slug,
    title: a.title,
    seoTitle: a.meta_title || a.title,
    description: a.meta_description || a.excerpt || '',
    keywords: a.keywords || [],
    publishedAt: publie,
    updatedAt: jour(a.updated_at),
    author: `Club CCAJT Wa-Jutsu Marcinelle`,
    category: a.category || 'Vie du club',
    readingMinutes: Math.max(1, Math.round(md.split(/\s+/).length / 200)),
    image: a.cover_image_url || IMAGE_ARTICLE_PAR_DEFAUT,
    imageAlt: a.cover_alt || a.title,
    excerpt: a.excerpt || a.meta_description || '',
    body: [],
    contentMd: md,
  }
}

async function chargerDepuisOne(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${ONE}/api/public/blog?site=${encodeURIComponent(SITE)}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return []
    const data = (await res.json()) as { articles?: ArticleOne[] }
    return (data.articles || [])
      .filter((a) => a && a.slug && a.title)
      .map(depuisOne)
  } catch {
    return []
  }
}

/**
 * Tous les articles : ceux de One d'abord, puis ceux du depot dont le slug
 * n'est pas repris par One. Tri du plus recent au plus ancien, comme avant.
 */
export async function chargerArticles(): Promise<Article[]> {
  const deOne = await chargerDepuisOne()
  if (deOne.length === 0) return articlesDuDepot
  const pris = new Set(deOne.map((a) => a.slug))
  const tous = [...deOne, ...articlesDuDepot.filter((a) => !pris.has(a.slug))]
  return tous.sort((a, b) =>
    a.publishedAt === b.publishedAt
      ? a.slug.localeCompare(b.slug)
      : b.publishedAt.localeCompare(a.publishedAt)
  )
}

export async function chargerArticle(slug: string): Promise<Article | undefined> {
  const tous = await chargerArticles()
  return tous.find((a) => a.slug === slug)
}
