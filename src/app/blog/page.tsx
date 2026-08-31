import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ClockIcon } from '@heroicons/react/24/outline'
import { articles, formatDate } from '@/lib/blog'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: `Conseils arts martiaux à Charleroi — Le blog du club`,
  description: `Choisir un art martial pour son enfant, débuter adulte, comprendre le Wa-Jutsu : les articles du Wa-Jutsu Club l'Asie Marcinelle, écrits par les enseignants du club.`,
  keywords: [
    'blog arts martiaux charleroi',
    'conseils arts martiaux',
    'ju-jutsu charleroi',
    'wa-jutsu',
    'choisir un art martial',
    'arts martiaux marcinelle',
  ],
  openGraph: {
    title: `Le blog du Wa-Jutsu Club l'Asie Marcinelle`,
    description: `Conseils pratiques et repères sur les arts martiaux, par les enseignants du club de Marcinelle.`,
    url: `${baseUrl}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

// Blog + liste des articles : permet a Google de comprendre la section comme un
// ensemble, et pas comme six pages sans lien entre elles.
const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${baseUrl}/blog#blog`,
  name: `Le blog du Wa-Jutsu Club l'Asie Marcinelle`,
  description: `Conseils et reperes sur les arts martiaux a Charleroi, par les enseignants du club.`,
  url: `${baseUrl}/blog`,
  inLanguage: 'fr-BE',
  publisher: { '@id': `${baseUrl}/#organization` },
  blogPost: articles.map((a) => ({
    '@type': 'BlogPosting',
    '@id': `${baseUrl}/blog/${a.slug}#article`,
    headline: a.title,
    description: a.description,
    url: `${baseUrl}/blog/${a.slug}`,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    image: `${baseUrl}${a.image}`,
    author: { '@type': 'Organization', name: a.author },
  })),
}

export default function BlogPage() {
  const [featured, ...rest] = articles

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 lg:py-32 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Le blog du club
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Conseils &amp; repères
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Choisir une discipline, débuter à tout âge, comprendre ce qu&apos;on vient
            chercher sur un tatami. Des réponses écrites par les enseignants du
            dojo de Marcinelle.
          </p>
        </div>
      </section>

      {/* Article mis en avant */}
      <section className="pb-16 bg-dark-700 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-8 bg-dark-800 border border-dark-600 hover:border-primary transition-colors"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="bg-primary text-on-primary px-3 py-1 font-heading font-bold uppercase tracking-wide">
                  {featured.category}
                </span>
                <span className="text-dark-400 flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {featured.readingMinutes} min
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase mb-4 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-dark-300 text-lg leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <span className="text-primary font-heading font-bold uppercase tracking-wide">
                Lire l&apos;article →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Les autres articles */}
      <section className="pb-24 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <article
                key={article.slug}
                className="bg-dark-800 border border-dark-600 hover:border-primary transition-colors flex flex-col"
              >
                <Link href={`/blog/${article.slug}`} className="group flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 text-xs">
                      <span className="text-primary font-heading font-bold uppercase tracking-wide">
                        {article.category}
                      </span>
                      <span className="text-dark-500">·</span>
                      <span className="text-dark-400">
                        {article.readingMinutes} min de lecture
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-xl uppercase mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-dark-400 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <time
                      dateTime={article.publishedAt}
                      className="block mt-4 text-dark-500 text-sm"
                    >
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-4xl uppercase mb-4">
            Le premier mois est gratuit
          </h2>
          <p className="text-on-primary/90 text-lg mb-8">
            Lire est utile, essayer l&apos;est davantage. Le cours du jeudi soir,
            au 4 Rue de l&apos;Asie à Marcinelle, est ouvert aux débutants de tout âge.
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center justify-center bg-on-primary text-primary font-heading font-bold uppercase tracking-wide px-8 py-4 hover:bg-primary-50 transition-colors"
          >
            Réserver un cours d&apos;essai
          </Link>
        </div>
      </section>
    </>
  )
}
