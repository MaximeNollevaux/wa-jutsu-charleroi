import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClockIcon } from '@heroicons/react/24/outline'
import { ArticleMarkdown } from '@/components/blog/ArticleMarkdown'
import {
  estImageDistante,
  formatDate,
  getRelated,
  urlAbsolueImage,
} from '@/lib/blog'
import { chargerArticle, chargerArticles } from '@/lib/blog/from-one'
import { BlocReservation } from '@/components/reservation/BlocReservation'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Les slugs connus de Synara One au build sont pre-rendus ; ceux publies
// ensuite sont rendus a la demande (dynamicParams reste a true).
export async function generateStaticParams() {
  const articles = await chargerArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await chargerArticle(params.slug)
  if (!article) return {}
  const image = urlAbsolueImage(article.image, baseUrl)

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
      images: [{ url: image, alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const tous = await chargerArticles()
  const article = tous.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const related = getRelated(article, 3, tous)
  return (
    <>
      {/* Donnees structurees servies par Synara One (BlogPosting, et FAQPage
          tiree de la section « Questions frequentes » visible) : une seule
          source, pas de double balisage. Le fil d'Ariane (BreadcrumbList) reste
          celui du composant Breadcrumbs. `<` echappe : un contenu ne peut pas
          fermer la balise. */}
      {article.jsonld.map((bloc, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bloc).replace(/</g, '\\u003c'),
          }}
        />
      ))}

      <article>
        {/* En-tete */}
        <header className="py-16 lg:py-20 bg-dark-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="bg-primary text-on-primary px-3 py-1 font-heading font-bold uppercase tracking-wide">
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
              unoptimized={estImageDistante(article.image)}
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
            {/* La FAQ fait partie du Markdown (« ## Questions frequentes »). */}
            <ArticleMarkdown markdown={article.contentMd} />

            {/* Encart club */}
            <aside className="mt-16 bg-dark-800 border border-dark-600 p-8">
              <p className="text-primary font-heading font-semibold uppercase tracking-widest text-sm mb-3">
                À propos du club
              </p>
              <p className="text-dark-300 leading-relaxed">
                Le <strong className="text-white">Club CCAJT Wa-Jutsu</strong> enseigne le
                ju-jutsu traditionnel japonais à Marcinelle depuis plus de trente
                ans. ASBL affiliée à l&apos;Académie Européenne de Ju-Jutsu
                Traditionnel, il accueille les enfants dès 5 ans et les adultes de
                tous niveaux, le jeudi soir et le dimanche matin, au 4 Rue de
                l&apos;Asie à 6001 Marcinelle.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href="/inscription"
                  className="inline-flex items-center justify-center bg-primary text-on-primary font-heading font-bold uppercase tracking-wide px-6 py-3 hover:bg-primary-700 transition-colors"
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

        <BlocReservation
          titre="Le plus simple reste de venir voir"
          texte="Un cours d'essai gratuit répond mieux qu'un article : le jeudi soir, à Marcinelle, en tenue de sport."
          fond="bg-dark-700"
        />

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
                        unoptimized={estImageDistante(item.image)}
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
