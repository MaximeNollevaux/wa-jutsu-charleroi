import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: 'Inscription — 1er mois gratuit, dès 5 ans',
  description: 'Pré-inscription en ligne au Wa-Jutsu Club l\'Asie Marcinelle. Premier mois d\'essai gratuit, sans engagement, pour les enfants dès 5 ans et les adultes.',
  keywords: [
    'inscription arts martiaux charleroi',
    'inscription jujitsu',
    'essai gratuit arts martiaux',
    's\'inscrire wa-jutsu',
    'cours arts martiaux enfants',
    'inscription self-defense',
  ],
  openGraph: {
    title: 'Inscription - Wa-Jutsu Club Charleroi',
    description: 'Inscrivez-vous et bénéficiez d\'un mois d\'essai gratuit.',
    url: `${baseUrl}/inscription`,
    type: 'website',
    images: IMAGE_PARTAGE,
  },
  alternates: {
    canonical: `${baseUrl}/inscription`,
  },
}

export default function InscriptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  )
}
