import Link from 'next/link'
import type { Block } from '@/lib/blog'

/**
 * Rend le corps d'un article. Chaque bloc produit l'element semantique attendu :
 * les h2/h3 doivent rester de vrais titres hierarchises, c'est ce que Google lit
 * pour construire les extraits.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                className="font-heading font-extrabold text-3xl md:text-4xl uppercase text-white pt-8 tracking-tight"
              >
                {block.text}
              </h2>
            )

          case 'h3':
            return (
              <h3
                key={i}
                className="font-heading font-bold text-xl md:text-2xl text-primary-400 pt-4"
              >
                {block.text}
              </h3>
            )

          case 'p':
            return (
              <p key={i} className="text-dark-200 leading-relaxed text-lg">
                {block.text}
              </p>
            )

          case 'ul':
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-dark-200 leading-relaxed text-lg">
                    <span aria-hidden className="text-primary font-bold shrink-0">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-dark-200 leading-relaxed text-lg">
                    <span
                      aria-hidden
                      className="font-heading font-bold text-primary shrink-0 w-6"
                    >
                      {j + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-6 py-2 my-8"
              >
                <p className="font-heading text-2xl md:text-3xl text-white italic leading-snug">
                  « {block.text} »
                </p>
                {block.source && (
                  <cite className="block mt-3 text-dark-400 text-sm not-italic uppercase tracking-wide">
                    {block.source}
                  </cite>
                )}
              </blockquote>
            )

          case 'note':
            return (
              <aside
                key={i}
                className="bg-dark-700 border border-dark-600 border-l-4 border-l-primary p-6"
              >
                <p className="text-dark-200 leading-relaxed">{block.text}</p>
              </aside>
            )

          case 'cta':
            return (
              <aside key={i} className="bg-primary text-white p-8 my-10">
                <p className="text-lg leading-relaxed mb-6">{block.text}</p>
                <Link
                  href={block.href}
                  className="inline-flex items-center justify-center bg-white text-primary font-heading font-bold uppercase tracking-wide px-6 py-3 hover:bg-dark-50 transition-colors"
                >
                  {block.label}
                </Link>
              </aside>
            )
        }
      })}
    </div>
  )
}
