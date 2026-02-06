import { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { InscriptionForm } from '@/components/inscription/InscriptionForm'
import { CheckIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'Inscription',
  description: 'Inscrivez-vous au Wa-Jutsu Club l\'Asie Marcinelle. Formulaire d\'inscription en ligne et premier mois d\'essai gratuit.',
}

const steps = [
  {
    number: 1,
    title: 'Remplir le formulaire',
    description: 'Complétez le formulaire d\'inscription en ligne ci-dessous.',
  },
  {
    number: 2,
    title: 'Mois d\'essai gratuit',
    description: 'Profitez de 4 cours d\'essai gratuits pour découvrir le Wa-Jutsu.',
  },
  {
    number: 3,
    title: 'Certificat médical',
    description: 'Fournissez un certificat de non contre-indication à la pratique.',
  },
  {
    number: 4,
    title: 'Licence & cotisation',
    description: 'Réglez la licence annuelle (50€) et votre première cotisation.',
  },
]

const included = [
  'Cours du jeudi selon votre catégorie',
  'Accès à l\'espace membre en ligne',
  'Assurance responsabilité civile',
  'Carte membre AEJT',
  'Passage de grades',
  'Accès aux événements du club',
]

export default function InscriptionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-dark-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Rejoignez-nous
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Inscription
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Inscrivez-vous en quelques clics et bénéficiez d'un mois d'essai gratuit
            pour découvrir le Wa-Jutsu.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-dark-600" />
                )}
                <div className="relative bg-dark-800 p-6 text-center border border-dark-600">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-dark-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-700 border border-dark-600 p-8">
                <h2 className="font-heading font-bold text-2xl uppercase mb-6">
                  Formulaire de pré-inscription
                </h2>
                <p className="text-dark-400 mb-8">
                  Remplissez ce formulaire pour réserver votre place. Vous serez contacté
                  pour finaliser votre inscription et planifier votre premier cours.
                </p>
                <InscriptionForm />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-dark-700 border border-dark-600 p-6 mb-6">
                <h3 className="font-heading font-bold text-lg uppercase mb-4 text-primary">
                  Ce qui est inclus
                </h3>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-dark-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-6 mb-6">
                <h3 className="font-heading font-bold text-lg uppercase mb-2">
                  Essai gratuit
                </h3>
                <p className="text-dark-300 text-sm">
                  Les nouveaux membres bénéficient d'un mois d'essai gratuit (4 cours)
                  avant tout engagement.
                </p>
              </div>

              <div className="bg-dark-700 border border-dark-600 p-6">
                <h3 className="font-heading font-bold text-lg uppercase mb-4">
                  Documents requis
                </h3>
                <ul className="text-dark-400 text-sm space-y-2">
                  <li>• Certificat médical de non contre-indication</li>
                  <li>• Pièce d'identité (pour les mineurs : celle du représentant légal)</li>
                </ul>
                <p className="text-dark-500 text-xs mt-4">
                  Les documents seront à fournir après la période d'essai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl uppercase mb-4">
            Des questions ?
          </h2>
          <p className="text-dark-400 mb-6">
            N'hésitez pas à nous contacter pour toute question concernant l'inscription.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-dark-300">
            <a href="tel:+32476703880" className="hover:text-primary transition-colors">
              0476 70 38 80
            </a>
            <span className="text-dark-600">|</span>
            <a href="mailto:contact@wa-jutsu-charleroi.be" className="hover:text-primary transition-colors">
              contact@wa-jutsu-charleroi.be
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
