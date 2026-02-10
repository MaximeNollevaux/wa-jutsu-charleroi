import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: 'Inscription - Rejoignez le Wa-Jutsu Club Charleroi',
  description: 'Inscrivez-vous au Wa-Jutsu Club l\'Asie Marcinelle. Premier mois d\'essai gratuit. Formulaire d\'inscription en ligne pour enfants et adultes.',
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
    description: 'Inscrivez-vous et beneficiez d\'un mois d\'essai gratuit.',
    url: `${baseUrl}/inscription`,
    type: 'website',
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
