import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/images/hero-bg.jpg')`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
              Ju-Jutsu Traditionnel
            </p>
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase leading-tight mb-6">
              L'Art de la<br />
              <span className="text-primary">Transformation</span>
            </h1>
            <p className="text-dark-300 text-lg md:text-xl mb-8 max-w-xl">
              Découvrez le Wa-Jutsu, un art martial non compétitif axé sur le développement personnel et une self-défense efficace.
              <strong className="text-white"> Premier mois d'essai gratuit.</strong>
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/inscription" size="lg">
                Commencer l'essai gratuit
              </Button>
              <Button href="/le-wa-jutsu" variant="outline" size="lg">
                Découvrir le Wa-Jutsu
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-dark-700">
              <div>
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary">30+</div>
                <div className="text-dark-400 text-sm uppercase tracking-wide mt-1">Années d'expérience</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary">5+</div>
                <div className="text-dark-400 text-sm uppercase tracking-wide mt-1">Ans minimum</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary">AEJT</div>
                <div className="text-dark-400 text-sm uppercase tracking-wide mt-1">Affilié</div>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="lg:justify-self-end">
            <div className="bg-white text-dark-800 shadow-2xl max-w-md">
              <div className="bg-primary px-6 py-4">
                <h3 className="font-heading font-bold text-xl uppercase text-white">Horaires des cours</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-dark-100">
                  <div>
                    <div className="font-heading font-bold uppercase">Jeudi</div>
                    <div className="text-dark-500 text-sm">Enfants & Ados</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">19h00 - 20h30</div>
                  </div>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-dark-100">
                  <div>
                    <div className="font-heading font-bold uppercase">Jeudi</div>
                    <div className="text-dark-500 text-sm">Adultes</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">20h30 - 23h00</div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-heading font-bold uppercase">Dimanche</div>
                    <div className="text-dark-500 text-sm">Grades avancés</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">9h00 - 12h00</div>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-dark-100">
                  <Link
                    href="/horaires-tarifs"
                    className="block w-full btn-primary text-center"
                  >
                    Voir tous les tarifs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
