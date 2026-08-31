import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Le titre et la description vivent dans page.tsx — voir la note qui y figure.
// Ce layout ne porte que le balisage et le fil d'Ariane.

// `Reservation` decrit une action possible sur la page, pas un rendez-vous
// existant : c'est `potentialAction` du club qui convient, pas un `Event`.
// Un `Event` annoncerait a Google une seance datee, avec une place a prendre —
// ce n'est pas ce que la page propose.
//
// Le noeud ne REDECLARE pas le club : il reprend l'`@id` pose par le layout
// racine et n'y ajoute que l'action. Redonner ici l'adresse et le telephone
// reviendrait a entretenir deux copies de la meme fiche, qui divergeraient.
const reservationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsClub',
  '@id': `${baseUrl}/#organization`,
  potentialAction: {
    '@type': 'ReserveAction',
    name: "Réserver un cours d'essai gratuit",
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/reserver`,
      inLanguage: 'fr-BE',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'Reservation',
      name: "Cours d'essai gratuit",
    },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${baseUrl}/reserver#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: "Le cours d'essai est-il vraiment gratuit ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, et le premier mois complet l'est aussi. Ni cotisation ni licence ne sont demandées pour essayer : elles n'interviennent qu'au moment de l'inscription, si vous décidez de continuer.",
      },
    },
    {
      '@type': 'Question',
      name: "Que faut-il apporter pour un premier cours ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Une tenue de sport souple et une bouteille d'eau. Le kimono n'est pas nécessaire pour l'essai. La pratique se fait pieds nus sur le tatami.",
      },
    },
    {
      '@type': 'Question',
      name: "Quels créneaux peut-on réserver ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le jeudi à 19h00 pour les enfants et adolescents dès 5 ans, et le jeudi à 20h30 pour les adultes. Le cours du dimanche matin n'est pas ouvert à l'essai : il est réservé aux ceintures marron, noires et violettes.",
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il réserver pour venir essayer ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ce n'est pas obligatoire, mais c'est préférable : le professeur sait ainsi qu'un débutant arrive et prend le temps de l'accueillir. Vous pouvez aussi appeler le 0473 83 80 75.",
      },
    },
  ],
}

export default function ReserverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reservationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs />
      {children}
    </>
  )
}
