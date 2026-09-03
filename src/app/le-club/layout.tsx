import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { IMAGE_PARTAGE } from '@/lib/seo'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: 'Le club — Ju-Jutsu à Marcinelle depuis 1990',
  description: 'Le Club CCAJT Wa-Jutsu Marcinelle, ASBL fondée en 1990. Notre équipe d\'enseignants, nos valeurs et notre façon d\'enseigner le Ju-Jutsu traditionnel.',
  keywords: [
    'club ju-jutsu charleroi',
    'dojo marcinelle',
    'instructeurs arts martiaux',
    'club sport charleroi',
    'wa-jutsu club asie',
    'arts martiaux belgique',
  ],
  openGraph: {
    title: 'Le Club - Club CCAJT Wa-Jutsu Marcinelle',
    description: 'Notre club, fondé en 1990, enseigne le Ju-Jutsu traditionnel selon la méthode Wa-Jutsu.',
    url: `${baseUrl}/le-club`,
    type: 'website',
    images: IMAGE_PARTAGE,
  },
  alternates: {
    canonical: `${baseUrl}/le-club`,
  },
}

export default function LeClubLayout({
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
