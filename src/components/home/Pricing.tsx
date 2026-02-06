import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CheckIcon } from '@heroicons/react/24/solid'

const pricingPlans = [
  {
    name: 'Enfants',
    age: '- de 13 ans',
    price: 8,
    period: '/mois',
    features: [
      'Cours du jeudi (19h00-20h30)',
      'Initiation aux techniques de base',
      'Développement de la discipline',
      'Encadrement adapté',
    ],
  },
  {
    name: 'Jeunes',
    age: '13-18 ans',
    price: 10,
    period: '/mois',
    features: [
      'Cours du jeudi (19h00-20h30)',
      'Techniques intermédiaires',
      'Préparation aux grades',
      'Self-défense',
    ],
  },
  {
    name: 'Adultes',
    age: '+ de 18 ans',
    price: 20,
    period: '/mois',
    popular: true,
    features: [
      'Cours du jeudi (20h30-23h00)',
      'Programme complet',
      'Self-défense avancée',
      'Kata et techniques traditionnelles',
    ],
  },
  {
    name: 'Couple',
    age: '2 adultes',
    price: 30,
    period: '/mois',
    features: [
      'Cours du jeudi (20h30-23h00)',
      'Tarif préférentiel',
      'Programme complet pour deux',
      'Pratiquez en duo',
    ],
  },
]

export function Pricing() {
  return (
    <section className="py-20 lg:py-28 bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Tarifs"
          title="Nos formules"
          description="Des tarifs accessibles pour tous. Premier mois d'essai gratuit pour les nouveaux membres."
        />

        {/* Annual fee notice */}
        <div className="bg-primary/10 border border-primary/20 p-6 mb-12 text-center">
          <p className="text-white">
            <strong className="text-primary">Licence annuelle : 50€</strong> - Comprend le droit d'entrée,
            l'assurance responsabilité civile et la carte membre AEJT.
          </p>
        </div>

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

        <div className="text-center mt-8">
          <p className="text-dark-400 mb-4">
            Facilités de paiement disponibles. Contactez-nous pour plus d'informations.
          </p>
          <Button href="/horaires-tarifs" variant="outline">
            Voir tous les détails
          </Button>
        </div>
      </div>
    </section>
  )
}
