import type { Metadata } from 'next'
import Link from 'next/link'
import { BlocReservation } from '@/components/reservation/BlocReservation'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Page ecrite pour le PARENT, pas pour l'enfant.
//
// La mesure : sur 28 jours, « self defense charleroi » fait 42 affichages pour
// 2 clics. Quarante parents sur quarante-deux voient le club et n'entrent pas.
// Et la page self-defense existante s'adresse aux adultes.
//
// ⚠ Premiere version corrigee le 2026-09-07 : elle promettait que l'enfant
// « n'apprend pas a frapper ». C'etait faux — le Wa-Jutsu enseigne les
// Atemi-Waza — et surtout c'etait une promesse NEGATIVE, qui ne donne envie de
// rien. La self-defense est efficace, le club l'ecrit lui-meme. Ce qui le
// distingue n'est pas ce qu'il retire, c'est ce qu'il ajoute : l'absence de
// competition libere le temps qu'ailleurs on passe a preparer des tournois, et
// ce temps va au Shin — la maitrise de soi.
export const metadata: Metadata = {
  title: 'Arts martiaux pour enfants à Charleroi — self-défense sans compétition',
  description:
    "Votre enfant apprendra à se défendre, et d'abord à éviter d'avoir à le faire. Ju-jutsu traditionnel sans compétition, dès 5 ans à Marcinelle. Premier mois gratuit.",
  keywords: [
    'arts martiaux enfant charleroi',
    'self defense enfant charleroi',
    'art martial enfant marcinelle',
    'ju-jutsu enfant charleroi',
    'sport enfant 5 ans charleroi',
    'art martial sans competition enfant',
    'confiance en soi enfant art martial',
  ],
  openGraph: {
    title: "Il apprendra à se défendre. Et d'abord à éviter d'avoir à le faire.",
    description:
      "Une self-défense qui fonctionne, apprise sans compétition : pas de tournoi, pas de classement, pas de stress de résultat. Dès 5 ans à Marcinelle.",
    url: `${baseUrl}/cours-enfants`,
    type: 'website',
    images: IMAGE_PARTAGE,
  },
  alternates: { canonical: `${baseUrl}/cours-enfants` },
}

// Ce que l'enfant apprend, dans l'ordre ou il l'apprend. L'esquive et la chute
// viennent avant la technique — ce n'est pas une precaution de communication,
// c'est la progression reelle.
const apprentissages = [
  {
    titre: 'Éviter, avant tout le reste',
    texte:
      "Reconnaître qu'une situation dégénère et s'en extraire. C'est la première compétence enseignée, et de loin la plus utilisée : un conflit évité ne se raconte pas le soir, mais il n'a pas eu lieu.",
  },
  {
    titre: 'Esquiver et se dégager',
    texte:
      "Se libérer d'une saisie au poignet, au col, par-derrière. La plupart des empoignades de cour de récréation commencent par une prise, pas par un coup — savoir s'en défaire suffit souvent à mettre fin à l'histoire.",
  },
  {
    titre: 'Tomber sans se blesser',
    texte:
      "Les ukemi, les chutes. C'est le premier geste enseigné dans le dojo, avant toute technique offensive, et c'est aussi celui qui sert le plus souvent en dehors : à vélo, dans les escaliers, au football.",
  },
  {
    titre: 'Répondre, dans les règles',
    texte:
      "Clés, projections, immobilisations, et les atemi — les frappes. Le ju-jutsu est une self-défense efficace, y compris contre plus grand et plus lourd que soi. Ce qui s'apprend en même temps, c'est le cadre : une riposte doit être immédiate et proportionnée à l'attaque. C'est la règle de la légitime défense, et un enfant la comprend très bien quand on la lui explique sur le tatami.",
  },
]

const objections = [
  {
    dite: "Un art martial, ça va le rendre bagarreur.",
    reponse:
      "C'est le contraire qui se produit, et il y a une raison technique. Ici, il n'y a ni tournoi, ni classement, ni podium. Le temps que les autres clubs passent à préparer des compétitions, nous le passons sur ce que le Wa-Jutsu appelle le Shin — l'état d'esprit : se maîtriser, garder son calme, savoir s'arrêter. La devise du club est « Amitié, entraide et prospérité partagée », et la maxime qu'on y répète est « un seul ennemi à vaincre : soi-même ». Un enfant qui s'entraîne toutes les semaines à contrôler une clé sur un partenaire apprend surtout à doser sa force.",
  },
  {
    dite: "Est-ce qu'il saura vraiment se défendre s'il se fait embêter à l'école ?",
    reponse:
      "Oui, et nous ne prétendrons pas le contraire pour vous rassurer : le ju-jutsu traditionnel est une self-défense qui fonctionne. Mais ce n'est pas le premier réflexe qu'on lui apprend. On lui apprend d'abord à repérer et à éviter, ensuite à esquiver et à se dégager — et seulement ensuite à répondre, dans le cadre de la légitime défense : immédiatement, et proportionnellement. Dans une cour de récréation, les trois premières compétences règlent presque tout.",
  },
  {
    dite: "Il est petit et il n'est pas costaud.",
    reponse:
      "C'est précisément le point de départ du ju-jutsu : utiliser le déséquilibre et l'élan de l'autre plutôt que sa propre force. Une technique bien placée fonctionne contre plus lourd que soi — c'est ce qui distingue cette discipline d'un sport de force. Le travail se fait avec un partenaire, jamais contre un adversaire, et l'intensité se règle enfant par enfant.",
  },
  {
    dite: "Est-ce qu'il va aimer ? Je ne vais pas décider ça tout seul à sa place.",
    reponse:
      "Le premier mois est gratuit — pas une séance, un mois. De quoi voir passer l'enthousiasme du premier jour et savoir ce qu'il en reste au quatrième cours. Et comme il n'y a pas de compétition, il n'y a pas non plus de sélection, pas de niveau à tenir, pas de résultat à ramener : personne ne sera écarté parce qu'il progresse moins vite.",
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
            Il apprendra à se défendre
            <br />
            et d&apos;abord à éviter d&apos;avoir à le faire
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Une self-défense qui fonctionne, apprise sans compétition : pas de
            tournoi, pas de classement, pas de résultat à ramener le dimanche.
            Le temps que d&apos;autres passent à préparer des championnats, nous
            le passons sur la maîtrise de soi.
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
            subtitle="Dans cet ordre"
            title="Ce que votre enfant apprend"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {apprentissages.map((a, i) => (
              <div
                key={a.titre}
                className="bg-dark-800 border border-dark-600 border-l-4 border-l-primary p-6"
              >
                <p className="text-primary font-heading font-bold text-sm uppercase tracking-wide mb-2">
                  {i + 1}. {a.titre}
                </p>
                <p className="text-dark-300">{a.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Les questions qu'on nous pose"
            title="Ce que les parents demandent"
          />
          <div className="space-y-6">
            {objections.map((o) => (
              <div key={o.dite} className="bg-dark-700 border border-dark-600 p-6">
                <p className="font-heading font-bold text-lg text-primary mb-3">
                  « {o.dite} »
                </p>
                <p className="text-dark-300">{o.reponse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="Concrètement" title="Le cours enfants" />
          <dl className="grid sm:grid-cols-2 gap-6 text-dark-300">
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
                Une méthode de ju-jutsu traditionnel créée en 1982, sans
                compétition ni classement, qui se travaille sur trois plans :
                l&apos;état d&apos;esprit, la technique et le physique.
              </dd>
            </div>
            <div>
              <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">
                Pour venir
              </dt>
              <dd>
                Un jogging, un t-shirt, une bouteille d&apos;eau. Le kimono
                attendra.
              </dd>
            </div>
          </dl>

          <p className="text-dark-300 mt-8">
            Restez au bord du tatami le premier soir, regardez comment on parle
            aux enfants, comptez-les. Si vous vous êtes déjà déplacé pour rien
            ailleurs, écrivez-nous avant : nous confirmons l&apos;horaire, et
            quelqu&apos;un vous attend.
          </p>

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
        titre="Un mois pour voir, sans rien signer"
        texte="Votre enfant vous dira lui-même s'il veut revenir. Choisissez un jeudi, venez en tenue de sport."
        fond="bg-dark-800"
      />
    </>
  )
}
