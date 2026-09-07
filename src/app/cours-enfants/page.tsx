import type { Metadata } from 'next'
import Link from 'next/link'
import { BlocReservation } from '@/components/reservation/BlocReservation'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Page ecrite le 2026-09-07 a partir du releve marketing, et destinee au PARENT,
// pas a l'enfant.
//
// Deux constats l'ont dictee. D'abord la mesure : sur 28 jours, « self defense
// charleroi » fait 42 affichages pour 2 clics — quarante parents sur quarante-deux
// voient le club et n'entrent pas. Ensuite le releve des cinq clubs du bassin :
// sur leurs dix promesses, AUCUNE ne parle de combat, de podium ni de palmares.
// Tout le marche rassure sur une peur que personne ne nomme. On la nomme.
export const metadata: Metadata = {
  title: "Arts martiaux pour enfants à Charleroi — sans compétition",
  description:
    "Un art martial où votre enfant n'apprend pas à frapper : le premier geste enseigné est la chute. Cours enfants dès 5 ans à Marcinelle, premier mois gratuit.",
  keywords: [
    'arts martiaux enfant charleroi',
    'art martial enfant marcinelle',
    'self defense enfant charleroi',
    'ju-jutsu enfant charleroi',
    'sport enfant 5 ans charleroi',
    'art martial sans competition enfant',
  ],
  openGraph: {
    title: "Un art martial où votre enfant n'apprend pas à frapper",
    description:
      "Ni podium, ni palmarès, ni tournoi le dimanche. Le premier geste enseigné est la chute. Cours enfants dès 5 ans à Marcinelle.",
    url: `${baseUrl}/cours-enfants`,
    type: 'website',
    images: IMAGE_PARTAGE,
  },
  alternates: {
    canonical: `${baseUrl}/cours-enfants`,
  },
}

// Chaque objection est reprise dans les mots du parent, puis on lui donne raison
// avant de repondre. C'est la regle tiree du releve : on ne rassure que sur ce
// dont on a eu peur, et un dementi qui commence par « mais non » ne rassure
// personne.
const objections = [
  {
    dite: "Un art martial, ça va le rendre bagarreur.",
    aveu:
      "Oui, on lui apprend des prises. Des clés, des immobilisations, des façons de faire tomber quelqu'un — et oui, serrées trop fort, elles font mal.",
    reponse:
      "C'est exactement pour cette raison que le premier geste enseigné n'est pas une prise : c'est la chute. Avant de savoir faire tomber, il apprend à tomber lui-même. On ne serre pas une clé sur quelqu'un dont on a d'abord appris à protéger la nuque. Et le wa-jutsu ne se pratique pas en compétition : ni podium, ni palmarès, ni tournoi le dimanche. Un enfant qui vient chercher un classement s'ennuiera ici, et c'est assumé.",
  },
  {
    dite: "Je veux surtout qu'il sache se défendre s'il se fait embêter à l'école.",
    aveu:
      "Non. Une heure par semaine ne fera pas de votre enfant quelqu'un qui sait se battre, et aucun club sérieux ne peut vous promettre le contraire.",
    reponse:
      "Ce qu'une heure par semaine change, c'est autre chose : il apprend à tomber sans se blesser, à tenir sa place dans un groupe, et à reconnaître le moment où une situation dégénère. Ce sont trois choses qui servent bien plus souvent qu'un dégagement de saisie.",
  },
  {
    dite: "Il est petit et il n'est pas costaud. Les autres vont lui tomber dessus.",
    aveu:
      "Il va tomber. Souvent, et dès le premier cours — c'est ce qu'on lui apprend en premier, avant toute prise.",
    reponse:
      "La taille compte peu dans une discipline construite pour que le plus léger puisse contrôler le plus lourd : c'est son principe de départ, pas une consolation. Le travail se fait avec un partenaire, jamais contre un adversaire, et l'intensité se règle enfant par enfant.",
  },
]

export default function CoursEnfantsPage() {
  return (
    <>
      <section className="sur-fond-sombre relative py-28 lg:py-32 bg-dark-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Marcinelle · Charleroi · dès 5 ans
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl uppercase mb-6">
            Un art martial où votre enfant n&apos;apprend pas à frapper
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Vous n&apos;avez pas tapé « club de sport ». Vous avez tapé
            « self-défense ». C&apos;est rarement une envie de sport qui amène
            ici — c&apos;est une remarque de l&apos;école, un enfant qui rentre
            en silence, une histoire de cour de récréation.
          </p>
          <div className="mt-8">
            <Link href="/reserver" className="btn-primary text-sm">
              Commencer le mois d&apos;essai gratuit
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Disons-le à votre place"
            title="Ce qui vous retient"
          />

          <div className="space-y-6">
            {objections.map((o) => (
              <div
                key={o.dite}
                className="bg-dark-800 border border-dark-600 border-l-4 border-l-primary p-6"
              >
                <p className="font-heading font-bold text-lg text-primary mb-4">
                  « {o.dite} »
                </p>
                <p className="text-dark-200 mb-3">{o.aveu}</p>
                <p className="text-dark-300">{o.reponse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Sans décider à sa place"
            title="Le premier mois est gratuit"
          />
          <div className="text-dark-300 space-y-4 text-lg">
            <p>
              Pas une séance : un mois. De quoi voir passer l&apos;enthousiasme
              du premier jour et savoir ce qu&apos;il en reste au quatrième
              cours — c&apos;est la seule chose qui réponde vraiment à « est-ce
              qu&apos;il va tenir ».
            </p>
            <p>
              Restez au bord du tatami, regardez comment on parle aux enfants,
              comptez-les. Et repartez sans rien signer.
            </p>
            <p>
              Si vous vous êtes déjà déplacé pour rien ailleurs — un club fermé,
              personne pour vous accueillir — écrivez-nous avant : nous
              confirmons l&apos;horaire, et quelqu&apos;un vous attend.
            </p>
          </div>

          <dl className="grid sm:grid-cols-2 gap-6 mt-10 text-dark-300">
            <div>
              <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">
                Quand
              </dt>
              <dd>Jeudi, 19h00 – 20h30, dès 5 ans.</dd>
            </div>
            <div>
              <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">
                Où
              </dt>
              <dd>4 Rue de l&apos;Asie, 6001 Marcinelle (Charleroi).</dd>
            </div>
            <div>
              <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">
                Le wa-jutsu, c&apos;est quoi
              </dt>
              <dd>
                Un art martial japonais dérivé du ju-jutsu, fondé sur les clés,
                les projections et les immobilisations plutôt que sur les coups.
              </dd>
            </div>
            <div>
              <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">
                Pour venir
              </dt>
              <dd>Un jogging, un t-shirt, une bouteille d&apos;eau.</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/reserver" className="btn-primary text-sm">
              Commencer le mois d&apos;essai
            </Link>
            <Link
              href="/horaires-tarifs"
              className="inline-flex items-center justify-center border-2 border-white text-white font-heading font-bold uppercase tracking-wide px-6 py-3 text-sm hover:bg-white hover:text-dark-800 transition-colors"
            >
              Horaires &amp; tarifs
            </Link>
          </div>
        </div>
      </section>

      <BlocReservation
        titre="Votre enfant vous dira lui-même s'il veut revenir"
        texte="Un mois pour voir. Choisissez un jeudi, venez en tenue de sport, et jugez sur pièce."
        fond="bg-dark-700"
      />
    </>
  )
}
