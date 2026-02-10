import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

// ContactPage JSON-LD
const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact - Wa-Jutsu Charleroi',
  description: 'Contactez le Wa-Jutsu Club l\'Asie Marcinelle pour toute question sur les cours, inscriptions ou informations.',
  url: `${baseUrl}/contact`,
  mainEntity: {
    '@type': 'SportsClub',
    name: 'Wa-Jutsu Club l\'Asie Marcinelle',
    telephone: '+32476703880',
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
  title: 'Contact - Wa-Jutsu Club Charleroi',
  description: 'Contactez le Wa-Jutsu Club l\'Asie Marcinelle. Adresse : 4 Rue de l\'Asie, 6001 Marcinelle. Telephone, email et formulaire de contact.',
  keywords: [
    'contact wa-jutsu charleroi',
    'adresse club jujitsu marcinelle',
    'telephone arts martiaux charleroi',
    'inscription jujitsu',
  ],
  openGraph: {
    title: 'Contact - Wa-Jutsu Club Charleroi',
    description: 'Contactez-nous pour toute question. 4 Rue de l\'Asie, 6001 Marcinelle.',
    url: `${baseUrl}/contact`,
    type: 'website',
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
