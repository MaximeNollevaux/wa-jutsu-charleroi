// Modele de contenu du blog.
//
// Les articles sont des donnees typees, pas du MDX : le site n'a pas de CMS et
// ajouter un pipeline Markdown pour six articles couterait plus cher que ca ne
// rapporte. Un bloc = un element de rendu, ce qui garde le HTML sous controle
// (titres hierarchises, listes semantiques) — ce dont depend le referencement.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'note'; text: string }
  | { type: 'cta'; text: string; href: string; label: string }

export type FaqEntry = {
  question: string
  answer: string
}

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
  /** Date ISO. Sert a la fois au tri, au JSON-LD et a l'affichage. */
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  readingMinutes: number
  image: string
  imageAlt: string
  excerpt: string
  body: Block[]
  /** Alimente le JSON-LD FAQPage de l'article. Facultatif. */
  faq?: FaqEntry[]
  /** Slugs d'articles lies, pour le maillage interne. */
  related?: string[]
}
