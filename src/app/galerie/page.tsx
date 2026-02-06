import { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Photos et vidéos du Wa-Jutsu Club l\'Asie Marcinelle. Découvrez nos entraînements, événements et moments partagés.',
}

// Placeholder images - to be replaced with actual images
const galleryImages = [
  { id: 1, src: '/images/gallery/training-1.jpg', alt: 'Entraînement', category: 'training' },
  { id: 2, src: '/images/gallery/training-2.jpg', alt: 'Technique de projection', category: 'training' },
  { id: 3, src: '/images/gallery/training-3.jpg', alt: 'Kata', category: 'training' },
  { id: 4, src: '/images/gallery/event-1.jpg', alt: 'Passage de grade', category: 'event' },
  { id: 5, src: '/images/gallery/training-4.jpg', alt: 'Self-défense', category: 'training' },
  { id: 6, src: '/images/gallery/group-1.jpg', alt: 'Photo de groupe', category: 'group' },
  { id: 7, src: '/images/gallery/training-5.jpg', alt: 'Technique au sol', category: 'training' },
  { id: 8, src: '/images/gallery/event-2.jpg', alt: 'Stage', category: 'event' },
  { id: 9, src: '/images/gallery/training-6.jpg', alt: 'Cours enfants', category: 'training' },
]

export default function GaleriePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-dark-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Nos moments
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Galerie
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Découvrez notre club en images : entraînements, événements et moments partagés.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Photos"
            title="Nos entraînements"
            description="Quelques aperçus de notre pratique au quotidien."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="aspect-square bg-dark-600 relative overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${image.src}')` }}
                />
                <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity font-heading font-semibold text-lg">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-dark-400">
            <p className="mb-4">
              Plus de photos et vidéos sur notre page Facebook
            </p>
            <a
              href="https://www.facebook.com/WajutsuCharleroi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Suivez-nous sur Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Vidéos"
            title="En action"
            description="Découvrez le Wa-Jutsu en mouvement."
          />

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-dark-700 flex items-center justify-center border border-dark-600">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-dark-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-dark-400">
                  Vidéos à venir
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase mb-6">
            Envie d'en faire partie ?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Rejoignez-nous et créez vos propres souvenirs avec notre communauté.
          </p>
          <Button href="/inscription" variant="outline" size="lg">
            S'inscrire maintenant
          </Button>
        </div>
      </section>
    </>
  )
}
