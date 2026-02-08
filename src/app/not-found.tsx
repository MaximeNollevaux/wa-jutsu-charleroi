import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-dark-800">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="font-heading font-extrabold text-[12rem] md:text-[16rem] leading-none text-dark-700 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-extrabold text-6xl md:text-8xl text-primary uppercase tracking-wider">
              404
            </span>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading font-bold text-2xl md:text-4xl uppercase tracking-wide mb-4">
          Cette page a quitté le <span className="text-primary">Dojo</span>
        </h1>
        <p className="text-dark-400 text-lg md:text-xl max-w-xl mx-auto mb-8">
          La page que vous recherchez semble avoir pris un mauvais chemin.
          Même les meilleurs guerriers s'égarent parfois.
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 bg-primary rotate-45" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Retour à l'accueil
          </Link>
          <Link
            href="/contact"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Nous contacter
          </Link>
        </div>

        {/* Bottom hint */}
        <p className="mt-12 text-dark-500 text-sm">
          Vous cherchez quelque chose de précis ?{' '}
          <Link href="/le-wa-jutsu" className="text-primary hover:underline">
            Découvrez le Wa-Jutsu
          </Link>{' '}
          ou consultez nos{' '}
          <Link href="/horaires-tarifs" className="text-primary hover:underline">
            horaires et tarifs
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
