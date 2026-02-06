import { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CheckIcon, ClockIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'Horaires & Tarifs',
  description: 'Horaires des cours et tarifs du Wa-Jutsu Club l\'Asie Marcinelle. Enfants, jeunes, adultes et couples. Premier mois d\'essai gratuit.',
}

const schedules = [
  {
    day: 'Jeudi',
    sessions: [
      {
        name: 'Enfants & Ados',
        time: '19h00 - 20h30',
        description: 'Cours accessible aux enfants dès 5 ans et adolescents. Parents de pratiquants bienvenus.',
      },
      {
        name: 'Adultes',
        time: '20h30 - 23h00',
        description: 'Cours complet pour tous les niveaux adultes, du débutant au confirmé.',
      },
    ],
  },
  {
    day: 'Dimanche',
    sessions: [
      {
        name: 'Grades Avancés',
        time: '9h00 - 12h00',
        description: 'Cours réservé aux 1er Kyu (ceinture marron), ceintures noires et ceintures violettes.',
      },
    ],
  },
]

const pricingPlans = [
  {
    name: 'Enfants',
    age: 'Moins de 13 ans',
    price: 8,
    period: '/mois',
    features: [
      'Cours du jeudi (19h00-20h30)',
      'Initiation aux techniques de base',
      'Développement de la discipline',
      'Encadrement pédagogique adapté',
      'Préparation aux premiers grades',
    ],
  },
  {
    name: 'Jeunes',
    age: '13 à 18 ans',
    price: 10,
    period: '/mois',
    features: [
      'Cours du jeudi (19h00-20h30)',
      'Techniques intermédiaires',
      'Préparation aux grades',
      'Self-défense adaptée',
      'Développement physique et mental',
    ],
  },
  {
    name: 'Adultes',
    age: 'Plus de 18 ans',
    price: 20,
    period: '/mois',
    popular: true,
    features: [
      'Cours du jeudi (20h30-23h00)',
      'Programme technique complet',
      'Self-défense avancée',
      'Kata et techniques traditionnelles',
      'Accès cours dimanche (selon grade)',
    ],
  },
  {
    name: 'Couple',
    age: '2 adultes',
    price: 30,
    period: '/mois',
    features: [
      'Cours du jeudi (20h30-23h00)',
      'Tarif préférentiel pour deux',
      'Programme complet',
      'Pratiquez en duo',
      'Accès cours dimanche (selon grade)',
    ],
  },
]

export default function HorairesTarifsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-dark-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Informations pratiques
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Horaires & Tarifs
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Des cours adaptés à tous les âges et tous les niveaux.
            Premier mois d'essai gratuit pour les nouveaux membres.
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Planning"
            title="Horaires des cours"
            description="Nos cours ont lieu au 4 Rue de l'Asie, 6001 Marcinelle."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {schedules.map((schedule) => (
              <div key={schedule.day} className="bg-dark-800 border border-dark-600">
                <div className="bg-primary px-6 py-4">
                  <h3 className="font-heading font-bold text-2xl uppercase text-white flex items-center gap-3">
                    <ClockIcon className="w-6 h-6" />
                    {schedule.day}
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  {schedule.sessions.map((session) => (
                    <div key={session.name}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-heading font-bold text-lg">{session.name}</h4>
                        <span className="text-primary font-bold">{session.time}</span>
                      </div>
                      <p className="text-dark-400 text-sm">{session.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-dark-800/50 border border-dark-600 p-6 max-w-4xl mx-auto text-center">
            <p className="text-dark-400 text-sm">
              <strong className="text-white">Note :</strong> Les horaires peuvent être modifiés exceptionnellement.
              Consultez notre page Facebook ou contactez-nous pour les dernières informations.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Tarification"
            title="Nos formules"
            description="Des tarifs accessibles adaptés à chaque situation."
          />

          {/* Annual fee */}
          <div className="bg-primary text-white p-8 mb-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="font-heading font-bold text-2xl uppercase mb-2">
                  Licence Annuelle
                </h3>
                <p className="text-white/90">
                  Obligatoire pour tous les pratiquants, payable une fois par saison sportive
                  (1er septembre au 30 juin).
                </p>
              </div>
              <div className="text-center md:text-right">
                <span className="font-heading font-extrabold text-5xl">50€</span>
                <span className="text-white/80">/an</span>
                <p className="text-white/80 text-sm mt-2">
                  Inclut : droit d'entrée, assurance RC, carte AEJT
                </p>
              </div>
            </div>
          </div>

          {/* Monthly plans */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-dark-700 border ${
                  plan.popular ? 'border-primary' : 'border-dark-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-sm font-heading font-bold uppercase">
                    Populaire
                  </div>
                )}

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-heading font-bold text-xl uppercase mb-1">{plan.name}</h3>
                    <p className="text-dark-400 text-sm">{plan.age}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className="font-heading font-extrabold text-5xl text-primary">{plan.price}€</span>
                    <span className="text-dark-400">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-dark-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="/inscription"
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    S'inscrire
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Modalités"
            title="Informations de paiement"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-dark-800 p-6 border border-dark-600">
              <h3 className="font-heading font-bold text-lg uppercase mb-4 text-primary">
                Mode de paiement
              </h3>
              <p className="text-dark-300 text-sm mb-4">
                Les cotisations peuvent être payées :
              </p>
              <ul className="text-dark-400 text-sm space-y-2">
                <li>• En espèces auprès du responsable</li>
                <li>• Par virement bancaire</li>
              </ul>
              <p className="text-dark-300 text-sm mt-4">
                <strong className="text-white">IBAN :</strong><br />
                BE22 0012 7040 4047
              </p>
            </div>

            <div className="bg-dark-800 p-6 border border-dark-600">
              <h3 className="font-heading font-bold text-lg uppercase mb-4 text-primary">
                Communication
              </h3>
              <p className="text-dark-300 text-sm mb-4">
                Pour chaque virement, indiquez :
              </p>
              <ul className="text-dark-400 text-sm space-y-2">
                <li>• Nom du pratiquant</li>
                <li>• Motif (cotisation mois/année ou licence saison)</li>
              </ul>
              <p className="text-dark-400 text-sm mt-4 italic">
                Ex: "Jean DUPONT cotisation janvier 2024"
              </p>
            </div>

            <div className="bg-dark-800 p-6 border border-dark-600">
              <h3 className="font-heading font-bold text-lg uppercase mb-4 text-primary">
                Facilités
              </h3>
              <p className="text-dark-300 text-sm mb-4">
                Possibilités de paiement :
              </p>
              <ul className="text-dark-400 text-sm space-y-2">
                <li>• Mensuel</li>
                <li>• Semestriel</li>
                <li>• Annuel (saison complète)</li>
              </ul>
              <p className="text-dark-400 text-sm mt-4">
                Des facilités peuvent être accordées aux familles. Contactez-nous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trial offer */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase mb-6">
            Mois d'essai gratuit
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Les nouveaux membres bénéficient d'un mois d'essai gratuit (4 cours).
            Aucun engagement, venez découvrir le Wa-Jutsu sans pression.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/inscription" variant="outline" size="lg">
              Commencer l'essai gratuit
            </Button>
            <Button
              href="/contact"
              size="lg"
              className="bg-white text-primary hover:bg-dark-100"
            >
              Poser une question
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
