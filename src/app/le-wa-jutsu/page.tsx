import { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Le Wa-Jutsu',
  description: 'Découvrez le Wa-Jutsu, art martial traditionnel japonais non compétitif. Philosophie, techniques, système de grades et histoire de cette méthode de Ju-Jutsu.',
}

const grades = [
  { name: '6ème Kyu', belt: 'Blanche', color: 'bg-white' },
  { name: '5ème Kyu', belt: 'Jaune', color: 'bg-yellow-400' },
  { name: '4ème Kyu', belt: 'Orange', color: 'bg-orange-500' },
  { name: '3ème Kyu', belt: 'Verte', color: 'bg-green-500' },
  { name: '2ème Kyu', belt: 'Bleue', color: 'bg-blue-500' },
  { name: '1er Kyu', belt: 'Marron', color: 'bg-amber-800' },
  { name: '1er Dan+', belt: 'Noire', color: 'bg-black border border-white' },
  { name: 'Spécial', belt: 'Violette', color: 'bg-purple-600' },
]

const principles = [
  {
    japanese: 'Shin',
    meaning: 'État d\'esprit',
    description: 'Le développement mental et spirituel, la maîtrise de soi et la sérénité.',
  },
  {
    japanese: 'Ghi',
    meaning: 'Habileté technique',
    description: 'La perfection des mouvements et l\'efficacité des techniques.',
  },
  {
    japanese: 'Taï',
    meaning: 'Vitalité physique',
    description: 'Le développement et l\'entretien du corps, la condition physique.',
  },
]

export default function LeWaJutsuPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-dark-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/wa-jutsu-hero.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            L'Art de l'Harmonie
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Le Wa-Jutsu
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Un art martial traditionnel japonais non compétitif, axé sur la transformation personnelle
            et le développement d'une self-défense efficace.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="Philosophie"
                title="L'Harmonie du Corps et de l'Esprit"
                centered={false}
              />
              <p className="text-dark-300 mb-6">
                Le terme <strong className="text-white">"Wa-Jutsu"</strong> signifie littéralement
                "l'art de l'harmonie". Cette discipline ne vise pas la compétition mais la
                <strong className="text-primary"> transformation personnelle profonde</strong>.
              </p>
              <p className="text-dark-300 mb-6">
                Notre devise : <em className="text-white">"Amitié, entraide et prospérité partagée"</em>
                reflète l'esprit de communauté et d'entraide qui règne au sein de notre pratique.
              </p>
              <p className="text-dark-300 mb-8">
                Dans un dojo de Wa-Jutsu, il n'y a pas de notion d'êtres supérieurs ou inférieurs.
                Chacun se trouve sur une Voie d'évolution, avec ses qualités et ses défauts.
                Comme le disent les Maîtres : <em className="text-primary">"Un seul ennemi à vaincre… Soi-même !"</em>
              </p>

              {/* Bushido values */}
              <div className="bg-dark-800 p-6 border-l-4 border-primary">
                <h3 className="font-heading font-bold text-lg mb-3">Le Bushido</h3>
                <p className="text-dark-400 text-sm">
                  Le pratiquant de Wa-Jutsu suit les valeurs morales dictées par le code d'honneur
                  et de morale traditionnelle japonaise : le Bushido. La technique n'est rien si
                  le pratiquant néglige ces valeurs fondamentales.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {principles.map((principle) => (
                <div
                  key={principle.japanese}
                  className="bg-dark-800 p-6 border border-dark-600"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl font-heading font-extrabold text-primary">
                      {principle.japanese}
                    </span>
                    <span className="text-xl font-heading font-semibold">
                      {principle.meaning}
                    </span>
                  </div>
                  <p className="text-dark-400">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Les techniques"
            title="Ce que vous apprendrez"
            description="Le Wa-Jutsu englobe un large éventail de techniques issues du Ju-Jutsu traditionnel."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 text-primary">
                Atemi-Waza
              </h3>
              <p className="text-dark-300 mb-4">
                Techniques de frappe aux points vitaux. Ces techniques comprennent les coups de poing,
                coups de pied, coudes et genoux dirigés vers des zones sensibles du corps.
              </p>
            </div>

            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 text-primary">
                Nage-Waza
              </h3>
              <p className="text-dark-300 mb-4">
                Techniques de projection. L'art de déséquilibrer et projeter l'adversaire en utilisant
                sa propre force et son élan contre lui.
              </p>
            </div>

            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 text-primary">
                Kansetsu-Waza
              </h3>
              <p className="text-dark-300 mb-4">
                Techniques de clés articulaires. Contrôle de l'adversaire par manipulation des
                articulations (coude, poignet, épaule, etc.).
              </p>
            </div>

            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 text-primary">
                Ne-Waza
              </h3>
              <p className="text-dark-300 mb-4">
                Techniques au sol. Immobilisations, contrôles et soumissions pour neutraliser
                un adversaire au sol de manière efficace.
              </p>
            </div>

            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 text-primary">
                Shime-Waza
              </h3>
              <p className="text-dark-300 mb-4">
                Techniques d'étranglement. Contrôle de l'adversaire par compression de la carotide
                ou de la trachée, techniques avancées enseignées avec prudence.
              </p>
            </div>

            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 text-primary">
                Kata
              </h3>
              <p className="text-dark-300 mb-4">
                Formes codifiées traditionnelles. Enchaînements prédéfinis permettant de perfectionner
                les mouvements, la concentration et la compréhension profonde des techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grades */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Système de grades"
            title="La progression"
            description="Un parcours structuré pour suivre votre évolution, des premiers pas jusqu'à la maîtrise."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {grades.map((grade) => (
              <div key={grade.name} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 ${grade.color} rounded-full`} />
                <p className="font-heading font-bold text-sm">{grade.name}</p>
                <p className="text-dark-400 text-xs">{grade.belt}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-dark-800 p-8 max-w-3xl mx-auto">
            <h3 className="font-heading font-bold text-xl mb-4 text-center">
              L'évaluation des grades
            </h3>
            <p className="text-dark-300 text-center">
              L'évolution d'un pratiquant s'évalue sur les trois plans : <strong className="text-primary">Shin</strong> (état d'esprit),
              <strong className="text-primary"> Ghi</strong> (habileté technique) et <strong className="text-primary">Taï</strong> (vitalité physique).
              Le grade sanctionne et évalue ces trois aspects. Toutes décisions relatives à l'enseignement
              et aux passages de grade relèvent de la seule responsabilité des professeurs titulaires.
            </p>
          </div>
        </div>
      </section>

      {/* AEJT */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-dark-700 relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/aejt.jpg')` }}
              />
            </div>
            <div>
              <SectionHeader
                subtitle="Notre affiliation"
                title="L'AEJT"
                centered={false}
              />
              <p className="text-dark-300 mb-6">
                Notre club est affilié à l'<strong className="text-white">Académie Européenne de Ju-Jutsu Traditionnel (AEJT)</strong>,
                fondée par le Soké Maître J.J. QUERO.
              </p>
              <p className="text-dark-300 mb-6">
                Cette affiliation garantit un enseignement de qualité, fidèle aux traditions du Ju-Jutsu
                japonais, et permet à nos pratiquants d'obtenir des grades reconnus au niveau européen.
              </p>
              <p className="text-dark-300">
                L'AEJT dispose également d'une Commission médicale qui peut statuer sur l'aptitude
                des pratiquants présentant des réserves médicales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase mb-6">
            Prêt à découvrir le Wa-Jutsu ?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Bénéficiez d'un mois d'essai gratuit et découvrez par vous-même
            les bienfaits de cette pratique millénaire.
          </p>
          <Button href="/inscription" variant="outline" size="lg">
            Commencer l'essai gratuit
          </Button>
        </div>
      </section>
    </>
  )
}
