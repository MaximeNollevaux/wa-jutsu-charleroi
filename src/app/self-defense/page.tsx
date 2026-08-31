import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BlocReservation } from '@/components/reservation/BlocReservation'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CheckIcon } from '@heroicons/react/24/solid'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Le titre et la description vivent ICI, pas dans layout.tsx : en App Router,
// les metadonnees de la page ecrasent celles du layout.
//
// Page creee sur les donnees Search Console : « self defense charleroi » est la
// meilleure requete de decouverte du site — 352 affichages en 16 mois, position
// 7,3 — et aucune page ne lui repondait.
export const metadata: Metadata = {
  title: 'Self-défense à Charleroi — Cours adultes le jeudi soir',
  description:
    "Apprendre à se défendre à Marcinelle, près de Charleroi : dégagements, projections, clés et travail au sol du ju-jutsu traditionnel. Cours adultes le jeudi 20h30-23h. Premier mois gratuit.",
  keywords: [
    'self defense charleroi',
    'self défense marcinelle',
    'cours self defense charleroi',
    'défense personnelle charleroi',
    'apprendre à se défendre charleroi',
    'self defense femme charleroi',
    'ju-jutsu self defense',
  ],
  openGraph: {
    title: 'Self-défense à Charleroi — Wa-Jutsu Club Marcinelle',
    description:
      "Les techniques de défense du ju-jutsu traditionnel, apprises dans la durée plutôt qu'en stage express. Cours adultes le jeudi soir à Marcinelle.",
    url: `${baseUrl}/self-defense`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/self-defense`,
  },
}

const techniques = [
  {
    nom: 'Ukemi — les chutes',
    texte:
      "La première chose enseignée, et la plus utile hors du dojo. Savoir tomber sans se blesser sert bien plus souvent qu'un dégagement de saisie.",
  },
  {
    nom: 'Dégagements de saisies',
    texte:
      "Se libérer d'une prise au poignet, au col, à la gorge ou par-derrière. C'est le cœur pratique de la défense personnelle : la plupart des agressions commencent par une saisie.",
  },
  {
    nom: 'Nage-waza — les projections',
    texte:
      "Utiliser le déséquilibre plutôt que la force. Une technique bien placée fonctionne contre quelqu'un de plus lourd — c'est précisément l'intérêt du ju-jutsu.",
  },
  {
    nom: 'Kansetsu-waza — les clés articulaires',
    texte:
      "Contrôler par l'articulation, avec un dosage progressif. Permet de neutraliser sans frapper, ce qui compte aussi juridiquement.",
  },
  {
    nom: 'Ne-waza — le travail au sol',
    texte:
      "Que faire une fois à terre : se dégager, se relever, contrôler. Une grande partie des agressions finit au sol.",
  },
  {
    nom: 'Atemi-waza — les frappes',
    texte:
      "Les points vitaux, travaillés en contrôle sur le partenaire. Un complément aux techniques de saisie, pas une pratique de percussion.",
  },
]

export default function SelfDefensePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-28 lg:py-32 bg-dark-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/images/self-defense-2026.png')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-4">
            Marcinelle · Charleroi
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl uppercase mb-6">
            Apprendre à se défendre
          </h1>
          <p className="text-dark-300 text-xl max-w-3xl mx-auto">
            Les techniques de défense du ju-jutsu traditionnel japonais,
            apprises dans la durée plutôt qu&apos;en stage de six semaines.
            Cours adultes le jeudi soir, premier mois gratuit.
          </p>

          <div className="mt-8">
            <a href="#reserver" className="btn-primary text-sm">
              Réserver un cours d&apos;essai gratuit
            </a>
          </div>
        </div>
      </section>

      {/* Ce qu'on propose et ce qu'on ne propose pas */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Soyons clairs"
            title="Ce que nous proposons, et ce que nous ne proposons pas"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-800 border border-dark-600 border-l-4 border-l-primary p-6">
              <h3 className="font-heading font-bold text-lg uppercase mb-4 text-primary">
                Ce que vous trouverez ici
              </h3>
              <ul className="space-y-3 text-dark-300">
                {[
                  'Un cours hebdomadaire toute l\'année, pas un stage ponctuel',
                  'Des techniques efficaces contre plus fort et plus lourd que soi',
                  'Un travail avec partenaire réel, à intensité progressive',
                  'Un groupe mixte, du débutant complet au gradé',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-800 border border-dark-600 border-l-4 border-l-dark-500 p-6">
              <h3 className="font-heading font-bold text-lg uppercase mb-4 text-dark-300">
                Ce que nous ne faisons pas
              </h3>
              <ul className="space-y-3 text-dark-400">
                {[
                  'Pas de stage express « self-défense en 6 séances »',
                  'Pas de compétition, pas de combat libre',
                  'Pas de cours séparé réservé aux femmes',
                  'Pas de promesse d\'invincibilité : fuir reste la meilleure défense',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-dark-500 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-dark-800/60 border border-dark-600 p-6">
            <p className="text-dark-300 leading-relaxed">
              Nous préférons l&apos;écrire franchement : la méthode Wa-Jutsu
              considère la défense personnelle comme un{' '}
              <strong className="text-white">effet</strong> de la pratique, pas
              comme son objectif. Vous apprendrez à vous défendre — les
              techniques sont celles du ju-jutsu et elles fonctionnent — mais
              dans le cadre d&apos;un art martial traditionnel, avec ses
              rituels et sa progression lente. Si vous cherchez uniquement une
              méthode de défense en quelques week-ends, un club de krav maga
              répondra mieux à votre attente.
            </p>
          </div>
        </div>
      </section>

      {/* Les techniques */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Le programme"
            title="Ce que vous apprenez"
            description="Le répertoire du ju-jutsu traditionnel, dans l'ordre où il s'enseigne."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((t) => (
              <div key={t.nom} className="bg-dark-700 border border-dark-600 p-6">
                <h3 className="font-heading font-bold text-lg mb-3 text-primary-400">
                  {t.nom}
                </h3>
                <p className="text-dark-400 leading-relaxed text-sm">{t.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi la durée */}
      <section className="py-20 lg:py-28 bg-dark-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="La question qui compte"
            title="Pourquoi un stage court ne suffit pas"
            centered={false}
          />
          <div className="space-y-5 text-dark-300 text-lg leading-relaxed">
            <p>
              Un stage de six séances vous apprend des gestes. Sous stress réel,
              le corps ne fait pas ce qu&apos;on lui a montré : il fait ce
              qu&apos;il a répété des centaines de fois. C&apos;est la seule
              raison pour laquelle nous ne proposons pas de formule courte —
              non pas qu&apos;elle rapporterait moins, mais qu&apos;elle
              promettrait quelque chose qu&apos;elle ne peut pas tenir.
            </p>
            <p>
              En pratique, les premiers acquis réellement utiles arrivent vite :
              savoir chuter et garder son équilibre quand on est saisi
              s&apos;installe en quelques mois. Le reste se construit ensuite,
              sans échéance.
            </p>
            <p>
              L&apos;autre bénéfice est moins spectaculaire et plus fréquent :
              une personne qui sait ce qu&apos;elle vaut physiquement se déplace
              autrement, et se retrouve moins souvent dans les situations
              qu&apos;elle redoute.
            </p>
          </div>
        </div>
      </section>

      {/* Infos pratiques + CTA */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/self-defense.jpg"
                alt="Travail de dégagement de saisie au dojo de Marcinelle"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-3xl uppercase mb-6">
                En pratique
              </h2>
              <dl className="space-y-4 text-dark-300">
                <div>
                  <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">Cours adultes</dt>
                  <dd>Jeudi, 20h30 – 23h00. Tous niveaux, débutants compris.</dd>
                </div>
                <div>
                  <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">Enfants et ados</dt>
                  <dd>Jeudi, 19h00 – 20h30, dès 5 ans.</dd>
                </div>
                <div>
                  <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">Où</dt>
                  <dd>4 Rue de l&apos;Asie, 6001 Marcinelle (Charleroi).</dd>
                </div>
                <div>
                  <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">Combien</dt>
                  <dd>20 €/mois adulte, 30 € pour un couple, licence annuelle 60 €. Premier mois offert.</dd>
                </div>
                <div>
                  <dt className="text-primary font-heading font-bold uppercase text-sm tracking-wide">Pour venir</dt>
                  <dd>Un jogging, un t-shirt, une bouteille d&apos;eau. Le kimono attendra.</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/reserver" className="btn-primary text-sm">
                  Réserver un cours d&apos;essai
                </Link>
                <Link
                  href="/horaires-tarifs"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-heading font-bold uppercase tracking-wide px-6 py-3 text-sm hover:bg-white hover:text-dark-800 transition-colors"
                >
                  Horaires &amp; tarifs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlocReservation
        titre="Le premier cours est le meilleur test"
        texte="Aucune vidéo ne dit ce que fait un tatami. Choisissez un jeudi, venez en tenue de sport, et jugez sur pièce."
        fond="bg-dark-700"
      />
    </>
  )
}