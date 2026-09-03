import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: 'Photos du dojo et des cours à Marcinelle',
  description: 'Photos du dojo, des cours, des passages de grades et des démonstrations du Club CCAJT Wa-Jutsu Marcinelle.',
  keywords: [
    'photos wa-jutsu',
    'galerie arts martiaux',
    'photos jujitsu charleroi',
    'evenements arts martiaux',
    'demonstration ju-jutsu',
  ],
  openGraph: {
    title: 'Photos du dojo et des cours — Wa-Jutsu Marcinelle',
    description: 'Photos de nos cours, événements et démonstrations.',
    url: `${baseUrl}/galerie`,
    type: 'website',
    images: IMAGE_PARTAGE,
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
