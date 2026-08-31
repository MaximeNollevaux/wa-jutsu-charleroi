import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// FAQ JSON-LD for this page
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le Wa-Jutsu ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le Wa-Jutsu est un art martial traditionnel japonais non competitif. Le terme signifie "l\'art de l\'harmonie". Cette discipline vise la transformation personnelle profonde plutot que la competition, en developpant le corps et l\'esprit selon trois principes : Shin (etat d\'esprit), Ghi (habilete technique) et Tai (vitalite physique).',
      },
    },
    {
      '@type': 'Question',
      name: 'Le Wa-Jutsu est-il adapte aux debutants ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, le Wa-Jutsu est parfaitement adapte aux debutants de tous ages. Les cours sont structures pour permettre une progression graduelle, des premiers pas jusqu\'a la maitrise. Les enfants peuvent commencer des 5 ans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles techniques apprend-on en Wa-Jutsu ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le Wa-Jutsu englobe un large eventail de techniques : Atemi-Waza (frappes aux points vitaux), Nage-Waza (projections), Kansetsu-Waza (cles articulaires), Ne-Waza (techniques au sol), Shime-Waza (etranglements) et Kata (formes codifiees traditionnelles).',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment fonctionne le systeme de grades en Wa-Jutsu ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le systeme de grades va du 6eme Kyu (ceinture blanche) au 1er Dan et plus (ceinture noire). La progression passe par les ceintures jaune, orange, verte, bleue et marron. L\'evaluation porte sur trois aspects : Shin (etat d\'esprit), Ghi (habilete technique) et Tai (vitalite physique).',
      },
    },
  ],
}

export const metadata: Metadata = {
  title: 'Le Wa-Jutsu — Art martial sans compétition',
  description: 'Art martial japonais traditionnel sans compétition : philosophie Shin-Ghi-Tai, self-défense, grades et Bushido. Cours à Marcinelle, dès 10 €/mois.',
  keywords: [
    'wa-jutsu',
    'art martial traditionnel',
    'ju-jutsu japonais',
    'self-defense',
    'bushido',
    'shin ghi tai',
    'arts martiaux non competitif',
    'techniques ju-jutsu',
    'grades arts martiaux',
    'AEJT',
  ],
  openGraph: {
    title: 'Le Wa-Jutsu — Art martial traditionnel japonais',
    description: 'Le Wa-Jutsu : philosophie, techniques et système de grades d\'un art martial sans compétition.',
    url: `${baseUrl}/le-wa-jutsu`,
    type: 'article',
    images: IMAGE_PARTAGE,
  },
  alternates: {
    canonical: `${baseUrl}/le-wa-jutsu`,
  },
}

export default function LeWaJutsuLayout({
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
