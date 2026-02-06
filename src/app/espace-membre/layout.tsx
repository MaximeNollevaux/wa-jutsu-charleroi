import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Membre',
  description: 'Espace membre du Wa-Jutsu Club l\'Asie Marcinelle. Gérez vos cotisations, suivez votre progression.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EspaceMembreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
