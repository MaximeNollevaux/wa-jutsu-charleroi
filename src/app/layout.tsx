import type { Metadata } from 'next'
import { Roboto, Roboto_Condensed } from 'next/font/google'
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

export const metadata: Metadata = {
  title: {
    default: 'Wa-Jutsu Charleroi | Club de Ju-Jutsu Traditionnel à Marcinelle',
    template: '%s | Wa-Jutsu Charleroi',
  },
  description: 'Club de Ju-Jutsu Traditionnel méthode Wa-Jutsu à Marcinelle (Charleroi). Art martial non compétitif, self-défense efficace. Cours enfants dès 5 ans et adultes. Premier mois d\'essai gratuit.',
  keywords: [
    'ju-jutsu',
    'jujitsu',
    'wa-jutsu',
    'arts martiaux',
    'charleroi',
    'marcinelle',
    'self-défense',
    'club sport',
    'arts martiaux charleroi',
    'jujitsu belgique',
    'cours arts martiaux',
    'self defense charleroi',
    'sport combat charleroi',
    'dojo charleroi',
    'AEJT',
  ],
  authors: [{ name: 'Wa-Jutsu Club l\'Asie Marcinelle' }],
  creator: 'Wa-Jutsu Club l\'Asie Marcinelle',
  publisher: 'Wa-Jutsu Club l\'Asie Marcinelle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wa-jutsu-charleroi.be'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Wa-Jutsu Charleroi | Club de Ju-Jutsu Traditionnel',
    description: 'Art martial non compétitif, self-défense efficace. Cours enfants et adultes à Marcinelle.',
    url: 'https://wa-jutsu-charleroi.be',
    siteName: 'Wa-Jutsu Charleroi',
    locale: 'fr_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wa-Jutsu Charleroi | Club de Ju-Jutsu Traditionnel',
    description: 'Art martial non compétitif, self-défense efficace. Cours enfants et adultes à Marcinelle.',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${roboto.variable} ${robotoCondensed.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
