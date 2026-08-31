import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClockIcon } from '@heroicons/react/24/outline'
import { ArticleBody } from '@/components/blog/ArticleBody'
import { articles, formatDate, getArticle, getRelated } from '@/lib/blog'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = getArticle(params.slug)
  if (!article) return {}

  const url = `${baseUrl}/blog/${article.slug}`

  return {
    // seoTitle plutot que title : la balise <title> doit annoncer un fait
    // (un age, un prix, un horaire), le H1 peut rester une question.
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      images: [{ url: `${baseUrl}${article.image}`, alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [`${baseUrl}${article.image}`],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const related = getRelated(article)
  const url = `${baseUrl}/blog/${article.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: 'fr-BE',
    image: [`${baseUrl}${article.image}`],
    articleSection: article.category,
    keywords: article.keywords.join(', '),
    wordCount: article.body.reduce((total, block) => {
      if ('text' in block) return total + block.text.split(/\s+/).length
      if ('items' in block)
        return total + block.items.join(' ').split(/\s+/).length
      return total
    }, 0),
    author: {
      '@type': 'Organization',
      name: article.author,
      url: baseUrl,
    },
    publisher: { '@id': `${baseUrl}/#organization` },
    isPartOf: { '@id': `${baseUrl}/blog#blog` },
  }

  const faqJsonLd = article.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: article.faq.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article>
        {/* En-tete */}
        <header className="py-16 lg:py-20 bg-dark-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="bg-primary px-3 py-1 font-heading font-bold uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-dark-400 flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {article.readingMinutes} min de lecture
              </span>
              <time dateTime={article.publishedAt} className="text-dark-400">
                {formatDate(article.publishedAt)}
              </time>
            </div>

            <h1 className="font-heading font-extrabold text-4xl md:text-5xl uppercase tracking-tight mb-6">
              {article.title}
            </h1>

            <p className="text-dark-300 text-xl leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </header>

        {/* Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Corps */}
        <div className="py-16 bg-dark-700">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleBody blocks={article.body} />

            {/* FAQ */}
            {article.faq?.length ? (
              <section className="mt-16 pt-12 border-t border-dark-600">
                <h2 className="font-heading font-extrabold text-3xl uppercase mb-8 tracking-tight">
                  Questions fréquentes
                </h2>
                <div className="space-y-4">
                  {article.faq.map((entry) => (
                    <details
                      key={entry.question}
                      className="bg-dark-800 border border-dark-600 group"
                    >
                      <summary className="cursor-pointer p-5 font-heading font-bold text-lg list-none flex justify-between items-center gap-4">
                        <span>{entry.question}</span>
                        <span
                          aria-hidden
                          className="text-primary text-2xl shrink-0 group-open:rotate-45 transition-transform"
                        >
                          +
                        </span>
                      </summary>
                      <p className="px-5 pb-5 text-dark-300 leading-relaxed">
                        {entry.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Encart club */}
            <aside className="mt-16 bg-dark-800 border border-dark-600 p-8">
              <p className="text-primary font-heading font-semibold uppercase tracking-widest text-sm mb-3">
                À propos du club
              </p>
              <p className="text-dark-300 leading-relaxed">
                Le <strong className="text-white">Wa-Jutsu Club l&apos;Asie</strong> enseigne le
                ju-jutsu traditionnel japonais à Marcinelle depuis plus de trente
                ans. ASBL affiliée à l&apos;Académie Européenne de Ju-Jutsu
                Traditionnel, il accueille les enfants dès 5 ans et les adultes de
                tous niveaux, le jeudi soir et le dimanche matin, au 4 Rue de
                l&apos;Asie à 6001 Marcinelle.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href="/inscription"
                  className="inline-flex items-center justify-center bg-primary text-white font-heading font-bold uppercase tracking-wide px-6 py-3 hover:bg-primary-700 transition-colors"
                >
                  Cours d&apos;essai gratuit
                </Link>
                <Link
                  href="/horaires-tarifs"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-heading font-bold uppercase tracking-wide px-6 py-3 hover:bg-white hover:text-dark-800 transition-colors"
                >
                  Horaires &amp; tarifs
                </Link>
                {/* Lien vers la page pilier : les articles doivent renvoyer vers
                    elle, c'est elle qui vise « wa jutsu » — 1554 affichages sur
                    16 mois, et la requete ou le club a le plus a gagner. */}
                <Link
                  href="/le-wa-jutsu"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-heading font-bold uppercase tracking-wide px-6 py-3 hover:bg-white hover:text-dark-800 transition-colors"
                >
                  Qu&apos;est-ce que le Wa-Jutsu ?
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Articles lies */}
        {related.length > 0 && (
          <section className="py-20 bg-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading font-extrabold text-3xl uppercase mb-10 tracking-tight">
                À lire ensuite
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group bg-dark-700 border border-dark-600 hover:border-primary transition-colors flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-primary font-heading font-bold uppercase tracking-wide text-xs">
                        {item.category}
                      </span>
                      <h3 className="font-heading font-bold text-lg uppercase mt-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
