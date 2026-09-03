import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Service/Offer JSON-LD
const offerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cours de Wa-Jutsu',
  provider: {
    '@type': 'SportsClub',
    name: 'Club CCAJT Wa-Jutsu Marcinelle',
    url: baseUrl,
  },
  description: 'Cours de ju-jutsu traditionnel, méthode Wa-Jutsu, pour enfants, jeunes et adultes. Self-défense et développement personnel, sans compétition.',
  areaServed: {
    '@type': 'City',
    name: 'Charleroi',
  },
  serviceType: 'Arts Martiaux',
  offers: [
    {
      '@type': 'Offer',
      name: 'Cours Enfants',
      description: 'Cours du jeudi pour enfants de moins de 13 ans',
      price: '10',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '10',
        priceCurrency: 'EUR',
        unitText: 'mois',
      },
    },
    {
      '@type': 'Offer',
      name: 'Cours Jeunes',
      description: 'Cours du jeudi pour jeunes de 13 à 18 ans',
      price: '10',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '10',
        priceCurrency: 'EUR',
        unitText: 'mois',
      },
    },
    {
      '@type': 'Offer',
      name: 'Cours Adultes',
      description: 'Cours complet pour adultes de plus de 18 ans',
      price: '20',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '20',
        priceCurrency: 'EUR',
        unitText: 'mois',
      },
    },
    {
      '@type': 'Offer',
      name: 'Formule Couple',
      description: 'Tarif preferentiel pour 2 adultes',
      price: '30',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '30',
        priceCurrency: 'EUR',
        unitText: 'mois',
      },
    },
  ],
}

// FAQ JSON-LD
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quels sont les horaires des cours de Wa-Jutsu a Charleroi ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les cours ont lieu le jeudi : 19h00-20h30 pour les enfants et adolescents, 20h30-23h00 pour les adultes. Le dimanche de 9h00 a 12h00 est reserve aux grades avances (ceintures marron et noires).',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coutent les cours de Wa-Jutsu ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les tarifs mensuels sont de 10 € pour les enfants et les jeunes (jusqu\'à 18 ans), 20 € pour les adultes et 30 € pour un couple. Une licence annuelle de 60 € est demandée, assurance et carte AEJT comprises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Y a-t-il un essai gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, les nouveaux membres beneficient d\'un mois d\'essai gratuit (4 cours) sans engagement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ou se trouve le club de Wa-Jutsu a Charleroi ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le club se situe au 4 Rue de l\'Asie, 6001 Marcinelle (Charleroi), Belgique.',
      },
    },
  ],
}

export const metadata: Metadata = {
  title: 'Horaires & tarifs — Jeudi soir, dès 10 €/mois',
  description: 'Horaires des cours de Wa-Jutsu à Marcinelle : jeudi soir et dimanche matin. Dès 10 €/mois, licence annuelle 60 €. Premier mois d\'essai gratuit.',
  keywords: [
    'horaires cours arts martiaux charleroi',
    'tarifs jujitsu charleroi',
    'prix cours self-defense',
    'cours arts martiaux enfants charleroi',
    'cours arts martiaux adultes charleroi',
    'essai gratuit arts martiaux',
    'inscription jujitsu',
  ],
  openGraph: {
    title: 'Horaires & Tarifs — Cours de Wa-Jutsu à Charleroi',
    description: 'Cours le jeudi soir et le dimanche matin. Dès 10 €/mois. Premier mois gratuit.',
    url: `${baseUrl}/horaires-tarifs`,
    type: 'website',
    images: IMAGE_PARTAGE,
  },
  alternates: {
    canonical: `${baseUrl}/horaires-tarifs`,
  },
}

export default function HorairesTarifsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
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
