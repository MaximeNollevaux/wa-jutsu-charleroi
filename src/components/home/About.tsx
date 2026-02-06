import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import {
  ShieldCheckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Self-Défense Efficace',
    description: 'Apprenez des techniques de self-défense éprouvées et redoutables, adaptées à toutes les situations.',
  },
  {
    icon: UserGroupIcon,
    title: 'Esprit de Communauté',
    description: 'Amitié, entraide et prospérité partagée sont les valeurs fondamentales de notre club.',
  },
  {
    icon: AcademicCapIcon,
    title: 'Progression Continue',
    description: 'Un système de grades structuré (Kyu et Dan) pour suivre votre évolution personnelle.',
  },
  {
    icon: HeartIcon,
    title: 'Non Compétitif',
    description: 'Focus sur le développement personnel et la maîtrise de soi, pas sur la compétition.',
  },
]

export function About() {
  return (
    <section className="py-20 lg:py-28 bg-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-dark-600 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/about-training.jpg')` }}
              />
              {/* Accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary" />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-6 bg-primary px-8 py-6">
              <div className="font-heading font-extrabold text-4xl">30+</div>
              <div className="text-sm uppercase tracking-wide">Ans d'expérience</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionHeader
              subtitle="À propos du club"
              title="Le Wa-Jutsu Club l'Asie"
              centered={false}
            />
            <p className="text-dark-300 mb-6">
              Le <strong className="text-white">Wa-Jutsu Club l'Asie Marcinelle</strong> pratique un art martial
              traditionnel japonais non compétitif. Notre méthode, le Wa-Jutsu, signifie littéralement
              "l'art de l'harmonie" et vise la transformation personnelle profonde.
            </p>
            <p className="text-dark-300 mb-8">
              Affilié à l'<strong className="text-white">Académie Européenne de Ju-Jutsu Traditionnel (AEJT)</strong>
              du Soké Fondateur Maître J.J. QUERO, notre club accueille tous les pratiquants dès l'âge de 5 ans,
              sans limite d'âge supérieure.
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-dark-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/le-club">En savoir plus sur le club</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
