// Modele d'un article du blog, tel que les pages l'affichent.
//
// Depuis le 2026-10-04, tous les articles viennent de Synara One (voir
// `from-one.ts`) : le corps est du Markdown, la FAQ y vit sous
// « ## Questions frequentes », et les donnees structurees sont calculees par
// One. Les anciens blocs types (p, h2, cta...) ont disparu avec les articles en
// dur qui les portaient.

export type Article = {
  slug: string
  /** Titre affiche en haut de l'article (H1). */
  title: string
  /**
   * Titre de la balise <title>. Distinct du H1 : il doit annoncer un fait
   * verifiable (un age, un prix, un jour) plutot que decrire un contenu — c'est
   * ce qui fait la difference entre etre affiche et etre clique.
   */
  seoTitle: string
  description: string
  keywords: string[]
  /** Date ISO courte. Sert au tri et a l'affichage. */
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  readingMinutes: number
  image: string
  imageAlt: string
  excerpt: string
  /** Corps de l'article en Markdown (Synara One). */
  contentMd: string
  /** JSON-LD servi par One (BlogPosting, FAQPage) : injecte tel quel. */
  jsonld: Record<string, unknown>[]
}
