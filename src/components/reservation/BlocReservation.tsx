import Link from 'next/link'
import { CalendrierReservation } from './CalendrierReservation'

/**
 * Le passage a l'action, pose au bas d'une page d'arrivee.
 *
 * Pourquoi ce bloc existe : les annonces de la campagne de rentree mènent sur
 * quatre pages differentes — /self-defense, /le-wa-jutsu, un article de blog,
 * et /reserver. Seule la derniere permettait de reserver. Les trois autres
 * finissaient sur un lien « Reserver un cours d'essai » : un clic de plus,
 * une page de plus a charger, et autant d'occasions de partir. Un clic paye
 * qui arrive sur une page sans action possible est un clic gaspille.
 *
 * Le calendrier est le meme composant que sur /reserver — il porte donc aussi
 * l'origine de la visite jusqu'a BookFlow, et une reservation venue d'une
 * annonce reste rattachable a sa campagne.
 *
 * Le titre et le texte se reglent par page : un parent qui vient de lire
 * « quel art martial pour mon enfant » et un adulte venu de « self defense
 * charleroi » ne cherchent pas la meme chose, et leur servir la meme phrase
 * ferait perdre ce que l'annonce avait promis.
 */
export function BlocReservation({
  titre = "Venez essayer, c'est gratuit",
  texte = "Choisissez un jeudi et venez voir à quoi ressemble un cours. Aucun engagement, ni kimono ni licence pour un premier essai.",
  fond = 'bg-dark-700',
}: {
  titre?: string
  texte?: string
  /** Alterne avec la section precedente pour que le bloc se detache. */
  fond?: string
}) {
  return (
    <section id="reserver" className={`py-16 lg:py-20 ${fond} scroll-mt-24`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary font-heading font-semibold uppercase tracking-widest mb-3">
            Cours d&apos;essai gratuit
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl uppercase mb-4">
            {titre}
          </h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">{texte}</p>
        </div>

        <CalendrierReservation />

        <p className="text-center text-dark-300 mt-6">
          Le jeudi : 19h00 pour les enfants et ados, 20h30 pour les adultes.
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
  )
}
