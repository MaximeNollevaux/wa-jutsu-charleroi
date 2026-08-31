import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Le titre et la description vivent dans page.tsx — voir la note qui y figure.
// Ce layout ne porte que le balisage et le fil d'Ariane.

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${baseUrl}/self-defense#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Où apprendre la self-défense à Charleroi ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le Wa-Jutsu Club l'Asie enseigne le ju-jutsu traditionnel au 4 Rue de l'Asie, 6001 Marcinelle, à Charleroi. Les techniques de défense y sont apprises dans le cadre d'une pratique régulière : cours adultes le jeudi de 20h30 à 23h00. Premier mois d'essai gratuit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il pour savoir se défendre ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les premiers réflexes utiles — chuter sans se blesser, garder son équilibre quand on est saisi, se dégager d'une prise — s'acquièrent en quelques mois de pratique régulière. Un stage de quelques séances transmet des informations, pas des réflexes : sous stress, le corps ne fait que ce qu'il a répété des centaines de fois.",
      },
    },
    {
      '@type': 'Question',
      name: 'Le club propose-t-il un stage de self-défense pour femmes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Le club n'organise pas de stage court séparé : il propose un cours mixte hebdomadaire ouvert à tous les niveaux. Les techniques de ju-jutsu reposent sur le placement et le déséquilibre plutôt que sur la force, ce qui les rend praticables contre un partenaire plus lourd.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelles techniques de défense apprend-on en ju-jutsu ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les dégagements de saisies, les projections (nage-waza), les clés articulaires (kansetsu-waza), le contrôle au sol (ne-waza) et les frappes aux points vitaux (atemi-waza), ainsi que les chutes, enseignées en premier.",
      },
    },
  ],
}

export default function SelfDefenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs />
      {children}
    </>
  )
}
