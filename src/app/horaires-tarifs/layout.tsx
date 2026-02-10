import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// Service/Offer JSON-LD
const offerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cours de Wa-Jutsu',
  provider: {
    '@type': 'SportsClub',
    name: 'Wa-Jutsu Club l\'Asie Marcinelle',
    url: baseUrl,
  },
  description: 'Cours de Ju-Jutsu Traditionnel methode Wa-Jutsu pour enfants, jeunes et adultes. Self-defense et developpement personnel.',
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
      price: '8',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '8',
        priceCurrency: 'EUR',
        unitText: 'mois',
      },
    },
    {
      '@type': 'Offer',
      name: 'Cours Jeunes',
      description: 'Cours du jeudi pour jeunes de 13 a 18 ans',
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
        text: 'Les tarifs mensuels sont : 8EUR pour les enfants (moins de 13 ans), 10EUR pour les jeunes (13-18 ans), 20EUR pour les adultes, et 30EUR pour les couples. Une licence annuelle de 50EUR est requise (assurance et carte AEJT incluses).',
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
  title: 'Horaires & Tarifs - Cours Ju-Jutsu Charleroi des 8EUR/mois',
  description: 'Horaires des cours de Wa-Jutsu a Marcinelle : jeudi soir et dimanche matin. Tarifs accessibles des 8EUR/mois. Premier mois d\'essai gratuit. Licence annuelle 50EUR.',
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
    title: 'Horaires & Tarifs - Cours de Wa-Jutsu a Charleroi',
    description: 'Cours jeudi soir et dimanche. Tarifs des 8EUR/mois. Premier mois gratuit.',
    url: `${baseUrl}/horaires-tarifs`,
    type: 'website',
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
