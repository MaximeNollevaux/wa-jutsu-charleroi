import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false, follow: false },
}

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return children
}
