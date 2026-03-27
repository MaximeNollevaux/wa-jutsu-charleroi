import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Règlement intérieur',
  robots: { index: false, follow: false },
}

export default function ReglementInterieurLayout({ children }: { children: React.ReactNode }) {
  return children
}
