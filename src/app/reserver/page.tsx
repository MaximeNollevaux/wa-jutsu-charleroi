import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CalendrierReservation } from '@/components/reservation/CalendrierReservation'
import { CheckIcon } from '@heroicons/react/24/solid'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Le titre et la description vivent ICI, pas dans layout.tsx : en App Router,
// les metadonnees de la page ecrasent celles du layout.
export const metadata: Metadata = {
  title: 'Réserver un cours d\'essai gratuit — Jeudi soir à Marcinelle',
  description:
    "Choisissez votre date en ligne et venez essayer le ju-jutsu au Wa-Jutsu Club l'Asie, à Marcinelle. Cours d'essai gratuit et sans engagement, le jeudi : 19h00 pour les enfants, 20h30 pour les adultes.",
  keywords: [
    'cours essai arts martiaux charleroi',
    'essayer jujitsu marcinelle',
    'cours d\'essai gratuit self defense',
    'réserver cours arts martiaux charleroi',
    'arts martiaux charleroi essai',
  ],
  openGraph: {
    title: 'Réserver un cours d\'essai — Wa-Jutsu Club l\'Asie',
    description:
      "Réservez votre cours d'essai gratuit en ligne. Jeudi 19h00 (enfants) ou 20h30 (adultes), à Marcinelle.",
    url: `${baseUrl}/reserver`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/reserver`,
  },
}

const deroule = [
  {
    titre: 'Vous choisissez une date',
    texte:
      "Les créneaux proposés sont ceux du jeudi soir : 19h00 pour les enfants et ados, 20h30 pour les adultes. Le cours du dimanche n'apparaît pas — il est réservé aux ceintures marron, noires et violettes.",
  },
  {
    titre: 'Le club vous confirme',
    texte:
      "Vous recevez un e-mail de confirmation, puis un rappel la veille. Si le créneau ne convient plus, le lien du mail permet d'annuler ou de déplacer sans nous appeler.",
  },
  {
    titre: 'Vous venez, en tenue de sport',
    texte:
      "Un jogging et un t-shirt suffisent pour le premier cours : ni kimono ni licence ne sont demandés pour essayer. Arrivez une quinzaine de minutes en avance pour vous présenter au professeur.",
  },
  {
    titre: 'Vous décidez après',
    texte:
      "L'essai n'engage à rien. Si le cours vous plaît, le premier mois complet reste gratuit : l'inscription et la licence viennent seulement ensuite.",
  },
]

export default function ReserverPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-28 bg-dark-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Marcinelle · Charleroi
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl uppercase mb-6">
            Réserver un cours d&apos;essai
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Gratuit, sans engagement, et sans avoir à téléphoner : choisissez
            votre jeudi ci-dessous et venez voir à quoi ressemble un cours.
          </p>
        </div>
      </section>

      {/* Le calendrier — le plus haut possible : c'est ce que la page promet */}
      <section className="py-14 lg:py-20 bg-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CalendrierReservation />

          <p className="text-center text-dark-300 mt-6">
            Une difficulté pour réserver ? Appelez le{' '}
            <a
              href="tel:+32473838075"
              className="text-white font-medium underline underline-offset-4 decoration-primary hover:decoration-2"
            >
              0473 83 80 75
            </a>{' '}
            ou passez par le{' '}
            <Link
              href="/contact"
              className="text-white font-medium underline underline-offset-4 decoration-primary hover:decoration-2"
            >
              formulaire de contact
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Avant de venir"
            title="Comment se passe un cours d'essai"
            description="Rien de compliqué, mais autant le savoir à l'avance."
          />

          <div className="space-y-4">
            {deroule.map((etape, index) => (
              <div
                key={etape.titre}
                className="bg-dark-700 border border-dark-600 border-l-4 border-l-primary p-6"
              >
                <div className="flex gap-4">
                  <span
                    aria-hidden
                    className="font-heading font-extrabold text-2xl text-primary shrink-0 leading-none"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-lg uppercase mb-2">
                      {etape.titre}
                    </h3>
                    <p className="text-dark-300 leading-relaxed">{etape.texte}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-dark-700/60 border border-dark-600 p-6">
            <h3 className="font-heading font-bold text-lg uppercase mb-4">
              Ce qu&apos;il faut apporter
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-dark-300">
              {[
                'Une tenue de sport souple',
                'Une bouteille d\'eau',
                'Rien d\'autre : le tatami se pratique pieds nus',
                'Pour un enfant : un parent, bienvenu au bord du tatami',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Repli : le club, l'adresse, l'inscription */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            subtitle="Le dojo"
            title="4 Rue de l'Asie, 6001 Marcinelle"
            description="À dix minutes du centre de Charleroi, avec un parking devant la salle."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=4+Rue+de+l'Asie,+6001+Marcinelle"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Voir l&apos;itinéraire
            </a>
            <Link href="/inscription" className="btn-primary">
              Passer directement à l&apos;inscription
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
