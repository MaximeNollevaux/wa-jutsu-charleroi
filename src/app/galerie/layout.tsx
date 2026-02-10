import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: 'Galerie Photos - Wa-Jutsu Club Charleroi',
  description: 'Galerie photos du Wa-Jutsu Club l\'Asie Marcinelle. Decouvrez nos cours, evenements, passages de grades et demonstrations d\'arts martiaux.',
  keywords: [
    'photos wa-jutsu',
    'galerie arts martiaux',
    'photos jujitsu charleroi',
    'evenements arts martiaux',
    'demonstration ju-jutsu',
  ],
  openGraph: {
    title: 'Galerie Photos - Wa-Jutsu Club Charleroi',
    description: 'Photos de nos cours, evenements et demonstrations.',
    url: `${baseUrl}/galerie`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/galerie`,
  },
}

export default function GalerieLayout({
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
