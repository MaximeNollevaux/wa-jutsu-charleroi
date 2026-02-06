import { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Le Club',
  description: 'Découvrez le Wa-Jutsu Club l\'Asie Marcinelle, ASBL affiliée à l\'AEJT. Notre équipe, notre histoire et nos valeurs.',
}

const values = [
  {
    icon: UserGroupIcon,
    title: 'Amitié',
    description: 'Des liens forts se créent entre pratiquants partageant la même passion.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Entraide',
    description: 'Les gradés partagent leurs connaissances avec les débutants.',
  },
  {
    icon: AcademicCapIcon,
    title: 'Progression',
    description: 'Chacun évolue à son rythme vers la maîtrise de l\'art.',
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Tradition',
    description: 'Respect des valeurs et techniques traditionnelles japonaises.',
  },
]

const team = [
  {
    name: 'Yen-Long Hsiao',
    role: 'Président',
    type: 'direction',
  },
  {
    name: 'Fabrice Koos',
    role: 'Représentant légal',
    type: 'direction',
  },
  {
    name: 'Philippe Dorant',
    role: 'Représentant légal',
    type: 'direction',
  },
  {
    name: 'Didier Nollevaux',
    role: 'Enseignant',
    type: 'instructor',
  },
  {
    name: 'Abdelmonaïm Magaz',
    role: 'Enseignant',
    type: 'instructor',
  },
]

export default function LeClubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-dark-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/club-hero.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            ASBL N° 441444624
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl uppercase mb-6">
            Le Club
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Wa-Jutsu Club l'Asie Marcinelle - Un club familial dédié à la pratique
            du Ju-Jutsu Traditionnel depuis plus de 30 ans.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="Notre histoire"
                title="Un club passionné"
                centered={false}
              />
              <p className="text-dark-300 mb-6">
                L'<strong className="text-white">ASBL Wa-Jutsu Club l'Asie</strong> est une association
                sans but lucratif déclarée sous le n° d'entreprise 441444624, avec son siège social
                situé Rue des Merles, 32 à 6001 Marcinelle.
              </p>
              <p className="text-dark-300 mb-6">
                Nous pratiquons la méthode <strong className="text-primary">Wa-Jutsu</strong>, une forme
                de Ju-Jutsu Traditionnel à but non compétitif, sous l'égide de l'Académie Européenne
                de Ju-Jutsu Traditionnel (AEJT) du Soké Fondateur Maître J.J. QUERO.
              </p>
              <p className="text-dark-300 mb-8">
                Notre club accueille tous les pratiquants à partir de 5 ans, sans limite d'âge supérieure.
                Que vous soyez débutant ou confirmé, vous trouverez chez nous un environnement
                bienveillant propice à votre développement personnel et martial.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button href="/inscription">S'inscrire</Button>
                <Button href="/contact" variant="secondary">Nous contacter</Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-dark-600 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/club-training.jpg')` }}
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Nos valeurs"
            title="Ce qui nous définit"
            description="Des valeurs fortes héritées de la tradition martiale japonaise."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-dark-700 p-8 text-center border border-dark-600">
                <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading font-bold text-xl uppercase mb-2">{value.title}</h3>
                <p className="text-dark-400">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-12 bg-primary/10 border border-primary/20 p-8 text-center">
            <blockquote className="text-2xl font-heading font-semibold italic text-white mb-4">
              "Amitié, entraide et prospérité partagée"
            </blockquote>
            <p className="text-dark-400">- Notre devise</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Notre équipe"
            title="Les membres du club"
          />

          {/* Direction */}
          <div className="mb-12">
            <h3 className="text-center font-heading font-semibold text-primary uppercase tracking-wide mb-8">
              Conseil d'Administration
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {team.filter(m => m.type === 'direction').map((member) => (
                <div key={member.name} className="bg-dark-800 p-6 text-center border border-dark-600">
                  <div className="w-20 h-20 bg-dark-600 rounded-full mx-auto mb-4" />
                  <h4 className="font-heading font-bold text-lg">{member.name}</h4>
                  <p className="text-dark-400 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructors */}
          <div>
            <h3 className="text-center font-heading font-semibold text-primary uppercase tracking-wide mb-8">
              Enseignants
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {team.filter(m => m.type === 'instructor').map((member) => (
                <div key={member.name} className="bg-dark-800 p-6 text-center border border-dark-600">
                  <div className="w-24 h-24 bg-dark-600 rounded-full mx-auto mb-4" />
                  <h4 className="font-heading font-bold text-xl">{member.name}</h4>
                  <p className="text-primary text-sm font-heading uppercase">{member.role}</p>
                  <p className="text-dark-400 text-sm mt-2">Ceinture Noire</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Notre dojo"
            title="Où nous trouver"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-video bg-dark-600">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.8766!2d4.4407!3d50.4003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c226a6b5a5d5d5%3A0x0!2s4%20Rue%20de%20l&#39;Asie%2C%206001%20Marcinelle!5e0!3m2!1sfr!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Localisation du club"
              />
            </div>
            <div className="bg-dark-700 p-8 border border-dark-600">
              <h3 className="font-heading font-bold text-2xl uppercase mb-6">Informations</h3>
              <div className="space-y-4 text-dark-300">
                <p>
                  <strong className="text-white">Adresse du dojo :</strong><br />
                  4 Rue de l'Asie<br />
                  6001 Marcinelle, Belgique
                </p>
                <p>
                  <strong className="text-white">Siège social :</strong><br />
                  Rue des Merles, 32<br />
                  6001 Marcinelle
                </p>
                <p>
                  <strong className="text-white">N° IBAN :</strong><br />
                  BE22 0012 7040 4047
                </p>
                <p>
                  <strong className="text-white">N° d'entreprise :</strong><br />
                  441444624
                </p>
              </div>
              <div className="mt-8">
                <Button
                  href="https://maps.google.com/?q=4+Rue+de+l'Asie,+6001+Marcinelle"
                  className="w-full"
                >
                  Obtenir l'itinéraire
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase mb-6">
            Rejoignez notre club
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Premier mois d'essai gratuit. Venez découvrir le Wa-Jutsu et notre communauté.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/inscription" variant="outline" size="lg">
              S'inscrire
            </Button>
            <Button
              href="/contact"
              size="lg"
              className="bg-white text-primary hover:bg-dark-100"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
