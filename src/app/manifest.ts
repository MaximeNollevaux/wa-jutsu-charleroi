import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wa-Jutsu Charleroi - Club de Ju-Jutsu Traditionnel',
    short_name: 'Wa-Jutsu',
    description: 'Club de Ju-Jutsu Traditionnel methode Wa-Jutsu a Marcinelle (Charleroi). Art martial non competitif, self-defense efficace.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#9333EA',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
