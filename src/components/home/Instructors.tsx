import { SectionHeader } from '@/components/ui/SectionHeader'

const instructors = [
  {
    name: 'Didier Nollevaux',
    role: 'Enseignant',
    grade: 'Ceinture Noire',
    description: 'Passionné par l\'enseignement du Wa-Jutsu depuis de nombreuses années.',
    image: '/images/instructor-1.jpg',
  },
  {
    name: 'Abdelmonaïm Magaz',
    role: 'Enseignant',
    grade: 'Ceinture Noire',
    description: 'Expert en techniques de self-défense et pédagogie adaptée.',
    image: '/images/instructor-2.jpg',
  },
]

export function Instructors() {
  return (
    <section className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Nos enseignants"
          title="Une équipe passionnée"
          description="Des instructeurs qualifiés et expérimentés pour vous accompagner dans votre progression."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {instructors.map((instructor) => (
            <div
              key={instructor.name}
              className="group bg-dark-700 border border-dark-600 overflow-hidden"
            >
              <div className="aspect-[4/3] relative bg-dark-600">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${instructor.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-xl">{instructor.name}</h3>
                  <span className="text-primary text-sm font-heading font-semibold uppercase">
                    {instructor.grade}
                  </span>
                </div>
                <p className="text-dark-400 text-sm mb-2">{instructor.role}</p>
                <p className="text-dark-300 text-sm">{instructor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Club leadership */}
        <div className="mt-12 pt-12 border-t border-dark-700">
          <div className="text-center">
            <h3 className="font-heading font-bold text-xl mb-6 uppercase">Direction du Club</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <p className="font-heading font-semibold">Yen-Long Hsiao</p>
                <p className="text-dark-400 text-sm">Président</p>
              </div>
              <div>
                <p className="font-heading font-semibold">Fabrice Koos</p>
                <p className="text-dark-400 text-sm">Représentant légal</p>
              </div>
              <div>
                <p className="font-heading font-semibold">Philippe Dorant</p>
                <p className="text-dark-400 text-sm">Représentant légal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
