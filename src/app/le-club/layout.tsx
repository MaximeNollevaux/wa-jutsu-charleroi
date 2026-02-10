import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const baseUrl = 'https://wa-jutsu-charleroi.be'

export const metadata: Metadata = {
  title: 'Le Club - Wa-Jutsu Club l\'Asie Marcinelle depuis 1990',
  description: 'Decouvrez le Wa-Jutsu Club l\'Asie Marcinelle, fonde en 1990. Notre equipe d\'instructeurs qualifies, nos valeurs et notre approche de l\'enseignement du Ju-Jutsu traditionnel.',
  keywords: [
    'club ju-jutsu charleroi',
    'dojo marcinelle',
    'instructeurs arts martiaux',
    'club sport charleroi',
    'wa-jutsu club asie',
    'arts martiaux belgique',
  ],
  openGraph: {
    title: 'Le Club - Wa-Jutsu Club l\'Asie Marcinelle',
    description: 'Notre club, fonde en 1990, propose un enseignement de qualite du Ju-Jutsu traditionnel methode Wa-Jutsu.',
    url: `${baseUrl}/le-club`,
    type: 'website',
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
