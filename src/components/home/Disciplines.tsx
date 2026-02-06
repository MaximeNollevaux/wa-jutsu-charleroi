import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

const disciplines = [
  {
    title: 'Self-Défense',
    description: 'Techniques de défense personnelle efficaces et réalistes, adaptées aux situations de la vie quotidienne.',
    image: '/images/self-defense.jpg',
  },
  {
    title: 'Kata',
    description: 'Formes traditionnelles codifiées permettant de perfectionner les mouvements et la concentration.',
    image: '/images/kata.jpg',
  },
  {
    title: 'Techniques au Sol',
    description: 'Maîtrise des immobilisations, contrôles et soumissions pour neutraliser un adversaire.',
    image: '/images/ne-waza.jpg',
  },
  {
    title: 'Projections',
    description: 'L\'art de déséquilibrer et projeter l\'adversaire en utilisant sa propre force contre lui.',
    image: '/images/nage-waza.jpg',
  },
]

export function Disciplines() {
  return (
    <section className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Nos disciplines"
          title="Ce que vous apprendrez"
          description="Le Wa-Jutsu englobe un large éventail de techniques traditionnelles adaptées au monde moderne."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((discipline, index) => (
            <div
              key={discipline.title}
              className="group relative bg-dark-700 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[3/4] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${discipline.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-primary font-heading font-bold text-sm mb-2">
                  0{index + 1}
                </div>
                <h3 className="font-heading font-bold text-xl uppercase mb-2">
                  {discipline.title}
                </h3>
                <p className="text-dark-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {discipline.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/le-wa-jutsu">Découvrir le Wa-Jutsu</Button>
        </div>
      </div>
    </section>
  )
}
