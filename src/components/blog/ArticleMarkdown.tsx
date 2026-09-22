import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Corps d'un article ecrit dans Synara One (Markdown). Reprend un a un les
 * styles d'`ArticleBody` : un article de One ne doit pas se distinguer d'un
 * article du depot. Le HTML brut du Markdown est ignore (pas de rehype-raw) :
 * rien d'autre que ce que ces composants produisent n'arrive dans la page.
 */
const composants: Components = {
  h1: ({ children }) => (
    <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase text-white pt-8 tracking-tight">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase text-white pt-8 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading font-bold text-xl md:text-2xl text-primary-400 pt-4">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-heading font-bold text-lg text-white pt-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-dark-200 leading-relaxed text-lg">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-3 pl-6 list-disc marker:text-primary text-dark-200 leading-relaxed text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-3 pl-6 list-decimal marker:text-primary marker:font-heading marker:font-bold text-dark-200 leading-relaxed text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => {
    const cible = href || '#'
    const classes = 'text-primary underline underline-offset-4 hover:text-primary-400'
    if (cible.startsWith('/')) {
      return (
        <Link href={cible} className={classes}>
          {children}
        </Link>
      )
    }
    return (
      <a href={cible} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-white italic text-xl">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-dark-600 my-10" />,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-dark-200">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b-2 border-primary px-4 py-3 font-heading font-bold uppercase tracking-wide text-white text-sm">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-dark-600 px-4 py-3 align-top">{children}</td>
  ),
  code: ({ children }) => (
    <code className="bg-dark-800 px-1.5 py-0.5 text-primary-400 text-base">
      {children}
    </code>
  ),
  img: ({ src, alt }) =>
    // eslint-disable-next-line @next/next/no-img-element
    typeof src === 'string' ? (
      <img src={src} alt={alt || ''} loading="lazy" className="w-full h-auto" />
    ) : null,
}

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={composants}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
