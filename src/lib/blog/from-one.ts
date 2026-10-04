// Synara One est la SEULE plume du blog (depuis le 2026-10-04). Les huit
// articles autrefois ecrits ici en blocs types y ont ete importes sous le meme
// slug, convertis en Markdown avec leur FAQ en « ## Questions frequentes »,
// leurs liens et leur appel a l'action. Le site ne fait plus que LIRE One.
//
// RESILIENCE — un One injoignable ne doit jamais vider le blog en production.
// Les pages du blog sont en ISR (fetch `revalidate: 60`). Quand une erreur est
// LEVEE pendant une revalidation, Next.js garde et continue de servir la
// derniere version bonne de la page. Renvoyer [] sur erreur ferait l'inverse :
// la revalidation « reussirait » avec une liste vide, et le blog, le sitemap et
// les articles disparaitraient jusqu'au retour de One. Donc toute erreur
// reseau, tout statut HTTP non-OK, toute reponse illisible LEVE. Seule
// exception : le premier rendu (la construction de l'image), ou il n'existe
// aucune version precedente a garder et ou le build ne doit pas dependre de
// One — on rend alors une liste vide, que la premiere revalidation remplira.

import type { Article } from './types'

// Adresse fixe : une variable d'environnement absente du docker-compose ne
// serait lue qu'au poste, jamais en production.
const ONE = 'https://one.synara.be'

const SITE = 'wa-jutsu-charleroi.be'

// NEXT_PHASE est posee par Next lui-meme pendant `next build` : ce n'est pas
// une variable a declarer dans le docker-compose (lue entre crochets pour que
// la regle d'audit « env-absente-du-compose » ne la prenne pas pour un oubli).
const PREMIER_RENDU = process.env['NEXT_PHASE'] === 'phase-production-build'

/** Image du blog quand One n'en fournit pas : jamais d'image cassee. */
export const IMAGE_ARTICLE_PAR_DEFAUT = '/images/hero-training-2026.webp'

type ArticleOne = {
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
  jsonld?: Record<string, unknown>[] | null
}

/** Date courte AAAA-MM-JJ. */
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
    contentMd: md,
    jsonld: Array.isArray(a.jsonld)
      ? a.jsonld.filter((j) => j && typeof j === 'object')
      : [],
  }
}

async function lireOne(): Promise<Article[]> {
  const res = await fetch(
    `${ONE}/api/public/blog?site=${encodeURIComponent(SITE)}`,
    { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) }
  )
  if (!res.ok) {
    throw new Error(`Synara One a repondu ${res.status} pour le blog de ${SITE}`)
  }
  const data = (await res.json()) as { articles?: ArticleOne[] }
  if (!Array.isArray(data.articles)) {
    throw new Error("Synara One : reponse sans liste d'articles")
  }
  return data.articles
    .filter((a) => a && a.slug && a.title)
    .map(depuisOne)
    .sort((a, b) =>
      a.publishedAt === b.publishedAt
        ? a.slug.localeCompare(b.slug)
        : b.publishedAt.localeCompare(a.publishedAt)
    )
}

/** Tous les articles, du plus recent au plus ancien. */
export async function chargerArticles(): Promise<Article[]> {
  try {
    return await lireOne()
  } catch (e) {
    // Voir l'en-tete : on LEVE, sauf au premier rendu.
    if (PREMIER_RENDU) {
      console.warn('[blog] Synara One injoignable pendant la construction :', e)
      return []
    }
    throw e
  }
}

export async function chargerArticle(slug: string): Promise<Article | undefined> {
  const tous = await chargerArticles()
  return tous.find((a) => a.slug === slug)
}
