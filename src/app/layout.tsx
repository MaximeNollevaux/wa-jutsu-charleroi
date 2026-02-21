import type { Metadata } from 'next'
import { Roboto, Roboto_Condensed } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-roboto-condensed',
})

const baseUrl = 'https://wa-jutsu-charleroi.be'

// JSON-LD Organization
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsClub',
  '@id': `${baseUrl}/#organization`,
  name: 'Wa-Jutsu Club l\'Asie Marcinelle',
  alternateName: 'Wa-Jutsu Charleroi',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  image: `${baseUrl}/og-image.jpg`,
  description: 'Club de Ju-Jutsu Traditionnel methode Wa-Jutsu a Marcinelle (Charleroi). Art martial non competitif, self-defense efficace. Cours enfants des 5 ans et adultes.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4 Rue de l\'Asie',
    addressLocality: 'Marcinelle',
    addressRegion: 'Hainaut',
    postalCode: '6001',
    addressCountry: 'BE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.4011,
    longitude: 4.4447,
  },
  telephone: '+32476703880',
  email: 'contact@wa-jutsu-charleroi.be',
  sport: ['Ju-Jutsu', 'Wa-Jutsu', 'Arts Martiaux', 'Self-Defense'],
  foundingDate: '1990',
  memberOf: {
    '@type': 'Organization',
    name: 'Academie Europeenne de Ju-Jutsu Traditionnel (AEJT)',
  },
  sameAs: [
    'https://www.facebook.com/wajutsucharleroi',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Thursday',
      opens: '19:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '12:00',
    },
  ],
  priceRange: '8-30 EUR/mois',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '12',
  },
}

// JSON-LD LocalBusiness
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#business`,
  name: 'Wa-Jutsu Club l\'Asie Marcinelle',
  image: `${baseUrl}/og-image.jpg`,
  url: baseUrl,
  telephone: '+32476703880',
  priceRange: '8-30 EUR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4 Rue de l\'Asie',
    addressLocality: 'Marcinelle',
    addressRegion: 'Hainaut',
    postalCode: '6001',
    addressCountry: 'BE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.4011,
    longitude: 4.4447,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Thursday',
      opens: '19:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '12:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Charleroi' },
    { '@type': 'City', name: 'Marcinelle' },
    { '@type': 'City', name: 'Couillet' },
    { '@type': 'City', name: 'Mont-sur-Marchienne' },
    { '@type': 'City', name: 'Gilly' },
  ],
}

// JSON-LD WebSite with SearchAction
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Wa-Jutsu Charleroi',
  url: baseUrl,
  description: 'Club de Ju-Jutsu Traditionnel methode Wa-Jutsu a Marcinelle. Art martial non competitif pour enfants et adultes.',
  publisher: {
    '@type': 'Organization',
    name: 'Wa-Jutsu Club l\'Asie Marcinelle',
  },
  inLanguage: 'fr-BE',
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Wa-Jutsu Charleroi | Club de Ju-Jutsu Traditionnel a Marcinelle',
    template: '%s | Wa-Jutsu Charleroi',
  },
  description: 'Club de Ju-Jutsu Traditionnel methode Wa-Jutsu a Marcinelle (Charleroi). Art martial non competitif, self-defense efficace. Cours enfants des 5 ans et adultes. Premier mois d\'essai gratuit.',
  keywords: [
    'ju-jutsu charleroi',
    'jujitsu charleroi',
    'wa-jutsu',
    'arts martiaux charleroi',
    'arts martiaux marcinelle',
    'self-defense charleroi',
    'club sport charleroi',
    'jujitsu belgique',
    'cours arts martiaux enfants',
    'self defense femme charleroi',
    'sport combat charleroi',
    'dojo charleroi',
    'AEJT',
    'ju-jutsu traditionnel',
    'arts martiaux adultes',
  ],
  authors: [{ name: 'Wa-Jutsu Club l\'Asie Marcinelle' }],
  creator: 'Wa-Jutsu Club l\'Asie Marcinelle',
  publisher: 'Wa-Jutsu Club l\'Asie Marcinelle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: baseUrl,
    siteName: 'Wa-Jutsu Charleroi',
    title: 'Wa-Jutsu Charleroi | Club de Ju-Jutsu Traditionnel',
    description: 'Art martial non competitif, self-defense efficace. Cours enfants et adultes a Marcinelle. Premier mois gratuit.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Wa-Jutsu Club Charleroi - Arts Martiaux',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wa-Jutsu Charleroi | Club de Ju-Jutsu Traditionnel',
    description: 'Art martial non competitif, self-defense efficace. Cours enfants et adultes a Marcinelle.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'Sports',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${roboto.variable} ${robotoCondensed.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5BT5MVGNHB"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5BT5MVGNHB');
          `}
        </Script>

        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Script src="https://chat.synara.be/widget.js" data-website-id="aff487bb-b960-46b7-9688-b92c66e9113e" strategy="lazyOnload" />
      </body>
    </html>
  )
}
