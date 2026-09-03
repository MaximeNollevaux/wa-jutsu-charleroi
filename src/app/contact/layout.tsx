import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// ContactPage JSON-LD
const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact - Wa-Jutsu Charleroi',
  description: 'Contactez le Club CCAJT Wa-Jutsu Marcinelle pour toute question sur les cours, les inscriptions ou l\'accès au dojo.',
  url: `${baseUrl}/contact`,
  mainEntity: {
    '@type': 'SportsClub',
    name: 'Club CCAJT Wa-Jutsu Marcinelle',
    telephone: '+32473838075',
    email: 'contact@wa-jutsu-charleroi.be',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4 Rue de l\'Asie',
      addressLocality: 'Marcinelle',
      postalCode: '6001',
      addressCountry: 'BE',
    },
  },
}

export const metadata: Metadata = {
  title: 'Contact & accès — 4 Rue de l\'Asie, Marcinelle',
  description: 'Le dojo se trouve au 4 Rue de l\'Asie, 6001 Marcinelle. Téléphone, email et formulaire pour joindre le club.',
  keywords: [
    'contact wa-jutsu charleroi',
    'adresse club jujitsu marcinelle',
    'telephone arts martiaux charleroi',
    'inscription jujitsu',
  ],
  openGraph: {
    title: 'Contact & accès — 4 Rue de l\'Asie, 6001 Marcinelle',
    description: 'Contactez-nous pour toute question. 4 Rue de l\'Asie, 6001 Marcinelle.',
    url: `${baseUrl}/contact`,
    type: 'website',
    images: IMAGE_PARTAGE,
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Breadcrumbs />
      {children}
    </>
  )
}
